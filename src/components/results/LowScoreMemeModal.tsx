'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react';

interface LowScoreMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bandScore: number;
}

export default function LowScoreMemeModal({
  isOpen,
  onClose,
  bandScore,
}: LowScoreMemeModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-amber-400/40 dark:border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 text-center transform transition-all scale-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng popup"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-zinc-800 rounded-full transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Humorous / Warning Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-extrabold uppercase tracking-wide mb-3">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Cảnh báo Band dưới 6.0</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
          Thầy độ không nổi rồi con ơi! 🙏
        </h3>

        {/* Meme Image */}
        <div className="my-4 relative">
          <div className="relative mx-auto w-52 max-h-56 overflow-hidden rounded-2xl shadow-lg border-2 border-amber-400/60 dark:border-amber-500/40 bg-amber-50 dark:bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/low-score-meme.png"
              alt="Band dưới 6.0 Meme"
              className="w-full h-auto object-cover hover:scale-105 transition duration-300"
            />
          </div>

          <div className="mt-3 inline-block bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 px-3.5 py-1 rounded-xl">
            <span className="text-xs text-rose-700 dark:text-rose-300 font-bold">
              Điểm bài viết: <span className="font-mono text-base font-black">{bandScore.toFixed(1)}</span> / 9.0
            </span>
          </div>
        </div>

        {/* Encouraging Message */}
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-6 px-2">
          Đừng vội nản lòng! Hãy bấm nút bên dưới để soi chi tiết từng lỗi ngữ pháp,
          tham khảo từ vựng C1/C2 nâng cấp và đọc bài mẫu <strong>Band 8.5+</strong> để phục thù lần tới nhé!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Xem chi tiết lỗi &amp; Bài mẫu</span>
          </button>

          <Link
            href="/practice"
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 font-semibold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
            <span>Viết bài khác</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
