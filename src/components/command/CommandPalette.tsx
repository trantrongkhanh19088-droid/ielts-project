'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  Sprout,
  Layers,
  BarChart2,
  PenTool,
  Sparkles,
  Settings,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Clock,
  ArrowRight,
  CornerDownLeft,
  X,
  Compass,
  FileText,
} from 'lucide-react';
import { TASK_1_SEEDS, TASK_2_SEEDS } from '@/lib/data/seed-prompts';
import { useSoundEngine } from '@/hooks/useSoundEngine';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'modes' | 'prompts' | 'tools' | 'system';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const { playClick, playChime, playLockIn, muted, toggleMute } = useSoundEngine();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      playClick();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, playClick]);

  // Command items builder
  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];

    // 1. Exam & Practice Modes
    items.push(
      {
        id: 'mode-full-test',
        title: 'Thi Thử Full Test (60 Phút)',
        subtitle: 'Mô phỏng 100% phòng thi Inspera 2026: Task 1 (20p) + Task 2 (40p)',
        category: 'modes',
        icon: Layers,
        badge: 'Phòng thi',
        badgeColor: 'bg-vermilion/10 text-vermilion border-vermilion/30',
        action: () => {
          playLockIn();
          router.push('/practice?mode=full_test');
          setIsOpen(false);
        },
      },
      {
        id: 'mode-builder',
        title: 'Writing Builder — Cây Đậu N Tầng',
        subtitle: 'Học dựng câu & đoạn văn IELTS từ Band 5.0 lên 8.5 với Dual AI Engines',
        category: 'modes',
        icon: Sprout,
        badge: 'Mới 2026',
        badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        action: () => {
          playChime();
          router.push('/builder');
          setIsOpen(false);
        },
      },
      {
        id: 'mode-task1',
        title: 'Luyện Task 1 Academic Report',
        subtitle: 'Biểu đồ Line, Bar, Pie, Table, Process và Map (150 từ, 20 phút)',
        category: 'modes',
        icon: PenTool,
        badge: 'Task 1',
        badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30',
        action: () => {
          playClick();
          router.push('/practice?mode=task1');
          setIsOpen(false);
        },
      },
      {
        id: 'mode-task2',
        title: 'Luyện Task 2 Academic Essay',
        subtitle: 'Dạng bài Opinion, Discussion, Advantages, Causes & Solutions (250 từ, 40 phút)',
        category: 'modes',
        icon: FileText,
        badge: 'Task 2',
        badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
        action: () => {
          playClick();
          router.push('/practice?mode=task2');
          setIsOpen(false);
        },
      },
      {
        id: 'mode-prompts-archive',
        title: 'Kho 107 Đề Forecast 2026',
        subtitle: 'Duyệt trọn bộ đề thi Task 1 & Task 2 kèm dàn ý phân tích Band 8.0+',
        category: 'modes',
        icon: BookOpen,
        badge: '107 Đề',
        badgeColor: 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700',
        action: () => {
          playClick();
          router.push('/prompts');
          setIsOpen(false);
        },
      },
      {
        id: 'mode-dashboard',
        title: 'Thống Kê & Lịch Sử Bài Thi',
        subtitle: 'Xem biểu đồ tiến độ Band điểm, 4 tiêu chí TR/CC/LR/GRA và nhận xét AI',
        category: 'modes',
        icon: BarChart2,
        badge: 'Báo cáo',
        badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
        action: () => {
          playClick();
          router.push('/dashboard');
          setIsOpen(false);
        },
      }
    );

    // 2. Forecast Prompts (Top forecasted items)
    const combinedPrompts = [...TASK_1_SEEDS, ...TASK_2_SEEDS];
    combinedPrompts.forEach((p) => {
      items.push({
        id: `prompt-${p.id}`,
        title: p.title,
        subtitle: `${p.taskType === 'task1' ? 'Task 1' : 'Task 2'} // ${p.category} • ${p.minWords} từ`,
        category: 'prompts',
        icon: Compass,
        badge: p.taskType === 'task1' ? 'T1' : 'T2',
        badgeColor:
          p.taskType === 'task1'
            ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30'
            : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
        action: () => {
          playClick();
          router.push(`/practice?mode=${p.taskType}&promptId=${p.id}`);
          setIsOpen(false);
        },
      });
    });

    // 3. System Tools & Customizations
    items.push(
      {
        id: 'tool-settings',
        title: 'Cài Đặt Hệ Thống & Giao Diện',
        subtitle: 'Chỉnh độ tương phản phòng thi, cỡ chữ Inspera, thông số Gemini AI Examiner',
        category: 'tools',
        icon: Settings,
        badge: 'Config',
        badgeColor: 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700',
        action: () => {
          playClick();
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent('open-settings-modal'));
        },
      },
      {
        id: 'sys-toggle-sound',
        title: muted ? 'Bật Hiệu Ứng Âm Thanh (Web Audio Synthesizer)' : 'Tắt Hiệu Ứng Âm Thanh',
        subtitle: muted ? 'Kích hoạt click cơ học, sub-bass lock-in và chuông ngũ cung' : 'Chuyển sang chế độ yên tĩnh',
        category: 'system',
        icon: muted ? Volume2 : VolumeX,
        badge: muted ? 'Đang Tắt' : 'Đang Bật',
        badgeColor: muted
          ? 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
          : 'bg-vermilion/10 text-vermilion border-vermilion/30',
        action: () => {
          toggleMute();
          playClick();
          setIsOpen(false);
        },
      },
      {
        id: 'sys-toggle-theme-dark',
        title: 'Chuyển Sang Giao Diện Tối (Dark Slate)',
        subtitle: 'Chế độ Obsidian Ink tối ưu hóa cho làm bài ban đêm, chống mỏi mắt',
        category: 'system',
        icon: Moon,
        badge: 'Dark',
        badgeColor: 'bg-stone-800 text-stone-200 border-stone-700',
        action: () => {
          try {
            localStorage.setItem('cd_ielts_theme', 'dark');
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('japanese');
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: 'dark' }));
          } catch {}
          playClick();
          setIsOpen(false);
        },
      },
      {
        id: 'sys-toggle-theme-light',
        title: 'Chuyển Sang Giao Diện Sáng (Archival Paper)',
        subtitle: 'Bề mặt giấy cổ điển chuẩn trang thi Inspera của Hội đồng Anh / IDP',
        category: 'system',
        icon: Sun,
        badge: 'Light',
        badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
        action: () => {
          try {
            localStorage.setItem('cd_ielts_theme', 'light');
            document.documentElement.classList.remove('dark', 'japanese');
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: 'light' }));
          } catch {}
          playClick();
          setIsOpen(false);
        },
      }
    );

    return items;
  }, [router, playClick, playChime, playLockIn, muted, toggleMute]);

  // Filtered items based on search query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default: show all modes + tools + system + first 8 prompts
      return allItems.filter(
        (item) => item.category !== 'prompts' || allItems.indexOf(item) < 14
      );
    }
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  // Handle keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-950/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-[620px] rounded-xl hairline-border bg-paper dark:bg-carbon shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar (Slate 48px Header Specification) */}
        <div className="flex items-center px-4 h-12 hairline-b bg-paper-subtle/50 dark:bg-carbon-subtle/50 gap-3">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Tìm đề thi, chế độ luyện tập, công cụ hoặc lệnh..."
            className="flex-1 bg-transparent border-0 outline-hidden text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded hairline-border bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 font-semibold">
            ESC ĐÓNG
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto flex-1 p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <Compass className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium">Không tìm thấy kết quả phù hợp với &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400">Hãy thử gõ &quot;Task 1&quot;, &quot;Line Graph&quot;, &quot;Full Test&quot; hoặc &quot;Builder&quot;.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  data-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-stone-200/70 dark:bg-stone-800/80 text-stone-950 dark:text-stone-50'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100/50 dark:hover:bg-stone-850/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 hairline-border ${
                        isSelected
                          ? 'bg-paper dark:bg-carbon text-vermilion'
                          : 'bg-paper-subtle dark:bg-carbon-subtle text-stone-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span
                            className={`font-mono text-[10px] px-1.5 py-0.2 rounded border font-semibold shrink-0 ${
                              item.badgeColor || 'bg-stone-100 text-stone-600 border-stone-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate max-w-[380px] sm:max-w-[440px]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-vermilion shrink-0">
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer with Monospace Telemetry & Keyboard Hints */}
        <div className="px-4 py-2 hairline-t bg-paper-subtle/70 dark:bg-carbon-subtle/70 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-700 dark:text-stone-300">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-700 dark:text-stone-300">
                ↓
              </kbd>
              <span>di chuyển</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded hairline-border bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-700 dark:text-stone-300">
                ↵
              </kbd>
              <span>chọn</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-vermilion font-semibold">107 FORECAST PROMPTS</span>
            <span>//</span>
            <span>INSPERA SIMULATOR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
