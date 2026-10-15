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
import { getLocalEssayRecords } from '@/lib/storage';
import ScoreCard from '@/components/results/ScoreCard';
import InteractiveEssay from '@/components/results/InteractiveEssay';
import CriteriaFeedbackTab from '@/components/results/CriteriaFeedbackTab';
import VocabUpgradesTab from '@/components/results/VocabUpgradesTab';
import ModelEssayTab from '@/components/results/ModelEssayTab';
import { formatDuration } from '@/lib/utils';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultId = searchParams.get('id');

  const [record, setRecord] = useState<EssayRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFullTestTab, setActiveFullTestTab] = useState<'task1' | 'task2'>('task1');
  const [activeDetailTab, setActiveDetailTab] = useState<'essay' | 'criteria' | 'vocab' | 'model'>('essay');

  useEffect(() => {
    const list = getLocalEssayRecords();
    if (resultId) {
      const found = list.find((r) => r.id === resultId);
      if (found) {
        setRecord(found);
      } else if (list.length > 0) {
        setRecord(list[0]);
      }
    } else if (list.length > 0) {
      setRecord(list[0]);
    }
    setLoading(false);
  }, [resultId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Đang tải kết quả bài chấm...</p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Chưa tìm thấy bài thi nào
        </h2>
        <p className="text-sm text-gray-500 max-w-md">
          Có vẻ bạn chưa nộp bài viết nào hoặc dữ liệu đã được làm mới. Hãy bắt đầu một bài luyện tập mới ngay bây giờ!
        </p>
        <Link
          href="/practice"
          className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md hover:bg-sky-700 transition"
        >
          Bắt đầu luyện tập
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Kết Quả Chấm Bài AI Examiner
            </span>
            <span className="text-xs text-gray-400">
              {new Date(record.created_at).toLocaleString('vi-VN')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            {record.prompt_title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 print-hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-sky-600" />
            <span>In / Xuất PDF</span>
          </button>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-semibold shadow-sm transition"
          >
            <RotateCcw className="w-4 h-4 text-sky-600" />
            <span>Luyện bài mới</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Xem Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Full Test Overall Band Banner */}
      {isFullTest && fullTestFeedback && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-900 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>IELTS Full Writing Test Summary</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Điểm Tổng Kết Overall Writing
            </h2>
            <p className="text-xs text-sky-200 max-w-lg leading-relaxed">
              Tính theo công thức chuẩn British Council &amp; IDP: làm tròn đến 0.5 gần nhất của{' '}
              <code className="bg-white/10 px-1 py-0.5 rounded font-mono">
                (Band Task 1 + Band Task 2 * 2) / 3
              </code>
            </p>
          </div>

          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-sky-300 block">
                Task 1
              </span>
              <span className="text-2xl font-extrabold font-mono">
                {fullTestFeedback.task1Result.overallBand.toFixed(1)}
              </span>
            </div>
            <div className="text-xl text-sky-400 font-light">+</div>
            <div className="text-center">
              <span className="text-[11px] uppercase tracking-wider text-sky-300 block">
                Task 2 (&times;2)
              </span>
              <span className="text-2xl font-extrabold font-mono">
                {fullTestFeedback.task2Result.overallBand.toFixed(1)}
              </span>
            </div>
            <div className="text-xl text-sky-400 font-light">=</div>
            <div className="text-center pl-2 border-l border-white/20">
              <span className="text-[11px] uppercase tracking-wider text-yellow-300 font-bold block">
                Overall Band
              </span>
              <span className="text-4xl font-black text-yellow-300 font-mono">
                {fullTestFeedback.overallBand.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Full Test Navigation: Part 1 vs Part 2 Switcher */}
      {isFullTest && (
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-zinc-800 pb-3 print-hidden">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Xem chi tiết bài chấm:
          </span>
          <button
            type="button"
            onClick={() => setActiveFullTestTab('task1')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeFullTestTab === 'task1'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span>Part 1 (Academic Task 1)</span>
            <span className="font-mono text-[11px] opacity-85">
              Band {fullTestFeedback?.task1Result.overallBand.toFixed(1)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFullTestTab('task2')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeFullTestTab === 'task2'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <span>Part 2 (Writing Task 2)</span>
            <span className="font-mono text-[11px] opacity-85">
              Band {fullTestFeedback?.task2Result.overallBand.toFixed(1)}
            </span>
          </button>
        </div>
      )}

      {/* Prompt Reference & Chart Image */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Đề bài thi ({activeResult.taskType === 'task1' ? 'Task 1' : 'Task 2'}):
          </span>
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
            {activeResult.promptTitle}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-sans">
          {activeResult.promptText}
        </p>
        {record.chart_image_url && (activeResult.taskType === 'task1' || !isFullTest) && (
          <div className="pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={record.chart_image_url}
              alt="Biểu đồ đề bài"
              className="max-h-56 object-contain rounded-lg border border-gray-200 dark:border-zinc-800 bg-white"
            />
          </div>
        )}
      </div>

      {/* Active Task ScoreCard */}
      <ScoreCard result={activeResult} />

      {/* 4 Detail Tabs (Interactive Essay, Criteria, Vocab, Model Essay) */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-zinc-800 pb-2 print-hidden">
          <button
            type="button"
            onClick={() => setActiveDetailTab('essay')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeDetailTab === 'essay'
                ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Sửa lỗi trong bài viết ({activeResult.sentenceCorrections.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('criteria')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeDetailTab === 'criteria'
                ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Nhận xét 4 tiêu chí chi tiết</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('vocab')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeDetailTab === 'vocab'
                ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Nâng cấp từ vựng C1/C2 ({activeResult.vocabularyUpgrades.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveDetailTab('model')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeDetailTab === 'model'
                ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Bài viết mẫu Band 8.5+</span>
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
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Đang tải kết quả bài chấm...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
