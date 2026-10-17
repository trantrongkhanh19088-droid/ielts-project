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
    <div className="hairline-border bg-paper-subtle dark:bg-carbon-subtle p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Top Banner: Title & Overall Band */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 hairline-b">
        <div className="space-y-1.5">
          <div className="font-mono text-[11px] tracking-wider text-vermilion uppercase">
            03 // {isTask1 ? 'IELTS ACADEMIC TASK 1' : 'IELTS WRITING TASK 2'}
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-carbon dark:text-paper tracking-normal leading-snug">
            {title || result.promptTitle}
          </h2>
          <div className="flex items-center gap-4 font-mono text-[11px] text-carbon-muted dark:text-paper-muted pt-1">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {result.wordCount} words ({isTask1 ? 'Target: ≥150' : 'Target: ≥250'})
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Time: {formatDuration(result.timeSpentSeconds)}
            </span>
          </div>
        </div>

        {/* Big Overall Band Score Display */}
        <div className="flex items-center gap-4 hairline-border bg-paper dark:bg-carbon px-5 py-3.5">
          <Award className="w-7 h-7 text-vermilion shrink-0 stroke-[1.75]" />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-carbon-muted dark:text-paper-muted">
              Band Score
            </div>
            <div className="text-3xl font-mono font-bold text-carbon dark:text-paper">
              {Number(result.overallBand).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Criteria Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* TA / TR */}
        <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-carbon-muted dark:text-paper-muted truncate">
            {taLabel}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-carbon dark:text-paper">
              {Number(result.criteria.taskAchievementOrResponse.score).toFixed(1)}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion uppercase">
              Band {result.criteria.taskAchievementOrResponse.score}
            </span>
          </div>
        </div>

        {/* CC */}
        <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-carbon-muted dark:text-paper-muted truncate">
            Coherence &amp; Cohesion
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-carbon dark:text-paper">
              {Number(result.criteria.coherenceCohesion.score).toFixed(1)}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion uppercase">
              Band {result.criteria.coherenceCohesion.score}
            </span>
          </div>
        </div>

        {/* LR */}
        <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-carbon-muted dark:text-paper-muted truncate">
            Lexical Resource
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-carbon dark:text-paper">
              {Number(result.criteria.lexicalResource.score).toFixed(1)}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion uppercase">
              Band {result.criteria.lexicalResource.score}
            </span>
          </div>
        </div>

        {/* GRA */}
        <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-carbon-muted dark:text-paper-muted truncate">
            Grammatical Range
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-bold text-carbon dark:text-paper">
              {Number(result.criteria.grammaticalRange.score).toFixed(1)}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion uppercase">
              Band {result.criteria.grammaticalRange.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
