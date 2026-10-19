'use client';

import React from 'react';

interface KpiSparklineProps {
  data: number[];
  color?: string;
  fillColor?: string;
  height?: number;
}

export default function KpiSparkline({
  data,
  color = '#FF3B1D',
  fillColor = 'rgba(255, 59, 29, 0.08)',
  height = 40,
}: KpiSparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height }} className="w-full flex items-center justify-center">
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800" />
      </div>
    );
  }

  const values = data.length === 1 ? [data[0], data[0]] : data;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min === 0 ? 1 : max - min;

  const width = 100;
  const paddingY = 4;
  const usableHeight = height - paddingY * 2;

  const points = values.map((val, idx) => {
    const x = (idx / (values.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPoints = `${polylinePoints} ${width},${height} 0,${height}`;

  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <polygon points={areaPoints} fill={fillColor} />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="2.5"
            fill={color}
            stroke="#fff"
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  );
}
