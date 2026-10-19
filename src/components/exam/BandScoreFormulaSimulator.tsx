'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';

/**
 * Interactive British Council Band Score Formula Simulator
 * Supports Light & Dark Modes:
 * - Light: Crisp paper surface with high-contrast typography.
 * - Dark: Obsidian and Graphite Slate clinical interface.
 */
export default function BandScoreFormulaSimulator() {
  const { playClick } = useSoundEngine();
  const [task1Band, setTask1Band] = useState<number>(6.5);
  const [task2Band, setTask2Band] = useState<number>(8.0);

  const rawScore = (task1Band + task2Band * 2) / 3;

  const calculateIELTSBand = (raw: number) => {
    const whole = Math.floor(raw);
    const frac = raw - whole;
    if (frac < 0.25) return whole;
    if (frac < 0.75) return whole + 0.5;
    return whole + 1.0;
  };

  const finalBand = calculateIELTSBand(rawScore);

  return (
    <div className="p-4 rounded-xl bg-stone-50/90 dark:bg-[#090A0F]/90 border border-stone-200/90 dark:border-[rgba(244,244,240,0.1)] space-y-4 font-sans text-stone-900 dark:text-[#F4F4F0] transition-colors duration-300">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
        <div className="flex items-center gap-2">
          <Calculator className="w-3.5 h-3.5 text-[#FF3B1D]" />
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-stone-700 dark:text-[rgba(244,244,240,0.7)]">
            CÔNG THỨC CHẤM CHUẨN BRITISH COUNCIL &amp; IDP
          </span>
        </div>
        <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 text-[#FF3B1D] border border-[#FF3B1D]/30 dark:border-[#FF3B1D]/40 font-bold uppercase">
          TASK 2 HỆ SỐ 2
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Task 1 Slider */}
        <div className="space-y-1.5 p-3 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] shadow-xs">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-stone-500 dark:text-[rgba(244,244,240,0.6)]">TASK 1 (HỆ SỐ 1):</span>
            <span className="text-stone-900 dark:text-[#F4F4F0] font-bold text-sm tabular-nums">BAND {task1Band.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="9.0"
            step="0.5"
            value={task1Band}
            onChange={(e) => {
              playClick();
              setTask1Band(parseFloat(e.target.value));
            }}
            className="w-full accent-stone-900 dark:accent-[#F4F4F0] cursor-pointer h-1.5 bg-stone-200 dark:bg-[#090A0F] rounded-lg"
          />
          <div className="flex justify-between font-mono text-[9px] text-stone-400 dark:text-[rgba(244,244,240,0.4)]">
            <span>4.0</span>
            <span>6.5</span>
            <span>9.0</span>
          </div>
        </div>

        {/* Task 2 Slider */}
        <div className="space-y-1.5 p-3 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] shadow-xs">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-stone-500 dark:text-[rgba(244,244,240,0.6)]">TASK 2 (HỆ SỐ 2):</span>
            <span className="text-[#10B981] font-bold text-sm tabular-nums">BAND {task2Band.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="9.0"
            step="0.5"
            value={task2Band}
            onChange={(e) => {
              playClick();
              setTask2Band(parseFloat(e.target.value));
            }}
            className="w-full accent-[#10B981] cursor-pointer h-1.5 bg-stone-200 dark:bg-[#090A0F] rounded-lg"
          />
          <div className="flex justify-between font-mono text-[9px] text-stone-400 dark:text-[rgba(244,244,240,0.4)]">
            <span>4.0</span>
            <span>7.5</span>
            <span>9.0</span>
          </div>
        </div>
      </div>

      {/* Math Breakdown & Final Score Indicator */}
      <div className="p-3.5 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-mono text-xs text-stone-700 dark:text-[rgba(244,244,240,0.7)] flex items-center gap-1.5">
            <span>Công thức:</span>
            <code className="text-stone-900 dark:text-[#F4F4F0] bg-stone-100 dark:bg-[#090A0F] px-2 py-0.5 rounded border border-stone-200 dark:border-[rgba(244,244,240,0.1)]">
              ({task1Band.toFixed(1)} + {task2Band.toFixed(1)} &times; 2) / 3 = {rawScore.toFixed(2)}
            </code>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
            Áp dụng quy tắc làm tròn .25 &rarr; .5 và .75 &rarr; 1.0 của Hội đồng khảo thí.
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="font-mono text-[10px] text-stone-500 dark:text-[rgba(244,244,240,0.5)] uppercase tracking-wider block">
              OVERALL WRITING
            </span>
            <span className="font-mono text-2xl font-extrabold text-[#10B981] tabular-nums">
              BAND {finalBand.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
