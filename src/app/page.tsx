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
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.035em] text-stone-900 dark:text-stone-100 leading-[1.08] max-w-4xl mx-auto">
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
              <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold uppercase">
                Mới
              </span>
            </Link>

            <Link
              href="/practice?mode=task1"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md hairline-border bg-paper hover:bg-stone-100/70 dark:bg-carbon hover:dark:bg-stone-850 text-stone-600 dark:text-stone-300 text-xs font-medium transition-colors"
            >
              <span className="font-mono text-stone-400 text-[10px]">01 //</span>
              <span>Luyện Task 1</span>
            </Link>

            <Link
              href="/practice?mode=task2"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md hairline-border bg-paper hover:bg-stone-100/70 dark:bg-carbon hover:dark:bg-stone-850 text-stone-600 dark:text-stone-300 text-xs font-medium transition-colors"
            >
              <span className="font-mono text-stone-400 text-[10px]">02 //</span>
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
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight mt-1">
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
            <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200 group relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-stone-500 dark:text-stone-400">
                    FLAGSHIP // 01
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold uppercase tracking-wider">
                    Khuyên dùng
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight">
                    Thi Thử Full Test (Part 1 + Part 2)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-xl">
                    Mô phỏng chính xác kỳ thi CD-IELTS 60 phút không gián đoạn: thanh điều hướng chuyển đổi linh hoạt giữa Task 1 và Task 2, bộ đếm từ trực tiếp, và tự động tính điểm Overall Writing theo công thức chuẩn British Council: <code>(Task 1 + Task 2 × 2) / 3</code>.
                  </p>
                </div>

                {/* Micro Metrics Timeline Bar */}
                <div className="p-4 rounded-md hairline-border bg-paper dark:bg-carbon space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 dark:text-stone-400">
                    <span>TIMELINE // 60 PHÚT</span>
                    <span className="text-vermilion font-semibold">TỰ ĐỘNG LƯU BÀI LIÊN TỤC</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="hairline-r pr-3 space-y-1">
                      <div className="text-stone-400 text-[10px] font-mono">GIAI ĐOẠN 01</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">Task 1: Biểu Đồ</div>
                      <div className="text-[11px] text-stone-500">20 phút &bull; Tối thiểu 150 từ</div>
                    </div>
                    <div className="space-y-1 pl-1">
                      <div className="text-stone-400 text-[10px] font-mono">GIAI ĐOẠN 02</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">Task 2: Nghị Luận</div>
                      <div className="text-[11px] text-stone-500">40 phút &bull; Tối thiểu 250 từ</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 hairline-t flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-vermilion" />
                  <span>ĐỒNG HỒ 60:00 CHUẨN INSPERA</span>
                </div>
                <Link
                  href="/practice?mode=full_test"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-stone-900 text-stone-100 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 font-semibold text-xs transition-colors duration-200"
                >
                  <span>Bắt đầu Full Test</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards: Task 1 and Task 2 (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Card 2: Task 1 */}
              <div className="flex-1 flex flex-col justify-between p-6 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-stone-500 dark:text-stone-400">
                      TASK // 02
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">20 MIN &bull; 150 WORDS</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-stone-100 tracking-tight">
                      Luyện Riêng Academic Task 1
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                      Phân tích số liệu biểu đồ đường, cột, tròn, bản đồ hoặc quy trình. Chấm sâu vào tiêu chí Task Achievement (Overview &amp; Số liệu).
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 hairline-t flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-500">4 TIÊU CHÍ: TA &bull; CC &bull; LR &bull; GRA</span>
                  <Link
                    href="/practice?mode=task1"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-vermilion dark:hover:text-vermilion transition-colors"
                  >
                    <span>Luyện Task 1</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Task 2 */}
              <div className="flex-1 flex flex-col justify-between p-6 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-200 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-stone-500 dark:text-stone-400">
                      TASK // 03
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">40 MIN &bull; 250 WORDS</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-stone-100 tracking-tight">
                      Luyện Riêng Task 2 (Discursive Essay)
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                      Viết bài luận học thuật cho các dạng đề: Opinion, Discussion, Problem &amp; Solution. Đánh giá Thesis statement và độ sâu của lập luận.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 hairline-t flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-500">HỆ THỐNG SỐ ĐIỂM HỆ SỐ 2</span>
                  <Link
                    href="/practice?mode=task2"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-vermilion dark:hover:text-vermilion transition-colors"
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
          WRITING BUILDER: Pedagogical Botanical Feature (Editorial Spec)
          ------------------------------------------------------------- */}
      <section className="py-20 bg-paper-subtle dark:bg-carbon-subtle hairline-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="p-8 sm:p-12 rounded-lg hairline-border bg-paper dark:bg-carbon relative overflow-hidden shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 tracking-wider uppercase font-semibold">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>PHƯƠNG PHÁP HỌC ĐẶC BIỆT // WRITING BUILDER</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
                  Lộ Trình Cây Đậu N Tầng &amp; Soạn Thảo Từng Khối Câu Cùng AI
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  Xây dựng Cây Đậu theo số ngày học và band điểm mục tiêu của bạn. Trải nghiệm phương pháp viết có cấu trúc: phân tích đề bài qua câu hỏi trắc nghiệm, tạo dàn ý khoa học, và soạn thảo từng câu văn độc lập với 2 động cơ AI chuyên biệt: <strong>Check</strong> (chỉ ra lỗi chính xác) và <strong>Update</strong> (đa dạng phong cách câu kèm từ vựng &amp; collocations hiện đại).
                </p>

                {/* 4-Step Editorial Flow */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-[11px]">
                  <div className="p-2.5 rounded hairline-border bg-paper-subtle dark:bg-carbon-subtle">
                    <span className="text-stone-400 block text-[9px]">BƯỚC 01</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Phân Tích Đề</span>
                  </div>
                  <div className="p-2.5 rounded hairline-border bg-paper-subtle dark:bg-carbon-subtle">
                    <span className="text-stone-400 block text-[9px]">BƯỚC 02</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Lập Dàn Ý</span>
                  </div>
                  <div className="p-2.5 rounded hairline-border bg-paper-subtle dark:bg-carbon-subtle">
                    <span className="text-stone-400 block text-[9px]">BƯỚC 03</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Viết Từng Khối</span>
                  </div>
                  <div className="p-2.5 rounded hairline-border bg-paper-subtle dark:bg-carbon-subtle">
                    <span className="text-stone-400 block text-[9px]">BƯỚC 04</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">AI Nâng Cấp</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-3">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-stone-900 text-stone-50 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-emerald-600 dark:hover:text-stone-50 font-semibold text-xs tracking-wide transition-all duration-200 ease-spring shadow-xs"
                >
                  <Sprout className="w-4 h-4" />
                  <span>Trồng Cây Đậu Ngay</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="font-mono text-[10px] text-stone-400">MIỄN PHÍ TRÊN TRÌNH DUYỆT</span>
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
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight mt-1">
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
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
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
                        <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                          {p.id} &bull; {p.category}
                        </span>
                        {p.outline && (
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded hairline-border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold">
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
                        <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                          {p.id} &bull; {p.category}
                        </span>
                        {p.outline && (
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded hairline-border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold">
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
