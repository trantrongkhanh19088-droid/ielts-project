'use client';

import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';
import { BuilderBlock, GradingResult } from '@/types';
import { assembleFullEssayFromBlocks } from '@/lib/builder';

interface LiveEssayPreviewProps {
  blocks: BuilderBlock[];
  taskType: 'task1' | 'task2';
  minWords: number;
  isSubmitting?: boolean;
  existingGradingResult?: GradingResult | null;
  onGradeEssay: (fullEssay: string) => void;
  onCompleteWithoutGrading: () => void;
  onViewGradingResult?: () => void;
}

export default function LiveEssayPreview({
  blocks,
  taskType,
  minWords,
  isSubmitting = false,
  existingGradingResult,
  onGradeEssay,
  onCompleteWithoutGrading,
  onViewGradingResult,
}: LiveEssayPreviewProps) {
  const [copied, setCopied] = React.useState(false);
  const { text: fullEssay, wordCount } = assembleFullEssayFromBlocks(blocks);

  const isWordCountMet = wordCount >= minWords;
  const wordPercent = Math.min(100, Math.round((wordCount / minWords) * 100));

  const handleCopy = () => {
    if (!fullEssay) return;
    navigator.clipboard.writeText(fullEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGradeClick = () => {
    if (wordCount < 30) {
      alert('Bài viết quá ngắn. Vui lòng viết ít nhất một đoạn văn hoàn chỉnh để Giám khảo AI chấm điểm chính xác.');
      return;
    }

    if (!isWordCountMet) {
      const confirmShort = confirm(
        `Bài viết của bạn hiện đạt ${wordCount}/${minWords} từ tối thiểu theo quy định IELTS.\n\nViết dưới số từ tối thiểu có thể bị trừ điểm tiêu chí Task Achievement / Response.\nBạn có muốn tiếp tục gửi chấm không?`
      );
      if (!confirmShort) return;
    }

    onGradeEssay(fullEssay);
  };

  const handleQuickCompleteClick = () => {
    if (wordCount < 10) {
      alert('Vui lòng viết ít nhất một câu trước khi hoàn thành tầng.');
      return;
    }
    onCompleteWithoutGrading();
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Xem Trước Toàn Văn (Live Essay Preview)
          </h3>
        </div>

        {fullEssay && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Word Count Indicator */}
      <div className="space-y-1.5 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-600 dark:text-zinc-400">Số từ hiện tại:</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm font-black ${
                isWordCountMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {wordCount}
            </span>
            <span className="text-gray-400 font-normal">/ {minWords} từ tối thiểu</span>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isWordCountMet ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${wordPercent}%` }}
          />
        </div>
      </div>

      {/* Existing Graded Score Banner */}
      {existingGradingResult && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
              {existingGradingResult.overallBand.toFixed(1)}
            </span>
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-white block">
                Đã được Giám khảo AI chấm điểm
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Overall Band {existingGradingResult.overallBand.toFixed(1)} &bull; {existingGradingResult.wordCount} từ
              </span>
            </div>
          </div>

          {onViewGradingResult && (
            <button
              type="button"
              onClick={onViewGradingResult}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition shrink-0"
            >
              Xem Chi Tiết Điểm
            </button>
          )}
        </div>
      )}

      {/* Formatted Essay Body */}
      <div className="min-h-[200px] max-h-[340px] overflow-y-auto p-4 rounded-2xl bg-gray-50/70 dark:bg-zinc-950/60 border border-gray-200 dark:border-zinc-800 text-xs sm:text-sm text-gray-800 dark:text-zinc-200 leading-relaxed space-y-3 font-cdielts">
        {fullEssay ? (
          fullEssay.split('\n\n').map((para, idx) => (
            <p key={idx} className="indent-4 leading-relaxed">
              {para}
            </p>
          ))
        ) : (
          <div className="h-44 flex flex-col items-center justify-center text-center text-gray-400 space-y-2 font-sans">
            <FileText className="w-8 h-8 stroke-1 text-gray-300 dark:text-zinc-700" />
            <p className="text-xs">
              Các câu văn bạn viết ở các khối bên trái sẽ tự động được ghép thành bài văn hoàn chỉnh tại đây.
            </p>
          </div>
        )}
      </div>

      {/* Dual Submission / Completion Actions */}
      <div className="pt-2 space-y-2">
        {/* Primary Action: Grade with AI Examiner */}
        <button
          type="button"
          disabled={isSubmitting || wordCount < 10}
          onClick={handleGradeClick}
          className={`w-full py-3.5 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer ${
            wordCount < 10 || isSubmitting
              ? 'bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white shadow-emerald-600/30 transform hover:-translate-y-0.5'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>
            {isSubmitting
              ? 'Đang gửi bài cho Giám khảo AI...'
              : existingGradingResult
              ? 'Chấm Lại Bài Viết Với Giám Khảo AI'
              : 'Nộp Bài & Chấm Điểm Với Giám Khảo AI'}
          </span>
        </button>

        {/* Secondary Action: Complete without grading */}
        <button
          type="button"
          disabled={isSubmitting || wordCount < 10}
          onClick={handleQuickCompleteClick}
          className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800/60 font-semibold text-[11px] text-gray-600 dark:text-zinc-400 transition flex items-center justify-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5 text-gray-400" />
          <span>Hoàn thành tầng này (Không cần chấm điểm)</span>
        </button>
      </div>
    </div>
  );
}
