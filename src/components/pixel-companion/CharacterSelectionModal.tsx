'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ALL_PIXEL_CHARACTERS } from './characters';
import { CompanionSettings, PixelCharacter, CharacterCategory, CustomAvatar } from './types';
import {
  X,
  Search,
  Sparkles,
  Check,
  Palette,
  Maximize2,
  Flower2,
  Compass,
  Settings2,
  MessageSquare,
  Trash2,
  Wand2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface CharacterSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CompanionSettings;
  onSaveSettings: (settings: CompanionSettings) => void;
}

export default function CharacterSelectionModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}: CharacterSelectionModalProps) {
  const [modalTab, setModalTab] = useState<'studio' | 'settings' | 'presets'>('studio');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePresetTab, setActivePresetTab] = useState<'all' | CharacterCategory>('all');
  const [selectedCharId, setSelectedCharId] = useState(settings.selectedCharacterId);
  const [size, setSize] = useState<1 | 1.5 | 2>(settings.size);
  const [position, setPosition] = useState<'left' | 'right'>(settings.position);
  const [syncThemeAccent, setSyncThemeAccent] = useState(settings.syncThemeAccent);
  const [sakuraEnabled, setSakuraEnabled] = useState(settings.sakuraEnabled);
  const [showCompanion, setShowCompanion] = useState(settings.showCompanion !== false);
  const [useCustomAvatar, setUseCustomAvatar] = useState(settings.useCustomAvatar !== false);
  const [customAvatar, setCustomAvatar] = useState<CustomAvatar | null>(null);
  const [customQuote, setCustomQuote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync settings and custom avatar on modal open
  useEffect(() => {
    if (isOpen) {
      setSelectedCharId(settings.selectedCharacterId);
      setSize(settings.size);
      setPosition(settings.position);
      setSyncThemeAccent(settings.syncThemeAccent);
      setSakuraEnabled(settings.sakuraEnabled);
      setShowCompanion(settings.showCompanion !== false);
      setUseCustomAvatar(settings.useCustomAvatar !== false);

      // Check dark mode
      setIsDarkMode(document.documentElement.classList.contains('dark'));

      // Load custom avatar
      try {
        const stored = localStorage.getItem('cd_ielts_custom_avatar');
        if (stored) {
          const parsed: CustomAvatar = JSON.parse(stored);
          setCustomAvatar(parsed);
          setCustomQuote(parsed.quote || 'Cố lên! Bạn có thể chinh phục IELTS Writing 8.0+!');
        } else {
          setCustomAvatar(null);
          setCustomQuote('Cố lên! Bạn có thể chinh phục IELTS Writing 8.0+!');
        }
      } catch {}
    }
  }, [isOpen, settings]);

  // Listen for message from 3D studio iframe
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === 'dot-avatar:save-companion' && e.data.avatar) {
        setCustomAvatar(e.data.avatar);
        setUseCustomAvatar(true);
        if (e.data.avatar.quote) setCustomQuote(e.data.avatar.quote);
        showToast(`✨ Đã đặt "${e.data.avatar.name}" làm Bạn đồng hành luyện thi!`);
        window.dispatchEvent(new Event('companion-custom-avatar-updated'));
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTriggerSaveFromStudio = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'dot-avatar:trigger-save-companion' },
        '*'
      );
    }
  };

  const handleRemoveCustomAvatar = () => {
    try {
      localStorage.removeItem('cd_ielts_custom_avatar');
      setCustomAvatar(null);
      setUseCustomAvatar(false);
      showToast('Đã chuyển về nhân vật mẫu mặc định.');
      window.dispatchEvent(new Event('companion-custom-avatar-updated'));
    } catch {}
  };

  const handleUpdateQuote = (newQuote: string) => {
    setCustomQuote(newQuote);
    if (customAvatar) {
      const updated = { ...customAvatar, quote: newQuote };
      setCustomAvatar(updated);
      try {
        localStorage.setItem('cd_ielts_custom_avatar', JSON.stringify(updated));
        window.dispatchEvent(new Event('companion-custom-avatar-updated'));
      } catch {}
    }
  };

  // Filter characters based on search and category tab
  const filteredCharacters = useMemo(() => {
    return ALL_PIXEL_CHARACTERS.filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.jpName && c.jpName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = activePresetTab === 'all' || c.category === activePresetTab;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activePresetTab]);

  const handleApply = () => {
    onSaveSettings({
      selectedCharacterId: selectedCharId,
      size,
      position,
      syncThemeAccent,
      sakuraEnabled,
      showCompanion,
      useCustomAvatar,
    });
    onClose();
  };

  if (!isOpen) return null;

  const currentPresetChar =
    ALL_PIXEL_CHARACTERS.find((c) => c.id === selectedCharId) || ALL_PIXEL_CHARACTERS[0];

  const activeCompanionName =
    useCustomAvatar && customAvatar ? customAvatar.name : currentPresetChar.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[94vh] max-h-[860px] flex flex-col bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-vermilion text-white flex items-center justify-center shadow-md font-mono text-sm font-bold">
              3D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                  Studio Tạo Nhân Vật 3D
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-vermilion/10 text-vermilion border border-vermilion/20">
                  <Sparkles className="w-3 h-3" />
                  Real-time WebGL
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Thiết kế mascot 3D đồng hành ôn luyện IELTS Writing &amp; tùy biến góc hiển thị
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850 transition"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 sm:px-6 py-2.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setModalTab('studio')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                modalTab === 'studio'
                  ? 'bg-vermilion text-white shadow-md shadow-vermilion/25'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Studio Tạo Nhân Vật 3D</span>
            </button>

            <button
              type="button"
              onClick={() => setModalTab('settings')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                modalTab === 'settings'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Cài Đặt Bạn Đồng Hành</span>
            </button>

            <button
              type="button"
              onClick={() => setModalTab('presets')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                modalTab === 'presets'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bộ Sưu Tập Mẫu</span>
              <span className="sm:hidden">Mẫu</span> (55)
            </button>
          </div>

          {/* Quick Active Mascot Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>Đang chọn:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200 truncate max-w-[140px]">
              {activeCompanionName}
            </span>
            {useCustomAvatar && customAvatar && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                3D Custom
              </span>
            )}
          </div>
        </div>

        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className="px-6 py-2 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border-b border-emerald-500/30 flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-200 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[11px] underline opacity-80 hover:opacity-100"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Tab 1: 3D Character Creator Studio */}
        {modalTab === 'studio' && (
          <div className="flex-1 flex flex-col min-h-0 relative bg-stone-100/50 dark:bg-stone-900/30">
            <div className="flex-1 min-h-0 w-full relative">
              <iframe
                ref={iframeRef}
                src={`/avatar-maker.html?embed=1&lang=vi&theme=${isDarkMode ? 'dark' : 'light'}`}
                title="Dot Avatar 3D Studio"
                className="w-full h-full border-0 block"
              />
            </div>

            {/* Studio Bottom Quick Action Ribbon */}
            <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <Sparkles className="w-4 h-4 text-vermilion" />
                <span>
                  Xoay 3D, chọn hình dáng, màu men, chất liệu và bấm nút bên phải để áp dụng ngay:
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleTriggerSaveFromStudio}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vermilion hover:bg-vermilion-hover text-white font-bold text-xs shadow-lg shadow-vermilion/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Đặt Làm Bạn Đồng Hành Luyện Thi</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Companion Display & Interaction Settings */}
        {modalTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Active Character Snapshot Card */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center p-2 border border-stone-200 dark:border-stone-700 shrink-0">
                {useCustomAvatar && customAvatar ? (
                  <img
                    src={customAvatar.dataUrl}
                    alt={customAvatar.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  currentPresetChar.renderSprite({ size: 64 })
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {activeCompanionName}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {useCustomAvatar && customAvatar ? '3D Dot Character' : currentPresetChar.origin}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Mascot này sẽ đồng hành cùng bạn ở góc màn hình và động viên khi luyện đề.
                </p>
                {useCustomAvatar && customAvatar && (
                  <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => setModalTab('studio')}
                      className="inline-flex items-center gap-1 text-xs text-vermilion hover:underline font-semibold"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      Chỉnh sửa lại trong 3D Studio
                    </button>
                    <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                    <button
                      type="button"
                      onClick={handleRemoveCustomAvatar}
                      className="inline-flex items-center gap-1 text-xs text-rose-500 hover:underline font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Xóa mẫu tự tạo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Motivation Quote Input */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-vermilion" />
                  <span>Lời động viên khi nhấp vào Bạn Đồng Hành (Speech Bubble):</span>
                </label>
              </div>
              <input
                type="text"
                value={customQuote}
                onChange={(e) => handleUpdateQuote(e.target.value)}
                placeholder="Ví dụ: Cố lên! Mục tiêu hôm nay là viết bài Task 2 thật logic!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-vermilion/50"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Cố lên! Bạn có thể chinh phục IELTS Writing 8.0+!',
                  'Quản lý tốt 60 phút: 20p cho Task 1 và 40p cho Task 2!',
                  'Đừng quên đọc lại bài để soát lỗi ngữ pháp và từ vựng nhé!',
                  'Viết câu ngắn gọn, mạch lạc và chứng minh luận điểm rõ ràng!',
                ].map((presetQuote) => (
                  <button
                    key={presetQuote}
                    type="button"
                    onClick={() => handleUpdateQuote(presetQuote)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-750 transition"
                  >
                    &ldquo;{presetQuote}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Show/Hide Toggle */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-vermilion" />
                    Hiển thị Bạn Đồng Hành
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Bật mascot nổi ở góc màn hình luyện thi
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCompanion(!showCompanion)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showCompanion ? 'bg-vermilion' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      showCompanion ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Size Selector */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-stone-500" />
                    Kích thước Mascot
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Độ lớn hiển thị trên giao diện
                  </p>
                </div>
                <div className="inline-flex rounded-xl border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-100 dark:bg-stone-800">
                  <button
                    type="button"
                    onClick={() => setSize(1)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      size === 1
                        ? 'bg-vermilion text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    1x (64px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize(1.5)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      size === 1.5
                        ? 'bg-vermilion text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    1.5x (88px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize(2)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      size === 2
                        ? 'bg-vermilion text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    2x (120px)
                  </button>
                </div>
              </div>

              {/* Screen Corner Position */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-stone-500" />
                    Vị trí góc màn hình
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Góc dưới cùng bên trái hoặc bên phải
                  </p>
                </div>
                <div className="inline-flex rounded-xl border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-100 dark:bg-stone-800">
                  <button
                    type="button"
                    onClick={() => setPosition('left')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      position === 'left'
                        ? 'bg-vermilion text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    Góc Trái
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosition('right')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      position === 'right'
                        ? 'bg-vermilion text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                    }`}
                  >
                    Góc Phải
                  </button>
                </div>
              </div>

              {/* Falling Sakura Toggle */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Flower2 className="w-4 h-4 text-pink-500" />
                    Hoa anh đào rơi (Sakura)
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Hiệu ứng cánh hoa rơi nhẹ nhàng trên màn hình
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSakuraEnabled(!sakuraEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    sakuraEnabled ? 'bg-pink-500' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      sakuraEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sync Accent Theme */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-sm flex items-center justify-between md:col-span-2">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-rose-500" />
                    Đồng bộ màu Accent giao diện theo nhân vật
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Tự động đổi màu điểm nhấn giao diện theo tông màu của Bạn Đồng Hành
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSyncThemeAccent(!syncThemeAccent)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    syncThemeAccent ? 'bg-vermilion' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      syncThemeAccent ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 55 Anime Character Presets Library */}
        {modalTab === 'presets' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search & Category Filter Bar */}
            <div className="px-5 sm:px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/40 dark:bg-stone-900/40">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { key: 'all', label: 'Tất Cả (55)' },
                  { key: 'genshin_honkai', label: 'Genshin & Honkai (22)' },
                  { key: 'shonen_classic', label: 'Shonen Kinh Điển (11)' },
                  { key: 'shonen_new', label: 'Shonen Mới (11)' },
                  { key: 'waifu_game', label: 'Waifu & Game (11)' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActivePresetTab(tab.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activePresetTab === tab.key
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-60 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên, anime..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-vermilion/50"
                />
              </div>
            </div>

            {/* Presets Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {filteredCharacters.map((c) => {
                const isSelected = !useCustomAvatar && c.id === selectedCharId;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCharId(c.id);
                      setUseCustomAvatar(false);
                      showToast(`Đã chọn bạn đồng hành mẫu: ${c.name}`);
                    }}
                    className={`group relative p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center text-center select-none ${
                      isSelected
                        ? 'bg-vermilion/5 dark:bg-stone-900 border-vermilion shadow-xl shadow-vermilion/15 scale-[1.02]'
                        : 'bg-white dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md'
                    }`}
                    style={{
                      borderColor: isSelected ? c.accentColor : undefined,
                      boxShadow: isSelected ? `0 8px 24px ${c.glowColor}` : undefined,
                    }}
                  >
                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] shadow-sm font-bold"
                        style={{ backgroundColor: c.accentColor }}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* ID & Color Pill */}
                    <div className="w-full flex items-center justify-between text-[11px] text-stone-400 mb-1 px-1">
                      <span className="font-mono font-bold">#{c.id}</span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.accentColor }}
                      />
                    </div>

                    {/* Character Sprite */}
                    <div className="w-20 h-20 flex items-center justify-center my-1 group-hover:scale-110 transition-transform">
                      {c.renderSprite({ size: 72 })}
                    </div>

                    {/* Character Info */}
                    <div className="mt-1 w-full">
                      <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-100 truncate">
                        {c.name}
                      </h4>
                      {c.jpName && (
                        <div className="text-[11px] text-stone-400 dark:text-stone-500 font-sans truncate">
                          {c.jpName}
                        </div>
                      )}
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 truncate max-w-full">
                        {c.origin}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Footer with Active Status & Confirm Button */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center shrink-0 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-750">
              {useCustomAvatar && customAvatar ? (
                <img
                  src={customAvatar.dataUrl}
                  alt={customAvatar.name}
                  className="max-h-7 max-w-7 object-contain"
                />
              ) : (
                currentPresetChar.renderSprite({ size: 32 })
              )}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span>Bạn đồng hành hiện tại:</span>
                <span className="text-vermilion font-extrabold">{activeCompanionName}</span>
              </div>
              <p className="text-[11px] text-stone-500 italic truncate max-w-md">
                &ldquo;{useCustomAvatar && customAvatar?.quote ? customAvatar.quote : currentPresetChar.quote}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 transition"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-vermilion hover:bg-vermilion-hover text-white font-bold text-xs shadow-lg shadow-vermilion/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Xác Nhận &amp; Áp Dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
