'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types';

interface Task1LineChartProps {
  data: ChartDataPoint[];
  dataKeys: { key: string; name: string; color: string }[];
}

export default function Task1LineChart({ data, dataKeys }: Task1LineChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-zinc-900 p-2 rounded border border-gray-200 dark:border-zinc-800">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 15, right: 25, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" stroke="#6b7280" fontSize={12} tickLine={false} />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            unit=" mm"
            domain={[0, 'dataMax + 20']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#f9fafb',
              borderRadius: '0.375rem',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '8px' }} />
          {dataKeys.map((dk) => (
            <Line
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              name={dk.name}
              stroke={dk.color}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
