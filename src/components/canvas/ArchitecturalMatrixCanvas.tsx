'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Modern Architectural Fluid Ocean Wave Contours Canvas
 * - 100% static & zero-overhead: rendered ONCE on mount / resize / theme switch.
 * - Clean, elegant modern topographical wave ribbons (neutral academic/architectural look).
 * - Zero Japanese motifs, zero CPU loops, silky fast.
 */
export default function ArchitecturalMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains('dark');
      const bgColor = isDark ? '#0C0C0E' : '#FAF8F5';
      const strokeRgb = isDark ? '244, 244, 240' : '28, 25, 23';
      const strokeAlpha = isDark ? 0.045 : 0.04;

      // Solid background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Draw modern fluid architectural wave contour lines
      const WAVE_COUNT = 18;
      const stepY = height / (WAVE_COUNT - 1);
      const sampleStep = 24;

      ctx.strokeStyle = `rgba(${strokeRgb}, ${strokeAlpha})`;
      ctx.lineWidth = 1.0;

      for (let i = 0; i < WAVE_COUNT; i++) {
        const baseY = i * stepY;
        const phase = i * 0.45;
        const frequency1 = 0.0028;
        const frequency2 = 0.0055;
        const amplitude1 = 18 + (i % 3) * 6;
        const amplitude2 = 10 + (i % 4) * 4;

        ctx.beginPath();
        let isFirst = true;

        for (let x = -20; x <= width + 20; x += sampleStep) {
          const y =
            baseY +
            Math.sin(x * frequency1 + phase) * amplitude1 +
            Math.cos(x * frequency2 - phase * 0.5) * amplitude2;

          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      ctx.restore();
    };

    draw();

    // Redraw on window resize
    window.addEventListener('resize', draw, { passive: true });

    // Redraw on theme change (dark/light)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          draw();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', draw);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
