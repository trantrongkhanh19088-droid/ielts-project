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
  }) => {
    const newState = generateBeanstalkTree(
      config.totalLevels,
      config.targetBand,
      config.studyDays
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-medium">Đang kiểm tra tài khoản thí sinh...</p>
        </div>
      </div>
    );
  }

  // Authentication Guard: Writing Builder requires user account
  if (isAuthenticated === false) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 py-12 bg-gradient-to-b from-emerald-50/30 via-white to-sky-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-lg w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-center">
          {/* Header Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[11px] font-extrabold">
              <span>Yêu cầu đăng nhập tài khoản thí sinh</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Phòng Luyện Câu Writing Builder
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Tính năng Writing Builder đòi hỏi lưu trữ tiến trình Cây Đậu (Beanstalk Tree) và đồng bộ câu viết qua AI. Vui lòng tạo tài khoản hoặc đăng nhập để bắt đầu.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800 space-y-1">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <Sprout className="w-4 h-4" />
                <span>Cây Đậu Học Tập</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-normal">
                Chia nhỏ bài essay thành 4-5 câu trọng tâm theo từng cấp độ.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800 space-y-1">
              <div className="text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>AI Rà Lỗi &amp; Gợi Ý</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-normal">
                Sửa ngữ pháp tức thì và gợi ý Paraphrase nâng band điểm.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800 space-y-1">
              <div className="text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Lưu Trữ Cá Nhân</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-normal">
                Bảo toàn lịch sử luyện viết và từ vựng tích lũy trên tài khoản.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <Link
              href="/auth?redirect=/builder"
              className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Đăng nhập / Tạo tài khoản để bắt đầu</span>
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-2xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 font-semibold text-xs transition block text-center"
            >
              Quay về Trang chủ
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-emerald-50/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col">
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
            <BeanstalkMap levels={state.levels} onSelectNode={handleSelectNode} />
          </div>
        </>
      ) : (
        /* Empty / Initial State */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <Sprout className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Chưa có Lộ trình Cây Đậu nào được gieo
          </h2>
          <p className="text-xs text-gray-500 max-w-sm">
            Hãy thiết lập Band điểm mục tiêu và số ngày học để hệ thống bốc ngẫu nhiên bộ đề và gieo mầm Cây Đậu học tập cho bạn.
          </p>
          <button
            type="button"
            onClick={() => setIsConfigModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition"
          >
            Bắt đầu Thiết Lập Cây Đậu
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
