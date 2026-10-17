import React from 'react';
import { PixelCharacter } from '../types';
import { CharacterImage } from '../pixel-helper';

export const BATCH_4_CHARACTERS: PixelCharacter[] = [
  // 34. Chainsaw Man (Denji)
  {
    id: '34',
    name: 'Chainsaw Man (Denji)',
    jpName: 'チェンソーマン',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Vrrrnnn! Jam on toast, that\'s my dream! 🪚',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.5)',
    particleType: 'blood',
    rarity: 5,
    imageUrl: '/characters/34.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/34.png"
        alt="Chainsaw Man (Denji)"
        size={size}
        className={className}
        glowColor="rgba(234, 88, 12, 0.5)"
      />
    ),
  },
  // 35. Power
  {
    id: '35',
    name: 'Power',
    jpName: 'パワー',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Bow before me, human! For I am Power! 🩸',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.5)',
    particleType: 'blood',
    rarity: 5,
    imageUrl: '/characters/35.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/35.png"
        alt="Power"
        size={size}
        className={className}
        glowColor="rgba(225, 29, 72, 0.5)"
      />
    ),
  },
  // 36. Makima
  {
    id: '36',
    name: 'Makima',
    jpName: 'マキマ',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Bang. A necessary evil is always controlled. ⛓️',
    accentColor: '#BE123C',
    glowColor: 'rgba(190, 18, 60, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    imageUrl: '/characters/36.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/36.png"
        alt="Makima"
        size={size}
        className={className}
        glowColor="rgba(190, 18, 60, 0.5)"
      />
    ),
  },
  // 37. Satoru Gojo
  {
    id: '37',
    name: 'Satoru Gojo',
    jpName: '五条悟',
    origin: 'Jujutsu Kaisen',
    category: 'shonen_new',
    quote: 'Throughout heaven and earth, I alone am the honored one. 🤞',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    particleType: 'stars',
    rarity: 5,
    imageUrl: '/characters/37.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/37.png"
        alt="Satoru Gojo"
        size={size}
        className={className}
        glowColor="rgba(139, 92, 246, 0.5)"
      />
    ),
  },
  // 38. Ryomen Sukuna
  {
    id: '38',
    name: 'Ryomen Sukuna',
    jpName: '両面宿儺',
    origin: 'Jujutsu Kaisen',
    category: 'shonen_new',
    quote: 'Domain Expansion: Malevolent Shrine! ⛩️',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    particleType: 'blood',
    rarity: 5,
    imageUrl: '/characters/38.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/38.png"
        alt="Ryomen Sukuna"
        size={size}
        className={className}
        glowColor="rgba(220, 38, 38, 0.5)"
      />
    ),
  },
  // 39. Tanjiro Kamado
  {
    id: '39',
    name: 'Tanjiro Kamado',
    jpName: '竈門炭治郎',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Total Concentration: Water Breathing! 🌊',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    particleType: 'water',
    rarity: 5,
    imageUrl: '/characters/39.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/39.png"
        alt="Tanjiro Kamado"
        size={size}
        className={className}
        glowColor="rgba(16, 185, 129, 0.5)"
      />
    ),
  },
  // 40. Nezuko Kamado
  {
    id: '40',
    name: 'Nezuko Kamado',
    jpName: '竈門禰豆子',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Mmh mmh! Blood Demon Art: Exploding Blood! 🌸',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    particleType: 'sakura',
    rarity: 5,
    imageUrl: '/characters/40.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/40.png"
        alt="Nezuko Kamado"
        size={size}
        className={className}
        glowColor="rgba(244, 114, 182, 0.5)"
      />
    ),
  },
  // 41. Zenitsu Agatsuma
  {
    id: '41',
    name: 'Zenitsu Agatsuma',
    jpName: '我妻善逸',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Thunder Breathing, First Form: Thunderclap and Flash! ⚡',
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/41.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/41.png"
        alt="Zenitsu Agatsuma"
        size={size}
        className={className}
        glowColor="rgba(250, 204, 21, 0.5)"
      />
    ),
  },
  // 42. Levi Ackerman
  {
    id: '42',
    name: 'Levi Ackerman',
    jpName: 'リヴァイ・アッカーマン',
    origin: 'Attack on Titan',
    category: 'shonen_new',
    quote: 'Dedicate your hearts! Clean your rooms first. ⚔️',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.5)',
    particleType: 'feathers',
    rarity: 5,
    imageUrl: '/characters/42.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/42.png"
        alt="Levi Ackerman"
        size={size}
        className={className}
        glowColor="rgba(5, 150, 105, 0.5)"
      />
    ),
  },
  // 43. Eren Yeager
  {
    id: '43',
    name: 'Eren Yeager',
    jpName: 'エレン・イェーガー',
    origin: 'Attack on Titan',
    category: 'shonen_new',
    quote: 'If you win, you live. Tatakae! 🕊️',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.5)',
    particleType: 'fire',
    rarity: 5,
    imageUrl: '/characters/43.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/43.png"
        alt="Eren Yeager"
        size={size}
        className={className}
        glowColor="rgba(217, 119, 6, 0.5)"
      />
    ),
  },
  // 44. Sung Jin-Woo
  {
    id: '44',
    name: 'Sung Jin-Woo',
    jpName: 'ソン・ジヌ',
    origin: 'Solo Leveling',
    category: 'shonen_new',
    quote: 'Arise. 🌑',
    accentColor: '#7C3AED',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    imageUrl: '/characters/44.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/44.png"
        alt="Sung Jin-Woo"
        size={size}
        className={className}
        glowColor="rgba(124, 58, 237, 0.5)"
      />
    ),
  },
];
