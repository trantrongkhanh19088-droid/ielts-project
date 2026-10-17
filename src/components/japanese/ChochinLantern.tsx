'use client';

import React from 'react';

interface ChochinLanternProps {
  className?: string;
  size?: number; // Height in px
  kanji?: string; // Single kanji character e.g. '勝' (Victory), '祭' (Festival), '夢' (Dream)
  sway?: boolean;
}

export default function ChochinLantern({
  className = '',
  size = 56,
  kanji = '勝',
  sway = true,
}: ChochinLanternProps) {
  const width = Math.round(size * 0.65);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width,
        height: size,
        transformOrigin: 'top center',
        animation: sway ? 'lantern-sway 4s ease-in-out infinite' : undefined,
      }}
    >
      <svg
        viewBox="0 0 65 100"
        className="w-full h-full overflow-visible drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lanternRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="25%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="75%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#F97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top Black Cap Ring & Hook */}
        <path d="M 32.5 0 L 32.5 10" stroke="#0F172A" strokeWidth="2.5" />
        <rect x="22" y="10" width="21" height="6" rx="2" fill="#0F172A" />

        {/* Main Oval Ribbed Lantern Body */}
        <ellipse cx="32.5" cy="46" rx="24" ry="30" fill="url(#lanternRed)" />

        {/* Warm Internal Light Glow */}
        <ellipse
          cx="32.5"
          cy="46"
          rx="18"
          ry="22"
          fill="url(#innerGlow)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />

        {/* Horizontal Paper Ribs (Bones) */}
        <path d="M 12 28 Q 32.5 32 53 28" stroke="#7F1D1D" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 9 37 Q 32.5 42 56 37" stroke="#7F1D1D" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 8.5 46 Q 32.5 52 56.5 46" stroke="#7F1D1D" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 9 55 Q 32.5 61 56 55" stroke="#7F1D1D" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M 12 64 Q 32.5 69 53 64" stroke="#7F1D1D" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Kanji Character with golden/black shadow */}
        <text
          x="32.5"
          y="54"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="18"
          fontWeight="900"
          fontFamily="serif"
          style={{ textShadow: '0 0 4px #FDE047' }}
        >
          {kanji}
        </text>

        {/* Bottom Black Rim Cap */}
        <rect x="22" y="75" width="21" height="6" rx="2" fill="#0F172A" />

        {/* Red & Gold Tassels */}
        <path d="M 32.5 81 L 32.5 95" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32.5" cy="84" r="2.5" fill="#EAB308" />
        <path d="M 30 87 L 27 98" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 35 87 L 38 98" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
