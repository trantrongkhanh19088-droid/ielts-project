'use client';

import React from 'react';

export function PixelCanvas({
  children,
  size = 64,
  viewBox = '0 0 32 32',
  className = '',
}: {
  children: React.ReactNode;
  size?: number;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={`pixelated select-none overflow-visible ${className}`}
      style={{
        shapeRendering: 'crispEdges',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export interface PixelProps extends React.SVGProps<SVGRectElement> {
  x: number;
  y: number;
  w?: number;
  h?: number;
  c: string;
}

export function P({
  x,
  y,
  w = 1,
  h = 1,
  c,
  stroke,
  strokeWidth,
  opacity,
  ...rest
}: PixelProps) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={c}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      {...rest}
    />
  );
}

export function CharacterImage({
  src,
  alt,
  size = 64,
  className = '',
  glowColor,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-visible ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none drop-shadow-md transition-transform duration-200"
        style={{
          filter: glowColor ? `drop-shadow(0 2px 10px ${glowColor})` : undefined,
        }}
        loading="lazy"
      />
    </div>
  );
}
