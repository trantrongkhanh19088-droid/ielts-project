'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  X,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  ShieldCheck,
  Sliders,
  Flower2,
} from 'lucide-react';
import { getBuilderAutoSuggest, setBuilderAutoSuggest } from '@/lib/builder';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'light' | 'dark' | 'japanese';
  onThemeChange: (newTheme: 'light' | 'dark' | 'japanese') => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
}: SettingsModalProps) {
  const [autoSuggest, setAutoSuggestState] = useState<boolean>(true);
  const [showCompanion, setShowCompanion] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setAutoSuggestState(getBuilderAutoSuggest());
      try {
        localStorage.removeItem('cd_ielts_user_gemini_key');
        const stored = localStorage.getItem('cd_ielts_companion_settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.showCompanion !== undefined) {
            setShowCompanion(Boolean(parsed.showCompanion));
          }
        }
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleAutoSuggest = () => {
    const nextVal = !autoSuggest;
    setAutoSuggestState(nextVal);
    setBuilderAutoSuggest(nextVal);
  };

  const handleToggleCompanion = () => {
    const nextVal = !showCompanion;
    setShowCompanion(nextVal);
    try {
      const stored = localStorage.getItem('cd_ielts_companion_settings');
      const prev = stored ? JSON.parse(stored) : {};
      const updated = { ...prev, showCompanion: nextVal };
      localStorage.setItem('cd_ielts_companion_settings', JSON.stringify(updated));
      window.dispatchEvent(new Event('companion-settings-updated'));
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                Cài Đặt Hệ Thống
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Tùy chỉnh giao diện &amp; tính năng luyện thi
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Section 1: Light / Dark Mode Toggle */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <span>Chế độ giao diện (Appearance)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Light Mode Card */}
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`p-3 rounded-xl border-2 text-left transition flex flex-col gap-2 relative ${
                  currentTheme === 'light'
                    ? 'border-sky-600 bg-sky-50/60 dark:bg-sky-950/30 text-sky-950 dark:text-sky-100 shadow-sm'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-800/60 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                  {currentTheme === 'light' && (
                    <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs">Giao diện Sáng</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Chuẩn phòng thi Inspera
                  </div>
                </div>
              </button>

              {/* Dark Mode Card */}
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`p-3 rounded-xl border-2 text-left transition flex flex-col gap-2 relative ${
                  currentTheme === 'dark'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-950 dark:text-indigo-100 shadow-sm'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-800/60 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  {currentTheme === 'dark' && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs">Giao diện Tối</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Bảo vệ mắt ban đêm
                  </div>
                </div>
              </button>

              {/* Japanese Sakura Theme Card */}
              <button
                type="button"
                onClick={() => onThemeChange('japanese')}
                className={`p-3 rounded-xl border-2 text-left transition flex flex-col gap-2 relative ${
                  currentTheme === 'japanese'
                    ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 shadow-sm'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-rose-300 bg-white dark:bg-zinc-800/60 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <Flower2 className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  </div>
                  {currentTheme === 'japanese' && (
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs flex items-center gap-1">
                    <span>Giao diện Nhật Bản</span>
                    <span className="text-[11px]">🌸</span>
                  </div>
                  <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    Hoa anh đào Sakura
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Writing Builder Settings (Auto Suggestions Toggle) */}
          <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Phòng luyện câu Writing Builder</span>
            </label>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {autoSuggest ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span>Tự động hiển thị gợi ý câu</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Tự động mở cấu trúc mẫu và từ vựng gợi ý khi bạn chuyển sang câu mới. Tắt nếu bạn muốn tự suy nghĩ trước khi xem trợ giúp.
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={handleToggleAutoSuggest}
                  className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    autoSuggest
                      ? 'bg-emerald-600'
                      : 'bg-gray-300 dark:bg-zinc-700'
                  }`}
                  aria-pressed={autoSuggest}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      autoSuggest ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-zinc-700/60">
                <span>Trạng thái:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[11px] uppercase font-mono ${
                    autoSuggest
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      : 'bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {autoSuggest ? 'Đang BẬT gợi ý' : 'Đang TẮT (Ẩn mặc định)'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Anime Companion Toggle */}
          <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Bạn đồng hành Anime (Companion)</span>
            </label>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {showCompanion ? (
                      <Eye className="w-3.5 h-3.5 text-rose-500" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span>Hiển thị bạn đồng hành ở góc màn hình</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Bật hoặc tắt hình ảnh nhân vật Anime/Pixel trợ lý đồng hành ở góc dưới màn hình. Bạn có thể đổi trong số 55 nhân vật tại nút 「キャラ＆テーマ」 trên thanh điều hướng.
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={handleToggleCompanion}
                  className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    showCompanion
                      ? 'bg-rose-500'
                      : 'bg-gray-300 dark:bg-zinc-700'
                  }`}
                  aria-pressed={showCompanion}
                  title={showCompanion ? 'Nhấp để ẩn bạn đồng hành' : 'Nhấp để hiện bạn đồng hành'}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      showCompanion ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-zinc-700/60">
                <span>Trạng thái:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[11px] uppercase font-mono ${
                    showCompanion
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                      : 'bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {showCompanion ? 'Đang BẬT hiển thị' : 'Đang TẮT (Ẩn bạn đồng hành)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50/80 dark:bg-zinc-800/40 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>CD-IELTS v2.4 (Inspera Official Simulator)</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
