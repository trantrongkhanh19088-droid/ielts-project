'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  BookOpen,
  ArrowRight,
  Info,
} from 'lucide-react';
import { InteractiveMCQ, PromptSeed, BuilderTargetBand } from '@/types';

interface InteractiveMCQPaneProps {
  prompt: PromptSeed;
  mcqs: InteractiveMCQ[];
  targetBand: BuilderTargetBand;
  savedAnswers?: Record<number, number>;
  onSaveAnswers: (answers: Record<number, number>) => void;
  onProceedToEditor: () => void;
}

export default function InteractiveMCQPane({
  prompt,
  mcqs,
  targetBand,
  savedAnswers = {},
  onSaveAnswers,
  onProceedToEditor,
}: InteractiveMCQPaneProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>(savedAnswers);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    const updated = {
      ...selectedOptions,
      [questionId]: optionIdx,
    };
    setSelectedOptions(updated);
    onSaveAnswers(updated);
  };

  const answeredCount = Object.keys(selectedOptions).length;
  const isAllAnswered = answeredCount >= mcqs.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Introduction Guidance Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 border border-sky-200 dark:border-sky-800/50 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-sky-600 text-white shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Giai đoạn A: Định Hướng &amp; Lập Dàn Ý Trước Khi Viết (Pre-Writing)
          </h3>
          <p className="text-xs text-gray-600 dark:text-zinc-300 mt-1 leading-relaxed">
            Trả lời nhanh <strong>{mcqs.length} câu hỏi trắc nghiệm</strong> dưới đây để nắm vững chiến lược tiếp cận đề bài, tránh các bẫy trừ điểm Task Achievement / Task Response, và mở khóa dàn ý Band {targetBand}.
          </p>
        </div>
      </div>

      {/* MCQs List */}
      <div className="space-y-6">
        {mcqs.map((mcq, qIdx) => {
          const selectedIdx = selectedOptions[mcq.id];
          const hasSelected = typeof selectedIdx === 'number';

          return (
            <div
              key={mcq.id}
              className="p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block">
                      {mcq.purposeVi}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                      {mcq.question}
                    </h4>
                  </div>
                </div>

                {hasSelected && (
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      mcq.options[selectedIdx].isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {mcq.options[selectedIdx].isCorrect ? 'Chính xác ✓' : 'Chưa tối ưu'}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {mcq.options.map((opt, optIdx) => {
                  const isCurrentSelected = selectedIdx === optIdx;

                  let borderClass = 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-gray-800 dark:text-zinc-200';
                  if (hasSelected) {
                    if (opt.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (isCurrentSelected && !opt.isCorrect) {
                      borderClass = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(mcq.id, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition flex items-start gap-3 ${borderClass}`}
                    >
                      <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box */}
              {hasSelected && (
                <div
                  className={`p-3.5 rounded-xl text-xs space-y-1 animate-in fade-in ${
                    mcq.options[selectedIdx].isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {mcq.options[selectedIdx].isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>
                      {mcq.options[selectedIdx].isCorrect
                        ? 'Giải thích từ Giám khảo:'
                        : 'Lý do phương án này chưa đạt Band cao:'}
                    </span>
                  </div>
                  <p className="leading-relaxed pl-5">
                    {mcq.options[selectedIdx].explanationVi}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggested Outline Card */}
      {prompt.outline && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/50 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Khung Dàn Ý Đề Xuất (Suggested Outline - Band {targetBand})
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            {prompt.outline.overviewOrThesis && (
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-amber-200/80 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[11px] block">
                  {prompt.taskType === 'task1' ? 'Overview' : 'Thesis Statement'}
                </span>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
                  {prompt.outline.overviewOrThesis}
                </p>
              </div>
            )}

            {prompt.outline.body1 && (
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-amber-200/80 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[11px] block">
                  Body 1
                </span>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
                  {prompt.outline.body1}
                </p>
              </div>
            )}

            {prompt.outline.body2 && (
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-amber-200/80 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[11px] block">
                  Body 2
                </span>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
                  {prompt.outline.body2}
                </p>
              </div>
            )}

            {prompt.outline.conclusion && (
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-amber-200/80 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[11px] block">
                  Conclusion
                </span>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
                  {prompt.outline.conclusion}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action to proceed */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-gray-500 font-medium">
          {isAllAnswered
            ? '✓ Đã hoàn thành phân tích đề bài. Sẵn sàng viết!'
            : `Đã trả lời ${answeredCount}/${mcqs.length} câu định hướng.`}
        </span>

        <button
          type="button"
          onClick={onProceedToEditor}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/25 transition transform hover:-translate-y-0.5"
        >
          <span>Bắt đầu viết từng câu (Block Editor)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
