'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { EssayRecord } from '@/types';
import { fetchAllEssayRecords, deleteEssayRecordAsync, clearAllEssayRecordsAsync } from '@/lib/storage';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import ProgressHistoryChart from '@/components/charts/ProgressHistoryChart';
import { formatDuration } from '@/lib/utils';
import ToriiGate from '@/components/japanese/ToriiGate';

export default function DashboardPage() {
  const [records, setRecords] = useState<EssayRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
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
    }
  };

  const handleClearAll = async () => {
    await clearAllEssayRecordsAsync();
    setRecords([]);
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

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Candidate Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-md hairline-border bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-xl shadow-xs shrink-0">
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
        <div className="w-full md:w-80 p-4 rounded-md hairline-border bg-paper dark:bg-carbon space-y-2">
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

      {/* 4 Overview Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Essays */}
        <div className="p-5 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
            <span>01 // TỔNG BÀI VIẾT</span>
            <FileText className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-3xl font-normal font-mono text-stone-900 dark:text-stone-100">
            {totalEssays}
          </div>
          <p className="font-mono text-[11px] text-stone-400">Task 1, Task 2 &amp; Full Test</p>
        </div>

        {/* Avg Band */}
        <div className="p-5 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
            <span>02 // BAND TRUNG BÌNH</span>
            <TrendingUp className="w-3.5 h-3.5 text-vermilion" />
          </div>
          <div className="text-3xl font-normal font-mono text-vermilion">
            {avgBand}
          </div>
          <p className="font-mono text-[11px] text-stone-400">Tính trên tất cả các bài</p>
        </div>

        {/* Highest Band */}
        <div className="p-5 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
            <span>03 // KỶ LỤC CAO NHẤT</span>
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-normal font-mono text-stone-900 dark:text-stone-100">
            {highestBand}
          </div>
          <p className="font-mono text-[11px] text-stone-400">Điểm số bài thi tốt nhất</p>
        </div>

        {/* Total Practice Time */}
        <div className="p-5 rounded-lg hairline-border bg-paper-subtle dark:bg-carbon-subtle space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
            <span>04 // THỜI GIAN THỰC</span>
            <Clock className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-3xl font-normal font-mono text-stone-900 dark:text-stone-100">
            {totalMinutes} <span className="text-sm font-normal text-stone-500">phút</span>
          </div>
          <p className="font-mono text-[11px] text-stone-400">Tích lũy trong phòng thi</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="space-y-3">
        <ProgressHistoryChart records={records} />
      </div>

      {/* History Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 hairline-b pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
            <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2 tracking-normal">
              <span>Lịch Sử Bài Viết &amp; Chấm Điểm</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 font-semibold">
                {records.length}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {records.length > 0 && (
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hairline-border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-mono font-semibold transition-colors"
                title="Xóa toàn bộ lịch sử bài thi và đặt lại thống kê về 0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Đặt lại dữ liệu</span>
              </button>
            )}

            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white text-xs font-semibold shadow-xs transition-all duration-200 ease-spring active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Luyện bài mới</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-stone-500">
            00 // Đang tải lịch sử bài viết...
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center rounded-xl hairline-border bg-paper-subtle/50 dark:bg-carbon-subtle/50 space-y-4">
            <div className="flex justify-center">
              <ToriiGate width={48} height={40} text="合格" glow={false} showShimenawa={false} />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                Chưa có bài viết nào được lưu
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Hãy bắt đầu một bài luyện tập Task 1, Task 2 hoặc Full Test để xây dựng hồ sơ tiến bộ chuẩn thi thật của bạn!
              </p>
            </div>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-stone-50 hover:bg-vermilion dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-vermilion dark:hover:text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Luyện đề đầu tiên</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl hairline-border bg-paper-subtle/70 dark:bg-carbon-subtle/70 shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="hairline-b bg-stone-100/70 dark:bg-stone-900/60 font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Ngày nộp</th>
                  <th className="p-3.5">Chế độ</th>
                  <th className="p-3.5">Đề bài</th>
                  <th className="p-3.5">Số từ</th>
                  <th className="p-3.5">Thời gian</th>
                  <th className="p-3.5 text-center">Band Score</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
                {records.map((r) => {
                  const isFT = r.task_type === 'full_test';
                  const isT1 = r.task_type === 'task1';
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-stone-100/50 dark:hover:bg-stone-850/40 transition-colors"
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

                      <td className="p-3.5 font-display font-medium text-stone-900 dark:text-stone-100 max-w-xs truncate text-xs sm:text-sm">
                        {r.prompt_title}
                      </td>

                      <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400 whitespace-nowrap text-[11px]">
                        {r.word_count} từ
                      </td>

                      <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400 whitespace-nowrap text-[11px]">
                        {formatDuration(r.duration_seconds)}
                      </td>

                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold font-mono text-xs bg-vermilion/10 text-vermilion border border-vermilion/30">
                          {Number(r.overall_band).toFixed(1)}
                          {r.server_signature && (
                            <span title="Đã xác thực chữ ký máy chủ AI">
                              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            </span>
                          )}
                        </span>
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/results?id=${r.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded hairline-border bg-paper dark:bg-carbon text-stone-800 dark:text-stone-200 hover:text-vermilion hover:border-vermilion transition-colors font-mono text-[11px] font-semibold"
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
