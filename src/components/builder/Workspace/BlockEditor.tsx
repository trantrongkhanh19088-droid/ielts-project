'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  BuilderBlock,
  BuilderTargetBand,
  SentenceCheckResult,
  SentenceParaphraseResult,
} from '@/types';
import { getBuilderAutoSuggest, setBuilderAutoSuggest } from '@/lib/builder';
import SentenceInputCard from './SentenceInputCard';

interface BlockEditorProps {
  blocks: BuilderBlock[];
  taskType: 'task1' | 'task2';
  promptQuestion: string;
  targetBand: BuilderTargetBand;
  onChangeBlocks: (updatedBlocks: BuilderBlock[]) => void;
}

export default function BlockEditor({
  blocks,
  taskType,
  promptQuestion,
  targetBand,
  onChangeBlocks,
}: BlockEditorProps) {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [showAllHints, setShowAllHints] = useState(true);

  // Sync auto-suggest setting on mount and listen to settings updates
  useEffect(() => {
    setShowAllHints(getBuilderAutoSuggest());

    const handleSettingsChange = () => {
      setShowAllHints(getBuilderAutoSuggest());
    };

    window.addEventListener('builder_settings_changed', handleSettingsChange);
    return () => {
      window.removeEventListener('builder_settings_changed', handleSettingsChange);
    };
  }, []);

  const handleToggleHints = () => {
    const nextVal = !showAllHints;
    setShowAllHints(nextVal);
    setBuilderAutoSuggest(nextVal);
  };

  // Safeguard index
  const safeIndex = Math.min(Math.max(0, activeBlockIndex), blocks.length - 1);
  const activeBlock = blocks[safeIndex];

  // Helper short names
  const getBlockShortName = (b: BuilderBlock) => {
    switch (b.id) {
      case 'intro':
        return 'Mở bài (Intro)';
      case 'overview':
        return 'Tổng quan (Overview)';
      case 'body1':
        return 'Thân bài 1 (Body 1)';
      case 'body2':
        return 'Thân bài 2 (Body 2)';
      case 'conclusion':
        return 'Kết bài (Conclusion)';
      default:
        return b.title;
    }
  };

  // Update single sentence text
  const handleSentenceTextChange = (sentenceIdx: number, newText: string) => {
    const updated = [...blocks];
    updated[safeIndex].sentences[sentenceIdx].text = newText;
    onChangeBlocks(updated);
  };

  // Update check result
  const handleCheckResultChange = (
    sentenceIdx: number,
    result: SentenceCheckResult | null
  ) => {
    const updated = [...blocks];
    updated[safeIndex].sentences[sentenceIdx].checkResult = result;
    onChangeBlocks(updated);
  };

  // Update paraphrase result
  const handleParaphraseResultChange = (
    sentenceIdx: number,
    result: SentenceParaphraseResult | null
  ) => {
    const updated = [...blocks];
    updated[safeIndex].sentences[sentenceIdx].paraphraseResult = result;
    onChangeBlocks(updated);
  };

  // Move sentence up
  const handleMoveUp = (sentenceIdx: number) => {
    if (sentenceIdx <= 0) return;
    const updated = [...blocks];
    const list = updated[safeIndex].sentences;
    const temp = list[sentenceIdx];
    list[sentenceIdx] = list[sentenceIdx - 1];
    list[sentenceIdx - 1] = temp;
    onChangeBlocks(updated);
  };

  // Move sentence down
  const handleMoveDown = (sentenceIdx: number) => {
    const updated = [...blocks];
    const list = updated[safeIndex].sentences;
    if (sentenceIdx >= list.length - 1) return;
    const temp = list[sentenceIdx];
    list[sentenceIdx] = list[sentenceIdx + 1];
    list[sentenceIdx + 1] = temp;
    onChangeBlocks(updated);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. TOP BLOCK SWITCHER NAVIGATION BUTTONS */}
      <div className="p-1.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-1.5 shadow-inner">
        {blocks.map((block, idx) => {
          const isSelected = safeIndex === idx;
          const writtenCount = block.sentences.filter((s) => s.text.trim().length > 0).length;
          const isDone = writtenCount > 0 && writtenCount >= block.sentences.length;

          return (
            <button
              key={block.id}
              type="button"
              onClick={() => setActiveBlockIndex(idx)}
              className={`p-2.5 rounded-xl text-left transition flex items-center justify-between gap-1.5 ${
                isSelected
                  ? 'bg-white dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 font-extrabold shadow-sm border border-emerald-500/40 ring-2 ring-emerald-500/20'
                  : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/40 font-semibold'
              }`}
            >
              <div className="truncate">
                <span className="text-[11px] block opacity-60">Khối {idx + 1}</span>
                <span className="text-xs truncate">{getBlockShortName(block)}</span>
              </div>

              {isDone ? (
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">
                  ✓
                </span>
              ) : (
                <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-zinc-800 text-gray-500 shrink-0 font-medium">
                  {writtenCount}/{block.sentences.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. ONLY THE ACTIVE BLOCK IS OPEN (FOCUS MODE) */}
      <div className="p-5 sm:p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm space-y-4">
        {/* Active Block Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                {activeBlock.title}
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Đang viết ({activeBlock.sentences.length} câu)
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
              {activeBlock.descriptionVi}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* Master Toggle for Writing Hints */}
            <button
              type="button"
              onClick={handleToggleHints}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-zinc-300 transition cursor-pointer"
              title={showAllHints ? 'Ẩn tất cả gợi ý viết' : 'Hiện tất cả gợi ý viết'}
            >
              {showAllHints ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Gợi ý: Bật</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                  <span>Gợi ý: Tắt</span>
                </>
              )}
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Lộ trình AI: {activeBlock.sentences.length} câu</span>
            </span>
          </div>
        </div>

        {/* Sentence Cards Inside Active Block */}
        <div className="space-y-3 pt-1">
          {activeBlock.sentences.map((sentence, sIdx) => {
            const previousSentences = activeBlock.sentences
              .slice(0, sIdx)
              .map((s) => s.text)
              .filter((t) => t.trim().length > 0);

            return (
              <SentenceInputCard
                key={sentence.id}
                sentence={sentence}
                sentenceIndex={sIdx}
                totalSentencesInBlock={activeBlock.sentences.length}
                blockId={activeBlock.id}
                taskType={taskType}
                promptQuestion={promptQuestion}
                targetBand={targetBand}
                previousSentences={previousSentences}
                globalShowHint={showAllHints}
                onChangeText={(text) => handleSentenceTextChange(sIdx, text)}
                onUpdateCheckResult={(res) => handleCheckResultChange(sIdx, res)}
                onUpdateParaphraseResult={(res) => handleParaphraseResultChange(sIdx, res)}
                onMoveUp={() => handleMoveUp(sIdx)}
                onMoveDown={() => handleMoveDown(sIdx)}
              />
            );
          })}
        </div>

        {/* 3. BOTTOM BLOCK NAVIGATION CONTROLS */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
          {safeIndex > 0 ? (
            <button
              type="button"
              onClick={() => setActiveBlockIndex(safeIndex - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-bold text-gray-700 dark:text-zinc-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại: {getBlockShortName(blocks[safeIndex - 1])}</span>
            </button>
          ) : (
            <div />
          )}

          {safeIndex < blocks.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveBlockIndex(safeIndex + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
            >
              <span>Tiếp tục: {getBlockShortName(blocks[safeIndex + 1])}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã hoàn tất toàn bộ các khối</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
