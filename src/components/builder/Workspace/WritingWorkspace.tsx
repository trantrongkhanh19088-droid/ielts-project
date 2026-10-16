'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  PenTool,
  BarChart3,
  Sparkles,
  Maximize2,
  FileText,
  Save,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  BuilderBlock,
  BuilderLevel,
  BuilderNode,
  BuilderTargetBand,
  PromptSeed,
} from '@/types';
import { getPromptById } from '@/lib/data/seed-prompts';
import { getInteractiveMCQsForPrompt, assembleFullEssayFromBlocks } from '@/lib/builder';
import InteractiveMCQPane from './InteractiveMCQPane';
import BlockEditor from './BlockEditor';
import LiveEssayPreview from './LiveEssayPreview';
import ConfettiCelebration from '../ConfettiCelebration';
import Task1LineChart from '@/components/charts/Task1LineChart';
import Task1BarChart from '@/components/charts/Task1BarChart';
import Task1PieChart from '@/components/charts/Task1PieChart';
import ImageZoomModal from '@/components/exam/ImageZoomModal';

interface WritingWorkspaceProps {
  levelNumber: number;
  taskType: 'task1' | 'task2';
  targetBand: BuilderTargetBand;
  node: BuilderNode;
  onBackToTree: () => void;
  onUpdateBlocks: (blocks: BuilderBlock[]) => void;
  onSaveMCQAnswers: (answers: Record<number, number>) => void;
  onCompleteNode: (assembledWordCount: number) => void;
}

export default function WritingWorkspace({
  levelNumber,
  taskType,
  targetBand,
  node,
  onBackToTree,
  onUpdateBlocks,
  onSaveMCQAnswers,
  onCompleteNode,
}: WritingWorkspaceProps) {
  const prompt = useMemo(() => getPromptById(node.promptId), [node.promptId]);
  const mcqs = useMemo(
    () => (prompt ? getInteractiveMCQsForPrompt(prompt, targetBand) : []),
    [prompt, targetBand]
  );

  const [rightViewMode, setRightViewMode] = useState<'editor' | 'preview'>('editor');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedWordCount, setCompletedWordCount] = useState(0);

  if (!prompt) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-gray-500">Không tìm thấy thông tin đề thi.</p>
        <button
          onClick={onBackToTree}
          className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
        >
          Quay lại Cây Đậu
        </button>
      </div>
    );
  }

  const minWords = prompt.minWords || (taskType === 'task1' ? 150 : 250);
  const { wordCount } = assembleFullEssayFromBlocks(node.blocks);

  const handleCompleteSubmission = () => {
    setCompletedWordCount(wordCount);
    onCompleteNode(wordCount);
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-zinc-950 flex flex-col">
      {/* Top Workspace Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-xs">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back & Level info */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToTree}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-zinc-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Cây Đậu</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Tầng {levelNumber}
              </span>
              <span className="text-xs font-bold text-gray-900 dark:text-white hidden sm:inline">
                {taskType === 'task1' ? 'IELTS Academic Task 1' : 'IELTS Writing Task 2'}
              </span>
            </div>
          </div>

          {/* Right Column View Mode Toggle (Editor vs Preview) */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl p-1 bg-gray-100 dark:bg-zinc-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRightViewMode('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  rightViewMode === 'editor'
                    ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Viết theo Khối</span>
              </button>

              <button
                type="button"
                onClick={() => setRightViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  rightViewMode === 'preview'
                    ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem toàn văn ({wordCount} từ)</span>
              </button>
            </div>

            {/* Target Band Pill */}
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs">
              Band {targetBand}
            </span>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Layout (Left: Prompt & MCQs | Right: Block Editor Focus) */}
      <main className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PROMPT DETAILS, CHARTS/IMAGES, AND INTERACTIVE MCQs */}
        {/* ========================================================================= */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2">
          {/* Prompt Question & Details Card */}
          <div className="p-5 sm:p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  {prompt.category || (taskType === 'task1' ? 'Biểu đồ' : 'Nghị luận')}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  &bull; {prompt.timeMinutes || (taskType === 'task1' ? 20 : 40)} phút
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  &bull; Tối thiểu {minWords} từ
                </span>
              </div>

              {prompt.imageUrl && (
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 transition"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Phóng to biểu đồ</span>
                </button>
              )}
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                {prompt.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-zinc-300 mt-2 leading-relaxed">
                {prompt.question}
              </p>
            </div>

            {/* Task 1 Chart Visuals */}
            {taskType === 'task1' && (
              <div className="pt-2">
                {prompt.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 flex justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prompt.imageUrl}
                      alt={prompt.title}
                      className="max-h-72 w-auto object-contain rounded-lg cursor-pointer hover:opacity-95 transition"
                      onClick={() => setIsZoomOpen(true)}
                    />
                  </div>
                )}

                {!prompt.imageUrl && prompt.chartData && prompt.chartType === 'line' && (
                  <div className="h-64 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <Task1LineChart data={prompt.chartData} dataKeys={prompt.chartDataKeys || []} />
                  </div>
                )}

                {!prompt.imageUrl && prompt.chartData && prompt.chartType === 'bar' && (
                  <div className="h-64 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <Task1BarChart data={prompt.chartData} dataKeys={prompt.chartDataKeys || []} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Multiple-Choice Questions & Suggested Outline */}
          <div className="space-y-4">
            <InteractiveMCQPane
              prompt={prompt}
              mcqs={mcqs}
              targetBand={targetBand}
              savedAnswers={node.mcqAnswers}
              onSaveAnswers={onSaveMCQAnswers}
              onProceedToEditor={() => {
                setRightViewMode('editor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: BLOCK EDITOR FOCUS MODE & LIVE ESSAY PREVIEW */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          {rightViewMode === 'editor' ? (
            <div className="space-y-6">
              {/* Block Editor in Focus Mode (One block at a time) */}
              <BlockEditor
                blocks={node.blocks}
                taskType={taskType}
                promptQuestion={prompt.question}
                targetBand={targetBand}
                onChangeBlocks={onUpdateBlocks}
              />

              {/* Bottom Quick-Preview Banner */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    Đã viết {wordCount} / {minWords} từ tối thiểu
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Bạn có thể xem trước toàn bộ bài văn hoặc nộp bài hoàn thành tầng này bất cứ lúc nào.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setRightViewMode('preview')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shrink-0 shadow-xs transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem toàn văn &amp; Nộp</span>
                </button>
              </div>
            </div>
          ) : (
            /* Live Essay Preview Mode */
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setRightViewMode('editor')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại chế độ Soạn thảo theo Khối</span>
              </button>

              <LiveEssayPreview
                blocks={node.blocks}
                taskType={taskType}
                minWords={minWords}
                onCompleteNode={handleCompleteSubmission}
              />
            </div>
          )}
        </div>
      </main>

      {/* Image Zoom Modal */}
      {prompt.imageUrl && (
        <ImageZoomModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          imageUrl={prompt.imageUrl}
          title={prompt.title}
        />
      )}

      {/* Celebration Modal on Complete */}
      <ConfettiCelebration
        isOpen={showCelebration}
        levelNumber={levelNumber}
        taskType={taskType}
        wordCount={completedWordCount}
        targetBand={targetBand}
        onBackToTree={() => {
          setShowCelebration(false);
          onBackToTree();
        }}
        onContinue={() => {
          setShowCelebration(false);
          onBackToTree();
        }}
      />
    </div>
  );
}
