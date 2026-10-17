'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SakuraCanvasProps {
  petalCount?: number;
  enabled?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swingAngle: number;
  swingSpeed: number;
  swingRadius: number;
  flipAngle: number;
  flipSpeed: number;
  opacity: number;
  color: string;
}

const SAKURA_COLORS = [
  'rgba(255, 183, 197, 0.85)', // Classic Sakura Pink
  'rgba(255, 192, 203, 0.75)', // Soft Rose
  'rgba(254, 205, 211, 0.80)', // Peach Pink
  'rgba(255, 228, 230, 0.90)', // Pale Cherry Blossom
  'rgba(244, 114, 182, 0.65)', // Deep Blossom
];

export default function SakuraCanvas({
  petalCount = 30,
  enabled = true,
}: SakuraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(enabled);

  // Sync with global localStorage and custom event
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cd_ielts_sakura_enabled');
      if (stored !== null) {
        setIsEnabled(stored === 'true');
      }
    } catch {}

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (typeof customEvent.detail?.enabled === 'boolean') {
        setIsEnabled(customEvent.detail.enabled);
      }
    };

    window.addEventListener('sakura-toggle', handleToggle);
    return () => window.removeEventListener('sakura-toggle', handleToggle);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize Petals
    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 8, // 8px to 16px
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingRadius: Math.random() * 1.5 + 0.5,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.5,
        color: SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
      });
    }

    // Draw single 5-pointed curved sakura petal with notch
    const drawPetal = (p: Petal) => {
      ctx.save();
      const currentX = p.x + Math.sin(p.swingAngle) * p.swingRadius * 15;
      ctx.translate(currentX, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      // 3D Flip effect along Y-axis
      const scaleX = Math.cos(p.flipAngle);
      ctx.scale(scaleX, 1);

      ctx.fillStyle = p.color;
      ctx.beginPath();
      // Organic teardrop shape with notched tip
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size * 0.8, -p.size * 0.5, -p.size * 0.9, -p.size * 1.4, -p.size * 0.3, -p.size * 1.8);
      // Center tip notch
      ctx.lineTo(0, -p.size * 1.5);
      ctx.lineTo(p.size * 0.3, -p.size * 1.8);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 1.4, p.size * 0.8, -p.size * 0.5, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (isDocumentVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;
          p.swingAngle += p.swingSpeed;
          p.flipAngle += p.flipSpeed;

          // Recycle petal when it falls below screen
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) {
            p.x = -20;
          } else if (p.x < -20) {
            p.x = width + 20;
          }

          drawPetal(p);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isEnabled, petalCount]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ opacity: 0.9 }}
    />
  );
}
