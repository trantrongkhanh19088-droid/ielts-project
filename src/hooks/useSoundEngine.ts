'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Procedural Web Audio API Sound Engine
 * Zero samples, zero external APIs, zero latency.
 * Provides mechanical tactile feedback, ambient chimes, sub-bass lock-in, and clock ticks.
 */

let globalAudioCtx: AudioContext | null = null;
let globalMasterGain: GainNode | null = null;
let isGloballyMuted = false;

function getAudioContext(): { ctx: AudioContext; masterGain: GainNode } | null {
  if (typeof window === 'undefined') return null;

  try {
    if (!globalAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      globalAudioCtx = new AudioCtxClass();
      globalMasterGain = globalAudioCtx.createGain();
      globalMasterGain.gain.setValueAtTime(isGloballyMuted ? 0 : 0.45, globalAudioCtx.currentTime);
      globalMasterGain.connect(globalAudioCtx.destination);
    }

    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {});
    }

    return { ctx: globalAudioCtx, masterGain: globalMasterGain! };
  } catch {
    return null;
  }
}

export function useSoundEngine() {
  const [muted, setMuted] = useState(false);
  const audioInitializedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cd_ielts_sound_muted');
      if (saved !== null) {
        const val = saved === 'true';
        setMuted(val);
        isGloballyMuted = val;
        if (globalMasterGain && globalAudioCtx) {
          globalMasterGain.gain.setValueAtTime(val ? 0 : 0.45, globalAudioCtx.currentTime);
        }
      }
    } catch {}

    const handleSync = (e: CustomEvent<{ muted: boolean }>) => {
      setMuted(e.detail.muted);
      isGloballyMuted = e.detail.muted;
      if (globalMasterGain && globalAudioCtx) {
        globalMasterGain.gain.setValueAtTime(e.detail.muted ? 0 : 0.45, globalAudioCtx.currentTime);
      }
    };

    window.addEventListener('cd-ielts-sound-sync' as never, handleSync as EventListener);
    return () => {
      window.removeEventListener('cd-ielts-sound-sync' as never, handleSync as EventListener);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      isGloballyMuted = next;
      try {
        localStorage.setItem('cd_ielts_sound_muted', String(next));
      } catch {}

      if (globalMasterGain && globalAudioCtx) {
        globalMasterGain.gain.setValueAtTime(next ? 0 : 0.45, globalAudioCtx.currentTime);
      }

      window.dispatchEvent(new CustomEvent('cd-ielts-sound-sync', { detail: { muted: next } }));
      return next;
    });
  }, []);

  /**
   * 1. Mechanical Switch Click:
   * Crisp 800Hz sine transient + 12ms high-pass filtered white noise burst.
   */
  const playClick = useCallback(() => {
    if (isGloballyMuted) return;
    const sys = getAudioContext();
    if (!sys) return;
    const { ctx, masterGain } = sys;
    const now = ctx.currentTime;

    // A. 800Hz transient sine
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.018);

    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.02);

    // B. 12ms high-pass filtered noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.015);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.016);
  }, []);

  /**
   * 2. Exam Chamber Lock-in:
   * Low-frequency sub-bass drop (110Hz -> 45Hz, 180ms) through soft saturation.
   */
  const playLockIn = useCallback(() => {
    if (isGloballyMuted) return;
    const sys = getAudioContext();
    if (!sys) return;
    const { ctx, masterGain } = sys;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.23);
  }, []);

  /**
   * 3. Harmonic Ema Chime:
   * Pentatonic A-minor harmonic pluck (440Hz + 659.25Hz) with gentle exponential decay.
   */
  const playChime = useCallback(() => {
    if (isGloballyMuted) return;
    const sys = getAudioContext();
    if (!sys) return;
    const { ctx, masterGain } = sys;
    const now = ctx.currentTime;

    const freqs = [440.0, 659.25, 880.0];
    const decays = [0.85, 0.72, 0.55];
    const amplitudes = [0.28, 0.18, 0.09];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(amplitudes[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decays[idx] + 0.05);
    });
  }, []);

  /**
   * 4. Countdown Telemetry Tick:
   * 2ms high-precision clock escapement tick at 3200Hz.
   */
  const playTick = useCallback(() => {
    if (isGloballyMuted) return;
    const sys = getAudioContext();
    if (!sys) return;
    const { ctx, masterGain } = sys;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(12, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.01);
  }, []);

  return {
    muted,
    toggleMute,
    playClick,
    playLockIn,
    playChime,
    playTick,
  };
}
