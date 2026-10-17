'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { EssayRecord } from '@/types';

interface ProgressHistoryChartProps {
  records: EssayRecord[];
}

export default function ProgressHistoryChart({ records }: ProgressHistoryChartProps) {
  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Chưa có bài viết nào được chấm. Hãy bắt đầu làm bài luyện tập đầu tiên để theo dõi tiến độ Band score!
        </p>
      </div>
    );
  }

  // Sort chronological for chart
  const sorted = [...records].reverse().map((r, idx) => ({
    index: idx + 1,
    date: new Date(r.created_at).toLocaleDateString('vi-VN', {
      month: 'numeric',
      day: 'numeric',
    }),
    band: Number(r.overall_band),
    task: r.task_type.toUpperCase(),
    title: r.prompt_title,
  }));

  return (
    <div className="w-full h-72 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Lịch sử & Xu hướng Band Score
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Điểm Overall Writing qua các lần làm bài
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={sorted} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} />
          <YAxis
            stroke="#9ca3af"
            fontSize={11}
            domain={[4.0, 9.0]}
            ticks={[4.0, 5.0, 6.0, 7.0, 8.0, 9.0]}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-gray-900 text-white p-2.5 rounded shadow-lg text-xs space-y-1">
                    <p className="font-bold text-sky-400">Band {item.band.toFixed(1)}</p>
                    <p className="text-gray-300">Đề: {item.title}</p>
                    <p className="text-gray-400">Ngày: {item.date}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="band"
            stroke="#0284c7"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#bandGradient)"
            dot={{ r: 4, fill: '#0284c7', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
