'use client';

import React, { useState } from 'react';
import { AlertCircle, Check, ArrowRight, BookOpen } from 'lucide-react';
import { SentenceCorrection } from '@/types';

interface InteractiveEssayProps {
  essay: string;
  corrections: SentenceCorrection[];
}

export default function InteractiveEssay({ essay, corrections }: InteractiveEssayProps) {
  // Sanitize and filter out false positives (e.g. original == corrected or explanations claiming no errors)
  const validCorrections = React.useMemo(() => {
    return (corrections || []).filter((corr) => {
      if (!corr || typeof corr.original !== 'string' || typeof corr.corrected !== 'string') {
        return false;
      }
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
  }, [corrections]);

  const [selectedCorrection, setSelectedCorrection] = useState<SentenceCorrection | null>(
    validCorrections.length > 0 ? validCorrections[0] : null
  );

  // Keep selectedCorrection updated if validCorrections changes
  React.useEffect(() => {
    setSelectedCorrection(validCorrections.length > 0 ? validCorrections[0] : null);
  }, [validCorrections]);

  const getErrorTypeBadge = (type: string) => {
    switch (type) {
      case 'Grammar':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Vocabulary':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Cohesion':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800';
    }
  };

  // Helper to render essay with highlighted error segments
  const renderHighlightedEssay = () => {
    if (!validCorrections || validCorrections.length === 0) {
      return (
        <div className="whitespace-pre-wrap leading-relaxed text-sm text-gray-800 dark:text-gray-200">
          {essay}
        </div>
      );
    }

    // Split paragraphs
    const paragraphs = essay.split('\n\n');

    return (
      <div className="space-y-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
        {paragraphs.map((para, pIdx) => {
          // Check if any correction is in this paragraph
          let renderedPara: React.ReactNode = para;

          validCorrections.forEach((corr, cIdx) => {
            if (typeof renderedPara === 'string' && corr.original && renderedPara.includes(corr.original)) {
              const parts = renderedPara.split(corr.original);
              const isSelected = selectedCorrection?.original === corr.original;

              renderedPara = (
                <React.Fragment key={`para-${pIdx}-corr-${cIdx}`}>
                  {parts[0]}
                  <span
                    onClick={() => setSelectedCorrection(corr)}
                    className={`cursor-pointer px-1 py-0.5 rounded transition border-b-2 font-medium ${
                      isSelected
                        ? 'bg-rose-200 dark:bg-rose-900/60 border-rose-600 text-rose-950 dark:text-rose-100 shadow-sm'
                        : 'bg-amber-100 dark:bg-amber-950/50 border-amber-500 hover:bg-amber-200 text-amber-900 dark:text-amber-100'
                    }`}
                    title="Bấm để xem chi tiết lỗi và cách sửa"
                  >
                    {corr.original}
                  </span>
                  {parts.slice(1).join(corr.original)}
                </React.Fragment>
              );
            }
          });

          return (
            <p key={pIdx} className="leading-relaxed">
              {renderedPara}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left (7 cols): Original Essay with Highlighting */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
              Bài viết của bạn {validCorrections.length > 0 ? '(Bấm vào câu màu để xem lỗi)' : ''}
            </h3>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              validCorrections.length === 0
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
            }`}
          >
            {validCorrections.length === 0 ? '✓ Không có lỗi' : `${validCorrections.length} lỗi cần sửa`}
          </span>
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-zinc-800/20 rounded-lg border border-gray-200/80 dark:border-zinc-800">
          {renderHighlightedEssay()}
        </div>
      </div>

      {/* Right (5 cols): Correction Detail Card + List */}
      <div className="lg:col-span-5 space-y-4">
        {validCorrections.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-6 shadow-sm text-center space-y-3 sticky top-20">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              Không phát hiện lỗi ngữ pháp hay từ vựng!
            </h4>
            <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
              Bài viết của bạn được kiểm soát ngữ pháp và từ vựng rất tốt, câu văn chuẩn xác và tự nhiên theo chuẩn IELTS. Không có câu nào cần phải chỉnh sửa.
            </p>
          </div>
        ) : selectedCorrection ? (
          <div className="bg-white dark:bg-zinc-900 border-2 border-sky-500/40 dark:border-sky-500/30 rounded-xl p-5 shadow-sm space-y-4 sticky top-20">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getErrorTypeBadge(
                  selectedCorrection.errorType
                )}`}
              >
                Lỗi {selectedCorrection.errorType}
              </span>
              <span className="text-xs text-gray-400">Chi tiết câu sửa</span>
            </div>

            {/* Original with error */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Câu gốc của bạn:
              </span>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-lg text-xs text-rose-900 dark:text-rose-200 italic">
                &ldquo;{selectedCorrection.original}&rdquo;
              </div>
            </div>

            {/* Corrected Band 8+ */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Gợi ý sửa chuẩn Band 8.0+:
              </span>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-lg text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                &ldquo;{selectedCorrection.corrected}&rdquo;
              </div>
            </div>

            {/* Explanation in Vietnamese */}
            <div className="space-y-1 pt-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Giải thích chi tiết (Tiếng Việt):
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-gray-100 dark:border-zinc-800">
                {selectedCorrection.explanationVi}
              </p>
            </div>
          </div>
        ) : null}

        {/* List of all corrections */}
        {validCorrections.length > 1 && (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Danh sách toàn bộ {validCorrections.length} lỗi trong bài:
            </h4>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {validCorrections.map((corr, idx) => {
                const isSelected = selectedCorrection?.original === corr.original;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCorrection(corr)}
                    className={`w-full text-left p-2 rounded text-xs transition border flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 font-semibold text-sky-900 dark:text-sky-200'
                        : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/40 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="truncate max-w-[220px]">{corr.original}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${getErrorTypeBadge(
                        corr.errorType
                      )}`}
                    >
                      {corr.errorType}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
