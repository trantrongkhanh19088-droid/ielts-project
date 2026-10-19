'use client';

import React, { useEffect, useRef } from 'react';

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  decay: number;
}

/**
 * Procedural Interactive Ocean Wave ("Vằn Sóng Biển") & Architectural Matrix Canvas (60 FPS)
 * Features:
 * 1. Multi-layered fluid oceanic wave ribbons ("vằn sóng biển") with parallel contour striations.
 * 2. Stylized Japanese Seigaiha wave crest arcs oscillating harmonically.
 * 3. Real-time cursor hydrodynamic displacement & spring recovery.
 * 4. Interactive click ripples that propagate outward and deform wave ribbons.
 * 5. Architectural coordinate dot matrix and micro-crosshairs that react to mouse proximity.
 * 6. Responsive to Light, Dark, and Japanese themes.
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

    // Mouse coordinates with smooth spring interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      vx: 0,
      vy: 0,
      lastX: -1000,
      lastY: -1000,
    };

    // Active ripples pool from clicks or rapid movements
    const ripples: WaveRipple[] = [];

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

    const handleMouseDown = (e: MouseEvent) => {
      // Spawn shockwave ripple on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.45,
        speed: 6.5,
        strength: 24,
        decay: 1.0,
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.5;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const GRID_SPACING = 38;

    const render = () => {
      time += 0.018;

      // Mouse velocity calculation and smooth interpolation
      mouse.vx = mouse.targetX - mouse.x;
      mouse.vy = mouse.targetY - mouse.y;
      mouse.x += mouse.vx * 0.12;
      mouse.y += mouse.vy * 0.12;

      // Spawn subtle wake ripple on fast movement
      const speed = Math.hypot(mouse.vx, mouse.vy);
      if (speed > 45 && Math.random() < 0.25 && mouse.x > 0 && mouse.y > 0) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          radius: 0,
          maxRadius: 180,
          speed: 4.5,
          strength: 12,
          decay: 1.0,
        });
      }

      // Update active ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.decay = Math.max(0, 1 - r.radius / r.maxRadius);
        if (r.decay <= 0.01) {
          ripples.splice(i, 1);
        }
      }

      // Dampen scroll velocity
      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

      ctx.clearRect(0, 0, width, height);

      // Check current active theme
      const isDark = document.documentElement.classList.contains('dark');
      const isJapanese = document.documentElement.classList.contains('japanese');

      const baseTone = isDark ? '244, 244, 240' : '20, 24, 33';
      const waveTone = isDark ? '244, 244, 240' : '30, 41, 59';
      const vermilionTone = '255, 59, 29';
      const oceanBlueTone = isDark ? '56, 189, 248' : '2, 132, 199';

      // =========================================================================
      // 1. PROCEDURAL OCEAN WAVE RIBBONS ("VẰN SÓNG BIỂN")
      // =========================================================================
      // 4 major oceanic wave strata traversing the canvas
      const waveStrata = [
        { baseYRatio: 0.18, freq: 0.0028, amp: 26, speed: 0.85, phase: 0.2 },
        { baseYRatio: 0.42, freq: 0.0035, amp: 32, speed: -0.65, phase: 2.1 },
        { baseYRatio: 0.68, freq: 0.0026, amp: 28, speed: 0.75, phase: 4.3 },
        { baseYRatio: 0.92, freq: 0.0032, amp: 30, speed: -0.9, phase: 1.2 },
      ];

      // Number of parallel contour striations per wave ribbon ("vằn sóng")
      const STRIATIONS_PER_RIBBON = 4;
      const STRIATION_GAP = 7;
      const STEP_X = 14;

      for (let sIdx = 0; sIdx < waveStrata.length; sIdx++) {
        const stratum = waveStrata[sIdx];
        const stratumBaseY = height * stratum.baseYRatio;

        for (let line = 0; line < STRIATIONS_PER_RIBBON; line++) {
          const lineOffset = (line - (STRIATIONS_PER_RIBBON - 1) / 2) * STRIATION_GAP;

          ctx.beginPath();
          let started = false;

          for (let x = 0; x <= width + STEP_X; x += STEP_X) {
            // Harmonic wave calculation
            const wave1 = Math.sin(x * stratum.freq + time * stratum.speed + stratum.phase) * stratum.amp;
            const wave2 = Math.cos(x * stratum.freq * 2.1 - time * stratum.speed * 0.7) * (stratum.amp * 0.45);
            const scrollWave = Math.sin(x * 0.004 + time) * (scrollVelocity * 0.6);

            let y = stratumBaseY + lineOffset + wave1 + wave2 + scrollWave;

            // Interactive Ripple Disturbances
            for (let i = 0; i < ripples.length; i++) {
              const rip = ripples[i];
              const dx = x - rip.x;
              const dy = y - rip.y;
              const dist = Math.hypot(dx, dy);
              const waveFrontDist = Math.abs(dist - rip.radius);
              if (waveFrontDist < 75) {
                const envelope = Math.cos((waveFrontDist / 75) * (Math.PI / 2));
                const rippleSine = Math.sin((dist - rip.radius) * 0.14);
                y += rippleSine * rip.strength * envelope * rip.decay;
              }
            }

            // Mouse Hydrodynamic Vector Warp
            const mdx = x - mouse.x;
            const mdy = y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            const mouseInteractionRadius = 190;

            if (mDist < mouseInteractionRadius) {
              const factor = (1 - mDist / mouseInteractionRadius);
              // Smooth water parting / swelling effect around cursor
              const pushSign = mdy >= 0 ? 1 : -1;
              y += pushSign * Math.pow(factor, 1.8) * 32;
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Compute distance of this line from cursor for proximity glow
          const distToCursorY = Math.abs(stratumBaseY - mouse.y);
          const isNearCursor = distToCursorY < 220 && mouse.x > 0;
          const proximityAlphaBoost = isNearCursor
            ? Math.max(0, 1 - distToCursorY / 220) * 0.16
            : 0;

          // Stylized alpha based on line depth in ribbon
          const baseAlpha = (line === 0 || line === STRIATIONS_PER_RIBBON - 1)
            ? (isDark ? 0.04 : 0.045)
            : (isDark ? 0.07 : 0.075);

          const finalAlpha = Math.min(0.4, baseAlpha + proximityAlphaBoost);

          // Color selection
          let strokeColor = `rgba(${waveTone}, ${finalAlpha})`;
          if (isNearCursor && proximityAlphaBoost > 0.05) {
            strokeColor = sIdx % 2 === 0
              ? `rgba(${oceanBlueTone}, ${finalAlpha + 0.1})`
              : `rgba(${vermilionTone}, ${finalAlpha + 0.08})`;
          } else if (isJapanese) {
            strokeColor = `rgba(225, 29, 72, ${finalAlpha * 0.9})`;
          }

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = line === 1 ? 1.25 : 0.85;
          ctx.stroke();
        }

        // =========================================================================
        // 2. SEIGAIHA CONCENTRIC CREST ARCS (TRADITIONAL WAVE TEXTURE)
        // =========================================================================
        const ARC_SPACING = 130;
        const startX = ((time * stratum.speed * 20) % ARC_SPACING);

        for (let arcX = startX; arcX < width + ARC_SPACING; arcX += ARC_SPACING) {
          const waveCenter = stratumBaseY + Math.sin(arcX * stratum.freq + time * stratum.speed + stratum.phase) * stratum.amp;
          const distToMouse = Math.hypot(arcX - mouse.x, waveCenter - mouse.y);
          const isNearArc = distToMouse < 180;

          const arcAlpha = isNearArc
            ? (isDark ? 0.22 : 0.2)
            : (isDark ? 0.05 : 0.055);

          const arcColor = isNearArc
            ? `rgba(${oceanBlueTone}, ${arcAlpha})`
            : `rgba(${waveTone}, ${arcAlpha})`;

          ctx.strokeStyle = arcColor;
          ctx.lineWidth = 0.8;

          // Draw 3 nested Seigaiha concentric crest arcs
          for (let radius = 10; radius <= 22; radius += 6) {
            ctx.beginPath();
            ctx.arc(arcX, waveCenter, radius, Math.PI * 0.95, Math.PI * 2.05);
            ctx.stroke();
          }
        }
      }

      // =========================================================================
      // 3. ARCHITECTURAL MATRIX DOT GRID & INTERACTIVE CROSSHAIRS
      // =========================================================================
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        const baseY = r * GRID_SPACING;
        const waveOffset = Math.sin(time * 1.5 + r * 0.25) * (scrollVelocity * 0.35);

        for (let c = 0; c < cols; c++) {
          const baseX = c * GRID_SPACING;

          // Proximity calculation to cursor
          const dx = baseX - mouse.x;
          const dy = (baseY + waveOffset) - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 170;
          const maxDistSq = maxDist * maxDist;

          let px = baseX;
          let py = baseY + waveOffset;
          let dotAlpha = isDark ? 0.045 : 0.05;
          let radius = 0.9;
          let dotColor = baseTone;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxDist;
            const push = factor * 16;

            px += (dx / (dist || 1)) * push;
            py += (dy / (dist || 1)) * push;
            dotAlpha = 0.05 + factor * 0.32;
            radius = 1.0 + factor * 1.6;

            if ((c + r) % 2 === 0) {
              dotColor = vermilionTone; // Vermilion accent
            } else {
              dotColor = oceanBlueTone; // Ocean blue accent
            }
          }

          // Draw matrix coordinate dot
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${dotAlpha})`;
          ctx.fill();

          // Micro architectural crosshairs at major intersections (every 6th dot)
          if (c % 6 === 0 && r % 6 === 0) {
            ctx.strokeStyle = `rgba(${baseTone}, ${Math.max(dotAlpha, isDark ? 0.08 : 0.09)})`;
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
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-700 select-none"
      aria-hidden="true"
    />
  );
}
