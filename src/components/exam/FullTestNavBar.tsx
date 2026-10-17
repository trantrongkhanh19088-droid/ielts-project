'use client';

import React from 'react';
import { CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { ContrastMode } from '@/types';

interface FullTestNavBarProps {
  currentPart: 'task1' | 'task2';
  onSwitchPart: (part: 'task1' | 'task2') => void;
  task1WordCount: number;
  task2WordCount: number;
  contrastMode: ContrastMode;
}

export default function FullTestNavBar({
  currentPart,
  onSwitchPart,
  task1WordCount,
  task2WordCount,
  contrastMode,
}: FullTestNavBarProps) {
  const task1Satisfied = task1WordCount >= 150;
  const task2Satisfied = task2WordCount >= 250;

  return (
    <div
      className={`border-t select-none py-2 px-4 flex items-center justify-between transition-colors ${
        contrastMode === 'yellow-on-black'
          ? 'bg-black border-[#ffe600]/40 text-[#ffe600]'
          : contrastMode === 'white-on-black'
          ? 'bg-zinc-950 border-zinc-800 text-white'
          : 'bg-white border-gray-200 text-gray-800 shadow-inner'
      }`}
    >
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 opacity-70" />
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80 hidden sm:inline">
          Navigation:
        </span>

        {/* Part 1 (Task 1) Button */}
        <button
          type="button"
          onClick={() => onSwitchPart('task1')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-semibold transition ${
            currentPart === 'task1'
              ? contrastMode === 'yellow-on-black'
                ? 'bg-[#ffe600] text-black border-[#ffe600]'
                : 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : contrastMode === 'yellow-on-black'
              ? 'border-[#ffe600]/40 hover:bg-[#ffe600]/10'
              : contrastMode === 'white-on-black'
              ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
              : 'border-gray-200 hover:bg-gray-100 text-gray-700'
          }`}
        >
          <span>Part 1 (Task 1)</span>
          <span
            className={`text-[11px] px-1.5 py-0.5 rounded font-mono ${
              currentPart === 'task1'
                ? contrastMode === 'yellow-on-black'
                  ? 'bg-black text-[#ffe600]'
                  : 'bg-sky-700 text-white'
                : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300'
            }`}
          >
            {task1WordCount} / 150w
          </span>
          {task1Satisfied && (
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                currentPart === 'task1' ? 'text-white' : 'text-emerald-500'
              }`}
            />
          )}
        </button>

        <ChevronRight className="w-3.5 h-3.5 opacity-40" />

        {/* Part 2 (Task 2) Button */}
        <button
          type="button"
          onClick={() => onSwitchPart('task2')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-semibold transition ${
            currentPart === 'task2'
              ? contrastMode === 'yellow-on-black'
                ? 'bg-[#ffe600] text-black border-[#ffe600]'
                : 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : contrastMode === 'yellow-on-black'
              ? 'border-[#ffe600]/40 hover:bg-[#ffe600]/10'
              : contrastMode === 'white-on-black'
              ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
              : 'border-gray-200 hover:bg-gray-100 text-gray-700'
          }`}
        >
          <span>Part 2 (Task 2)</span>
          <span
            className={`text-[11px] px-1.5 py-0.5 rounded font-mono ${
              currentPart === 'task2'
                ? contrastMode === 'yellow-on-black'
                  ? 'bg-black text-[#ffe600]'
                  : 'bg-sky-700 text-white'
                : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300'
            }`}
          >
            {task2WordCount} / 250w
          </span>
          {task2Satisfied && (
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                currentPart === 'task2' ? 'text-white' : 'text-emerald-500'
              }`}
            />
          )}
        </button>
      </div>

      <div className="text-xs opacity-75 hidden md:block">
        IELTS Official Inspera: Bạn có thể tự do chuyển đổi giữa Part 1 &amp; Part 2 bất cứ lúc nào trong 60 phút.
      </div>
    </div>
  );
}
