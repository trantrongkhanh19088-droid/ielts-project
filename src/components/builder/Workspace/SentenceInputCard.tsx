'use client';

import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Search,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  SentenceInput,
  SentenceCheckResult,
  SentenceParaphraseResult,
  BuilderTargetBand,
} from '@/types';

interface SentenceInputCardProps {
  sentence: SentenceInput;
  sentenceIndex: number;
  totalSentencesInBlock: number;
  blockId: string;
  taskType: 'task1' | 'task2';
  promptQuestion: string;
  targetBand: BuilderTargetBand;
  previousSentences: string[];
  onChangeText: (text: string) => void;
  onUpdateCheckResult: (result: SentenceCheckResult | null) => void;
  onUpdateParaphraseResult: (result: SentenceParaphraseResult | null) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  globalShowHint?: boolean;
}

export default function SentenceInputCard({
  sentence,
  sentenceIndex,
  totalSentencesInBlock,
  blockId,
  taskType,
  promptQuestion,
  targetBand,
  previousSentences,
  onChangeText,
  onUpdateCheckResult,
  onUpdateParaphraseResult,
  onMoveUp,
  onMoveDown,
  onDelete,
  globalShowHint,
}: SentenceInputCardProps) {
  const [showHint, setShowHint] = useState(true);

  // Sync if parent block toggles hints
  React.useEffect(() => {
    if (globalShowHint !== undefined) {
      setShowHint(globalShowHint);
    }
  }, [globalShowHint]);

  // Clean hint without redundant "Câu X:" prefix for neat display beside "Câu X"
  const cleanHint = React.useMemo(() => {
    if (!sentence.placeholderHint) return '';
    const cleaned = sentence.placeholderHint.replace(/^Câu\s*\d+\s*[:\-–]\s*/i, '').trim();
    return cleaned || sentence.placeholderHint;
  }, [sentence.placeholderHint]);

  const [isChecking, setIsChecking] = useState(false);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [activeTab, setActiveTab] = useState<'none' | 'check' | 'update'>(() => {
    if (sentence.checkResult) return 'check';
    if (sentence.paraphraseResult) return 'update';
    return 'none';
  });

  // Call Check AI API
  const handleCheck = async () => {
    if (!sentence.text.trim()) {
      alert('Vui lòng gõ một câu văn trước khi nhấn Kiểm tra lỗi.');
      return;
    }

    setIsChecking(true);
    setActiveTab('check');
    try {
      const res = await fetch('/api/builder/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: sentence.text,
          blockId,
          taskType,
          promptText: promptQuestion,
          previousSentences,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi kiểm tra ngữ pháp.');
      }

      const data: SentenceCheckResult = await res.json();
      onUpdateCheckResult(data);
    } catch (err: any) {
      alert(`Kiểm tra lỗi thất bại: ${err.message || 'Lỗi mạng'}`);
    } finally {
      setIsChecking(false);
    }
  };

  // Call Paraphrase AI API
  const handleParaphrase = async () => {
    if (!sentence.text.trim()) {
      alert('Vui lòng gõ một câu văn trước khi nhấn Nâng cấp câu.');
      return;
    }

    setIsParaphrasing(true);
    setActiveTab('update');
    try {
      const res = await fetch('/api/builder/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: sentence.text,
          targetBand,
          blockId,
          taskType,
          promptText: promptQuestion,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi nâng cấp câu.');
      }

      const data: SentenceParaphraseResult = await res.json();
      onUpdateParaphraseResult(data);
    } catch (err: any) {
      alert(`Nâng cấp câu thất bại: ${err.message || 'Lỗi mạng'}`);
    } finally {
      setIsParaphrasing(false);
    }
  };

  const applyCorrectedSentence = (corrected: string) => {
    onChangeText(corrected);
  };

  const applyParaphrasedSentence = (paraphrased: string) => {
    onChangeText(paraphrased);
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3 transition hover:border-gray-300 dark:hover:border-zinc-700">
      {/* Top Header of Card */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
          {/* Sentence Badge */}
          <span className="px-2.5 py-0.5 rounded-md font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-[11px] shrink-0">
            Câu {sentenceIndex + 1}
          </span>

          {/* Eye Icon to Toggle Show/Hide Writing Hint */}
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            title={showHint ? 'Bấm để ẩn gợi ý viết câu này' : 'Bấm để hiện gợi ý viết câu này'}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold transition shrink-0 cursor-pointer ${
              showHint
                ? 'bg-sky-50 hover:bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
            }`}
          >
            {showHint ? (
              <>
                <Eye className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="text-[10px]">Gợi ý</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px]">Gợi ý: Ẩn</span>
              </>
            )}
          </button>

          {/* Writing hint displayed right beside Câu 1 / Câu 2 when showHint is true */}
          {showHint && cleanHint && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-900/60 min-w-0 max-w-full sm:max-w-md animate-in fade-in duration-200">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-medium truncate" title={cleanHint}>
                {cleanHint}
              </span>
            </div>
          )}
        </div>

        {/* Reordering and Delete controls */}
        <div className="flex items-center gap-1 text-gray-400 shrink-0">
          {onMoveUp && sentenceIndex > 0 && (
            <button
              type="button"
              onClick={onMoveUp}
              title="Di chuyển lên trên"
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 transition"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}

          {onMoveDown && sentenceIndex < totalSentencesInBlock - 1 && (
            <button
              type="button"
              onClick={onMoveDown}
              title="Di chuyển xuống dưới"
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-700 transition"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && totalSentencesInBlock > 1 && (
            <button
              type="button"
              onClick={onDelete}
              title="Xóa câu này"
              className="p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sentence Input Area */}
      <div>
        <textarea
          rows={2}
          value={sentence.text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={showHint ? sentence.placeholderHint : 'Nhập câu văn của bạn tại đây...'}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white dark:focus:bg-zinc-900 transition leading-relaxed resize-none"
        />
      </div>

      {/* Action AI Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          {/* Button 1: Check Errors */}
          <button
            type="button"
            disabled={isChecking || !sentence.text.trim()}
            onClick={handleCheck}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${
              isChecking
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 cursor-wait'
                : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            {isChecking ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang soát lỗi...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>Kiểm tra lỗi (Check)</span>
              </>
            )}
          </button>

          {/* Button 2: Update / Paraphrase to Target Band */}
          <button
            type="button"
            disabled={isParaphrasing || !sentence.text.trim()}
            onClick={handleParaphrase}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${
              isParaphrasing
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 cursor-wait'
                : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isParaphrasing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang nâng cấp...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nâng cấp câu Band {targetBand} (Update)</span>
              </>
            )}
          </button>
        </div>

        {/* Word count of this sentence */}
        <span className="text-[10px] text-gray-400 font-medium">
          {sentence.text.trim() ? `${sentence.text.trim().split(/\s+/).filter(Boolean).length} từ` : '0 từ'}
        </span>
      </div>

      {/* AI RESULT TABS DISPLAY */}
      {/* 1. CHECK RESULTS VIEW */}
      {activeTab === 'check' && sentence.checkResult && (
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
              <Search className="w-4 h-4 text-amber-600" />
              <span>Kết quả kiểm tra câu:</span>
            </div>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                sentence.checkResult.hasErrors
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {sentence.checkResult.hasErrors
                ? `${sentence.checkResult.errors.length} lỗi cần khắc phục`
                : 'Chuẩn xác & Không có lỗi! ✓'}
            </span>
          </div>

          {/* List of Detected Errors */}
          {sentence.checkResult.hasErrors && sentence.checkResult.errors.length > 0 ? (
            <div className="space-y-2">
              {sentence.checkResult.errors.map((err, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-amber-200/80 dark:border-zinc-800 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                      {err.type}
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="line-through text-rose-600 font-medium">{err.originalSnippet}</span>
                      <span>➔</span>
                      <span className="font-bold text-emerald-600">{err.correction}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-zinc-400">
                    {err.explanationVi}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-emerald-700 dark:text-emerald-300 text-xs">
              Câu văn của bạn có ngữ pháp và chính tả chuẩn xác. Bạn có thể nhấn <strong>Nâng cấp câu Band {targetBand}</strong> để làm câu văn hay và học thuật hơn!
            </p>
          )}

          {/* Corrected Sentence Version with Quick Apply */}
          {sentence.checkResult.hasErrors && sentence.checkResult.correctedSentence && (
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5 flex-1">
                <span className="text-[10px] uppercase font-bold text-gray-500">Bản sửa hoàn chỉnh:</span>
                <p className="font-semibold text-gray-900 dark:text-white leading-relaxed">
                  {sentence.checkResult.correctedSentence}
                </p>
              </div>
              <button
                type="button"
                onClick={() => applyCorrectedSentence(sentence.checkResult!.correctedSentence)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Áp dụng sửa lỗi</span>
              </button>
            </div>
          )}

          {sentence.checkResult.overallAdviceVi && (
            <div className="text-[11px] text-amber-800 dark:text-amber-400 italic">
              💡 {sentence.checkResult.overallAdviceVi}
            </div>
          )}
        </div>
      )}

      {/* 2. PARAPHRASE RESULTS VIEW */}
      {activeTab === 'update' && sentence.paraphraseResult && (
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Bản nâng cấp học thuật (Band {sentence.paraphraseResult.bandScore}):</span>
            </div>
            <button
              type="button"
              onClick={() => applyParaphrasedSentence(sentence.paraphraseResult!.paraphrasedSentence)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Áp dụng câu này vào bài</span>
            </button>
          </div>

          {/* Paraphrased Sentence Quote */}
          <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-800 text-sm font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed shadow-xs">
            &ldquo;{sentence.paraphraseResult.paraphrasedSentence}&rdquo;
          </div>

          {/* Lexical Highlights & Collocations List */}
          {sentence.paraphraseResult.lexicalHighlights && sentence.paraphraseResult.lexicalHighlights.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
                Từ vựng &amp; Cụm từ ăn điểm (Lexical Highlights):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sentence.paraphraseResult.lexicalHighlights.map((lex, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-emerald-200/80 dark:border-zinc-800 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-xs text-emerald-700 dark:text-emerald-400">
                        {lex.phrase}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                        {lex.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-700 dark:text-zinc-300 font-medium">
                      {lex.meaningVi}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-400 italic">
                      {lex.usageNoteVi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Style Explanation */}
          {sentence.paraphraseResult.styleExplanationVi && (
            <div className="p-3 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-emerald-200/50 dark:border-zinc-800 text-[11px] text-gray-600 dark:text-zinc-300 leading-relaxed space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                Điểm cộng tiêu chí (Grammar &amp; Lexical):
              </span>
              <p>{sentence.paraphraseResult.styleExplanationVi}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
