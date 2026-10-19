'use client';

import React, { useState, useEffect } from 'react';
import { getCharacterById } from './characters';
import { CompanionSettings, DEFAULT_COMPANION_SETTINGS, PixelCharacter, CustomAvatar } from './types';
import CharacterSelectionModal from './CharacterSelectionModal';
import { Sparkles, Settings2 } from 'lucide-react';

const STORAGE_KEY = 'cd_ielts_companion_settings';
const CUSTOM_AVATAR_KEY = 'cd_ielts_custom_avatar';

export default function PixelCompanion() {
  const [settings, setSettings] = useState<CompanionSettings>(DEFAULT_COMPANION_SETTINGS);
  const [customAvatar, setCustomAvatar] = useState<CustomAvatar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load settings and custom avatar from localStorage
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

    const syncCustomAvatar = () => {
      try {
        const stored = localStorage.getItem(CUSTOM_AVATAR_KEY);
        if (stored) {
          setCustomAvatar(JSON.parse(stored));
        } else {
          setCustomAvatar(null);
        }
      } catch {}
    };

    const handleWindowMessage = (e: MessageEvent) => {
      if (e.data?.type === 'dot-avatar:save-companion' && e.data.avatar) {
        setCustomAvatar(e.data.avatar);
      }
    };

    syncSettings();
    syncCustomAvatar();

    window.addEventListener('companion-settings-updated', syncSettings);
    window.addEventListener('companion-custom-avatar-updated', syncCustomAvatar);
    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('companion-settings-updated', syncSettings);
      window.removeEventListener('companion-custom-avatar-updated', syncCustomAvatar);
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);

  // Determine active companion metadata (custom 3D avatar vs preset character)
  const isCustomActive = settings.useCustomAvatar !== false && !!customAvatar;
  const presetCharacter: PixelCharacter = getCharacterById(settings.selectedCharacterId);

  const activeName = isCustomActive ? customAvatar.name : presetCharacter.name;
  const activeOrigin = isCustomActive ? 'Mascot 3D Tự Tạo' : presetCharacter.origin;
  const activeQuote = isCustomActive
    ? customAvatar.quote || 'Cố lên! Bạn có thể chinh phục IELTS Writing 8.0+!'
    : presetCharacter.quote;
  const activeAccentColor = isCustomActive
    ? customAvatar.accentColor || customAvatar.color || '#FF3B1D'
    : presetCharacter.accentColor;
  const activeGlowColor = isCustomActive
    ? 'rgba(255, 59, 29, 0.45)'
    : presetCharacter.glowColor || 'rgba(239, 68, 68, 0.45)';

  // Sync theme accent CSS variables with document
  useEffect(() => {
    if (!settings.syncThemeAccent) return;

    const hex = activeAccentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 255;
    const g = parseInt(hex.substring(2, 4), 16) || 59;
    const b = parseInt(hex.substring(4, 6), 16) || 29;

    document.documentElement.style.setProperty('--pixel-accent', activeAccentColor);
    document.documentElement.style.setProperty('--pixel-accent-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty('--pixel-glow', activeGlowColor);
  }, [activeAccentColor, activeGlowColor, settings.syncThemeAccent]);

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
              className={`mb-2 max-w-[270px] p-3 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-2xl border-2 cursor-pointer transition-all duration-300 animate-in fade-in zoom-in-90 ${
                settings.position === 'left' ? 'origin-bottom-left' : 'origin-bottom-right'
              }`}
              style={{
                borderColor: activeAccentColor,
                boxShadow: `0 8px 30px ${activeGlowColor}`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-xs" style={{ color: activeAccentColor }}>
                  {activeName}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  ({activeOrigin})
                </span>
              </div>
              <p className="text-xs font-medium text-stone-800 dark:text-stone-100 leading-snug">
                {activeQuote}
              </p>
              <div className="mt-1.5 text-[10px] text-stone-400 dark:text-stone-500 text-right flex items-center justify-between">
                <span>Nhấp để đóng</span>
                <span className="text-vermilion font-semibold">Đổi nhân vật 3D</span>
              </div>
            </div>
          )}

          {/* Character Container with Idle Bobbing & Jump Animation */}
          <div className="relative group">
            {/* Ambient Particle Embers */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <span
                className="absolute -top-3 left-2 w-2 h-2 rounded-full animate-particle"
                style={{ backgroundColor: activeAccentColor, animationDelay: '0s' }}
              />
              <span
                className="absolute -top-2 right-2 w-1.5 h-1.5 rounded-full animate-particle"
                style={{ backgroundColor: activeAccentColor, animationDelay: '1.2s' }}
              />
            </div>

            {/* Interactive Character Sprite / 3D Custom Avatar */}
            <div
              onClick={handleCharacterClick}
              className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
                isJumping ? '-translate-y-4' : 'animate-pixel-bob'
              }`}
              title={`Bạn đồng hành: ${activeName} (${activeOrigin})\nNhấp để trò chuyện!`}
            >
              {isCustomActive ? (
                <img
                  src={customAvatar.dataUrl}
                  alt={customAvatar.name}
                  style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
                  className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] select-none pointer-events-none"
                />
              ) : (
                presetCharacter.renderSprite({ size: pixelSize })
              )}
            </div>

            {/* Settings Trigger Icon */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-200 shadow-md border border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
              title="Studio Tạo Nhân Vật 3D & Cài đặt Bạn đồng hành"
            >
              <Settings2 className="w-3.5 h-3.5" style={{ color: activeAccentColor }} />
            </button>
          </div>
        </div>
      )}

      {/* Character Selection & 3D Studio Modal */}
      <CharacterSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </>
  );
}
