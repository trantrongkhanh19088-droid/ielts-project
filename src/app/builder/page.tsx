'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  BuilderBlock,
  BuilderState,
  BuilderTargetBand,
} from '@/types';
import {
  loadBuilderState,
  saveBuilderState,
  generateBeanstalkTree,
  resetCurrentTreeState,
  completeNodeInState,
} from '@/lib/builder';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import BuilderConfigModal from '@/components/builder/BuilderConfigModal';
import DailyPacingWidget from '@/components/builder/DailyPacingWidget';
import BeanstalkMap from '@/components/builder/BeanstalkMap';
import WritingWorkspace from '@/components/builder/Workspace/WritingWorkspace';
import { Sprout, Sparkles, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

function BuilderMainContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [state, setState] = useState<BuilderState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Active workspace node navigation
  const [activeNode, setActiveNode] = useState<{
    levelNumber: number;
    taskType: 'task1' | 'task2';
  } | null>(null);

  // Check user authentication and load builder state
  useEffect(() => {
    let isMounted = true;

    const checkAuthAndState = async () => {
      let authed = false;
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              authed = true;
            }
          } catch {}
        }
      } else {
        const local = localStorage.getItem('cd_ielts_local_user');
        if (local) {
          authed = true;
        }
      }

      if (!isMounted) return;
      setIsAuthenticated(authed);

      if (authed) {
        const saved = loadBuilderState();
        if (saved && saved.config && saved.levels && saved.levels.length > 0) {
          setState(saved);
        } else {
          setIsConfigModalOpen(true);
        }
      }
      setIsLoaded(true);
    };

    checkAuthAndState();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle new tree generation
  const handleConfirmConfig = (config: {
    targetBand: BuilderTargetBand;
    studyDays: number;
    totalLevels: number;
    weaknessPrompt?: string;
    targetedWeaknesses?: string[];
    coachAdvice?: string;
    customTask1Ids?: string[];
    customTask2Ids?: string[];
  }) => {
    const newState = generateBeanstalkTree(
      config.totalLevels,
      config.targetBand,
      config.studyDays,
      {
        weaknessPrompt: config.weaknessPrompt,
        targetedWeaknesses: config.targetedWeaknesses,
        coachAdvice: config.coachAdvice,
        customTask1Ids: config.customTask1Ids,
        customTask2Ids: config.customTask2Ids,
      }
    );
    setState(newState);
    saveBuilderState(newState);
    setIsConfigModalOpen(false);
    setActiveNode(null);
  };

  // Handle reset current tree
  const handleResetCurrentTree = () => {
    if (!state) return;
    const resetState = resetCurrentTreeState(state);
    setState(resetState);
    setActiveNode(null);
  };

  // Handle node selection from beanstalk
  const handleSelectNode = (levelNumber: number, taskType: 'task1' | 'task2') => {
    setActiveNode({ levelNumber, taskType });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update blocks in active node
  const handleUpdateBlocks = (updatedBlocks: BuilderBlock[]) => {
    if (!state || !activeNode) return;
    const { levelNumber, taskType } = activeNode;

    const updatedLevels = state.levels.map((lvl) => {
      if (lvl.levelNumber === levelNumber) {
        if (taskType === 'task1') {
          return {
            ...lvl,
            task1Node: {
              ...lvl.task1Node,
              blocks: updatedBlocks,
            },
          };
        } else {
          return {
            ...lvl,
            task2Node: {
              ...lvl.task2Node,
              blocks: updatedBlocks,
            },
          };
        }
      }
      return lvl;
    });

    const newState = {
      ...state,
      levels: updatedLevels,
    };
    setState(newState);
    saveBuilderState(newState);
  };

  // Save MCQ answers
  const handleSaveMCQAnswers = (answers: Record<number, number>) => {
    if (!state || !activeNode) return;
    const { levelNumber, taskType } = activeNode;

    const updatedLevels = state.levels.map((lvl) => {
      if (lvl.levelNumber === levelNumber) {
        if (taskType === 'task1') {
          return {
            ...lvl,
            task1Node: {
              ...lvl.task1Node,
              mcqAnswers: answers,
            },
          };
        } else {
          return {
            ...lvl,
            task2Node: {
              ...lvl.task2Node,
              mcqAnswers: answers,
            },
          };
        }
      }
      return lvl;
    });

    const newState = {
      ...state,
      levels: updatedLevels,
    };
    setState(newState);
    saveBuilderState(newState);
  };

  // Complete node
  const handleCompleteNode = (
    assembledWordCount: number,
    gradingResult?: any,
    recordId?: string
  ) => {
    if (!state || !activeNode) return;
    const { levelNumber, taskType } = activeNode;

    const updatedState = completeNodeInState(
      state,
      levelNumber,
      taskType,
      assembledWordCount,
      gradingResult,
      recordId
    );
    setState(updatedState);
  };

  if (!isLoaded || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-carbon">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-vermilion border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-carbon-muted dark:text-paper-muted uppercase tracking-wider">
            00 // Đang kiểm tra tài khoản thí sinh...
          </p>
        </div>
      </div>
    );
  }

  // Authentication Guard: Writing Builder requires user account
  if (isAuthenticated === false) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 py-16 bg-paper dark:bg-carbon">
        <div className="max-w-xl w-full hairline-border bg-paper-subtle dark:bg-carbon-subtle p-8 sm:p-10 space-y-8 text-center shadow-xs">
          {/* Header Mark */}
          <div className="inline-flex items-center justify-center">
            <div className="w-14 h-14 hairline-border bg-paper dark:bg-carbon text-vermilion flex items-center justify-center">
              <Lock className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 hairline-border bg-paper dark:bg-carbon text-[11px] font-mono tracking-wider text-vermilion uppercase">
              <span>00 // YÊU CẦU ĐĂNG NHẬP</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-normal text-carbon dark:text-paper leading-snug">
              Phòng Luyện Câu Writing Builder
            </h2>
            <p className="font-sans text-xs sm:text-sm text-carbon-muted dark:text-paper-muted max-w-[50ch] mx-auto leading-relaxed">
              Tính năng Writing Builder lưu trữ tiến trình theo cấu trúc Cây Đậu (Beanstalk Tree) và đồng bộ từng đơn vị câu qua AI. Vui lòng đăng nhập để bắt đầu.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-1.5">
              <div className="font-mono text-[11px] tracking-wider text-vermilion">
                01 // PHÂN RÃ CÂU
              </div>
              <div className="text-carbon dark:text-paper font-semibold text-xs flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-vermilion" />
                <span>Cây Đậu Học Tập</span>
              </div>
              <p className="text-[11px] text-carbon-muted dark:text-paper-muted leading-relaxed">
                Chia nhỏ bài essay thành 4-5 câu trọng tâm theo từng nấc thang band điểm.
              </p>
            </div>

            <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-1.5">
              <div className="font-mono text-[11px] tracking-wider text-vermilion">
                02 // ĐỐI CHIẾU AI
              </div>
              <div className="text-carbon dark:text-paper font-semibold text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-vermilion" />
                <span>Rà Lỗi &amp; Nâng Cấp</span>
              </div>
              <p className="text-[11px] text-carbon-muted dark:text-paper-muted leading-relaxed">
                Phát hiện lỗi ngữ pháp tức thì và gợi ý các cấu trúc diễn đạt tự nhiên hơn.
              </p>
            </div>

            <div className="hairline-border p-4 bg-paper dark:bg-carbon space-y-1.5">
              <div className="font-mono text-[11px] tracking-wider text-vermilion">
                03 // LƯU TRỮ
              </div>
              <div className="text-carbon dark:text-paper font-semibold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-vermilion" />
                <span>Bảo Toàn Tiến Trình</span>
              </div>
              <p className="text-[11px] text-carbon-muted dark:text-paper-muted leading-relaxed">
                Bảo lưu lịch sử luyện viết, bài hoàn thành và từ vựng tích lũy trên Cloud.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <Link
              href="/auth?redirect=/builder"
              className="w-full py-3.5 px-6 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Đăng nhập / Tạo tài khoản để bắt đầu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 hairline-border bg-transparent hover:bg-paper-subtle dark:hover:bg-carbon-subtle text-carbon-muted dark:text-paper-muted hover:text-carbon dark:hover:text-paper font-mono text-[11px] tracking-wider transition-colors block text-center uppercase"
            >
              ← Quay về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Workspace View
  if (activeNode && state && state.config) {
    const currentLevel = state.levels.find((l) => l.levelNumber === activeNode.levelNumber);
    const currentNode =
      activeNode.taskType === 'task1' ? currentLevel?.task1Node : currentLevel?.task2Node;

    if (currentNode) {
      return (
        <WritingWorkspace
          levelNumber={activeNode.levelNumber}
          taskType={activeNode.taskType}
          targetBand={state.config.targetBand}
          node={currentNode}
          onBackToTree={() => setActiveNode(null)}
          onUpdateBlocks={handleUpdateBlocks}
          onSaveMCQAnswers={handleSaveMCQAnswers}
          onCompleteNode={handleCompleteNode}
        />
      );
    }
  }

  // Beanstalk Map View
  return (
    <div className="min-h-screen bg-paper dark:bg-carbon flex flex-col">
      {state && state.config ? (
        <>
          {/* Smart Pacing Tracker Widget */}
          <DailyPacingWidget
            config={state.config}
            levels={state.levels}
            dailyTracker={state.dailyTracker}
            onResetTree={handleResetCurrentTree}
            onGenerateNewTree={() => setIsConfigModalOpen(true)}
          />

          {/* Dynamic N-Level Beanstalk Map */}
          <div className="flex-1 w-full overflow-x-hidden">
            <BeanstalkMap levels={state.levels} onSelectNode={handleSelectNode} config={state.config} />
          </div>
        </>
      ) : (
        /* Empty / Initial State */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
          <div className="w-14 h-14 hairline-border bg-paper-subtle dark:bg-carbon-subtle text-vermilion flex items-center justify-center">
            <Sprout className="w-7 h-7 stroke-[1.75]" />
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs tracking-wider text-vermilion uppercase">
              00 // KHỞI TẠO CÂY ĐẬU
            </div>
            <h2 className="font-display font-bold text-2xl text-carbon dark:text-paper tracking-normal leading-snug">
              Chưa có Lộ trình Cây Đậu nào được gieo
            </h2>
            <p className="font-sans text-xs text-carbon-muted dark:text-paper-muted max-w-[45ch] mx-auto leading-relaxed">
              Thiết lập Band điểm mục tiêu và thời hạn luyện thi để hệ thống bốc ngẫu nhiên bộ đề và gieo mầm Cây Đậu học tập.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsConfigModalOpen(true)}
            className="px-6 py-3.5 hairline-border bg-carbon dark:bg-paper text-paper dark:text-carbon hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Bắt đầu Thiết Lập Cây Đậu →
          </button>
        </div>
      )}

      {/* Onboarding & Config Modal */}
      <BuilderConfigModal
        isOpen={isConfigModalOpen}
        onClose={state && state.config ? () => setIsConfigModalOpen(false) : undefined}
        onConfirm={handleConfirmConfig}
        isInitialSetup={!state || !state.config}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Đang tải Writing Builder...</p>
          </div>
        </div>
      }
    >
      <BuilderMainContent />
    </Suspense>
  );
}
