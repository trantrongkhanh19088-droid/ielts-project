'use client';

import React from 'react';

interface AcademicLogoProps {
  width?: number;
  height?: number;
  className?: string;
  glow?: boolean;
}

/**
 * AcademicLogo - Official Cambridge / IDP Standard Academic Crest
 * A modern, prestigious emblem featuring an open academic folio and precision nib
 * with deep slate and vermilion accents. 100% vector SVG, crisp on all displays.
 */
export default function AcademicLogo({
  width = 32,
  height = 32,
  className = '',
  glow = false,
}: AcademicLogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 relative ${className}`}
      style={{ width, height }}
      aria-label="CD-IELTS Writing Academic Logo"
    >
      <svg
        viewBox="0 0 48 48"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          <linearGradient id="academicShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="academicVermilionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D2E" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="academicGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          {glow && (
            <filter id="academicLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        {/* Shield Container */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          fill="url(#academicShieldGrad)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          filter={glow ? 'url(#academicLogoGlow)' : undefined}
        />

        {/* Stylized Open Book Folio (Cambridge Academic Standard) */}
        {/* Left Page */}
        <path
          d="M11 28.5C14.5 27 19.5 27 23 29V17C19.5 15 14.5 15 11 17V28.5Z"
          fill="rgba(255, 255, 255, 0.88)"
        />
        {/* Right Page */}
        <path
          d="M37 28.5C33.5 27 28.5 27 25 29V17C28.5 15 33.5 15 37 17V28.5Z"
          fill="rgba(255, 255, 255, 0.98)"
        />
        {/* Center Book Spine */}
        <line
          x1="24"
          y1="16.5"
          x2="24"
          y2="29.5"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Precision Pen Nib Rising from Center (Vermilion & Gold) */}
        <path
          d="M24 10L27.5 17H20.5L24 10Z"
          fill="url(#academicVermilionGrad)"
        />
        {/* Nib Breather Hole & Slit */}
        <circle cx="24" cy="14.5" r="0.9" fill="#F8FAFC" />
        <line x1="24" y1="10" x2="24" y2="13.6" stroke="#F8FAFC" strokeWidth="0.8" />

        {/* Golden Base Arc / Foundation Ribbon */}
        <path
          d="M13 34C17.5 32.5 30.5 32.5 35 34"
          stroke="url(#academicGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
