import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Secret used for HMAC signing of session tokens, rate-limit cookies, and record verifications
const SECURITY_SECRET =
  process.env.SECURITY_SECRET ||
  process.env.GEMINI_API_KEY ||
  'cd-ielts-secure-token-salt-2026-production';

// Strict timing guards
export const MIN_EXAM_DURATION_SECONDS = 60; // Must spend at least 60 seconds on essay
export const MIN_SUBMISSION_COOLDOWN_SECONDS = 45; // Must wait at least 45 seconds between submissions
export const MAX_GRADE_REQUESTS_PER_10_MIN = 4; // Max 4 grading calls per 10 minutes (supports 1 full test or 2 single tasks)
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// In-memory nonce cache to prevent token replay attacks
const usedNonces = new Map<string, number>();

function cleanExpiredNonces() {
  const now = Date.now();
  usedNonces.forEach((ts, nonce) => {
    if (now - ts > RATE_LIMIT_WINDOW_MS) {
      usedNonces.delete(nonce);
    }
  });
}

/**
 * Validates request Origin and Referer against allowed domains
 */
export function validateRequestOrigin(req: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true;

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  const target = origin || referer;
  if (!target) {
    return false;
  }

  try {
    const parsedTarget = new URL(target);
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
  const vercelIp = req.headers.get('x-vercel-proxied-for') || req.headers.get('x-real-ip');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((ip) => ip.trim());
    return ips[0];
  }

  return req.ip || '127.0.0.1';
}

/**
 * Creates an HMAC signature for a payload string
 */
export function signPayload(payload: string): string {
  return crypto.createHmac('sha256', SECURITY_SECRET).update(payload).digest('hex');
}

/**
 * Generates an encrypted / HMAC-signed exam session token.
 */
export function createExamSessionToken(taskType: string = 'task1'): string {
  const nonce = crypto.randomBytes(12).toString('hex');
  const payloadObj = {
    taskType,
    startedAt: Date.now(),
    nonce,
  };
  const jsonStr = JSON.stringify(payloadObj);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = signPayload(base64Payload);
  return `${base64Payload}.${signature}`;
}

export interface ClientTelemetry {
  keystrokes?: number;
  mouseEvents?: number;
  focusSeconds?: number;
  pasteCount?: number;
  humanProofSolved?: boolean;
  isBuilder?: boolean;
}

export interface SessionVerificationResult {
  valid: boolean;
  startedAt?: number;
  elapsedSeconds?: number;
  error?: string;
}

/**
 * Verifies an exam session token and enforces minimum writing duration and replay prevention.
 */
export function verifyExamSessionToken(
  token: string,
  telemetry?: ClientTelemetry,
  bypassTimeCheck: boolean = false
): SessionVerificationResult {
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

    // Replay Attack Guard
    if (data.nonce && usedNonces.has(data.nonce)) {
      return {
        valid: false,
        error: 'Phiên thi này đã được nộp bài trước đó (Replay attempt detected). Vui lòng bắt đầu đề thi mới.',
      };
    }

    const elapsedSeconds = Math.floor((Date.now() - data.startedAt) / 1000);
    const isBuilder = Boolean(telemetry?.isBuilder);

    // Anti-Speed Bot: Essay must take at least MIN_EXAM_DURATION_SECONDS (bypassed for builder learning mode)
    if (!bypassTimeCheck && !isBuilder && elapsedSeconds < MIN_EXAM_DURATION_SECONDS) {
      return {
        valid: false,
        elapsedSeconds,
        error: `Thời gian làm bài quá nhanh (${elapsedSeconds}s / tối thiểu ${MIN_EXAM_DURATION_SECONDS}s). Bài thi IELTS yêu cầu thời gian suy nghĩ và viết bài thực tế để đảm bảo tính công bằng.`,
      };
    }

    // Behavioral & Telemetry Bot Detection
    if (telemetry && process.env.NODE_ENV === 'production' && !isBuilder) {
      const keys = Number(telemetry.keystrokes || 0);
      const mouse = Number(telemetry.mouseEvents || 0);
      const paste = Number(telemetry.pasteCount || 0);
      const focus = Number(telemetry.focusSeconds || 0);

      // If zero keyboard, mouse, and paste interactions: headless bot script
      if (keys === 0 && mouse === 0 && paste === 0) {
        return {
          valid: false,
          error: 'Phát hiện hành vi tự động bất thường (Thiếu tương tác chuột/bàn phím từ người dùng thật).',
        };
      }

      if (focus < 15 && elapsedSeconds < 90) {
        return {
          valid: false,
          error: 'Thời gian tập trung viết bài quá ngắn. Vui lòng thao tác trực tiếp trên giao diện bài thi.',
        };
      }
    }

    // Record nonce as used (mark after successful check)
    if (data.nonce) {
      cleanExpiredNonces();
      usedNonces.set(data.nonce, Date.now());
    }

    return {
      valid: true,
      startedAt: data.startedAt,
      elapsedSeconds,
    };
  } catch {
    return { valid: false, error: 'Lỗi giải mã token phiên làm bài.' };
  }
}

/**
 * Serverless-Resilient Rate Limiter using Signed HTTP-Only Cookie.
 * Stores up to MAX_REQUESTS timestamps in a signed cookie and enforces cooldown.
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
  isCooldownViolation?: boolean;
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

  // 1. Cooldown Check between successive submissions
  if (timestamps.length > 0) {
    const lastTimestamp = timestamps[timestamps.length - 1];
    const timeSinceLast = (now - lastTimestamp) / 1000;
    if (timeSinceLast < MIN_SUBMISSION_COOLDOWN_SECONDS) {
      const waitSeconds = Math.ceil(MIN_SUBMISSION_COOLDOWN_SECONDS - timeSinceLast);
      return {
        allowed: false,
        remainingWaitSeconds: waitSeconds,
        isCooldownViolation: true,
      };
    }
  }

  // 2. Sliding Window Limit Check
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

/**
 * Tamper-Proof Cryptographic Signature for Essay Records.
 * Prevents F12 / console scripts from injecting fake records into localStorage.
 */
export function signOfficialEssayRecord(id: string, band: number, wordCount: number): string {
  const content = `verified_official:${id}:${band.toFixed(1)}:${wordCount}`;
  return signPayload(content);
}

export function verifyOfficialEssayRecord(id: string, band: number, wordCount: number, signature?: string): boolean {
  if (!signature) return false;
  const content = `verified_official:${id}:${band.toFixed(1)}:${wordCount}`;
  return signPayload(content) === signature;
}
