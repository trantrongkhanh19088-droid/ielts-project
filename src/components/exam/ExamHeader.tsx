'use client';

import React, { useState } from 'react';
import {
  Clock,
  Eye,
  EyeOff,
  Send,
  AlertTriangle,
  Home,
  RotateCcw,
  SlidersHorizontal,
  Pause,
  Play,
  X,
  Check,
  Sparkles,
  Shuffle,
} from 'lucide-react';
import { ContrastMode, FontSize } from '@/types';
import { formatDuration } from '@/lib/utils';
import ToriiGate from '@/components/japanese/ToriiGate';
import { useSoundEngine } from '@/hooks/useSoundEngine';

interface ExamHeaderProps {
  title: string;
  modeLabel: string;
  timeRemainingSeconds: number;
  contrastMode: ContrastMode;
  onContrastModeChange: (mode: ContrastMode) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  onGoHome?: () => void;
  onResetTime?: (newSeconds?: number) => void;
  onSetCustomTime?: (minutes: number) => void;
  isTimerPaused?: boolean;
  onTogglePauseTimer?: () => void;
  onRandomizePrompt?: () => void;
  defaultMinutes?: number;
}

export default function ExamHeader({
  title,
  modeLabel,
  timeRemainingSeconds,
  contrastMode,
  onContrastModeChange,
  fontSize,
  onFontSizeChange,
  onSubmit,
  isSubmitting,
  onGoHome,
  onResetTime,
  onSetCustomTime,
  isTimerPaused,
  onTogglePauseTimer,
  onRandomizePrompt,
  defaultMinutes = 60,
}: ExamHeaderProps) {
  const { playClick, playLockIn, playChime } = useSoundEngine();
  const [showTime, setShowTime] = useState(true);
  const [isTimeSettingsOpen, setIsTimeSettingsOpen] = useState(false);
  const [customInputMinutes, setCustomInputMinutes] = useState<string>(String(defaultMinutes));

  const isLowTime = timeRemainingSeconds <= 300 && timeRemainingSeconds > 0; // Under 5 minutes

  const handleApplyCustomMinutes = (mins: number) => {
    if (onSetCustomTime && mins > 0) {
      onSetCustomTime(mins);
      setIsTimeSettingsOpen(false);
    }
  };

  const handleManualInputApply = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInputMinutes, 10);
    if (!isNaN(val) && val > 0 && val <= 180) {
      handleApplyCustomMinutes(val);
    } else {
      alert('Vui lòng nhập số phút hợp lệ (từ 1 đến 180 phút).');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors select-none ${
          contrastMode === 'yellow-on-black'
            ? 'bg-black border-[#ffe600] text-[#ffe600]'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-950 border-zinc-800 text-white'
            : 'bg-white border-gray-200 text-gray-800 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 max-w-full gap-2">
          {/* Left section: Logo, Home button, Test Info */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Custom Avatar Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center shrink-0">
                <ToriiGate width={32} height={28} text="合格" glow={false} showShimenawa={true} />
              </div>

              <div className="hidden lg:flex flex-col">
                <span className="font-extrabold text-xs tracking-tight leading-normal">
                  CD-IELTS <span className="text-sky-600">Writing</span>
                </span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  Inspera Simulator
                </span>
              </div>
            </div>

            {/* Back to Home Button with Auto-save */}
            {onGoHome && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onGoHome();
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  contrastMode === 'yellow-on-black'
                    ? 'border-[#ffe600] text-[#ffe600] hover:bg-[#ffe600]/10'
                    : contrastMode === 'white-on-black'
                    ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-2xs'
                }`}
                title="Lưu tiến độ bài viết & thời gian làm bài rồi quay về Trang chủ"
              >
                <Home className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="hidden sm:inline">Về trang chủ</span>
              </button>
            )}

            <div className="flex items-center gap-1.5">
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                  contrastMode === 'yellow-on-black'
                    ? 'border-[#ffe600] text-[#ffe600]'
                    : contrastMode === 'white-on-black'
                    ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
                    : 'border-sky-200 bg-sky-50 text-sky-800'
                }`}
              >
                {modeLabel}
              </span>
              <span className="hidden xl:inline text-xs truncate max-w-[180px] opacity-75 font-medium">
                {title}
              </span>
            </div>
          </div>

          {/* Center section: Countdown Timer & Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Timer Box */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg border font-mono font-bold text-xs sm:text-sm tracking-wider transition-colors ${
                isLowTime
                  ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse'
                  : isTimerPaused
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                  : contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] bg-black text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 bg-zinc-900 text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-800 shadow-2xs'
              }`}
            >
              {isLowTime ? (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              ) : isTimerPaused ? (
                <Pause className="w-4 h-4 text-amber-500 animate-pulse" />
              ) : (
                <Clock className="w-4 h-4 text-sky-600" />
              )}
              {showTime ? (
                <div className="flex items-center gap-1">
                  <span>{formatDuration(timeRemainingSeconds)}</span>
                  {isTimerPaused && (
                    <span className="text-[11px] font-sans font-normal opacity-85 text-amber-500">
                      (Tạm dừng)
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs font-sans font-normal opacity-80">--:-- (Ẩn)</span>
              )}
            </div>

            {/* Pause / Resume Button */}
            {onTogglePauseTimer && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onTogglePauseTimer();
                }}
                className={`p-1.5 rounded-lg border text-xs flex items-center transition ${
                  isTimerPaused
                    ? 'bg-amber-500 text-white border-amber-500'
                    : contrastMode === 'yellow-on-black'
                    ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                    : contrastMode === 'white-on-black'
                    ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                    : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                }`}
                title={isTimerPaused ? 'Tiếp tục tính giờ làm bài' : 'Tạm dừng đồng hồ'}
              >
                {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Time Settings & Reset Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsTimeSettingsOpen(true);
              }}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              }`}
              title="Tùy chỉnh thời gian làm bài & Reset đồng hồ"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tùy chỉnh giờ</span>
            </button>

            {/* Randomize Prompt Button */}
            {onRandomizePrompt && (
              <button
                type="button"
                onClick={() => {
                  playChime();
                  onRandomizePrompt();
                }}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                  contrastMode === 'yellow-on-black'
                    ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                    : contrastMode === 'white-on-black'
                    ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                    : 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 text-sky-700 dark:text-sky-300'
                }`}
                title="Đổi sang đề thi ngẫu nhiên khác (đặt lại đồng hồ và làm mới bài viết)"
              >
                <Shuffle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="hidden sm:inline">Đổi đề khác</span>
              </button>
            )}

            {/* Toggle Hide/Show time */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowTime(!showTime);
              }}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              }`}
              title={showTime ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
            >
              {showTime ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showTime ? 'Ẩn' : 'Hiện'}</span>
            </button>
          </div>

          {/* Right section: Accessibility & Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div
              className={`hidden sm:flex items-center border rounded-lg overflow-hidden text-xs ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700'
                  : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onFontSizeChange('normal');
                }}
                className={`px-2 py-1 transition ${
                  fontSize === 'normal'
                    ? 'font-bold bg-sky-600 text-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Cỡ chữ tiêu chuẩn"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onFontSizeChange('large');
                }}
                className={`px-2 py-1 text-sm transition ${
                  fontSize === 'large'
                    ? 'font-bold bg-sky-600 text-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Cỡ chữ lớn"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onFontSizeChange('extra-large');
                }}
                className={`px-2 py-1 text-base transition ${
                  fontSize === 'extra-large'
                    ? 'font-bold bg-sky-600 text-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Cỡ chữ rất lớn"
              >
                A++
              </button>
            </div>

            {/* Contrast Mode Selector */}
            <div
              className={`flex items-center border rounded-lg overflow-hidden text-xs ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700'
                  : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onContrastModeChange('default');
                }}
                className={`p-1.5 transition ${
                  contrastMode === 'default'
                    ? 'bg-gray-200 text-gray-900 font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Mặc định: Đen trên Trắng"
              >
                <div className="w-3.5 h-3.5 rounded-full border border-gray-400 bg-white" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onContrastModeChange('white-on-black');
                }}
                className={`p-1.5 transition ${
                  contrastMode === 'white-on-black'
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Tương phản: Trắng trên Đen"
              >
                <div className="w-3.5 h-3.5 rounded-full border border-zinc-600 bg-black" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onContrastModeChange('yellow-on-black');
                }}
                className={`p-1.5 transition ${
                  contrastMode === 'yellow-on-black'
                    ? 'bg-zinc-800 text-[#ffe600] font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Tương phản cao: Vàng trên Đen (CD-IELTS Inspera)"
              >
                <div className="w-3.5 h-3.5 rounded-full border border-[#ffe600] bg-[#ffe600]" />
              </button>
            </div>

            {/* Submit / Finish test button */}
            <button
              type="button"
              onMouseEnter={() => playLockIn()}
              onClick={() => {
                playLockIn();
                onSubmit();
              }}
              disabled={isSubmitting}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                  : contrastMode === 'yellow-on-black'
                  ? 'bg-[#ffe600] text-black hover:bg-yellow-400 shadow-yellow-500/20'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Đang chấm...' : 'Nộp bài & Chấm AI'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Timer Settings & Reset Modal */}
      {isTimeSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">
                  Cài Đặt Thời Gian Làm Bài
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTimeSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* Reset to default button */}
              <div>
                <label className="font-bold text-gray-700 dark:text-zinc-300 block mb-1.5">
                  1. Khôi phục thời gian gốc:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (onResetTime) onResetTime();
                    setIsTimeSettingsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 font-semibold text-gray-700 dark:text-zinc-200 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
                  <span>Reset về mặc định ({defaultMinutes} phút)</span>
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <label className="font-bold text-gray-700 dark:text-zinc-300 block">
                  2. Chọn nhanh thời gian luyện tập:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 20, 30, 40, 45, 60, 75, 90].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleApplyCustomMinutes(m)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition ${
                        Math.round(timeRemainingSeconds / 60) === m
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                      }`}
                    >
                      {m}p
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Minutes Input */}
              <form onSubmit={handleManualInputApply} className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <label className="font-bold text-gray-700 dark:text-zinc-300 block">
                  3. Hoặc tự nhập số phút tùy ý:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={customInputMinutes}
                      onChange={(e) => setCustomInputMinutes(e.target.value)}
                      placeholder="Ví dụ: 45"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-gray-400">phút</span>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition shadow-xs"
                  >
                    Áp dụng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
