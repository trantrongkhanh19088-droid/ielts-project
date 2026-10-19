'use client';

import React from 'react';
import { Target, Layers, Sparkles, SpellCheck, ShieldAlert, Lightbulb, Compass } from 'lucide-react';
import { GradingCriteria, DiagnosticRoadmap, TaskType } from '@/types';

interface CriteriaFeedbackTabProps {
  criteria: GradingCriteria;
  taskType: 'task1' | 'task2';
  diagnosticRoadmap?: DiagnosticRoadmap;
}

export default function CriteriaFeedbackTab({
  criteria,
  taskType,
  diagnosticRoadmap,
}: CriteriaFeedbackTabProps) {
  const isTask1 = taskType === 'task1';

  const cards = [
    {
      key: 'ta',
      title: isTask1 ? 'Task Achievement (TA)' : 'Task Response (TR)',
      subtitle: isTask1 ? 'Mức độ hoàn thành yêu cầu đề bài & trích dẫn số liệu' : 'Mức độ trả lời câu hỏi & độ sâu lập luận',
      score: criteria.taskAchievementOrResponse.score,
      feedback: criteria.taskAchievementOrResponse.feedback,
      icon: Target,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900',
    },
    {
      key: 'cc',
      title: 'Coherence & Cohesion (CC)',
      subtitle: 'Tính mạch lạc, liên kết câu & tổ chức đoạn văn hợp lý',
      score: criteria.coherenceCohesion.score,
      feedback: criteria.coherenceCohesion.feedback,
      icon: Layers,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900',
    },
    {
      key: 'lr',
      title: 'Lexical Resource (LR)',
      subtitle: 'Vốn từ vựng, độ chính xác của ngữ cảnh & cụm từ học thuật (Collocations)',
      score: criteria.lexicalResource.score,
      feedback: criteria.lexicalResource.feedback,
      icon: Sparkles,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900',
    },
    {
      key: 'gra',
      title: 'Grammatical Range & Accuracy (GRA)',
      subtitle: 'Độ đa dạng cấu trúc ngữ pháp & độ chính xác về thì, dấu câu',
      score: criteria.grammaticalRange.score,
      feedback: criteria.grammaticalRange.feedback,
      icon: SpellCheck,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Diagnostic Roadmap Card if present */}
      {diagnosticRoadmap && (
        <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>LỘ TRÌNH ĐỘT PHÁ ĐIỂM SỐ // DIAGNOSTIC ROADMAP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {diagnosticRoadmap.bandCeilingFactor && (
              <div className="p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-amber-200/60 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Rào Cản Điểm Số (Band Ceiling Factor):</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {diagnosticRoadmap.bandCeilingFactor}
                </p>
              </div>
            )}

            {diagnosticRoadmap.topPriorityFix && (
              <div className="p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-200/60 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hành Động Ưu Tiên Số 1 (Top Priority Fix):</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {diagnosticRoadmap.topPriorityFix}
                </p>
              </div>
            )}
          </div>

          {diagnosticRoadmap.examinerNoteVi && (
            <div className="pt-2 text-xs text-gray-600 dark:text-gray-400 italic border-t border-amber-500/20">
              💡 Lời khuyên Giám khảo: &ldquo;{diagnosticRoadmap.examinerNoteVi}&rdquo;
            </div>
          )}
        </div>
      )}

      {/* 4 Official Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.key}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg border ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{c.subtitle}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
                    {Number(c.score).toFixed(1)}
                  </span>
                  <span className="text-[11px] block text-gray-400">/ 9.0</span>
                </div>
              </div>

              <div className="pt-4 text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {c.feedback}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
