'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Layers,
  BarChart3,
  PenTool,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';
import { PromptSeed } from '@/types';
import ToriiGate from '@/components/japanese/ToriiGate';
import { SeigaihaPattern } from '@/components/japanese/JapanesePatterns';
import { useSoundEngine } from '@/hooks/useSoundEngine';

const TASK_1_CATEGORIES = [
  'All',
  'Line Graph',
  'Bar Chart',
  'Process',
  'Map / Plan',
  'Table Chart',
  'Pie Chart',
];

const TASK_2_CATEGORIES = [
  'All',
  'Opinion',
  'Discuss Both Views',
  'Advantages',
  'Causes and Solutions',
  'Two-part',
  'Positive or Negative',
];

export default function PromptsArchivePage() {
  const { playClick, playChime, playLockIn } = useSoundEngine();
  const [activeTab, setActiveTab] = useState<'all' | 'task1' | 'task2'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [task1Category, setTask1Category] = useState('All');
  const [task2Category, setTask2Category] = useState('All');
  const [expandedOutlineId, setExpandedOutlineId] = useState<string | null>(null);

  // Combine and filter prompts
  const filteredPrompts = useMemo(() => {
    let pool: PromptSeed[] = [];
    if (activeTab === 'all') {
      pool = [...TASK_1_SEEDS, ...TASK_2_SEEDS];
    } else if (activeTab === 'task1') {
      pool = TASK_1_SEEDS;
    } else {
      pool = TASK_2_SEEDS;
    }

    return pool.filter((p) => {
      // Search matching
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.id.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.question.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      // Category matching
      let matchesCat = true;
      if (p.taskType === 'task1') {
        matchesCat =
          task1Category === 'All' ||
          p.category.toLowerCase().includes(task1Category.toLowerCase());
      } else {
        matchesCat =
          task2Category === 'All' ||
          p.category.toLowerCase().includes(task2Category.toLowerCase());
      }

      return matchesSearch && matchesCat;
    });
  }, [activeTab, searchQuery, task1Category, task2Category]);

  const task1Count = useMemo(() => {
    return filteredPrompts.filter((p) => p.taskType === 'task1').length;
  }, [filteredPrompts]);

  const task2Count = useMemo(() => {
    return filteredPrompts.filter((p) => p.taskType === 'task2').length;
  }, [filteredPrompts]);

  const toggleOutline = (id: string) => {
    setExpandedOutlineId((prev) => {
      if (prev === id) {
        playClick();
        return null;
      }
      playChime();
      return id;
    });
  };

  const resetFilters = () => {
    playClick();
    setSearchQuery('');
    setTask1Category('All');
    setTask2Category('All');
    setActiveTab('all');
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper dark:bg-carbon relative">
      {/* Background Watermark */}
      <SeigaihaPattern opacity={0.03} className="text-stone-900 dark:text-stone-200" />

      {/* Top Breadcrumb & Return Nav */}
      <div className="hairline-b bg-paper-subtle/50 dark:bg-carbon-subtle/40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-vermilion dark:hover:text-vermilion transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>QUAY LẠI TRANG CHỦ</span>
          </Link>
          <div className="flex items-center gap-2 text-stone-500 text-[11px]">
            <span>FORECAST 2026 ARCHIVE</span>
            <span>&bull;</span>
            <span className="text-vermilion font-bold">107 BỘ ĐỀ THỰC CHIẾN</span>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 hairline-b">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hairline-border bg-stone-100/80 dark:bg-stone-900/80 text-[11px] font-mono tracking-wider text-vermilion uppercase font-semibold">
                <ToriiGate width={24} height={20} text="合格" showShimenawa={false} glow={false} />
                <span>ARCHIVE // THƯ VIỆN ĐỀ THI TOÀN DIỆN</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 tracking-normal leading-snug">
                Kho Đề Forecast IELTS Writing 2026
              </h1>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                Tổng hợp 107 đề thi dự đoán chính thức cho năm 2026: Đầy đủ các dạng biểu đồ Academic Task 1 và toàn bộ các nhóm chủ đề Task 2, kèm dàn ý chi tiết chuẩn Band 8.0+.
              </p>
            </div>

            {/* Quick Stats Pill Group */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs shrink-0">
              <div className="px-3 py-2 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col">
                <span className="text-[11px] text-stone-500 font-semibold uppercase">TỔNG SỐ ĐỀ</span>
                <span className="text-base font-bold text-stone-900 dark:text-stone-100 font-display">107 Đề</span>
              </div>
              <div className="px-3 py-2 rounded-lg hairline-border bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-300 flex flex-col">
                <span className="text-[11px] font-semibold uppercase">ACADEMIC TASK 1</span>
                <span className="text-base font-bold font-display">30 Đề</span>
              </div>
              <div className="px-3 py-2 rounded-lg hairline-border bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300 flex flex-col">
                <span className="text-[11px] font-semibold uppercase">WRITING TASK 2</span>
                <span className="text-base font-bold font-display">77 Đề</span>
              </div>
            </div>
          </div>

          {/* Search Bar & Primary Tab Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 hairline-t">
            {/* Tab Switcher: Tất Cả / Task 1 / Task 2 */}
            <div className="inline-flex items-center p-1 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('all');
                }}
                className={`px-4 py-2 rounded-md transition-colors font-semibold ${
                  activeTab === 'all'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                TẤT CẢ (107)
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('task1');
                }}
                className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'task1'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-sky-500" />
                <span>TASK 1 (30)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('task2');
                }}
                className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'task2'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-amber-500" />
                <span>TASK 2 (77)</span>
              </button>
            </div>

            {/* Tactile Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã đề (T1-01, T2-35) hoặc từ khóa..."
                className="w-full pl-9 pr-14 py-2.5 rounded-lg hairline-border bg-paper dark:bg-carbon text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 font-mono focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  [XÓA]
                </button>
              )}
            </div>
          </div>

          {/* Sub-Category Filters */}
          {(activeTab === 'all' || activeTab === 'task1') && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                <BarChart3 className="w-3 h-3 text-sky-500" />
                <span>Lọc dạng bài Task 1:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                {TASK_1_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playClick();
                      setTask1Category(cat);
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      task1Category === cat
                        ? 'bg-sky-600 text-white font-semibold shadow-xs'
                        : 'hairline-border text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                    }`}
                  >
                    {cat === 'All' ? 'TẤT CẢ DẠNG TASK 1' : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'task2') && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                <PenTool className="w-3 h-3 text-amber-500" />
                <span>Lọc thể loại Task 2:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                {TASK_2_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playClick();
                      setTask2Category(cat);
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      task2Category === cat
                        ? 'bg-amber-600 text-white font-semibold shadow-xs'
                        : 'hairline-border text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-850'
                    }`}
                  >
                    {cat === 'All' ? 'TẤT CẢ DẠNG TASK 2' : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Prompts Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Results summary header */}
          <div className="flex items-center justify-between font-mono text-xs text-stone-500 hairline-b pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>
                Hiển thị <strong className="text-stone-900 dark:text-stone-100">{filteredPrompts.length}</strong> / 107 đề phù hợp
              </span>
              {activeTab === 'all' && (
                <span>
                  ({task1Count} đề Task 1 &bull; {task2Count} đề Task 2)
                </span>
              )}
            </div>

            {(searchQuery || task1Category !== 'All' || task2Category !== 'All' || activeTab !== 'all') && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-vermilion hover:underline text-[11px] font-semibold"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPrompts.map((p) => {
                const isExpanded = expandedOutlineId === p.id;
                const isTask1 = p.taskType === 'task1';

                return (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 rounded-2xl hairline-border bg-paper-subtle/80 dark:bg-carbon-subtle/70 flex flex-col justify-between space-y-4 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg transition-all duration-300 ease-spring hover:-translate-y-1 group relative overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] ${
                        isTask1 ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                    />

                    <div className="space-y-3">
                      {/* Badge bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 font-bold tracking-wider">
                            #{p.id.toUpperCase()}
                          </span>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                              isTask1
                                ? 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/30'
                                : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {p.category}
                          </span>
                        </div>
                        {p.outline && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded hairline-border bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 font-bold uppercase">
                            DÀN Ý BAND 8+
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-base text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 group-hover:text-vermilion transition-colors">
                        {p.title}
                      </h3>

                      {/* Question excerpt */}
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed font-sans">
                        {p.question}
                      </p>

                      {/* Expandable Band 8 Outline Drawer */}
                      {p.outline && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => toggleOutline(p.id)}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                          >
                            <span>{isExpanded ? 'Ẩn dàn ý chi tiết' : 'Xem dàn ý gợi ý Band 8+'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2.5 p-3.5 rounded-lg bg-stone-100/90 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-xs space-y-2.5 animate-in fade-in duration-150">
                              {p.outline.overviewOrThesis && (
                                <div className="border-l-2 border-vermilion pl-2.5">
                                  <span className="font-mono text-[10px] font-bold text-vermilion uppercase block">
                                    THESIS / OVERVIEW:
                                  </span>
                                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px] mt-0.5 font-sans">
                                    {p.outline.overviewOrThesis}
                                  </p>
                                </div>
                              )}
                              {p.outline.body1 && (
                                <div className="border-l-2 border-sky-500 pl-2.5">
                                  <span className="font-mono text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase block">
                                    THÂN BÀI 1:
                                  </span>
                                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px] mt-0.5 font-sans">
                                    {p.outline.body1}
                                  </p>
                                </div>
                              )}
                              {p.outline.body2 && (
                                <div className="border-l-2 border-amber-500 pl-2.5">
                                  <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase block">
                                    THÂN BÀI 2:
                                  </span>
                                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px] mt-0.5 font-sans">
                                    {p.outline.body2}
                                  </p>
                                </div>
                              )}
                              {p.outline.conclusion && (
                                <div className="border-l-2 border-emerald-500 pl-2.5">
                                  <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
                                    KẾT BÀI:
                                  </span>
                                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px] mt-0.5 font-sans">
                                    {p.outline.conclusion}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action link */}
                    <Link
                      href={`/practice?mode=${p.taskType}&promptId=${p.id}`}
                      onMouseEnter={() => playLockIn()}
                      onClick={() => playClick()}
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ease-spring active:scale-[0.98] group/btn mt-2 shadow-2xs"
                    >
                      <span>VÀO PHÒNG THI MÔ PHỎNG</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center space-y-4 hairline-border rounded-2xl bg-paper-subtle/50 dark:bg-carbon-subtle/40 p-8">
              <div className="w-12 h-12 rounded-full bg-stone-200/60 dark:bg-stone-800/60 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                  Không tìm thấy đề thi phù hợp
                </h3>
                <p className="text-xs text-stone-500 font-sans max-w-sm mx-auto">
                  Không có đề nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm mã đề khác (ví dụ: T1-01, T2-15) hoặc đặt lại bộ lọc.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-md bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-mono text-xs font-semibold hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white transition-colors"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
