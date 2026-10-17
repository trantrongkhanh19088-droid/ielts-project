'use client';

import React, { useState, useEffect } from 'react';

interface ManekiNekoProps {
  className?: string;
  size?: number;
  mode?: 'inline' | 'back-to-top';
  tooltip?: string;
  onClick?: () => void;
}

export default function ManekiNeko({
  className = '',
  size = 48,
  mode = 'inline',
  tooltip = 'Vẫy tay rước Band 8.5+! 🐾',
  onClick,
}: ManekiNekoProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isWavingFast, setIsWavingFast] = useState(false);

  useEffect(() => {
    if (mode !== 'back-to-top') return;

    const checkScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [mode]);

  const handleClick = () => {
    setIsWavingFast(true);
    setTimeout(() => setIsWavingFast(false), 1200);

    if (mode === 'back-to-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onClick) onClick();
  };

  if (mode === 'back-to-top' && !showScrollTop) {
    return null;
  }

  const containerClasses =
    mode === 'back-to-top'
      ? `fixed bottom-6 left-6 z-40 p-2 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-2xl border-2 border-amber-300 dark:border-amber-500/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group ${className}`
      : `relative inline-flex items-center justify-center cursor-pointer group ${className}`;

  return (
    <div
      onClick={handleClick}
      className={containerClasses}
      style={{ width: mode === 'back-to-top' ? size + 16 : size, height: mode === 'back-to-top' ? size + 16 : size }}
      title={tooltip}
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2.5 py-1 rounded-lg bg-gray-900/95 text-amber-300 text-xs font-bold whitespace-nowrap shadow-lg border border-amber-400/30 z-50">
        {tooltip}
      </div>

      <svg
        viewBox="0 0 100 110"
        className="w-full h-full overflow-visible drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nekoBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="kobanGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="nekoRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>

        {/* Tail curled behind body */}
        <path
          d="M 22 75 C 10 70 8 50 16 42 C 20 38 24 44 20 48 C 16 54 18 64 26 68 Z"
          fill="#334155"
        />

        {/* Main Body (Plump round cat body) */}
        <ellipse cx="50" cy="72" rx="34" ry="28" fill="url(#nekoBody)" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Left Calico Patch on Body */}
        <path d="M 20 62 Q 32 60 28 85 Q 16 80 20 62 Z" fill="#F97316" opacity="0.85" />
        {/* Right Calico Dark Patch */}
        <path d="M 72 65 Q 82 72 78 88 Q 66 84 72 65 Z" fill="#334155" opacity="0.85" />

        {/* Cat Head */}
        <ellipse cx="50" cy="38" rx="30" ry="25" fill="url(#nekoBody)" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Left Ear */}
        <polygon points="26,24 16,3 38,15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <polygon points="27,21 21,7 35,16" fill="#F43F5E" opacity="0.75" />
        {/* Left Ear Calico Back */}
        <path d="M 24 18 L 16 3 L 28 8 Z" fill="#F97316" />

        {/* Right Ear */}
        <polygon points="74,24 84,3 62,15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <polygon points="73,21 79,7 65,16" fill="#F43F5E" opacity="0.75" />
        {/* Right Ear Calico Back */}
        <path d="M 76 18 L 84 3 L 72 8 Z" fill="#334155" />

        {/* Happy Curved Cat Eyes */}
        <path d="M 34 35 Q 40 40 44 36" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 56 36 Q 60 40 66 35" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Pink Nose & Cute Mouth */}
        <polygon points="48,41 52,41 50,44" fill="#F43F5E" />
        <path d="M 46 45 Q 50 48 54 45" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Rosy Cheeks */}
        <circle cx="32" cy="42" r="4" fill="#FDA4AF" opacity="0.6" />
        <circle cx="68" cy="42" r="4" fill="#FDA4AF" opacity="0.6" />

        {/* Whiskers */}
        <line x1="22" y1="38" x2="32" y2="40" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="44" x2="31" y2="43" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="78" y1="38" x2="68" y2="40" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="80" y1="44" x2="69" y2="43" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

        {/* Red Collar & Golden Jingle Bell */}
        <path d="M 28 54 Q 50 64 72 54" stroke="url(#nekoRed)" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Golden Bell */}
        <circle cx="50" cy="62" r="6" fill="url(#kobanGold)" stroke="#B45309" strokeWidth="1" />
        <line x1="46" y1="62" x2="54" y2="62" stroke="#B45309" strokeWidth="1" />
        <circle cx="50" cy="64.5" r="1.5" fill="#78350F" />

        {/* Left Arm Resting on Golden Koban Coin */}
        <ellipse cx="38" cy="74" rx="7" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" transform="rotate(-15 38 74)" />

        {/* Golden Koban Coin (千萬両 - 10 Million Ryo / Band 9.0) */}
        <g transform="translate(42, 68) rotate(10)">
          <rect x="0" y="0" width="22" height="30" rx="10" fill="url(#kobanGold)" stroke="#B45309" strokeWidth="1.2" />
          <text
            x="11"
            y="12"
            textAnchor="middle"
            fill="#78350F"
            fontSize="6"
            fontWeight="900"
            fontFamily="serif"
          >
            千
          </text>
          <text
            x="11"
            y="19"
            textAnchor="middle"
            fill="#78350F"
            fontSize="6"
            fontWeight="900"
            fontFamily="serif"
          >
            万
          </text>
          <text
            x="11"
            y="26"
            textAnchor="middle"
            fill="#78350F"
            fontSize="6"
            fontWeight="900"
            fontFamily="serif"
          >
            両
          </text>
        </g>

        {/* Right Arm: THE ICONIC WAVING PAW! */}
        <g
          className="origin-bottom-right"
          style={{
            transformOrigin: '76px 65px',
            animation: isWavingFast
              ? 'maneki-wave 0.35s ease-in-out infinite'
              : 'maneki-wave 1.6s ease-in-out infinite',
          }}
        >
          {/* Upper Arm */}
          <path d="M 68 62 C 78 52 86 42 82 28 C 80 24 74 24 72 30 C 68 40 64 52 64 62 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          {/* Raised Paw Pad */}
          <circle cx="80" cy="24" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="80" cy="25" rx="5" ry="4" fill="#FDA4AF" />
          {/* Toe Beans */}
          <circle cx="76" cy="19" r="1.5" fill="#FDA4AF" />
          <circle cx="80" cy="18" r="1.5" fill="#FDA4AF" />
          <circle cx="84" cy="19" r="1.5" fill="#FDA4AF" />
        </g>
      </svg>
    </div>
  );
}
