'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Clock,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  BarChart3,
  PieChart as PieIcon,
  MessageSquare,
  HelpCircle,
  Search,
  Sprout,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';

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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-sky-50/60 via-white to-slate-50 dark:from-zinc-900/60 dark:via-zinc-950 dark:to-zinc-950 border-b border-gray-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mô phỏng 100% Giao diện Thi Thật CD-IELTS Inspera</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Nền tảng Luyện thi <span className="text-sky-600">IELTS Writing</span> Chuẩn Phòng Thi &amp; Chấm Điểm AI
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Luyện tập Task 1 &amp; Task 2 với trải nghiệm như thi thật: tắt kiểm tra chính tả, đồng hồ đếm ngược, thanh điều hướng Part 1 &amp; Part 2, và AI Giám khảo chấm điểm chi tiết theo 4 tiêu chí chuẩn IELTS.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <Sprout className="w-4 h-4 text-lime-200 animate-pulse" />
              <span>Writing Builder (Cây Đậu N Tầng)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/20 text-white">
                Mới
              </span>
            </Link>

            <Link
              href="/practice?mode=full_test"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition transform hover:-translate-y-0.5"
            >
              <Layers className="w-4 h-4" />
              <span>Thi Thử Full Test (60 Phút)</span>
            </Link>

            <Link
              href="/practice?mode=task1"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 font-semibold text-sm transition"
            >
              <BarChart3 className="w-4 h-4 text-sky-600" />
              <span>Luyện Riêng Task 1</span>
            </Link>

            <Link
              href="/practice?mode=task2"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 font-semibold text-sm transition"
            >
              <PenTool className="w-4 h-4 text-sky-600" />
              <span>Luyện Riêng Task 2</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Practice Modes Section */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              3 Chế độ Luyện thi Chuyên biệt
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Lựa chọn chế độ phù hợp với mục tiêu học tập của bạn hôm nay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode 1: Task 1 */}
            <div className="flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/40 hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Academic Task 1
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    Miêu tả Biểu đồ &amp; Số liệu
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Luyện tập phân tích biểu đồ đường, cột, tròn hoặc tải lên ảnh đề bài riêng. Chấm theo 4 tiêu chí: Task Achievement (Overview, số liệu), CC, LR, GRA.
                </p>
                <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Thời gian chuẩn: <strong>20 phút</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-blue-500" />
                    <span>Độ dài tối thiểu: <strong>150 từ</strong></span>
                  </div>
                </div>
              </div>
              <Link
                href="/practice?mode=task1"
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
              >
                <span>Bắt đầu Luyện Task 1</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mode 2: Task 2 */}
            <div className="flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/40 hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Academic &amp; General Task 2
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    Nghị luận Xã hội (Essay)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Viết bài luận học thuật cho các dạng đề: Opinion, Discussion, Problem &amp; Solution. Đánh giá Thesis statement, độ sâu của luận điểm và ví dụ.
                </p>
                <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-500" />
                    <span>Thời gian chuẩn: <strong>40 phút</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-sky-500" />
                    <span>Độ dài tối thiểu: <strong>250 từ</strong></span>
                  </div>
                </div>
              </div>
              <Link
                href="/practice?mode=task2"
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition"
              >
                <span>Bắt đầu Luyện Task 2</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mode 3: Full Test */}
            <div className="flex flex-col justify-between p-6 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/40 bg-gradient-to-b from-sky-50/40 to-white dark:from-sky-950/20 dark:to-zinc-900/60 hover:shadow-xl transition relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-sky-600 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow">
                Khuyên dùng
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Full Test Mô phỏng
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    Thi Thử Cả 2 Task (Part 1 + 2)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Thi 60 phút liên tục với thanh điều hướng Part 1 / Part 2 giống hệt phần mềm thi thật. Tính điểm Overall Writing theo công thức chuẩn: (Task 1 + Task 2 * 2) / 3.
                </p>
                <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Thời gian tổng: <strong>60 phút</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>Tính điểm Overall Writing chuẩn IELTS</span>
                  </div>
                </div>
              </div>
              <Link
                href="/practice?mode=full_test"
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition"
              >
                <span>Bắt đầu Thi Full Test</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Writing Builder Gamified Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden shadow-2xl border border-emerald-500/30">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-lime-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Tính năng mới &bull; Gamified Learning Path</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Writing Builder: Lộ Trình Cây Đậu N Tầng &amp; Viết Từng Câu Cùng AI
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Thiết lập số ngày học và band điểm mục tiêu để tạo Cây Đậu thông minh. Trải nghiệm phương pháp cầm tay chỉ việc: phân tích đề qua câu hỏi trắc nghiệm, lập dàn ý, soạn thảo theo từng khối câu văn với 2 nút AI chuyên biệt <strong>Check</strong> (kiểm tra lỗi) và <strong>Update</strong> (nâng cấp câu kèm từ vựng &amp; collocations).
                </p>
              </div>

              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 shrink-0"
              >
                <Sprout className="w-5 h-5 text-emerald-950" />
                <span>Trồng Cây Đậu Của Bạn Ngay</span>
                <ChevronRight className="w-4 h-4 text-emerald-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Built-in Seed Prompts Gallery */}
      <section className="py-16 bg-slate-50 dark:bg-zinc-900/50 border-t border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trọn bộ Forecast IELTS Writing 2026 (59 Đề Thi Kèm Dàn Ý Band 8+)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Kho Đề Forecast Đầy Đủ Nhất
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Gồm 30 đề Task 1 (Biểu đồ, Bản đồ, Quy trình) và 29 đề Task 2 (Nghị luận xã hội) kèm dàn ý chi tiết.
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã đề (T1-01, T2-15) hoặc từ khóa (cars, environment, process, map...)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="space-y-12">
            {/* Task 1 Prompts */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <span>Academic Task 1 Forecast ({filteredTask1.length} / {TASK_1_SEEDS.length} đề)</span>
                </h3>
                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-1 text-[11px]">
                  {['All', 'Line Graph', 'Bar Chart', 'Process', 'Map / Plan', 'Table Chart', 'Pie Chart'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTask1Category(cat)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        task1Category === cat
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {cat === 'All' ? 'Tất cả' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTask1.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3 hover:border-sky-300 dark:hover:border-sky-800 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          {p.category}
                        </span>
                        {p.outline && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                            💡 Dàn ý Band 8+
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mt-2 line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.question}</p>
                    </div>
                    <Link
                      href="/practice?mode=task1"
                      className="inline-flex items-center justify-between text-xs font-semibold text-sky-600 hover:text-sky-700 pt-2 border-t border-gray-100 dark:border-zinc-800"
                    >
                      <span>Vào luyện Task 1 (Ngẫu nhiên)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Task 2 Prompts */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-emerald-600" />
                  <span>Academic Task 2 Forecast ({filteredTask2.length} / {TASK_2_SEEDS.length} đề)</span>
                </h3>
                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-1 text-[11px]">
                  {['All', 'Opinion', 'Discuss Both Views', 'Two-part', 'Causes and Solutions', 'Advantages'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTask2Category(cat)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        task2Category === cat
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {cat === 'All' ? 'Tất cả' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTask2.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3 hover:border-emerald-300 dark:hover:border-emerald-800 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {p.category}
                        </span>
                        {p.outline && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                            💡 Dàn ý Band 8+
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mt-2 line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.question}</p>
                    </div>
                    <Link
                      href="/practice?mode=task2"
                      className="inline-flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700 pt-2 border-t border-gray-100 dark:border-zinc-800"
                    >
                      <span>Vào luyện Task 2 (Ngẫu nhiên)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 mt-auto text-center text-xs text-gray-500 space-y-2">
        <p>CD-IELTS Writing Exam Simulator &amp; AI Examiner Platform</p>
        <p className="opacity-75">
          Tối ưu hóa cho Vercel &bull; Supabase Storage &bull; Gemini 2.5 Flash Multimodal Vision
        </p>
      </footer>
    </div>
  );
}
