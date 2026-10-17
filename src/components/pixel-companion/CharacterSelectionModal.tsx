'use client';

import React, { useState, useMemo } from 'react';
import { ALL_PIXEL_CHARACTERS } from './characters';
import { CompanionSettings, PixelCharacter, CharacterCategory } from './types';
import {
  X,
  Search,
  Sparkles,
  Dices,
  Sliders,
  Check,
  Palette,
  Maximize2,
  Flower2,
  Compass,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | CharacterCategory>('all');
  const [selectedCharId, setSelectedCharId] = useState(settings.selectedCharacterId);
  const [size, setSize] = useState<1 | 1.5 | 2>(settings.size);
  const [position, setPosition] = useState<'left' | 'right'>(settings.position);
  const [syncThemeAccent, setSyncThemeAccent] = useState(settings.syncThemeAccent);
  const [sakuraEnabled, setSakuraEnabled] = useState(settings.sakuraEnabled);
  const [showCompanion, setShowCompanion] = useState(settings.showCompanion !== false);
  const [isGachaRolling, setIsGachaRolling] = useState(false);
  const [gachaResult, setGachaResult] = useState<PixelCharacter | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedCharId(settings.selectedCharacterId);
      setSize(settings.size);
      setPosition(settings.position);
      setSyncThemeAccent(settings.syncThemeAccent);
      setSakuraEnabled(settings.sakuraEnabled);
      setShowCompanion(settings.showCompanion !== false);
    }
  }, [isOpen, settings]);

  // Filter characters based on search and category tab
  const filteredCharacters = useMemo(() => {
    return ALL_PIXEL_CHARACTERS.filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.jpName && c.jpName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = activeTab === 'all' || c.category === activeTab;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeTab]);

  // Gacha Roll Feature (Genshin 5-Star Random Summon!)
  const handleGachaRoll = () => {
    setIsGachaRolling(true);
    setGachaResult(null);

    // Roll random character
    const randomIndex = Math.floor(Math.random() * ALL_PIXEL_CHARACTERS.length);
    const chosen = ALL_PIXEL_CHARACTERS[randomIndex];

    setTimeout(() => {
      setGachaResult(chosen);
      setSelectedCharId(chosen.id);
      setIsGachaRolling(false);
    }, 1000);
  };

  const handleApply = () => {
    onSaveSettings({
      selectedCharacterId: selectedCharId,
      size,
      position,
      syncThemeAccent,
      sakuraEnabled,
      showCompanion,
    });
    onClose();
  };

  if (!isOpen) return null;

  const currentPreviewChar = ALL_PIXEL_CHARACTERS.find((c) => c.id === selectedCharId) || ALL_PIXEL_CHARACTERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with Japanese Traditional Accent */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-sky-500/10 dark:from-rose-950/30 dark:via-zinc-900 dark:to-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md font-serif text-lg font-black">
              侍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
                  キャラ＆テーマ設定
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                  55 Bạn Đồng Hành
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Chọn Pixel Companion đồng hành luyện thi IELTS &amp; tùy biến giao diện Nhật Bản
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gacha Random Summon Button */}
            <button
              type="button"
              onClick={handleGachaRoll}
              disabled={isGachaRolling}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Dices className={`w-4 h-4 ${isGachaRolling ? 'animate-spin' : ''}`} />
              <span>Gacha Roll (Ngẫu Nhiên)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gacha Roll Gold Starburst Announcement */}
        {gachaResult && (
          <div className="px-6 py-2.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-b border-amber-400/30 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>
                ★ 5-STAR GACHA HIT: <strong>{gachaResult.name}</strong> ({gachaResult.origin}) đã gia nhập đội hình của bạn!
              </span>
            </div>
            <button
              onClick={() => setGachaResult(null)}
              className="text-[10px] text-amber-700 dark:text-amber-300 underline"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Settings Configuration Bar */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Controls: Show/Hide, Size, Position, Sync, Sakura */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Show / Hide Companion Switch */}
            <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-zinc-700">
              <span className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Bạn đồng hành:</span>
              </span>
              <button
                type="button"
                onClick={() => setShowCompanion(!showCompanion)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showCompanion ? 'bg-sky-600' : 'bg-gray-300 dark:bg-zinc-700'
                }`}
                title={showCompanion ? 'Đang BẬT hiển thị bạn đồng hành' : 'Đang TẮT (Ẩn bạn đồng hành)'}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showCompanion ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-[11px] font-bold ${showCompanion ? 'text-sky-600 dark:text-sky-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {showCompanion ? 'BẬT' : 'TẮT'}
              </span>
            </div>

            {/* Size selector */}
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-semibold">
              <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Kích cỡ:</span>
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-zinc-700 p-0.5 bg-white dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setSize(1)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    size === 1
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  1x (Nhỏ)
                </button>
                <button
                  type="button"
                  onClick={() => setSize(1.5)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    size === 1.5
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  1.5x (Chuẩn)
                </button>
                <button
                  type="button"
                  onClick={() => setSize(2)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    size === 2
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  2x (Lớn)
                </button>
              </div>
            </div>

            {/* Corner position */}
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-semibold">
              <Compass className="w-3.5 h-3.5 text-gray-400" />
              <span>Góc đứng:</span>
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-zinc-700 p-0.5 bg-white dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setPosition('left')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    position === 'left'
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Trái
                </button>
                <button
                  type="button"
                  onClick={() => setPosition('right')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    position === 'right'
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Phải
                </button>
              </div>
            </div>

            {/* Sync theme accent */}
            <label className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={syncThemeAccent}
                onChange={(e) => setSyncThemeAccent(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-sky-600 focus:ring-sky-500"
              />
              <Palette className="w-3.5 h-3.5 text-rose-500" />
              <span>Đồng bộ màu Accent giao diện</span>
            </label>

            {/* Falling sakura toggle */}
            <label className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sakuraEnabled}
                onChange={(e) => setSakuraEnabled(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-sky-600 focus:ring-sky-500"
              />
              <Flower2 className="w-3.5 h-3.5 text-pink-500" />
              <span>Hoa anh đào rơi (Sakura)</span>
            </label>
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              Tất Cả (55)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('genshin_honkai')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'genshin_honkai'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              Genshin &amp; Honkai (22)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shonen_classic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'shonen_classic'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              Shonen Kinh Điển (11)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shonen_new')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'shonen_new'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              Shonen Mới &amp; Dark Fantasy (11)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('waifu_game')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'waifu_game'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              Waifu &amp; Game Icons (11)
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, anime..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* 55 Characters Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredCharacters.map((c) => {
            const isSelected = c.id === selectedCharId;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCharId(c.id)}
                className={`group relative p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center text-center select-none ${
                  isSelected
                    ? 'bg-sky-50/70 dark:bg-zinc-900 border-sky-500 shadow-xl shadow-sky-500/15 scale-[1.02]'
                    : 'bg-white dark:bg-zinc-900/40 border-gray-200 dark:border-zinc-800/80 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md'
                }`}
                style={{
                  borderColor: isSelected ? c.accentColor : undefined,
                  boxShadow: isSelected ? `0 8px 24px ${c.glowColor}` : undefined,
                }}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm font-bold"
                    style={{ backgroundColor: c.accentColor }}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Number ID & Category Tag */}
                <div className="w-full flex items-center justify-between text-[10px] text-gray-400 mb-1 px-1">
                  <span className="font-mono font-bold">#{c.id}</span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: c.accentColor }}
                    title={`Accent: ${c.accentColor}`}
                  />
                </div>

                {/* Character Face Portrait Thumbnail */}
                <div className="w-20 h-20 flex items-center justify-center my-1 group-hover:scale-110 transition-transform">
                  {c.renderSprite({ size: 72 })}
                </div>

                {/* Character Name & Japanese Name */}
                <div className="mt-1 w-full">
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 truncate">
                    {c.name}
                  </h4>
                  {c.jpName && (
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-serif truncate">
                      {c.jpName}
                    </div>
                  )}
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 truncate max-w-full">
                    {c.origin}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Selected Preview & Apply Button */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              {currentPreviewChar.renderSprite({ size: 40 })}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>{currentPreviewChar.name}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentPreviewChar.accentColor }}
                />
              </div>
              <p className="text-[11px] text-gray-500 italic truncate max-w-md">
                &ldquo;{currentPreviewChar.quote}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-sky-600/25 transition transform hover:-translate-y-0.5"
            >
              Xác Nhận &amp; Áp Dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
