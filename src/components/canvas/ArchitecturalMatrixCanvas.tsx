'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Procedural Architectural Coordinate Matrix Canvas (60 FPS)
 * Pure procedural mathematics: dot-matrix grid, cursor proximity vector warp,
 * and scroll velocity harmonic oscillation. Automatically reacts to Light / Dark mode!
 */
export default function ArchitecturalMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates with smoothing
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.45;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const GRID_SPACING = 36;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Dampen scroll velocity
      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

      ctx.clearRect(0, 0, width, height);

      // Check current active theme
      const isDark = document.documentElement.classList.contains('dark');
      const baseTone = isDark ? '244, 244, 240' : '20, 24, 33';
      const baseAlpha = isDark ? 0.04 : 0.05;

      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        const baseY = r * GRID_SPACING;
        // Subtle harmonic wave based on scroll velocity and time
        const waveOffset = Math.sin(time * 2 + r * 0.3) * (scrollVelocity * 0.4);

        for (let c = 0; c < cols; c++) {
          const baseX = c * GRID_SPACING;

          // Proximity calculation to cursor
          const dx = baseX - mouse.x;
          const dy = (baseY + waveOffset) - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 180;
          const maxDistSq = maxDist * maxDist;

          let px = baseX;
          let py = baseY + waveOffset;
          let alpha = baseAlpha;
          let radius = 1.0;
          let color = baseTone;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxDist;
            const push = factor * 14;

            px += (dx / (dist || 1)) * push;
            py += (dy / (dist || 1)) * push;
            alpha = baseAlpha + factor * 0.28;
            radius = 1.0 + factor * 1.5;

            // Subtle color tinting near cursor (mix of Torii Vermilion and Emerald)
            if ((c + r) % 2 === 0) {
              color = isDark ? '255, 59, 29' : '217, 56, 41'; // Vermilion
            } else {
              color = '16, 185, 129'; // Emerald
            }
          }

          // Draw architectural coordinate dot
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fill();

          // Draw micro architectural crosshairs at major intersections (every 6th dot)
          if (c % 6 === 0 && r % 6 === 0) {
            ctx.strokeStyle = `rgba(${baseTone}, ${Math.max(alpha, isDark ? 0.08 : 0.09)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px - 3, py);
            ctx.lineTo(px + 3, py);
            ctx.moveTo(px, py - 3);
            ctx.lineTo(px, py + 3);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
