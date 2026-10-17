import React from 'react';
import { PixelCharacter } from '../types';
import { CharacterImage } from '../pixel-helper';

export const BATCH_3_CHARACTERS: PixelCharacter[] = [
  // 23. Monkey D. Luffy
  {
    id: '23',
    name: 'Monkey D. Luffy',
    jpName: 'モンキー・D・ルフィ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Kaizoku ou ni, ore wa naru! 🍖',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/23.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/23.png"
        alt="Monkey D. Luffy"
        size={size}
        className={className}
        glowColor="rgba(239, 68, 68, 0.5)"
      />
    ),
  },
  // 24. Roronoa Zoro
  {
    id: '24',
    name: 'Roronoa Zoro',
    jpName: 'ロロノア・ゾロ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Nothing happened. ⚔️',
    accentColor: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    particleType: 'leaves',
    rarity: 5,
    imageUrl: '/characters/24.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/24.png"
        alt="Roronoa Zoro"
        size={size}
        className={className}
        glowColor="rgba(34, 197, 94, 0.5)"
      />
    ),
  },
  // 25. Sanji
  {
    id: '25',
    name: 'Sanji',
    jpName: 'サンジ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Cooking is a gift from the gods! 🚬',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    particleType: 'fire',
    rarity: 5,
    imageUrl: '/characters/25.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/25.png"
        alt="Sanji"
        size={size}
        className={className}
        glowColor="rgba(245, 158, 11, 0.5)"
      />
    ),
  },
  // 26. Naruto Uzumaki
  {
    id: '26',
    name: 'Naruto Uzumaki',
    jpName: 'うずまきナルト',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Dattebayo! That\'s my nindo! 🍥',
    accentColor: '#FF7A00',
    glowColor: 'rgba(255, 122, 0, 0.5)',
    particleType: 'fire',
    rarity: 5,
    imageUrl: '/characters/26.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/26.png"
        alt="Naruto Uzumaki"
        size={size}
        className={className}
        glowColor="rgba(255, 122, 0, 0.5)"
      />
    ),
  },
  // 27. Sasuke Uchiha
  {
    id: '27',
    name: 'Sasuke Uchiha',
    jpName: 'うちはサスケ',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Chidori! My eyes see through all darkness. ⚡',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/27.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/27.png"
        alt="Sasuke Uchiha"
        size={size}
        className={className}
        glowColor="rgba(99, 102, 241, 0.5)"
      />
    ),
  },
  // 28. Kakashi Hatake
  {
    id: '28',
    name: 'Kakashi Hatake',
    jpName: 'はたけカカシ',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Those who abandon their comrades are worse than scum. 📖',
    accentColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/28.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/28.png"
        alt="Kakashi Hatake"
        size={size}
        className={className}
        glowColor="rgba(148, 163, 184, 0.5)"
      />
    ),
  },
  // 29. Son Goku
  {
    id: '29',
    name: 'Son Goku',
    jpName: '孫悟空',
    origin: 'Dragon Ball Z',
    category: 'shonen_classic',
    quote: 'Kamehameha! I\'m getting excited! 💥',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    particleType: 'fire',
    rarity: 5,
    imageUrl: '/characters/29.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/29.png"
        alt="Son Goku"
        size={size}
        className={className}
        glowColor="rgba(249, 115, 22, 0.5)"
      />
    ),
  },
  // 30. Vegeta
  {
    id: '30',
    name: 'Vegeta',
    jpName: 'ベジータ',
    origin: 'Dragon Ball Z',
    category: 'shonen_classic',
    quote: 'I am the Prince of all Saiyans! Final Flash! 👑',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/30.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/30.png"
        alt="Vegeta"
        size={size}
        className={className}
        glowColor="rgba(59, 130, 246, 0.5)"
      />
    ),
  },
  // 31. Ichigo Kurosaki
  {
    id: '31',
    name: 'Ichigo Kurosaki',
    jpName: '黒崎一護',
    origin: 'Bleach',
    category: 'shonen_classic',
    quote: 'Bankai! Tensa Zangetsu! 🗡️',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    imageUrl: '/characters/31.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/31.png"
        alt="Ichigo Kurosaki"
        size={size}
        className={className}
        glowColor="rgba(249, 115, 22, 0.5)"
      />
    ),
  },
  // 32. Gon Freecss
  {
    id: '32',
    name: 'Gon Freecss',
    jpName: 'ゴン＝フリークス',
    origin: 'Hunter x Hunter',
    category: 'shonen_classic',
    quote: 'First comes rock! Jajanken! 🪨',
    accentColor: '#16A34A',
    glowColor: 'rgba(22, 163, 74, 0.5)',
    particleType: 'leaves',
    rarity: 5,
    imageUrl: '/characters/32.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/32.png"
        alt="Gon Freecss"
        size={size}
        className={className}
        glowColor="rgba(22, 163, 74, 0.5)"
      />
    ),
  },
  // 33. Killua Zoldyck
  {
    id: '33',
    name: 'Killua Zoldyck',
    jpName: 'キルア＝ゾルディック',
    origin: 'Hunter x Hunter',
    category: 'shonen_classic',
    quote: 'Godspeed! Electricity won\'t hurt me. ⚡',
    accentColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/33.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/33.png"
        alt="Killua Zoldyck"
        size={size}
        className={className}
        glowColor="rgba(96, 165, 250, 0.5)"
      />
    ),
  },
];
