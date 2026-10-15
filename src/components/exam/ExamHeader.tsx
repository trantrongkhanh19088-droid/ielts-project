'use client';

import React, { useState } from 'react';
import {
  Clock,
  Eye,
  EyeOff,
  Type,
  SunMoon,
  Key,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { ContrastMode, FontSize } from '@/types';
import { formatDuration } from '@/lib/utils';
import ApiKeyModal from './ApiKeyModal';

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
}: ExamHeaderProps) {
  const [showTime, setShowTime] = useState(true);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const isLowTime = timeRemainingSeconds <= 300; // Under 5 minutes

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors select-none ${
          contrastMode === 'yellow-on-black'
            ? 'bg-black border-[#ffe600] text-[#ffe600]'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-950 border-zinc-800 text-white'
            : 'bg-white border-gray-200 text-gray-800 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 max-w-full">
          {/* Left section: Test Info & Mode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base font-cdielts">
                IELTS Writing Simulator
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium border ${
                  contrastMode === 'yellow-on-black'
                    ? 'border-[#ffe600] text-[#ffe600]'
                    : contrastMode === 'white-on-black'
                    ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
                    : 'border-sky-200 bg-sky-50 text-sky-800'
                }`}
              >
                {modeLabel}
              </span>
            </div>
            <span className="hidden md:inline-block text-xs opacity-60">|</span>
            <span className="hidden lg:inline-block text-xs truncate max-w-xs opacity-75">
              {title}
            </span>
          </div>

          {/* Center section: Countdown Timer */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-md border font-mono font-bold text-sm tracking-wider transition-colors ${
                isLowTime
                  ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse'
                  : contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] bg-black text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 bg-zinc-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-gray-800'
              }`}
            >
              {isLowTime ? (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
              {showTime ? (
                <span>{formatDuration(timeRemainingSeconds)}</span>
              ) : (
                <span className="text-xs font-sans font-normal opacity-80">--:-- (Ẩn)</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowTime(!showTime)}
              className={`p-1.5 rounded border text-xs flex items-center gap-1 transition ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              }`}
              title={showTime ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
            >
              {showTime ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showTime ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          {/* Right section: Accessibility & Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div
              className={`hidden sm:flex items-center border rounded overflow-hidden text-xs ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700'
                  : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={() => onFontSizeChange('normal')}
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
                onClick={() => onFontSizeChange('large')}
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
                onClick={() => onFontSizeChange('extra-large')}
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
              className={`flex items-center border rounded overflow-hidden text-xs ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700'
                  : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={() => onContrastModeChange('default')}
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
                onClick={() => onContrastModeChange('white-on-black')}
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
                onClick={() => onContrastModeChange('yellow-on-black')}
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

            {/* BYOK Settings button */}
            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className={`p-1.5 rounded border transition ${
                contrastMode === 'yellow-on-black'
                  ? 'border-[#ffe600] hover:bg-[#ffe600]/10 text-[#ffe600]'
                  : contrastMode === 'white-on-black'
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              }`}
              title="Cài đặt Gemini API Key cá nhân (BYOK)"
            >
              <Key className="w-4 h-4" />
            </button>

            {/* Submit / Finish test button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md font-semibold text-xs sm:text-sm shadow-sm transition ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                  : contrastMode === 'yellow-on-black'
                  ? 'bg-[#ffe600] text-black hover:bg-yellow-400'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Đang chấm bài...' : 'Finish test'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* BYOK Modal */}
      <ApiKeyModal isOpen={isKeyModalOpen} onClose={() => setIsKeyModalOpen(false)} />
    </>
  );
}
