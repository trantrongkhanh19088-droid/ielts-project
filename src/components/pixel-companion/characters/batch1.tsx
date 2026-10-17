import React from 'react';
import { PixelCharacter } from '../types';
import { PixelCanvas, P } from '../pixel-helper';

export const BATCH_1_CHARACTERS: PixelCharacter[] = [
  // 01. RAIDEN SHOGUN (EI)
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
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Glowing Purple Chakra Desiderata Wheel Behind Back */}
        <g className="animate-spin" style={{ animationDuration: '12s', transformOrigin: '16px 14px' }}>
          <circle cx="16" cy="14" r="11" fill="none" stroke="#C084FC" strokeWidth="1" strokeDasharray="2 3" opacity="0.85" />
          <P x={15} y={3} w={2} h={2} c="#F3E8FF" />
          <P x={26} y={13} w={2} h={2} c="#F3E8FF" />
          <P x={15} y={24} w={2} h={2} c="#F3E8FF" />
          <P x={4} y={13} w={2} h={2} c="#F3E8FF" />
        </g>

        {/* Long Deep Violet Braided Hair (Behind) */}
        <P x={10} y={16} w={4} h={13} c="#581C87" />
        <P x={11} y={18} w={2} h={12} c="#7B2CBF" />
        <P x={11} y={29} w={2} h={2} c="#C084FC" /> {/* Glowing braid tip */}

        {/* Kimono Body (Inazuma violet & gold) */}
        <P x={12} y={16} w={8} h={10} c="#3B0764" />
        <P x={13} y={17} w={6} h={8} c="#581C87" />
        <P x={14} y={18} w={4} h={4} c="#FFFFFF" /> {/* White inner breast collar */}
        <P x={13} y={22} w={6} h={2} c="#CA8A04" /> {/* Gold Obi sash */}
        <P x={14} y={24} w={4} h={2} c="#EAB308" /> {/* Mitsudomoe emblem */}
        <P x={12} y={26} w={8} h={5} c="#3B0764" /> {/* Kimono skirt */}

        {/* Head & Face */}
        <P x={11} y={7} w={10} h={9} c="#FDE047" /> {/* Under-hair */}
        <P x={12} y={8} w={8} h={8} c="#FCE7F3" /> {/* Skin */}
        {/* Purple Eyes */}
        <P x={13} y={11} w={2} h={2} c="#6B21A8" />
        <P x={14} y={11} w={1} h={1} c="#C084FC" />
        <P x={17} y={11} w={2} h={2} c="#6B21A8" />
        <P x={18} y={11} w={1} h={1} c="#C084FC" />
        {/* Signature Mole under right eye */}
        <P x={18} y={14} w={1} h={1} c="#3B0764" />

        {/* Dark Purple Braided Hair (Front & Bangs) */}
        <P x={10} y={5} w={12} h={4} c="#6B21A8" />
        <P x={11} y={4} w={10} h={2} c="#7E22CE" />
        <P x={10} y={9} w={2} h={6} c="#6B21A8" /> {/* Left side-lock */}
        <P x={20} y={9} w={2} h={6} c="#6B21A8" /> {/* Right side-lock */}
        <P x={13} y={8} w={6} h={2} c="#9333EA" /> {/* Bangs */}

        {/* Golden Fan Hairpin with Violet Blossom on Head */}
        <P x={19} y={5} w={3} h={3} c="#EAB308" />
        <P x={20} y={6} w={2} h={2} c="#C084FC" />

        {/* Musou Isshin Lightning Blade / Naginata in Hand */}
        <P x={21} y={14} w={2} h={16} c="#A855F7" />
        <P x={22} y={12} w={1} h={16} c="#F3E8FF" />
        <P x={20} y={18} w={4} h={1} c="#EAB308" /> {/* Tsuba gold guard */}
        <P x={22} y={10} w={1} h={3} c="#E9D5FF" /> {/* Lightning tip */}
      </PixelCanvas>
    ),
  },

  // 02. HU TAO
  {
    id: '02',
    name: 'Hu Tao',
    jpName: '胡桃',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Silly-churl, billy-churl, sil-ly-billy Hilichurl~ 👻',
    accentColor: '#FF4D4D',
    glowColor: 'rgba(255, 77, 77, 0.45)',
    particleType: 'fire',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Boo Tao Ghost Beside Her */}
        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
          <P x={2} y={8} w={6} h={6} c="#FFFFFF" />
          <P x={3} y={7} w={4} h={1} c="#FFFFFF" />
          <P x={3} y={14} w={2} h={2} c="#F1F5F9" />
          <P x={6} y={14} w={2} h={2} c="#F1F5F9" />
          {/* Ghost Eyes & Derp Open Mouth */}
          <P x={4} y={9} w={1} h={2} c="#1E293B" />
          <P x={6} y={9} w={1} h={2} c="#1E293B" />
          <P x={5} y={11} w={2} h={2} c="#EF4444" />
        </g>

        {/* Twin Tails Dark Brown fading to Crimson Tips */}
        <P x={8} y={11} w={3} h={16} c="#451A03" />
        <P x={8} y={23} w={3} h={5} c="#DC2626" /> {/* Crimson dip dye */}
        <P x={21} y={11} w={3} h={16} c="#451A03" />
        <P x={21} y={23} w={3} h={5} c="#DC2626" />

        {/* Brown Wangsheng Funeral Coat & Shorts */}
        <P x={12} y={15} w={8} h={10} c="#29150B" />
        <P x={14} y={16} w={4} h={3} c="#FFFFFF" /> {/* Shirt collar */}
        <P x={15} y={18} w={2} h={3} c="#DC2626" /> {/* Red brooch */}
        <P x={13} y={24} w={6} h={3} c="#1C1917" /> {/* Shorts */}
        <P x={13} y={27} w={2} h={4} c="#FCE7F3" /> {/* Legs */}
        <P x={17} y={27} w={2} h={4} c="#FCE7F3" />
        <P x={13} y={30} w={2} h={2} c="#1C1917" /> {/* Loafers */}
        <P x={17} y={30} w={2} h={2} c="#1C1917" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Flower-shaped Red Eyes */}
        <P x={13} y={11} w={2} h={2} c="#DC2626" />
        <P x={14} y={11} w={1} h={1} c="#FDE047" /> {/* Flower pupil */}
        <P x={17} y={11} w={2} h={2} c="#DC2626" />
        <P x={18} y={11} w={1} h={1} c="#FDE047" />
        <P x={15} y={13} w={2} h={1} c="#F43F5E" /> {/* Cute smirk */}

        {/* Brown Bangs */}
        <P x={11} y={7} w={10} h={3} c="#451A03" />
        <P x={14} y={9} w={4} h={2} c="#451A03" />

        {/* Wangsheng Funeral Director Black Hat with Plum Blossom & Talisman */}
        <P x={10} y={4} w={12} h={4} c="#18181B" />
        <P x={8} y={7} w={16} h={2} c="#09090B" /> {/* Hat brim */}
        <P x={18} y={5} w={3} h={3} c="#EF4444" /> {/* Red Plum Blossom */}
        <P x={19} y={6} w={1} h={1} c="#FEF08A" />
        <P x={11} y={5} w={2} h={3} c="#FDE047" /> {/* Yellow talisman crest */}
      </PixelCanvas>
    ),
  },

  // 03. SANDRONE (MARIONETTE)
  {
    id: '03',
    name: 'Sandrone (Marionette)',
    jpName: 'サンドローネ (傀儡)',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Utterly risible... My automatons will handle this. ⚙️',
    accentColor: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.45)',
    particleType: 'gold_dust',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Giant Ruin Butler Silhouette Guarding from Behind */}
        <P x={4} y={3} w={7} h={28} c="#1C1917" />
        <P x={5} y={4} w={5} h={20} c="#292524" />
        <P x={21} y={3} w={7} h={28} c="#1C1917" />
        <P x={22} y={4} w={5} h={20} c="#292524" />
        <P x={6} y={7} w={3} h={3} c="#F59E0B" /> {/* Ruin Core Glowing Eye Left */}
        <P x={23} y={7} w={3} h={3} c="#F59E0B" /> {/* Ruin Core Eye Right */}

        {/* Spinning Brass Clockwork Key on Back */}
        <g className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '16px 16px' }}>
          <circle cx="16" cy="16" r="4" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <P x={15} y={10} w={2} h={4} c="#D4AF37" />
        </g>

        {/* Fluffy Aristocratic Blonde Curls */}
        <P x={9} y={9} w={4} h={15} c="#FDE047" />
        <P x={19} y={9} w={4} h={15} c="#FDE047" />
        <P x={10} y={11} w={2} h={13} c="#FEF08A" />
        <P x={20} y={11} w={2} h={13} c="#FEF08A" />

        {/* Gothic Lolita Dress (Black, White & Antique Gold) */}
        <P x={12} y={15} w={8} h={13} c="#18181B" />
        <P x={13} y={16} w={6} h={4} c="#F8FAFC" /> {/* White ruffled blouse */}
        <P x={15} y={17} w={2} h={2} c="#D4AF37" /> {/* Gold cameo brooch */}
        <P x={11} y={22} w={10} h={7} c="#27272A" /> {/* Puffy bell skirt */}
        <P x={11} y={28} w={10} h={2} c="#D4AF37" /> {/* Gold laced hem */}

        {/* Doll-like Porcelain Face */}
        <P x={12} y={9} w={8} h={7} c="#FFF1F2" />
        {/* Cold Blue/Grey Doll Eyes */}
        <P x={13} y={12} w={2} h={2} c="#0284C7" />
        <P x={17} y={12} w={2} h={2} c="#0284C7" />
        <P x={15} y={14} w={2} h={1} c="#FDA4AF" /> {/* Pouting doll mouth */}

        {/* Vintage Bonnet Hat */}
        <P x={11} y={5} w={10} h={4} c="#18181B" />
        <P x={10} y={7} w={12} h={2} c="#D4AF37" /> {/* Bonnet gold ribbon */}
        <P x={19} y={7} w={3} h={3} c="#FFFFFF" /> {/* Bonnet lace bow */}
      </PixelCanvas>
    ),
  },

  // 04. FURINA (FOCALORS)
  {
    id: '04',
    name: 'Furina (Focalors)',
    jpName: 'フリーナ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Let the world come alive! 💧',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    particleType: 'bubbles',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Salon Solitaire Summon (Gentilhomme Usher / Blue Octopus) */}
        <g className="animate-bounce" style={{ animationDuration: '2.8s' }}>
          <P x={22} y={18} w={5} h={5} c="#38BDF8" />
          <P x={23} y={19} w={1} h={1} c="#0369A1" />
          <P x={25} y={19} w={1} h={1} c="#0369A1" />
          <P x={22} y={23} w={1} h={2} c="#0284C7" />
          <P x={24} y={23} w={1} h={2} c="#0284C7" />
          <P x={26} y={23} w={1} h={2} c="#0284C7" />
        </g>

        {/* Platinum White Hair with Deep Ocean Blue Streaks */}
        <P x={9} y={9} w={4} h={14} c="#E2E8F0" />
        <P x={10} y={14} w={2} h={8} c="#0284C7" /> {/* Blue streak */}
        <P x={19} y={9} w={4} h={14} c="#E2E8F0" />
        <P x={20} y={14} w={2} h={8} c="#0284C7" />

        {/* Hydro Archon Fontaine Tailcoat Uniform */}
        <P x={12} y={15} w={8} h={11} c="#1E3A8A" />
        <P x={14} y={16} w={4} h={4} c="#FFFFFF" /> {/* Ruffled jabot */}
        <P x={15} y={17} w={2} h={2} c="#38BDF8" /> {/* Hydro Vision gem */}
        <P x={11} y={22} w={10} h={5} c="#172554" /> {/* Tailcoat tails */}
        <P x={13} y={26} w={2} h={4} c="#FFFFFF" /> {/* White tights */}
        <P x={17} y={26} w={2} h={4} c="#FFFFFF" />
        <P x={13} y={29} w={2} h={2} c="#1E3A8A" /> {/* Blue boots */}
        <P x={17} y={29} w={2} h={2} c="#1E3A8A" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Heterochromia Eyes (Light Blue & Deep Blue) */}
        <P x={13} y={11} w={2} h={2} c="#38BDF8" /> {/* Left eye light blue */}
        <P x={17} y={11} w={2} h={2} c="#1E3A8A" /> {/* Right eye dark blue */}
        <P x={15} y={13} w={2} h={1} c="#FB7185" />

        {/* Slanted Top Hat (Chóp lệch) with Blue-White Ribbon */}
        <P x={12} y={2} w={7} h={6} c="#1E3A8A" />
        <P x={10} y={7} w={12} h={2} c="#0F172A" /> {/* Hat rim */}
        <P x={12} y={6} w={7} h={1} c="#38BDF8" /> {/* Cyan ribbon */}
        <P x={18} y={4} w={3} h={3} c="#FFFFFF" /> {/* White feather bow */}
      </PixelCanvas>
    ),
  },

  // 05. NAHIDA
  {
    id: '05',
    name: 'Nahida',
    jpName: 'ナヒーダ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Everyone hold hands~ 🌱',
    accentColor: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.45)',
    particleType: 'leaves',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Glowing Dendro Swing / Keyboard Ring */}
        <circle cx="16" cy="18" r="12" fill="none" stroke="#4ADE80" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <P x={6} y={24} w={20} h={1} c="#86EFAC" /> {/* Swing bar */}

        {/* White Hair with Fresh Green Tips */}
        <P x={10} y={7} w={12} h={6} c="#FFFFFF" />
        <P x={8} y={12} w={4} h={10} c="#FFFFFF" />
        <P x={8} y={19} w={4} h={4} c="#4ADE80" /> {/* Green dip dye */}
        <P x={20} y={12} w={4} h={8} c="#FFFFFF" />
        <P x={20} y={18} w={4} h={3} c="#4ADE80" />

        {/* Pointed Elf Ears (Tai Yêu Tinh) */}
        <P x={8} y={11} w={3} h={2} c="#FCE7F3" />
        <P x={7} y={10} w={2} h={1} c="#FCE7F3" />
        <P x={21} y={11} w={3} h={2} c="#FCE7F3" />
        <P x={23} y={10} w={2} h={1} c="#FCE7F3" />

        {/* Sumeru White-Green Dress & Capelet */}
        <P x={13} y={15} w={6} h={8} c="#FFFFFF" />
        <P x={14} y={16} w={4} h={3} c="#4ADE80" /> {/* Green leaf bib */}
        <P x={12} y={20} w={8} h={6} c="#DCFCE7" /> {/* Petal skirt */}
        <P x={13} y={26} w={2} h={3} c="#FCE7F3" /> {/* Barefoot */}
        <P x={17} y={26} w={2} h={3} c="#FCE7F3" />

        {/* Face & Large Green Dendro Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#16A34A" />
        <P x={14} y={11} w={1} h={1} c="#86EFAC" /> {/* Clover sparkle */}
        <P x={17} y={11} w={2} h={2} c="#16A34A" />
        <P x={18} y={11} w={1} h={1} c="#86EFAC" />
        <P x={15} y={13} w={2} h={1} c="#F472B6" />

        {/* Golden Leaf Hairpiece */}
        <P x={18} y={6} w={3} h={3} c="#FACC15" />
      </PixelCanvas>
    ),
  },

  // 06. YAE MIKO
  {
    id: '06',
    name: 'Yae Miko',
    jpName: '八重神子',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Right here, right now, emerge! 🌸',
    accentColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    particleType: 'sakura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Sesshou Sakura Totem Beside Her */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <P x={2} y={16} w={3} h={14} c="#78350F" />
          <P x={1} y={14} w={5} h={4} c="#F472B6" />
          <P x={2} y={13} w={3} h={2} c="#C084FC" /> {/* Electro spark */}
        </g>

        {/* Drooping Pink Fox Ears (Tai Cáo) with Gold Earring */}
        <P x={8} y={6} w={4} h={6} c="#F472B6" />
        <P x={9} y={8} w={2} h={4} c="#FFF1F2" />
        <P x={8} y={12} w={2} h={3} c="#EAB308" /> {/* Gold Magatama Earring */}
        <P x={20} y={6} w={4} h={6} c="#F472B6" />
        <P x={21} y={8} w={2} h={4} c="#FFF1F2" />

        {/* Long Pastel Pink Hair */}
        <P x={10} y={6} w={12} h={4} c="#F472B6" />
        <P x={8} y={12} w={3} h={16} c="#F472B6" />
        <P x={21} y={12} w={3} h={16} c="#F472B6" />

        {/* Narukami Shrine Maiden (Miko) White-Red Attire */}
        <P x={12} y={15} w={8} h={11} c="#FFFFFF" />
        <P x={13} y={16} w={6} h={4} c="#DC2626" /> {/* Red inner collar */}
        <P x={11} y={22} w={10} h={8} c="#DC2626" /> {/* Red Hakama skirt */}
        <P x={13} y={29} w={2} h={2} c="#FCE7F3" />
        <P x={17} y={29} w={2} h={2} c="#FCE7F3" />

        {/* Face & Smug Purple Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#9333EA" />
        <P x={17} y={11} w={2} h={2} c="#9333EA" />
        <P x={15} y={13} w={2} h={1} c="#EC4899" /> {/* Fox smirk */}

        {/* Kagura Verity Wand in Hand */}
        <P x={22} y={14} w={1} h={15} c="#CA8A04" />
        <P x={21} y={12} w={3} h={3} c="#C084FC" />
      </PixelCanvas>
    ),
  },

  // 07. ZHONGLI
  {
    id: '07',
    name: 'Zhongli',
    jpName: '鍾離',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Osmanthus wine tastes the same as I remember... ☄️',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    particleType: 'gold_dust',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Planet Befall Meteorite / Geo Cube */}
        <g className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '5px 12px' }}>
          <P x={3} y={10} w={4} h={4} c="#F59E0B" />
          <P x={4} y={11} w={2} h={2} c="#FEF08A" />
        </g>

        {/* Dark Brown Hair with Glowing Amber Gold Ponytail Tip */}
        <P x={11} y={5} w={10} h={4} c="#29150B" />
        <P x={10} y={8} w={12} h={4} c="#1C1917" />
        <P x={14} y={16} w={4} h={12} c="#29150B" /> {/* Long Ponytail */}
        <P x={15} y={26} w={2} h={4} c="#F59E0B" /> {/* Amber glowing gradient tip */}

        {/* Sophisticated Liyue Brown-Gold Suit */}
        <P x={12} y={15} w={8} h={10} c="#451A03" />
        <P x={14} y={15} w={4} h={3} c="#FFFFFF" /> {/* White shirt */}
        <P x={15} y={17} w={2} h={4} c="#D97706" /> {/* Gold tie */}
        <P x={11} y={22} w={10} h={6} c="#29150B" /> {/* Formal coat tails */}
        <P x={13} y={27} w={2} h={4} c="#1C1917" /> {/* Trousers */}
        <P x={17} y={27} w={2} h={4} c="#1C1917" />

        {/* Face & Sharp Cold Golden Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#D97706" />
        <P x={14} y={11} w={1} h={1} c="#FEF08A" />
        <P x={17} y={11} w={2} h={2} c="#D97706" />
        <P x={18} y={11} w={1} h={1} c="#FEF08A" />
        {/* Red eyeliner accents */}
        <P x={12} y={11} w={1} h={1} c="#DC2626" />
        <P x={19} y={11} w={1} h={1} c="#DC2626" />

        {/* Vortex Vanquisher Spear */}
        <P x={22} y={8} w={1} h={22} c="#78350F" />
        <P x={21} y={6} w={3} h={4} c="#F59E0B" />
      </PixelCanvas>
    ),
  },

  // 08. KAMISATO AYAKA
  {
    id: '08',
    name: 'Kamisato Ayaka',
    jpName: '神里綾華',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'A blade embraces its duty! ❄️',
    accentColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.45)',
    particleType: 'ice',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* High Ponytail Pale Blue-White Hair with Samurai Ribbon */}
        <P x={14} y={2} w={4} h={4} c="#581C87" /> {/* Purple samurai cord */}
        <P x={13} y={1} w={6} h={2} c="#EAB308" /> {/* Gold cord accent */}
        <P x={11} y={4} w={10} h={12} c="#E0F2FE" /> {/* High ponytail */}
        <P x={10} y={14} w={4} h={12} c="#BAE6FD" />

        {/* Samurai Breastplate & Ice Blue Skirt */}
        <P x={12} y={15} w={8} h={10} c="#1E293B" /> {/* Black armor */}
        <P x={13} y={16} w={6} h={3} c="#EAB308" /> {/* Gold Kamon crest */}
        <P x={11} y={22} w={10} h={8} c="#60A5FA" /> {/* Pleated ice-blue skirt */}
        <P x={11} y={29} w={10} h={1} c="#E0F2FE" />
        <P x={13} y={29} w={2} h={2} c="#FFFFFF" /> {/* Tabi socks */}
        <P x={17} y={29} w={2} h={2} c="#FFFFFF" />

        {/* Face with Blunt Bangs & Mole under left eye */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#0284C7" />
        <P x={17} y={11} w={2} h={2} c="#0284C7" />
        <P x={14} y={14} w={1} h={1} c="#0F172A" /> {/* Signature beauty mark mole */}

        {/* Folding Fan (Sensu) in Front */}
        <P x={14} y={13} w={6} h={4} c="#38BDF8" />
        <P x={15} y={14} w={4} h={2} c="#EAB308" />

        {/* Mistsplitter Katana on Hip */}
        <P x={8} y={19} w={4} h={11} c="#A855F7" />
        <P x={7} y={18} w={2} h={3} c="#EAB308" />
      </PixelCanvas>
    ),
  },

  // 09. KEQING
  {
    id: '09',
    name: 'Keqing',
    jpName: '刻晴',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: "Stop procrastinating! Let's go! ⚡",
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Cat-Ear Shaped Pastel Purple Twin Buns */}
        <polygon points="9,7 6,1 12,5" fill="#C084FC" />
        <polygon points="23,7 26,1 20,5" fill="#C084FC" />
        <P x={7} y={4} w={4} h={4} c="#A855F7" />
        <P x={21} y={4} w={4} h={4} c="#A855F7" />

        {/* Twin Tails Falling Behind */}
        <P x={8} y={10} w={3} h={17} c="#C084FC" />
        <P x={21} y={10} w={3} h={17} c="#C084FC" />

        {/* Liyue Lavender & Dark Purple Dress */}
        <P x={12} y={15} w={8} h={10} c="#581C87" />
        <P x={14} y={16} w={4} h={4} c="#F3E8FF" />
        <P x={15} y={18} w={2} h={2} c="#A855F7" /> {/* Electro Vision */}
        <P x={11} y={22} w={10} h={7} c="#3B0764" /> {/* Dress hem */}
        <P x={13} y={27} w={2} h={4} c="#1E1B4B" /> {/* Dark tights */}
        <P x={17} y={27} w={2} h={4} c="#1E1B4B" />

        {/* Face & Amethyst Purple Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#7E22CE" />
        <P x={14} y={11} w={1} h={1} c="#F3E8FF" />
        <P x={17} y={11} w={2} h={2} c="#7E22CE" />
        <P x={18} y={11} w={1} h={1} c="#F3E8FF" />

        {/* Glowing Electro Sword */}
        <P x={22} y={12} w={1} h={17} c="#C084FC" />
        <P x={21} y={16} w={3} h={1} c="#EAB308" />
      </PixelCanvas>
    ),
  },

  // 10. GANYU
  {
    id: '10',
    name: 'Ganyu',
    jpName: '甘雨',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'For Rex Lapis! ❄️',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    particleType: 'ice',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Black Qilin Horns with Crimson Stripes */}
        <P x={10} y={4} w={3} h={5} c="#0F172A" />
        <P x={11} y={5} w={1} h={3} c="#DC2626" /> {/* Red stripe */}
        <P x={19} y={4} w={3} h={5} c="#0F172A" />
        <P x={20} y={5} w={1} h={3} c="#DC2626" />

        {/* Long Cryo Blue Hair */}
        <P x={10} y={7} w={12} h={5} c="#7DD3FC" />
        <P x={9} y={12} w={3} h={16} c="#38BDF8" />
        <P x={20} y={12} w={3} h={16} c="#38BDF8" />

        {/* Black, White & Gold Bodysuit */}
        <P x={12} y={15} w={8} h={12} c="#0F172A" />
        <P x={13} y={17} w={6} h={4} c="#FFFFFF" />
        {/* Golden Bell at Collar */}
        <P x={15} y={15} w={2} h={2} c="#EAB308" />
        <P x={12} y={23} w={8} h={5} c="#0369A1" /> {/* Blue apron */}
        <P x={13} y={27} w={2} h={4} c="#0F172A" /> {/* Tights */}
        <P x={17} y={27} w={2} h={4} c="#0F172A" />

        {/* Face & Gentle Purple Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#818CF8" />
        <P x={17} y={11} w={2} h={2} c="#818CF8" />

        {/* Amos Bow / Cryo Lotus Orb */}
        <g className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '24px 20px' }}>
          <circle cx="24" cy="20" r="3" fill="#E0F2FE" opacity="0.8" />
          <P x={23} y={19} w={2} h={2} c="#38BDF8" />
        </g>
      </PixelCanvas>
    ),
  },

  // 11. ARLECCHINO (THE KNAVE)
  {
    id: '11',
    name: 'Arlecchino (The Knave)',
    jpName: 'アルレッキーノ',
    origin: 'Genshin Impact',
    category: 'genshin_honkai',
    quote: 'Everlasting as the moon... 🔥',
    accentColor: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
    particleType: 'blood',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Single Black-Red Flame Angel Wing on Left Back */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          <path d="M 8 10 C 2 6 0 14 3 22 C 5 18 8 16 9 14 Z" fill="#7F1D1D" />
          <path d="M 6 12 C 1 8 0 16 3 20" stroke="#EF4444" strokeWidth="1" fill="none" />
        </g>

        {/* White Hair with Black Under-Streaks */}
        <P x={10} y={5} w={12} h={4} c="#F8FAFC" />
        <P x={9} y={8} w={3} h={11} c="#0F172A" /> {/* Black streaks */}
        <P x={20} y={8} w={3} h={11} c="#F8FAFC" />

        {/* Aristocratic White, Black & Crimson Coat */}
        <P x={12} y={15} w={8} h={10} c="#0F172A" />
        <P x={13} y={16} w={6} h={5} c="#F8FAFC" /> {/* White waistcoat */}
        <P x={15} y={18} w={2} h={3} c="#DC2626" /> {/* Blood red tie */}
        <P x={11} y={23} w={10} h={6} c="#0F172A" />
        <P x={13} y={28} w={2} h={3} c="#0F172A" /> {/* Black boots */}
        <P x={17} y={28} w={2} h={3} c="#0F172A" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FFF1F2" />
        {/* Black Eyes with Blood-Red X Pupils */}
        <P x={13} y={11} w={2} h={2} c="#09090B" />
        <P x={13} y={11} w={1} h={1} c="#DC2626" /> {/* Red X */}
        <P x={14} y={12} w={1} h={1} c="#DC2626" />
        <P x={17} y={11} w={2} h={2} c="#09090B" />
        <P x={17} y={11} w={1} h={1} c="#DC2626" />
        <P x={18} y={12} w={1} h={1} c="#DC2626" />

        {/* Crimson Bloodfire Scythe (Lưỡi hái lửa đỏ) in Hand */}
        <P x={22} y={8} w={1} h={23} c="#18181B" />
        <path d="M 22 8 Q 28 4 27 1 Q 20 6 22 10" fill="#DC2626" />
        <P x={23} y={4} w={3} h={2} c="#EF4444" />
      </PixelCanvas>
    ),
  },
];
