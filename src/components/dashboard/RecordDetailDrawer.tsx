'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Trash2,
  Clock,
  FileText,
  Award,
  ShieldCheck,
  Target,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { EssayRecord } from '@/types';
import { formatDuration } from '@/lib/utils';
import { useSoundEngine } from '@/hooks/useSoundEngine';

interface RecordDetailDrawerProps {
  record: EssayRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function RecordDetailDrawer({
  record,
  isOpen,
  onClose,
  onDelete,
}: RecordDetailDrawerProps) {
  const { playClick } = useSoundEngine();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !record) return null;

  const isFT = record.task_type === 'full_test';
  const isT1 = record.task_type === 'task1';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chi tiết bài thi"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 dark:bg-black/70 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl h-full bg-paper dark:bg-carbon hairline-l shadow-2xl flex flex-col overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header (Slate 48px Header Specification) */}
        <div className="flex items-center justify-between px-6 h-14 hairline-b bg-paper-subtle/60 dark:bg-carbon-subtle/60 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                isFT
                  ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                  : isT1
                  ? 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/30'
                  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30'
              }`}
            >
              {record.task_type.replace('_', ' ')}
            </span>
            <span className="font-mono text-xs text-stone-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(record.created_at).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-md hairline-border text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors"
              title="Đóng (Esc)"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Overall Band Banner */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 leading-snug">
              {record.prompt_title}
            </h2>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-vermilion/10 text-vermilion border border-vermilion/30">
                <span className="font-mono text-xs font-semibold uppercase">Overall Band</span>
                <span className="font-mono text-2xl font-bold tracking-tight">
                  {Number(record.overall_band).toFixed(1)}
                </span>
              </div>
              {record.server_signature && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md hairline-border bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified AI Signature</span>
                </div>
              )}
            </div>
          </div>

          {/* 4 Mini Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-500">
                <FileText className="w-3.5 h-3.5" />
                <span>Số từ bài viết</span>
              </div>
              <div className="font-mono text-lg font-bold text-stone-900 dark:text-stone-100">
                {record.word_count} <span className="text-xs font-normal text-stone-500">từ</span>
              </div>
            </div>

            <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Thời gian làm bài</span>
              </div>
              <div className="font-mono text-lg font-bold text-stone-900 dark:text-stone-100">
                {formatDuration(record.duration_seconds)}
              </div>
            </div>
          </div>

          {/* 4 Criteria Breakdown Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-stone-500 uppercase tracking-wider">
              <span>04 // TIÊU CHÍ CHẤM ĐIỂM CHUẨN BC & IDP</span>
              <BarChart3 className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle text-center space-y-1">
                <span className="font-mono text-[10px] text-stone-500 font-semibold">TA / TR</span>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                  {record.tr_score ? Number(record.tr_score).toFixed(1) : '—'}
                </div>
                <span className="text-[10px] text-stone-400 block truncate">Task Response</span>
              </div>
              <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle text-center space-y-1">
                <span className="font-mono text-[10px] text-stone-500 font-semibold">CC</span>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                  {record.cc_score ? Number(record.cc_score).toFixed(1) : '—'}
                </div>
                <span className="text-[10px] text-stone-400 block truncate">Cohesion</span>
              </div>
              <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle text-center space-y-1">
                <span className="font-mono text-[10px] text-stone-500 font-semibold">LR</span>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                  {record.lr_score ? Number(record.lr_score).toFixed(1) : '—'}
                </div>
                <span className="text-[10px] text-stone-400 block truncate">Lexical</span>
              </div>
              <div className="p-3 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle text-center space-y-1">
                <span className="font-mono text-[10px] text-stone-500 font-semibold">GRA</span>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
                  {record.gra_score ? Number(record.gra_score).toFixed(1) : '—'}
                </div>
                <span className="text-[10px] text-stone-400 block truncate">Grammar</span>
              </div>
            </div>
          </div>

          {/* Prompt Question */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Nội dung đề bài
            </h3>
            <div className="p-4 rounded-lg hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/50 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              {record.prompt_text}
            </div>
          </div>

          {/* Student Essay Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Bài làm của thí sinh
              </h3>
              <span className="font-mono text-[11px] text-stone-400">
                {record.word_count} words
              </span>
            </div>
            <div className="p-4 rounded-lg hairline-border bg-paper-subtle/30 dark:bg-carbon-subtle/30 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap font-sans font-normal max-h-80 overflow-y-auto selection:bg-vermilion/20">
              {record.essay_content}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 hairline-t bg-paper-subtle/80 dark:bg-carbon-subtle/80 flex items-center justify-between gap-3 shrink-0">
          {onDelete && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onDelete(record.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md hairline-border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa bài viết</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-3.5 py-2 rounded-md hairline-border text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850 text-xs font-semibold transition-colors"
            >
              Đóng
            </button>
            <Link
              href={`/results?id=${record.id}`}
              onClick={() => playClick()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-vermilion dark:hover:text-stone-50 text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Xem báo cáo chấm chi tiết</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
