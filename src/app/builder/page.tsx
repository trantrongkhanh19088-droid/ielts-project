'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
import BuilderConfigModal from '@/components/builder/BuilderConfigModal';
import DailyPacingWidget from '@/components/builder/DailyPacingWidget';
import BeanstalkMap from '@/components/builder/BeanstalkMap';
import WritingWorkspace from '@/components/builder/Workspace/WritingWorkspace';
import { Sprout, Sparkles } from 'lucide-react';

function BuilderMainContent() {
  const [state, setState] = useState<BuilderState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Active workspace node navigation
  const [activeNode, setActiveNode] = useState<{
    levelNumber: number;
    taskType: 'task1' | 'task2';
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadBuilderState();
    if (saved && saved.config && saved.levels && saved.levels.length > 0) {
      setState(saved);
    } else {
      setIsConfigModalOpen(true);
    }
    setIsLoaded(true);
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
  const handleCompleteNode = (assembledWordCount: number) => {
    if (!state || !activeNode) return;
    const { levelNumber, taskType } = activeNode;

    const updatedState = completeNodeInState(state, levelNumber, taskType, assembledWordCount);
    setState(updatedState);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-medium">Đang chuẩn bị Cây Đậu Writing Builder...</p>
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
