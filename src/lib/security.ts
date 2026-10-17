import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Secret used for HMAC signing of session tokens, rate-limit cookies, and record verifications
const SECURITY_SECRET =
  process.env.SECURITY_SECRET ||
  process.env.GEMINI_API_KEY ||
  'cd-ielts-secure-token-salt-2026-production';

// Strict timing guards
export const MIN_EXAM_DURATION_SECONDS = 0; // Bỏ yêu cầu 60s trước khi nộp bài
export const MIN_SUBMISSION_COOLDOWN_SECONDS = 0; // Không ép chờ giữa các lần nộp
export const MAX_GRADE_REQUESTS_PER_WINDOW = 10; // Tối đa 10 lần nộp trong 5 phút
export const MAX_GRADE_REQUESTS_PER_10_MIN = 10; // Alias tương thích ngược
export const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // Cửa sổ trượt 5 phút
export const IP_BAN_DURATION_MS = 2 * 60 * 60 * 1000; // Khóa IP 2 tiếng nếu spam liên tục

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
  bypassTimeCheck: boolean = false,
  taskType?: string
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

    // Replay Attack Guard with task-type differentiation for full tests
    const replayKey = `${data.nonce}:${taskType || data.taskType || ''}`;
    if (data.nonce && usedNonces.has(replayKey)) {
      return {
        valid: false,
        error: 'Phiên thi này đã được nộp bài trước đó (Replay attempt detected). Vui lòng bắt đầu đề thi mới.',
      };
    }

    const elapsedSeconds = Math.floor((Date.now() - data.startedAt) / 1000);
    const isBuilder = Boolean(telemetry?.isBuilder);

    // Bỏ yêu cầu 60s làm bài tối thiểu theo yêu cầu người dùng
    if (elapsedSeconds < 0) {
      return {
        valid: false,
        error: 'Thời gian làm bài không hợp lệ.',
      };
    }

    // Behavioral & Telemetry Bot Detection
    if (telemetry && process.env.NODE_ENV === 'production' && !isBuilder) {
      const keys = Number(telemetry.keystrokes || 0);
      const mouse = Number(telemetry.mouseEvents || 0);
      const paste = Number(telemetry.pasteCount || 0);

      // If zero keyboard, mouse, and paste interactions: headless bot script
      if (keys === 0 && mouse === 0 && paste === 0) {
        return {
          valid: false,
          error: 'Phát hiện hành vi tự động bất thường (Thiếu tương tác chuột/bàn phím từ người dùng thật).',
        };
      }
    }

    // Record nonce as used (mark after successful check)
    if (data.nonce) {
      cleanExpiredNonces();
      usedNonces.set(replayKey, Date.now());
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
 * IP Spam Tracker & 2-Hour Ban Enforcement
 */
interface IpRateLimitRecord {
  timestamps: number[];
  violationCount: number;
  lastViolationAt?: number;
  bannedUntil?: number;
}

const ipTrackingMap = new Map<string, IpRateLimitRecord>();

export function checkIpRateLimitAndBan(ip: string): {
  allowed: boolean;
  isBanned: boolean;
  remainingWaitSeconds: number;
  error?: string;
} {
  const now = Date.now();
  let record = ipTrackingMap.get(ip);
  if (!record) {
    record = { timestamps: [], violationCount: 0 };
    ipTrackingMap.set(ip, record);
  }

  // 1. Check if IP is currently banned for 2 hours
  if (record.bannedUntil && record.bannedUntil > now) {
    const remainingMs = record.bannedUntil - now;
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    return {
      allowed: false,
      isBanned: true,
      remainingWaitSeconds: Math.ceil(remainingMs / 1000),
      error: `Địa chỉ IP của bạn đã bị tạm khóa nộp bài trong 2 tiếng do hệ thống phát hiện hành vi spam nộp bài liên tục nhiều lần. Thời gian khóa còn lại: ${remainingMinutes} phút.`,
    };
  } else if (record.bannedUntil && record.bannedUntil <= now) {
    record.bannedUntil = undefined;
    record.violationCount = 0;
  }

  // 2. Filter timestamps in the sliding 5-minute window
  record.timestamps = record.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  // 3. Check if current 5-minute window exceeded 10 submissions
  if (record.timestamps.length >= MAX_GRADE_REQUESTS_PER_WINDOW) {
    const timeSinceLastViolation = record.lastViolationAt ? now - record.lastViolationAt : Infinity;
    record.lastViolationAt = now;

    // Track consecutive spam windows or aggressive submissions while blocked
    if (timeSinceLastViolation < 15 * 60 * 1000) {
      record.violationCount += 1;
    } else {
      record.violationCount = 1;
    }

    // If spamming repeatedly across consecutive periods or multiple attempts while blocked: Ban for 2 hours!
    if (record.violationCount >= 3) {
      record.bannedUntil = now + IP_BAN_DURATION_MS;
      return {
        allowed: false,
        isBanned: true,
        remainingWaitSeconds: Math.ceil(IP_BAN_DURATION_MS / 1000),
        error: `Địa chỉ IP của bạn đã bị tạm khóa nộp bài trong 2 tiếng do hệ thống phát hiện hành vi spam nộp bài liên tục nhiều lần. Vui lòng quay lại sau 2 tiếng.`,
      };
    }

    const oldest = record.timestamps[0];
    const remainingMs = RATE_LIMIT_WINDOW_MS - (now - oldest);
    const remainingWaitSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
    const waitMinutes = Math.ceil(remainingWaitSeconds / 60);

    return {
      allowed: false,
      isBanned: false,
      remainingWaitSeconds,
      error: `Bạn đã nộp bài quá ${MAX_GRADE_REQUESTS_PER_WINDOW} lần trong vòng 5 phút. Vui lòng đợi ${waitMinutes} phút (${remainingWaitSeconds}s) trước khi gửi bài tiếp theo.`,
    };
  }

  // Allowed: add timestamp
  record.timestamps.push(now);

  // Periodic cleanup
  if (ipTrackingMap.size > 2000) {
    ipTrackingMap.forEach((rec, key) => {
      if ((!rec.bannedUntil || rec.bannedUntil <= now) && rec.timestamps.every((ts) => now - ts >= RATE_LIMIT_WINDOW_MS)) {
        ipTrackingMap.delete(key);
      }
    });
  }

  return { allowed: true, isBanned: false, remainingWaitSeconds: 0 };
}

/**
 * Serverless-Resilient Rate Limiter using Signed HTTP-Only Cookie.
 */
const RATE_LIMIT_COOKIE_NAME = '__ielts_rl_token';

export function createBanCookieValue(): string {
  const bannedUntil = Date.now() + IP_BAN_DURATION_MS;
  const cookiePayload = { timestamps: [], bannedUntil };
  const b64 = Buffer.from(JSON.stringify(cookiePayload)).toString('base64url');
  const sig = signPayload(b64);
  return `${b64}.${sig}`;
}

export function checkCookieRateLimit(
  req: NextRequest,
  maxRequests: number = MAX_GRADE_REQUESTS_PER_WINDOW,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): {
  allowed: boolean;
  remainingWaitSeconds: number;
  newCookieValue?: string;
  isBanned?: boolean;
  error?: string;
} {
  const now = Date.now();
  let timestamps: number[] = [];
  let bannedUntil: number | undefined;

  const rawCookie = req.cookies.get(RATE_LIMIT_COOKIE_NAME)?.value;
  if (rawCookie && rawCookie.includes('.')) {
    const [b64, sig] = rawCookie.split('.');
    if (signPayload(b64) === sig) {
      try {
        const decoded = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
        if (typeof decoded === 'object' && decoded !== null) {
          if (decoded.bannedUntil && typeof decoded.bannedUntil === 'number') {
            bannedUntil = decoded.bannedUntil;
          }
          if (Array.isArray(decoded.timestamps)) {
            timestamps = decoded.timestamps.filter((ts: number) => typeof ts === 'number' && now - ts < windowMs);
          }
        } else if (Array.isArray(decoded)) {
          timestamps = decoded.filter((ts) => typeof ts === 'number' && now - ts < windowMs);
        }
      } catch {
        timestamps = [];
      }
    }
  }

  // Check 2-hour ban in cookie
  if (bannedUntil && bannedUntil > now) {
    const remainingMs = bannedUntil - now;
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    return {
      allowed: false,
      isBanned: true,
      remainingWaitSeconds: Math.ceil(remainingMs / 1000),
      error: `Hệ thống đã tạm khóa nộp bài của bạn trong 2 tiếng do phát hiện hành vi spam nộp bài liên tục nhiều lần. Thời gian khóa còn lại: ${remainingMinutes} phút.`,
    };
  }

  // Sliding Window Limit Check (Max 10 submissions in 5 minutes)
  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const remainingMs = windowMs - (now - oldest);
    const remainingWaitSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
    return {
      allowed: false,
      isBanned: false,
      remainingWaitSeconds,
      error: `Bạn đã nộp bài quá ${maxRequests} lần trong vòng 5 phút. Vui lòng đợi ${remainingWaitSeconds} giây trước khi gửi bài tiếp theo.`,
    };
  }

  // Add current timestamp and prepare new cookie
  timestamps.push(now);
  const cookiePayload = { timestamps };
  const updatedB64 = Buffer.from(JSON.stringify(cookiePayload)).toString('base64url');
  const updatedSig = signPayload(updatedB64);
  const newCookieValue = `${updatedB64}.${updatedSig}`;

  return {
    allowed: true,
    isBanned: false,
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
