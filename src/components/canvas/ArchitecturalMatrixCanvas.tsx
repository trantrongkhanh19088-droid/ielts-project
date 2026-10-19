'use client';

import React, { useEffect, useRef } from 'react';

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

/**
 * Authentic Japanese Seigaiha (青海波) Ocean Wave Watermark Canvas
 * - Generates classic interlocking Seigaiha scalloped fan waves matching authentic archival Japanese pattern.
 * - Each wave unit consists of 4 concentric arcs + 10 radiating kiku spokes in the outer band.
 * - Monochromatic and tranquil aesthetic ("không màu mè"):
 *     * Light Mode: warm sumi charcoal ink (#1C1917) on archival washi paper (#FAF8F5).
 *     * Dark Mode: luminous silver-ivory (#F4F4F0) on deep carbon ink (#0C0C0E).
 * - Tactile hover interaction ("chỉ làm nổi vân sóng"):
 *     * Proximity spotlight highlights line opacity (from 0.075 up to 0.55).
 *     * Embosses stroke thickness (from 1.0px up to 1.75px) under the cursor.
 *     * Subtle micro-swell (2px) gives tactile water tension without distortion.
 * - Click ripple: expanding water drop pulse that accentuates wave ridges across the grid.
 */
export default function ArchitecturalMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates with smooth lerp physics
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      hasMoved: false,
    };

    // Active ripples pool from clicks
    const ripples: WaveRipple[] = [];

    // Scroll parallax tracking
    let scrollY = window.scrollY;

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
      mouse.hasMoved = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Spawn subtle water ripple wave on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.45,
        speed: 6.5,
        strength: 1.0,
      });
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth mouse interpolation
      if (mouse.hasMoved) {
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
      }

      // Update active ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.strength *= 0.965;
        if (r.strength < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Detect theme dynamically on each frame
      const isDark = document.documentElement.classList.contains('dark');

      // Monochromatic color specifications
      // Light Mode: archival washi paper + sumi ink
      // Dark Mode: deep carbon + moonlight silver ivory
      const bgColor = isDark ? '#0C0C0E' : '#FAF8F5';
      const strokeRgb = isDark ? '244, 244, 240' : '28, 25, 23';
      const baseAlpha = 0.075;
      const highlightAlpha = isDark ? 0.62 : 0.52;

      // Fill canvas background solid
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Seigaiha geometric dimensions
      // R: outer radius of each wave crest fan
      const R = width < 640 ? 38 : 46;
      const stepX = R * 2;
      const stepY = R * 0.5;

      // Concentric arc radii within each fan
      const r0 = R * 0.20; // innermost loop
      const r1 = R * 0.40; // middle-inner loop
      const r2 = R * 0.60; // inner boundary of spoke band
      const r3 = R * 0.82; // outer boundary of spoke band
      const SPOKE_DIVISIONS = 10; // 9 interior radiating spokes

      const HOVER_RADIUS = 210;
      const RIPPLE_BAND = 60;

      // Subtle parallax offset with scroll
      const parallaxY = (scrollY * 0.2) % (stepY * 2);

      // Calculate row bounds covering entire viewport + bleed margins
      const startRow = Math.floor((-R - parallaxY) / stepY) - 1;
      const endRow = Math.ceil((height + R - parallaxY) / stepY) + 2;

      // Render top to bottom so each row cleanly overlaps the row above it
      for (let row = startRow; row <= endRow; row++) {
        const cy = row * stepY + parallaxY;
        const isOdd = Math.abs(row % 2) === 1;
        const startX = isOdd ? -R : 0;

        // Subtle ambient wave breathing (calm organic drift)
        const ambientOffset = Math.sin(time * 0.8 + row * 0.35) * 0.55;

        for (let cx = startX - stepX; cx <= width + stepX * 2; cx += stepX) {
          // Distance to mouse cursor
          let hoverFactor = 0;
          if (mouse.hasMoved) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < HOVER_RADIUS) {
              const t = 1 - dist / HOVER_RADIUS;
              hoverFactor = t * t * (3 - 2 * t); // smoothstep
            }
          }

          // Distance to active click ripples
          let rippleBoost = 0;
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i];
            const dist = Math.hypot(cx - rip.x, cy - rip.y);
            const diff = Math.abs(dist - rip.radius);
            if (diff < RIPPLE_BAND) {
              const ripT = Math.cos((diff / RIPPLE_BAND) * (Math.PI / 2));
              rippleBoost += ripT * rip.strength * 0.32;
            }
          }

          const totalActivation = Math.min(1.0, hoverFactor + rippleBoost);

          // Physical parameters based on activation ("làm nổi vân sóng")
          // 1. Line opacity elevates gracefully under the cursor
          const alpha = baseAlpha + (highlightAlpha - baseAlpha) * totalActivation;
          // 2. Line width thickens subtly to emboss the ridges
          const lineWidth = 1.0 + 0.75 * totalActivation;
          // 3. Tactile micro-swell: wave crest gently rises by up to 2px
          const swellY = -2.2 * totalActivation;

          const drawX = cx;
          const drawY = cy + swellY + ambientOffset;

          // STEP 1: Mask background inside the semi-circle to cleanly overlap rows behind it
          ctx.beginPath();
          ctx.arc(drawX, drawY, R + 0.5, Math.PI, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fillStyle = bgColor;
          ctx.fill();

          // STEP 2: Draw Seigaiha concentric arcs and radial spokes
          ctx.beginPath();

          // Outermost rim arc
          ctx.moveTo(drawX - R, drawY);
          ctx.arc(drawX, drawY, R, Math.PI, 2 * Math.PI, false);

          // Outer spoke bounding arc
          ctx.moveTo(drawX - r3, drawY);
          ctx.arc(drawX, drawY, r3, Math.PI, 2 * Math.PI, false);

          // Inner spoke bounding arc
          ctx.moveTo(drawX - r2, drawY);
          ctx.arc(drawX, drawY, r2, Math.PI, 2 * Math.PI, false);

          // Middle-inner concentric arc
          ctx.moveTo(drawX - r1, drawY);
          ctx.arc(drawX, drawY, r1, Math.PI, 2 * Math.PI, false);

          // Innermost concentric arc
          ctx.moveTo(drawX - r0, drawY);
          ctx.arc(drawX, drawY, r0, Math.PI, 2 * Math.PI, false);

          // Radiating kiku spokes between r2 and r3
          for (let k = 1; k < SPOKE_DIVISIONS; k++) {
            const angle = Math.PI + (k / SPOKE_DIVISIONS) * Math.PI;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            ctx.moveTo(drawX + r2 * cos, drawY + r2 * sin);
            ctx.lineTo(drawX + r3 * cos, drawY + r3 * sin);
          }

          ctx.strokeStyle = `rgba(${strokeRgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
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
