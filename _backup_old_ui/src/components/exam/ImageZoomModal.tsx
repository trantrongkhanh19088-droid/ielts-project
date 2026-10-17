'use client';

import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageZoomModal({ isOpen, onClose, imageUrl, title }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const handleReset = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between py-2 px-4 bg-zinc-900 border-b border-zinc-800 rounded-t-lg">
        <span className="text-sm font-medium text-white truncate max-w-md">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-xs text-zinc-400 font-mono ml-1">{Math.round(scale * 100)}%</span>
          <div className="w-px h-5 bg-zinc-700 mx-2" />
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-red-600 rounded transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image View Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div
          className="transition-transform duration-200"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[80vh] max-w-full object-contain rounded shadow-2xl bg-white"
          />
        </div>
      </div>
    </div>
  );
}
