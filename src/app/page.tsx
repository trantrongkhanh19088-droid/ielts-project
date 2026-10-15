'use client';

import React from 'react';
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
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';

export default function HomePage() {
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

          {/* Stats / Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 text-center">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200/80 dark:border-zinc-800">
              <div className="text-xl font-extrabold text-sky-600 font-mono">100%</div>
              <div className="text-[11px] text-gray-500 font-medium">Chuẩn Inspera IDP/BC</div>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200/80 dark:border-zinc-800">
              <div className="text-xl font-extrabold text-sky-600 font-mono">Gemini 2.5</div>
              <div className="text-[11px] text-gray-500 font-medium">AI Multimodal Vision</div>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200/80 dark:border-zinc-800">
              <div className="text-xl font-extrabold text-sky-600 font-mono">Band 8.5+</div>
              <div className="text-[11px] text-gray-500 font-medium">Bài mẫu &amp; Nâng cấp từ vựng</div>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200/80 dark:border-zinc-800">
              <div className="text-xl font-extrabold text-sky-600 font-mono">BYOK Free</div>
              <div className="text-[11px] text-gray-500 font-medium">Hỗ trợ API Key cá nhân</div>
            </div>
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
        </div>
      </section>

      {/* Built-in Seed Prompts Gallery */}
      <section className="py-16 bg-slate-50 dark:bg-zinc-900/50 border-t border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Kho Đề Mẫu Chất Lượng Cao
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Được tích hợp sẵn số liệu &amp; biểu đồ trực quan để bạn bắt đầu làm bài ngay lập tức
              </p>
            </div>
            <Link
              href="/practice?mode=task1&custom=true"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
            >
              <span>Tự nhập đề &amp; tải ảnh riêng của bạn</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-8">
            {/* Task 1 Prompts */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                Đề bài mẫu Task 1 (Academic Charts):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TASK_1_SEEDS.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        {p.category}
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mt-2">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.question}</p>
                    </div>
                    <Link
                      href={`/practice?mode=task1&promptId=${p.id}`}
                      className="inline-flex items-center justify-between text-xs font-semibold text-sky-600 hover:text-sky-700 pt-2 border-t border-gray-100 dark:border-zinc-800"
                    >
                      <span>Làm đề này ngay</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Task 2 Prompts */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-sky-600" />
                Đề bài mẫu Task 2 (Essays):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TASK_2_SEEDS.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {p.category}
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mt-2">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.question}</p>
                    </div>
                    <Link
                      href={`/practice?mode=task2&promptId=${p.id}`}
                      className="inline-flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700 pt-2 border-t border-gray-100 dark:border-zinc-800"
                    >
                      <span>Làm đề này ngay</span>
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
