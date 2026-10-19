'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, CheckCircle2, RotateCcw } from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';

/**
 * Live Mini-Inspera Telemetry Workstation HUD
 * Adaptive Light / Dark Theme:
 * - Light Mode: Clinical laboratory white/light-grey Inspera workstation surface.
 * - Dark Mode: Graphite Slate (#161821) high-contrast HUD.
 */
interface InsperaWorkstationHUDProps {
  forcedTask?: 'task1' | 'task2';
}

export default function InsperaWorkstationHUD({ forcedTask }: InsperaWorkstationHUDProps = {}) {
  const { playClick, playTick } = useSoundEngine();
  const [secondsRemaining, setSecondsRemaining] = useState(3582); // 59:42
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task2');
  const [isExamLive, setIsExamLive] = useState(true);

  useEffect(() => {
    if (forcedTask) {
      setActiveTask(forcedTask);
    }
  }, [forcedTask]);

  // Live ticking countdown
  useEffect(() => {
    if (!isExamLive) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 3600;
        playTick();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamLive, playTick]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Word count progression simulation based on elapsed seconds
  const elapsed = 3600 - secondsRemaining;
  const task1Words = Math.min(156, Math.floor(30 + elapsed * 0.35));
  const task2Words = Math.min(274, Math.floor(50 + elapsed * 0.62));

  // Dynamic 4-Axis AI Criteria scores
  const criteria = {
    ta: activeTask === 'task2' ? 8.5 : 8.0,
    cc: activeTask === 'task2' ? 8.0 : 8.5,
    lr: activeTask === 'task2' ? 8.5 : 8.0,
    gra: activeTask === 'task2' ? 8.0 : 8.0,
  };

  const cX = 80;
  const cY = 80;
  const maxR = 60;

  const pTA = { x: cX, y: cY - (criteria.ta / 9) * maxR };
  const pCC = { x: cX + (criteria.cc / 9) * maxR, y: cY };
  const pLR = { x: cX, y: cY + (criteria.lr / 9) * maxR };
  const pGRA = { x: cX - (criteria.gra / 9) * maxR, y: cY };

  const polygonPoints = `${pTA.x},${pTA.y} ${pCC.x},${pCC.y} ${pLR.x},${pLR.y} ${pGRA.x},${pGRA.y}`;

  return (
    <div className="relative rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] p-5 text-stone-900 dark:text-[#F4F4F0] shadow-xl dark:shadow-2xl font-sans overflow-hidden transition-colors duration-300">
      {/* Architectural Corner Crosshairs */}
      <span className="absolute top-1 left-1.5 font-mono text-[10px] text-stone-400 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute top-1 right-1.5 font-mono text-[10px] text-stone-400 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute bottom-1 left-1.5 font-mono text-[10px] text-stone-400 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute bottom-1 right-1.5 font-mono text-[10px] text-stone-400 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-stone-700 dark:text-[rgba(244,244,240,0.7)] font-bold">
            INSPERA TEST ENGINE v2026.4
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 border border-[#FF3B1D]/30 dark:border-[#FF3B1D]/40 text-[#FF3B1D] font-mono text-[10px] uppercase font-bold tracking-tight">
          <ShieldAlert className="w-3 h-3 shrink-0" />
          <span>AUTO-CORRECT: LOCKED OFF</span>
        </div>
      </div>

      {/* Clock & Exam Status Segment */}
      <div className="grid grid-cols-2 gap-3 py-4 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
        {/* Countdown Timer */}
        <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#090A0F]/80 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)] uppercase tracking-wider mb-1">
            <span>OFFICIAL COUNTDOWN</span>
            <span className="text-[#FF3B1D] font-bold">UNPAUSABLE</span>
          </div>
          <div className="font-mono text-3xl font-extrabold tracking-tight tabular-nums text-stone-900 dark:text-[#F4F4F0] flex items-baseline gap-1">
            <span>{formatTime(secondsRemaining)}</span>
            <span className="text-xs text-stone-400 dark:text-[rgba(244,244,240,0.4)] font-normal">/ 60:00</span>
          </div>
        </div>

        {/* Word Count Live Progression */}
        <div className="p-3 rounded-lg bg-stone-50 dark:bg-[#090A0F]/80 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)] uppercase tracking-wider">
            <span>WORD COUNTER</span>
            <span className="text-[#10B981] flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" /> THỎA MÃN
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <div>
              <span className="font-mono text-xl font-bold tabular-nums text-stone-900 dark:text-[#F4F4F0]">
                {activeTask === 'task1' ? task1Words : task2Words}
              </span>
              <span className="text-xs font-mono text-stone-400 dark:text-[rgba(244,244,240,0.4)] ml-1">
                / {activeTask === 'task1' ? '150' : '250'} words
              </span>
            </div>
            <div className="text-[10px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
              {activeTask === 'task1' ? 'Task 1 (Academic)' : 'Task 2 (Essay)'}
            </div>
          </div>
        </div>
      </div>

      {/* Task Switcher & 4-Axis AI Radar */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Left: Task switcher and AI Diagnostic status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTask('task1');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                activeTask === 'task1'
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-[#F4F4F0] dark:text-[#090A0F] dark:border-[#F4F4F0] shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:border-stone-300 dark:bg-[#090A0F]/50 dark:text-[rgba(244,244,240,0.6)] dark:border-[rgba(244,244,240,0.1)] dark:hover:border-[rgba(244,244,240,0.3)]'
              }`}
            >
              01 // Task 1 (150w)
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveTask('task2');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                activeTask === 'task2'
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-[#F4F4F0] dark:text-[#090A0F] dark:border-[#F4F4F0] shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:border-stone-300 dark:bg-[#090A0F]/50 dark:text-[rgba(244,244,240,0.6)] dark:border-[rgba(244,244,240,0.1)] dark:hover:border-[rgba(244,244,240,0.3)]'
              }`}
            >
              02 // Task 2 (250w)
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-[#090A0F]/50 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-stone-500 dark:text-[rgba(244,244,240,0.5)]">AI EXAMINER CALIBRATION:</span>
              <span className="text-[#10B981] font-bold">BAND 8.5</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-stone-600 dark:text-[rgba(244,244,240,0.7)]">
                <span>TA:</span> <strong className="text-stone-900 dark:text-[#F4F4F0]">{criteria.ta.toFixed(1)}</strong>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-[rgba(244,244,240,0.7)]">
                <span>CC:</span> <strong className="text-stone-900 dark:text-[#F4F4F0]">{criteria.cc.toFixed(1)}</strong>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-[rgba(244,244,240,0.7)]">
                <span>LR:</span> <strong className="text-[#10B981]">{criteria.lr.toFixed(1)}</strong>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-[rgba(244,244,240,0.7)]">
                <span>GRA:</span> <strong className="text-stone-900 dark:text-[#F4F4F0]">{criteria.gra.toFixed(1)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic 4-Axis AI Radar Visualizer (SVG) */}
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-stone-50 dark:bg-[#090A0F]/60 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
          <div className="relative w-[160px] h-[160px]">
            <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
              {/* Background Concentric Grid Web (Band 3, 6, 9) */}
              {[20, 40, 60].map((r, idx) => (
                <polygon
                  key={idx}
                  points={`${cX},${cY - r} ${cX + r},${cY} ${cX},${cY + r} ${cX - r},${cY}`}
                  fill="none"
                  stroke="currentColor"
                  className="text-stone-300 dark:text-[rgba(244,244,240,0.14)]"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Axis Crosshairs */}
              <line x1={cX} y1={cY - maxR} x2={cX} y2={cY + maxR} stroke="currentColor" className="text-stone-300 dark:text-[rgba(244,244,240,0.18)]" strokeWidth="1" />
              <line x1={cX - maxR} y1={cY} x2={cX + maxR} y2={cY} stroke="currentColor" className="text-stone-300 dark:text-[rgba(244,244,240,0.18)]" strokeWidth="1" />

              {/* Dynamic Rubric Area */}
              <polygon
                points={polygonPoints}
                fill="rgba(16, 185, 129, 0.22)"
                stroke="#10B981"
                strokeWidth="1.8"
                className="transition-all duration-500 ease-out"
              />

              {/* Corner Value Nodes */}
              <circle cx={pTA.x} cy={pTA.y} r="3" fill="#10B981" />
              <circle cx={pCC.x} cy={pCC.y} r="3" fill="#10B981" />
              <circle cx={pLR.x} cy={pLR.y} r="3" fill="#10B981" />
              <circle cx={pGRA.x} cy={pGRA.y} r="3" fill="#10B981" />

              {/* Monospace Axis Labels */}
              <text x={cX} y={cY - maxR - 4} textAnchor="middle" className="text-[9px] font-mono fill-stone-600 dark:fill-[rgba(244,244,240,0.7)] font-bold">
                TA
              </text>
              <text x={cX + maxR + 5} y={cY + 3} textAnchor="start" className="text-[9px] font-mono fill-stone-600 dark:fill-[rgba(244,244,240,0.7)] font-bold">
                CC
              </text>
              <text x={cX} y={cY + maxR + 10} textAnchor="middle" className="text-[9px] font-mono fill-stone-600 dark:fill-[rgba(244,244,240,0.7)] font-bold">
                LR
              </text>
              <text x={cX - maxR - 5} y={cY + 3} textAnchor="end" className="text-[9px] font-mono fill-stone-600 dark:fill-[rgba(244,244,240,0.7)] font-bold">
                GRA
              </text>
            </svg>
          </div>
          <span className="font-mono text-[9px] text-stone-500 dark:text-[rgba(244,244,240,0.4)] uppercase tracking-wider mt-1">
            4-CRITERIA RUBRIC RADAR
          </span>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="pt-3 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-[#10B981]" />
          <span>GEMINI 2.5 FLASH DUAL EXAMINER ENGINE READY</span>
        </div>
        <button
          type="button"
          onClick={() => {
            playClick();
            setSecondsRemaining(3600);
          }}
          className="flex items-center gap-1 text-stone-500 hover:text-[#FF3B1D] dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#FF3B1D] transition-colors"
          title="Khởi động lại mô phỏng"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
}
