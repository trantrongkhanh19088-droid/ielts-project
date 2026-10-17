import React from 'react';
import { PixelCharacter } from '../types';
import { CharacterImage } from '../pixel-helper';

export const BATCH_2_CHARACTERS: PixelCharacter[] = [
  // 12. Navia
  {
    id: '12',
    name: 'Navia',
    jpName: 'ナヴィア',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Umbrella warfare, I guess! ☂️',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    particleType: 'gold_dust',
    rarity: 5,
    imageUrl: '/characters/12.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/12.png"
        alt="Navia"
        size={size}
        className={className}
        glowColor="rgba(234, 179, 8, 0.5)"
      />
    ),
  },
  // 13. Neuvillette
  {
    id: '13',
    name: 'Neuvillette',
    jpName: 'ヌヴィレット',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Order in the court! 🌊',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.5)',
    particleType: 'water',
    rarity: 5,
    imageUrl: '/characters/13.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/13.png"
        alt="Neuvillette"
        size={size}
        className={className}
        glowColor="rgba(2, 132, 199, 0.5)"
      />
    ),
  },
  // 14. Xiao
  {
    id: '14',
    name: 'Xiao',
    jpName: '魈',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Evil conquering! Disappear! 🍃',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    imageUrl: '/characters/14.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/14.png"
        alt="Xiao"
        size={size}
        className={className}
        glowColor="rgba(16, 185, 129, 0.5)"
      />
    ),
  },
  // 15. Kaedehara Kazuha
  {
    id: '15',
    name: 'Kaedehara Kazuha',
    jpName: '楓原万葉',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Fallen leaves, adorn my night! 🍁',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    particleType: 'leaves',
    rarity: 5,
    imageUrl: '/characters/15.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/15.png"
        alt="Kaedehara Kazuha"
        size={size}
        className={className}
        glowColor="rgba(249, 115, 22, 0.5)"
      />
    ),
  },
  // 16. Venti
  {
    id: '16',
    name: 'Venti',
    jpName: 'ウェンティ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Time for a ballad! 🍃',
    accentColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.5)',
    particleType: 'feathers',
    rarity: 5,
    imageUrl: '/characters/16.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/16.png"
        alt="Venti"
        size={size}
        className={className}
        glowColor="rgba(52, 211, 153, 0.5)"
      />
    ),
  },
  // 17. Shenhe
  {
    id: '17',
    name: 'Shenhe',
    jpName: '申鶴',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Transformation... begins. ❄️',
    accentColor: '#7DD3FC',
    glowColor: 'rgba(125, 211, 252, 0.5)',
    particleType: 'ice',
    rarity: 5,
    imageUrl: '/characters/17.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/17.png"
        alt="Shenhe"
        size={size}
        className={className}
        glowColor="rgba(125, 211, 252, 0.5)"
      />
    ),
  },
  // 18. Nilou
  {
    id: '18',
    name: 'Nilou',
    jpName: 'ニィロウ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Dance with the ripples! 💧',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    particleType: 'bubbles',
    rarity: 5,
    imageUrl: '/characters/18.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/18.png"
        alt="Nilou"
        size={size}
        className={className}
        glowColor="rgba(6, 182, 212, 0.5)"
      />
    ),
  },
  // 19. Kafka
  {
    id: '19',
    name: 'Kafka',
    jpName: 'カフカ',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'Boom. Time to listen... 🕸️',
    accentColor: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    imageUrl: '/characters/19.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/19.png"
        alt="Kafka"
        size={size}
        className={className}
        glowColor="rgba(147, 51, 234, 0.5)"
      />
    ),
  },
  // 20. Firefly (Đom Đóm)
  {
    id: '20',
    name: 'Firefly (Đom Đóm)',
    jpName: 'ホタル',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'I will set the seas ablaze! 🔥',
    accentColor: '#2DD4BF',
    glowColor: 'rgba(45, 212, 191, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/20.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/20.png"
        alt="Firefly (Đom Đóm)"
        size={size}
        className={className}
        glowColor="rgba(45, 212, 191, 0.5)"
      />
    ),
  },
  // 21. Acheron
  {
    id: '21',
    name: 'Acheron',
    jpName: '黄泉',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'I weep for the departed... 🌺',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.5)',
    particleType: 'spider_lily',
    rarity: 5,
    imageUrl: '/characters/21.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/21.png"
        alt="Acheron"
        size={size}
        className={className}
        glowColor="rgba(225, 29, 72, 0.5)"
      />
    ),
  },
  // 22. Sparkle (Hanabi)
  {
    id: '22',
    name: 'Sparkle (Hanabi)',
    jpName: '花火',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'All the world\'s a stage! 🎭',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    particleType: 'sakura',
    rarity: 5,
    imageUrl: '/characters/22.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/22.png"
        alt="Sparkle (Hanabi)"
        size={size}
        className={className}
        glowColor="rgba(239, 68, 68, 0.5)"
      />
    ),
  },
];
