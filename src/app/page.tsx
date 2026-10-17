'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Clock,
  Layers,
  Award,
  ChevronRight,
  FileCheck2,
  BarChart3,
  Search,
  Sprout,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Flame,
  ListChecks,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';
import ToriiGate from '@/components/japanese/ToriiGate';
import ChochinLantern from '@/components/japanese/ChochinLantern';
import { SeigaihaPattern } from '@/components/japanese/JapanesePatterns';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [task1Category, setTask1Category] = useState('All');
  const [task2Category, setTask2Category] = useState('All');

  const filteredTask1 = TASK_1_SEEDS.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      task1Category === 'All' || p.category.toLowerCase().includes(task1Category.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const filteredTask2 = TASK_2_SEEDS.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      task2Category === 'All' || p.category.toLowerCase().includes(task2Category.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* -------------------------------------------------------------
          HERO SECTION: High-Contrast Editorial & Architectural Kyoto Heritage
          ------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-paper dark:bg-carbon hairline-b">
        {/* Subtle Watermark Seigaiha Pattern */}
        <SeigaihaPattern opacity={0.035} className="text-stone-900 dark:text-stone-200" />

        {/* Traditional Swaying Paper Lanterns */}
        <div className="hidden xl:block absolute top-10 left-12 pointer-events-none z-10 opacity-70">
          <ChochinLantern size={64} kanji="勝" sway={true} />
        </div>
        <div className="hidden xl:block absolute top-10 right-12 pointer-events-none z-10 opacity-70">
          <ChochinLantern size={64} kanji="夢" sway={true} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Eyebrow & Architectural Torii Crest */}
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <ToriiGate width={96} height={80} text="合格" showShimenawa={true} glow={false} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hairline-border bg-stone-100/70 dark:bg-stone-900/60 font-mono text-[11px] text-stone-600 dark:text-stone-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion animate-pulse" />
              <span>Specification 2026 // Mô phỏng 100% Giao diện Thi Thật Inspera</span>
            </div>
          </div>

          {/* Editorial Display Headline */}
          <div className="space-y-5">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-stone-900 dark:text-stone-100 leading-[1.3] sm:leading-[1.26] max-w-4xl mx-auto">
              Nền tảng Luyện thi{' '}
              <span className="italic font-serif text-vermilion">IELTS Writing</span> Chuẩn Phòng Thi &amp; Chấm Điểm AI
            </h1>

            {/* Readability constrained body paragraph */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-[65ch] mx-auto leading-[1.7] font-normal">
              Trải nghiệm áp lực thực tế của kỳ thi trên máy: giao diện Inspera nguyên bản, vô hiệu hóa tính năng tự sửa lỗi, đồng hồ đếm ngược từng giây, và AI Giám khảo đối chiếu theo 4 tiêu chí chuẩn British Council &amp; IDP.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/practice?mode=full_test"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-stone-50 text-xs font-semibold tracking-wide transition-all duration-200 ease-spring shadow-sm group"
            >
              <Layers className="w-4 h-4 text-stone-400 group-hover:text-white dark:group-hover:text-white transition-colors" />
              <span>Thi Thử Full Test (60 Phút)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md hairline-border bg-paper-subtle dark:bg-carbon-subtle hover:border-emerald-600/70 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all duration-200 ease-spring group"
            >
              <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Writing Builder (Cây Đậu N Tầng)</span>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold uppercase">
                Mới
              </span>
            </Link>

            <Link
              href="/practice?mode=task1"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md hairline-border bg-paper hover:bg-stone-100/70 dark:bg-carbon hover:dark:bg-stone-850 text-stone-600 dark:text-stone-300 text-xs font-medium transition-colors"
            >
              <span className="font-mono text-stone-400 text-[11px]">01 //</span>
              <span>Luyện Task 1</span>
            </Link>

            <Link
              href="/practice?mode=task2"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md hairline-border bg-paper hover:bg-stone-100/70 dark:bg-carbon hover:dark:bg-stone-850 text-stone-600 dark:text-stone-300 text-xs font-medium transition-colors"
            >
              <span className="font-mono text-stone-400 text-[11px]">02 //</span>
              <span>Luyện Task 2</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          ASYMMETRIC BENTO EDITORIAL SECTION: 3 Practice Modes
          ------------------------------------------------------------- */}
      <section className="py-20 bg-paper dark:bg-carbon hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header with Monospace Index */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 hairline-b pb-6">
            <div>
              <span className="font-mono text-[11px] text-vermilion tracking-[0.2em] uppercase font-semibold">
                MODULES // 01 — 03
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight mt-1 leading-snug">
                Ba Phương Thức Luyện Tập Thực Chiến
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md font-normal leading-relaxed">
              Lựa chọn chế độ theo đúng mục tiêu của buổi học: rèn áp lực 60 phút liền mạch hoặc mài giũa từng dạng biểu đồ &amp; bài luận chuyên sâu.
            </p>
          </div>

          {/* Asymmetric Bento Layout: 7 cols (Flagship) + 5 cols (Stacked Tasks) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card 1: Flagship Full Test (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-gradient-to-br from-white via-stone-50/60 to-amber-50/40 dark:from-stone-900 dark:via-stone-900/95 dark:to-amber-950/30 shadow-xs hover:shadow-xl hover:border-amber-400/70 dark:hover:border-amber-600/70 transition-all duration-300 group relative overflow-hidden">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone-600 dark:text-stone-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-vermilion" />
                    FLAGSHIP // 01
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-bold uppercase tracking-wider shadow-xs animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                    Khuyên dùng &bull; Full 60M
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                    Thi Thử Full Test <span className="text-vermilion font-serif italic">(Part 1 + Part 2)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-xl">
                    Mô phỏng chính xác kỳ thi CD-IELTS 60 phút không gián đoạn: thanh điều hướng chuyển đổi linh hoạt giữa Task 1 và Task 2, bộ đếm từ trực tiếp, và tự động tính điểm Overall Writing theo công thức chuẩn British Council: <code>(Task 1 + Task 2 × 2) / 3</code>.
                  </p>
                </div>

                {/* Micro Metrics Timeline Bar with Enhanced Contrast */}
                <div className="p-4 rounded-xl border border-amber-200/90 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-900 dark:text-amber-300 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      TIMELINE // 60 PHÚT LIÊN MẠCH
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      TỰ ĐỘNG LƯU BÀI LIÊN TỤC
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-sky-50/90 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-900/60 space-y-1">
                      <div className="text-sky-700 dark:text-sky-300 text-[11px] font-mono font-bold uppercase">
                        GIAI ĐOẠN 01
                      </div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                        Task 1: Biểu Đồ &amp; Số Liệu
                      </div>
                      <div className="text-[11px] text-sky-800 dark:text-sky-300 font-medium">
                        20 phút &bull; Tối thiểu 150 từ
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-900/60 space-y-1">
                      <div className="text-indigo-700 dark:text-indigo-300 text-[11px] font-mono font-bold uppercase">
                        GIAI ĐOẠN 02
                      </div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                        Task 2: Nghị Luận Xã Hội
                      </div>
                      <div className="text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">
                        40 phút &bull; Tối thiểu 250 từ
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 hairline-t flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-stone-600 dark:text-stone-400 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-vermilion" />
                  <span>ĐỒNG HỒ 60:00 CHUẨN INSPERA</span>
                </div>
                <Link
                  href="/practice?mode=full_test"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 group/btn"
                >
                  <span>Bắt đầu Full Test</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards: Task 1 and Task 2 (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Card 2: Task 1 (Sky Blue Accent) */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-gradient-to-br from-white via-stone-50/60 to-sky-50/50 dark:from-stone-900 dark:via-stone-900/95 dark:to-sky-950/30 shadow-xs hover:shadow-xl hover:border-sky-400/80 dark:hover:border-sky-600/80 transition-all duration-300 group relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-sky-700 dark:text-sky-400 font-bold flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                      TASK // 02
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 font-bold border border-sky-300/70 dark:border-sky-800">
                      20 MIN &bull; 150 WORDS
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                      Luyện Riêng Academic Task 1
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                      Phân tích số liệu biểu đồ đường, cột, tròn, bản đồ hoặc quy trình. Chấm sâu vào tiêu chí Task Achievement (Overview &amp; Số liệu).
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 hairline-t flex items-center justify-between">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-bold">
                    4 TIÊU CHÍ: TA &bull; CC &bull; LR &bull; GRA
                  </span>
                  <Link
                    href="/practice?mode=task1"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    <span>Luyện Task 1</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Task 2 (Royal Indigo Accent) */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-gradient-to-br from-white via-stone-50/60 to-indigo-50/50 dark:from-stone-900 dark:via-stone-900/95 dark:to-indigo-950/30 shadow-xs hover:shadow-xl hover:border-indigo-400/80 dark:hover:border-indigo-600/80 transition-all duration-300 group relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-indigo-700 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5" />
                      TASK // 03
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-300/70 dark:border-indigo-800">
                      40 MIN &bull; 250 WORDS
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                      Luyện Riêng Task 2 (Discursive Essay)
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                      Viết bài luận học thuật cho các dạng đề: Opinion, Discussion, Problem &amp; Solution. Đánh giá Thesis statement và độ sâu của lập luận.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 hairline-t flex items-center justify-between">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-100/90 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700 font-bold">
                    HỆ THỐNG ĐIỂM HỆ SỐ 2
                  </span>
                  <Link
                    href="/practice?mode=task2"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Luyện Task 2</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          WRITING BUILDER: Pedagogical Botanical Feature (Vivid Highlight)
          ------------------------------------------------------------- */}
      <section className="py-20 bg-paper-subtle dark:bg-carbon-subtle hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border-2 border-emerald-400/80 dark:border-emerald-600/70 bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-lime-50/40 dark:from-emerald-950/70 dark:via-zinc-900/95 dark:to-teal-950/60 relative overflow-hidden shadow-xl shadow-emerald-700/10">
            {/* Ambient Botanical Glow Orbs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-400/20 dark:bg-emerald-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-teal-400/20 dark:bg-teal-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-5 max-w-2xl">
                {/* Highlighted Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  <Sprout className="w-4 h-4 text-lime-300 animate-pulse" />
                  <span>TÍNH NĂNG ĐỘT PHÁ // WRITING BUILDER</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-300" />
                  <span className="text-[10px] text-emerald-100 font-sans tracking-tight">GAME HÓA HỌC TẬP</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight leading-snug">
                  Lộ Trình Cây Đậu N Tầng &amp; Soạn Thảo{' '}
                  <span className="font-serif italic text-emerald-600 dark:text-emerald-400 font-medium underline decoration-emerald-400/50 decoration-wavy decoration-1 underline-offset-8">
                    Từng Khối Câu Cùng AI
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                  Xây dựng Cây Đậu theo số ngày học và band điểm mục tiêu của bạn. Trải nghiệm phương pháp viết có cấu trúc: phân tích đề bài qua câu hỏi trắc nghiệm, tạo dàn ý khoa học, và soạn thảo từng câu văn độc lập với 2 động cơ AI chuyên biệt:
                </p>

                {/* 2 AI Engines Colorful Feature Highlights */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-2xs">
                    <Search className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Check Engine:</strong> Bắt lỗi ngữ pháp &amp; chính tả theo ngữ cảnh</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-100/90 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs font-semibold shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span><strong>Update Engine:</strong> Nâng cấp từ vựng C1-C2 &amp; Collocations ăn điểm</span>
                  </div>
                </div>

                {/* 4-Step Flow with Vibrant Color Scheme & Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-3 font-mono text-[11px]">
                  {/* Step 1: Sky Blue */}
                  <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-800/80 bg-white/95 dark:bg-stone-900/90 shadow-2xs hover:shadow-md hover:border-sky-400 transition-all duration-200 group/step space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sky-600 dark:text-sky-400 font-bold font-mono text-[11px]">BƯỚC 01</span>
                      <div className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 flex items-center justify-center">
                        <ListChecks className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm">
                      Phân Tích Đề
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal leading-snug">
                      Trắc nghiệm bẫy đề &amp; dạng bài
                    </div>
                  </div>

                  {/* Step 2: Indigo */}
                  <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-white/95 dark:bg-stone-900/90 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all duration-200 group/step space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono text-[11px]">BƯỚC 02</span>
                      <div className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm">
                      Lập Dàn Ý
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal leading-snug">
                      Định hình luận điểm &amp; bố cục
                    </div>
                  </div>

                  {/* Step 3: Amber */}
                  <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-white/95 dark:bg-stone-900/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all duration-200 group/step space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 dark:text-amber-400 font-bold font-mono text-[11px]">BƯỚC 03</span>
                      <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm">
                      Viết Từng Khối
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal leading-snug">
                      Soạn thảo từng câu độc lập
                    </div>
                  </div>

                  {/* Step 4: Emerald */}
                  <div className="p-3.5 rounded-xl border-2 border-emerald-400 dark:border-emerald-700 bg-white/95 dark:bg-stone-900/90 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all duration-200 group/step ring-2 ring-emerald-400/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-[11px]">BƯỚC 04</span>
                      <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm">
                      AI Nâng Cấp
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal leading-snug">
                      Chấm 4 tiêu chí &amp; sửa câu
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlighted Call-to-Action with Glowing Button */}
              <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-3.5">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 ease-spring shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.03] active:scale-[0.98] group/btn cursor-pointer"
                >
                  <Sprout className="w-5 h-5 text-lime-200 group-hover/btn:rotate-12 transition-transform" />
                  <span>Trồng Cây Đậu Ngay</span>
                  <ChevronRight className="w-4 h-4 text-emerald-200 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <div className="flex flex-col items-start lg:items-end gap-1 font-mono text-[11px]">
                  <span className="text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    MIỄN PHÍ 100% TRÊN TRÌNH DUYỆT
                  </span>
                  <span className="text-stone-500 dark:text-stone-400">
                    🌱 Tùy chọn lộ trình 5 — 30 Tầng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SEED PROMPTS GALLERY: 59 Forecast Prompts (Swiss Editorial Archive)
          ------------------------------------------------------------- */}
      <section className="py-20 bg-paper dark:bg-carbon hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-b pb-6">
            <div>
              <span className="font-mono text-[11px] text-vermilion tracking-[0.2em] uppercase font-semibold">
                ARCHIVE // 59 FORECAST PROMPTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight mt-1 leading-snug">
                Kho Đề Forecast IELTS Writing 2026
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl font-normal">
                Gồm 30 đề Task 1 (Biểu đồ, Bản đồ, Quy trình) và 29 đề Task 2 (Nghị luận xã hội) kèm dàn ý chi tiết Band 8+.
              </p>
            </div>

            {/* Tactile Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã đề (T1-01, T2-15) hoặc từ khóa..."
                className="w-full pl-9 pr-8 py-2 rounded-md hairline-border bg-paper dark:bg-carbon text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 font-mono focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  [XÓA]
                </button>
              )}
            </div>
          </div>

          <div className="space-y-14">
            {/* ----------------- Task 1 Prompts ----------------- */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 hairline-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase">
                    ACADEMIC TASK 1 FORECAST
                  </span>
                  <span className="font-mono text-[11px] text-stone-500">
                    ({filteredTask1.length} / {TASK_1_SEEDS.length} đề)
                  </span>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                  {['All', 'Line Graph', 'Bar Chart', 'Process', 'Map / Plan', 'Table Chart', 'Pie Chart'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTask1Category(cat)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        task1Category === cat
                          ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                          : 'hairline-border text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                      }`}
                    >
                      {cat === 'All' ? 'TẤT CẢ' : cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTask1.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-lg hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/40 flex flex-col justify-between space-y-4 hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          {p.id} &bull; {p.category}
                        </span>
                        {p.outline && (
                          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded hairline-border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold">
                            DÀN Ý BAND 8+
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-normal text-stone-900 dark:text-stone-100 leading-snug line-clamp-1 group-hover:text-vermilion transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {p.question}
                      </p>
                    </div>

                    <Link
                      href={`/practice?mode=task1&promptId=${p.id}`}
                      className="inline-flex items-center justify-between font-mono text-[11px] font-semibold text-stone-900 dark:text-stone-100 hover:text-vermilion dark:hover:text-vermilion pt-3 hairline-t transition-colors"
                    >
                      <span>VÀO LUYỆN ĐỀ NÀY</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------- Task 2 Prompts ----------------- */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 hairline-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 tracking-wider uppercase">
                    ACADEMIC &amp; GENERAL TASK 2 FORECAST
                  </span>
                  <span className="font-mono text-[11px] text-stone-500">
                    ({filteredTask2.length} / {TASK_2_SEEDS.length} đề)
                  </span>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                  {['All', 'Opinion', 'Discuss Both Views', 'Two-part', 'Causes and Solutions', 'Advantages'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTask2Category(cat)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        task2Category === cat
                          ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-semibold'
                          : 'hairline-border text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                      }`}
                    >
                      {cat === 'All' ? 'TẤT CẢ' : cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTask2.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-lg hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/40 flex flex-col justify-between space-y-4 hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                          {p.id} &bull; {p.category}
                        </span>
                        {p.outline && (
                          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded hairline-border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold">
                            DÀN Ý BAND 8+
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-normal text-stone-900 dark:text-stone-100 leading-snug line-clamp-1 group-hover:text-vermilion transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {p.question}
                      </p>
                    </div>

                    <Link
                      href={`/practice?mode=task2&promptId=${p.id}`}
                      className="inline-flex items-center justify-between font-mono text-[11px] font-semibold text-stone-900 dark:text-stone-100 hover:text-vermilion dark:hover:text-vermilion pt-3 hairline-t transition-colors"
                    >
                      <span>VÀO LUYỆN ĐỀ NÀY</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER: Monospace Technical & Editorial Signature
          ------------------------------------------------------------- */}
      <footer className="py-12 bg-paper dark:bg-carbon mt-auto text-xs text-stone-500 space-y-3 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
            <span className="font-bold text-stone-900 dark:text-stone-100">CD-IELTS WRITING PLATFORM</span>
            <span className="text-stone-400">&bull; INSPERA SIMULATION</span>
          </div>
          <p className="text-[11px] text-stone-400">
            ENGINEERED WITH GEMINI 2.5 FLASH MULTIMODAL &bull; VERCEL EDGE &bull; SUPABASE
          </p>
        </div>
      </footer>
    </div>
  );
}
