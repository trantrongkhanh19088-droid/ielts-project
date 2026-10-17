'use client';

import React, { useState } from 'react';
import { Award, Copy, Check, SplitSquareVertical } from 'lucide-react';

interface ModelEssayTabProps {
  modelEssay: string;
  userEssay: string;
}

export default function ModelEssayTab({ modelEssay, userEssay }: ModelEssayTabProps) {
  const [copied, setCopied] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(modelEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modelWordCount = modelEssay.trim().split(/\s+/).filter(Boolean).length;
  const userWordCount = userEssay.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
            Bài viết mẫu Band 8.5+ Chuẩn Quốc Tế
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSideBySide(!sideBySide)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            {sideBySide ? 'Xem bài mẫu toàn màn hình' : 'So sánh song song với bài của bạn'}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Đã sao chép!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Sao chép bài mẫu
              </>
            )}
          </button>
        </div>
      </div>

      {sideBySide ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User's Essay */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Bài viết của bạn
              </span>
              <span className="text-xs text-gray-400 font-mono">{userWordCount} words</span>
            </div>
            <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {userEssay}
            </div>
          </div>

          {/* Model Essay */}
          <div className="bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100 dark:border-emerald-900">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Bài mẫu Band 8.5+ (AI Examiner)
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                {modelWordCount} words
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed font-cdielts">
              {modelEssay}
            </div>
          </div>
        </div>
      ) : (
        /* Single Full Width View */
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Bài mẫu hoàn chỉnh
            </span>
            <span className="text-xs font-mono text-gray-400">{modelWordCount} words</span>
          </div>
          <div className="text-sm md:text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed font-cdielts">
            {modelEssay}
          </div>
        </div>
      )}
    </div>
  );
}
