'use client';

import React, { useState, useEffect } from 'react';
import { getCharacterById, ALL_PIXEL_CHARACTERS } from './characters';
import { CompanionSettings, DEFAULT_COMPANION_SETTINGS, PixelCharacter } from './types';
import CharacterSelectionModal from './CharacterSelectionModal';
import { Sparkles, Settings2, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'cd_ielts_companion_settings';

export default function PixelCompanion() {
  const [settings, setSettings] = useState<CompanionSettings>(DEFAULT_COMPANION_SETTINGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    setIsMounted(true);
    const syncSettings = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSettings({ ...DEFAULT_COMPANION_SETTINGS, ...JSON.parse(stored) });
        }
      } catch {}
    };

    syncSettings();
    window.addEventListener('companion-settings-updated', syncSettings);
    return () => window.removeEventListener('companion-settings-updated', syncSettings);
  }, []);

  // Sync theme accent CSS variables with document
  const character: PixelCharacter = getCharacterById(settings.selectedCharacterId);

  useEffect(() => {
    if (!settings.syncThemeAccent || !character) return;

    // Convert hex to rgb
    const hex = character.accentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 239;
    const g = parseInt(hex.substring(2, 4), 16) || 68;
    const b = parseInt(hex.substring(4, 6), 16) || 68;

    document.documentElement.style.setProperty('--pixel-accent', character.accentColor);
    document.documentElement.style.setProperty('--pixel-accent-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty(
      '--pixel-glow',
      character.glowColor || `rgba(${r}, ${g}, ${b}, 0.45)`
    );
  }, [character, settings.syncThemeAccent]);

  // Handle character click
  const handleCharacterClick = () => {
    setIsJumping(true);
    setShowSpeechBubble(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  // Auto-hide speech bubble after 5s
  useEffect(() => {
    if (!showSpeechBubble) return;
    const timer = setTimeout(() => setShowSpeechBubble(false), 5000);
    return () => clearTimeout(timer);
  }, [showSpeechBubble]);

  const handleSaveSettings = (newSettings: CompanionSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      // Dispatch event to toggle sakura
      window.dispatchEvent(
        new CustomEvent('sakura-toggle', { detail: { enabled: newSettings.sakuraEnabled } })
      );
      localStorage.setItem('cd_ielts_sakura_enabled', String(newSettings.sakuraEnabled));
      window.dispatchEvent(new Event('companion-settings-updated'));
    } catch {}
  };

  if (!isMounted) return null;

  // Character sizing mapping
  const sizeMap = {
    1: 64,
    1.5: 88,
    2: 120,
  };
  const pixelSize = sizeMap[settings.size] || 88;

  // Position classes
  const positionClasses =
    settings.position === 'left' ? 'left-6 items-start' : 'right-6 items-end';

  return (
    <>
      {settings.showCompanion !== false && (
        <div
          className={`fixed bottom-6 z-40 flex flex-col pointer-events-auto select-none ${positionClasses}`}
        >
          {/* Pixel Speech Bubble */}
          {showSpeechBubble && (
            <div
              onClick={() => setShowSpeechBubble(false)}
              className={`mb-2 max-w-[260px] p-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl border-2 cursor-pointer transition-all duration-300 animate-in fade-in zoom-in-90 ${
                settings.position === 'left' ? 'origin-bottom-left' : 'origin-bottom-right'
              }`}
              style={{
                borderColor: character.accentColor,
                boxShadow: `0 8px 30px ${character.glowColor}`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-xs" style={{ color: character.accentColor }}>
                  {character.name}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  ({character.origin})
                </span>
              </div>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-100 leading-snug">
                {character.quote}
              </p>
              <div className="mt-1 text-[11px] text-gray-400 dark:text-gray-500 text-right">
                Nhấp để đóng &bull; Đổi nhân vật ở nút bên dưới
              </div>
            </div>
          )}

          {/* Character Container with Idle Bobbing & Jump Animation */}
          <div className="relative group">
            {/* Ambient Elemental Particle Embers */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <span
                className="absolute -top-3 left-2 w-2 h-2 rounded-full animate-particle"
                style={{ backgroundColor: character.accentColor, animationDelay: '0s' }}
              />
              <span
                className="absolute -top-2 right-2 w-1.5 h-1.5 rounded-full animate-particle"
                style={{ backgroundColor: character.accentColor, animationDelay: '1.2s' }}
              />
            </div>

            {/* Interactive Character Sprite */}
            <div
              onClick={handleCharacterClick}
              className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
                isJumping ? '-translate-y-4' : 'animate-pixel-bob'
              }`}
              title={`Bạn đồng hành: ${character.name} (${character.origin})\nNhấp để trò chuyện!`}
            >
              {character.renderSprite({ size: pixelSize })}
            </div>

            {/* Settings Trigger Icon (Hover or Click to open Character Selection) */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 shadow-md border border-gray-200 dark:border-zinc-700 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
              title="Đổi nhân vật & Cài đặt giao diện (「キャラ＆テーマ設定」)"
            >
              <Settings2 className="w-3.5 h-3.5" style={{ color: character.accentColor }} />
            </button>
          </div>
        </div>
      )}

      {/* Character Selection Modal */}
      <CharacterSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </>
  );
}
