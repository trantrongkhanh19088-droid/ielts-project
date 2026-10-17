'use client';

import React from 'react';

/**
 * Seigaiha (青海波) - Blue Sea Waves Pattern SVG
 * Symbolizes calm seas, peace, and endless waves of good fortune.
 */
export function SeigaihaPattern({
  className = '',
  opacity = 0.08,
  strokeColor = 'currentColor',
}: {
  className?: string;
  opacity?: number;
  strokeColor?: string;
}) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="seigaiha"
          width="40"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* Base Half Rings */}
          <path
            d="M 0 20 A 20 20 0 0 1 40 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 5 20 A 15 15 0 0 1 35 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 10 20 A 10 10 0 0 1 30 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 15 20 A 5 5 0 0 1 25 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />

          {/* Offset Row Rings */}
          <path
            d="M -20 10 A 20 20 0 0 1 20 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M -15 10 A 15 15 0 0 1 15 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M -10 10 A 10 10 0 0 1 10 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M -5 10 A 5 5 0 0 1 5 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />

          <path
            d="M 20 10 A 20 20 0 0 1 60 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 25 10 A 15 15 0 0 1 55 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 30 10 A 10 10 0 0 1 50 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M 35 10 A 5 5 0 0 1 45 10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#seigaiha)" />
    </svg>
  );
}

/**
 * Asanoha (麻の葉) - Hemp Leaf Geometric Pattern SVG
 * Symbolizes fast growth, health, and overcoming obstacles.
 */
export function AsanohaPattern({
  className = '',
  opacity = 0.06,
  strokeColor = 'currentColor',
}: {
  className?: string;
  opacity?: number;
  strokeColor?: string;
}) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="asanoha"
          width="40"
          height="69.28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 11.55 L 0 34.64 L 20 46.19 L 40 34.64 L 40 11.55 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.8"
          />
          <line x1="20" y1="0" x2="20" y2="46.19" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="0" y1="11.55" x2="40" y2="34.64" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="0" y1="34.64" x2="40" y2="11.55" stroke={strokeColor} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  );
}

/**
 * Omamori (お守り) - Traditional Japanese Exam Protection Amulet
 */
export function OmamoriBadge({
  text = '学業成就',
  subText = 'BAND 8.0+',
  color = 'red',
  className = '',
}: {
  text?: string;
  subText?: string;
  color?: 'red' | 'purple' | 'blue' | 'gold';
  className?: string;
}) {
  const colorMap = {
    red: { bg: 'from-rose-600 to-red-800', border: 'border-amber-300', text: 'text-amber-200' },
    purple: { bg: 'from-purple-600 to-indigo-900', border: 'border-purple-300', text: 'text-purple-200' },
    blue: { bg: 'from-sky-600 to-blue-900', border: 'border-cyan-300', text: 'text-cyan-200' },
    gold: { bg: 'from-amber-500 to-yellow-700', border: 'border-yellow-200', text: 'text-yellow-100' },
  };

  const scheme = colorMap[color] || colorMap.red;

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Top Hanging Cord */}
      <div className="w-1.5 h-4 bg-amber-400 rounded-t-sm shadow-sm" />
      <div className="w-5 h-2 bg-amber-500 rounded-full border border-amber-300 shadow-sm" />

      {/* Main Omamori Brocade Pouch */}
      <div
        className={`relative w-16 h-22 sm:w-20 sm:h-26 px-2 py-2.5 rounded-b-xl rounded-t-md bg-gradient-to-b ${scheme.bg} border-2 ${scheme.border} shadow-xl flex flex-col items-center justify-between text-center`}
      >
        {/* Gold Brocade Tie Ribbon Knot */}
        <div className="w-4 h-4 border-2 border-amber-300 rotate-45 mb-1 bg-amber-400/30" />

        {/* Kanji Inscription */}
        <div className="flex-1 flex-col items-center justify-center">
          <span className="font-display text-xs sm:text-sm font-black tracking-widest text-amber-200 writing-vertical drop-shadow-md">
            {text}
          </span>
        </div>

        {/* Sub text badge */}
        <div className="mt-1 px-1.5 py-0.5 rounded bg-black/40 border border-amber-300/40 text-[11px] font-black tracking-tight text-amber-300">
          {subText}
        </div>
      </div>
    </div>
  );
}
