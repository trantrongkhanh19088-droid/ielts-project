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
  CheckCircle2,
} from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';

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

  const modeDescriptions: Record<
    ExamMode,
    { title: string; subtitle: string; link: string; badge: string; meta: string }
  > = {
    full_test: {
      title: 'Full Test 60 Phút Liền Mạch',
      subtitle:
        'Mô phỏng 100% giao diện thi thật Inspera, đồng hồ 60:00 đếm ngược không thể tạm dừng và khóa tính năng tự sửa lỗi (spellcheck). Tự động chuyển đổi giữa Task 1 & Task 2.',
      link: '/practice?mode=full_test',
      badge: 'FLAGSHIP // OFFICIAL SIMULATOR',
      meta: '60 Phút • Part 1 (150w) + Part 2 (250w) • Hệ số 1 : 2',
    },
    builder: {
      title: 'Writing Builder (Cây Đậu N Tầng)',
      subtitle:
        'Phương pháp rèn cấu trúc bài viết từ 5 tầng cơ bản đến 30 tầng chuyên sâu: so sánh Check Engine (ngữ pháp) và Update Engine (nâng cấp từ vựng C1/C2).',
      link: '/builder',
      badge: 'DUAL AI // STRUCTURAL METHOD',
      meta: 'Phòng luyện câu tương tác • Trắc nghiệm Collocation • Giám khảo AI',
    },
    task1: {
      title: 'Academic Task 1: Biểu Đồ & Quy Trình',
      subtitle:
        'Rèn luyện kỹ năng trích xuất Overview sắc bén và dẫn chứng số liệu đối sánh chuẩn mực cho biểu đồ đường, cột, tròn, bảng biểu, quy trình hoặc bản đồ.',
      link: '/practice?mode=task1',
      badge: 'CRITERIA // TASK ACHIEVEMENT',
      meta: '20 Phút • Tối thiểu 150 từ • Trọng số 33% tổng điểm Writing',
    },
    task2: {
      title: 'Discursive Task 2: Nghị Luận Xã Hội',
      subtitle:
        'Rèn luyện bài luận học thuật cho các dạng đề: Opinion, Discussion, Advantages & Disadvantages, Causes & Solutions. Kiểm tra Thesis statement và mạch Cohesion & Coherence.',
      link: '/practice?mode=task2',
      badge: 'CRITERIA // BAND 8.0+ ARGUMENT',
      meta: '40 Phút • Tối thiểu 250 từ • Trọng số 67% tổng điểm Writing',
    },
  };

  return (
    <section className="relative z-20 pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Monumental Headline Shield Card - Prevents background wave lines from obstructing typography */}
        <div className="relative max-w-4xl mx-auto px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-white/95 dark:bg-[#12141f]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] shadow-xl shadow-stone-900/5 dark:shadow-2xl dark:shadow-black/60 space-y-6">
          {/* Subtle architectural corner crosshairs */}
          <div className="absolute top-3.5 left-3.5 font-mono text-[9px] text-stone-300 dark:text-[rgba(244,244,240,0.25)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute top-3.5 right-3.5 font-mono text-[9px] text-stone-300 dark:text-[rgba(244,244,240,0.25)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-3.5 left-3.5 font-mono text-[9px] text-stone-300 dark:text-[rgba(244,244,240,0.25)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-3.5 right-3.5 font-mono text-[9px] text-stone-300 dark:text-[rgba(244,244,240,0.25)] select-none pointer-events-none">
            +
          </div>

          {/* Top Specification Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-100/80 dark:bg-[#1a1c28]/80 border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] font-mono text-[11px] text-stone-700 dark:text-[rgba(244,244,240,0.85)] tracking-wider uppercase shadow-xs mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] -ml-3.5" />
            <span className="font-semibold text-stone-900 dark:text-[#F4F4F0]">Specification 2026</span>
            <span className="text-stone-300 dark:text-[rgba(244,244,240,0.3)]">//</span>
            <span>Mô phỏng 100% Giao diện Thi Thật Inspera</span>
          </motion.div>

          {/* Monumental Headline with Spring Word Motion */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-[-0.035em] text-stone-900 dark:text-[#F4F4F0] leading-[1.15]">
              <span>Luyện thi IELTS Writing</span>
              <span className="block mt-1 sm:mt-2 text-xl sm:text-3xl lg:text-4xl text-stone-500 dark:text-[rgba(244,244,240,0.55)] font-semibold">
                chuẩn hóa theo{' '}
                <span className="relative inline-block align-baseline font-extrabold text-[#FF3B1D] min-h-[1.3em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleNumber}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-[#FF3B1D] font-extrabold px-1.5"
                    >
                      {titles[titleNumber]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-[rgba(244,244,240,0.7)] max-w-2xl mx-auto font-normal leading-relaxed pt-1">
              Trải nghiệm áp lực thực tế của kỳ thi trên máy tính: giao diện Inspera nguyên bản, vô hiệu hóa tính năng tự sửa lỗi, đồng hồ 60 phút đếm ngược, và hệ thống AI Giám khảo đối chiếu theo 4 tiêu chí chuẩn British Council &amp; IDP.
            </p>
          </div>
        </div>

        {/* Interactive Mode Selector Pills */}
        <div className="flex flex-col items-center gap-4 pt-1 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-stone-200/70 dark:bg-[#161821]/90 backdrop-blur-md border border-stone-200 dark:border-[rgba(244,244,240,0.1)] shadow-xs overflow-x-auto max-w-full">
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
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all select-none whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-stone-600 dark:text-[rgba(244,244,240,0.65)] hover:text-stone-900 dark:hover:text-[#F4F4F0]'
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

          {/* Dynamic Mode Preview Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#161821]/90 backdrop-blur-md border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] shadow-md flex flex-col md:flex-row items-center justify-between gap-5 text-left transition-colors duration-300"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#FF3B1D] uppercase tracking-wider bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 px-2.5 py-0.5 rounded-full border border-[#FF3B1D]/25">
                    {modeDescriptions[activeMode].badge}
                  </span>
                  <span className="font-mono text-[10px] text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
                    {modeDescriptions[activeMode].meta}
                  </span>
                </div>
                <div className="font-display text-base sm:text-lg font-bold text-stone-900 dark:text-[#F4F4F0]">
                  {modeDescriptions[activeMode].title}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.68)] leading-relaxed">
                  {modeDescriptions[activeMode].subtitle}
                </p>
              </div>

              <Link
                href={modeDescriptions[activeMode].link}
                onMouseEnter={() => {
                  if (activeMode === 'full_test') playLockIn();
                }}
                onClick={() => playClick()}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] hover:bg-[#FF3B1D] dark:hover:bg-[#FF3B1D] dark:hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 group cursor-pointer"
              >
                <span>Vào Luyện Ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Tactical Navigation Bento (3 Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-5xl mx-auto pt-2 text-left">
          {/* Card 1: Flagship Full Test */}
          <Link
            href="/practice?mode=full_test"
            onMouseEnter={() => playLockIn()}
            onClick={() => playClick()}
            className="p-5 rounded-2xl bg-[#FF3B1D] text-white hover:bg-[#FF3B1D]/90 transition-all flex flex-col justify-between space-y-4 group shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/80 font-bold">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  FLAGSHIP
                </span>
                <span>60 PHÚT</span>
              </div>
              <div className="font-display text-base font-bold tracking-tight text-white">
                Thi Thử Full Test
              </div>
              <p className="text-xs text-white/85 leading-relaxed">
                Mô phỏng cả Task 1 &amp; Task 2 liên tục, đồng hồ đếm ngược và thanh chuyển Part.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider uppercase text-white/95 pt-1">
              <span>Bắt đầu thi</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Writing Builder */}
          <Link
            href="/builder"
            onClick={() => playClick()}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#161821]/90 backdrop-blur-md border border-[#10B981]/40 text-stone-900 dark:text-[#F4F4F0] hover:border-[#10B981] transition-all flex flex-col justify-between space-y-4 group shadow-xs hover:shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#10B981] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5" />
                  PHƯƠNG PHÁP MỚI
                </span>
                <span>5–30 TẦNG</span>
              </div>
              <div className="font-display text-base font-bold tracking-tight text-stone-900 dark:text-[#F4F4F0]">
                Cây Đậu N Tầng
              </div>
              <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] leading-relaxed">
                Rèn cấu trúc câu từng bước, từ ngữ pháp chuẩn đến từ vựng C1/C2 nâng band.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider uppercase text-[#10B981] pt-1">
              <span>Vào Workbench</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: 107 Forecast Vault & AI Personas */}
          <Link
            href="/prompts"
            onClick={() => playClick()}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#161821]/90 backdrop-blur-md border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] text-stone-900 dark:text-[#F4F4F0] hover:border-sky-500/60 transition-all flex flex-col justify-between space-y-4 group shadow-xs hover:shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[11px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  KHO ĐỀ &amp; PERSONAS
                </span>
                <span className="flex items-center gap-1 text-[#FF3B1D]">
                  <Sparkles className="w-3 h-3" />
                  PROMPTS.CHAT
                </span>
              </div>
              <div className="font-display text-base font-bold tracking-tight text-stone-900 dark:text-[#F4F4F0]">
                107 Đề &amp; 6 Persona AI
              </div>
              <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] leading-relaxed">
                Đề Forecast kèm dàn ý Band 8+ và kho Persona AI chuyên gia tinh tuyển từ prompts.chat.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 pt-1">
              <span>Khám phá kho đề &amp; prompt</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Micro Telemetry Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 font-mono text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.55)]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF3B1D]" />
            <span>60:00 Phút chuẩn phòng thi</span>
          </span>
          <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Khóa Auto-Correct &amp; Spellcheck</span>
          </span>
          <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
            <span>107 Bộ đề Forecast kèm dàn ý</span>
          </span>
          <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Dual-Engine Gemini 2.5 Flash</span>
          </span>
        </div>
      </div>
    </section>
  );
}
