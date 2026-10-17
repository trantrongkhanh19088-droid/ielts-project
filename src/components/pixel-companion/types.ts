import React from 'react';

export type CharacterCategory =
  | 'genshin_honkai'
  | 'shonen_classic'
  | 'shonen_new'
  | 'waifu_game';

export type ParticleType =
  | 'lightning'
  | 'fire'
  | 'sakura'
  | 'feathers'
  | 'bubbles'
  | 'blood'
  | 'notes'
  | 'water'
  | 'ice'
  | 'gold_dust'
  | 'leaves'
  | 'stars'
  | 'dark_aura'
  | 'spider_lily';

export interface PixelCharacter {
  id: string; // '01' to '55'
  name: string;
  jpName?: string;
  origin: string; // 'Genshin Impact', 'One Piece', etc.
  category: CharacterCategory;
  quote: string;
  accentColor: string; // e.g. '#7B2CBF'
  glowColor: string; // e.g. 'rgba(123, 44, 191, 0.45)'
  particleType: ParticleType;
  rarity?: 4 | 5; // For Gacha stars (5-star legendary)
  imageUrl: string; // High-res character anime artwork: '/characters/01.png'
  renderSprite: (props: { size?: number; className?: string }) => React.ReactNode;
}

export interface CompanionSettings {
  selectedCharacterId: string;
  size: 1 | 1.5 | 2; // 1x = 48px, 1.5x = 72px, 2x = 96px
  position: 'left' | 'right';
  syncThemeAccent: boolean;
  sakuraEnabled: boolean;
}

export const DEFAULT_COMPANION_SETTINGS: CompanionSettings = {
  selectedCharacterId: '01', // Raiden Shogun by default
  size: 1.5,
  position: 'right',
  syncThemeAccent: true,
  sakuraEnabled: true,
};
