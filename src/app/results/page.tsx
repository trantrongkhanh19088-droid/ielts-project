'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Printer,
  RotateCcw,
  BarChart2,
  Award,
  Layers,
  FileText,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { EssayRecord, GradingResult, FullTestGradingResult } from '@/types';
import { fetchEssayRecordById, fetchAllEssayRecords } from '@/lib/storage';
import ScoreCard from '@/components/results/ScoreCard';
import InteractiveEssay from '@/components/results/InteractiveEssay';
import CriteriaFeedbackTab from '@/components/results/CriteriaFeedbackTab';
import VocabUpgradesTab from '@/components/results/VocabUpgradesTab';
import ModelEssayTab from '@/components/results/ModelEssayTab';
import LowScoreMemeModal from '@/components/results/LowScoreMemeModal';
import { formatDuration } from '@/lib/utils';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultId = searchParams.get('id');

  const [record, setRecord] = useState<EssayRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFullTestTab, setActiveFullTestTab] = useState<'task1' | 'task2'>('task1');
  const [activeDetailTab, setActiveDetailTab] = useState<'essay' | 'criteria' | 'vocab' | 'model'>('essay');
  const [showMemeModal, setShowMemeModal] = useState(false);
  const [dismissedResultIds, setDismissedResultIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    async function loadResult() {
      setLoading(true);
      let currentRecord: EssayRecord | null = null;
      if (resultId) {
        currentRecord = await fetchEssayRecordById(resultId);
      }
      if (!currentRecord) {
        const list = await fetchAllEssayRecords();
        if (list.length > 0) {
          currentRecord = list[0];
        }
      }
      if (isMounted) {
        setRecord(currentRecord);
        setLoading(false);

        // Trigger popup if band is strictly below 6.0 and hasn't been dismissed yet
        if (currentRecord && currentRecord.overall_band < 6.0 && !dismissedResultIds.has(currentRecord.id)) {
          setShowMemeModal(true);
        }
      }
    }

    loadResult();
    return () => {
      isMounted = false;
    };
  }, [resultId, dismissedResultIds]);

  const handleCloseMeme = () => {
    setShowMemeModal(false);
    if (record) {
      setDismissedResultIds((prev) => new Set(prev).add(record.id));
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-paper dark:bg-carbon">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-vermilion border-t-transparent animate-spin" />
          <p className="font-mono text-xs uppercase tracking-wider text-carbon-muted dark:text-paper-muted">
            00 // Đang tải kết quả bài chấm...
          </p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4 bg-paper dark:bg-carbon">
        <div className="font-mono text-xs tracking-wider text-vermilion uppercase">
          00 // KHÔNG CÓ DỮ LIỆU
        </div>
        <h2 className="font-display font-bold text-2xl text-carbon dark:text-paper tracking-tight leading-snug">
          Chưa tìm thấy bài thi nào
        </h2>
        <p className="font-sans text-xs text-carbon-muted dark:text-paper-muted max-w-[45ch] leading-relaxed">
          Có vẻ bạn chưa nộp bài viết nào hoặc dữ liệu đã được làm mới. Hãy bắt đầu một bài luyện tập mới ngay bây giờ!
        </p>
        <Link
          href="/practice"
          className="px-6 py-3 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors duration-200"
        >
          Bắt đầu luyện tập →
        </Link>
      </div>
    );
  }

  const isFullTest = record.task_type === 'full_test';
  const fullTestFeedback = isFullTest ? (record.ai_feedback_json as FullTestGradingResult) : null;

  // Active result for tab views
  const activeResult: GradingResult = isFullTest && fullTestFeedback
    ? activeFullTestTab === 'task1'
      ? fullTestFeedback.task1Result
      : fullTestFeedback.task2Result
    : (record.ai_feedback_json as GradingResult);

  // Filter out false positives (e.g. original == corrected or explanations claiming no error)
  const validCorrectionsCount = (activeResult?.sentenceCorrections || []).filter((corr) => {
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
  }).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-paper dark:bg-carbon">
      {/* Low Score Meme Modal (< 6.0 Band) */}
      <LowScoreMemeModal
        isOpen={showMemeModal}
        onClose={handleCloseMeme}
        bandScore={record.overall_band}
      />

      {/* Top Banner & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 hairline-b">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-wider px-2.5 py-0.5 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion uppercase">
              00 // BÁO CÁO ĐÁNH GIÁ AI EXAMINER
            </span>
            <span className="font-mono text-[11px] text-carbon-muted dark:text-paper-muted">
              {new Date(record.created_at).toLocaleString('vi-VN')}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-carbon dark:text-paper mt-2 tracking-tight leading-snug">
            {record.prompt_title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 print-hidden flex-wrap">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 hairline-border bg-paper dark:bg-carbon text-carbon dark:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-vermilion" />
            <span>In / PDF</span>
          </button>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 px-4 py-2 hairline-border bg-paper dark:bg-carbon text-carbon dark:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-vermilion" />
            <span>Luyện bài mới</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Full Test Overall Band Banner */}
      {isFullTest && fullTestFeedback && (
        <div className="p-6 sm:p-8 hairline-border bg-carbon text-paper dark:bg-carbon-subtle shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-vermilion uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>01 // IELTS Full Writing Test Summary</span>
            </div>
            <h2 className="font-display font-bold text-2xl tracking-tight leading-snug">
              Điểm Tổng Kết Overall Writing
            </h2>
            <p className="font-sans text-xs text-paper-muted leading-relaxed max-w-[55ch]">
              Tính theo chuẩn IDP &amp; British Council: làm tròn đến 0.5 gần nhất của{' '}
              <code className="bg-carbon-subtle dark:bg-carbon px-1.5 py-0.5 font-mono text-[11px] hairline-border">
                (Band Task 1 + Band Task 2 &times; 2) / 3
              </code>
            </p>
          </div>

          <div className="flex items-center gap-6 bg-carbon-subtle dark:bg-carbon px-6 py-4 hairline-border">
            <div className="text-center">
              <span className="font-mono text-[11px] uppercase tracking-wider text-paper-muted block">
                Task 1
              </span>
              <span className="text-2xl font-mono font-bold text-paper">
                {fullTestFeedback.task1Result.overallBand.toFixed(1)}
              </span>
            </div>
            <div className="text-xl text-paper-muted font-light">+</div>
            <div className="text-center">
              <span className="font-mono text-[11px] uppercase tracking-wider text-paper-muted block">
                Task 2 (&times;2)
              </span>
              <span className="text-2xl font-mono font-bold text-paper">
                {fullTestFeedback.task2Result.overallBand.toFixed(1)}
              </span>
            </div>
            <div className="text-xl text-paper-muted font-light">=</div>
            <div className="text-center pl-3 border-l border-white/15">
              <span className="font-mono text-[11px] uppercase tracking-wider text-vermilion font-bold block">
                Overall Band
              </span>
              <span className="text-3xl sm:text-4xl font-mono font-bold text-vermilion">
                {fullTestFeedback.overallBand.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Full Test Navigation: Part 1 vs Part 2 Switcher */}
      {isFullTest && (
        <div className="flex items-center gap-2 hairline-b pb-4 print-hidden flex-wrap">
          <span className="font-mono text-[11px] text-carbon-muted dark:text-paper-muted uppercase tracking-wider mr-2">
            Xem chi tiết:
          </span>
          <button
            type="button"
            onClick={() => setActiveFullTestTab('task1')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeFullTestTab === 'task1'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <span>Part 1 (Academic Task 1)</span>
            <span className="font-mono text-[11px] text-vermilion">
              Band {fullTestFeedback?.task1Result.overallBand.toFixed(1)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFullTestTab('task2')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeFullTestTab === 'task2'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <span>Part 2 (Writing Task 2)</span>
            <span className="font-mono text-[11px] text-vermilion">
              Band {fullTestFeedback?.task2Result.overallBand.toFixed(1)}
            </span>
          </button>
        </div>
      )}

      {/* Prompt Reference & Chart Image */}
      <div className="hairline-border bg-paper-subtle dark:bg-carbon-subtle p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-wider text-vermilion uppercase">
            02 // ĐỀ BÀI THI ({activeResult.taskType === 'task1' ? 'TASK 1' : 'TASK 2'})
          </span>
          <span className="font-mono text-xs font-semibold text-carbon dark:text-paper">
            {activeResult.promptTitle}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-carbon-muted dark:text-paper-muted font-sans">
          {activeResult.promptText}
        </p>
        {record.chart_image_url && (activeResult.taskType === 'task1' || !isFullTest) && (
          <div className="pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={record.chart_image_url}
              alt="Biểu đồ đề bài"
              className="max-h-56 object-contain hairline-border bg-paper"
            />
          </div>
        )}
      </div>

      {/* Active Task ScoreCard */}
      <ScoreCard result={activeResult} />

      {/* 4 Detail Tabs (Interactive Essay, Criteria, Vocab, Model Essay) */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 hairline-b pb-3 print-hidden">
          <button
            type="button"
            onClick={() => setActiveDetailTab('essay')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeDetailTab === 'essay'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {validCorrectionsCount === 0
                ? 'Sửa lỗi (0)'
                : `Sửa lỗi bài viết (${validCorrectionsCount})`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('criteria')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeDetailTab === 'criteria'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>4 Tiêu chí chi tiết</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('vocab')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeDetailTab === 'vocab'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-vermilion" />
            <span>Nâng cấp từ vựng C1/C2 ({activeResult.vocabularyUpgrades.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('model')}
            className={`px-4 py-2 hairline-border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeDetailTab === 'model'
                ? 'bg-carbon text-paper dark:bg-paper dark:text-carbon'
                : 'bg-transparent text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper hover:bg-paper-subtle dark:hover:bg-carbon-subtle'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-vermilion" />
            <span>Bài mẫu Band 8.5+</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeDetailTab === 'essay' && (
            <InteractiveEssay
              essay={activeResult.userEssay}
              corrections={activeResult.sentenceCorrections}
            />
          )}

          {activeDetailTab === 'criteria' && (
            <CriteriaFeedbackTab
              criteria={activeResult.criteria}
              taskType={activeResult.taskType}
            />
          )}

          {activeDetailTab === 'vocab' && (
            <VocabUpgradesTab upgrades={activeResult.vocabularyUpgrades} />
          )}

          {activeDetailTab === 'model' && (
            <ModelEssayTab
              modelEssay={activeResult.modelEssayBand8}
              userEssay={activeResult.userEssay}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-paper dark:bg-carbon">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-vermilion border-t-transparent animate-spin" />
            <p className="font-mono text-xs uppercase tracking-wider text-carbon-muted dark:text-paper-muted">
              00 // Đang tải kết quả bài chấm...
            </p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
