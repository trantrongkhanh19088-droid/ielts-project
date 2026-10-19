'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  BarChart3,
  PenTool,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Filter,
  PlusCircle,
  Sparkles,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';
import { PromptSeed } from '@/types';
import AcademicLogo from '@/components/brand/AcademicLogo';
import { useSoundEngine } from '@/hooks/useSoundEngine';
import { getCustomPrompts, deleteCustomPrompt } from '@/lib/storage';
import CreatePromptModal from '@/components/prompts/CreatePromptModal';
import ImageZoomModal from '@/components/exam/ImageZoomModal';

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
  const [activeTab, setActiveTab] = useState<'all' | 'task1' | 'task2' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [task1Category, setTask1Category] = useState('All');
  const [task2Category, setTask2Category] = useState('All');
  const [expandedOutlineId, setExpandedOutlineId] = useState<string | null>(null);

  // Custom User Prompts State
  const [customPrompts, setCustomPrompts] = useState<PromptSeed[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState<{ url: string; title: string } | null>(null);

  // Load custom prompts from local / user storage on mount
  useEffect(() => {
    setCustomPrompts(getCustomPrompts());
  }, []);

  const handleCreateSuccess = (newPrompt: PromptSeed) => {
    setCustomPrompts((prev) => [newPrompt, ...prev]);
    setActiveTab('custom');
  };

  const handleDeleteCustomPrompt = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa đề thi này khỏi kho đề riêng của bạn?')) {
      deleteCustomPrompt(id);
      setCustomPrompts((prev) => prev.filter((p) => p.id !== id));
      playClick();
    }
  };

  // Combine and filter prompts
  const filteredPrompts = useMemo(() => {
    let pool: PromptSeed[] = [];
    if (activeTab === 'all') {
      pool = [...customPrompts, ...TASK_1_SEEDS, ...TASK_2_SEEDS];
    } else if (activeTab === 'task1') {
      pool = [...customPrompts.filter((p) => p.taskType === 'task1'), ...TASK_1_SEEDS];
    } else if (activeTab === 'task2') {
      pool = [...customPrompts.filter((p) => p.taskType === 'task2'), ...TASK_2_SEEDS];
    } else if (activeTab === 'custom') {
      pool = customPrompts;
    }

    return pool.filter((p) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.id.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.question.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      let matchesCat = true;
      if (activeTab !== 'custom') {
        if (p.taskType === 'task1') {
          matchesCat =
            task1Category === 'All' ||
            p.category.toLowerCase().includes(task1Category.toLowerCase());
        } else {
          matchesCat =
            task2Category === 'All' ||
            p.category.toLowerCase().includes(task2Category.toLowerCase());
        }
      }

      return matchesSearch && matchesCat;
    });
  }, [activeTab, searchQuery, task1Category, task2Category, customPrompts]);

  const customTask1Count = useMemo(() => {
    return customPrompts.filter((p) => p.taskType === 'task1').length;
  }, [customPrompts]);

  const customTask2Count = useMemo(() => {
    return customPrompts.filter((p) => p.taskType === 'task2').length;
  }, [customPrompts]);

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
            <span>FORECAST 2026</span>
            <span>&bull;</span>
            <span className="text-vermilion font-bold">107 BỘ ĐỀ CAMBRIDGE &amp; ĐỀ CỦA BẠN</span>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 hairline-b">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hairline-border bg-stone-100/80 dark:bg-stone-900/80 text-[11px] font-mono tracking-wider text-vermilion uppercase font-semibold">
                <AcademicLogo width={18} height={18} />
                <span>ARCHIVE // KHO ĐỀ THI &amp; ĐỀ TỰ TẠO</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 tracking-normal leading-snug">
                Kho Đề Thi IELTS Writing 2026
              </h1>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                107 đề thi dự đoán Task 1 &amp; Task 2 chuẩn Cambridge kèm dàn ý Band 8+. Bạn cũng có thể tải lên đề thi riêng của mình để luyện viết và nhờ AI tạo dàn ý chi tiết!
              </p>
            </div>

            {/* Quick Stats Pill Group & Create Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <div className="px-3 py-2 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col">
                  <span className="text-[10px] text-stone-500 font-semibold uppercase">TỔNG SỐ ĐỀ</span>
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
                    {107 + customPrompts.length} Đề
                  </span>
                </div>
                <div className="px-3 py-2 rounded-lg hairline-border bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-300 flex flex-col">
                  <span className="text-[10px] font-semibold uppercase">TASK 1</span>
                  <span className="text-sm font-bold font-display">
                    {30 + customTask1Count} Đề
                  </span>
                </div>
                <div className="px-3 py-2 rounded-lg hairline-border bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300 flex flex-col">
                  <span className="text-[10px] font-semibold uppercase">TASK 2</span>
                  <span className="text-sm font-bold font-display">
                    {77 + customTask2Count} Đề
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setActiveTab('custom');
                  }}
                  className={`px-3 py-2 rounded-lg hairline-border transition flex flex-col text-left cursor-pointer ${
                    activeTab === 'custom'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                  title="Xem danh sách đề thi riêng của bạn"
                >
                  <span className="text-[10px] font-semibold uppercase flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                    ĐỀ CỦA BẠN
                  </span>
                  <span className="text-sm font-bold font-display">
                    {customPrompts.length} Đề
                  </span>
                </button>
              </div>

              {/* Upload / Create Prompt Button */}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsCreateModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 font-mono text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>+ TẢI LÊN / TẠO ĐỀ MỚI</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Primary Tab Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 hairline-t">
            {/* Tab Switcher: Tất Cả / Task 1 / Task 2 / Đề Của Bạn */}
            <div className="inline-flex items-center p-1 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle font-mono text-xs overflow-x-auto max-w-full gap-1">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('all');
                }}
                className={`px-3.5 py-2 rounded-md transition-colors font-semibold whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                TẤT CẢ ({107 + customPrompts.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('task1');
                }}
                className={`px-3.5 py-2 rounded-md transition-colors font-semibold flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'task1'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-sky-500" />
                <span>TASK 1 ({30 + customTask1Count})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('task2');
                }}
                className={`px-3.5 py-2 rounded-md transition-colors font-semibold flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'task2'
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-amber-500" />
                <span>TASK 2 ({77 + customTask2Count})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('custom');
                }}
                className={`px-3.5 py-2 rounded-md transition-colors font-semibold flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'custom'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 dark:text-emerald-400 hover:text-stone-950 dark:hover:text-stone-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>ĐỀ CỦA BẠN ({customPrompts.length})</span>
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

          {/* Sub-Category Filters for IELTS Tasks (hidden on custom tab) */}
          {activeTab !== 'custom' && (activeTab === 'all' || activeTab === 'task1') && (
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
                        : 'hairline-border bg-paper-subtle dark:bg-carbon-subtle text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'custom' && (activeTab === 'all' || activeTab === 'task2') && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                <PenTool className="w-3 h-3 text-amber-500" />
                <span>Lọc dạng bài Task 2:</span>
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
                        : 'hairline-border bg-paper-subtle dark:bg-carbon-subtle text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Results summary header */}
          <div className="flex items-center justify-between font-mono text-xs text-stone-500 hairline-b pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>
                Hiển thị <strong className="text-stone-900 dark:text-stone-100">{filteredPrompts.length}</strong> đề phù hợp
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
                const isCustom = p.id.startsWith('custom-') || p.isCustom;

                return (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 rounded-2xl hairline-border bg-paper-subtle/80 dark:bg-carbon-subtle/70 flex flex-col justify-between space-y-4 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg transition-all duration-300 ease-spring hover:-translate-y-1 group relative overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] ${
                        isCustom ? 'bg-emerald-500' : isTask1 ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                    />

                    <div className="space-y-3">
                      {/* Badge bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 font-bold tracking-wider">
                            #{p.id.slice(0, 10).toUpperCase()}
                          </span>

                          {isCustom && (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                              ĐỀ CỦA BẠN
                            </span>
                          )}

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

                        {/* Delete button for custom prompts */}
                        {isCustom && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCustomPrompt(p.id, e)}
                            className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition shrink-0"
                            title="Xóa đề này khỏi kho riêng"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-base text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 group-hover:text-vermilion transition-colors">
                        {p.title}
                      </h3>

                      {/* Image Thumbnail for Custom or Seed Prompts */}
                      {p.imageUrl && (
                        <div
                          className="relative rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-1 cursor-pointer group/img"
                          onClick={() => setZoomImageUrl({ url: p.imageUrl!, title: p.title })}
                          title="Bấm để phóng to ảnh đề bài"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="h-28 w-full object-contain rounded"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-white text-[11px] font-mono gap-1">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Phóng to ảnh</span>
                          </div>
                        </div>
                      )}

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
                              {p.outline.note && (
                                <div className="border-l-2 border-stone-400 pl-2.5 pt-1 text-stone-500 italic text-[10.5px]">
                                  💡 <strong>Lưu ý:</strong> {p.outline.note}
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
          ) : activeTab === 'custom' ? (
            /* Custom Prompts Empty State */
            <div className="py-16 text-center space-y-4 hairline-border rounded-2xl bg-paper-subtle/50 dark:bg-carbon-subtle/40 p-8 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
                  Chưa có đề thi nào trong kho riêng của bạn
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                  Bạn có thể tải lên đề thi từ sách Cambridge, tài liệu ôn thi hoặc lớp học. AI Examiner sẽ tự động phân tích và tạo dàn ý Band 8.0+ cho bạn!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsCreateModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 font-mono text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>+ TẢI LÊN ĐỀ THI ĐẦU TIÊN</span>
              </button>
            </div>
          ) : (
            /* Search Empty State */
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

      {/* Create / Upload Custom Prompt Modal */}
      <CreatePromptModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Image Zoom Modal for Forecast / Custom Charts */}
      {zoomImageUrl && (
        <ImageZoomModal
          isOpen={true}
          onClose={() => setZoomImageUrl(null)}
          imageUrl={zoomImageUrl.url}
          title={zoomImageUrl.title}
        />
      )}
    </div>
  );
}
