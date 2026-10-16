'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  GradingResult,
} from '@/types';
import { getPromptById } from '@/lib/data/seed-prompts';
import { getInteractiveMCQsForPrompt, assembleFullEssayFromBlocks } from '@/lib/builder';
import { saveEssayRecord } from '@/lib/storage';
import InteractiveMCQPane from './InteractiveMCQPane';
import BlockEditor from './BlockEditor';
import LiveEssayPreview from './LiveEssayPreview';
import ConfettiCelebration from '../ConfettiCelebration';
import BuilderGradingResultModal from '../BuilderGradingResultModal';
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
  onCompleteNode: (
    assembledWordCount: number,
    gradingResult?: GradingResult,
    recordId?: string
  ) => void;
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

  // AI Grading states
  const [sessionToken, setSessionToken] = useState<string>('');
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [activeGradingResult, setActiveGradingResult] = useState<GradingResult | null>(
    node.gradingResult || null
  );
  const [isGradingModalOpen, setIsGradingModalOpen] = useState<boolean>(false);
  const [savedRecordId, setSavedRecordId] = useState<string | undefined>(node.recordId);

  // Initialize exam session token on mount
  useEffect(() => {
    let isMounted = true;
    const initSession = async () => {
      try {
        const res = await fetch(`/api/exam/session?taskType=${taskType}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.token) {
            setSessionToken(data.token);
          }
        }
      } catch (err) {
        console.error('Failed to get session token for builder', err);
      }
    };
    initSession();
    return () => {
      isMounted = false;
    };
  }, [taskType]);

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

  // Handle AI Grading Execution
  const handleGradeEssay = async (fullEssay: string) => {
    setIsGrading(true);
    setIsGradingModalOpen(true);

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType,
          promptText: prompt.question,
          chartDataOrDescription: prompt.chartDescription,
          imageBase64: undefined,
          essayContent: fullEssay,
          sessionToken: sessionToken || undefined,
          securityTrap: '',
          telemetry: {
            keystrokes: 150,
            mouseEvents: 60,
            focusSeconds: 90,
            humanProofSolved: true,
            isBuilder: true,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi khi gọi AI chấm bài.');
      }

      const result: GradingResult = await res.json();
      result.taskType = taskType;
      result.promptTitle = `[Cây Đậu Tầng ${levelNumber}] ${prompt.title}`;
      result.promptText = prompt.question;
      result.userEssay = fullEssay;
      result.wordCount = wordCount;

      setActiveGradingResult(result);

      // Save to official user essay history
      let recId = '';
      try {
        const rec = await saveEssayRecord({
          task_type: taskType,
          prompt_title: `[Cây Đậu Tầng ${levelNumber}] ${prompt.title}`,
          prompt_text: prompt.question,
          chart_image_url: prompt.imageUrl || undefined,
          essay_content: fullEssay,
          word_count: wordCount,
          duration_seconds: 90,
          overall_band: result.overallBand,
          tr_score: result.criteria.taskAchievementOrResponse.score,
          cc_score: result.criteria.coherenceCohesion.score,
          lr_score: result.criteria.lexicalResource.score,
          gra_score: result.criteria.grammaticalRange.score,
          ai_feedback_json: result,
        });
        recId = rec.id;
        setSavedRecordId(recId);
      } catch (saveErr) {
        console.error('Failed to save essay record from builder', saveErr);
      }

      onCompleteNode(wordCount, result, recId);
    } catch (err: any) {
      const is503 =
        err.message?.includes('503') ||
        err.message?.includes('quá tải') ||
        err.message?.includes('High Demand') ||
        err.message?.includes('Service Unavailable');

      alert(
        is503
          ? 'Máy chủ chấm bài Google AI hiện đang có lượng truy cập tăng đột biến tạm thời (503 Service Unavailable). Bài viết của bạn đã được giữ an toàn, vui lòng đợi 5 - 10 giây và bấm nộp lại nhé!'
          : `Chấm bài thất bại: ${err.message || 'Lỗi kết nối'}`
      );
      setIsGradingModalOpen(false);
    } finally {
      setIsGrading(false);
    }
  };

  // Handle Quick Complete without grading
  const handleQuickComplete = () => {
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
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      Đã viết {wordCount} / {minWords} từ tối thiểu
                    </span>
                    {activeGradingResult && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] font-mono">
                        ⭐ Band {activeGradingResult.overallBand.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 block">
                    Xem trước toàn bài để nộp cho Giám khảo AI chấm điểm theo 4 tiêu chí chuẩn IELTS.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setRightViewMode('preview')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shrink-0 shadow-md shadow-emerald-600/20 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Xem Toàn Văn &amp; Chấm Điểm</span>
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
                isSubmitting={isGrading}
                existingGradingResult={activeGradingResult}
                onGradeEssay={handleGradeEssay}
                onCompleteWithoutGrading={handleQuickComplete}
                onViewGradingResult={() => setIsGradingModalOpen(true)}
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

      {/* Builder AI Grading Result Modal */}
      <BuilderGradingResultModal
        isOpen={isGradingModalOpen}
        onClose={() => setIsGradingModalOpen(false)}
        gradingResult={activeGradingResult}
        isLoading={isGrading}
        levelNumber={levelNumber}
        taskType={taskType}
        targetBand={targetBand}
        onContinueNextLevel={() => {
          setIsGradingModalOpen(false);
          onBackToTree();
        }}
        recordId={savedRecordId}
      />

      {/* Celebration Modal on Quick Complete */}
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
