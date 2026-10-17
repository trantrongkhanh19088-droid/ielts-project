'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sprout,
  Target,
  Calendar,
  Layers,
  Check,
  ChevronRight,
  X,
  BookOpen,
  Info,
  Flame,
} from 'lucide-react';
import { BuilderTargetBand } from '@/types';
import { getLibraryPromptStats, getPacingSuggestions } from '@/lib/builder';

interface BuilderConfigModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: (config: {
    targetBand: BuilderTargetBand;
    studyDays: number;
    totalLevels: number;
  }) => void;
  isInitialSetup?: boolean;
}

const BAND_OPTIONS: { band: BuilderTargetBand; label: string; desc: string; color: string }[] = [
  { band: '5.5', label: 'Band 5.5', desc: 'Nền tảng vững, cấu trúc câu rõ ràng', color: 'from-blue-500 to-cyan-500' },
  { band: '6.0', label: 'Band 6.0', desc: 'Chuẩn xét tuyển đại học & định cư', color: 'from-cyan-500 to-teal-500' },
  { band: '6.5', label: 'Band 6.5', desc: 'Mục tiêu phổ biến du học quốc tế', color: 'from-teal-500 to-emerald-500' },
  { band: '7.0', label: 'Band 7.0', desc: 'Từ vựng học thuật & liên kết tự nhiên', color: 'from-emerald-500 to-green-600' },
  { band: '7.5', label: 'Band 7.5', desc: 'Văn phong chuyên sâu, ngữ pháp phức', color: 'from-green-600 to-lime-600' },
  { band: '8.0+', label: 'Band 8.0+', desc: 'Làm chủ ngôn ngữ, sắc thái bản ngữ', color: 'from-amber-500 to-orange-500' },
];

export default function BuilderConfigModal({
  isOpen,
  onClose,
  onConfirm,
  isInitialSetup = false,
}: BuilderConfigModalProps) {
  const stats = useMemo(() => getLibraryPromptStats(), []);

  const [selectedBand, setSelectedBand] = useState<BuilderTargetBand>('6.5');
  const [studyDays, setStudyDays] = useState<number>(30);
  const [customDays, setCustomDays] = useState<string>('');
  const [isCustomDays, setIsCustomDays] = useState(false);

  // Suggested levels based on study days
  const pacingSuggestions = useMemo(
    () => getPacingSuggestions(studyDays, stats.maxLevels),
    [studyDays, stats.maxLevels]
  );

  const [selectedLevels, setSelectedLevels] = useState<number>(() => {
    return Math.min(stats.maxLevels, Math.max(5, studyDays));
  });

  // Keep levels within bounds if studyDays updates
  const handleDaysChange = (days: number) => {
    setStudyDays(days);
    setIsCustomDays(false);
    // Auto-update to standard suggestion
    const standard = Math.min(stats.maxLevels, Math.max(3, days));
    setSelectedLevels(standard);
  };

  const handleCustomDaysChange = (val: string) => {
    setCustomDays(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 3 && parsed <= 365) {
      setStudyDays(parsed);
      const standard = Math.min(stats.maxLevels, Math.max(3, parsed));
      setSelectedLevels(standard);
    }
  };

  if (!isOpen) return null;

  const totalTasks = selectedLevels * 2;
  const avgTasksPerDay = (totalTasks / studyDays).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      targetBand: selectedBand,
      studyDays,
      totalLevels: selectedLevels,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Beanstalk Sprout Banner */}
        <div className="relative px-6 py-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30 text-white">
                <Sprout className="w-7 h-7 text-lime-200 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-lime-200">
                  <Sparkles className="w-3 h-3" />
                  <span>IELTS Writing Builder</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Thiết lập Lộ trình Cây Đậu Gamified
                </h2>
                <p className="text-xs text-white/80 mt-0.5">
                  Lộ trình học bậc thang thông minh, bốc đề chuẩn Forecast &amp; cầm tay chỉ việc từng câu văn
                </p>
              </div>
            </div>

            {!isInitialSetup && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(85vh-160px)]">
          {/* STEP 1: TARGET BAND */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>1. Chọn Band Điểm Mục Tiêu (Target Band Score):</span>
              </label>
              <span className="text-xs text-gray-500 font-medium">Quyết định độ khó từ vựng &amp; tiêu chuẩn AI</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {BAND_OPTIONS.map((item) => {
                const isSelected = selectedBand === item.band;
                return (
                  <button
                    key={item.band}
                    type="button"
                    onClick={() => setSelectedBand(item.band)}
                    className={`p-3 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-md'
                        : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <div>
                      <span className="text-base font-extrabold text-gray-900 dark:text-white">
                        {item.band}
                      </span>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: STUDY DURATION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>2. Thời Gian Học Dự Kiến (Study Duration):</span>
              </label>
              <span className="text-xs text-gray-500 font-medium">Hệ thống sẽ cân đối định mức mỗi ngày</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {[7, 15, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDaysChange(d)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    studyDays === d && !isCustomDays
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20 shadow-sm'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{d} Ngày</span>
                </button>
              ))}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomDays(true)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition ${
                    isCustomDays
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400'
                  }`}
                >
                  Tự nhập ngày:
                </button>
                {isCustomDays && (
                  <input
                    type="number"
                    min="3"
                    max="180"
                    placeholder="VD: 45"
                    value={customDays}
                    onChange={(e) => handleCustomDaysChange(e.target.value)}
                    className="w-24 px-3 py-2 text-xs rounded-xl border border-sky-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                    autoFocus
                  />
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: TREE LEVELS & LIBRARY INTEL */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 dark:border-zinc-800 pb-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>3. Số Tầng Cây Đậu (Tree Levels):</span>
              </label>

              {/* Library Intel Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[11px] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Thư viện hiện có: <strong>{stats.task1Total}</strong> Task 1 &bull; <strong>{stats.task2Total}</strong> Task 2 &bull; Tối đa: <strong>{stats.maxLevels}</strong> tầng
                </span>
              </div>
            </div>

            {/* Pacing Preset Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pacingSuggestions.map((sug) => {
                const isSelected = selectedLevels === sug.levels;
                return (
                  <button
                    key={sug.key}
                    type="button"
                    onClick={() => setSelectedLevels(sug.levels)}
                    className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-gray-200 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-zinc-700 bg-gray-50/40 dark:bg-zinc-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400">
                          {sug.label}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold">
                          {sug.ratePerDay}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="text-xl font-black text-gray-900 dark:text-white">
                          {sug.levels}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Tầng cây đậu</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1 leading-snug">
                        {sug.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Levels Slider & Number Input */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-zinc-300">
                  Hoặc tùy chỉnh số tầng theo ý muốn (3 - {stats.maxLevels} tầng):
                </span>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">{selectedLevels}</span>
                  <span className="text-gray-500 text-[11px]">/ {stats.maxLevels} tầng</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="3"
                  max={stats.maxLevels}
                  value={selectedLevels}
                  onChange={(e) => setSelectedLevels(parseInt(e.target.value, 10))}
                  className="flex-1 accent-emerald-600 cursor-pointer h-2 bg-gray-200 dark:bg-zinc-700 rounded-lg"
                />
                <input
                  type="number"
                  min="3"
                  max={stats.maxLevels}
                  value={selectedLevels}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      setSelectedLevels(Math.max(3, Math.min(stats.maxLevels, val)));
                    }
                  }}
                  className="w-16 px-2.5 py-1 text-center text-xs font-bold rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SUMMARY OVERVIEW CARD */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-sky-950/30 border border-emerald-200 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider">
                  Tổng kết lộ trình của bạn
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                Cây đậu gồm <strong>{selectedLevels} tầng</strong> ({selectedLevels} đề Task 1 + {selectedLevels} đề Task 2 = <strong>{totalTasks} bài viết</strong>). Hoàn thành trong <strong>{studyDays} ngày</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-gray-200 dark:border-zinc-700">
                <span className="text-[11px] uppercase font-bold text-gray-400 block">Định mức</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ~{avgTasksPerDay} bài/ngày
                </span>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isInitialSetup && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-semibold text-xs transition"
              >
                Hủy bỏ
              </button>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <Sprout className="w-4 h-4 text-lime-200" />
              <span>Gieo Hạt &amp; Bắt Đầu Lộ Trình</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
