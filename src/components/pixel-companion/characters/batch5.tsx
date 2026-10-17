import React from 'react';
import { PixelCharacter } from '../types';
import { CharacterImage } from '../pixel-helper';

export const BATCH_5_CHARACTERS: PixelCharacter[] = [
  // 45. Hatsune Miku
  {
    id: '45',
    name: 'Hatsune Miku',
    jpName: '初音ミク',
    origin: 'Vocaloid',
    category: 'waifu_game',
    quote: 'Sing with all your heart! 🎵',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    particleType: 'notes',
    rarity: 5,
    imageUrl: '/characters/45.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/45.png"
        alt="Hatsune Miku"
        size={size}
        className={className}
        glowColor="rgba(6, 182, 212, 0.5)"
      />
    ),
  },
  // 46. Rem
  {
    id: '46',
    name: 'Rem',
    jpName: 'レム',
    origin: 'Re:Zero',
    category: 'waifu_game',
    quote: 'From zero, let\'s start our story! 💙',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    particleType: 'ice',
    rarity: 5,
    imageUrl: '/characters/46.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/46.png"
        alt="Rem"
        size={size}
        className={className}
        glowColor="rgba(56, 189, 248, 0.5)"
      />
    ),
  },
  // 47. Zero Two
  {
    id: '47',
    name: 'Zero Two',
    jpName: 'ゼロツー',
    origin: 'Darling in the Franxx',
    category: 'waifu_game',
    quote: 'Will you be my Darling? 🍭',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    particleType: 'sakura',
    rarity: 5,
    imageUrl: '/characters/47.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/47.png"
        alt="Zero Two"
        size={size}
        className={className}
        glowColor="rgba(244, 63, 94, 0.5)"
      />
    ),
  },
  // 48. Marin Kitagawa
  {
    id: '48',
    name: 'Marin Kitagawa',
    jpName: '喜多川海夢',
    origin: 'My Dress-Up Darling',
    category: 'waifu_game',
    quote: 'Gojo-kun! Let\'s do cosplay together! ✨',
    accentColor: '#FB7185',
    glowColor: 'rgba(251, 113, 133, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/48.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/48.png"
        alt="Marin Kitagawa"
        size={size}
        className={className}
        glowColor="rgba(251, 113, 133, 0.5)"
      />
    ),
  },
  // 49. Frieren
  {
    id: '49',
    name: 'Frieren',
    jpName: 'フリーレン',
    origin: 'Frieren: Beyond Journey\'s End',
    category: 'waifu_game',
    quote: 'It\'s dark! It\'s scary! Mimic help! 🪄',
    accentColor: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.5)',
    particleType: 'feathers',
    rarity: 5,
    imageUrl: '/characters/49.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/49.png"
        alt="Frieren"
        size={size}
        className={className}
        glowColor="rgba(226, 232, 240, 0.5)"
      />
    ),
  },
  // 50. Fern
  {
    id: '50',
    name: 'Fern',
    jpName: 'フェルン',
    origin: 'Frieren: Beyond Journey\'s End',
    category: 'waifu_game',
    quote: 'Zoltraak. Frieren-sama, please wake up. 🦋',
    accentColor: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/50.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/50.png"
        alt="Fern"
        size={size}
        className={className}
        glowColor="rgba(147, 51, 234, 0.5)"
      />
    ),
  },
  // 51. Anya Forger
  {
    id: '51',
    name: 'Anya Forger',
    jpName: 'アーニャ・フォージャー',
    origin: 'Spy x Family',
    category: 'waifu_game',
    quote: 'Waku waku! Heh 𓁹‿𓁹 Peanuts! 🥜',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/51.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/51.png"
        alt="Anya Forger"
        size={size}
        className={className}
        glowColor="rgba(244, 114, 182, 0.5)"
      />
    ),
  },
  // 52. Yor Forger
  {
    id: '52',
    name: 'Yor Forger',
    jpName: 'ヨル・フォージャー',
    origin: 'Spy x Family',
    category: 'waifu_game',
    quote: 'May I have the honor of taking your life? 🌹',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.5)',
    particleType: 'blood',
    rarity: 5,
    imageUrl: '/characters/52.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/52.png"
        alt="Yor Forger"
        size={size}
        className={className}
        glowColor="rgba(225, 29, 72, 0.5)"
      />
    ),
  },
  // 53. Kurumi Tokisaki
  {
    id: '53',
    name: 'Kurumi Tokisaki',
    jpName: '時崎狂三',
    origin: 'Date A Live',
    category: 'waifu_game',
    quote: 'Zafkiel! Our date has only just begun, Ara ara~ ⏳',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    particleType: 'spider_lily',
    rarity: 5,
    imageUrl: '/characters/53.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/53.png"
        alt="Kurumi Tokisaki"
        size={size}
        className={className}
        glowColor="rgba(220, 38, 38, 0.5)"
      />
    ),
  },
  // 54. Saber (Artoria)
  {
    id: '54',
    name: 'Saber (Artoria)',
    jpName: 'アルトリア・ペンドラゴン',
    origin: 'Fate/stay night',
    category: 'waifu_game',
    quote: 'I ask of you: Are you my Master? Excalibur! ⚔️',
    accentColor: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.5)',
    particleType: 'gold_dust',
    rarity: 5,
    imageUrl: '/characters/54.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/54.png"
        alt="Saber (Artoria)"
        size={size}
        className={className}
        glowColor="rgba(37, 99, 235, 0.5)"
      />
    ),
  },
  // 55. 2B (NieR)
  {
    id: '55',
    name: '2B (NieR)',
    jpName: 'ヨルハ二号B型',
    origin: 'NieR: Automata',
    category: 'waifu_game',
    quote: 'Everything that lives is designed to end. Glory to mankind. 🤖',
    accentColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.5)',
    particleType: 'feathers',
    rarity: 5,
    imageUrl: '/characters/55.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/55.png"
        alt="2B (NieR)"
        size={size}
        className={className}
        glowColor="rgba(148, 163, 184, 0.5)"
      />
    ),
  },
];
