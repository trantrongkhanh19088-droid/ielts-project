import React from 'react';
import { PixelCharacter } from '../types';
import { PixelCanvas, P } from '../pixel-helper';

export const BATCH_5_CHARACTERS: PixelCharacter[] = [
  // 45. HATSUNE MIKU
  {
    id: '45',
    name: 'Hatsune Miku',
    jpName: '初音ミク',
    origin: 'Vocaloid',
    category: 'waifu_game',
    quote: 'Sekai de ichiban ohime-sama~ 🎵',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    particleType: 'notes',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Musical Notes */}
        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
          <P x={4} y={7} w={2} h={3} c="#06B6D4" />
          <P x={5} y={6} w={2} h={1} c="#06B6D4" />
          <P x={26} y={8} w={2} h={3} c="#EC4899" />
        </g>

        {/* Floor-Length Cyan Twin-Tails with Black-Pink Square Hair Ties */}
        <P x={7} y={7} w={3} h={2} c="#09090B" /> {/* Black-pink hair ribbon */}
        <P x={8} y={8} w={1} h={1} c="#EC4899" />
        <P x={6} y={9} w={4} h={21} c="#06B6D4" /> {/* Massive left twin-tail */}
        <P x={22} y={7} w={3} h={2} c="#09090B" />
        <P x={23} y={8} w={1} h={1} c="#EC4899" />
        <P x={22} y={9} w={4} h={21} c="#06B6D4" /> {/* Massive right twin-tail */}

        {/* Short Center Bangs with Black Headset */}
        <P x={10} y={5} w={12} h={5} c="#0891B2" />
        <P x={8} y={6} w={2} h={4} c="#18181B" /> {/* Headset left */}
        <P x={8} y={7} w={1} h={2} c="#EC4899" /> {/* Pink headset light */}
        <P x={22} y={6} w={2} h={4} c="#18181B" /> {/* Headset right */}
        <P x={23} y={7} w={1} h={2} c="#EC4899" />

        {/* Sleeveless Silver Blouse, Cyan Tie & Pleated Skirt */}
        <P x={12} y={15} w={8} h={10} c="#CBD5E1" /> {/* Silver blouse */}
        <P x={15} y={15} w={2} h={6} c="#06B6D4" /> {/* Cyan tie */}
        <P x={11} y={22} w={10} h={4} c="#09090B" /> {/* Black pleated skirt */}
        <P x={11} y={25} w={10} h={1} c="#06B6D4" /> {/* Cyan skirt trim */}

        {/* Thigh-High Boots with Cyan Trim */}
        <P x={13} y={26} w={2} h={5} c="#09090B" />
        <P x={17} y={26} w={2} h={5} c="#09090B" />
        <P x={13} y={26} w={2} h={1} c="#06B6D4" />
        <P x={17} y={26} w={2} h={1} c="#06B6D4" />

        {/* Face & Sparkling Cyan Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0891B2" />
        <P x={14} y={11} w={1} h={1} c="#67E8F9" />
        <P x={17} y={11} w={2} h={2} c="#0891B2" />
        <P x={18} y={11} w={1} h={1} c="#67E8F9" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" />

        {/* Green Leek (Hành lá) in Hand */}
        <P x={24} y={14} w={2} h={8} c="#22C55E" />
        <P x={24} y={20} w={2} h={4} c="#F8FAFC" /> {/* White leek stem */}
      </PixelCanvas>
    ),
  },

  // 46. REM
  {
    id: '46',
    name: 'Rem',
    jpName: 'レム',
    origin: 'Re:Zero',
    category: 'waifu_game',
    quote: 'Fanatic like a demon! Rem luôn ở bên bạn~ 💙',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Spiked Iron Morningstar Flail with Chain */}
        <g className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '4px 22px' }}>
          <circle cx="4" cy="22" r="3" fill="#334155" />
          <P x={3} y={21} w={2} h={2} c="#94A3B8" />
        </g>
        <path d="M 4 22 Q 8 18 11 19" stroke="#64748B" strokeWidth="1" strokeDasharray="1 1" fill="none" />

        {/* Soft Sky Blue Short Hair Covering Right Eye */}
        <P x={10} y={5} w={12} h={5} c="#7DD3FC" />
        <P x={8} y={9} w={4} h={8} c="#38BDF8" />
        <P x={16} y={8} w={6} h={8} c="#38BDF8" /> {/* Hair covering right eye */}

        {/* White Maid Headband & Pink Flower Hair Clip */}
        <P x={10} y={4} w={12} h={2} c="#F8FAFC" /> {/* Maid frill */}
        <P x={18} y={5} w={3} h={3} c="#F43F5E" /> {/* Pink flower clip */}

        {/* Black & White Off-Shoulder Maid Dress */}
        <P x={11} y={15} w={10} h={10} c="#0F172A" />
        <P x={13} y={15} w={6} h={5} c="#FFFFFF" /> {/* White apron frill */}
        <P x={14} y={16} w={4} h={3} c="#FCE7F3" /> {/* Exposed off-shoulder */}
        <P x={11} y={22} w={10} h={5} c="#0F172A" /> {/* Black skirt */}
        <P x={12} y={23} w={8} h={4} c="#FFFFFF" /> {/* White apron front */}
        <P x={13} y={27} w={2} h={3} c="#F8FAFC" /> {/* White stockings */}
        <P x={17} y={27} w={2} h={3} c="#F8FAFC" />
        <P x={13} y={30} w={2} h={1} c="#0F172A" /> {/* Shoes */}
        <P x={17} y={30} w={2} h={1} c="#0F172A" />

        {/* Face & Left Visible Sky-Blue Eye */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0284C7" /> {/* Only left eye exposed */}
        <P x={14} y={11} w={1} h={1} c="#BAE6FD" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" />
      </PixelCanvas>
    ),
  },

  // 47. ZERO TWO
  {
    id: '47',
    name: 'Zero Two',
    jpName: 'ゼロツー',
    origin: 'Darling in the Franxx',
    category: 'waifu_game',
    quote: 'Found you, my Darling~ 🍬',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Pair of Small Red Horns with White Headband */}
        <P x={11} y={3} w={10} h={2} c="#F8FAFC" /> {/* White headband */}
        <P x={12} y={1} w={2} h={3} c="#DC2626" /> {/* Small red horn left */}
        <P x={18} y={1} w={2} h={3} c="#DC2626" /> {/* Small red horn right */}

        {/* Long Pastel Pink Hair */}
        <P x={10} y={5} w={12} h={5} c="#F472B6" />
        <P x={8} y={9} w={3} h={19} c="#F472B6" />
        <P x={21} y={9} w={3} h={19} c="#F472B6" />

        {/* Crimson Red Military Uniform with Gold-White Accents */}
        <P x={11} y={15} w={10} h={11} c="#DC2626" />
        <P x={13} y={15} w={6} h={4} c="#F8FAFC" /> {/* White military collar */}
        <P x={14} y={17} w={4} h={2} c="#EAB308" /> {/* Gold buttons */}
        <P x={11} y={23} w={10} h={4} c="#B91C1C" /> {/* Red skirt */}
        <P x={13} y={26} w={2} h={4} c="#0F172A" /> {/* Black thigh-high leggings */}
        <P x={17} y={26} w={2} h={4} c="#0F172A" />
        <P x={13} y={30} w={2} h={1} c="#F8FAFC" /> {/* White boots */}
        <P x={17} y={30} w={2} h={1} c="#F8FAFC" />

        {/* Face & Cyan Eyes with Red Eyeliner */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0D9488" />
        <P x={12} y={10} w={1} h={2} c="#DC2626" /> {/* Red eyeliner accent */}
        <P x={17} y={11} w={2} h={2} c="#0D9488" />
        <P x={19} y={10} w={1} h={2} c="#DC2626" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" />

        {/* Red Lollipop (Kẹo mút) in Hand */}
        <P x={23} y={15} w={3} h={3} c="#EF4444" />
        <P x={24} y={18} w={1} h={4} c="#F8FAFC" />
      </PixelCanvas>
    ),
  },

  // 48. MARIN KITAGAWA
  {
    id: '48',
    name: 'Marin Kitagawa',
    jpName: '喜多川海夢',
    origin: 'My Dress-Up Darling',
    category: 'waifu_game',
    quote: 'Tada~! Shizuku-tan cosplay! ✨',
    accentColor: '#FB7185',
    glowColor: 'rgba(251, 113, 133, 0.45)',
    particleType: 'sakura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Pink Sparkles */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <P x={3} y={12} w={2} h={2} c="#FB7185" />
          <P x={26} y={14} w={2} h={2} c="#FB7185" />
        </g>

        {/* Blonde Hair with Peach-Pink Gradient Tips */}
        <P x={10} y={5} w={12} h={5} c="#FACC15" />
        <P x={8} y={9} w={3} h={14} c="#FDE047" />
        <P x={8} y={20} w={3} h={7} c="#FB7185" /> {/* Pink dip dye */}
        <P x={21} y={9} w={3} h={14} c="#FDE047" />
        <P x={21} y={20} w={3} h={7} c="#FB7185" />

        {/* School Uniform (White Shirt, Navy Tie, Plaid Skirt, Black Choker) */}
        <P x={14} y={14} w={4} h={1} c="#09090B" /> {/* Black choker */}
        <P x={12} y={15} w={8} h={8} c="#FFFFFF" /> {/* White shirt */}
        <P x={15} y={15} w={2} h={5} c="#1E3A8A" /> {/* Navy tie */}
        <P x={11} y={22} w={10} h={5} c="#1E3A8A" /> {/* Plaid skirt */}
        <P x={12} y={23} w={8} h={1} c="#60A5FA" /> {/* Plaid check line */}
        <P x={13} y={27} w={2} h={3} c="#FCE7F3" />
        <P x={17} y={27} w={2} h={3} c="#FCE7F3" />
        <P x={13} y={30} w={2} h={1} c="#0F172A" /> {/* Loafers */}
        <P x={17} y={30} w={2} h={1} c="#0F172A" />

        {/* Face & Sparkling Rose-Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#F43F5E" />
        <P x={14} y={11} w={1} h={1} c="#FDA4AF" />
        <P x={17} y={11} w={2} h={2} c="#F43F5E" />
        <P x={18} y={11} w={1} h={1} c="#FDA4AF" />
        <P x={15} y={13} w={2} h={1} c="#E11D48" /> {/* Radiant smile */}

        {/* Peace Sign Hand (V-Sign) */}
        <P x={23} y={13} w={2} h={3} c="#FCE7F3" />
        <P x={22} y={11} w={1} h={2} c="#FCE7F3" />
        <P x={24} y={11} w={1} h={2} c="#FCE7F3" />
      </PixelCanvas>
    ),
  },

  // 49. FRIEREN
  {
    id: '49',
    name: 'Frieren',
    jpName: 'フリーレン',
    origin: "Frieren: Beyond Journey's End",
    category: 'waifu_game',
    quote: 'Kurai yo~ Kowai yo~ (Tối quá, sợ quá - trong rương Mimic!) 📦✨',
    accentColor: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.45)',
    particleType: 'stars',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Silver-White Twin Tails */}
        <P x={10} y={6} w={12} h={5} c="#F8FAFC" />
        <P x={7} y={10} w={3} h={16} c="#E2E8F0" />
        <P x={22} y={10} w={3} h={16} c="#E2E8F0" />

        {/* Long Pointed Elf Ears with Red Pendant Drop Earrings */}
        <P x={6} y={10} w={3} h={2} c="#FCE7F3" />
        <P x={5} y={9} w={2} h={1} c="#FCE7F3" />
        <P x={7} y={12} w={1} h={2} c="#DC2626" /> {/* Red earring drop */}
        <P x={23} y={10} w={3} h={2} c="#FCE7F3" />
        <P x={25} y={9} w={2} h={1} c="#FCE7F3" />
        <P x={24} y={12} w={1} h={2} c="#DC2626" />

        {/* White-and-Gold Mage Capelet & Red Scarf */}
        <P x={12} y={14} w={8} h={11} c="#FFFFFF" />
        <P x={13} y={14} w={6} h={2} c="#EAB308" /> {/* Gold trim collar */}
        <P x={14} y={15} w={4} h={3} c="#DC2626" /> {/* Red scarf */}
        <P x={11} y={22} w={10} h={6} c="#09090B" /> {/* Black skirt */}
        <P x={13} y={27} w={2} h={4} c="#713F12" /> {/* Brown boots */}
        <P x={17} y={27} w={2} h={4} c="#713F12" />

        {/* Face & Sleepy Emerald/Green Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#059669" />
        <P x={17} y={11} w={2} h={2} c="#059669" />
        <P x={15} y={13} w={2} h={1} c="#94A3B8" />

        {/* Magic Staff with Red Gem & Gold Crest */}
        <P x={24} y={6} w={1} h={24} c="#78350F" />
        <circle cx="24.5" cy="5" r="3" fill="#DC2626" />
        <circle cx="24.5" cy="5" r="1.5" fill="#FDE047" />
      </PixelCanvas>
    ),
  },

  // 50. FERN
  {
    id: '50',
    name: 'Fern',
    jpName: 'フェルン',
    origin: "Frieren: Beyond Journey's End",
    category: 'waifu_game',
    quote: 'Frieren-sama, dậy đi thôi ạ... 🦋',
    accentColor: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    particleType: 'stars',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Silver Butterfly Hairpin on Left */}
        <P x={10} y={7} w={2} h={2} c="#E2E8F0" />

        {/* Long Straight Deep Violet Hair */}
        <P x={10} y={5} w={12} h={5} c="#581C87" />
        <P x={8} y={9} w={3} h={20} c="#3B0764" />
        <P x={21} y={9} w={3} h={20} c="#3B0764" />

        {/* Black Dress Under Long White Coat */}
        <P x={11} y={14} w={10} h={15} c="#F8FAFC" /> {/* White coat */}
        <P x={13} y={15} w={6} h={12} c="#09090B" /> {/* Black inner dress */}
        <P x={13} y={28} w={2} h={3} c="#09090B" /> {/* Boots */}
        <P x={17} y={28} w={2} h={3} c="#09090B" />

        {/* Face & Serious Purple Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#7E22CE" />
        <P x={17} y={11} w={2} h={2} c="#7E22CE" />
        <P x={15} y={13} w={2} h={1} c="#94A3B8" /> {/* Pout */}

        {/* Long Wooden Staff Firing Zoltraak Beam */}
        <P x={23} y={4} w={1} h={26} c="#78350F" />
        <circle cx="23.5" cy="4" r="3" fill="#67E8F9" opacity="0.9" />
        <circle cx="23.5" cy="4" r="1.5" fill="#FFFFFF" />
      </PixelCanvas>
    ),
  },

  // 51. ANYA FORGER
  {
    id: '51',
    name: 'Anya Forger',
    jpName: 'アーニャ・フォージャー',
    origin: 'Spy x Family',
    category: 'waifu_game',
    quote: 'Waku Waku! Anya thích ăn lạc! 🥜',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    particleType: 'stars',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Two Black & Gold Horn Hair Cones (Đồ đội đầu sừng đen viền vàng) */}
        <polygon points="9,6 6,1 12,4" fill="#09090B" stroke="#EAB308" strokeWidth="0.8" />
        <polygon points="23,6 26,1 20,4" fill="#09090B" stroke="#EAB308" strokeWidth="0.8" />

        {/* Short Pastel Pink Hair */}
        <P x={10} y={5} w={12} h={5} c="#F472B6" />
        <P x={8} y={9} w={4} h={8} c="#F472B6" />
        <P x={20} y={9} w={4} h={8} c="#F472B6" />

        {/* Eden Academy Black & Gold Uniform */}
        <P x={11} y={16} w={10} h={9} c="#09090B" />
        <P x={13} y={16} w={6} h={2} c="#FFFFFF" /> {/* White collar */}
        <P x={14} y={17} w={4} h={2} c="#DC2626" /> {/* Red tie */}
        <P x={11} y={22} w={10} h={2} c="#EAB308" /> {/* Gold skirt trim */}
        <P x={13} y={25} w={2} h={4} c="#F8FAFC" /> {/* White socks */}
        <P x={17} y={25} w={2} h={4} c="#F8FAFC" />
        <P x={13} y={29} w={2} h={2} c="#78350F" /> {/* Brown shoes */}
        <P x={17} y={29} w={2} h={2} c="#78350F" />

        {/* Face with Legendary Smug Smirk "Heh 𓁹‿𓁹" */}
        <P x={12} y={8} w={8} h={8} c="#FCE7F3" />
        {/* Smug Eyes */}
        <P x={13} y={11} w={2} h={1} c="#047857" />
        <P x={17} y={11} w={2} h={1} c="#047857" />
        {/* "Heh" curved smirk */}
        <path d="M 14 14 Q 16 16 18 14" stroke="#09090B" strokeWidth="1" fill="none" />

        {/* Clutching Peanut in Hands (Củ Lạc) */}
        <ellipse cx="7" cy="20" rx="3" ry="2" fill="#D97706" />
        <circle cx="7" cy="20" r="1" fill="#FEF08A" />
      </PixelCanvas>
    ),
  },

  // 52. YOR FORGER
  {
    id: '52',
    name: 'Yor Forger',
    jpName: 'ヨル・フォージャー',
    origin: 'Spy x Family',
    category: 'waifu_game',
    quote: 'Xin phép được cướp đi mạng sống của ngài nhé~ 🌹',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Golden Rose Headband & Side Spikes */}
        <P x={10} y={4} w={12} h={2} c="#EAB308" />
        <P x={8} y={3} w={2} h={3} c="#FACC15" /> {/* Golden spike left */}
        <P x={22} y={3} w={2} h={3} c="#FACC15" /> {/* Golden spike right */}
        <circle cx="16" cy="4" r="1.5" fill="#DC2626" /> {/* Rose */}

        {/* Long Raven Hair */}
        <P x={10} y={5} w={12} h={5} c="#09090B" />
        <P x={8} y={9} w={3} h={19} c="#09090B" />
        <P x={21} y={9} w={3} h={19} c="#09090B" />

        {/* Thorn Princess Assassin Black Dress with Red Lining */}
        <P x={11} y={15} w={10} h={12} c="#09090B" />
        <P x={13} y={15} w={6} h={4} c="#FCE7F3" /> {/* Exposed off-shoulder */}
        <P x={11} y={23} w={10} h={4} c="#DC2626" /> {/* Blood red rose lining */}
        <P x={13} y={25} w={2} h={6} c="#09090B" /> {/* Black thigh-high boots */}
        <P x={17} y={25} w={2} h={6} c="#09090B" />

        {/* Face & Sharp Crimson Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#DC2626" />
        <P x={17} y={11} w={2} h={2} c="#DC2626" />

        {/* Dual Golden Stilettos (Cặp kim sát thủ vàng) */}
        <P x={6} y={15} w={1} h={12} c="#FACC15" />
        <P x={6} y={14} w={2} h={2} c="#CA8A04" />
        <P x={25} y={15} w={1} h={12} c="#FACC15" />
        <P x={24} y={14} w={2} h={2} c="#CA8A04" />
      </PixelCanvas>
    ),
  },

  // 53. KURUMI TOKISAKI
  {
    id: '53',
    name: 'Kurumi Tokisaki',
    jpName: '時崎狂三',
    origin: 'Date A Live',
    category: 'waifu_game',
    quote: 'Ara ara~ Zafkiel! 🕰️',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.45)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Glowing Golden Roman Numeral Astral Clock Behind Her */}
        <g className="animate-spin" style={{ animationDuration: '14s', transformOrigin: '16px 14px' }}>
          <circle cx="16" cy="14" r="11" fill="none" stroke="#FACC15" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
          <P x={15} y={4} w={2} h={1} c="#FDE047" /> {/* XII */}
          <P x={25} y={13} w={1} h={2} c="#FDE047" /> {/* III */}
          <P x={15} y={23} w={2} h={1} c="#FDE047" /> {/* VI */}
          <P x={5} y={13} w={1} h={2} c="#FDE047" /> {/* IX */}
        </g>

        {/* Asymmetrical Black Pigtails (One long, one short) */}
        <P x={10} y={5} w={12} h={5} c="#09090B" />
        <P x={8} y={9} w={3} h={10} c="#09090B" /> {/* Short left pigtail */}
        <P x={21} y={9} w={3} h={21} c="#09090B" /> {/* Floor-length right pigtail */}

        {/* Ruffled Red & Black Gothic Lolita Dress */}
        <P x={11} y={15} w={10} h={12} c="#18181B" />
        <P x={12} y={16} w={8} h={4} c="#DC2626" /> {/* Red bodice */}
        <P x={10} y={21} w={12} h={7} c="#DC2626" /> {/* Layered red ruffle skirt */}
        <P x={10} y={27} w={12} h={2} c="#09090B" /> {/* Black lace trim */}

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FFF1F2" />
        {/* Right Red Eye & Left GOLDEN CLOCK EYE */}
        <P x={13} y={11} w={2} h={2} c="#DC2626" /> {/* Crimson right eye */}
        <circle cx="18" cy="12" r="1.5" fill="#FACC15" /> {/* Clock face left eye */}
        <P x={18} y={11} w={1} h={1} c="#78350F" /> {/* Clock hand */}
        <P x={15} y={13} w={2} h={1} c="#DC2626" /> {/* Yandere smirk */}

        {/* Antique Flintlock Pistol & Musket in Hands */}
        <P x={5} y={16} w={4} h={2} c="#78350F" />
        <P x={4} y={16} w={2} h={1} c="#94A3B8" /> {/* Flintlock pistol */}
        <P x={23} y={13} w={2} h={12} c="#78350F" /> {/* Long musket */}
      </PixelCanvas>
    ),
  },

  // 54. SABER (ARTORIA PENDRAGON)
  {
    id: '54',
    name: 'Saber (Artoria)',
    jpName: 'セイバー (アルトリア)',
    origin: 'Fate Series',
    category: 'waifu_game',
    quote: 'Ex... CALIBUR!! 🗡️✨',
    accentColor: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    particleType: 'stars',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Blonde Bun Hair with Iconic Upright Ahoge (Cọng tóc ngố vểnh) */}
        <P x={15} y={0} w={1} h={3} c="#FACC15" /> {/* Iconic Ahoge! */}
        <P x={16} y={1} w={2} h={1} c="#FACC15" />
        <P x={10} y={4} w={12} h={6} c="#FACC15" />
        <P x={8} y={9} w={3} h={7} c="#FDE047" />
        <P x={21} y={9} w={3} h={7} c="#FDE047" />
        <circle cx="16" cy="4" r="3" fill="#EAB308" /> {/* Hair bun */}

        {/* Royal Blue Battle Dress with Silver Armor */}
        <P x={11} y={14} w={10} h={12} c="#1E3A8A" /> {/* Blue dress */}
        <P x={12} y={14} w={8} h={6} c="#CBD5E1" /> {/* Silver cuirass */}
        <P x={9} y={14} w={3} h={4} c="#E2E8F0" /> {/* Silver pauldrons */}
        <P x={20} y={14} w={3} h={4} c="#E2E8F0" />
        <P x={10} y={22} w={12} h={7} c="#1E3A8A" /> {/* Blue royal skirt */}
        <P x={13} y={24} w={6} h={5} c="#CBD5E1" /> {/* Front armor plate */}
        <P x={13} y={29} w={2} h={2} c="#94A3B8" /> {/* Sabatons */}
        <P x={17} y={29} w={2} h={2} c="#94A3B8" />

        {/* Face & Emerald Green Eyes */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#059669" />
        <P x={17} y={10} w={2} h={2} c="#059669" />
        <P x={14} y={13} w={4} h={1} c="#09090B" /> {/* Serious noble expression */}

        {/* Holy Sword Excalibur Planted Down with Golden Aura */}
        <P x={15} y={17} w={2} h={14} c="#FDE047" /> {/* Excalibur golden blade */}
        <P x={13} y={16} w={6} h={2} c="#1E3A8A" /> {/* Blue crossguard */}
        <P x={15} y={14} w={2} h={2} c="#F59E0B" /> {/* Gold pommel */}
      </PixelCanvas>
    ),
  },

  // 55. 2B (YORHA NO.2 TYPE B)
  {
    id: '55',
    name: '2B',
    jpName: 'ヨルハ二号B型 (2B)',
    origin: 'NieR:Automata',
    category: 'waifu_game',
    quote: 'Emotions are prohibited. Glory to Mankind. 🤖',
    accentColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Support Robot Pod 042 Hovering Beside */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <P x={24} y={10} w={4} h={5} c="#475569" />
          <P x={25} y={11} w={2} h={2} c="#F8FAFC" />
          <P x={26} y={12} w={1} h={1} c="#EF4444" /> {/* Red optic sensor */}
          <P x={25} y={15} w={2} h={3} c="#334155" /> {/* Pod arms */}
        </g>

        {/* Silver-White Short Bob Hair */}
        <P x={10} y={4} w={12} h={6} c="#F8FAFC" />
        <P x={8} y={8} w={4} h={8} c="#E2E8F0" />
        <P x={20} y={8} w={4} h={8} c="#E2E8F0" />

        {/* Black Military Visor / Blindfold Covering Eyes */}
        <P x={11} y={9} w={10} h={3} c="#09090B" />

        {/* Black Gothic Lolita Dress with White Feather Hem Embroidery */}
        <P x={11} y={14} w={10} h={11} c="#09090B" />
        <P x={13} y={14} w={6} h={4} c="#18181B" />
        <P x={14} y={15} w={4} h={2} c="#FCE7F3" /> {/* Cleavage window */}
        <P x={10} y={22} w={12} h={6} c="#09090B" /> {/* Black skirt */}
        <P x={10} y={27} w={12} h={1} c="#F8FAFC" /> {/* White lace embroidery */}
        <P x={13} y={27} w={2} h={4} c="#09090B" /> {/* High heel boots */}
        <P x={17} y={27} w={2} h={4} c="#09090B" />

        {/* Face & Beauty Mark Under Lip */}
        <P x={12} y={8} w={8} h={6} c="#FFF1F2" />
        <P x={15} y={13} w={2} h={1} c="#09090B" />
        <P x={14} y={14} w={1} h={1} c="#09090B" /> {/* Signature beauty mark */}

        {/* Floating Virtuous Contract Katana in Gold Ring Behind */}
        <P x={5} y={8} w={2} h={19} c="#F8FAFC" />
        <P x={4} y={25} w={4} h={3} c="#CA8A04" /> {/* Gold tsuba */}
      </PixelCanvas>
    ),
  },
];
