'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Task1PieChartProps {
  data: { label: string; val1995: number; val2015: number; fill: string }[];
}

export default function Task1PieChart({ data }: Task1PieChartProps) {
  const data1995 = data.map((d) => ({ name: d.label, value: d.val1995, fill: d.fill }));
  const data2015 = data.map((d) => ({ name: d.label, value: d.val2015, fill: d.fill }));

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-4 rounded border border-gray-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1995 Chart */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Year: 1995</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data1995}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data1995.map((entry, index) => (
                    <Cell key={`cell-95-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2015 Chart */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Year: 2015</h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data2015}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data2015.map((entry, index) => (
                    <Cell key={`cell-15-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Legend below */}
      <div className="flex flex-wrap justify-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800 text-xs">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
