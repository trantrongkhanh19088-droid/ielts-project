'use client';

import React from 'react';
import { Plus, BookOpen, Layers } from 'lucide-react';
import {
  BuilderBlock,
  BuilderTargetBand,
  SentenceCheckResult,
  SentenceParaphraseResult,
} from '@/types';
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
  // Update single sentence text
  const handleSentenceTextChange = (blockIdx: number, sentenceIdx: number, newText: string) => {
    const updated = [...blocks];
    updated[blockIdx].sentences[sentenceIdx].text = newText;
    onChangeBlocks(updated);
  };

  // Update check result
  const handleCheckResultChange = (
    blockIdx: number,
    sentenceIdx: number,
    result: SentenceCheckResult | null
  ) => {
    const updated = [...blocks];
    updated[blockIdx].sentences[sentenceIdx].checkResult = result;
    onChangeBlocks(updated);
  };

  // Update paraphrase result
  const handleParaphraseResultChange = (
    blockIdx: number,
    sentenceIdx: number,
    result: SentenceParaphraseResult | null
  ) => {
    const updated = [...blocks];
    updated[blockIdx].sentences[sentenceIdx].paraphraseResult = result;
    onChangeBlocks(updated);
  };

  // Add new sentence to block
  const handleAddSentence = (blockIdx: number) => {
    const updated = [...blocks];
    const currentBlock = updated[blockIdx];
    const newIdx = currentBlock.sentences.length + 1;
    const newId = `${currentBlock.id}_extra_${Date.now()}`;

    currentBlock.sentences.push({
      id: newId,
      text: '',
      placeholderHint: `Câu ${newIdx}: Viết tiếp ý bổ trợ cho đoạn ${currentBlock.title}...`,
    });

    onChangeBlocks(updated);
  };

  // Delete sentence
  const handleDeleteSentence = (blockIdx: number, sentenceIdx: number) => {
    const updated = [...blocks];
    updated[blockIdx].sentences.splice(sentenceIdx, 1);
    onChangeBlocks(updated);
  };

  // Reorder sentences: move up
  const handleMoveUp = (blockIdx: number, sentenceIdx: number) => {
    if (sentenceIdx <= 0) return;
    const updated = [...blocks];
    const list = updated[blockIdx].sentences;
    const temp = list[sentenceIdx];
    list[sentenceIdx] = list[sentenceIdx - 1];
    list[sentenceIdx - 1] = temp;
    onChangeBlocks(updated);
  };

  // Reorder sentences: move down
  const handleMoveDown = (blockIdx: number, sentenceIdx: number) => {
    const updated = [...blocks];
    const list = updated[blockIdx].sentences;
    if (sentenceIdx >= list.length - 1) return;
    const temp = list[sentenceIdx];
    list[sentenceIdx] = list[sentenceIdx + 1];
    list[sentenceIdx + 1] = temp;
    onChangeBlocks(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {blocks.map((block, blockIdx) => {
        // Collect all previous sentences in this block for context
        return (
          <div
            key={block.id}
            className="p-5 sm:p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40 shadow-xs space-y-4"
          >
            {/* Block Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-zinc-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                    {block.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
                    {block.sentences.length} câu
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                  {block.descriptionVi}
                </p>
              </div>

              {/* Add sentence button in header for convenience */}
              <button
                type="button"
                onClick={() => handleAddSentence(blockIdx)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 hover:border-emerald-500 text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:text-emerald-600 transition shrink-0 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Thêm câu</span>
              </button>
            </div>

            {/* List of Sentence Input Cards */}
            <div className="space-y-3">
              {block.sentences.map((sentence, sIdx) => {
                const previousSentences = block.sentences
                  .slice(0, sIdx)
                  .map((s) => s.text)
                  .filter((t) => t.trim().length > 0);

                return (
                  <SentenceInputCard
                    key={sentence.id}
                    sentence={sentence}
                    sentenceIndex={sIdx}
                    totalSentencesInBlock={block.sentences.length}
                    blockId={block.id}
                    taskType={taskType}
                    promptQuestion={promptQuestion}
                    targetBand={targetBand}
                    previousSentences={previousSentences}
                    onChangeText={(text) => handleSentenceTextChange(blockIdx, sIdx, text)}
                    onUpdateCheckResult={(res) => handleCheckResultChange(blockIdx, sIdx, res)}
                    onUpdateParaphraseResult={(res) => handleParaphraseResultChange(blockIdx, sIdx, res)}
                    onMoveUp={() => handleMoveUp(blockIdx, sIdx)}
                    onMoveDown={() => handleMoveDown(blockIdx, sIdx)}
                    onDelete={() => handleDeleteSentence(blockIdx, sIdx)}
                  />
                );
              })}
            </div>

            {/* Bottom Add Sentence Button */}
            <button
              type="button"
              onClick={() => handleAddSentence(blockIdx)}
              className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>Thêm câu văn tiếp theo vào {block.title}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
