'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react';

interface LowScoreMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bandScore: number;
}

interface MemeItem {
  image: string;
  tag: string;
  title: string;
  caption: string;
}

const MEME_LIST: MemeItem[] = [
  {
    image: '/memes/meme-buddha.png',
    tag: 'Thầy Độ Hết Nổi 🙏',
    title: 'Thầy độ không nổi rồi con ơi! 🙏',
    caption:
      'Band dưới 6.0 thế này thì đến thầy cũng phải chắp tay tịnh tâm! Hãy soi lại các lỗi Task Response và Grammar ngay bên dưới để phục thù lần tới nhé.',
  },
  {
    image: '/memes/meme-bandaged.png',
    tag: 'Gãy Tay Vẫn Tạch 😭',
    title: 'Gõ phím gãy cả ngón tay mà Band thế này à?! 😭',
    caption:
      'Viết hăng say đến mức ngón tay quấn băng trắng xoá, mà examiner chấm bài vẫn gõ đầu dưới 6.0! Mau kéo xuống xem lỗi sai để băng bó vết thương lòng nào.',
  },
  {
    image: '/memes/meme-be-driver.png',
    tag: 'Tài Xế Tương Lai 🛵',
    title: 'Chuẩn bị nhận đồng phục chạy Be thôi con ơi! 🛵',
    caption:
      'Với cái band điểm này thì tạm gác bút nghiên, bật app nhận cuốc xe giao hàng thôi chứ biết sao giờ! Mau đọc bài mẫu Band 8.5+ để đổi vận nhé.',
  },
  {
    image: '/memes/meme-emperor.png',
    tag: 'Ánh Mắt Phán Xét 🤨',
    title: 'Giám khảo đang nhìn bài viết của bạn với ánh mắt này! 🤨',
    caption:
      'Ai cho phép bạn dùng từ vựng sơ cấp và viết câu thiếu vị ngữ trước mặt trẫm? Hãy đọc ngay nhận xét 4 tiêu chí bên dưới để tạ tội!',
  },
  {
    image: '/memes/meme-pink-dress.png',
    tag: 'Ngại Giùm Thí Sinh 🙈',
    title: 'Ối dồi ôi! Band này nhìn mà ngại ngùng giùm luôn á! 🙈',
    caption:
      'Ủa ai chấm bài zậy? Điểm số làm người ta ngại xỉu ngang luôn á! Bấm vào xem lỗi ngay để nâng cấp từ vựng C1/C2 liền tay đi nào.',
  },
  {
    image: '/memes/meme-blanket.png',
    tag: 'Quấn Chăn Tịnh Tâm 🛌',
    title: 'Trầm cảm quấn mền tịnh tâm, từ chối giao tiếp! 🛌',
    caption:
      'Nhận xong bảng điểm dưới 6.0 chỉ muốn quấn mền đầu thai bài thi khác! Nhưng thôi dậy đi, kéo xuống đọc nhận xét để lần sau phục thù nhé!',
  },
];

export default function LowScoreMemeModal({
  isOpen,
  onClose,
  bandScore,
}: LowScoreMemeModalProps) {
  const [currentMeme, setCurrentMeme] = useState<MemeItem>(MEME_LIST[0]);

  // Pick random meme whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * MEME_LIST.length);
      setCurrentMeme(MEME_LIST[randomIndex]);
    }
  }, [isOpen]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
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
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-zinc-800 rounded-full transition shadow-sm z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Humorous / Warning Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-extrabold uppercase tracking-wide mb-2.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{currentMeme.tag}</span>
        </div>

        {/* Dynamic Title */}
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-snug">
          {currentMeme.title}
        </h3>

        {/* Meme Image Container */}
        <div className="my-3.5 relative">
          <div className="relative mx-auto w-56 max-h-60 overflow-hidden rounded-2xl shadow-lg border-2 border-amber-400/60 dark:border-amber-500/40 bg-amber-50/50 dark:bg-zinc-800 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentMeme.image}
              alt={currentMeme.title}
              className="max-h-56 w-auto object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Score Badge */}
          <div className="mt-3 inline-block bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 px-4 py-1.5 rounded-xl">
            <span className="text-xs text-rose-700 dark:text-rose-300 font-bold">
              Điểm bài viết: <span className="font-mono text-base font-black">{bandScore.toFixed(1)}</span> / 9.0
            </span>
          </div>
        </div>

        {/* Dynamic Encouraging Caption */}
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-5 px-2">
          {currentMeme.caption}
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
