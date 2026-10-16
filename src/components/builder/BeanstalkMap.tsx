'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Sparkles,
  BarChart3,
  PenTool,
  Crown,
  Cloud,
  ChevronRight,
  ArrowRight,
  Compass,
  Trophy,
  Star,
  Sprout,
  Check,
  Zap,
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
  const currentLevelRef = useRef<HTMLDivElement | null>(null);
  const [isCurrentLevelVisible, setIsCurrentLevelVisible] = useState(false);

  // Find the lowest active level (the current climbing front)
  const currentActiveLevel = levels.find((lvl) => {
    return (
      (lvl.task1Node.status === 'available' || lvl.task2Node.status === 'available') &&
      !(lvl.task1Node.status === 'completed' && lvl.task2Node.status === 'completed')
    );
  }) || levels[0];

  // Observer to track whether the active climbing level is in user's viewport
  useEffect(() => {
    const el = currentLevelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCurrentLevelVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [currentActiveLevel?.levelNumber]);

  const scrollToCurrentLevel = () => {
    if (currentLevelRef.current) {
      currentLevelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col items-center select-none overflow-hidden">
      {/* BACKGROUND FLOATING CLOUDS & SKY PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20 z-0">
        <div className="absolute top-10 left-8 animate-pulse duration-1000">
          <Cloud className="w-28 h-28 text-sky-200 fill-sky-100" />
        </div>
        <div className="absolute top-36 right-12 animate-pulse duration-700">
          <Cloud className="w-36 h-36 text-sky-200 fill-sky-100" />
        </div>
        <div className="absolute top-[45%] left-4">
          <Cloud className="w-24 h-24 text-emerald-100 fill-emerald-50" />
        </div>
        <div className="absolute top-[70%] right-6">
          <Cloud className="w-32 h-32 text-emerald-100 fill-emerald-50" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUMMIT: THE GOLDEN CLOUD CASTLE AT LEVEL N */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center pt-4 mb-10 relative z-10 text-center">
        {/* Castle Visual Container */}
        <div className="relative group">
          {/* Glowing Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/40 via-yellow-300/40 to-orange-400/40 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition animate-pulse" />

          {/* Castle Badge Icon */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-2xl shadow-amber-500/40 flex items-center justify-center border-4 border-white dark:border-zinc-800 transform hover:scale-105 transition duration-300">
            <div className="relative flex flex-col items-center">
              <Crown className="w-12 h-12 sm:w-14 sm:h-14 text-amber-950 fill-amber-400 drop-shadow-sm animate-bounce" />
              <div className="flex items-center gap-1 -mt-1">
                <Star className="w-3 h-3 text-amber-900 fill-amber-900" />
                <Star className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                <Star className="w-3 h-3 text-amber-900 fill-amber-900" />
              </div>
            </div>
          </div>

          {/* Floating Clouds flanking the castle */}
          <div className="absolute -bottom-3 -left-8 w-16 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center border border-sky-100 dark:border-zinc-700 animate-pulse">
            <Cloud className="w-5 h-5 text-sky-400 fill-sky-200" />
          </div>
          <div className="absolute -top-3 -right-8 w-14 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center border border-sky-100 dark:border-zinc-700 animate-pulse">
            <Cloud className="w-4 h-4 text-sky-400 fill-sky-200" />
          </div>
        </div>

        {/* Summit Description */}
        <div className="mt-4 space-y-1 max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-[11px] font-black uppercase tracking-widest shadow-md">
            <Trophy className="w-3.5 h-3.5" />
            <span>Đỉnh Mây &bull; Lâu Đài IELTS Band 8.0+</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
            Chặng Cuối: Tầng {levels.length} (Về Đích)
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Vượt qua toàn bộ các thử thách Task 1 và Task 2 để chinh phục đỉnh cao viết học thuật!
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN BEANSTALK MAP CONTAINER WITH WINDING TRUNK */}
      {/* ========================================================================= */}
      <div className="relative w-full flex flex-col items-center">
        {/* Central Winding Beanstalk Trunk (Twisting double vines with organic leaves) */}
        <div className="absolute inset-y-0 w-24 pointer-events-none z-0 flex justify-center">
          {/* Main green trunk column */}
          <div className="w-5 h-full bg-gradient-to-b from-lime-400 via-emerald-500 to-emerald-700 rounded-full shadow-lg shadow-emerald-600/30 opacity-90 relative">
            {/* Lighter spiraling vine overlay */}
            <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.25)_20px,rgba(255,255,255,0.25)_40px)] rounded-full" />
          </div>
        </div>

        {/* Levels loop from N down to 1 */}
        <div className="w-full space-y-12 sm:space-y-16 py-4">
          {reversedLevels.map((lvl) => {
            const t1Seed = getPromptById(lvl.task1Node.promptId);
            const t2Seed = getPromptById(lvl.task2Node.promptId);
            const isCurrentClimbingPoint = lvl.levelNumber === currentActiveLevel?.levelNumber;
            const isLevelFullyCompleted =
              lvl.task1Node.status === 'completed' && lvl.task2Node.status === 'completed';

            return (
              <div
                key={lvl.levelNumber}
                ref={isCurrentClimbingPoint ? currentLevelRef : undefined}
                className="relative w-full flex items-center justify-between gap-3 sm:gap-8 z-10"
              >
                {/* ------------------------------------------------------------- */}
                {/* LEFT BRANCH: TASK 1 (Academic Charts & Data)                  */}
                {/* ------------------------------------------------------------- */}
                <div className="flex-1 flex justify-end">
                  <GamifiedNodeCard
                    node={lvl.task1Node}
                    prompt={t1Seed}
                    levelNumber={lvl.levelNumber}
                    taskLabel="Task 1 (Academic)"
                    branchSide="left"
                    onSelect={() => onSelectNode(lvl.levelNumber, 'task1')}
                  />
                </div>

                {/* ------------------------------------------------------------- */}
                {/* CENTER TRUNK HUB: LEVEL BADGE & VINE SPROUTS                  */}
                {/* ------------------------------------------------------------- */}
                <div className="relative flex flex-col items-center shrink-0 z-20">
                  {/* Decorative Sprouting Vine Leaf (Left & Right) */}
                  <span className="absolute -left-6 top-1 text-emerald-500 text-lg transform -rotate-45 pointer-events-none select-none">
                    🌿
                  </span>
                  <span className="absolute -right-6 bottom-1 text-emerald-600 text-lg transform rotate-45 pointer-events-none select-none">
                    🍃
                  </span>

                  {/* Center Node Button */}
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center font-black transition-all duration-300 shadow-xl ${
                      isLevelFullyCompleted
                        ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 text-white border-2 border-lime-300 ring-4 ring-emerald-400/30'
                        : isCurrentClimbingPoint
                        ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-lime-300 text-emerald-950 border-3 border-white scale-115 ring-4 ring-emerald-400/50 animate-pulse'
                        : 'bg-white dark:bg-zinc-800 text-gray-400 border-2 border-gray-200 dark:border-zinc-700'
                    }`}
                  >
                    {isLevelFullyCompleted ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
                    ) : (
                      <>
                        <span className="text-[10px] sm:text-xs tracking-tighter opacity-80 leading-none">
                          TẦNG
                        </span>
                        <span className="text-sm sm:text-base font-black leading-none mt-0.5">
                          {lvl.levelNumber}
                        </span>
                      </>
                    )}

                    {/* Active Golden Glow Dot */}
                    {isCurrentClimbingPoint && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-zinc-900 animate-ping" />
                    )}
                  </div>

                  {/* Level Pill Label */}
                  <div className="mt-1.5 flex flex-col items-center">
                    <span
                      className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap ${
                        isCurrentClimbingPoint
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/30'
                          : isLevelFullyCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'
                      }`}
                    >
                      {isCurrentClimbingPoint
                        ? 'Đang leo'
                        : isLevelFullyCompleted
                        ? `Hoàn thành`
                        : `Tầng ${lvl.levelNumber}`}
                    </span>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* RIGHT BRANCH: TASK 2 (Argumentative Essays)                   */}
                {/* ------------------------------------------------------------- */}
                <div className="flex-1 flex justify-start">
                  <GamifiedNodeCard
                    node={lvl.task2Node}
                    prompt={t2Seed}
                    levelNumber={lvl.levelNumber}
                    taskLabel="Task 2 (Essay)"
                    branchSide="right"
                    onSelect={() => onSelectNode(lvl.levelNumber, 'task2')}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ROOT BASE: THE FERTILE SOIL & SEED SPROUT AT LEVEL 1                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 mt-12 w-full max-w-lg mx-auto text-center">
        {/* Soil Base Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-900/90 via-amber-950 to-stone-900 text-amber-100 border-2 border-amber-800/60 shadow-2xl space-y-3 relative overflow-hidden">
          {/* Subtle underground texture lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Sprout Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-amber-800/80 border border-amber-600/50 flex items-center justify-center text-emerald-400 shadow-inner">
              <Sprout className="w-8 h-8 animate-pulse" />
            </div>

            <div className="mt-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-800/90 text-amber-300 border border-amber-700">
                Gốc Cây Đậu &bull; Vùng Đất Gieo Hạt
              </span>
              <h4 className="text-sm sm:text-base font-black text-white mt-1">
                Tầng 1: Khởi Đầu Hành Trình
              </h4>
            </div>

            <p className="text-xs text-amber-200/80 max-w-md mt-1 leading-relaxed">
              Mỗi bài viết hoàn thành là nguồn dinh dưỡng giúp thân cây đậu vươn cao qua từng tầng mây.
              Hãy bắt đầu viết từng câu tại Tầng 1 để mở khóa các tầng tiếp theo!
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUBBLE: TIẾP TỤC LEO (ONLY SHOWN WHEN CURRENT LEVEL IS NOT IN VIEW) */}
      {currentActiveLevel && (
        <div
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 transform ${
            isCurrentLevelVisible
              ? 'opacity-0 translate-y-6 pointer-events-none scale-90'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <button
            type="button"
            onClick={scrollToCurrentLevel}
            className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-extrabold shadow-2xl shadow-emerald-600/40 border-2 border-emerald-300/60 backdrop-blur-md transition-all hover:scale-105 active:scale-95 animate-bounce hover:animate-none cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span>Tiếp tục leo: Tầng {currentActiveLevel.levelNumber}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}

{/* ========================================================================= */}
{/* SUB-COMPONENT: GAMIFIED NODE CARD (TASK 1 / TASK 2)                       */}
{/* ========================================================================= */}
interface GamifiedNodeCardProps {
  node: BuilderNode;
  prompt?: PromptSeed;
  levelNumber: number;
  taskLabel: string;
  branchSide: 'left' | 'right';
  onSelect: () => void;
}

function GamifiedNodeCard({
  node,
  prompt,
  levelNumber,
  taskLabel,
  branchSide,
  onSelect,
}: GamifiedNodeCardProps) {
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isAvailable = node.status === 'available';
  const isTask1 = node.taskType === 'task1';

  const category = prompt?.category || (isTask1 ? 'Biểu đồ' : 'Nghị luận');
  const title = prompt?.title || (isTask1 ? `Task 1 Tầng ${levelNumber}` : `Task 2 Tầng ${levelNumber}`);

  return (
    <div
      onClick={() => {
        if (!isLocked) onSelect();
      }}
      className={`relative w-full max-w-[360px] sm:max-w-[420px] rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 ${
        isLocked
          ? 'bg-gray-100/70 dark:bg-zinc-900/40 border-gray-200/80 dark:border-zinc-800/80 opacity-60 cursor-not-allowed select-none'
          : isCompleted
          ? 'bg-white dark:bg-zinc-900 border-emerald-400 dark:border-emerald-700/80 hover:border-emerald-500 shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-1'
          : isTask1
          ? 'bg-white dark:bg-zinc-900 border-sky-400 dark:border-sky-500 ring-4 ring-sky-400/20 hover:ring-sky-400/40 shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-1'
          : 'bg-white dark:bg-zinc-900 border-emerald-400 dark:border-emerald-500 ring-4 ring-emerald-400/20 hover:ring-emerald-400/40 shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-1'
      }`}
    >
      {/* 1. ORGANIC VINE CONNECTOR TOWARDS CENTER TRUNK */}
      <div
        className={`hidden sm:flex items-center absolute top-1/2 -translate-y-1/2 pointer-events-none z-0 ${
          branchSide === 'left' ? '-right-8' : '-left-8'
        }`}
      >
        <div
          className={`h-2 w-8 rounded-full ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400'
              : isAvailable
              ? isTask1
                ? 'bg-gradient-to-r from-sky-400 to-emerald-400 animate-pulse'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse'
              : 'bg-gray-300 dark:bg-zinc-700'
          }`}
        />
      </div>

      {/* 2. CARD HEADER: TASK PILL & STATUS BADGE */}
      <div className="flex items-center justify-between gap-2">
        {/* Task Identity */}
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-xl flex items-center justify-center shrink-0 ${
              isTask1
                ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {isTask1 ? (
              <BarChart3 className="w-4 h-4" />
            ) : (
              <PenTool className="w-4 h-4" />
            )}
          </div>
          <div>
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                isTask1
                  ? 'text-sky-700 dark:text-sky-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {taskLabel}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Đã xong</span>
          </span>
        ) : isAvailable ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs animate-pulse">
            <Sparkles className="w-3 h-3 text-white fill-white" />
            <span>Mở &bull; Viết ngay</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 text-[10px] font-bold">
            <Lock className="w-3 h-3" />
            <span>Khóa</span>
          </span>
        )}
      </div>

      {/* 3. CATEGORY & TITLE */}
      <div className="mt-3 space-y-1.5">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 inline-block">
          {category}
        </span>
        <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h4>
        {prompt?.question && (
          <p className="text-[11px] text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {prompt.question}
          </p>
        )}
      </div>

      {/* 4. FOOTER ACTION */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold">
        {isCompleted ? (
          <>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              {node.wordCount ? `${node.wordCount} từ đã nộp` : 'Đã hoàn thành'}
            </span>
            <span className="text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1 text-[11px] font-extrabold hover:underline">
              <span>Xem lại bài</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </>
        ) : isAvailable ? (
          <>
            <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
              Hướng dẫn từng câu
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-white font-extrabold text-[11px] shadow-sm transition transform hover:scale-105 ${
                isTask1
                  ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              <span>Vào học</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </>
        ) : (
          <span className="text-[11px] text-gray-400 italic">
            Cần hoàn thành tầng trước để mở
          </span>
        )}
      </div>
    </div>
  );
}
