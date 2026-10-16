'use client';

import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Target,
  Layers,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { BuilderDailyTracker, BuilderLevel, BuilderTreeConfig } from '@/types';
import { calculateRemainingStudyDays, countCompletedNodes } from '@/lib/builder';

interface DailyPacingWidgetProps {
  config: BuilderTreeConfig;
  levels: BuilderLevel[];
  dailyTracker: BuilderDailyTracker;
  onResetTree: () => void;
  onGenerateNewTree: () => void;
}

export default function DailyPacingWidget({
  config,
  levels,
  dailyTracker,
  onResetTree,
  onGenerateNewTree,
}: DailyPacingWidgetProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showNewTreeConfirm, setShowNewTreeConfirm] = useState(false);

  const remainingDays = calculateRemainingStudyDays(config);
  const totalNodes = levels.length * 2;
  const completedNodes = countCompletedNodes(levels);
  const percentComplete = Math.round((completedNodes / totalNodes) * 100);

  const targetToday = dailyTracker.targetNodesToday || 1;
  const completedToday = dailyTracker.completedNodesToday || 0;
  const isTargetMetToday = completedToday >= targetToday;

  return (
    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* Top Bar: Progress and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Daily Goal Banner */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
              isTargetMetToday
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
            }`}>
              {isTargetMetToday ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  Mục tiêu hôm nay: Hoàn thành {targetToday} bài viết
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                  isTargetMetToday
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                }`}>
                  {isTargetMetToday ? 'Đã đạt hôm nay 🎉' : `Đã xong ${completedToday}/${targetToday}`}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                Để kịp lộ trình <strong>{config.totalLevels} tầng ({totalNodes} bài)</strong> trong <strong>{config.studyDays} ngày</strong> (còn lại ~{remainingDays} ngày).
              </p>
            </div>
          </div>

          {/* Quick Badges & Controls */}
          <div className="flex items-center gap-2 self-end md:self-center">
            {/* Target Band Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-xs font-semibold text-gray-800 dark:text-zinc-200">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Band {config.targetBand}</span>
            </div>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span>{dailyTracker.studyStreakDays} ngày streak</span>
            </div>

            {/* Tree Management Controls */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                title="Xóa toàn bộ tiến độ để leo lại từ Tầng 1 (giữ nguyên cấu trúc đề hiện tại)"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-zinc-300 transition"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden lg:inline">Reset Cây</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewTreeConfirm(true)}
                title="Hủy cây hiện tại và tạo Cây Đậu mới với bộ đề ngẫu nhiên mới từ thư viện"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sang Cây Mới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
            <span>
              Tiến độ leo cây: <strong>{completedNodes} / {totalNodes} bài viết</strong> ({percentComplete}%)
            </span>
            <span>
              Tổng số tầng: <strong>{config.totalLevels} tầng</strong>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* MODAL: CONFIRM RESET CURRENT TREE */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Reset tiến độ cây hiện tại?
                </h3>
                <p className="text-xs text-gray-500">
                  Bắt đầu leo lại từ Tầng 1
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
              Thao tác này sẽ xóa toàn bộ các câu văn và trạng thái hoàn thành trên cây đậu hiện tại, nhưng <strong>giữ nguyên cấu trúc các đề thi ở các tầng</strong> để bạn có thể luyện tập lại từ đầu.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetTree();
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm"
              >
                Xác nhận Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM GENERATE NEW TREE */}
      {showNewTreeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Trồng một Cây Đậu Mới?
                </h3>
                <p className="text-xs text-gray-500">
                  Thay đổi cấu hình &amp; bốc lại bộ đề mới
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
              Bạn sẽ quay lại màn hình thiết lập để tùy chỉnh lại số ngày học, band mục tiêu hoặc số tầng $N$, và hệ thống sẽ <strong>bốc ngẫu nhiên một bộ đề hoàn toàn mới từ thư viện</strong>.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowNewTreeConfirm(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewTreeConfirm(false);
                  onGenerateNewTree();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                Thiết lập Cây Mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
