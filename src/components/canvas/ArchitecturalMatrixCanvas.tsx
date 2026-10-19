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

interface WaveParticle {
  x: number;
  y: number;
  baseYRatio: number;
  speedX: number;
  size: number;
  alpha: number;
  phase: number;
}

/**
 * Procedural Interactive Ocean Wave ("Vằn Sóng Biển") & Coordinate Matrix Canvas (60 FPS)
 * - 5 horizontal multi-layered ocean wave ribbons ("vằn sóng biển"), each with 4-5 parallel wave contours.
 * - Stylized traditional Seigaiha concentric wave crest arcs that ride the wave undulations.
 * - Interactive hydrodynamic mouse displacement: waves warp, part, and glow near the cursor.
 * - Interactive click ripples that propagate outward and deform the wave bands with water physics.
 * - Floating wave crest particles that drift with the current and scatter from cursor.
 * - Architectural coordinate dot matrix and micro crosshairs.
 * - High contrast & visibility in both Light Mode (crisp sumi ink & marine accents) and Dark Mode (luminous cyan & vermilion).
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

    // Mouse coordinates with smooth spring physics
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      vx: 0,
      vy: 0,
      hasMoved: false,
    };

    // Active ripples pool from clicks or quick movements
    const ripples: WaveRipple[] = [];

    // Floating wave crest particles
    const particles: WaveParticle[] = [];
    const PARTICLE_COUNT = 32;

    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseYRatio: 0.12 + Math.random() * 0.8,
          speedX: 0.4 + Math.random() * 0.8,
          size: 1.5 + Math.random() * 2.0,
          alpha: 0.25 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles(width, height);
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
      // Spawn large expanding water shockwave on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.55,
        speed: 7.0,
        strength: 32,
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
    const GRID_SPACING = 42;

    const render = () => {
      time += 0.018;

      // Mouse smoothing
      if (mouse.hasMoved) {
        mouse.vx = mouse.targetX - mouse.x;
        mouse.vy = mouse.targetY - mouse.y;
        mouse.x += mouse.vx * 0.14;
        mouse.y += mouse.vy * 0.14;

        // Wake ripples on fast drag/movement
        const speed = Math.hypot(mouse.vx, mouse.vy);
        if (speed > 40 && Math.random() < 0.22 && mouse.x > 0 && mouse.y > 0) {
          ripples.push({
            x: mouse.x,
            y: mouse.y,
            radius: 0,
            maxRadius: 190,
            speed: 5.0,
            strength: 14,
            decay: 1.0,
          });
        }
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

      // Check current theme
      const isDark = document.documentElement.classList.contains('dark');
      const isJapanese = document.documentElement.classList.contains('japanese');

      // High-contrast, elegant color palette
      // Light Mode: Sumi ink (slate-800) with deep oceanic cyan and torii vermilion
      // Dark Mode: Luminous silver-ivory with vibrant cyan and fiery vermilion
      const baseTone = isDark ? '244, 244, 240' : '15, 23, 42';
      const waveTone = isDark ? '226, 232, 240' : '30, 41, 59';
      const vermilionTone = '255, 59, 29';
      const oceanBlueTone = isDark ? '56, 189, 248' : '2, 132, 199';

      // =========================================================================
      // 1. PROCEDURAL OCEAN WAVE RIBBONS ("VẰN SÓNG BIỂN")
      // =========================================================================
      // 5 oceanic wave strata covering top to bottom
      const waveStrata = [
        { baseYRatio: 0.14, freq: 0.0026, amp: 28, speed: 0.85, phase: 0.2 },
        { baseYRatio: 0.33, freq: 0.0034, amp: 34, speed: -0.7, phase: 1.8 },
        { baseYRatio: 0.52, freq: 0.0028, amp: 30, speed: 0.9, phase: 3.5 },
        { baseYRatio: 0.72, freq: 0.0032, amp: 32, speed: -0.65, phase: 5.1 },
        { baseYRatio: 0.90, freq: 0.0025, amp: 26, speed: 0.8, phase: 2.4 },
      ];

      const STRIATIONS_PER_RIBBON = 5; // 5 parallel wave lines per ribbon
      const STRIATION_GAP = 7.5;
      const STEP_X = 12;

      for (let sIdx = 0; sIdx < waveStrata.length; sIdx++) {
        const stratum = waveStrata[sIdx];
        const stratumBaseY = height * stratum.baseYRatio;

        for (let line = 0; line < STRIATIONS_PER_RIBBON; line++) {
          const lineOffset = (line - (STRIATIONS_PER_RIBBON - 1) / 2) * STRIATION_GAP;

          ctx.beginPath();
          let started = false;

          for (let x = 0; x <= width + STEP_X; x += STEP_X) {
            // Harmonic wave formula
            const wave1 = Math.sin(x * stratum.freq + time * stratum.speed + stratum.phase) * stratum.amp;
            const wave2 = Math.cos(x * stratum.freq * 2.2 - time * stratum.speed * 0.65) * (stratum.amp * 0.42);
            const scrollWave = Math.sin(x * 0.0035 + time) * (scrollVelocity * 0.5);

            let y = stratumBaseY + lineOffset + wave1 + wave2 + scrollWave;

            // Ripple Disturbances from Clicks
            for (let i = 0; i < ripples.length; i++) {
              const rip = ripples[i];
              const dx = x - rip.x;
              const dy = y - rip.y;
              const dist = Math.hypot(dx, dy);
              const waveFrontDist = Math.abs(dist - rip.radius);
              if (waveFrontDist < 85) {
                const envelope = Math.cos((waveFrontDist / 85) * (Math.PI / 2));
                const rippleSine = Math.sin((dist - rip.radius) * 0.12);
                y += rippleSine * rip.strength * envelope * rip.decay;
              }
            }

            // Mouse Hydrodynamic Displacement
            const mdx = x - mouse.x;
            const mdy = y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            const mouseInteractionRadius = 210;

            if (mDist < mouseInteractionRadius && mouse.x > 0) {
              const factor = 1 - mDist / mouseInteractionRadius;
              const pushSign = mdy >= 0 ? 1 : -1;
              y += pushSign * Math.pow(factor, 1.7) * 36;
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Distance from cursor to wave stratum
          const distToCursorY = Math.abs(stratumBaseY - mouse.y);
          const isNearCursor = distToCursorY < 240 && mouse.x > 0;
          const proximityBoost = isNearCursor ? Math.max(0, 1 - distToCursorY / 240) * 0.35 : 0;

          // Clear, visible opacity:
          // Middle lines of ribbon are solid & distinct; outer lines provide texture
          const isCenterLine = line === 2;
          const baseAlpha = isCenterLine
            ? (isDark ? 0.22 : 0.24)
            : (line === 1 || line === 3)
            ? (isDark ? 0.16 : 0.18)
            : (isDark ? 0.11 : 0.12);

          const finalAlpha = Math.min(0.85, baseAlpha + proximityBoost);

          // Color selection
          let strokeColor = `rgba(${waveTone}, ${finalAlpha})`;
          if (isNearCursor && proximityBoost > 0.08) {
            strokeColor = sIdx % 2 === 0
              ? `rgba(${oceanBlueTone}, ${finalAlpha + 0.15})`
              : `rgba(${vermilionTone}, ${finalAlpha + 0.12})`;
          } else if (isJapanese) {
            strokeColor = `rgba(225, 29, 72, ${finalAlpha * 0.95})`;
          } else if (sIdx % 2 === 1 && line === 2) {
            // Subtle tinted accent line for oceanic depth
            strokeColor = `rgba(${oceanBlueTone}, ${finalAlpha * 1.1})`;
          }

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = isCenterLine ? 1.7 : 1.1;
          ctx.stroke();
        }

        // =========================================================================
        // 2. SEIGAIHA CONCENTRIC CREST ARCS (JAPANESE OCEANIC PATTERN)
        // =========================================================================
        const ARC_SPACING = 120;
        const startX = ((time * stratum.speed * 22) % ARC_SPACING);

        for (let arcX = startX; arcX < width + ARC_SPACING; arcX += ARC_SPACING) {
          const waveCenter = stratumBaseY + Math.sin(arcX * stratum.freq + time * stratum.speed + stratum.phase) * stratum.amp;
          const distToMouse = Math.hypot(arcX - mouse.x, waveCenter - mouse.y);
          const isNearArc = distToMouse < 200 && mouse.x > 0;

          const arcAlpha = isNearArc
            ? (isDark ? 0.45 : 0.4)
            : (isDark ? 0.14 : 0.15);

          const arcColor = isNearArc
            ? `rgba(${oceanBlueTone}, ${arcAlpha})`
            : `rgba(${waveTone}, ${arcAlpha})`;

          ctx.strokeStyle = arcColor;
          ctx.lineWidth = 1.1;

          // Draw 3 nested Seigaiha concentric crest arcs
          for (let radius = 12; radius <= 24; radius += 6) {
            ctx.beginPath();
            ctx.arc(arcX, waveCenter, radius, Math.PI * 0.92, Math.PI * 2.08);
            ctx.stroke();
          }
        }
      }

      // =========================================================================
      // 3. FLOATING WAVE CREST PARTICLES / FOAM SPARKLES
      // =========================================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        if (p.x > width + 20) p.x = -20;

        // Follow wave undulation
        const currentWaveY = height * p.baseYRatio + Math.sin(p.x * 0.003 + time + p.phase) * 25;
        p.y = currentWaveY;

        // Scatter if mouse is near
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let pRadius = p.size;
        let pAlpha = p.alpha;
        let pColor = oceanBlueTone;

        if (dist < 140 && mouse.x > 0) {
          const push = (1 - dist / 140) * 20;
          p.x += (dx / (dist || 1)) * push * 0.1;
          p.y += (dy / (dist || 1)) * push * 0.1;
          pRadius = p.size * 1.5;
          pAlpha = Math.min(0.9, p.alpha + 0.4);
          pColor = vermilionTone;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, pRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pColor}, ${pAlpha})`;
        ctx.fill();
      }

      // =========================================================================
      // 4. ARCHITECTURAL MATRIX COORDINATE DOTS & CROSSHAIRS
      // =========================================================================
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        const baseY = r * GRID_SPACING;
        const waveOffset = Math.sin(time * 1.4 + r * 0.28) * (scrollVelocity * 0.35);

        for (let c = 0; c < cols; c++) {
          const baseX = c * GRID_SPACING;

          const dx = baseX - mouse.x;
          const dy = (baseY + waveOffset) - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 180;
          const maxDistSq = maxDist * maxDist;

          let px = baseX;
          let py = baseY + waveOffset;
          let dotAlpha = isDark ? 0.09 : 0.1;
          let radius = 1.1;
          let dotColor = baseTone;

          if (distSq < maxDistSq && mouse.x > 0) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxDist;
            const push = factor * 18;

            px += (dx / (dist || 1)) * push;
            py += (dy / (dist || 1)) * push;
            dotAlpha = 0.15 + factor * 0.55;
            radius = 1.1 + factor * 2.0;

            if ((c + r) % 2 === 0) {
              dotColor = vermilionTone; // Torii Vermilion
            } else {
              dotColor = oceanBlueTone; // Ocean Blue
            }
          }

          // Draw dot
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${dotAlpha})`;
          ctx.fill();

          // Architectural crosshairs at every 6th dot
          if (c % 6 === 0 && r % 6 === 0) {
            ctx.strokeStyle = `rgba(${baseTone}, ${Math.max(dotAlpha, isDark ? 0.16 : 0.18)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(px - 4, py);
            ctx.lineTo(px + 4, py);
            ctx.moveTo(px, py - 4);
            ctx.lineTo(px, py + 4);
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
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
