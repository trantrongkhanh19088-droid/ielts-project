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
  Brain,
  Crosshair,
  Wand2,
  History,
  RotateCcw,
  Loader2,
  FileText,
} from 'lucide-react';
import { BuilderTargetBand } from '@/types';
import { getLibraryPromptStats, getPacingSuggestions } from '@/lib/builder';
import { fetchAllEssayRecords } from '@/lib/storage';

interface BuilderConfigModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: (config: {
    targetBand: BuilderTargetBand;
    studyDays: number;
    totalLevels: number;
    weaknessPrompt?: string;
    targetedWeaknesses?: string[];
    coachAdvice?: string;
    customTask1Ids?: string[];
    customTask2Ids?: string[];
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

const TASK1_WEAK_TAGS = [
  { label: 'Bản đồ (Map)', icon: '🗺️', value: 'Map' },
  { label: 'Quy trình (Process)', icon: '⚙️', value: 'Process' },
  { label: 'Biểu đồ Cột (Bar Chart)', icon: '📊', value: 'Bar Chart' },
  { label: 'Biểu đồ Đường (Line Graph)', icon: '📈', value: 'Line Graph' },
  { label: 'Biểu đồ Tròn (Pie Chart)', icon: '🥧', value: 'Pie Chart' },
  { label: 'Bảng số liệu (Table)', icon: '📋', value: 'Table Chart' },
  { label: 'Biểu đồ Kết hợp (Mixed)', icon: '🔀', value: 'Mixed' },
];

const TASK2_WEAK_TAGS = [
  { label: 'Thảo luận 2 quan điểm (Discuss Both Views)', icon: '⚖️', value: 'Discuss Both Views' },
  { label: 'Đồng tình / Phản đối (Opinion)', icon: '💡', value: 'Opinion' },
  { label: 'Nguyên nhân & Giải pháp (Causes & Solutions)', icon: '⚠️', value: 'Causes and Solutions' },
  { label: 'Câu hỏi 2 phần (Two-part)', icon: '❓', value: 'Two-part' },
  { label: 'Lợi ích & Tác hại (Advantages)', icon: '⚖️', value: 'Advantages' },
];

const TOPIC_WEAK_TAGS = [
  { label: 'Môi trường & Khí hậu', icon: '🌱', value: 'Môi trường' },
  { label: 'Công nghệ & AI', icon: '💻', value: 'Công nghệ & AI' },
  { label: 'Giáo dục & Học đường', icon: '🎓', value: 'Giáo dục' },
  { label: 'Xã hội & Lối sống', icon: '🏙️', value: 'Xã hội & Đời sống' },
  { label: 'Tội phạm & Luật pháp', icon: '⚖️', value: 'Tội phạm & Luật pháp' },
  { label: 'Sức khỏe & Dinh dưỡng', icon: '🩺', value: 'Sức khỏe & Y tế' },
  { label: 'Việc làm & Kinh tế', icon: '💼', value: 'Việc làm & Kinh tế' },
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

  // Weakness / Custom Focus state
  const [weaknessPrompt, setWeaknessPrompt] = useState<string>('');
  const [targetedWeaknesses, setTargetedWeaknesses] = useState<string[]>([]);
  const [isScanningHistory, setIsScanningHistory] = useState(false);
  const [historyScanMessage, setHistoryScanMessage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Suggested levels based on study days
  const pacingSuggestions = useMemo(
    () => getPacingSuggestions(studyDays, stats.maxLevels),
    [studyDays, stats.maxLevels]
  );

  const [selectedLevels, setSelectedLevels] = useState<number>(() => {
    return Math.min(stats.maxLevels, Math.max(5, studyDays));
  });

  const handleDaysChange = (days: number) => {
    setStudyDays(days);
    setIsCustomDays(false);
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

  const toggleWeaknessTag = (tagVal: string) => {
    setTargetedWeaknesses((prev) =>
      prev.includes(tagVal) ? prev.filter((t) => t !== tagVal) : [...prev, tagVal]
    );
  };

  // Smart scan history for weak spots
  const handleScanHistory = async () => {
    setIsScanningHistory(true);
    setHistoryScanMessage(null);
    try {
      const records = await fetchAllEssayRecords();
      if (!records || records.length === 0) {
        setHistoryScanMessage('Bạn chưa có bài viết nào trong lịch sử để phân tích. Hãy chọn nhanh các thẻ bên dưới hoặc tự nhập dạng đề bạn muốn cải thiện nhé!');
        return;
      }

      const t1Records = records.filter((r) => r.task_type === 'task1');
      const t2Records = records.filter((r) => r.task_type === 'task2');

      const categoryScores: Record<string, { total: number; count: number }> = {};
      for (const r of records) {
        const titleLower = (r.prompt_title || '').toLowerCase();
        let cat = r.task_type === 'task1' ? 'Bar Chart' : 'Opinion';
        if (titleLower.includes('map')) cat = 'Map';
        else if (titleLower.includes('process')) cat = 'Process';
        else if (titleLower.includes('line')) cat = 'Line Graph';
        else if (titleLower.includes('pie')) cat = 'Pie Chart';
        else if (titleLower.includes('table')) cat = 'Table Chart';
        else if (titleLower.includes('discuss')) cat = 'Discuss Both Views';
        else if (titleLower.includes('cause') || titleLower.includes('solution')) cat = 'Causes and Solutions';
        else if (titleLower.includes('two-part')) cat = 'Two-part';

        if (!categoryScores[cat]) categoryScores[cat] = { total: 0, count: 0 };
        categoryScores[cat].total += r.overall_band || 6.0;
        categoryScores[cat].count += 1;
      }

      const weakestCats = Object.entries(categoryScores)
        .map(([cat, val]) => ({ cat, avg: val.total / val.count }))
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3)
        .map((x) => x.cat);

      const detectedTags: string[] = [];
      for (const wc of weakestCats) {
        const lower = wc.toLowerCase();
        if (lower.includes('map')) detectedTags.push('Map');
        else if (lower.includes('process')) detectedTags.push('Process');
        else if (lower.includes('bar')) detectedTags.push('Bar Chart');
        else if (lower.includes('line')) detectedTags.push('Line Graph');
        else if (lower.includes('pie')) detectedTags.push('Pie Chart');
        else if (lower.includes('table')) detectedTags.push('Table Chart');
        else if (lower.includes('discuss')) detectedTags.push('Discuss Both Views');
        else if (lower.includes('opinion')) detectedTags.push('Opinion');
        else if (lower.includes('cause') || lower.includes('solution') || lower.includes('problem')) detectedTags.push('Causes and Solutions');
        else if (lower.includes('two-part')) detectedTags.push('Two-part');
        else if (lower.includes('advantage')) detectedTags.push('Advantages');
        else detectedTags.push(wc);
      }

      setTargetedWeaknesses((prev) => Array.from(new Set([...prev, ...detectedTags])));

      const promptText = `Hệ thống nhận diện từ ${records.length} bài đã làm: Bạn cần tập trung rèn luyện các dạng bài có band thấp nhất (${weakestCats.join(', ')}). Tăng cường cấu trúc câu và từ vựng chuyên sâu!`;
      setWeaknessPrompt(promptText);
      setHistoryScanMessage(`✅ Đã phân tích ${records.length} bài viết và tự động gắn ${detectedTags.length} trọng tâm điểm yếu!`);
    } catch {
      setHistoryScanMessage('Không thể đọc lịch sử bài viết. Bạn hãy chọn dạng bài theo gợi ý bên dưới.');
    } finally {
      setIsScanningHistory(false);
    }
  };

  if (!isOpen) return null;

  const totalTasks = selectedLevels * 2;
  const avgTasksPerDay = (totalTasks / studyDays).toFixed(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    let coachAdvice: string | undefined;
    let customTask1Ids: string[] | undefined;
    let customTask2Ids: string[] | undefined;
    let finalTags = targetedWeaknesses;

    if (weaknessPrompt.trim() || targetedWeaknesses.length > 0) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('/api/builder/plan-tree', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            weaknessPrompt,
            targetedWeaknesses,
            totalLevels: selectedLevels,
            targetBand: selectedBand,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          coachAdvice = data.coachAdvice;
          customTask1Ids = data.recommendedTask1Ids;
          customTask2Ids = data.recommendedTask2Ids;
          if (data.focusTags && data.focusTags.length > 0) {
            finalTags = Array.from(new Set([...targetedWeaknesses, ...data.focusTags]));
          }
        }
      } catch (err) {
        console.error('Plan tree AI error, using deterministic matching', err);
      }
    }

    setIsAnalyzing(false);
    onConfirm({
      targetBand: selectedBand,
      studyDays,
      totalLevels: selectedLevels,
      weaknessPrompt: weaknessPrompt.trim() || undefined,
      targetedWeaknesses: finalTags.length > 0 ? finalTags : undefined,
      coachAdvice,
      customTask1Ids,
      customTask2Ids,
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
                  <span>IELTS Writing Builder &bull; AI Beanstalk</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                  Thiết lập Cây Đậu Cá Nhân Hóa
                </h2>
                <p className="text-xs text-white/80 mt-0.5">
                  Lộ trình học bậc thang thông minh, ưu tiên dạng bài bạn còn yếu &amp; hướng dẫn từng câu
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7 overflow-y-auto max-h-[calc(85vh-140px)]">
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

          {/* STEP 2: WEAKNESS & FOCUS PROMPT (THE NEW REQUESTED FEATURE) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-emerald-50/40 dark:from-zinc-800/70 dark:via-zinc-800/40 dark:to-emerald-950/20 border-2 border-amber-300/80 dark:border-amber-700/50 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>2. Dạng Bài Yếu &amp; Trọng Tâm Cải Thiện</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                      Cá nhân hóa
                    </span>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-zinc-400">
                    Cây đậu sẽ ưu tiên phân bổ các dạng đề này lên các tầng đầu để bạn rèn luyện nhiều nhất
                  </p>
                </div>
              </div>

              {/* Scan History Button */}
              <button
                type="button"
                onClick={handleScanHistory}
                disabled={isScanningHistory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-700 hover:bg-amber-100 dark:hover:bg-zinc-600 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-xs transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isScanningHistory ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                )}
                <span>Quét Điểm Yếu Từ Bài Cũ</span>
              </button>
            </div>

            {historyScanMessage && (
              <div className="p-2.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 animate-in fade-in">
                {historyScanMessage}
              </div>
            )}

            {/* Prompt Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-amber-600" />
                  <span>Prompt / Yêu cầu tùy chỉnh của bạn (Tự nhập hoặc dùng gợi ý):</span>
                </label>
                {weaknessPrompt && (
                  <button
                    type="button"
                    onClick={() => {
                      setWeaknessPrompt('');
                      setTargetedWeaknesses([]);
                    }}
                    className="text-[11px] text-gray-500 hover:text-red-500 transition flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Làm mới</span>
                  </button>
                )}
              </div>

              <textarea
                rows={2}
                value={weaknessPrompt}
                onChange={(e) => setWeaknessPrompt(e.target.value)}
                placeholder="VD: Tôi rất yếu dạng Map và Process của Task 1 vì không biết miêu tả sự thay đổi; Task 2 thì hay bị bí ý ở dạng Two-part questions và chủ đề Môi trường..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400 transition"
              />
            </div>

            {/* Quick Chips Selection */}
            <div className="space-y-2 pt-1 border-t border-amber-200/60 dark:border-zinc-700/60">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-zinc-300">
                <span>Bấm chọn nhanh các dạng đề bạn muốn tăng cường vào cây đậu:</span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-extrabold">
                  {targetedWeaknesses.length} dạng đã chọn
                </span>
              </div>

              {/* Task 1 Chips */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 block">
                  Task 1 (Báo cáo &amp; Biểu đồ):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TASK1_WEAK_TAGS.map((t) => {
                    const isSelected = targetedWeaknesses.includes(t.value);
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => toggleWeaknessTag(t.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:border-sky-300'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Task 2 Chips */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block">
                  Task 2 (Bài luận Nghị luận):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TASK2_WEAK_TAGS.map((t) => {
                    const isSelected = targetedWeaknesses.includes(t.value);
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => toggleWeaknessTag(t.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:border-emerald-300'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Chips */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                  Chủ đề thường gặp (Topics):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TOPIC_WEAK_TAGS.map((t) => {
                    const isSelected = targetedWeaknesses.includes(t.value);
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => toggleWeaknessTag(t.value)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-semibold'
                            : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-700 hover:border-amber-300'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: STUDY DURATION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>3. Thời Gian Học Dự Kiến (Study Duration):</span>
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

          {/* STEP 4: TREE LEVELS & LIBRARY INTEL */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 dark:border-zinc-800 pb-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>4. Số Tầng Cây Đậu (Tree Levels):</span>
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
                {targetedWeaknesses.length > 0 && (
                  <span className="block mt-1 text-amber-800 dark:text-amber-300 font-semibold">
                    🎯 Ưu tiên tăng cường {targetedWeaknesses.length} dạng điểm yếu: {targetedWeaknesses.join(', ')}
                  </span>
                )}
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
                disabled={isAnalyzing}
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 font-semibold text-xs transition disabled:opacity-50"
              >
                Hủy bỏ
              </button>
            )}

            <button
              type="submit"
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-wait"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>AI Đang Phân Tích &amp; Gieo Cây...</span>
                </>
              ) : (
                <>
                  <Sprout className="w-4 h-4 text-lime-200" />
                  <span>Gieo Hạt &amp; Bắt Đầu Lộ Trình</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
