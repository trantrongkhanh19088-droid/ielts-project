'use client';

import React from 'react';

interface ToriiGateProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  text?: string; // Kanji on the Gaku plaque, default: '合格祈願' (Goukaku Kigan - Passing the Exam)
  showShimenawa?: boolean;
  glow?: boolean;
}

export default function ToriiGate({
  className = '',
  width = 160,
  height = 140,
  text = '合格祈願',
  showShimenawa = true,
  glow = true,
}: ToriiGateProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 200 170"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vermilion Wood Gradients */}
          <linearGradient id="toriiRedDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
          <linearGradient id="toriiRedLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="toriiBlackRoof" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="toriiGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          {glow && (
            <filter id="toriiGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        {/* Ambient Glow */}
        {glow && (
          <path
            d="M 12 36 Q 100 24 188 36 L 180 46 Q 100 36 20 46 Z"
            fill="#EF4444"
            opacity="0.3"
            filter="url(#toriiGlowFilter)"
          />
        )}

        {/* --- KASAGI (Curved Top Roof Beam) with Black/Gold Ridge --- */}
        <path
          d="M 10 32 Q 100 18 190 32 L 192 38 Q 100 24 8 38 Z"
          fill="url(#toriiBlackRoof)"
        />
        <path
          d="M 8 38 Q 100 24 192 38 L 188 50 Q 100 38 12 50 Z"
          fill="url(#toriiRedDark)"
        />

        {/* --- SHIMAKI (Second Beam directly under Kasagi) --- */}
        <path
          d="M 22 50 Q 100 42 178 50 L 176 58 Q 100 50 24 58 Z"
          fill="url(#toriiRedLight)"
        />

        {/* --- NUKI (Horizontal Crossbar penetrating both pillars) --- */}
        <path
          d="M 16 82 L 184 82 L 184 94 L 16 94 Z"
          fill="url(#toriiRedDark)"
        />
        {/* Nuki protruding tips black/gold caps */}
        <rect x="14" y="81" width="6" height="14" rx="1" fill="#0F172A" />
        <rect x="180" y="81" width="6" height="14" rx="1" fill="#0F172A" />

        {/* --- GAKUZUKA & GAKU (Center Tablet / Plaque) --- */}
        <rect x="88" y="56" width="24" height="28" rx="2" fill="#0F172A" stroke="url(#toriiGold)" strokeWidth="1.5" />
        <text
          x="100"
          y="74"
          textAnchor="middle"
          fill="#FEF08A"
          fontSize="8"
          fontWeight="900"
          fontFamily="serif"
          letterSpacing="1"
          style={{ textShadow: '0 0 2px #CA8A04' }}
        >
          {text.length <= 2 ? text : text.slice(0, 2)}
        </text>

        {/* --- SHIMENAWA (Sacred Straw Rope & Zigzag Paper Shide) --- */}
        {showShimenawa && (
          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            <path
              d="M 45 84 Q 100 98 155 84"
              stroke="#D97706"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="4 2"
            />
            {/* Shide 1 */}
            <polygon points="68,91 74,91 71,98 76,98 72,106 67,100 71,100" fill="#FFFFFF" opacity="0.95" />
            {/* Shide 2 (Center) */}
            <polygon points="97,94 103,94 100,102 106,102 101,111 96,104 100,104" fill="#FFFFFF" opacity="0.95" />
            {/* Shide 3 */}
            <polygon points="126,91 132,91 129,98 134,98 130,106 125,100 129,100" fill="#FFFFFF" opacity="0.95" />
          </g>
        )}

        {/* --- HASHIRA (Two Main Slanted Pillars) --- */}
        {/* Left Pillar */}
        <polygon
          points="42,50 56,50 50,158 34,158"
          fill="url(#toriiRedDark)"
        />
        {/* Right Pillar */}
        <polygon
          points="144,50 158,50 166,158 150,158"
          fill="url(#toriiRedDark)"
        />

        {/* Pillar Wood Highlights */}
        <line x1="48" y1="50" x2="41" y2="158" stroke="#F87171" strokeWidth="1.2" opacity="0.4" />
        <line x1="152" y1="50" x2="159" y2="158" stroke="#F87171" strokeWidth="1.2" opacity="0.4" />

        {/* --- KAMEBARA / DAIZA (Black/Stone Base Pedestals) --- */}
        {/* Left Base */}
        <path d="M 30 156 L 54 156 L 56 166 L 28 166 Z" fill="#0F172A" />
        <rect x="26" y="165" width="32" height="4" rx="1" fill="#334155" />
        {/* Right Base */}
        <path d="M 146 156 L 170 156 L 172 166 L 144 166 Z" fill="#0F172A" />
        <rect x="142" y="165" width="32" height="4" rx="1" fill="#334155" />
      </svg>
    </div>
  );
}
