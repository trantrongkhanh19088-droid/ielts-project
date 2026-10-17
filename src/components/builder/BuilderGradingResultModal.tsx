'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { GradingResult, BuilderTargetBand } from '@/types';

interface BuilderGradingResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradingResult: GradingResult | null;
  isLoading: boolean;
  levelNumber: number;
  taskType: 'task1' | 'task2';
  targetBand: BuilderTargetBand;
  onContinueNextLevel: () => void;
  recordId?: string;
}

export default function BuilderGradingResultModal({
  isOpen,
  onClose,
  gradingResult,
  isLoading,
  levelNumber,
  taskType,
  targetBand,
  onContinueNextLevel,
  recordId,
}: BuilderGradingResultModalProps) {
  const [activeTab, setActiveTab] = useState<'criteria' | 'corrections' | 'vocab' | 'model'>('criteria');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const loadingSteps = [
    'Giám khảo AI đang phân tích toàn văn bài luận vừa ghép từ các khối câu...',
    'Đang chấm điểm 4 tiêu chí chuẩn IELTS: Task Response, Coherence, Lexical, Grammar...',
    'Đang phân tích các lỗi ngữ pháp chi tiết và đề xuất phương án sửa...',
    'Đang tổng hợp bài văn mẫu Band 8.0+ và lưu kết quả vào hồ sơ thí sinh...',
  ];

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLoading, loadingSteps.length]);

  if (!isOpen) return null;

  const targetBandNum = parseFloat(targetBand);
  const achievedBand = gradingResult?.overallBand || 0;
  const isTargetMet = achievedBand >= targetBandNum;

  // Filter out false positives (e.g. original == corrected or explanations claiming no errors)
  const validCorrections = (gradingResult?.sentenceCorrections || []).filter((corr) => {
    if (!corr || typeof corr.original !== 'string' || typeof corr.corrected !== 'string') return false;
    const orig = corr.original.trim().toLowerCase().replace(/[.,!?;:"'“”]/g, '');
    const fixed = corr.corrected.trim().toLowerCase().replace(/[.,!?;:"'“”]/g, '');
    if (orig === fixed) return false;
    const expl = (corr.explanationVi || '').toLowerCase();
    if (
      expl.includes('không cần chỉnh sửa') ||
      expl.includes('không cần sửa') ||
      expl.includes('hoàn toàn chính xác') ||
      expl.includes('không có lỗi') ||
      expl.includes('đã chuẩn xác') ||
      expl.includes('rất chuẩn xác') ||
      expl.includes('đã hoàn toàn chuẩn')
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-3xl w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Loading State View */}
        {isLoading ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-pulse">
                <Sparkles className="w-10 h-10 animate-spin" />
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow">
                AI
              </span>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                Giám Khảo AI Đang Chấm Bài Viết
              </h3>
              <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold min-h-[40px] transition-all">
                {loadingSteps[loadingStepIndex]}
              </p>
            </div>

            <div className="w-48 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-indeterminate" />
            </div>

            <p className="text-[11px] text-gray-400">
              Quá trình chấm bài toàn diện theo chuẩn Cambridge thường mất từ 10 - 20 giây. Vui lòng giữ màn hình.
            </p>
          </div>
        ) : gradingResult ? (
          /* Graded Result View */
          <>
            {/* Header / Score Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white relative shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                    <span>Cây Đậu &bull; Tầng {levelNumber}</span>
                    <span>&bull; {taskType === 'task1' ? 'Task 1' : 'Task 2'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    {isTargetMet ? '🎉 Xuất Sắc Vượt Mục Tiêu!' : '💪 Hoàn Thành Bài Viết!'}
                  </h2>
                  <p className="text-xs text-emerald-100 max-w-md leading-relaxed">
                    {isTargetMet
                      ? `Bài luận của bạn đạt Band ${achievedBand}, vượt mục tiêu Band ${targetBand} của Cây Đậu!`
                      : `Bài luận đạt Band ${achievedBand}. Hãy xem nhận xét 4 tiêu chí bên dưới để nâng lên Band ${targetBand}.`}
                  </p>
                </div>

                {/* Big Band Badge */}
                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                  <div className="text-center">
                    <span className="text-[11px] uppercase font-bold text-emerald-200 block">
                      Overall Band
                    </span>
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white drop-shadow">
                      {achievedBand.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-left text-[11px]">
                    <div className="text-emerald-200 font-semibold">Target: Band {targetBand}</div>
                    <div className="text-white/80 font-mono text-[11px]">{gradingResult.wordCount} từ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex border-b border-gray-200 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-800/40 px-4 sm:px-6 shrink-0 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('criteria')}
                className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'criteria'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-zinc-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>4 Tiêu chí Chấm</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('corrections')}
                className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'corrections'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-zinc-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  Sửa Lỗi ({validCorrections.length === 0 ? '0 - Không có lỗi' : validCorrections.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('vocab')}
                className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'vocab'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-zinc-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>
                  Từ Vựng Band Cao ({gradingResult.vocabularyUpgrades?.length || 0})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('model')}
                className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'model'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-zinc-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bài Mẫu Band 8.0+</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* TAB 1: 4 CRITERIA */}
              {activeTab === 'criteria' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* TR / TA */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {taskType === 'task1' ? 'Task Achievement (TA)' : 'Task Response (TR)'}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-xs font-mono">
                        Band {gradingResult.criteria.taskAchievementOrResponse.score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {gradingResult.criteria.taskAchievementOrResponse.feedback}
                    </p>
                  </div>

                  {/* CC */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Coherence &amp; Cohesion (CC)
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-xs font-mono">
                        Band {gradingResult.criteria.coherenceCohesion.score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {gradingResult.criteria.coherenceCohesion.feedback}
                    </p>
                  </div>

                  {/* LR */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Lexical Resource (LR)
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-xs font-mono">
                        Band {gradingResult.criteria.lexicalResource.score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {gradingResult.criteria.lexicalResource.feedback}
                    </p>
                  </div>

                  {/* GRA */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Grammatical Range &amp; Accuracy (GRA)
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-xs font-mono">
                        Band {gradingResult.criteria.grammaticalRange.score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {gradingResult.criteria.grammaticalRange.feedback}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: SENTENCE CORRECTIONS */}
              {activeTab === 'corrections' && (
                <div className="space-y-3">
                  {validCorrections.length > 0 ? (
                    validCorrections.map((corr, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 space-y-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-bold text-[11px]">
                            {corr.errorType}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="line-through text-red-600 dark:text-red-400 font-mono">
                            {corr.original}
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                            ✓ {corr.corrected}
                          </p>
                        </div>
                        <p className="text-gray-500 dark:text-zinc-400 text-[11px] italic">
                          {corr.explanationVi}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                        Không phát hiện lỗi ngữ pháp hay từ vựng!
                      </span>
                      <span>Bài viết của bạn được kiểm soát cấu trúc câu và từ vựng rất tốt, không cần chỉnh sửa gì thêm.</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VOCABULARY UPGRADES */}
              {activeTab === 'vocab' && (
                <div className="space-y-3">
                  {gradingResult.vocabularyUpgrades && gradingResult.vocabularyUpgrades.length > 0 ? (
                    gradingResult.vocabularyUpgrades.map((voc, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through font-mono">
                            {voc.basicWord}
                          </span>
                          <span>➔</span>
                          <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">
                            {voc.academicAlternatives.join(', ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-gray-100 dark:border-zinc-800 font-serif">
                          &ldquo;{voc.contextExample}&rdquo;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 text-xs">
                      <span>Vốn từ vựng đã đáp ứng tốt các yêu cầu của bài viết.</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: MODEL ESSAY */}
              {activeTab === 'model' && (
                <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-zinc-950/60 border border-gray-200 dark:border-zinc-800 text-xs sm:text-sm text-gray-800 dark:text-zinc-200 leading-relaxed space-y-3 font-serif">
                  {gradingResult.modelEssayBand8 ? (
                    gradingResult.modelEssayBand8.split('\n\n').map((para, idx) => (
                      <p key={idx} className="indent-4 leading-relaxed">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 font-sans">Chưa có bài mẫu tương ứng.</p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-5 bg-gray-50 dark:bg-zinc-800/60 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {recordId && (
                  <Link
                    href={`/results?id=${recordId}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-gray-100 text-xs font-bold text-gray-700 dark:text-gray-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Xem Bản In Điểm Số</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 text-xs font-semibold text-gray-600 dark:text-gray-300 transition"
                >
                  Đóng
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueNextLevel();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Hoàn Thành &amp; Tiếp Tục Leo Cây Đậu</span>
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
