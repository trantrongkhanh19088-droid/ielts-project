'use client';

import React, { useEffect } from 'react';
import { Award, Sparkles, ArrowRight, CheckCircle2, Sprout } from 'lucide-react';

interface ConfettiCelebrationProps {
  isOpen: boolean;
  levelNumber: number;
  taskType: 'task1' | 'task2';
  wordCount: number;
  targetBand: string;
  onContinue: () => void;
  onBackToTree: () => void;
}

export default function ConfettiCelebration({
  isOpen,
  levelNumber,
  taskType,
  wordCount,
  targetBand,
  onContinue,
  onBackToTree,
}: ConfettiCelebrationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-emerald-500/40 rounded-3xl shadow-2xl text-center space-y-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Celebration Trophy Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[22px] flex items-center justify-center">
            <Award className="w-10 h-10 text-emerald-600 animate-bounce" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chinh Phục Thành Công!</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            Hoàn Thành Tầng {levelNumber} &bull; {taskType === 'task1' ? 'Task 1' : 'Task 2'}!
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 max-w-sm mx-auto leading-relaxed">
            Bạn đã hoàn thành bài viết với <strong>{wordCount} từ</strong> theo đúng chuẩn hướng dẫn từng câu và tiêu chuẩn Band <strong>{targetBand}</strong>.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 text-xs">
          <div className="text-center space-y-0.5">
            <span className="text-[11px] uppercase font-bold text-gray-400">Tiến độ hôm nay</span>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">+1 Bài Viết</p>
          </div>
          <div className="text-center space-y-0.5">
            <span className="text-[11px] uppercase font-bold text-gray-400">Mở khóa tầng kế</span>
            <p className="text-base font-black text-sky-600 dark:text-sky-400">Tầng {levelNumber + 1} Sẵn Sàng</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBackToTree}
            className="w-full sm:w-1/2 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-bold text-gray-700 dark:text-zinc-300 transition flex items-center justify-center gap-1.5"
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Về Cây Đậu</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
          >
            <span>Leo Tiếp Nhiệm Vụ Mới</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
