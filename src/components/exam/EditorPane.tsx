'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Save } from 'lucide-react';
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
}

export default function EditorPane({
  content,
  onChange,
  minWords,
  taskTitle,
  contrastMode,
  fontSize,
  lastSavedAt,
}: EditorPaneProps) {
  const words = countWords(content);
  const isSatisfied = words >= minWords;
  const [saveStatusText, setSaveStatusText] = useState('Đã tự động lưu');

  useEffect(() => {
    if (lastSavedAt) {
      setSaveStatusText('Đã tự động lưu nháp');
    }
  }, [lastSavedAt]);

  const fontSizeClasses = {
    normal: 'text-sm md:text-base leading-relaxed',
    large: 'text-base md:text-lg leading-relaxed',
    'extra-large': 'text-lg md:text-xl leading-relaxed',
  };

  return (
    <div
      className={`h-full flex flex-col transition-colors overflow-hidden ${
        contrastMode === 'yellow-on-black'
          ? 'bg-black text-[#ffe600]'
          : contrastMode === 'white-on-black'
          ? 'bg-zinc-950 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      {/* Editor Sub-header */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b select-none text-xs ${
          contrastMode === 'yellow-on-black'
            ? 'bg-zinc-950 border-[#ffe600]/30'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
            : 'bg-gray-50 border-gray-200 text-gray-700'
        }`}
      >
        <span className="font-semibold tracking-wide uppercase opacity-80 truncate max-w-sm">
          Writing Response Area — {taskTitle}
        </span>
        <div className="flex items-center gap-1.5 opacity-70 text-[11px]">
          <Save className="w-3.5 h-3.5" />
          <span>{saveStatusText}</span>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="flex-1 p-4 md:p-6 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Type your essay response here. Spellcheck and autocorrect are disabled to accurately simulate official CD-IELTS exam conditions..."
          className={`w-full h-full p-4 resize-none border rounded-lg focus:outline-none focus:ring-1 font-cdielts ${
            fontSizeClasses[fontSize]
          } ${
            contrastMode === 'yellow-on-black'
              ? 'bg-black border-[#ffe600]/40 text-[#ffe600] placeholder-[#ffe600]/40 focus:ring-[#ffe600]'
              : contrastMode === 'white-on-black'
              ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-sky-500'
          }`}
        />
      </div>

      {/* Bottom Bar: Word Counter with Minimum Badge */}
      <div
        className={`flex items-center justify-between px-4 md:px-6 py-2.5 border-t select-none transition-colors text-xs ${
          contrastMode === 'yellow-on-black'
            ? 'bg-zinc-950 border-[#ffe600]/30'
            : contrastMode === 'white-on-black'
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-medium opacity-80">Word count:</span>
            <span
              className={`font-mono text-sm font-bold ${
                isSatisfied
                  ? 'text-emerald-500'
                  : contrastMode === 'yellow-on-black'
                  ? 'text-[#ffe600]'
                  : 'text-amber-500'
              }`}
            >
              {words}
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
              isSatisfied
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
            }`}
          >
            {isSatisfied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đạt mốc tối thiểu (&ge; {minWords} từ)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Cần thêm {minWords - words} từ (Tối thiểu: {minWords})</span>
              </>
            )}
          </div>
        </div>

        <div className="text-[11px] opacity-60 hidden sm:block">
          Official CD-IELTS word counts are updated instantly as you type.
        </div>
      </div>
    </div>
  );
}
