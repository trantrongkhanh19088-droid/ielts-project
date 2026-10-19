'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sprout,
  BarChart3,
  PenTool,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  ShieldAlert,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';
import InsperaWorkstationHUD from './InsperaWorkstationHUD';

export type ExamMode = 'full_test' | 'builder' | 'task1' | 'task2';

export default function MinimalMotionHero() {
  const { playClick, playLockIn } = useSoundEngine();
  const [titleNumber, setTitleNumber] = useState(0);
  const [activeMode, setActiveMode] = useState<ExamMode>('full_test');

  const titles = useMemo(
    () => [
      'Phòng Thi Inspera 2026',
      'AI Giám Khảo Song Động Cơ',
      'Lộ Trình Cây Đậu N Tầng',
      '107 Đề Forecast Band 8.0+',
      'Áp Lực 60 Phút Thực Chiến',
    ],
    []
  );

  // Rotating headline cycler with spring physics
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2800);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  const modeDescriptions: Record<ExamMode, { title: string; subtitle: string; link: string; badge: string }> = {
    full_test: {
      title: 'Full Test 60 Phút Liền Mạch',
      subtitle: 'Mô phỏng 100% giao diện thi thật Inspera, đồng hồ 60:00 đếm ngược và khóa tính năng tự sửa lỗi.',
      link: '/practice?mode=full_test',
      badge: 'FLAGSHIP // OFFICIAL SIMULATOR',
    },
    builder: {
      title: 'Writing Builder (Cây Đậu N Tầng)',
      subtitle: 'Phương pháp rèn cấu trúc viết từ 5 tầng cơ bản đến 30 tầng chuyên sâu với Check & Update Engine.',
      link: '/builder',
      badge: 'DUAL AI // STRUCTURAL METHOD',
    },
    task1: {
      title: 'Academic Task 1: Biểu Đồ & Quy Trình',
      subtitle: '20 phút &bull; 150 từ: Rèn kỹ năng trích xuất Overview sắc bén và dẫn chứng số liệu đối sánh chuẩn mực.',
      link: '/practice?mode=task1',
      badge: 'CRITERIA // TASK ACHIEVEMENT',
    },
    task2: {
      title: 'Discursive Task 2: Nghị Luận Xã Hội',
      subtitle: '40 phút &bull; 250 từ: Lập luận đa chiều, kiểm tra Thesis statement và mạch Cohesion & Coherence.',
      link: '/practice?mode=task2',
      badge: 'CRITERIA // BAND 8.0+ ARGUMENT',
    },
  };

  const hudTask = activeMode === 'task1' ? 'task1' : 'task2';

  return (
    <section className="relative z-20 pt-8 sm:pt-14 pb-16 sm:pb-22 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left 7 Columns: Minimal Motion Command Center */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Specification Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] font-mono text-[11px] text-stone-700 dark:text-[rgba(244,244,240,0.8)] tracking-wider uppercase shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] -ml-3.5" />
              <span className="font-semibold text-stone-900 dark:text-[#F4F4F0]">Specification 2026</span>
              <span className="text-stone-300 dark:text-[rgba(244,244,240,0.3)]">//</span>
              <span>Mô phỏng 100% Giao diện Thi Thật Inspera</span>
            </motion.div>

            {/* Monumental Headline with Spring Word Motion */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] text-stone-900 dark:text-[#F4F4F0] leading-[1.12]">
                <span>Luyện thi IELTS Writing</span>
                <span className="block mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl text-stone-500 dark:text-[rgba(244,244,240,0.55)] font-semibold">
                  chuẩn hóa theo{' '}
                  <span className="relative inline-flex overflow-hidden align-baseline font-extrabold text-[#FF3B1D] pb-1 min-w-[280px] sm:min-w-[420px] h-[1.25em]">
                    &nbsp;
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute left-0 top-0 whitespace-nowrap text-[#FF3B1D] font-extrabold"
                        initial={{ opacity: 0, y: -40 }}
                        animate={
                          titleNumber === index
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: titleNumber > index ? -50 : 50 }
                        }
                        transition={{
                          type: 'spring',
                          stiffness: 90,
                          damping: 15,
                        }}
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 dark:text-[rgba(244,244,240,0.68)] max-w-[62ch] font-normal leading-relaxed pt-1">
                Trải nghiệm áp lực thực tế của kỳ thi trên máy: giao diện Inspera nguyên bản, vô hiệu hóa tính năng tự sửa lỗi, đồng hồ đếm ngược từng giây, và AI Giám khảo đối chiếu theo 4 tiêu chí chuẩn British Council &amp; IDP.
              </p>
            </div>

            {/* Interactive Mode Selector (State the visitor can change and see respond) */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-200/60 dark:bg-[#161821]/80 border border-stone-200 dark:border-[rgba(244,244,240,0.08)] max-w-fit overflow-x-auto">
                {[
                  { id: 'full_test', label: 'Full Test (60P)', icon: Flame },
                  { id: 'builder', label: 'Writing Builder', icon: Sprout },
                  { id: 'task1', label: 'Academic Task 1', icon: BarChart3 },
                  { id: 'task2', label: 'Task 2 Essay', icon: PenTool },
                ].map((m) => {
                  const Icon = m.icon;
                  const isActive = activeMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        setActiveMode(m.id as ExamMode);
                      }}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all select-none ${
                        isActive
                          ? 'text-white shadow-sm'
                          : 'text-stone-600 dark:text-[rgba(244,244,240,0.6)] hover:text-stone-900 dark:hover:text-[#F4F4F0]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="hero-active-pill"
                          className="absolute inset-0 rounded-xl bg-[#FF3B1D]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{m.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Mode Card Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="mt-3 p-4 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.1)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#FF3B1D] uppercase tracking-wider">
                        {modeDescriptions[activeMode].badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-stone-900 dark:text-[#F4F4F0]">
                      {modeDescriptions[activeMode].title}
                    </div>
                    <div
                      className="text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.6)]"
                      dangerouslySetInnerHTML={{ __html: modeDescriptions[activeMode].subtitle }}
                    />
                  </div>

                  <Link
                    href={modeDescriptions[activeMode].link}
                    onMouseEnter={() => {
                      if (activeMode === 'full_test') playLockIn();
                    }}
                    onClick={() => playClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] hover:bg-[#FF3B1D] dark:hover:bg-[#FF3B1D] dark:hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs shrink-0 group"
                  >
                    <span>Vào Luyện Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Tactical Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Primary Flagship CTA */}
              <Link
                href="/practice?mode=full_test"
                onMouseEnter={() => playLockIn()}
                onClick={() => playClick()}
                className="p-4 rounded-xl bg-[#FF3B1D] text-white hover:bg-[#FF3B1D]/90 transition-all flex items-center justify-between group shadow-md"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/80 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>FLAGSHIP // FULL TEST</span>
                  </div>
                  <div className="text-sm font-bold tracking-tight">Thi Thử Full Test (60 Phút)</div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Method CTA */}
              <Link
                href="/builder"
                onClick={() => playClick()}
                className="p-4 rounded-xl bg-white dark:bg-[#161821] border border-[#10B981]/50 text-stone-900 dark:text-[#F4F4F0] hover:border-[#10B981] transition-all flex items-center justify-between group shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#10B981] font-bold uppercase tracking-wider">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>PHƯƠNG PHÁP MỚI</span>
                  </div>
                  <div className="text-sm font-bold tracking-tight">Writing Builder (Cây Đậu N Tầng)</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#10B981] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Micro Telemetry Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF3B1D]" />
                <span>60:00 Phút chuẩn Inspera</span>
              </span>
              <span className="text-stone-300 dark:text-stone-700">&bull;</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                <span>107 Bộ đề Forecast kèm dàn ý</span>
              </span>
              <span className="text-stone-300 dark:text-stone-700">&bull;</span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>Khóa Auto-Correct tuyệt đối</span>
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Synchronized Interactive Inspera Workstation HUD */}
          <div className="lg:col-span-5 relative">
            <InsperaWorkstationHUD forcedTask={hudTask} />
          </div>
        </div>
      </div>
    </section>
  );
}
