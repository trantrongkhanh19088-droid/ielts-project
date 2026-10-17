import React from 'react';
import { PixelCharacter } from '../types';
import { CharacterImage } from '../pixel-helper';

export const BATCH_1_CHARACTERS: PixelCharacter[] = [
  // 01. Raiden Shogun (Ei)
  {
    id: '01',
    name: 'Raiden Shogun (Ei)',
    jpName: '雷電将軍',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Inazuma shines eternal! ⚡',
    accentColor: '#7B2CBF',
    glowColor: 'rgba(123, 44, 191, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/01.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/01.png"
        alt="Raiden Shogun (Ei)"
        size={size}
        className={className}
        glowColor="rgba(123, 44, 191, 0.5)"
      />
    ),
  },
  // 02. Hu Tao
  {
    id: '02',
    name: 'Hu Tao',
    jpName: '胡桃',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Silly-churl, billy-churl, sil-ly-billy Hilichurl~ 👻',
    accentColor: '#FF4D4D',
    glowColor: 'rgba(255, 77, 77, 0.5)',
    particleType: 'fire',
    rarity: 5,
    imageUrl: '/characters/02.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/02.png"
        alt="Hu Tao"
        size={size}
        className={className}
        glowColor="rgba(255, 77, 77, 0.5)"
      />
    ),
  },
  // 03. Sandrone (Marionette)
  {
    id: '03',
    name: 'Sandrone (Marionette)',
    jpName: '傀儡 (サンドローネ)',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Utterly risible... My automatons will handle this. ⚙️',
    accentColor: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    particleType: 'gold_dust',
    rarity: 5,
    imageUrl: '/characters/03.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/03.png"
        alt="Sandrone (Marionette)"
        size={size}
        className={className}
        glowColor="rgba(212, 175, 55, 0.5)"
      />
    ),
  },
  // 04. Furina (Focalors)
  {
    id: '04',
    name: 'Furina (Focalors)',
    jpName: 'フリーナ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Let the world come alive! 💧',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    particleType: 'bubbles',
    rarity: 5,
    imageUrl: '/characters/04.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/04.png"
        alt="Furina (Focalors)"
        size={size}
        className={className}
        glowColor="rgba(59, 130, 246, 0.5)"
      />
    ),
  },
  // 05. Nahida
  {
    id: '05',
    name: 'Nahida',
    jpName: 'ナヒーダ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Everyone hold hands~ 🌱',
    accentColor: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.5)',
    particleType: 'leaves',
    rarity: 5,
    imageUrl: '/characters/05.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/05.png"
        alt="Nahida"
        size={size}
        className={className}
        glowColor="rgba(74, 222, 128, 0.5)"
      />
    ),
  },
  // 06. Yae Miko
  {
    id: '06',
    name: 'Yae Miko',
    jpName: '八重神子',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Right here, right now, emerge! 🌸',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    particleType: 'sakura',
    rarity: 5,
    imageUrl: '/characters/06.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/06.png"
        alt="Yae Miko"
        size={size}
        className={className}
        glowColor="rgba(244, 114, 182, 0.5)"
      />
    ),
  },
  // 07. Zhongli
  {
    id: '07',
    name: 'Zhongli',
    jpName: '鍾離',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Osmanthus wine tastes the same as I remember... ☄️',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    particleType: 'gold_dust',
    rarity: 5,
    imageUrl: '/characters/07.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/07.png"
        alt="Zhongli"
        size={size}
        className={className}
        glowColor="rgba(245, 158, 11, 0.5)"
      />
    ),
  },
  // 08. Kamisato Ayaka
  {
    id: '08',
    name: 'Kamisato Ayaka',
    jpName: '神里綾華',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'A blade embraces its duty! ❄️',
    accentColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.5)',
    particleType: 'ice',
    rarity: 5,
    imageUrl: '/characters/08.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/08.png"
        alt="Kamisato Ayaka"
        size={size}
        className={className}
        glowColor="rgba(96, 165, 250, 0.5)"
      />
    ),
  },
  // 09. Keqing
  {
    id: '09',
    name: 'Keqing',
    jpName: '刻晴',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Stop procrastinating! Let\'s go! ⚡',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    particleType: 'lightning',
    rarity: 5,
    imageUrl: '/characters/09.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/09.png"
        alt="Keqing"
        size={size}
        className={className}
        glowColor="rgba(168, 85, 247, 0.5)"
      />
    ),
  },
  // 10. Ganyu
  {
    id: '10',
    name: 'Ganyu',
    jpName: '甘雨',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'For Rex Lapis! ❄️',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    particleType: 'ice',
    rarity: 5,
    imageUrl: '/characters/10.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/10.png"
        alt="Ganyu"
        size={size}
        className={className}
        glowColor="rgba(56, 189, 248, 0.5)"
      />
    ),
  },
  // 11. Arlecchino (The Knave)
  {
    id: '11',
    name: 'Arlecchino (The Knave)',
    jpName: '召使 (アルレッキーノ)',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Everlasting as the moon... 🔥',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    particleType: 'blood',
    rarity: 5,
    imageUrl: '/characters/11.png',
    renderSprite: ({ size = 64, className = '' }) => (
      <CharacterImage
        src="/characters/11.png"
        alt="Arlecchino (The Knave)"
        size={size}
        className={className}
        glowColor="rgba(220, 38, 38, 0.5)"
      />
    ),
  },
];
