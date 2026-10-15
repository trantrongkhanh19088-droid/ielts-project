import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countWords(text: string): number {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Official IELTS Writing overall band formula:
 * (Band_Task_1 + Band_Task_2 * 2) / 3, rounded to the nearest 0.5.
 * If decimal ends in .25 -> round up to .5; if ends in .75 -> round up to next integer.
 */
export function calculateOverallBand(task1Band: number, task2Band: number): number {
  const raw = (task1Band + task2Band * 2) / 3;
  return Math.round(raw * 2) / 2;
}

/**
 * Client-side Canvas Image Compressor:
 * Resizes image to max width 1200px and compresses to image/jpeg (quality 0.8)
 * Ensures Base64 payload stays well under 500KB to prevent Vercel 413 Payload Too Large.
 */
export async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to acquire canvas 2D context'));
          return;
        }

        // Fill white background for transparent PNGs
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG with quality 0.8
        const base64Data = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64Data);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        reject(new Error('Invalid file reader result'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

const RATE_LIMIT_KEY = 'cd_ielts_submission_timestamps';
const MAX_SUBMISSIONS_IN_WINDOW = 3;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit(): { allowed: boolean; remainingWaitSeconds: number } {
  if (typeof window === 'undefined') {
    return { allowed: true, remainingWaitSeconds: 0 };
  }

  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);

    if (recent.length >= MAX_SUBMISSIONS_IN_WINDOW) {
      const oldestInWindow = Math.min(...recent);
      const remainingMs = WINDOW_MS - (now - oldestInWindow);
      const remainingWaitSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
      return { allowed: false, remainingWaitSeconds };
    }

    return { allowed: true, remainingWaitSeconds: 0 };
  } catch {
    return { allowed: true, remainingWaitSeconds: 0 };
  }
}

export function recordSubmission(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);
    recent.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch (err) {
    console.error('Failed to record submission timestamp', err);
  }
}

// Bring Your Own Key (BYOK) Local Storage Helper
const BYOK_KEY = 'cd_ielts_user_gemini_key';

export function getUserApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(BYOK_KEY) || '';
}

export function setUserApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key.trim()) {
    localStorage.removeItem(BYOK_KEY);
  } else {
    localStorage.setItem(BYOK_KEY, key.trim());
  }
}
