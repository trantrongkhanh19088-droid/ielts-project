'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Sprout,
  Clock,
  BarChart3,
  PenTool,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Flame,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';
import { motion } from 'framer-motion';
import ArchitecturalMatrixCanvas from '@/components/canvas/ArchitecturalMatrixCanvas';
import MinimalMotionHero from '@/components/hero/MinimalMotionHero';
import BandScoreFormulaSimulator from '@/components/exam/BandScoreFormulaSimulator';
import DualEngineSandbox from '@/components/builder/DualEngineSandbox';
import { useSoundEngine } from '@/hooks/useSoundEngine';

export default function HomePage() {
  const { playClick, playLockIn } = useSoundEngine();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Featured prompts: 2 Task 1 (T1-01, T1-02) + 2 Task 2 (T2-01, T2-02)
  const featuredPrompts = [
    TASK_1_SEEDS[0], // T1-01: Immigrants to Three Countries
    TASK_1_SEEDS[1], // T1-02: Modern Landfill Construction
    TASK_2_SEEDS[0], // T2-01: Higher Education Tuition
    TASK_2_SEEDS[1], // T2-02: International Cooperation
  ];

  const filteredPrompts =
    selectedCategory === 'all'
      ? featuredPrompts
      : selectedCategory === 'task1'
      ? featuredPrompts.filter((p) => p.taskType === 'task1')
      : featuredPrompts.filter((p) => p.taskType === 'task2');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F4] dark:bg-[#090A0F] text-stone-900 dark:text-[#F4F4F0] selection:bg-[#FF3B1D]/25 selection:text-[#FF3B1D] font-sans relative overflow-x-hidden transition-colors duration-300">
      {/* Procedural 60 FPS Architectural Matrix Canvas (Adapts dynamically to Light & Dark) */}
      <ArchitecturalMatrixCanvas />

      {/* Subtle Archival Paper Grain Noise Overlay */}
      <svg className="fixed inset-0 pointer-events-none z-10 w-full h-full opacity-[0.025] dark:opacity-[0.035]" aria-hidden="true">
        <filter id="archivalNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#archivalNoise)" />
      </svg>

      {/* =========================================================================
          ZONE 01 // MINIMAL MOTION HERO — THE EXAM THRESHOLD
          ========================================================================= */}
      <MinimalMotionHero />

      {/* =========================================================================
          ZONE 02 // MODULES 01–03 — ASYMMETRIC BENTO GRID
          ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 py-20 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] bg-white/60 dark:bg-[#090A0F]/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header with Exposed Hairline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
            <div>
              <span className="font-mono text-[11px] text-[#FF3B1D] tracking-[0.2em] uppercase font-bold">
                MODULES // 01 — 03
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-[#F4F4F0] tracking-tight mt-1">
                Ba Phương Thức Luyện Tập Thực Chiến
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.6)] max-w-md font-normal leading-relaxed">
              Lựa chọn chế độ theo đúng mục tiêu của buổi học: rèn áp lực 60 phút liền mạch hoặc mài giũa từng dạng biểu đồ &amp; bài luận chuyên sâu.
            </p>
          </div>

          {/* Asymmetric 8/4 Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card 01: Flagship Full Test (8 Columns) */}
            <div className="lg:col-span-8 p-7 sm:p-8 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-sm dark:shadow-xl transition-colors duration-300">
              {/* Exposed 2px Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B1D]" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider uppercase text-stone-700 dark:text-[rgba(244,244,240,0.7)] font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#FF3B1D]" />
                    FLAGSHIP // 01
                  </span>
                  <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 text-[#FF3B1D] border border-[#FF3B1D]/30 dark:border-[#FF3B1D]/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-[#FF3B1D]" />
                    FULL 60 PHÚT LIÊN MẠCH
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-[#F4F4F0] leading-snug">
                    Thi Thử Full Test <span className="text-[#FF3B1D]">(Part 1 + Part 2)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.65)] leading-relaxed max-w-2xl">
                    Mô phỏng chính xác kỳ thi CD-IELTS 60 phút không gián đoạn: thanh điều hướng chuyển đổi linh hoạt giữa Task 1 và Task 2, bộ đếm từ trực tiếp, tự động lưu bài liên tục, và tính điểm Overall Writing theo chuẩn British Council.
                  </p>
                </div>

                {/* 60-Minute Split Timeline Bar */}
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-stone-900 dark:text-[#F4F4F0] font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF3B1D]" />
                      TIMELINE PHÂN BỔ // 60 PHÚT
                    </span>
                    <span className="text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      AUTO-SAVE 5S / LẦN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] space-y-1 shadow-xs">
                      <div className="text-stone-500 dark:text-[rgba(244,244,240,0.5)] font-mono text-[10px] font-bold uppercase">
                        GIAI ĐOẠN 01 (HỆ SỐ 1)
                      </div>
                      <div className="font-bold text-stone-900 dark:text-[#F4F4F0]">Task 1: Biểu Đồ &amp; Quy Trình</div>
                      <div className="font-mono text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.6)]">20 phút &bull; Tối thiểu 150 từ</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] space-y-1 shadow-xs">
                      <div className="text-[#FF3B1D] font-mono text-[10px] font-bold uppercase">
                        GIAI ĐOẠN 02 (HỆ SỐ 2)
                      </div>
                      <div className="font-bold text-stone-900 dark:text-[#F4F4F0]">Task 2: Nghị Luận Xã Hội</div>
                      <div className="font-mono text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.6)]">40 phút &bull; Tối thiểu 250 từ</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Band Score Calculator Component */}
                <BandScoreFormulaSimulator />
              </div>

              <div className="pt-6 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between">
                <span className="font-mono text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
                  ĐỒNG HỒ 60:00 CHUẨN INSPERA
                </span>
                <Link
                  href="/practice?mode=full_test"
                  onMouseEnter={() => playLockIn()}
                  onClick={() => playClick()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF3B1D] hover:bg-[#FF3B1D]/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
                >
                  <span>Bắt đầu Full Test Ngay</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards: Task 1 and Task 2 (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              {/* Card 02: Academic Task 1 */}
              <div className="flex-1 p-6 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-sm dark:shadow-xl transition-colors duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-stone-700 dark:text-[rgba(244,244,240,0.7)] flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-stone-800 dark:text-[#F4F4F0]" />
                      TASK // 02
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-[rgba(244,244,240,0.1)] text-stone-800 dark:text-[#F4F4F0] font-bold">
                      20 MIN &bull; 150 WORDS
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-stone-900 dark:text-[#F4F4F0]">Luyện Riêng Academic Task 1</h3>
                    <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] mt-1.5 leading-relaxed">
                      Phân tích số liệu biểu đồ đường, cột, tròn, bản đồ hoặc quy trình. Chấm sâu vào tiêu chí Task Achievement (Overview &amp; Số liệu đối chiếu).
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-500 dark:text-[rgba(244,244,240,0.5)] font-bold">
                    TA &bull; CC &bull; LR &bull; GRA
                  </span>
                  <Link
                    href="/practice?mode=task1"
                    onClick={() => playClick()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 dark:text-[#F4F4F0] hover:text-[#FF3B1D] dark:hover:text-[#FF3B1D] transition-colors"
                  >
                    <span>Luyện Task 1</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 03: Task 2 Discursive Essay */}
              <div className="flex-1 p-6 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-sm dark:shadow-xl transition-colors duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-[#FF3B1D] flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-[#FF3B1D]" />
                      TASK // 03
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 text-[#FF3B1D] font-bold">
                      40 MIN &bull; 250 WORDS
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-stone-900 dark:text-[#F4F4F0]">Luyện Riêng Task 2 (Essay)</h3>
                    <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] mt-1.5 leading-relaxed">
                      Viết bài luận học thuật cho các dạng đề: Opinion, Discussion, Causes &amp; Solutions. Đánh giá Thesis statement và độ sâu của lập luận.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#FF3B1D] font-bold">
                    HỆ THỐNG ĐIỂM HỆ SỐ 2
                  </span>
                  <Link
                    href="/practice?mode=task2"
                    onClick={() => playClick()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF3B1D] hover:text-[#FF3B1D]/80 transition-colors"
                  >
                    <span>Luyện Task 2</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          ZONE 03 // WRITING BUILDER — CÂY ĐẬU N TẦNG WORKBENCH
          ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 py-20 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] bg-stone-50/50 dark:bg-[#090A0F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
            <div>
              <span className="font-mono text-[11px] text-[#10B981] tracking-[0.2em] uppercase font-bold">
                PHƯƠNG PHÁP ĐỘT PHÁ // WRITING BUILDER
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-[#F4F4F0] tracking-tight mt-1">
                Lộ Trình Cây Đậu N Tầng &amp; Dual AI Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.6)] max-w-md font-normal leading-relaxed">
              Xây dựng bài viết từ 5 tầng cơ bản đến 30 tầng chuyên sâu: so sánh tức thì giữa Check Engine (ngữ pháp) và Update Engine (từ vựng C1-C2).
            </p>
          </div>

          {/* Interactive Dual-Engine Sandbox Component */}
          <DualEngineSandbox />
        </div>
      </motion.section>

      {/* =========================================================================
          ZONE 04 // ARCHIVE — 107 FORECAST VAULT (2026)
          ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 py-20 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] bg-white/60 dark:bg-[#090A0F]/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
            <div>
              <span className="font-mono text-[11px] text-[#FF3B1D] tracking-[0.2em] uppercase font-bold">
                ARCHIVE // 107 FORECAST PROMPTS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-[#F4F4F0] tracking-tight mt-1">
                Thư Viện Đề Thi Forecast IELTS Writing 2026
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.6)] mt-1.5 max-w-xl leading-relaxed">
                Kho lưu trữ 107 bộ đề dự đoán thực chiến: Bao quát 30 đề Academic Task 1 mọi dạng biểu đồ và 77 đề Task 2 trải dài 10 chủ đề lớn, 100% kèm dàn ý Band 8.0+.
              </p>
            </div>

            <Link
              href="/prompts"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] font-mono text-xs font-bold hover:bg-[#FF3B1D] dark:hover:bg-[#FF3B1D] dark:hover:text-white transition-all shadow-md shrink-0 group"
            >
              <BookOpen className="w-4 h-4 text-[#FF3B1D] group-hover:text-white transition-colors" />
              <span>VÀO THƯ VIỆN CHỌN ĐỀ (107 ĐỀ)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Top 2-Column Split: Task 1 (30 Đề) & Task 2 (77 Đề) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task 1 Forecast Card */}
            <div className="p-7 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] space-y-5 flex flex-col justify-between shadow-xs dark:shadow-xl transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-stone-800 dark:text-[#F4F4F0] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-stone-800 dark:text-[#F4F4F0]" />
                    ACADEMIC TASK 1 FORECAST
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-[rgba(244,244,240,0.1)] text-stone-800 dark:text-[#F4F4F0] font-bold">
                    30 BỘ ĐỀ
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900 dark:text-[#F4F4F0]">Kho Đề Biểu Đồ &amp; Quy Trình Thực Tế</h3>
                  <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] mt-1.5 leading-relaxed">
                    Mô phỏng chân thực các dạng đề thi thật: Biểu đồ đường, cột, tròn, bảng biểu, quy trình sản xuất và bản đồ biến đổi đô thị.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Line Graph', 'Bar Chart', 'Process', 'Map / Plan', 'Table Chart', 'Pie Chart'].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.1)] text-stone-700 dark:text-[rgba(244,244,240,0.7)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between font-mono text-[11px]">
                <span className="text-stone-500 dark:text-[rgba(244,244,240,0.5)]">Dàn ý Band 8+ &bull; Phân tích số liệu</span>
                <Link
                  href="/prompts"
                  onClick={() => playClick()}
                  className="font-bold text-stone-900 dark:text-[#F4F4F0] hover:text-[#FF3B1D] dark:hover:text-[#FF3B1D] flex items-center gap-1 transition-colors"
                >
                  <span>Xem 30 đề Task 1</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Task 2 Forecast Card */}
            <div className="p-7 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] space-y-5 flex flex-col justify-between shadow-xs dark:shadow-xl transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FF3B1D] flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-[#FF3B1D]" />
                    WRITING TASK 2 FORECAST
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 text-[#FF3B1D] font-bold">
                    77 BỘ ĐỀ
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900 dark:text-[#F4F4F0]">Kho Đề Nghị Luận Xã Hội &amp; Triết Học</h3>
                  <p className="text-xs text-stone-600 dark:text-[rgba(244,244,240,0.65)] mt-1.5 leading-relaxed">
                    Trải rộng 10 chủ đề thời sự: Giáo dục, Môi trường, Công nghệ, Pháp luật, Xã hội, Gia đình, Nghệ thuật và Kinh tế.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Opinion', 'Discuss Both Views', 'Causes & Solutions', 'Two-part Question', 'Advantages'].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.1)] text-stone-700 dark:text-[rgba(244,244,240,0.7)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between font-mono text-[11px]">
                <span className="text-stone-500 dark:text-[rgba(244,244,240,0.5)]">Hook &bull; Thesis &bull; Luận điểm Band 8+</span>
                <Link
                  href="/prompts"
                  onClick={() => playClick()}
                  className="font-bold text-[#FF3B1D] hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Xem 77 đề Task 2</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Swiss Data Index Showcase with Category Tabs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[rgba(244,244,240,0.7)]">
                  MỘT SỐ ĐỀ TIÊU BIỂU TRONG KHO DỰ ĐOÁN (BAND 8.0+):
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCategory('all');
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] font-bold shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  Tất cả (4)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCategory('task1');
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedCategory === 'task1'
                      ? 'bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] font-bold shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  Task 1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCategory('task2');
                  }}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedCategory === 'task2'
                      ? 'bg-stone-900 text-white dark:bg-[#F4F4F0] dark:text-[#090A0F] font-bold shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  Task 2
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredPrompts.map((p) => {
                const isTask1 = p.taskType === 'task1';
                return (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.1)] flex flex-col justify-between space-y-3 hover:border-stone-400 dark:hover:border-[rgba(244,244,240,0.3)] transition-all group shadow-xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                        <span
                          className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                            isTask1
                              ? 'bg-stone-100 text-stone-800 dark:bg-[rgba(244,244,240,0.12)] dark:text-[#F4F4F0]'
                              : 'bg-[#FF3B1D]/10 text-[#FF3B1D] dark:bg-[#FF3B1D]/15'
                          }`}
                        >
                          {p.id.split('-')[0].toUpperCase()} &bull; {p.category}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] dark:bg-[#10B981]/15 font-bold">
                          BAND 8+
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-xs sm:text-sm text-stone-900 dark:text-[#F4F4F0] line-clamp-2 leading-snug group-hover:text-[#FF3B1D] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.6)] line-clamp-2 leading-relaxed">
                        {p.question}
                      </p>
                    </div>

                    <Link
                      href={`/practice?mode=${p.taskType}&promptId=${p.id}`}
                      onClick={() => playClick()}
                      className="inline-flex items-center justify-between font-mono text-[11px] font-bold text-stone-800 dark:text-[#F4F4F0] hover:text-[#FF3B1D] dark:hover:text-[#FF3B1D] pt-3 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] transition-colors"
                    >
                      <span>VÀO LUYỆN ĐỀ</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Contrast Command Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-stone-900 text-white dark:bg-[#161821] dark:text-[#F4F4F0] border border-stone-800 dark:border-[rgba(244,244,240,0.12)] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3.5 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FF3B1D] uppercase tracking-wider font-bold">
                <span>GIAO DIỆN CHUYỂN SANG PHÒNG CHỌN ĐỀ</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white dark:text-[#F4F4F0] leading-snug">
                Bạn muốn chọn một đề bài cụ thể để luyện viết hôm nay?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 dark:text-[rgba(244,244,240,0.65)] leading-relaxed font-sans">
                Truy cập ngay trang Thư viện để tìm kiếm theo từ khóa, lọc theo từng dạng câu hỏi và bấm vào luyện thi trực tiếp với bộ đếm giờ Inspera nguyên bản.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-stone-200 dark:text-[rgba(244,244,240,0.8)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>107 Đề Có Sẵn Dàn Ý</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Bộ Lọc Dạng Bài Tức Thì</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Chấm Điểm Chuẩn AI 2.5</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 relative z-10">
              <Link
                href="/prompts"
                onClick={() => playClick()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF3B1D] hover:bg-[#FF3B1D]/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md group text-center"
              >
                <span>CHỌN ĐỀ TRONG THƯ VIỆN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/practice?mode=full_test"
                onMouseEnter={() => playLockIn()}
                onClick={() => playClick()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 dark:bg-[#090A0F] border border-stone-700 dark:border-[rgba(244,244,240,0.15)] dark:hover:border-[rgba(244,244,240,0.4)] text-[#F4F4F0] font-mono text-xs font-semibold uppercase tracking-wider transition-colors text-center"
              >
                <Layers className="w-4 h-4 text-stone-400" />
                <span>Hoặc Thi Thử Full Test (60P)</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          ZONE 05 // TECHNICAL COLOPHON FOOTER
          ========================================================================= */}
      <footer className="relative z-20 py-12 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] bg-stone-100/70 dark:bg-[#090A0F] text-xs font-mono text-stone-600 dark:text-[rgba(244,244,240,0.5)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-bold text-stone-900 dark:text-[#F4F4F0]">CD-IELTS WRITING PLATFORM</span>
              <span className="text-stone-300 dark:text-[rgba(244,244,240,0.3)]">//</span>
              <span className="text-stone-700 dark:text-[rgba(244,244,240,0.7)]">INSPERA SIMULATION 2026</span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.5)] text-center sm:text-right">
              ENGINEERED WITH GEMINI 2.5 FLASH MULTIMODAL &bull; VERCEL EDGE &bull; SUPABASE
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-stone-200/60 dark:border-[rgba(244,244,240,0.06)] text-[10px] text-stone-500 dark:text-[rgba(244,244,240,0.4)]">
            <div>
              STATUS: <span className="text-[#10B981] font-bold">SYSTEM ONLINE</span> // LATENCY: 24MS // ZERO-AUTOCORRECT ENFORCED
            </div>
            <div>
              &copy; 2026 CD-IELTS Inspera Official Simulator. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
