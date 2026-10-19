'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, ArrowRight, Sparkles } from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';

export default function DualEngineSandbox() {
  const { playClick, playChime } = useSoundEngine();
  const [activeStep, setActiveStep] = useState<number>(4);
  const [engineMode, setEngineMode] = useState<'check' | 'update'>('update');

  const steps = [
    { num: '01', title: 'Phân Tích Đề', desc: 'Xác định Topic, Task và từ khóa bẫy' },
    { num: '02', title: 'Lập Dàn Ý', desc: 'Sinh cấu trúc luận điểm & luận cứ phản biện' },
    { num: '03', title: 'Viết Từng Khối', desc: 'Ráp từng câu theo khung N Tầng chắc chắn' },
    { num: '04', title: 'AI Nâng Cấp', desc: 'Bơm Collocation C1-C2 & chuẩn hóa ngữ pháp' },
  ];

  return (
    <div className="rounded-xl bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] p-6 lg:p-8 text-stone-900 dark:text-[#F4F4F0] relative overflow-hidden shadow-sm dark:shadow-xl transition-colors duration-300">
      {/* Corner Crosshairs */}
      <span className="absolute top-2 left-2 font-mono text-[11px] text-stone-300 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute top-2 right-2 font-mono text-[11px] text-stone-300 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute bottom-2 left-2 font-mono text-[11px] text-stone-300 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>
      <span className="absolute bottom-2 right-2 font-mono text-[11px] text-stone-300 dark:text-[rgba(244,244,240,0.3)] select-none">+</span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 5-to-30 Tier Beanstalk SVG Visualizer & Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#10B981]/10 dark:bg-[#10B981]/15 border border-[#10B981]/30 dark:border-[#10B981]/40 text-[#10B981] font-mono text-[11px] font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              <span>CÂY ĐẬU N TẦNG // 5 — 30 TIERS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-stone-900 dark:text-[#F4F4F0] leading-snug">
              Kiến Trúc Hóa Bài Viết Từng Tầng Vững Chắc
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[rgba(244,244,240,0.65)] leading-relaxed">
              Không còn loay hoay trước trang giấy trắng. Xây dựng bài luận từ 5 tầng cơ bản đến 30 tầng chuyên sâu với sự giám sát của Dual AI Engine.
            </p>
          </div>

          {/* Procedural Beanstalk Growth Nodes SVG */}
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-[#090A0F]/80 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <Sprout className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-stone-900 dark:text-[#F4F4F0]">TIER PROGRESSION</div>
                <div className="text-[11px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)]">TẦNG 12 / 30 ĐÃ HOÀN THIỆN</div>
              </div>
            </div>
            <div className="font-mono text-sm font-extrabold text-[#10B981]">BAND 8.5</div>
          </div>

          {/* 4-Step Interactive Pipeline */}
          <div className="space-y-2">
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx + 1;
              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => {
                    playChime();
                    setActiveStep(idx + 1);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-stone-50 dark:bg-[#090A0F] border-[#10B981] shadow-xs'
                      : 'bg-white dark:bg-[#090A0F]/40 border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] hover:border-stone-300 dark:hover:border-[rgba(244,244,240,0.2)]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-extrabold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#10B981] text-[#090A0F]'
                        : 'bg-stone-200/70 text-stone-600 dark:bg-[rgba(244,244,240,0.1)] dark:text-[rgba(244,244,240,0.6)]'
                    }`}
                  >
                    {st.num}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-stone-900 dark:text-[#F4F4F0] flex items-center justify-between">
                      <span>{st.title}</span>
                      {isSelected && <span className="font-mono text-[10px] text-[#10B981]">ACTIVE</span>}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-[rgba(244,244,240,0.5)] mt-0.5">{st.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Dual-Engine Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-lg bg-stone-50 dark:bg-[#090A0F] border border-stone-200/90 dark:border-[rgba(244,244,240,0.1)] space-y-4 shadow-xs">
            {/* Header: Dual Engine Mode Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-[rgba(244,244,240,0.7)]">
                  DUAL-ENGINE DIFF SANDBOX
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white dark:bg-[#161821] border border-stone-200 dark:border-[rgba(244,244,240,0.1)]">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setEngineMode('check');
                  }}
                  className={`px-3 py-1 rounded font-mono text-[11px] font-bold transition-all ${
                    engineMode === 'check'
                      ? 'bg-[#FF3B1D] text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-900 dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  CHECK ENGINE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playChime();
                    setEngineMode('update');
                  }}
                  className={`px-3 py-1 rounded font-mono text-[11px] font-bold transition-all ${
                    engineMode === 'update'
                      ? 'bg-[#10B981] text-[#090A0F] shadow-sm'
                      : 'text-stone-500 hover:text-stone-900 dark:text-[rgba(244,244,240,0.6)] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  UPDATE ENGINE (C1-C2)
                </button>
              </div>
            </div>

            {/* Baseline Sentence Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
                <span>CÂU GỐC HỌC VIÊN SOẠN (BAND 6.0):</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">CẦN NÂNG CẤP</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#161821]/80 border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] font-sans text-xs text-stone-700 dark:text-[rgba(244,244,240,0.8)] leading-relaxed italic shadow-xs">
                &ldquo;More and more people use cars today, which cause traffic jam and make city polluted.&rdquo;
              </div>
            </div>

            {/* AI Engine Output Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-stone-700 dark:text-[rgba(244,244,240,0.7)] flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  {engineMode === 'check'
                    ? 'KẾT QUẢ CHECK ENGINE (SỬA LỖI & SỰ HOÀ HỢP):'
                    : 'KẾT QUẢ UPDATE ENGINE (NÂNG CẤP TỪ VỰNG C1-C2):'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    engineMode === 'check'
                      ? 'bg-[#FF3B1D]/10 dark:bg-[#FF3B1D]/15 text-[#FF3B1D] border border-[#FF3B1D]/30 dark:border-[#FF3B1D]/40'
                      : 'bg-[#10B981]/10 dark:bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 dark:border-[#10B981]/40'
                  }`}
                >
                  {engineMode === 'check' ? 'BAND 7.0 LEVEL' : 'BAND 8.5 LEVEL'}
                </span>
              </div>

              {engineMode === 'check' ? (
                /* Check Engine: Red & Green Diff */
                <div className="p-4 rounded-lg bg-white dark:bg-[#161821] border border-stone-200/90 dark:border-[rgba(244,244,240,0.12)] text-xs sm:text-sm font-sans leading-relaxed text-stone-900 dark:text-[#F4F4F0] shadow-xs">
                  More and more people use cars today, which{' '}
                  <del className="bg-[#FF3B1D]/15 text-[#FF3B1D] px-1.5 py-0.5 rounded line-through font-mono text-xs">
                    cause traffic jam
                  </del>{' '}
                  <ins className="bg-[#10B981]/15 text-[#10B981] px-1.5 py-0.5 rounded no-underline font-semibold font-mono text-xs">
                    causes severe congestion
                  </ins>{' '}
                  and{' '}
                  <del className="bg-[#FF3B1D]/15 text-[#FF3B1D] px-1.5 py-0.5 rounded line-through font-mono text-xs">
                    make city polluted
                  </del>{' '}
                  <ins className="bg-[#10B981]/15 text-[#10B981] px-1.5 py-0.5 rounded no-underline font-semibold font-mono text-xs">
                    exacerbates urban pollution
                  </ins>
                  .
                </div>
              ) : (
                /* Update Engine: Band 8.5 Collocations */
                <div className="p-4 rounded-lg bg-white dark:bg-[#161821] border border-[#10B981]/30 dark:border-[#10B981]/40 text-xs sm:text-sm font-sans leading-relaxed text-stone-900 dark:text-[#F4F4F0] space-y-3 shadow-xs">
                  <p>
                    &ldquo;The{' '}
                    <span className="bg-[#10B981]/15 text-[#10B981] font-semibold px-1 rounded border border-[#10B981]/30">
                      unprecedented proliferation
                    </span>{' '}
                    of private motorized vehicles has{' '}
                    <span className="bg-[#10B981]/15 text-[#10B981] font-semibold px-1 rounded border border-[#10B981]/30">
                      precipitated acute urban congestion
                    </span>
                    , thereby{' '}
                    <span className="bg-[#10B981]/15 text-[#10B981] font-semibold px-1 rounded border border-[#10B981]/30">
                      severely exacerbating air contamination
                    </span>{' '}
                    across metropolitan centers.&rdquo;
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200/80 dark:border-[rgba(244,244,240,0.08)] font-mono text-[10px]">
                    <div className="p-1.5 rounded bg-stone-50 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
                      <span className="text-[#10B981] font-bold">[C2 COLLOCATION]</span>
                      <div className="text-stone-700 dark:text-[rgba(244,244,240,0.7)] mt-0.5">unprecedented proliferation</div>
                    </div>
                    <div className="p-1.5 rounded bg-stone-50 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
                      <span className="text-[#10B981] font-bold">[C1 VERB PHRASE]</span>
                      <div className="text-stone-700 dark:text-[rgba(244,244,240,0.7)] mt-0.5">precipitated acute congestion</div>
                    </div>
                    <div className="p-1.5 rounded bg-stone-50 dark:bg-[#090A0F] border border-stone-200/80 dark:border-[rgba(244,244,240,0.08)]">
                      <span className="text-[#10B981] font-bold">[C2 ADVANCED]</span>
                      <div className="text-stone-700 dark:text-[rgba(244,244,240,0.7)] mt-0.5">severely exacerbating</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Launch CTA */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-stone-500 dark:text-[rgba(244,244,240,0.5)]">
                ÁP DỤNG TRỰC TIẾP TRÊN MỌI ĐỀ THI
              </span>
              <Link
                href="/builder"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10B981] text-[#090A0F] font-bold text-xs hover:bg-[#10B981]/90 transition-all shadow-md group"
              >
                <Sprout className="w-4 h-4" />
                <span>Trồng Cây Đậu Ngay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
