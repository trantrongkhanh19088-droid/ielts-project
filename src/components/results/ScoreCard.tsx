'use client';

import React from 'react';
import { Award, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { GradingResult } from '@/types';
import { formatDuration } from '@/lib/utils';

interface ScoreCardProps {
  result: GradingResult;
  title?: string;
}

export default function ScoreCard({ result, title }: ScoreCardProps) {
  const isTask1 = result.taskType === 'task1';
  const taLabel = isTask1 ? 'Task Achievement (TA)' : 'Task Response (TR)';

  const getBandBadgeColor = (band: number) => {
    if (band >= 8.0) return 'bg-emerald-600 text-white';
    if (band >= 7.0) return 'bg-sky-600 text-white';
    if (band >= 6.0) return 'bg-blue-600 text-white';
    if (band >= 5.0) return 'bg-amber-600 text-white';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
      {/* Top Banner: Title & Overall Band */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {isTask1 ? 'IELTS Academic Task 1' : 'IELTS Writing Task 2'}
          </span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-0.5">
            {title || result.promptTitle}
          </h2>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              {result.wordCount} từ ({isTask1 ? 'Yêu cầu: >=150' : 'Yêu cầu: >=250'})
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Thời gian: {formatDuration(result.timeSpentSeconds)}
            </span>
          </div>
        </div>

        {/* Big Overall Band Score Display */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800/80 dark:to-zinc-800/40 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
          <Award className="w-8 h-8 text-sky-600 shrink-0" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
              Band Score
            </div>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
              {Number(result.overallBand).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Criteria Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* TA / TR */}
        <div className="p-3.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
            {taLabel}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 font-mono">
              {Number(result.criteria.taskAchievementOrResponse.score).toFixed(1)}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getBandBadgeColor(
                result.criteria.taskAchievementOrResponse.score
              )}`}
            >
              Band {result.criteria.taskAchievementOrResponse.score}
            </span>
          </div>
        </div>

        {/* CC */}
        <div className="p-3.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
            Coherence &amp; Cohesion
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 font-mono">
              {Number(result.criteria.coherenceCohesion.score).toFixed(1)}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getBandBadgeColor(
                result.criteria.coherenceCohesion.score
              )}`}
            >
              Band {result.criteria.coherenceCohesion.score}
            </span>
          </div>
        </div>

        {/* LR */}
        <div className="p-3.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
            Lexical Resource
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 font-mono">
              {Number(result.criteria.lexicalResource.score).toFixed(1)}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getBandBadgeColor(
                result.criteria.lexicalResource.score
              )}`}
            >
              Band {result.criteria.lexicalResource.score}
            </span>
          </div>
        </div>

        {/* GRA */}
        <div className="p-3.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
            Grammatical Range
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 font-mono">
              {Number(result.criteria.grammaticalRange.score).toFixed(1)}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getBandBadgeColor(
                result.criteria.grammaticalRange.score
              )}`}
            >
              Band {result.criteria.grammaticalRange.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
