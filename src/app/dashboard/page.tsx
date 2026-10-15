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
  RotateCcw,
  Sparkles,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { EssayRecord } from '@/types';
import { fetchAllEssayRecords, deleteLocalEssayRecord } from '@/lib/storage';
import ProgressHistoryChart from '@/components/charts/ProgressHistoryChart';
import { formatDuration } from '@/lib/utils';

export default function DashboardPage() {
  const [records, setRecords] = useState<EssayRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const list = await fetchAllEssayRecords();
    setRecords(list);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này khỏi lịch sử không?')) {
      deleteLocalEssayRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Compute Stats
  const totalEssays = records.length;
  const avgBand =
    totalEssays > 0
      ? (records.reduce((acc, r) => acc + Number(r.overall_band), 0) / totalEssays).toFixed(1)
      : '0.0';
  const highestBand =
    totalEssays > 0
      ? Math.max(...records.map((r) => Number(r.overall_band))).toFixed(1)
      : '0.0';
  const totalSeconds = records.reduce((acc, r) => acc + (r.duration_seconds || 0), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Lịch sử &amp; Thống kê
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Bảng Điều Khiển Luyện Thi
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Theo dõi sự tiến bộ Band Score và xem lại toàn bộ bài viết đã được AI chấm điểm
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Luyện thi ngay</span>
        </Link>
      </div>

      {/* 4 Overview Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Essays */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Tổng số bài đã viết
            </span>
            <FileText className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
            {totalEssays}
          </div>
          <p className="text-[11px] text-gray-400">Task 1, Task 2 &amp; Full Test</p>
        </div>

        {/* Avg Band */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Band điểm trung bình
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 font-mono">
            {avgBand}
          </div>
          <p className="text-[11px] text-gray-400">Tính trên tất cả các bài</p>
        </div>

        {/* Highest Band */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Band cao nhất đạt được
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-mono">
            {highestBand}
          </div>
          <p className="text-[11px] text-gray-400">Kỷ lục bài thi tốt nhất</p>
        </div>

        {/* Total Practice Time */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Tổng thời gian luyện tập
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
            {totalMinutes} <span className="text-base font-normal">phút</span>
          </div>
          <p className="text-[11px] text-gray-400">Thời gian thực tế trong phòng thi</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="space-y-3">
        <ProgressHistoryChart records={records} />
      </div>

      {/* History Table */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-600" />
          <span>Danh sách bài viết đã lưu ({records.length})</span>
        </h3>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Đang tải lịch sử...</div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
            <p className="text-sm text-gray-500">
              Chưa có bài viết nào được lưu. Hãy bắt đầu luyện tập để xây dựng hồ sơ tiến bộ của bạn!
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-bold shadow transition"
            >
              <span>Luyện đề đầu tiên</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
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
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {records.map((r) => {
                  const isFT = r.task_type === 'full_test';
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50/60 dark:hover:bg-zinc-800/40 transition"
                    >
                      <td className="p-3.5 text-gray-500 font-mono whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString('vi-VN', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider border ${
                            isFT
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              : r.task_type === 'task1'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                              : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                          }`}
                        >
                          {r.task_type.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                        {r.prompt_title}
                      </td>

                      <td className="p-3.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {r.word_count} từ
                      </td>

                      <td className="p-3.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDuration(r.duration_seconds)}
                      </td>

                      <td className="p-3.5 text-center whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-full font-extrabold font-mono text-xs bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                          {Number(r.overall_band).toFixed(1)}
                        </span>
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/results?id=${r.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 font-semibold"
                        >
                          <span>Xem chấm</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
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
    </div>
  );
}
