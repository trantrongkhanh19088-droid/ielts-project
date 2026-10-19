'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSoundEngine } from '@/hooks/useSoundEngine';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const { playClick } = useSoundEngine();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      title="Lên đầu trang"
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-stone-900/90 text-stone-100 dark:bg-stone-100/90 dark:text-stone-900 hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white backdrop-blur-md hairline-border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
    >
      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
