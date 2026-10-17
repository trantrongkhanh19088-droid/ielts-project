import React from 'react';
import { PixelCharacter } from '../types';
import { PixelCanvas, P } from '../pixel-helper';

export const BATCH_3_CHARACTERS: PixelCharacter[] = [
  // 23. MONKEY D. LUFFY
  {
    id: '23',
    name: 'Monkey D. Luffy',
    jpName: 'モンキー・D・ルフィ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Kaizoku Ou ni, ore wa naru! (Ta sẽ trở thành Vua Hải Tặc!) 👒',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    particleType: 'feathers',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* White Hagoromo Cloud Scarf (Gear 5 Cloud) Floating Around Shoulders */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          <P x={4} y={13} w={5} h={3} c="#F8FAFC" />
          <P x={23} y={13} w={5} h={3} c="#F8FAFC" />
          <circle cx="6" cy="14" r="2" fill="#E2E8F0" />
          <circle cx="26" cy="14" r="2" fill="#E2E8F0" />
        </g>

        {/* Messy Black Hair */}
        <P x={10} y={7} w={12} h={4} c="#0F172A" />
        <P x={9} y={10} w={3} h={4} c="#0F172A" />
        <P x={20} y={10} w={3} h={4} c="#0F172A" />

        {/* Iconic Straw Hat with Red Ribbon (Mũ Rơm) */}
        <P x={11} y={3} w={10} h={3} c="#FDE047" /> {/* Crown */}
        <P x={11} y={5} w={10} h={1} c="#DC2626" /> {/* Red Ribbon */}
        <P x={6} y={6} w={20} h={2} c="#FACC15" /> {/* Wide Brim */}

        {/* Unbuttoned Red Vest & Chest with Stitched X-Scar */}
        <P x={11} y={15} w={3} h={9} c="#EF4444" /> {/* Red vest left */}
        <P x={18} y={15} w={3} h={9} c="#EF4444" /> {/* Red vest right */}
        <P x={14} y={15} w={4} h={9} c="#FCE7F3" /> {/* Exposed chest */}
        {/* Giant X-Scar on Chest */}
        <P x={14} y={17} w={1} h={1} c="#DC2626" />
        <P x={17} y={17} w={1} h={1} c="#DC2626" />
        <P x={15} y={18} w={2} h={2} c="#B91C1C" />
        <P x={14} y={20} w={1} h={1} c="#DC2626" />
        <P x={17} y={20} w={1} h={1} c="#DC2626" />

        {/* Blue Shorts with White Fluff & Straw Sandals */}
        <P x={12} y={23} w={8} h={4} c="#2563EB" /> {/* Blue shorts */}
        <P x={12} y={27} w={8} h={1} c="#F8FAFC" /> {/* White cuff */}
        <P x={13} y={28} w={2} h={3} c="#FCE7F3" /> {/* Skin */}
        <P x={17} y={28} w={2} h={3} c="#FCE7F3" />
        <P x={13} y={30} w={2} h={1} c="#78350F" /> {/* Sandals */}
        <P x={17} y={30} w={2} h={1} c="#78350F" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Big Black Eyes */}
        <P x={13} y={10} w={2} h={2} c="#0F172A" />
        <P x={17} y={10} w={2} h={2} c="#0F172A" />
        {/* Stitched Scar Under Left Eye */}
        <P x={13} y={13} w={2} h={1} c="#DC2626" />
        <P x={13} y={12} w={1} h={1} c="#DC2626" />
        {/* Giant D-Clan Grin */}
        <P x={14} y={14} w={4} h={1} c="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" />
      </PixelCanvas>
    ),
  },

  // 24. RORONOA ZORO
  {
    id: '24',
    name: 'Roronoa Zoro',
    jpName: 'ロロノア・ゾロ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Santoryu Ougi... Rengoku Onigiri! ⚔️',
    accentColor: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    particleType: 'leaves',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Short Moss-Green Hair (Đầu tảo) */}
        <P x={10} y={5} w={12} h={5} c="#15803D" />
        <P x={11} y={4} w={10} h={2} c="#22C55E" />

        {/* 3 Gold Earrings on Left Ear */}
        <P x={8} y={10} w={1} h={1} c="#EAB308" />
        <P x={8} y={12} w={1} h={1} c="#EAB308" />
        <P x={8} y={14} w={1} h={1} c="#EAB308" />

        {/* Deep Green Coat with Red Sash */}
        <P x={11} y={15} w={10} h={11} c="#14532D" />
        <P x={13} y={15} w={6} h={5} c="#FCE7F3" /> {/* Bare chest */}
        <P x={14} y={16} w={1} h={4} c="#DC2626" /> {/* Chest slash scar */}
        <P x={12} y={20} w={8} h={3} c="#DC2626" /> {/* Red Haramaki sash */}
        <P x={12} y={26} w={8} h={4} c="#14532D" />
        <P x={13} y={29} w={2} h={2} c="#0F172A" /> {/* Black boots */}
        <P x={17} y={29} w={2} h={2} c="#0F172A" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Right Sharp Eye & Left Eye Scar */}
        <P x={17} y={11} w={2} h={1} c="#0F172A" />
        <P x={13} y={10} w={1} h={3} c="#991B1B" /> {/* Vertical scar over closed left eye */}
        <P x={14} y={13} w={4} h={1} c="#1E293B" /> {/* Stoic grin */}

        {/* Three Katanas on Right Hip (Wado Ichimonji White, Enma Purple, Sandai Kitetsu Red) */}
        <P x={21} y={17} w={7} h={2} c="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" /> {/* Wado */}
        <P x={21} y={19} w={7} h={2} c="#7E22CE" /> {/* Enma */}
        <P x={21} y={21} w={7} h={2} c="#DC2626" /> {/* Sandai Kitetsu */}
        {/* Katana hilts */}
        <P x={19} y={16} w={3} h={2} c="#EAB308" />
      </PixelCanvas>
    ),
  },

  // 25. SANJI
  {
    id: '25',
    name: 'Sanji',
    jpName: 'サンジ',
    origin: 'One Piece',
    category: 'shonen_classic',
    quote: 'Nami-swan~ Robin-chwan~ ❤️🔥',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    particleType: 'fire',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Floating Pink Love Hearts */}
        <g className="animate-bounce" style={{ animationDuration: '2.5s' }}>
          <P x={4} y={8} w={3} h={3} c="#EC4899" />
          <P x={25} y={10} w={3} h={3} c="#EC4899" />
        </g>

        {/* Blonde Hair covering one eye */}
        <P x={10} y={5} w={12} h={5} c="#FACC15" />
        <P x={9} y={9} w={4} h={7} c="#FACC15" /> {/* Left hair bangs covering left eye */}
        <P x={19} y={9} w={3} h={7} c="#FACC15" />

        {/* Sleek Black Suit & Tie */}
        <P x={11} y={15} w={10} h={10} c="#0F172A" />
        <P x={14} y={15} w={4} h={4} c="#FFFFFF" /> {/* White shirt */}
        <P x={15} y={17} w={2} h={4} c="#09090B" /> {/* Black tie */}
        <P x={12} y={24} w={4} h={6} c="#0F172A" /> {/* Left leg */}

        {/* Diable Jambe Flaming Right Leg! */}
        <g className="animate-pulse" style={{ animationDuration: '1s' }}>
          <P x={17} y={23} w={5} h={7} c="#EA580C" /> {/* Fire leg */}
          <P x={18} y={24} w={3} h={6} c="#FACC15" /> {/* Yellow core flame */}
          <P x={16} y={27} w={7} h={3} c="#EF4444" />
        </g>

        {/* Face with Curly Eyebrow */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Right Eye & Curly Swirl Eyebrow */}
        <P x={17} y={10} w={2} h={1} c="#0F172A" />
        <P x={17} y={9} w={3} h={1} c="#0F172A" /> {/* Swirl eyebrow */}
        <P x={19} y={8} w={1} h={1} c="#0F172A" />
        {/* Cigarette in Mouth with Smoke */}
        <P x={14} y={14} w={3} h={1} c="#FFFFFF" />
        <P x={17} y={14} w={1} h={1} c="#DC2626" /> {/* Lit tip */}
      </PixelCanvas>
    ),
  },

  // 26. NARUTO UZUMAKI
  {
    id: '26',
    name: 'Naruto Uzumaki',
    jpName: 'うずまきナルト',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Dattebayo! Đây là nhẫn đạo của ta! 🍥',
    accentColor: '#FF7A00',
    glowColor: 'rgba(255, 122, 0, 0.45)',
    particleType: 'fire',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Spinning Blue Rasengan Sphere in Hand */}
        <g className="animate-spin" style={{ animationDuration: '3s', transformOrigin: '6px 20px' }}>
          <circle cx="6" cy="20" r="4" fill="#38BDF8" opacity="0.9" />
          <circle cx="6" cy="20" r="2" fill="#FFFFFF" />
        </g>

        {/* Spiky Bright Blonde Hair */}
        <P x={9} y={3} w={14} h={4} c="#FACC15" />
        <P x={8} y={5} w={3} h={3} c="#FDE047" />
        <P x={21} y={5} w={3} h={3} c="#FDE047" />
        <P x={14} y={1} w={4} h={3} c="#FACC15" />

        {/* Hidden Leaf Headband (Băng trán Làng Lá) */}
        <P x={10} y={6} w={12} h={3} c="#0F172A" /> {/* Black cloth */}
        <P x={13} y={6} w={6} h={3} c="#CBD5E1" /> {/* Metal plate */}
        <P x={15} y={7} w={2} h={1} c="#334155" /> {/* Engraved Leaf emblem */}

        {/* Orange & Black Jumpsuit with 7th Hokage White-Flame Cape */}
        <P x={11} y={15} w={10} h={10} c="#EA580C" /> {/* Orange suit */}
        <P x={12} y={15} w={8} h={3} c="#1E293B" /> {/* Black shoulders */}
        <P x={10} y={23} w={12} h={4} c="#EA580C" /> {/* Orange pants */}
        {/* White Hokage Cape with Red Flame Hem */}
        <P x={9} y={17} w={3} h={9} c="#F8FAFC" />
        <P x={20} y={17} w={3} h={9} c="#F8FAFC" />
        <P x={9} y={25} w={3} h={2} c="#DC2626" /> {/* Red flames */}
        <P x={20} y={25} w={3} h={2} c="#DC2626" />

        {/* Face with 3 Whisker Marks on each cheek */}
        <P x={12} y={9} w={8} h={6} c="#FCE7F3" />
        {/* Blue Ninja Eyes */}
        <P x={13} y={11} w={2} h={2} c="#0284C7" />
        <P x={17} y={11} w={2} h={2} c="#0284C7" />
        {/* Whiskers (3 vệt râu mèo) */}
        <P x={12} y={12} w={2} h={1} c="#D97706" />
        <P x={12} y={13} w={2} h={1} c="#D97706" />
        <P x={18} y={12} w={2} h={1} c="#D97706" />
        <P x={18} y={13} w={2} h={1} c="#D97706" />
        {/* Determined Smile */}
        <P x={14} y={14} w={4} h={1} c="#0F172A" />
      </PixelCanvas>
    ),
  },

  // 27. SASUKE UCHIHA
  {
    id: '27',
    name: 'Sasuke Uchiha',
    jpName: 'うちはサスケ',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Chidori! ⚡',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Crackling Blue-White Chidori Lightning in Hand */}
        <g className="animate-pulse" style={{ animationDuration: '0.8s' }}>
          <P x={2} y={18} w={6} h={6} c="#67E8F9" />
          <P x={4} y={16} w={2} h={10} c="#FFFFFF" />
          <P x={1} y={20} w={8} h={2} c="#60A5FA" />
        </g>

        {/* Spiky Jet-Black Hair with Long Bangs */}
        <P x={9} y={3} w={14} h={6} c="#09090B" />
        <P x={8} y={8} w={4} h={8} c="#09090B" /> {/* Long left bangs */}
        <P x={20} y={8} w={4} h={8} c="#09090B" /> {/* Long right bangs */}
        <P x={14} y={1} w={4} h={3} c="#09090B" /> {/* Ducktail spikes */}

        {/* Dark Traveler Cloak & Grey Shirt */}
        <P x={11} y={15} w={10} h={11} c="#18181B" />
        <P x={13} y={16} w={6} h={4} c="#334155" />
        <P x={12} y={20} w={8} h={3} c="#7C3AED" /> {/* Purple rope belt */}
        <P x={12} y={25} w={8} h={5} c="#18181B" />

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Right Red Sharingan & Left Purple Ripple Rinnegan */}
        <P x={13} y={11} w={2} h={2} c="#DC2626" /> {/* Sharingan red */}
        <P x={14} y={11} w={1} h={1} c="#09090B" /> {/* Tomoe */}
        <P x={17} y={11} w={2} h={2} c="#A855F7" /> {/* Rinnegan purple */}
        <P x={18} y={11} w={1} h={1} c="#F3E8FF" />

        {/* Kusanagi Katana Sheathed on Back */}
        <P x={22} y={9} w={2} h={18} c="#334155" />
        <P x={21} y={7} w={3} h={3} c="#F8FAFC" />
      </PixelCanvas>
    ),
  },

  // 28. KAKASHI HATAKE
  {
    id: '28',
    name: 'Kakashi Hatake',
    jpName: 'はたけカカシ',
    origin: 'Naruto',
    category: 'shonen_classic',
    quote: 'Yo! Xin lỗi vì thầy đến muộn nhé~ 📖',
    accentColor: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Orange Icha Icha Paradise Book in Hand */}
        <P x={22} y={15} w={6} h={7} c="#EA580C" />
        <P x={23} y={16} w={4} h={5} c="#FDE047" /> {/* Book cover art */}
        <P x={24} y={17} w={2} h={2} c="#DC2626" />

        {/* Spiky Silver-White Hair Tilted to Right */}
        <P x={10} y={3} w={13} h={5} c="#E2E8F0" />
        <P x={17} y={1} w={6} h={4} c="#CBD5E1" /> {/* Spikes tilting right */}
        <P x={8} y={7} w={3} h={4} c="#E2E8F0" />

        {/* Leaf Headband Tilted Covering Left Eye */}
        <P x={10} y={6} w={12} h={3} c="#1E293B" />
        <P x={12} y={6} w={6} h={3} c="#94A3B8" /> {/* Metal protector */}
        <P x={11} y={9} w={3} h={3} c="#1E293B" /> {/* Tilted fabric covering left eye */}

        {/* Black Face Mask covering nose down to neck */}
        <P x={12} y={8} w={8} h={4} c="#FCE7F3" /> {/* Upper face */}
        <P x={12} y={12} w={8} h={4} c="#0F172A" /> {/* Black mask */}
        {/* Right Visible Eye (Chill / Lazy Eye) */}
        <P x={17} y={10} w={2} h={1} c="#0F172A" />

        {/* Green Jounin Flak Jacket & Dark Navy Uniform */}
        <P x={11} y={15} w={10} h={10} c="#166534" /> {/* Jounin vest */}
        <P x={13} y={16} w={6} h={5} c="#14532D" />
        <P x={14} y={17} w={4} h={3} c="#0F172A" />
        <P x={12} y={24} w={8} h={6} c="#0F172A" /> {/* Navy pants */}
        <P x={13} y={27} w={2} h={2} c="#F8FAFC" /> {/* Leg bandage */}
      </PixelCanvas>
    ),
  },

  // 29. SON GOKU
  {
    id: '29',
    name: 'Son Goku',
    jpName: '孫悟空',
    origin: 'Dragon Ball',
    category: 'shonen_classic',
    quote: 'Kame... Hame... HA!! 🐉',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    particleType: 'gold_dust',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Standing on Yellow Flying Nimbus (Cân Đẩu Vân) */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <ellipse cx="16" cy="30" rx="14" ry="3" fill="#FACC15" opacity="0.9" />
          <circle cx="8" cy="29" r="3" fill="#FDE047" />
          <circle cx="24" cy="29" r="3" fill="#FDE047" />
        </g>

        {/* Iconic Goku Jet-Black Spiky Hair (Chỏm ngang kinh điển) */}
        <P x={10} y={4} w={12} h={5} c="#09090B" />
        <P x={5} y={5} w={6} h={4} c="#09090B" /> {/* Left big wing spike */}
        <P x={21} y={5} w={6} h={4} c="#09090B" /> {/* Right big wing spike */}
        <P x={14} y={1} w={4} h={4} c="#09090B" /> {/* Top hair spike */}

        {/* Orange Turtle School Gi with Blue Undershirt & Kanji */}
        <P x={11} y={14} w={10} h={10} c="#EA580C" /> {/* Orange Gi */}
        <P x={13} y={14} w={6} h={4} c="#1E3A8A" /> {/* Blue undershirt */}
        <circle cx="17" cy="18" r="2" fill="#FFFFFF" /> {/* Kanji circle */}
        <P x={16} y={17} w={2} h={2} c="#09090B" />
        <P x={12} y={20} w={8} h={2} c="#1E3A8A" /> {/* Blue sash belt */}
        <P x={11} y={22} w={10} h={6} c="#EA580C" /> {/* Orange pants */}

        {/* Face & Confident Saiyan Eyes */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#09090B" />
        <P x={17} y={10} w={2} h={2} c="#09090B" />
        <P x={14} y={13} w={4} h={1} c="#09090B" /> {/* Goku grin */}

        {/* Blue Wristbands & Boots */}
        <P x={8} y={18} w={3} h={3} c="#1E3A8A" />
        <P x={21} y={18} w={3} h={3} c="#1E3A8A" />
      </PixelCanvas>
    ),
  },

  // 30. VEGETA
  {
    id: '30',
    name: 'Vegeta',
    jpName: 'ベジータ',
    origin: 'Dragon Ball',
    category: 'shonen_classic',
    quote: 'I am the Prince of all Saiyans! 💥',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Upright Flame-Shaped Hair with Sharp M-Forehead */}
        <P x={11} y={1} w={10} h={8} c="#09090B" />
        <P x={13} y={0} w={6} h={2} c="#09090B" /> {/* Top flame tip */}
        <P x={9} y={4} w={3} h={5} c="#09090B" />
        <P x={20} y={4} w={3} h={5} c="#09090B" />

        {/* Saiyan Battle Armor (White & Gold Straps) with Navy Bodysuit */}
        <P x={11} y={14} w={10} h={10} c="#1E3A8A" /> {/* Navy suit */}
        <P x={12} y={14} w={8} h={7} c="#FFFFFF" /> {/* White chestplate */}
        <P x={13} y={15} w={6} h={5} c="#FACC15" /> {/* Gold abdomen ribs */}
        <P x={9} y={13} w={4} h={3} c="#FFFFFF" /> {/* White shoulder guards */}
        <P x={19} y={13} w={4} h={3} c="#FFFFFF" />
        <P x={12} y={23} w={8} h={6} c="#1E3A8A" /> {/* Navy pants */}
        <P x={12} y={27} w={3} h={4} c="#FFFFFF" /> {/* White boots */}
        <P x={17} y={27} w={3} h={4} c="#FFFFFF" />

        {/* Face with M-Forehead & Arrogant Glare */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={7} w={2} h={1} c="#09090B" /> {/* M-widow's peak */}
        <P x={17} y={7} w={2} h={1} c="#09090B" />
        <P x={13} y={10} w={2} h={2} c="#09090B" />
        <P x={17} y={10} w={2} h={2} c="#09090B" />
        <P x={14} y={13} w={4} h={1} c="#09090B" /> {/* Smug smirk */}

        {/* Arms Crossed in Front */}
        <P x={11} y={18} w={10} h={3} c="#FFFFFF" /> {/* White gloves */}
      </PixelCanvas>
    ),
  },

  // 31. ICHIGO KUROSAKI
  {
    id: '31',
    name: 'Ichigo Kurosaki',
    jpName: '黒崎一護',
    origin: 'Bleach',
    category: 'shonen_classic',
    quote: 'Bankai... Tensa Zangetsu! 🌙',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    particleType: 'dark_aura',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Giant Cleaver Zangetsu on Back */}
        <P x={22} y={4} w={4} h={26} c="#18181B" />
        <P x={23} y={5} w={2} h={24} c="#E2E8F0" /> {/* Silver blade edge */}
        <P x={21} y={28} w={6} h={2} c="#F8FAFC" /> {/* Cloth wrap */}

        {/* Spiky Bright Orange Hair */}
        <P x={9} y={4} w={14} h={5} c="#F97316" />
        <P x={8} y={7} w={4} h={4} c="#EA580C" />
        <P x={20} y={7} w={4} h={4} c="#EA580C" />

        {/* Half White Hollow Mask on Left Face with Red Stripes */}
        <P x={8} y={7} w={4} h={5} c="#FFFFFF" />
        <P x={9} y={8} w={1} h={3} c="#DC2626" /> {/* Red stripe */}
        <P x={11} y={8} w={1} h={3} c="#DC2626" />

        {/* Shinigami Shihakusho Robes (Black & White) */}
        <P x={11} y={15} w={10} h={12} c="#0F172A" />
        <P x={13} y={15} w={6} h={4} c="#FFFFFF" /> {/* White inner collar */}
        <P x={12} y={21} w={8} h={2} c="#FFFFFF" /> {/* White Obi sash */}
        <P x={11} y={24} w={10} h={6} c="#0F172A" /> {/* Hakama pants */}

        {/* Face */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        {/* Brown/Gold Shinigami Eye */}
        <P x={17} y={11} w={2} h={2} c="#78350F" />
        <P x={13} y={11} w={2} h={2} c="#FDE047" /> {/* Hollow eye glow */}
      </PixelCanvas>
    ),
  },

  // 32. GON FREECSS
  {
    id: '32',
    name: 'Gon Freecss',
    jpName: 'ゴン＝フリークス',
    origin: 'Hunter x Hunter',
    category: 'shonen_classic',
    quote: 'Saisho wa Guu! Jan... Ken... Guu! ✊',
    accentColor: '#16A34A',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    particleType: 'gold_dust',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Impossibly Tall Upright Black Hair with Green Sheen */}
        <P x={11} y={0} w={10} h={9} c="#09090B" />
        <P x={10} y={2} w={2} h={7} c="#15803D" /> {/* Green sheen */}
        <P x={20} y={2} w={2} h={7} c="#15803D" />
        <P x={13} y={0} w={6} h={3} c="#16A34A" />

        {/* Green Jacket with Orange Trim & Shorts */}
        <P x={11} y={15} w={10} h={8} c="#15803D" />
        <P x={13} y={15} w={6} h={8} c="#EA580C" /> {/* Orange zipper/trim */}
        <P x={14} y={16} w={4} h={4} c="#FFFFFF" />
        <P x={12} y={23} w={8} h={3} c="#15803D" /> {/* Green short-shorts */}
        <P x={13} y={26} w={2} h={3} c="#FCE7F3" /> {/* Bare legs */}
        <P x={17} y={26} w={2} h={3} c="#FCE7F3" />
        <P x={13} y={29} w={2} h={2} c="#15803D" /> {/* Green boots */}
        <P x={17} y={29} w={2} h={2} c="#15803D" />

        {/* Face & Large Bright Brown Eyes */}
        <P x={12} y={8} w={8} h={7} c="#FCE7F3" />
        <P x={13} y={11} w={2} h={2} c="#78350F" />
        <P x={14} y={11} w={1} h={1} c="#FDE047" />
        <P x={17} y={11} w={2} h={2} c="#78350F" />
        <P x={18} y={11} w={1} h={1} c="#FDE047" />

        {/* Glowing Orange Jajanken Fist */}
        <g className="animate-pulse" style={{ animationDuration: '1s' }}>
          <circle cx="23" cy="18" r="4" fill="#F59E0B" opacity="0.9" />
          <P x={22} y={17} w={2} h={2} c="#FEF08A" />
        </g>
      </PixelCanvas>
    ),
  },

  // 33. KILLUA ZOLDYCK
  {
    id: '33',
    name: 'Killua Zoldyck',
    jpName: 'キルア＝ゾルディック',
    origin: 'Hunter x Hunter',
    category: 'shonen_classic',
    quote: 'Baka~ ⚡',
    accentColor: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.45)',
    particleType: 'lightning',
    rarity: 5,
    renderSprite: ({ size = 64, className = '' }) => (
      <PixelCanvas size={size} className={className}>
        {/* Yellow Skateboard Beside Him */}
        <P x={3} y={14} w={3} h={15} c="#FACC15" />
        <P x={2} y={16} w={1} h={2} c="#DC2626" /> {/* Wheel */}
        <P x={2} y={25} w={1} h={2} c="#DC2626" />

        {/* Fluffy Spiky Silver-White Hair */}
        <P x={10} y={4} w={12} h={5} c="#F8FAFC" />
        <P x={8} y={6} w={4} h={6} c="#E2E8F0" />
        <P x={20} y={6} w={4} h={6} c="#E2E8F0" />
        <P x={12} y={2} w={8} h={3} c="#FFFFFF" />

        {/* Navy Turtleneck under White V-neck Tee & Baggy Shorts */}
        <P x={11} y={14} w={10} h={10} c="#FFFFFF" />
        <P x={13} y={14} w={6} h={3} c="#1E1B4B" /> {/* Navy turtleneck */}
        <P x={12} y={22} w={8} h={4} c="#1E293B" /> {/* Baggy shorts */}
        <P x={13} y={26} w={2} h={3} c="#FCE7F3" />
        <P x={17} y={26} w={2} h={3} c="#FCE7F3" />
        <P x={13} y={29} w={2} h={2} c="#9333EA" /> {/* Purple sneakers */}
        <P x={17} y={29} w={2} h={2} c="#9333EA" />

        {/* Face & Cat-Like Electric Blue Eyes */}
        <P x={12} y={8} w={8} h={6} c="#FCE7F3" />
        <P x={13} y={10} w={2} h={2} c="#0284C7" />
        <P x={14} y={10} w={1} h={1} c="#E0F2FE" />
        <P x={17} y={10} w={2} h={2} c="#0284C7" />
        <P x={18} y={10} w={1} h={1} c="#E0F2FE" />
        <P x={15} y={13} w={2} h={1} c="#FB7185" /> {/* Cat mouth "3" */}

        {/* Godspeed Electric Lightning Sparks */}
        <P x={23} y={16} w={4} h={1} c="#93C5FD" />
        <P x={24} y={18} w={3} h={1} c="#BFDBFE" />
      </PixelCanvas>
    ),
  },
];
