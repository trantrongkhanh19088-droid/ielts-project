'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageZoomModal({ isOpen, onClose, imageUrl, title }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset scale whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  // Handle ESC key press & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleZoomIn = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((s) => Math.min(s + 0.25, 2.5));
  }, []);

  const handleZoomOut = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((s) => Math.max(s - 0.25, 0.5));
  }, []);

  const handleReset = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
  }, []);

  const handleClose = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    onClose();
  }, [onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-sm select-none animate-in fade-in duration-150"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Phóng to ảnh đề thi'}
    >
      {/* Top Toolbar */}
      <div
        className="flex items-center justify-between py-2.5 px-4 bg-zinc-950/95 border-b border-zinc-800 text-white z-10 shrink-0 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 truncate max-w-md">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold uppercase shrink-0">
            Task 1 Diagram
          </span>
          <span className="text-xs sm:text-sm font-semibold truncate text-zinc-200">
            {title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition cursor-pointer"
              title="Phóng to (+)"
              aria-label="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition cursor-pointer"
              title="Thu nhỏ (-)"
              aria-label="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition cursor-pointer"
              title="Khôi phục 100%"
              aria-label="Khôi phục zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-zinc-400 font-mono px-1.5 min-w-[42px] text-center">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Prominent Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition shadow-sm cursor-pointer active:scale-95"
            title="Đóng (Nhấn ESC hoặc click ra ngoài)"
            aria-label="Đóng ảnh"
          >
            <X className="w-4 h-4" />
            <span>Đóng (ESC)</span>
          </button>
        </div>
      </div>

      {/* Main Image View Area - clicking here closes modal */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
        onClick={handleClose}
      >
        <div
          className="transition-transform duration-150 ease-out cursor-default"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl bg-white border border-zinc-700"
          />
        </div>
      </div>

      {/* Bottom Hint Banner */}
      <div
        className="py-1.5 px-4 bg-zinc-950/80 border-t border-zinc-850 text-center text-[11px] font-mono text-zinc-400 shrink-0 cursor-pointer hover:text-zinc-200 transition"
        onClick={handleClose}
      >
        Nhấp ra ngoài vùng ảnh hoặc nhấn phím <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold">ESC</kbd> để đóng
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
