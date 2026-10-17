import React from 'react';
import { PixelCharacter } from '../types';
import { PixelCanvas, P } from '../pixel-helper';

export const BATCH_2_CHARACTERS: PixelCharacter[] = [
  // 12. NAVIA
  {
    id: '12',
    name: 'Navia',
    jpName: 'ナヴィア',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Umbrella warfare, I guess! ☂️',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.45)',
    particleType: 'gold_dust',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Gunbrella (Cannon Umbrella) in Hand */}
        <P x={22} y={6} w={6} h={8} c="#1E293B" />
        <P x={23} y={8} w={4} h={6} c="#EAB308" />
        <P x={24} y={14} w={2} h={16} c="#713F12" /> {/* Umbrella shaft / cannon barrel */}
        <P x={23} y={29} w={4} h={2} c="#FDE047" /> {/* Gold handle */}

        {/* Bouncy Blonde Curls */}
        <P x={8} y={10} w={4} h={17} c="#FACC15" />
        <P x={7} y={16} w={3} h={9} c="#EAB308" />
        <P x={20} y={10} w={4} h={17} c="#FACC15" />

        {/* Fontaine Yellow & Black Gown */}
        <P x={12} y={15} w={8} h={11} c="#0F172A" />
        <P x={13} y={16} w={6} h={4} c="#EAB308" /> {/* Gold corset */}
        <P x={14} y={17} w={4} h={3} c="#FFFFFF" />
        <P x={11} y={23} w={10} h={7} c="#EAB308" /> {/* Yellow frilled skirt */}
        <P x={10} y={28} w={12} h={2} c="#0F172A" /> {/* Black lace trim */}

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Blue Eyes */}
        <P x={13} y={11} w={2} h={2} c="#0284C7" />
        <P x={17} y={11} w={2} h={2} c="#0284C7" />

        {/* Chic Black Sunglasses perched on Head / Beret */}
        <P x={11} y={4} w={10} h={4} c="#18181B" /> {/* Beret */}
        <P x={12} y={3} w={8} h={2} c="#FFFFFF" /> {/* White beret crown */}
        <P x={12} y={8} w={3} h={2} c="#09090B" /> {/* Sunglasses lens */}
        <P x={17} y={8} w={3} h={2} c="#09090B" />
        <P x={15} y={8} w={2} h={1} c="#D4D4D8" />
      </PixelCanvas>
    ),
  },

  // 13. NEUVILLETTE
  {
    id: '13',
    name: 'Neuvillette',
    jpName: 'ヌヴィレット',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Order in the court! 🌊',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    particleType: 'water',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Glowing Blue Dragon Horns at Temples */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <P x={9} y={5} w={2} h={5} c="#38BDF8" />
          <P x={8} y={4} w={2} h={2} c="#7DD3FC" />
          <P x={21} y={5} w={2} h={5} c="#38BDF8" />
          <P x={22} y={4} w={2} h={2} c="#7DD3FC" />
        </g>

        {/* Long White Hair Reaching the Back */}
        <P x={10} y={6} w={12} h={6} c="#F8FAFC" />
        <P x={9} y={12} w={3} h={17} c="#E2E8F0" />
        <P x={20} y={12} w={3} h={17} c="#E2E8F0" />
        <P x={11} y={18} w={10} h={11} c="#F8FAFC" />

        {/* Deep Blue Fontaine Chief Justice Robes */}
        <P x={12} y={15} w={8} h={12} c="#0F172A" />
        <P x={13} y={16} w={6} h={8} c="#1E3A8A" />
        <P x={14} y={16} w={4} h={5} c="#FFFFFF" /> {/* High white collar */}
        <P x={15} y={18} w={2} h={3} c="#0284C7" /> {/* Blue cravat */}
        <P x={11} y={23} w={10} h={7} c="#0C4A6E" /> {/* Justice coat tails */}

        {/* Face & Slit Dragon Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0284C7" />
        <P x={14} y={11} w={1} h={2} c="#38BDF8" /> {/* Glowing vertical slit */}
        <P x={17} y={11} w={2} h={2} c="#0284C7" />
        <P x={18} y={11} w={1} h={2} c="#38BDF8" />

        {/* Glowing Ocean Blue Cane (Gậy ba-toong Thủy) */}
        <P x={23} y={14} w={2} h={17} c="#1E293B" />
        <P x={22} y={12} w={4} h={3} c="#38BDF8" /> {/* Glowing orb top */}
        <P x={23} y={13} w={2} h={1} c="#E0F2FE" />
      </PixelCanvas>
    ),
  },

  // 14. XIAO
  {
    id: '14',
    name: 'Xiao',
    jpName: '魈',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Lament! Worthless! 👹',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Dark Teal Hair with Emerald Green Highlights */}
        <P x={10} y={6} w={12} h={5} c="#064E3B" />
        <P x={8} y={11} w={4} h={8} c="#10B981" /> {/* Emerald highlights */}
        <P x={20} y={11} w={4} h={8} c="#10B981" />

        {/* Purple Forehead Diamond Mark (Ấn tím) */}
        <P x={15} y={9} w={2} h={2} c="#A855F7" />

        {/* Yaksha Attire (White shirt, purple & teal belts) */}
        <P x={12} y={15} w={8} h={8} c="#F8FAFC" />
        <P x={13} y={17} w={6} h={4} c="#064E3B" />
        <P x={14} y={21} w={4} h={3} c="#9333EA" /> {/* Purple sash */}
        <P x={11} y={23} w={10} h={7} c="#0F172A" /> {/* Baggy trousers */}
        <P x={13} y={29} w={2} h={2} c="#047857" />

        {/* Face & Sharp Golden Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#F59E0B" />
        <P x={17} y={11} w={2} h={2} c="#F59E0B" />
        <P x={12} y={10} w={1} h={1} c="#DC2626" /> {/* Red corner eyeliner */}
        <P x={19} y={10} w={1} h={1} c="#DC2626" />

        {/* Glowing Yaksha Mask on Hip */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <P x={7} y={20} w={5} h={6} c="#064E3B" />
          <P x={8} y={22} w={1} h={1} c="#34D399" /> {/* Mask glowing eye */}
          <P x={10} y={22} w={1} h={1} c="#34D399" />
          <P x={6} y={19} w={2} h={2} c="#A855F7" /> {/* Mask horn */}
          <P x={11} y={19} w={2} h={2} c="#A855F7" />
        </g>

        {/* Primordial Jade Winged-Spear */}
        <P x={22} y={4} w={1} h={27} c="#064E3B" />
        <P x={21} y={2} w={3} h={5} c="#10B981" /> {/* Jade spear blade */}
        <P x={22} y={1} w={1} h={2} c="#6EE7B7" />
      </PixelCanvas>
    ),
  },

  // 15. KAZUHA
  {
    id: '15',
    name: 'Kaedehara Kazuha',
    jpName: '楓原万葉',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Fallen leaves... adorn my night! 🍁',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    particleType: 'leaves',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Momiji Maple Leaves */}
        <g className="animate-spin" style={{ animationDuration: '9s', transformOrigin: '5px 12px' }}>
          <P x={4} y={11} w={3} h={3} c="#DC2626" />
          <P x={5} y={12} w={1} h={1} c="#F97316" />
        </g>

        {/* Platinum White Hair with Crimson-Orange Maple Streak */}
        <P x={10} y={5} w={12} h={5} c="#F8FAFC" />
        <P x={9} y={8} w={3} h={13} c="#F8FAFC" />
        <P x={19} y={8} w={3} h={8} c="#F8FAFC" />
        <P x={12} y={7} w={2} h={6} c="#EA580C" /> {/* Red-orange maple streak! */}

        {/* Wanderer Haori (Red, White & Black) */}
        <P x={12} y={15} w={8} h={10} c="#18181B" />
        <P x={13} y={16} w={6} h={5} c="#DC2626" /> {/* Red haori pattern */}
        <P x={14} y={16} w={4} h={3} c="#FFFFFF" />
        <P x={11} y={22} w={10} h={7} c="#27272A" /> {/* Hakama pants */}
        <P x={13} y={28} w={2} h={3} c="#F8FAFC" /> {/* Tabi */}
        <P x={17} y={28} w={2} h={3} c="#F8FAFC" />

        {/* Face & Warm Maple Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#EA580C" />
        <P x={17} y={11} w={2} h={2} c="#EA580C" />

        {/* Isshin Katana on Hip */}
        <P x={21} y={16} w={2} h={14} c="#DC2626" />
        <P x={22} y={14} w={2} h={3} c="#FACC15" />
      </PixelCanvas>
    ),
  },

  // 16. VENTI
  {
    id: '16',
    name: 'Venti',
    jpName: 'ウェンティ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: "Ehe~ Wouldn't gliding be faster? 🍃",
    accentColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Short Black Hair with Turquoise Glowing Braids */}
        <P x={10} y={6} w={12} h={5} c="#0F172A" />
        <P x={8} y={11} w={3} h={13} c="#0F172A" />
        <P x={8} y={20} w={3} h={5} c="#2DD4BF" /> {/* Glowing teal braid tip */}
        <P x={21} y={11} w={3} h={13} c="#0F172A" />
        <P x={21} y={20} w={3} h={5} c="#2DD4BF" />

        {/* Green Beret with White Cecilia Flower */}
        <P x={11} y={3} w={10} h={4} c="#047857" />
        <P x={10} y={6} w={12} h={2} c="#065F46" />
        <P x={18} y={4} w={3} h={3} c="#FFFFFF" /> {/* Cecilia flower */}
        <P x={19} y={5} w={1} h={1} c="#FDE047" />

        {/* Bard Outfit (White shirt, corset, green cape) */}
        <P x={12} y={15} w={8} h={10} c="#065F46" />
        <P x={13} y={16} w={6} h={4} c="#FFFFFF" />
        <P x={15} y={18} w={2} h={2} c="#2DD4BF" /> {/* Anemo Vision */}
        <P x={13} y={24} w={6} h={4} c="#047857" /> {/* Shorts */}
        <P x={13} y={27} w={2} h={4} c="#FFFFFF" /> {/* White stockings */}
        <P x={17} y={27} w={2} h={4} c="#FFFFFF" />

        {/* Face & Playful Green Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#059669" />
        <P x={17} y={11} w={2} h={2} c="#059669" />
        <P x={15} y={13} w={2} h={1} c="#FB7185" /> {/* "Ehe~" smile */}

        {/* Holy Lyre Der Frühling in Hand */}
        <P x={2} y={14} w={6} h={8} c="#F59E0B" />
        <P x={4} y={16} w={2} h={4} c="#67E8F9" /> {/* Glowing strings */}
      </PixelCanvas>
    ),
  },

  // 17. SHENHE
  {
    id: '17',
    name: 'Shenhe',
    jpName: '申鶴',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'By ordinance divine! ❄️',
    accentColor: '#7DD3FC',
    glowColor: 'rgba(125, 211, 252, 0.45)',
    particleType: 'ice',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Icy Talisman Spirit Avatar (Bóng phân thân băng giá) */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <P x={22} y={8} w={6} h={16} c="#BAE6FD" />
          <P x={23} y={10} w={4} h={10} c="#E0F2FE" />
          <P x={24} y={12} w={2} h={2} c="#0284C7" />
        </g>

        {/* Long Silver-White Braided Hair with Jade Hairpin */}
        <P x={10} y={5} w={12} h={5} c="#F1F5F9" />
        <P x={9} y={9} w={3} h={18} c="#E2E8F0" />
        <P x={13} y={8} w={4} h={4} c="#F1F5F9" /> {/* Bangs covering eye */}
        <P x={19} y={4} w={3} h={2} c="#10B981" /> {/* Jade hairpin */}

        {/* Exorcist Bodysuit & Red Binding Strings (Dây đỏ định hồn) */}
        <P x={12} y={15} w={8} h={12} c="#0F172A" />
        <P x={13} y={16} w={6} h={5} c="#F8FAFC" />
        <P x={12} y={18} w={8} h={1} c="#DC2626" /> {/* Red talisman cords */}
        <P x={15} y={17} w={2} h={8} c="#DC2626" />
        <P x={13} y={26} w={2} h={5} c="#0F172A" />
        <P x={17} y={26} w={2} h={5} c="#0F172A" />

        {/* Face & Aloof Silver-Blue Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#38BDF8" />
        <P x={17} y={11} w={2} h={2} c="#38BDF8" />

        {/* Calamity Queller Polearm */}
        <P x={6} y={8} w={1} h={23} c="#0284C7" />
        <P x={5} y={6} w={3} h={4} c="#7DD3FC" />
      </PixelCanvas>
    ),
  },

  // 18. NILOU
  {
    id: '18',
    name: 'Nilou',
    jpName: 'ニィロウ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'All eyes on me! 🪷',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    particleType: 'water',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Sumeru Horn Crown & Turquoise-White Veil */}
        <P x={9} y={4} w={3} h={4} c="#F59E0B" /> {/* Gold horns */}
        <P x={20} y={4} w={3} h={4} c="#F59E0B" />
        <P x={7} y={7} w={3} h={18} c="#67E8F9" /> {/* Sheer veil */}
        <P x={22} y={7} w={3} h={18} c="#67E8F9" />

        {/* Vibrant Crimson Hair */}
        <P x={10} y={6} w={12} h={5} c="#EF4444" />
        <P x={9} y={10} w={3} h={14} c="#DC2626" />
        <P x={20} y={10} w={3} h={14} c="#DC2626" />

        {/* Persian Dancer Turquoise & Gold Costume */}
        <P x={12} y={15} w={8} h={5} c="#06B6D4" />
        <P x={14} y={16} w={4} h={2} c="#FDE047" /> {/* Gold necklace */}
        <P x={13} y={19} w={6} h={2} c="#FCE7F3" /> {/* Exposed midriff */}
        <P x={11} y={21} w={10} h={8} c="#0891B2" /> {/* Flowing harem pants */}
        <P x={13} y={28} w={2} h={3} c="#FCE7F3" /> {/* Barefoot */}
        <P x={17} y={28} w={2} h={3} c="#FCE7F3" />

        {/* Face & Blue Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0284C7" />
        <P x={17} y={11} w={2} h={2} c="#0284C7" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" />

        {/* Water Lotus Petals */}
        <g className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '16px 22px' }}>
          <circle cx="16" cy="22" r="5" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      </PixelCanvas>
    ),
  },

  // 19. KAFKA (HONKAI: STAR RAIL)
  {
    id: '19',
    name: 'Kafka',
    jpName: 'カフカ',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'Listen... Boom! 🕸️',
    accentColor: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Glowing Purple Spiderwebs Behind */}
        <g className="animate-pulse" style={{ animationDuration: '2.4s' }}>
          <path d="M 4 8 L 28 24 M 28 8 L 4 24" stroke="#C084FC" strokeWidth="0.8" opacity="0.6" />
          <circle cx="16" cy="16" r="6" fill="none" stroke="#A855F7" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Wine Burgundy Hair */}
        <P x={10} y={6} w={12} h={5} c="#581C87" />
        <P x={9} y={10} w={3} h={15} c="#701A75" />
        <P x={20} y={10} w={3} h={15} c="#701A75" />

        {/* Round Sunglasses on Head */}
        <P x={12} y={5} w={3} h={2} c="#18181B" />
        <P x={17} y={5} w={3} h={2} c="#18181B" />
        <P x={15} y={5} w={2} h={1} c="#CA8A04" />

        {/* Dark Coat Slung Over Shoulders & Purple Gloves */}
        <P x={12} y={15} w={8} h={11} c="#18181B" />
        <P x={13} y={16} w={6} h={4} c="#F8FAFC" /> {/* White shirt */}
        <P x={15} y={17} w={2} h={3} c="#9333EA" /> {/* Purple tie */}
        <P x={11} y={22} w={10} h={6} c="#27272A" /> {/* Shorts */}
        <P x={13} y={26} w={2} h={5} c="#581C87" /> {/* Patterned dark tights */}
        <P x={17} y={26} w={2} h={5} c="#581C87" />

        {/* Face & Mesmerizing Purple Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#9333EA" />
        <P x={17} y={11} w={2} h={2} c="#9333EA" />

        {/* Dual Submachine Guns (Súng tiểu liên đôi) */}
        <P x={6} y={18} w={3} h={5} c="#18181B" />
        <P x={23} y={18} w={3} h={5} c="#18181B" />
      </PixelCanvas>
    ),
  },

  // 20. FIREFLY (HONKAI: STAR RAIL)
  {
    id: '20',
    name: 'Firefly (Đom Đóm)',
    jpName: 'ホタル',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'I will set the seas ablaze! ✨',
    accentColor: '#2DD4BF',
    glowColor: 'rgba(45, 212, 191, 0.45)',
    particleType: 'fire',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Ghostly SAM Armor Silhouette with Teal Flames Behind */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <P x={5} y={3} w={6} h={10} c="#0F172A" />
          <P x={21} y={3} w={6} h={10} c="#0F172A" />
          <P x={7} y={5} w={2} h={4} c="#2DD4BF" /> {/* Teal SAM eye visor */}
          <P x={23} y={5} w={2} h={4} c="#2DD4BF" />
        </g>

        {/* Silver Hair Fading to Mint Green Tips */}
        <P x={10} y={6} w={12} h={5} c="#E2E8F0" />
        <P x={9} y={10} w={3} h={16} c="#CBD5E1" />
        <P x={9} y={22} w={3} h={4} c="#2DD4BF" /> {/* Mint green dip dye */}
        <P x={20} y={10} w={3} h={16} c="#CBD5E1" />
        <P x={20} y={22} w={3} h={4} c="#2DD4BF" />

        {/* Black Headband with Dual Bows */}
        <P x={11} y={5} w={10} h={2} c="#0F172A" />
        <P x={9} y={4} w={3} h={3} c="#0F172A" />
        <P x={20} y={4} w={3} h={3} c="#0F172A" />

        {/* Green, White & Yellow Sundress */}
        <P x={12} y={15} w={8} h={10} c="#FFFFFF" />
        <P x={13} y={16} w={6} h={4} c="#14B8A6" /> {/* Teal bodice */}
        <P x={14} y={18} w={4} h={2} c="#FEF08A" />
        <P x={11} y={22} w={10} h={7} c="#CCFBF1" /> {/* Pastel dress */}
        <P x={13} y={28} w={2} h={3} c="#0F172A" /> {/* Black boots */}
        <P x={17} y={28} w={2} h={3} c="#0F172A" />

        {/* Face & Glowing Teal/Blue Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0D9488" />
        <P x={14} y={11} w={1} h={1} c="#5EEAD4" />
        <P x={17} y={11} w={2} h={2} c="#0D9488" />
        <P x={18} y={11} w={1} h={1} c="#5EEAD4" />

        {/* Glowing Firefly Sparkles */}
        <P x={5} y={18} w={2} h={2} c="#FDE047" />
        <P x={25} y={16} w={2} h={2} c="#5EEAD4" />
      </PixelCanvas>
    ),
  },

  // 21. ACHERON (HONKAI: STAR RAIL)
  {
    id: '21',
    name: 'Acheron',
    jpName: '黄泉',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: 'I weep for the departed... 🗡️',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.5)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Crimson Red Spider Lily (Higanbana) */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          <P x={3} y={18} w={4} h={4} c="#E11D48" />
          <P x={4} y={17} w={2} h={6} c="#BE123C" />
        </g>

        {/* Floor-Length Dark Purple Hair */}
        <P x={10} y={5} w={12} h={5} c="#3B0764" />
        <P x={8} y={9} w={4} h={22} c="#2E1065" />
        <P x={20} y={9} w={4} h={22} c="#2E1065" />
        <P x={11} y={9} w={4} h={5} c="#3B0764" /> {/* Bangs covering eye */}

        {/* Black & Violet Outfit with Red Highlights */}
        <P x={12} y={15} w={8} h={11} c="#09090B" />
        <P x={13} y={16} w={6} h={4} c="#581C87" />
        <P x={14} y={17} w={4} h={3} c="#E11D48" /> {/* Blood red brooch */}
        <P x={11} y={23} w={10} h={7} c="#18181B" />
        <P x={13} y={28} w={2} h={3} c="#09090B" />
        <P x={17} y={28} w={2} h={3} c="#09090B" />

        {/* Face & Crimson Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FFF1F2" />
        <P x={16} y={11} w={2} h={2} c="#E11D48" />
        <P x={17} y={11} w={1} h={1} c="#FDA4AF" />

        {/* Massive Crimson-Black Odachi Blade (Naught) */}
        <P x={23} y={2} w={2} h={29} c="#09090B" />
        <P x={24} y={3} w={1} h={28} c="#E11D48" /> {/* Blood red blade edge */}
      </PixelCanvas>
    ),
  },

  // 22. SPARKLE / HANABI (HONKAI: STAR RAIL)
  {
    id: '22',
    name: 'Sparkle (Hanabi)',
    jpName: '花火',
    origin: 'Honkai: Star Rail',
    category: 'genshin_honkai',
    quote: "Why so serious? Let's play a game! 🎭",
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    particleType: 'sakura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Japanese Red Goldfish */}
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          <P x={23} y={14} w={5} h={3} c="#EF4444" />
          <P x={27} y={13} w={2} h={5} c="#F87171" /> {/* Tail fin */}
          <P x={24} y={15} w={1} h={1} c="#09090B" />
        </g>

        {/* Twin Black Pigtails */}
        <P x={10} y={6} w={12} h={5} c="#0F172A" />
        <P x={8} y={10} w={3} h={15} c="#0F172A" />
        <P x={21} y={10} w={3} h={15} c="#0F172A" />

        {/* Tilted Japanese Red-White Kitsune Mask on Head */}
        <P x={17} y={2} w={7} h={7} c="#FFFFFF" />
        <P x={19} y={4} w={1} h={2} c="#DC2626" /> {/* Red markings */}
        <P x={22} y={4} w={1} h={2} c="#DC2626" />
        <P x={18} y={1} w={2} h={2} c="#EF4444" /> {/* Red ear tip */}
        <P x={23} y={1} w={2} h={2} c="#EF4444" />

        {/* Vibrant Red Short Kimono & Black Obi */}
        <P x={12} y={15} w={8} h={10} c="#DC2626" />
        <P x={13} y={16} w={6} h={4} c="#F87171" />
        <P x={13} y={19} w={6} h={3} c="#09090B" /> {/* Black Obi sash */}
        <P x={15} y={20} w={2} h={1} c="#FDE047" /> {/* Gold tie */}
        <P x={11} y={22} w={10} h={5} c="#EF4444" />
        <P x={13} y={26} w={2} h={4} c="#FCE7F3" />
        <P x={17} y={26} w={2} h={4} c="#FCE7F3" />
        <P x={13} y={29} w={2} h={2} c="#DC2626" /> {/* Red Geta sandals */}
        <P x={17} y={29} w={2} h={2} c="#DC2626" />

        {/* Face & Mischievous Pink-Red Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#EF4444" />
        <P x={17} y={11} w={2} h={2} c="#EF4444" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" /> {/* Fox grin */}
      </PixelCanvas>
    ),
  },
];
