import React from 'react';
import { PixelCharacter } from '../types';
import { PixelCanvas, P } from '../pixel-helper';

export const BATCH_4_CHARACTERS: PixelCharacter[] = [
  // 34. CHAINSAW MAN (DENJI & POCHITA)
  {
    id: '34',
    name: 'Chainsaw Man',
    jpName: 'チェンソーマン (デンジ)',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Vroom! Vroom! Kéo dây giật ngực nào! 🪚',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Cute Little Orange Pochita Pup Beside Him */}
        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
          <P x={2} y={20} w={6} h={5} c="#EA580C" />
          <P x={4} y={18} w={2} h={3} c="#94A3B8" /> {/* Small chainsaw blade on forehead */}
          <P x={1} y={21} w={2} h={2} c="#0F172A" /> {/* Handle tail */}
          <P x={6} y={21} w={1} h={1} c="#FFFFFF" /> {/* Cute eye */}
          <P x={6} y={22} w={1} h={1} c="#09090B" />
        </g>

        {/* Angular Orange-Red Chainsaw Helmet Head */}
        <P x={10} y={4} w={12} h={10} c="#EA580C" />
        <P x={12} y={3} w={8} h={2} c="#C2410C" />
        {/* Silver Chainsaw Blade protruding from Forehead */}
        <P x={15} y={0} w={2} h={7} c="#E2E8F0" />
        <P x={14} y={1} w={1} h={5} c="#94A3B8" /> {/* Saw teeth */}
        <P x={17} y={1} w={1} h={5} c="#94A3B8" />
        {/* Vicious White Fangs / Saw Teeth in Jaws */}
        <P x={11} y={11} w={10} h={3} c="#18181B" />
        <P x={12} y={11} w={2} h={2} c="#FFFFFF" />
        <P x={15} y={11} w={2} h={2} c="#FFFFFF" />
        <P x={18} y={11} w={2} h={2} c="#FFFFFF" />

        {/* White Shirt with Black Tie & Trousers */}
        <P x={11} y={15} w={10} h={10} c="#FFFFFF" />
        <P x={15} y={15} w={2} h={7} c="#09090B" /> {/* Black tie */}
        <P x={11} y={23} w={10} h={7} c="#0F172A" /> {/* Black trousers */}
        <P x={13} y={29} w={2} h={2} c="#713F12" /> {/* Brown shoes */}
        <P x={17} y={29} w={2} h={2} c="#713F12" />

        {/* Arm Chainsaw Blades */}
        <P x={7} y={14} w={2} h={12} c="#E2E8F0" />
        <P x={6} y={16} w={1} h={8} c="#94A3B8" />
        <P x={23} y={14} w={2} h={12} c="#E2E8F0" />
        <P x={25} y={16} w={1} h={8} c="#94A3B8" />
      </PixelCanvas>
    ),
  },

  // 35. POWER
  {
    id: '35',
    name: 'Power',
    jpName: 'パワー',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Bow before my supreme intellect! 🔨',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Giant Blood Hammer in Hand */}
        <P x={22} y={5} w={8} h={6} c="#991B1B" />
        <P x={23} y={6} w={6} h={4} c="#DC2626" />
        <P x={25} y={11} w={2} h={18} c="#B91C1C" /> {/* Blood handle */}

        {/* Pair of Sharp Blood Horns (Cặp sừng máu nhọn hoắt) */}
        <P x={12} y={1} w={2} h={4} c="#DC2626" />
        <P x={13} y={0} w={1} h={2} c="#EF4444" />
        <P x={18} y={1} w={2} h={4} c="#DC2626" />
        <P x={18} y={0} w={1} h={2} c="#EF4444" />

        {/* Long Strawberry Blonde Hair */}
        <P x={10} y={5} w={12} h={5} c="#FDE047" />
        <P x={8} y={9} w={3} h={18} c="#FCD34D" />
        <P x={20} y={9} w={3} h={18} c="#FCD34D" />

        {/* Loose Blue Jacket & White Shirt with Black Tie */}
        <P x={11} y={15} w={10} h={10} c="#1E3A8A" /> {/* Blue jacket */}
        <P x={13} y={15} w={6} h={8} c="#FFFFFF" /> {/* Shirt */}
        <P x={15} y={16} w={2} h={5} c="#09090B" /> {/* Tie */}
        <P x={11} y={23} w={10} h={7} c="#0F172A" /> {/* Trousers */}
        <P x={13} y={29} w={2} h={2} c="#DC2626" /> {/* Red sneakers */}
        <P x={17} y={29} w={2} h={2} c="#DC2626" />

        {/* Face & Target Circle Yellow-Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#FACC15" />
        <P x={13} y={11} w={1} h={1} c="#DC2626" /> {/* Blood cross */}
        <P x={17} y={11} w={2} h={2} c="#FACC15" />
        <P x={17} y={11} w={1} h={1} c="#DC2626" />
        <P x={15} y={13} w={2} h={1} c="#DC2626" /> {/* Fang smirk */}
      </PixelCanvas>
    ),
  },

  // 36. MAKIMA
  {
    id: '36',
    name: 'Makima',
    jpName: 'マキマ',
    origin: 'Chainsaw Man',
    category: 'shonen_new',
    quote: 'Bang. 👉',
    accentColor: '#BE123C',
    glowColor: 'rgba(190, 18, 60, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Red Control Chains */}
        <g className="animate-spin" style={{ animationDuration: '10s', transformOrigin: '16px 16px' }}>
          <circle cx="16" cy="16" r="11" fill="none" stroke="#E11D48" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        </g>

        {/* Pink-Red Braided Hair Draped Over Left Shoulder */}
        <P x={10} y={5} w={12} h={5} c="#FB7185" />
        <P x={8} y={10} w={3} h={18} c="#F43F5E" /> {/* Front braid */}
        <P x={9} y={20} w={2} h={7} c="#E11D48" />

        {/* Long Black Trenchcoat & Business Attire */}
        <P x={10} y={14} w={12} h={14} c="#0F172A" /> {/* Trenchcoat */}
        <P x={13} y={15} w={6} h={8} c="#FFFFFF" /> {/* White shirt */}
        <P x={15} y={16} w={2} h={5} c="#09090B" /> {/* Black tie */}
        <P x={12} y={23} w={8} h={7} c="#09090B" /> {/* Slacks */}
        <P x={13} y={29} w={2} h={2} c="#1E293B" /> {/* Heels */}
        <P x={17} y={29} w={2} h={2} c="#1E293B" />

        {/* Face & Concentric Yellow Ring Eyes (Mắt đồng tâm) */}
        <P x={12} y={8} w={8} h={7} c="#FFF1F2" />
        {/* Concentric Eyes */}
        <circle cx="14" cy="12" r="1.5" fill="#FACC15" />
        <circle cx="14" cy="12" r="0.8" fill="#B45309" />
        <circle cx="18" cy="12" r="1.5" fill="#FACC15" />
        <circle cx="18" cy="12" r="0.8" fill="#B45309" />
        <P x={15} y={14} w={2} h={1} c="#FDA4AF" /> {/* Calm sinister smile */}

        {/* Finger Gun Gesture "Bang" */}
        <P x={21} y={15} w={5} h={2} c="#FCE7F3" />
        <P x={25} y={15} w={2} h={1} c="#FCE7F3" /> {/* Pointed finger */}
      </PixelCanvas>
    ),
  },

  // 37. GOJO SATORU
  {
    id: '37',
    name: 'Gojo Satoru',
    jpName: '五条悟',
    origin: 'Jujutsu Kaisen',
    category: 'shonen_new',
    quote: 'Yowai mo~ Ryoiki Tenkai: Muryokusho! 🤞',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Hollow Purple (Tử) Fusion Sphere Above Hands */}
        <g className="animate-spin" style={{ animationDuration: '4s', transformOrigin: '16px 5px' }}>
          <circle cx="16" cy="5" r="4" fill="#A855F7" opacity="0.9" />
          <circle cx="14" cy="4" r="2" fill="#EF4444" opacity="0.8" /> {/* Reversal Red */}
          <circle cx="18" cy="6" r="2" fill="#3B82F6" opacity="0.8" /> {/* Lapse Blue */}
          <circle cx="16" cy="5" r="1" fill="#FFFFFF" />
        </g>

        {/* Spiky Snow-White Hair */}
        <P x={9} y={4} w={14} h={5} c="#F8FAFC" />
        <P x={8} y={2} w={4} h={4} c="#FFFFFF" />
        <P x={20} y={2} w={4} h={4} c="#FFFFFF" />
        <P x={14} y={1} w={4} h={3} c="#FFFFFF" />

        {/* Black Blindfold / Six Eyes Peeking */}
        <P x={10} y={8} w={12} h={3} c="#0F172A" /> {/* Black blindfold */}
        <P x={12} y={10} w={2} h={1} c="#38BDF8" /> {/* Glowing Six Eyes peek */}
        <P x={18} y={10} w={2} h={1} c="#38BDF8" />

        {/* High-Collared Jujutsu Sorcerer Black Uniform */}
        <P x={11} y={14} w={10} h={11} c="#09090B" />
        <P x={12} y={14} w={8} h={4} c="#18181B" /> {/* High stiff collar */}
        <P x={11} y={23} w={10} h={7} c="#09090B" /> {/* Black pants */}
        <P x={13} y={29} w={2} h={2} c="#18181B" /> {/* Black dress shoes */}
        <P x={17} y={29} w={2} h={2} c="#18181B" />

        {/* Face */}
        <P x={12} y={8} w={8} h={6} c="#FFF1F2" />
        <P x={14} y={13} w={4} h={1} c="#09090B" /> {/* Confident smirk */}

        {/* Crossed Fingers Domain Expansion Hands */}
        <P x={14} y={16} w={4} h={3} c="#FCE7F3" />
      </PixelCanvas>
    ),
  },

  // 38. RYOMEN SUKUNA
  {
    id: '38',
    name: 'Ryomen Sukuna',
    jpName: '両面宿儺',
    origin: 'Jujutsu Kaisen',
    category: 'shonen_new',
    quote: 'Ryoiki Tenkai: Fukuma Mizushi! (Lãnh địa triển khai!) ⛩️',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Malevolent Shrine Skull Throne Silhouette */}
        <P x={4} y={27} w={24} h={4} c="#18181B" />
        <circle cx="7" cy="27" r="2" fill="#E2E8F0" />
        <circle cx="25" cy="27" r="2" fill="#E2E8F0" />

        {/* Spiky Pink Hair */}
        <P x={9} y={3} w={14} h={5} c="#F472B6" />
        <P x={8} y={2} w={4} h={3} c="#EC4899" />
        <P x={20} y={2} w={4} h={3} c="#EC4899" />

        {/* Face with Black Demonic Tribal Markings & 4 Eyes */}
        <P x={12} y={7} w={8} h={8} c="#FCE7F3" />
        <P x={14} y={7} w={4} h={1} c="#09090B" /> {/* Forehead mark */}
        {/* Primary Red Demonic Eyes */}
        <P x={13} y={9} w={2} h={2} c="#DC2626" />
        <P x={17} y={9} w={2} h={2} c="#DC2626" />
        {/* Two Smaller Slit Eyes Beneath */}
        <P x={13} y={12} w={2} h={1} c="#DC2626" />
        <P x={17} y={12} w={2} h={1} c="#DC2626" />
        {/* Black tribal cheek lines */}
        <P x={12} y={10} w={1} h={3} c="#09090B" />
        <P x={19} y={10} w={1} h={3} c="#09090B" />
        <P x={14} y={14} w={4} h={1} c="#7F1D1D" /> {/* Malevolent grin */}

        {/* White Kimono with Open Chest & Black Tribal Tattoos */}
        <P x={11} y={15} w={10} h={12} c="#FFFFFF" />
        <P x={13} y={15} w={6} h={6} c="#FCE7F3" /> {/* Exposed chest */}
        <P x={14} y={17} w={4} h={2} c="#09090B" /> {/* Black chest tattoo */}
        <P x={12} y={21} w={8} h={3} c="#18181B" /> {/* Black sash */}
        <P x={11} y={24} w={10} h={4} c="#F8FAFC" />
      </PixelCanvas>
    ),
  },

  // 39. TANJIRO KAMADO
  {
    id: '39',
    name: 'Tanjiro Kamado',
    jpName: '竈門炭治郎',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Hinokami Kagura! 🔥🌊',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    particleType: 'fire',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Wooden Nezuko Box on Back */}
        <P x={21} y={13} w={5} h={12} c="#78350F" />
        <P x={22} y={14} w={3} h={10} c="#92400E" />
        <P x={21} y={16} w={5} h={1} c="#18181B" /> {/* Iron bracket */}
        <P x={21} y={21} w={5} h={1} c="#18181B" />

        {/* Dark Red-Black Hair */}
        <P x={10} y={5} w={12} h={5} c="#1C1917" />
        <P x={9} y={8} w={3} h={6} c="#991B1B" /> {/* Dark red fringe */}
        <P x={20} y={8} w={3} h={6} c="#991B1B" />

        {/* Flame Scar on Upper Left Forehead */}
        <P x={13} y={7} w={2} h={3} c="#DC2626" />
        <P x={14} y={8} w={1} h={2} c="#7F1D1D" />

        {/* Hanafuda Rising Sun Earrings */}
        <P x={8} y={11} w={2} h={3} c="#FFFFFF" stroke="#09090B" strokeWidth="0.5" />
        <P x={8} y={12} w={1} h={1} c="#DC2626" /> {/* Sun */}
        <P x={22} y={11} w={2} h={3} c="#FFFFFF" stroke="#09090B" strokeWidth="0.5" />
        <P x={23} y={12} w={1} h={1} c="#DC2626" />

        {/* Green-and-Black Checkered Haori (Ichimatsu Pattern) */}
        <P x={11} y={15} w={10} h={10} c="#064E3B" />
        {/* Checkered blocks */}
        <P x={11} y={15} w={3} h={3} c="#10B981" />
        <P x={17} y={15} w={3} h={3} c="#10B981" />
        <P x={14} y={18} w={3} h={3} c="#10B981" />
        <P x={11} y={21} w={3} h={3} c="#10B981" />
        <P x={17} y={21} w={3} h={3} c="#10B981" />
        <P x={12} y={24} w={8} h={5} c="#1C1917" /> {/* Black uniform pants */}
        <P x={13} y={28} w={2} h={2} c="#F8FAFC" /> {/* White leg wraps */}
        <P x={17} y={28} w={2} h={2} c="#F8FAFC" />

        {/* Face & Warm Dark Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#7F1D1D" />
        <P x={17} y={11} w={2} h={2} c="#7F1D1D" />

        {/* Nichirin Blade with Water Whirlpool & Solar Flame */}
        <P x={5} y={14} w={2} h={16} c="#09090B" /> {/* Black blade */}
        <g className="animate-pulse" style={{ animationDuration: '1.2s' }}>
          <circle cx="5" cy="18" r="3" fill="none" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="5" cy="24" r="3" fill="none" stroke="#EA580C" strokeWidth="1" />
        </g>
      </PixelCanvas>
    ),
  },

  // 40. NEZUKO KAMADO
  {
    id: '40',
    name: 'Nezuko Kamado',
    jpName: '竈門禰豆子',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Hmm! Hmph~ 💕',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Long Black Hair with Flame Orange Ends */}
        <P x={9} y={5} w={14} h={6} c="#09090B" />
        <P x={8} y={10} w={3} h={18} c="#09090B" />
        <P x={8} y={22} w={3} h={6} c="#EA580C" /> {/* Flame orange dip dye */}
        <P x={21} y={10} w={3} h={18} c="#09090B" />
        <P x={21} y={22} w={3} h={6} c="#EA580C" />

        {/* Pink Kimono (Asanoha Pattern) & Black Haori */}
        <P x={10} y={15} w={12} h={13} c="#18181B" /> {/* Black haori outer */}
        <P x={12} y={15} w={8} h={11} c="#F472B6" /> {/* Pink kimono */}
        <P x={13} y={18} w={6} h={3} c="#DC2626" /> {/* Red-white checkered Obi */}
        <P x={13} y={19} w={6} h={1} c="#FFFFFF" />
        <P x={12} y={26} w={8} h={4} c="#18181B" /> {/* Black leg wraps */}

        {/* Face with Big Innocent Pink Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#F472B6" />
        <P x={14} y={10} w={1} h={1} c="#FFFFFF" />
        <P x={17} y={10} w={2} h={2} c="#F472B6" />
        <P x={18} y={10} w={1} h={1} c="#FFFFFF" />

        {/* Green Bamboo Muzzle Tied with Red Cord (Ống tre xanh) */}
        <P x={13} y={13} w={6} h={3} c="#15803D" />
        <P x={14} y={13} w={4} h={3} c="#22C55E" /> {/* Bamboo tube */}
        <P x={11} y={14} w={2} h={1} c="#DC2626" /> {/* Red cord left */}
        <P x={19} y={14} w={2} h={1} c="#DC2626" /> {/* Red cord right */}
      </PixelCanvas>
    ),
  },

  // 41. ZENITSU AGATSUMA
  {
    id: '41',
    name: 'Zenitsu Agatsuma',
    jpName: '我妻善逸',
    origin: 'Demon Slayer',
    category: 'shonen_new',
    quote: 'Kaminari no Kokyu, Ichi no Kata: Hekireki Issen! ⚡',
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Tiered Square-Cut Yellow-Orange Hair */}
        <P x={10} y={4} w={12} h={5} c="#FACC15" />
        <P x={8} y={9} w={4} h={5} c="#EA580C" /> {/* Orange square tier */}
        <P x={20} y={9} w={4} h={5} c="#EA580C" />
        <P x={11} y={8} w={10} h={3} c="#FACC15" />

        {/* Bright Yellow Haori with White Triangles */}
        <P x={11} y={15} w={10} h={10} c="#EAB308" />
        {/* White Triangles */}
        <polygon points="13,16 12,18 14,18" fill="#FFFFFF" />
        <polygon points="18,16 17,18 19,18" fill="#FFFFFF" />
        <polygon points="15,20 14,22 16,22" fill="#FFFFFF" />
        <P x={12} y={23} w={8} h={5} c="#18181B" /> {/* Black uniform */}
        <P x={13} y={28} w={2} h={2} c="#FACC15" /> {/* Yellow leg wraps */}
        <P x={17} y={28} w={2} h={2} c="#FACC15" />

        {/* Eyes Closed in Sleeping Iaijutsu Drawing Stance */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={1} c="#09090B" /> {/* Sleeping eye */}
        <P x={17} y={11} w={2} h={1} c="#09090B" />

        {/* Thunder Katana with Crackling Yellow Lightning */}
        <P x={6} y={18} w={4} h={11} c="#FACC15" />
        <g className="animate-pulse" style={{ animationDuration: '0.6s' }}>
          <P x={3} y={16} w={4} h={1} c="#FEF08A" />
          <P x={22} y={19} w={4} h={1} c="#FEF08A" />
        </g>
      </PixelCanvas>
    ),
  },

  // 42. LEVI ACKERMAN
  {
    id: '42',
    name: 'Levi Ackerman',
    jpName: 'リヴァイ・アッカーマン',
    origin: 'Attack on Titan',
    category: 'shonen_new',
    quote: 'Shinzo wo Sasageyo! Hãy dâng hiến trái tim! ⚔️',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Undercut Parted Raven Hair */}
        <P x={10} y={5} w={12} h={4} c="#09090B" />
        <P x={9} y={8} w={3} h={4} c="#09090B" />
        <P x={20} y={8} w={3} h={4} c="#09090B" />
        <P x={14} y={8} w={1} h={2} c="#09090B" /> {/* Middle part */}

        {/* Emerald Scout Cape with Wings of Freedom */}
        <P x={10} y={14} w={12} h={12} c="#065F46" />
        {/* Survey Corps Wings of Freedom (White & Blue) on Back */}
        <P x={14} y={18} w={2} h={3} c="#FFFFFF" />
        <P x={16} y={18} w={2} h={3} c="#2563EB" />

        {/* Brown Jacket, White Cravat & White Trousers */}
        <P x={12} y={15} w={8} h={8} c="#78350F" />
        <P x={14} y={14} w={4} h={3} c="#FFFFFF" /> {/* White cravat */}
        <P x={12} y={22} w={8} h={4} c="#F8FAFC" /> {/* White pants with leather straps */}
        <P x={12} y={23} w={8} h={1} c="#451A03" /> {/* Leather strap */}
        <P x={13} y={26} w={2} h={4} c="#451A03" /> {/* Knee-high boots */}
        <P x={17} y={26} w={2} h={4} c="#451A03" />

        {/* Face & Cold Emotionless Glare */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={1} c="#334155" />
        <P x={17} y={10} w={2} h={1} c="#334155" />
        <P x={14} y={13} w={4} h={1} c="#09090B" />

        {/* Reverse-Grip Snap Blades & ODM Gear */}
        <P x={6} y={18} w={1} h={9} c="#94A3B8" /> {/* Reverse blade left */}
        <P x={25} y={18} w={1} h={9} c="#94A3B8" /> {/* Reverse blade right */}
        <P x={8} y={21} w={3} h={4} c="#64748B" /> {/* ODM box left */}
        <P x={21} y={21} w={3} h={4} c="#64748B" /> {/* ODM box right */}
      </PixelCanvas>
    ),
  },

  // 43. EREN YEAGER
  {
    id: '43',
    name: 'Eren Yeager',
    jpName: 'エレン・イェーガー',
    origin: 'Attack on Titan',
    category: 'shonen_new',
    quote: 'Tatakae... Tatakae! (Chiến đấu đi!) ⚡',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Yellow Titan Shifter Lightning Striking Down */}
        <g className="animate-pulse" style={{ animationDuration: '0.9s' }}>
          <P x={15} y={0} w={2} h={8} c="#FDE047" />
          <P x={13} y={4} w={6} h={1} c="#FACC15" />
        </g>

        {/* Dark Brown Man-Bun Hair */}
        <P x={10} y={4} w={12} h={5} c="#29150B" />
        <P x={8} y={8} w={3} h={9} c="#29150B" />
        <P x={21} y={8} w={3} h={9} c="#29150B" />
        <P x={14} y={2} w={4} h={3} c="#451A03" /> {/* Man bun knot */}

        {/* Long Dark Coat & Shirt */}
        <P x={10} y={14} w={12} h={14} c="#1C1917" />
        <P x={13} y={14} w={6} h={8} c="#44403C" />
        <P x={14} y={15} w={4} h={5} c="#FCE7F3" /> {/* Bare chest */}
        <P x={12} y={24} w={8} h={6} c="#09090B" />

        {/* Face & Piercing Teal/Green Titan Eyes */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#047857" />
        <P x={14} y={10} w={1} h={1} c="#34D399" />
        <P x={17} y={10} w={2} h={2} c="#047857" />
        <P x={18} y={10} w={1} h={1} c="#34D399" />

        {/* Hand Raised to Bite (Cắn tay biến hình) with Blood Spark */}
        <P x={13} y={13} w={3} h={3} c="#FCE7F3" />
        <P x={14} y={12} w={1} h={1} c="#DC2626" /> {/* Blood droplet */}
      </PixelCanvas>
    ),
  },

  // 44. SUNG JIN-WOO
  {
    id: '44',
    name: 'Sung Jin-Woo',
    jpName: 'ソン・ジヌ',
    origin: 'Solo Leveling',
    category: 'shonen_new',
    quote: 'Arise. (Trỗi dậy đi.) 🌑',
    accentColor: '#7C3AED',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    particleType: 'dark_aura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Shadow Soldier Silhouette Arising Behind (Lính bóng tối) */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          <P x={3} y={10} w={6} h={18} c="#1E1B4B" />
          <P x={5} y={12} w={2} h={2} c="#A855F7" /> {/* Shadow eye */}
          <P x={23} y={10} w={6} h={18} c="#1E1B4B" />
          <P x={25} y={12} w={2} h={2} c="#A855F7" />
        </g>

        {/* Sleek Dark Hair */}
        <P x={10} y={4} w={12} h={5} c="#09090B" />
        <P x={9} y={8} w={3} h={6} c="#09090B" />
        <P x={20} y={8} w={3} h={6} c="#09090B" />

        {/* Long Shadow Monarch Black Coat with Violet Highlights */}
        <P x={10} y={14} w={12} h={14} c="#09090B" />
        <P x={13} y={14} w={6} h={7} c="#1E1B4B" />
        <P x={11} y={23} w={10} h={7} c="#09090B" />

        {/* Face & Piercing Violet-Blue Glowing Eyes */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#7C3AED" />
        <P x={14} y={10} w={1} h={1} c="#C084FC" /> {/* Glow center */}
        <P x={17} y={10} w={2} h={2} c="#7C3AED" />
        <P x={18} y={10} w={1} h={1} c="#C084FC" />

        {/* Dual Glowing Violet Daggers (Cặp dao găm phát sáng) */}
        <P x={6} y={17} w={2} h={8} c="#A855F7" />
        <P x={7} y={18} w={1} h={6} c="#E9D5FF" />
        <P x={24} y={17} w={2} h={8} c="#A855F7" />
        <P x={24} y={18} w={1} h={6} c="#E9D5FF" />
      </PixelCanvas>
    ),
  },
];
