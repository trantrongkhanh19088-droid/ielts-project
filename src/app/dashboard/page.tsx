'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Award,
  Clock,
  FileText,
  Trash2,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Target,
  User,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { EssayRecord } from '@/types';
import { fetchAllEssayRecords, deleteEssayRecordAsync, clearAllEssayRecordsAsync } from '@/lib/storage';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import ProgressHistoryChart from '@/components/charts/ProgressHistoryChart';
import { formatDuration } from '@/lib/utils';
import ToriiGate from '@/components/japanese/ToriiGate';
import KpiSparkline from '@/components/dashboard/KpiSparkline';
import RecordDetailDrawer from '@/components/dashboard/RecordDetailDrawer';
import { useSoundEngine } from '@/hooks/useSoundEngine';

export default function DashboardPage() {
  const { playClick, playLockIn } = useSoundEngine();
  const [records, setRecords] = useState<EssayRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EssayRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'task1' | 'task2' | 'full_test'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'band_high' | 'band_low'>('newest');

  const [userProfile, setUserProfile] = useState<{
    fullName: string;
    email: string;
    targetBand: number;
  }>({
    fullName: 'Thí sinh IELTS',
    email: '',
    targetBand: 7.0,
  });

  const loadData = async () => {
    setLoading(true);
    const list = await fetchAllEssayRecords();
    setRecords(list);

    // Load profile
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          setUserProfile({
            fullName: data?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Thí sinh',
            email: user.email || '',
            targetBand: data?.target_band ? Number(data.target_band) : 7.0,
          });
        }
      }
    } else {
      const local = localStorage.getItem('cd_ielts_local_user');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setUserProfile({
            fullName: parsed.fullName || 'Thí sinh',
            email: parsed.email || '',
            targetBand: parsed.targetBand ? Number(parsed.targetBand) : 7.0,
          });
        } catch {}
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này khỏi lịch sử không?')) {
      await deleteEssayRecordAsync(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (selectedRecord?.id === id) {
        setSelectedRecord(null);
      }
    }
  };

  const handleClearAll = async () => {
    await clearAllEssayRecordsAsync();
    setRecords([]);
    setSelectedRecord(null);
    setShowResetModal(false);
  };

  // Compute Stats
  const totalEssays = records.length;
  const avgBandNum =
    totalEssays > 0
      ? records.reduce((acc, r) => acc + Number(r.overall_band), 0) / totalEssays
      : 0;
  const avgBand = avgBandNum.toFixed(1);
  const highestBand =
    totalEssays > 0
      ? Math.max(...records.map((r) => Number(r.overall_band))).toFixed(1)
      : '0.0';
  const totalSeconds = records.reduce((acc, r) => acc + (r.duration_seconds || 0), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  const targetProgress = Math.min(100, Math.round((avgBandNum / (userProfile.targetBand || 7.0)) * 100));

  // Sparkline data sequences (chronological from oldest to newest)
  const chronologicalRecords = useMemo(() => [...records].reverse(), [records]);
  const bandSparklineData = useMemo(
    () => chronologicalRecords.map((r) => Number(r.overall_band)),
    [chronologicalRecords]
  );
  const wordCountSparklineData = useMemo(
    () => chronologicalRecords.map((r) => r.word_count),
    [chronologicalRecords]
  );
  const timeSparklineData = useMemo(
    () => chronologicalRecords.map((r) => Math.round((r.duration_seconds || 0) / 60)),
    [chronologicalRecords]
  );

  // Filter & Sort records for the DataTable
  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        const matchesFilter = filterType === 'all' || r.task_type === filterType;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          r.prompt_title.toLowerCase().includes(q) ||
          r.task_type.toLowerCase().includes(q) ||
          r.prompt_text.toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortBy === 'band_high') {
          return Number(b.overall_band) - Number(a.overall_band);
        }
        if (sortBy === 'band_low') {
          return Number(a.overall_band) - Number(b.overall_band);
        }
        return 0;
      });
  }, [records, filterType, searchQuery, sortBy]);

  // Counts by task type
  const countTask1 = useMemo(() => records.filter((r) => r.task_type === 'task1').length, [records]);
  const countTask2 = useMemo(() => records.filter((r) => r.task_type === 'task2').length, [records]);
  const countFullTest = useMemo(() => records.filter((r) => r.task_type === 'full_test').length, [records]);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Candidate Profile Header Card (Slate Inset Panel) */}
      <div className="p-6 sm:p-8 rounded-xl hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg hairline-border bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-xl shadow-xs shrink-0">
            {userProfile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100 tracking-normal leading-snug">
                {userProfile.fullName}
              </h1>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 font-semibold uppercase">
                HỌC VIÊN
              </span>
            </div>
            <p className="font-mono text-xs text-stone-500">
              {userProfile.email || 'Lưu trữ cục bộ // Guest Profile'}
            </p>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="w-full md:w-80 p-4 rounded-lg hairline-border bg-paper dark:bg-carbon space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-stone-600 dark:text-stone-400 flex items-center gap-1.5 font-medium">
              <Target className="w-3.5 h-3.5 text-vermilion" /> Target {userProfile.targetBand.toFixed(1)}
            </span>
            <span className="text-vermilion font-bold">{targetProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-vermilion rounded-full transition-all duration-500"
              style={{ width: `${targetProgress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[11px] text-stone-400">
            <span>Điểm hiện tại: {avgBand}</span>
            <span>Mục tiêu: {userProfile.targetBand.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* 4 Overview Statistics Cards with SVG Sparklines (Slate KPI Specification) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Essays */}
        <div className="p-5 rounded-xl hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
              <span>01 // TỔNG BÀI NỘP</span>
              <FileText className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="text-3xl font-semibold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
              {totalEssays}
            </div>
            <p className="font-mono text-[11px] text-stone-400">
              T1: {countTask1} • T2: {countTask2} • FT: {countFullTest}
            </p>
          </div>
          <div className="pt-2">
            <KpiSparkline
              data={wordCountSparklineData.length > 0 ? wordCountSparklineData : [0, 0]}
              color="#10B981"
              fillColor="rgba(16, 185, 129, 0.08)"
              height={36}
            />
          </div>
        </div>

        {/* Avg Band */}
        <div className="p-5 rounded-xl hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
              <span>02 // BAND TRUNG BÌNH</span>
              <TrendingUp className="w-3.5 h-3.5 text-vermilion" />
            </div>
            <div className="text-3xl font-semibold font-mono text-vermilion tabular-nums">
              {avgBand}
            </div>
            <p className="font-mono text-[11px] text-stone-400">
              {totalEssays > 0 ? `Tính trên ${totalEssays} bài thi` : 'Chưa có bài thi'}
            </p>
          </div>
          <div className="pt-2">
            <KpiSparkline
              data={bandSparklineData.length > 0 ? bandSparklineData : [0, 0]}
              color="#FF3B1D"
              fillColor="rgba(255, 59, 29, 0.08)"
              height={36}
            />
          </div>
        </div>

        {/* Highest Band */}
        <div className="p-5 rounded-xl hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
              <span>03 // KỶ LỤC CAO NHẤT</span>
              <Award className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-3xl font-semibold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
              {highestBand}
            </div>
            <p className="font-mono text-[11px] text-stone-400">Điểm số bài thi tốt nhất</p>
          </div>
          <div className="pt-2">
            <KpiSparkline
              data={bandSparklineData.map((b) => Math.max(b, 6.0))}
              color="#F59E0B"
              fillColor="rgba(245, 158, 11, 0.08)"
              height={36}
            />
          </div>
        </div>

        {/* Total Practice Time */}
        <div className="p-5 rounded-xl hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
              <span>04 // THỜI GIAN THỰC</span>
              <Clock className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="text-3xl font-semibold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
              {totalMinutes} <span className="text-sm font-normal text-stone-500">phút</span>
            </div>
            <p className="font-mono text-[11px] text-stone-400">
              {totalEssays > 0 ? `~${Math.round(totalMinutes / totalEssays)} phút/bài` : 'Tích lũy trong phòng thi'}
            </p>
          </div>
          <div className="pt-2">
            <KpiSparkline
              data={timeSparklineData.length > 0 ? timeSparklineData : [0, 0]}
              color="#3B82F6"
              fillColor="rgba(59, 130, 246, 0.08)"
              height={36}
            />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="space-y-3">
        <ProgressHistoryChart records={records} />
      </div>

      {/* Slate DataTable Workbench Section */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 hairline-b pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vermilion" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 tracking-normal">
              Lịch Sử Bài Viết &amp; Chấm Điểm
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 font-semibold">
              {records.length} bài
            </span>
          </div>

          <div className="flex items-center gap-2">
            {records.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setShowResetModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hairline-border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-mono font-semibold transition-colors"
                title="Xóa toàn bộ lịch sử bài thi và đặt lại thống kê về 0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Đặt lại dữ liệu</span>
              </button>
            )}

            <Link
              href="/practice"
              onMouseEnter={() => playLockIn()}
              onClick={() => playClick()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white text-xs font-semibold shadow-xs transition-all duration-200 ease-spring active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Luyện bài mới</span>
            </Link>
          </div>
        </div>

        {/* Toolbar: Search & Segmented Filter Chips */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/50">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Lọc bài viết theo tiêu đề hoặc nội dung..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg hairline-border bg-paper dark:bg-carbon text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-hidden"
            />
          </div>

          {/* Filter Chips & Sort Select */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 p-0.5 rounded-lg hairline-border bg-stone-100/60 dark:bg-stone-850/60 text-xs">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFilterType('all');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors ${
                  filterType === 'all'
                    ? 'bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Tất cả ({records.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFilterType('task1');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors ${
                  filterType === 'task1'
                    ? 'bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Task 1 ({countTask1})
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFilterType('task2');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors ${
                  filterType === 'task2'
                    ? 'bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Task 2 ({countTask2})
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFilterType('full_test');
                }}
                className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors ${
                  filterType === 'full_test'
                    ? 'bg-paper dark:bg-carbon text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Full Test ({countFullTest})
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg hairline-border bg-paper dark:bg-carbon text-xs text-stone-700 dark:text-stone-300 font-mono outline-hidden"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="band_high">Band cao nhất</option>
                <option value="band_low">Band thấp nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-stone-500">
            00 // Đang tải lịch sử bài viết...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-12 text-center rounded-xl hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/50 space-y-4">
            <div className="flex justify-center">
              <ToriiGate width={48} height={40} text="合格" glow={false} showShimenawa={false} />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                {records.length === 0
                  ? 'Chưa có bài viết nào được lưu'
                  : 'Không tìm thấy bài viết phù hợp với bộ lọc'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                {records.length === 0
                  ? 'Hãy bắt đầu một bài luyện tập Task 1, Task 2 hoặc Full Test để xây dựng hồ sơ tiến bộ chuẩn thi thật của bạn!'
                  : 'Hãy thử xóa từ khóa tìm kiếm hoặc đổi chế độ lọc để xem lại bài làm.'}
              </p>
            </div>
            {records.length === 0 && (
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Luyện đề đầu tiên</span>
              </Link>
            )}
          </div>
        ) : (
          /* Slate DataTable */
          <div className="overflow-x-auto rounded-xl hairline-border bg-paper dark:bg-carbon shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="hairline-b bg-stone-100/70 dark:bg-stone-900/60 font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Ngày nộp</th>
                  <th className="p-3.5">Chế độ</th>
                  <th className="p-3.5">Đề bài</th>
                  <th className="p-3.5 text-right">Số từ</th>
                  <th className="p-3.5 text-right">Thời gian</th>
                  <th className="p-3.5 text-center">Band Score</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
                {filteredRecords.map((r) => {
                  const isFT = r.task_type === 'full_test';
                  const isT1 = r.task_type === 'task1';
                  return (
                    <tr
                      key={r.id}
                      onClick={() => {
                        playClick();
                        setSelectedRecord(r);
                      }}
                      className="hover:bg-stone-100/60 dark:hover:bg-stone-850/60 transition-colors cursor-pointer group"
                    >
                      <td className="p-3.5 text-stone-500 font-mono whitespace-nowrap text-[11px]">
                        {new Date(r.created_at).toLocaleDateString('vi-VN', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                            isFT
                              ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                              : isT1
                              ? 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/30'
                              : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {r.task_type.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 font-display font-medium text-stone-900 dark:text-stone-100 max-w-xs truncate text-xs sm:text-sm group-hover:text-vermilion transition-colors">
                        {r.prompt_title}
                      </td>

                      <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400 whitespace-nowrap text-[11px] text-right tabular-nums">
                        {r.word_count} từ
                      </td>

                      <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400 whitespace-nowrap text-[11px] text-right tabular-nums">
                        {formatDuration(r.duration_seconds)}
                      </td>

                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold font-mono text-xs bg-vermilion/10 text-vermilion border border-vermilion/30">
                          {Number(r.overall_band).toFixed(1)}
                          {r.server_signature && (
                            <span title="Đã xác thực chữ ký máy chủ AI">
                              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            </span>
                          )}
                        </span>
                      </td>

                      <td
                        className="p-3.5 text-right whitespace-nowrap space-x-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            setSelectedRecord(r);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded hairline-border bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 font-mono text-[11px] font-semibold transition-colors"
                          title="Xem nhanh trong drawer"
                        >
                          <Eye className="w-3 h-3" />
                          <span className="hidden sm:inline">Chi tiết</span>
                        </button>
                        <Link
                          href={`/results?id=${r.id}`}
                          onClick={() => playClick()}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded hairline-border bg-paper dark:bg-carbon text-stone-800 dark:text-stone-200 hover:text-vermilion hover:border-vermilion transition-colors font-mono text-[11px] font-semibold"
                        >
                          <span>Xem chấm</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          className="p-1 rounded text-stone-400 hover:text-vermilion hover:bg-red-500/10 transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Inspection Detail Drawer (Slate Specification) */}
      <RecordDetailDrawer
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        onDelete={handleDelete}
      />

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-paper dark:bg-carbon rounded-2xl hairline-border p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex flex-col items-center gap-2">
              <ToriiGate width={48} height={40} text="合格" glow={false} showShimenawa={false} />
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-vermilion flex items-center justify-center mt-1">
                <Trash2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                Đặt lại toàn bộ dữ liệu luyện tập?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                Hành động này sẽ xóa toàn bộ <span className="font-bold text-vermilion">{records.length} bài thi</span> khỏi lịch sử lưu trữ. Điểm trung bình, kỷ lục band điểm và tổng thời gian luyện tập sẽ được đưa về 0.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 px-4 rounded-lg hairline-border text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="flex-1 py-2.5 px-4 rounded-lg bg-vermilion hover:bg-vermilion-hover text-xs font-bold text-white shadow-sm transition-colors"
              >
                Xác nhận xóa sạch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
