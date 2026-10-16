import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Secret used for HMAC signing of session tokens and rate-limit cookies
const SECURITY_SECRET =
  process.env.SECURITY_SECRET ||
  process.env.GEMINI_API_KEY ||
  'cd-ielts-secure-token-salt-2026-production';

// Minimum seconds a human must spend on an essay before submitting
// (Prevents automated speed-bot spam)
export const MIN_EXAM_DURATION_SECONDS = 30;

// Maximum requests per window
export const MAX_GRADE_REQUESTS_PER_10_MIN = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Validates request Origin and Referer against allowed domains
 */
export function validateRequestOrigin(req: NextRequest): boolean {
  // Allow development environments
  if (process.env.NODE_ENV === 'development') return true;

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  const target = origin || referer;
  if (!target) {
    // If neither origin nor referer is present in production POST, likely a curl/bot script
    return false;
  }

  try {
    const parsedTarget = new URL(target);
    // Allow matching host (e.g. ielts-project-khanh.vercel.app)
    if (host && parsedTarget.host === host) return true;
    if (parsedTarget.hostname.endsWith('.vercel.app')) return true;
    if (parsedTarget.hostname === 'localhost' || parsedTarget.hostname === '127.0.0.1') return true;
  } catch {
    return false;
  }

  return false;
}

/**
 * Extracts trusted IP from Vercel edge infrastructure
 */
export function getTrustedClientIp(req: NextRequest): string {
  // Vercel edge headers (trusted)
  const vercelIp = req.headers.get('x-vercel-proxied-for') || req.headers.get('x-real-ip');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((ip) => ip.trim());
    // In proxy chains, the right-most or first trusted is reliable
    return ips[0];
  }

  return req.ip || '127.0.0.1';
}

/**
 * Creates an HMAC signature for a payload string
 */
function signPayload(payload: string): string {
  return crypto.createHmac('sha256', SECURITY_SECRET).update(payload).digest('hex');
}

/**
 * Generates an encrypted / HMAC-signed exam session token.
 * Issued when user starts or opens an exam.
 */
export function createExamSessionToken(taskType: string = 'task1'): string {
  const payloadObj = {
    taskType,
    startedAt: Date.now(),
    nonce: crypto.randomBytes(8).toString('hex'),
  };
  const jsonStr = JSON.stringify(payloadObj);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = signPayload(base64Payload);
  return `${base64Payload}.${signature}`;
}

export interface SessionVerificationResult {
  valid: boolean;
  startedAt?: number;
  elapsedSeconds?: number;
  error?: string;
}

/**
 * Verifies an exam session token and enforces minimum time requirement.
 */
export function verifyExamSessionToken(token: string, bypassTimeCheck: boolean = false): SessionVerificationResult {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return {
      valid: false,
      error: 'Thiếu chứng thực phiên làm bài (Session Token). Vui lòng tải lại trang và làm bài bình thường.',
    };
  }

  const [base64Payload, signature] = token.split('.');
  if (!base64Payload || !signature) {
    return { valid: false, error: 'Phiên làm bài không hợp lệ.' };
  }

  const expectedSig = signPayload(base64Payload);
  if (expectedSig !== signature) {
    return { valid: false, error: 'Chữ ký phiên làm bài không chính xác hoặc đã bị can thiệp.' };
  }

  try {
    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    const data = JSON.parse(jsonStr);

    if (!data.startedAt || typeof data.startedAt !== 'number') {
      return { valid: false, error: 'Dữ liệu thời gian của phiên không hợp lệ.' };
    }

    const elapsedSeconds = Math.floor((Date.now() - data.startedAt) / 1000);

    // Anti-Speed Bot: Essay must take at least MIN_EXAM_DURATION_SECONDS
    if (!bypassTimeCheck && elapsedSeconds < MIN_EXAM_DURATION_SECONDS) {
      return {
        valid: false,
        elapsedSeconds,
        error: `Thời gian làm bài quá nhanh (${elapsedSeconds}s). Một bài viết IELTS chuẩn cần ít nhất ${MIN_EXAM_DURATION_SECONDS} giây viết thực tế để AI chấm điểm.`,
      };
    }

    return {
      valid: true,
      startedAt: data.startedAt,
      elapsedSeconds,
    };
  } catch (err) {
    return { valid: false, error: 'Lỗi giải mã token phiên làm bài.' };
  }
}

/**
 * Serverless-Resilient Rate Limiter using Signed HTTP-Only Cookie.
 * Stores up to MAX_REQUESTS timestamps in a signed cookie.
 */
const RATE_LIMIT_COOKIE_NAME = '__ielts_rl_token';

export function checkCookieRateLimit(
  req: NextRequest,
  maxRequests: number = MAX_GRADE_REQUESTS_PER_10_MIN,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): {
  allowed: boolean;
  remainingWaitSeconds: number;
  newCookieValue?: string;
} {
  const now = Date.now();
  let timestamps: number[] = [];

  const rawCookie = req.cookies.get(RATE_LIMIT_COOKIE_NAME)?.value;
  if (rawCookie && rawCookie.includes('.')) {
    const [b64, sig] = rawCookie.split('.');
    if (signPayload(b64) === sig) {
      try {
        const decoded = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
        if (Array.isArray(decoded)) {
          timestamps = decoded.filter((ts) => typeof ts === 'number' && now - ts < windowMs);
        }
      } catch {
        timestamps = [];
      }
    }
  }

  // Check limit
  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const remainingMs = windowMs - (now - oldest);
    const remainingWaitSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
    return {
      allowed: false,
      remainingWaitSeconds,
    };
  }

  // Add current timestamp and prepare new cookie
  timestamps.push(now);
  const updatedB64 = Buffer.from(JSON.stringify(timestamps)).toString('base64url');
  const updatedSig = signPayload(updatedB64);
  const newCookieValue = `${updatedB64}.${updatedSig}`;

  return {
    allowed: true,
    remainingWaitSeconds: 0,
    newCookieValue,
  };
}

export function getRateLimitCookieConfig() {
  return {
    name: RATE_LIMIT_COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    },
  };
}
