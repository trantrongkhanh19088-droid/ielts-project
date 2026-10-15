'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Save,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  AlignLeft,
  FileText,
} from 'lucide-react';
import { ContrastMode, FontSize } from '@/types';
import { countWords } from '@/lib/utils';

interface EditorPaneProps {
  content: string;
  onChange: (value: string) => void;
  minWords: number;
  taskTitle: string;
  contrastMode: ContrastMode;
  fontSize: FontSize;
  lastSavedAt?: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onFontSizeChange?: (size: FontSize) => void;
}

type EditorFontFamily = 'sans' | 'cdielts' | 'serif';

export default function EditorPane({
  content,
  onChange,
  minWords,
  taskTitle,
  contrastMode,
  fontSize,
  lastSavedAt,
  isFullscreen,
  onToggleFullscreen,
  onFontSizeChange,
}: EditorPaneProps) {
  const words = countWords(content);
  const isSatisfied = words >= minWords;
  const progressPercent = Math.min(100, Math.round((words / minWords) * 100));

  const [copied, setCopied] = useState(false);
  const [editorFont, setEditorFont] = useState<EditorFontFamily>('sans');

  // Compute character and paragraph counts
  const stats = useMemo(() => {
    const trimmed = content.trim();
    const chars = content.length;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    const readingTimeMinutes = (words / 150).toFixed(1);
    return { chars, paragraphs, readingTimeMinutes };
  }, [content, words]);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (!content) return;
    const confirmClear = confirm('Bạn có chắc chắn muốn xóa toàn bộ nội dung bài viết này để làm lại không?');
    if (confirmClear) {
      onChange('');
    }
  };

  // Font size styling
  const fontSizeClasses = {
    normal: 'text-sm md:text-[15px] leading-[1.75]',
    large: 'text-base md:text-[17px] leading-[1.8]',
    'extra-large': 'text-lg md:text-[19px] leading-[1.85]',
  };

  const fontFamilyClasses: Record<EditorFontFamily, string> = {
    sans: 'font-sans',
    cdielts: 'font-cdielts',
    serif: 'font-serif',
  };

  return (
    <div
      className={`h-full flex flex-col transition-colors overflow-hidden select-text ${
        contrastMode === 'yellow-on-black'
          ? 'bg-black text-[#ffe600]'
          : contrastMode === 'white-on-black'
          ? 'bg-zinc-950 text-white'
          : 'bg-slate-50/50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100'
      }`}
    >
      {/* Top Toolbar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b select-none text-xs transition-colors ${
          contrastMode === 'yellow-on-black'
            ? 'bg-zinc-950 border-[#ffe600]/30'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
            : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 shadow-sm'
        }`}
      >
        {/* Left: Task Indicator & Auto-save status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{taskTitle}</span>
          </div>

          <span className="text-gray-300 dark:text-zinc-700 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-500 dark:text-zinc-400">
            <Save className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Tự động lưu nháp</span>
          </div>
        </div>

        {/* Right: Font Controls & Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Type Toggle (Sans / CD-IELTS Arial / Serif) */}
          <div className="flex rounded-md p-0.5 bg-gray-100 dark:bg-zinc-800 text-[11px] font-medium border border-gray-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setEditorFont('sans')}
              className={`px-1.5 py-0.5 rounded transition ${
                editorFont === 'sans'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
              title="Phông chữ Hiện đại (Inter) - Dễ đọc & thoáng mắt"
            >
              Inter
            </button>
            <button
              type="button"
              onClick={() => setEditorFont('cdielts')}
              className={`px-1.5 py-0.5 rounded transition ${
                editorFont === 'cdielts'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
              title="Phông chữ Chuẩn CD-IELTS (Arial) - Y hệt máy thi thật"
            >
              Arial
            </button>
            <button
              type="button"
              onClick={() => setEditorFont('serif')}
              className={`px-1.5 py-0.5 rounded transition ${
                editorFont === 'serif'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
              title="Phông chữ Báo chí (Georgia) - Trang trọng"
            >
              Serif
            </button>
          </div>

          {/* Quick Font Size Switcher if onFontSizeChange is provided */}
          {onFontSizeChange && (
            <div className="hidden md:flex rounded-md p-0.5 bg-gray-100 dark:bg-zinc-800 text-[11px] font-medium border border-gray-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => onFontSizeChange('normal')}
                className={`px-1.5 py-0.5 rounded transition ${
                  fontSize === 'normal'
                    ? 'bg-white dark:bg-zinc-900 text-sky-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Cỡ chữ tiêu chuẩn (15px)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('large')}
                className={`px-1.5 py-0.5 rounded transition ${
                  fontSize === 'large'
                    ? 'bg-white dark:bg-zinc-900 text-sky-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Cỡ chữ vừa (17px)"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('extra-large')}
                className={`px-1.5 py-0.5 rounded transition ${
                  fontSize === 'extra-large'
                    ? 'bg-white dark:bg-zinc-900 text-sky-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Cỡ chữ lớn (19px)"
              >
                A++
              </button>
            </div>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
              copied
                ? 'bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/40'
                : 'border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300'
            }`}
            title="Sao chép toàn bộ bài viết"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xl:inline">{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
          </button>

          {/* Clear Button */}
          {content.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 text-gray-400 transition"
              title="Xóa nội dung làm lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition"
              title={isFullscreen ? 'Thu nhỏ về chế độ 2 cột (50:50)' : 'Phóng to khung viết toàn màn hình để tập trung'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Interactive Word Target Progress Bar */}
      <div className="px-4 py-1.5 bg-gray-50/70 dark:bg-zinc-900/40 border-b border-gray-100 dark:border-zinc-800/80 select-none">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-600 dark:text-zinc-300">Tiến độ độ dài:</span>
            <span
              className={`font-mono font-bold ${
                isSatisfied
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {words} / {minWords} từ
            </span>
            <span className="text-gray-400">({progressPercent}%)</span>
          </div>

          <div>
            {isSatisfied ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã đạt chuẩn tối thiểu (&ge; {minWords} từ)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Cần thêm tối thiểu {minWords - words} từ nữa</span>
              </span>
            )}
          </div>
        </div>

        {/* Bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isSatisfied
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-gradient-to-r from-amber-400 to-orange-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Textarea Container - Paper feel */}
      <div className="flex-1 p-3 sm:p-4 md:p-5 relative overflow-hidden flex flex-col">
        <div className="w-full h-full flex flex-col rounded-xl overflow-hidden shadow-xs border border-gray-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all bg-white dark:bg-zinc-900">
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={`Bắt đầu nhập bài làm của bạn tại đây...\n\n(Lưu ý: Hệ thống đã tắt tính năng tự sửa lỗi và gạch chân đỏ để mô phỏng 100% điều kiện phòng thi CD-IELTS chính thức).`}
            className={`w-full flex-1 p-4 sm:p-5 md:p-6 resize-none focus:outline-none transition-colors selection:bg-sky-500/20 ${
              fontSizeClasses[fontSize]
            } ${fontFamilyClasses[editorFont]} ${
              contrastMode === 'yellow-on-black'
                ? 'bg-black text-[#ffe600] placeholder-[#ffe600]/40'
                : contrastMode === 'white-on-black'
                ? 'bg-zinc-900 text-zinc-100 placeholder-zinc-500'
                : 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500'
            }`}
          />
        </div>
      </div>

      {/* Bottom Status Bar: Metrics and Live Stats */}
      <div
        className={`flex items-center justify-between px-4 sm:px-6 py-2 border-t select-none transition-colors text-xs ${
          contrastMode === 'yellow-on-black'
            ? 'bg-zinc-950 border-[#ffe600]/30'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
            : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[11px] text-gray-400">Số từ:</span>
            <span
              className={`text-sm font-bold ${
                isSatisfied
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {words}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="font-sans text-[11px] text-gray-400">Ký tự:</span>
            <span className="text-xs font-semibold">{stats.chars}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="font-sans text-[11px] text-gray-400">Đoạn văn:</span>
            <span className="text-xs font-semibold">{stats.paragraphs}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <span className="font-sans text-[11px] text-gray-400">Thời gian đọc:</span>
            <span className="text-xs font-semibold">~{stats.readingTimeMinutes} phút</span>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 font-sans hidden sm:block">
          Mô phỏng CD-IELTS Inspera: Số từ được tính theo thời gian thực
        </div>
      </div>
    </div>
  );
}
