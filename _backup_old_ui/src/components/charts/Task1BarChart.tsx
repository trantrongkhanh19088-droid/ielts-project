'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types';

interface Task1BarChartProps {
  data: ChartDataPoint[];
  dataKeys: { key: string; name: string; color: string }[];
}

export default function Task1BarChart({ data, dataKeys }: Task1BarChartProps) {
  return (
    <div className="w-full h-80 bg-white dark:bg-zinc-900 p-2 rounded border border-gray-200 dark:border-zinc-800">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 25, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" stroke="#6b7280" fontSize={12} tickLine={false} />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            unit="%"
            domain={[0, 100]}
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
            <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
