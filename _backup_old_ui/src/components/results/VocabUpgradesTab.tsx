'use client';

import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VocabularyUpgrade } from '@/types';

interface VocabUpgradesTabProps {
  upgrades: VocabularyUpgrade[];
}

export default function VocabUpgradesTab({ upgrades }: VocabUpgradesTabProps) {
  if (!upgrades || upgrades.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center text-sm text-gray-500">
        Vốn từ vựng của bạn trong bài đã rất đa dạng và chính xác!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
          Gợi ý Nâng cấp Từ vựng Học thuật (Band 7.5 - 8.5)
        </h3>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Thay thế các từ ngữ thông dụng bằng các cụm từ collocations và thuật ngữ học thuật để tăng điểm Lexical Resource.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {upgrades.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded bg-gray-100 dark:bg-zinc-800 font-semibold text-gray-700 dark:text-gray-300 line-through">
                {item.basicWord}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-1.5">
                {item.academicAlternatives.map((alt, aIdx) => (
                  <span
                    key={aIdx}
                    className="text-xs px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-bold text-amber-900 dark:text-amber-200"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
              <div className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="italic leading-relaxed">{item.contextExample}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
