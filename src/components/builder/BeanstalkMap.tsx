'use client';

import React from 'react';
import {
  Lock,
  CheckCircle2,
  Play,
  Award,
  Sparkles,
  BarChart3,
  PenTool,
  Crown,
  Cloud,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { BuilderLevel, BuilderNode, PromptSeed } from '@/types';
import { getPromptById } from '@/lib/data/seed-prompts';

interface BeanstalkMapProps {
  levels: BuilderLevel[];
  onSelectNode: (levelNumber: number, taskType: 'task1' | 'task2') => void;
}

export default function BeanstalkMap({ levels, onSelectNode }: BeanstalkMapProps) {
  // We display levels from N down to 1 (top to bottom on screen), so level 1 is at the bottom like a real beanstalk!
  const reversedLevels = [...levels].sort((a, b) => b.levelNumber - a.levelNumber);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center select-none">
      {/* SUMMIT: CLOUD CASTLE AT LEVEL N */}
      <div className="flex flex-col items-center mb-8 relative z-10 animate-bounce duration-1000">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xl shadow-amber-500/30 flex items-center justify-center border-4 border-white dark:border-zinc-800 transform rotate-3">
            <Crown className="w-10 h-10 text-amber-900" />
          </div>
          <div className="absolute -bottom-2 -left-4 w-12 h-6 bg-white dark:bg-zinc-800 rounded-full shadow-md flex items-center justify-center border border-gray-100 dark:border-zinc-700">
            <Cloud className="w-4 h-4 text-sky-400 fill-sky-200" />
          </div>
          <div className="absolute -top-2 -right-4 w-10 h-6 bg-white dark:bg-zinc-800 rounded-full shadow-md flex items-center justify-center border border-gray-100 dark:border-zinc-700">
            <Cloud className="w-3.5 h-3.5 text-sky-400 fill-sky-200" />
          </div>
        </div>

        <div className="text-center mt-3">
          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white uppercase tracking-widest shadow-sm">
            Đỉnh Cây Đậu &bull; IELTS Band 8.0+
          </span>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
            Lâu Đài Thành Tựu (Tầng {levels.length})
          </h3>
        </div>
      </div>

      {/* BEANSTALK TRUNK & LEVELS CONTAINER */}
      <div className="relative w-full flex flex-col items-center space-y-12">
        {/* Central Winding Green Vine SVG Background */}
        <div className="absolute inset-y-0 w-16 pointer-events-none z-0 flex justify-center">
          <div className="w-4 h-full bg-gradient-to-b from-lime-400 via-emerald-500 to-emerald-700 rounded-full shadow-inner opacity-80" />
        </div>

        {reversedLevels.map((lvl, index) => {
          const t1Seed = getPromptById(lvl.task1Node.promptId);
          const t2Seed = getPromptById(lvl.task2Node.promptId);
          const isHighestLevel = lvl.levelNumber === levels.length;
          const isGroundLevel = lvl.levelNumber === 1;

          // Determine if level is currently active (has at least one available node and not all completed)
          const isLevelActive =
            (lvl.task1Node.status === 'available' || lvl.task2Node.status === 'available') &&
            !(lvl.task1Node.status === 'completed' && lvl.task2Node.status === 'completed');

          return (
            <div
              key={lvl.levelNumber}
              className="relative w-full flex items-center justify-between gap-4 sm:gap-8 z-10"
            >
              {/* LEFT BRANCH: TASK 1 */}
              <div className="flex-1 flex justify-end">
                <NodeCard
                  node={lvl.task1Node}
                  prompt={t1Seed}
                  levelNumber={lvl.levelNumber}
                  taskLabel="Task 1 (Academic)"
                  icon={<BarChart3 className="w-4 h-4 text-sky-500" />}
                  branchSide="left"
                  onSelect={() => onSelectNode(lvl.levelNumber, 'task1')}
                />
              </div>

              {/* CENTER TRUNK BADGE / LEAF */}
              <div className="relative flex flex-col items-center shrink-0 z-20">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs shadow-lg border-2 transition transform ${
                    isLevelActive
                      ? 'bg-gradient-to-tr from-emerald-500 to-lime-400 text-white border-white scale-110 ring-4 ring-emerald-400/40 animate-pulse'
                      : lvl.task1Node.status === 'completed' && lvl.task2Node.status === 'completed'
                      ? 'bg-emerald-600 text-white border-lime-300'
                      : 'bg-white dark:bg-zinc-800 text-gray-400 border-gray-300 dark:border-zinc-700'
                  }`}
                >
                  <span>L{lvl.levelNumber}</span>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mt-1 bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded-full shadow-xs">
                  Tầng {lvl.levelNumber}
                </span>
              </div>

              {/* RIGHT BRANCH: TASK 2 */}
              <div className="flex-1 flex justify-start">
                <NodeCard
                  node={lvl.task2Node}
                  prompt={t2Seed}
                  levelNumber={lvl.levelNumber}
                  taskLabel="Task 2 (Essay)"
                  icon={<PenTool className="w-4 h-4 text-emerald-500" />}
                  branchSide="right"
                  onSelect={() => onSelectNode(lvl.levelNumber, 'task2')}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ROOT BASE: SOIL AND FERTILE GROUND */}
      <div className="relative z-10 mt-12 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 text-amber-200 border border-amber-700/60 shadow-xl">
          <span className="text-xl">🌱</span>
          <span className="text-xs font-bold tracking-wide">
            Gốc Cây Đậu &bull; Vùng Đất Gieo Hạt (Tầng 1)
          </span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
          Hoàn thành các bài viết từ Tầng 1 để mở khóa các nấc thang tiếp theo và vươn tới Lâu đài IELTS Band 8.0+.
        </p>
      </div>
    </div>
  );
}

interface NodeCardProps {
  node: BuilderNode;
  prompt?: PromptSeed;
  levelNumber: number;
  taskLabel: string;
  icon: React.ReactNode;
  branchSide: 'left' | 'right';
  onSelect: () => void;
}

function NodeCard({
  node,
  prompt,
  levelNumber,
  taskLabel,
  icon,
  branchSide,
  onSelect,
}: NodeCardProps) {
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isAvailable = node.status === 'available';

  const category = prompt?.category || (node.taskType === 'task1' ? 'Biểu đồ' : 'Nghị luận');
  const title = prompt?.title || (node.taskType === 'task1' ? `Task 1 Đề ${levelNumber}` : `Task 2 Đề ${levelNumber}`);

  return (
    <div
      onClick={() => {
        if (!isLocked) onSelect();
      }}
      className={`relative w-full max-w-sm rounded-2xl p-4 border transition-all ${
        isLocked
          ? 'bg-gray-100/70 dark:bg-zinc-900/40 border-gray-200 dark:border-zinc-800 opacity-60 cursor-not-allowed'
          : isCompleted
          ? 'bg-white dark:bg-zinc-900 border-emerald-400 dark:border-emerald-700 hover:border-emerald-500 hover:shadow-lg cursor-pointer shadow-xs'
          : 'bg-white dark:bg-zinc-900 border-sky-400 dark:border-sky-500 hover:border-sky-500 ring-2 ring-sky-400/20 hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5'
      }`}
    >
      {/* Branch Connector Line (visual extension towards center trunk) */}
      <div
        className={`hidden sm:block absolute top-1/2 -translate-y-1/2 w-6 h-1 rounded-full ${
          branchSide === 'left' ? '-right-6' : '-left-6'
        } ${
          isCompleted
            ? 'bg-emerald-500'
            : isAvailable
            ? 'bg-sky-400'
            : 'bg-gray-300 dark:bg-zinc-700'
        }`}
      />

      {/* Card Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-gray-100 dark:bg-zinc-800">
            {icon}
          </div>
          <span className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">
            {taskLabel}
          </span>
        </div>

        {/* Status Pill */}
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Đã hoàn thành</span>
          </span>
        ) : isAvailable ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-[10px] font-bold border border-sky-200 dark:border-sky-800 animate-pulse">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>Đang mở &bull; Học ngay</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 text-[10px] font-bold">
            <Lock className="w-3 h-3" />
            <span>Chưa mở khóa</span>
          </span>
        )}
      </div>

      {/* Category & Title */}
      <div className="mt-2.5 space-y-1">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700 inline-block">
          {category}
        </span>
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h4>
        {prompt?.question && (
          <p className="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-2">
            {prompt.question}
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold">
        {isCompleted ? (
          <>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              {node.wordCount ? `${node.wordCount} từ đã viết` : 'Đã nộp bài'}
            </span>
            <span className="text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1 text-[11px]">
              <span>Xem lại bài</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </>
        ) : isAvailable ? (
          <>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              Hướng dẫn viết từng câu
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] shadow-xs">
              <span>Vào học</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </>
        ) : (
          <span className="text-[11px] text-gray-400">
            Cần hoàn thành tầng trước để mở
          </span>
        )}
      </div>
    </div>
  );
}
