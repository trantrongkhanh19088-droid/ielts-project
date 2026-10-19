'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Authentic Seigaiha (青海波) Static Ocean Wave Canvas
 * - 100% static & zero-overhead: rendered ONCE on mount / resize / theme switch.
 * - Zero requestAnimationFrame loops, zero mouse event listeners, zero CPU usage.
 * - Clean, tranquil traditional ocean wave pattern matching user's requested background.
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
      const alpha = isDark ? 0.085 : 0.08;

      // Solid canvas background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Seigaiha geometry
      const R = width < 640 ? 38 : 46;
      const stepX = R * 2;
      const stepY = R * 0.5;

      const r0 = R * 0.20;
      const r1 = R * 0.40;
      const r2 = R * 0.60;
      const r3 = R * 0.82;
      const SPOKE_DIVISIONS = 10;

      const startRow = Math.floor(-R / stepY) - 1;
      const endRow = Math.ceil((height + R) / stepY) + 2;

      for (let row = startRow; row <= endRow; row++) {
        const cy = row * stepY;
        const isOdd = Math.abs(row % 2) === 1;
        const startX = isOdd ? -R : 0;

        for (let cx = startX - stepX; cx <= width + stepX * 2; cx += stepX) {
          // Mask background inside semi-circle
          ctx.beginPath();
          ctx.arc(cx, cy, R + 0.5, Math.PI, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fillStyle = bgColor;
          ctx.fill();

          // Draw Seigaiha concentric arcs and spokes
          ctx.beginPath();

          // Outermost rim
          ctx.moveTo(cx - R, cy);
          ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI, false);

          // Outer spoke bounding arc
          ctx.moveTo(cx - r3, cy);
          ctx.arc(cx, cy, r3, Math.PI, 2 * Math.PI, false);

          // Inner spoke bounding arc
          ctx.moveTo(cx - r2, cy);
          ctx.arc(cx, cy, r2, Math.PI, 2 * Math.PI, false);

          // Middle-inner arc
          ctx.moveTo(cx - r1, cy);
          ctx.arc(cx, cy, r1, Math.PI, 2 * Math.PI, false);

          // Innermost arc
          ctx.moveTo(cx - r0, cy);
          ctx.arc(cx, cy, r0, Math.PI, 2 * Math.PI, false);

          // Radiating kiku spokes
          for (let k = 1; k < SPOKE_DIVISIONS; k++) {
            const angle = Math.PI + (k / SPOKE_DIVISIONS) * Math.PI;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            ctx.moveTo(cx + r2 * cos, cy + r2 * sin);
            ctx.lineTo(cx + r3 * cos, cy + r3 * sin);
          }

          ctx.strokeStyle = `rgba(${strokeRgb}, ${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
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
