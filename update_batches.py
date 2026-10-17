import os

batches = {
    1: [
        ('01', 'Raiden Shogun (Ei)', '雷電将軍', 'Genshin Impact', 'genshin_honkai', 'Inazuma shines eternal! ⚡', '#7B2CBF', 'rgba(123, 44, 191, 0.5)', 'lightning'),
        ('02', 'Hu Tao', '胡桃', 'Genshin Impact', 'genshin_honkai', 'Silly-churl, billy-churl, sil-ly-billy Hilichurl~ 👻', '#FF4D4D', 'rgba(255, 77, 77, 0.5)', 'fire'),
        ('03', 'Sandrone (Marionette)', '傀儡 (サンドローネ)', 'Genshin Impact', 'genshin_honkai', 'Utterly risible... My automatons will handle this. ⚙️', '#D4AF37', 'rgba(212, 175, 55, 0.5)', 'gold_dust'),
        ('04', 'Furina (Focalors)', 'フリーナ', 'Genshin Impact', 'genshin_honkai', 'Let the world come alive! 💧', '#3B82F6', 'rgba(59, 130, 246, 0.5)', 'bubbles'),
        ('05', 'Nahida', 'ナヒーダ', 'Genshin Impact', 'genshin_honkai', 'Everyone hold hands~ 🌱', '#4ADE80', 'rgba(74, 222, 128, 0.5)', 'leaves'),
        ('06', 'Yae Miko', '八重神子', 'Genshin Impact', 'genshin_honkai', 'Right here, right now, emerge! 🌸', '#F472B6', 'rgba(244, 114, 182, 0.5)', 'sakura'),
        ('07', 'Zhongli', '鍾離', 'Genshin Impact', 'genshin_honkai', 'Osmanthus wine tastes the same as I remember... ☄️', '#F59E0B', 'rgba(245, 158, 11, 0.5)', 'gold_dust'),
        ('08', 'Kamisato Ayaka', '神里綾華', 'Genshin Impact', 'genshin_honkai', 'A blade embraces its duty! ❄️', '#60A5FA', 'rgba(96, 165, 250, 0.5)', 'ice'),
        ('09', 'Keqing', '刻晴', 'Genshin Impact', 'genshin_honkai', 'Stop procrastinating! Let\'s go! ⚡', '#A855F7', 'rgba(168, 85, 247, 0.5)', 'lightning'),
        ('10', 'Ganyu', '甘雨', 'Genshin Impact', 'genshin_honkai', 'For Rex Lapis! ❄️', '#38BDF8', 'rgba(56, 189, 248, 0.5)', 'ice'),
        ('11', 'Arlecchino (The Knave)', '召使 (アルレッキーノ)', 'Genshin Impact', 'genshin_honkai', 'Everlasting as the moon... 🔥', '#DC2626', 'rgba(220, 38, 38, 0.5)', 'blood'),
    ],
    2: [
        ('12', 'Navia', 'ナヴィア', 'Genshin Impact', 'genshin_honkai', 'Umbrella warfare, I guess! ☂️', '#EAB308', 'rgba(234, 179, 8, 0.5)', 'gold_dust'),
        ('13', 'Neuvillette', 'ヌヴィレット', 'Genshin Impact', 'genshin_honkai', 'Order in the court! 🌊', '#0284C7', 'rgba(2, 132, 199, 0.5)', 'water'),
        ('14', 'Xiao', '魈', 'Genshin Impact', 'genshin_honkai', 'Evil conquering! Disappear! 🍃', '#10B981', 'rgba(16, 185, 129, 0.5)', 'dark_aura'),
        ('15', 'Kaedehara Kazuha', '楓原万葉', 'Genshin Impact', 'genshin_honkai', 'Fallen leaves, adorn my night! 🍁', '#F97316', 'rgba(249, 115, 22, 0.5)', 'leaves'),
        ('16', 'Venti', 'ウェンティ', 'Genshin Impact', 'genshin_honkai', 'Time for a ballad! 🍃', '#34D399', 'rgba(52, 211, 153, 0.5)', 'feathers'),
        ('17', 'Shenhe', '申鶴', 'Genshin Impact', 'genshin_honkai', 'Transformation... begins. ❄️', '#7DD3FC', 'rgba(125, 211, 252, 0.5)', 'ice'),
        ('18', 'Nilou', 'ニィロウ', 'Genshin Impact', 'genshin_honkai', 'Dance with the ripples! 💧', '#06B6D4', 'rgba(6, 182, 212, 0.5)', 'bubbles'),
        ('19', 'Kafka', 'カフカ', 'Honkai: Star Rail', 'genshin_honkai', 'Boom. Time to listen... 🕸️', '#9333EA', 'rgba(147, 51, 234, 0.5)', 'dark_aura'),
        ('20', 'Firefly (Đom Đóm)', 'ホタル', 'Honkai: Star Rail', 'genshin_honkai', 'I will set the seas ablaze! 🔥', '#2DD4BF', 'rgba(45, 212, 191, 0.5)', 'stars'),
        ('21', 'Acheron', '黄泉', 'Honkai: Star Rail', 'genshin_honkai', 'I weep for the departed... 🌺', '#E11D48', 'rgba(225, 29, 72, 0.5)', 'spider_lily'),
        ('22', 'Sparkle (Hanabi)', '花火', 'Honkai: Star Rail', 'genshin_honkai', 'All the world\'s a stage! 🎭', '#EF4444', 'rgba(239, 68, 68, 0.5)', 'sakura'),
    ],
    3: [
        ('23', 'Monkey D. Luffy', 'モンキー・D・ルフィ', 'One Piece', 'shonen_classic', 'Kaizoku ou ni, ore wa naru! 🍖', '#EF4444', 'rgba(239, 68, 68, 0.5)', 'stars'),
        ('24', 'Roronoa Zoro', 'ロロノア・ゾロ', 'One Piece', 'shonen_classic', 'Nothing happened. ⚔️', '#22C55E', 'rgba(34, 197, 94, 0.5)', 'leaves'),
        ('25', 'Sanji', 'サンジ', 'One Piece', 'shonen_classic', 'Cooking is a gift from the gods! 🚬', '#F59E0B', 'rgba(245, 158, 11, 0.5)', 'fire'),
        ('26', 'Naruto Uzumaki', 'うずまきナルト', 'Naruto', 'shonen_classic', 'Dattebayo! That\'s my nindo! 🍥', '#FF7A00', 'rgba(255, 122, 0, 0.5)', 'fire'),
        ('27', 'Sasuke Uchiha', 'うちはサスケ', 'Naruto', 'shonen_classic', 'Chidori! My eyes see through all darkness. ⚡', '#6366F1', 'rgba(99, 102, 241, 0.5)', 'lightning'),
        ('28', 'Kakashi Hatake', 'はたけカカシ', 'Naruto', 'shonen_classic', 'Those who abandon their comrades are worse than scum. 📖', '#94A3B8', 'rgba(148, 163, 184, 0.5)', 'lightning'),
        ('29', 'Son Goku', '孫悟空', 'Dragon Ball Z', 'shonen_classic', 'Kamehameha! I\'m getting excited! 💥', '#F97316', 'rgba(249, 115, 22, 0.5)', 'fire'),
        ('30', 'Vegeta', 'ベジータ', 'Dragon Ball Z', 'shonen_classic', 'I am the Prince of all Saiyans! Final Flash! 👑', '#3B82F6', 'rgba(59, 130, 246, 0.5)', 'lightning'),
        ('31', 'Ichigo Kurosaki', '黒崎一護', 'Bleach', 'shonen_classic', 'Bankai! Tensa Zangetsu! 🗡️', '#F97316', 'rgba(249, 115, 22, 0.5)', 'dark_aura'),
        ('32', 'Gon Freecss', 'ゴン＝フリークス', 'Hunter x Hunter', 'shonen_classic', 'First comes rock! Jajanken! 🪨', '#16A34A', 'rgba(22, 163, 74, 0.5)', 'leaves'),
        ('33', 'Killua Zoldyck', 'キルア＝ゾルディック', 'Hunter x Hunter', 'shonen_classic', 'Godspeed! Electricity won\'t hurt me. ⚡', '#60A5FA', 'rgba(96, 165, 250, 0.5)', 'lightning'),
    ],
    4: [
        ('34', 'Chainsaw Man (Denji)', 'チェンソーマン', 'Chainsaw Man', 'shonen_new', 'Vrrrnnn! Jam on toast, that\'s my dream! 🪚', '#EA580C', 'rgba(234, 88, 12, 0.5)', 'blood'),
        ('35', 'Power', 'パワー', 'Chainsaw Man', 'shonen_new', 'Bow before me, human! For I am Power! 🩸', '#E11D48', 'rgba(225, 29, 72, 0.5)', 'blood'),
        ('36', 'Makima', 'マキマ', 'Chainsaw Man', 'shonen_new', 'Bang. A necessary evil is always controlled. ⛓️', '#BE123C', 'rgba(190, 18, 60, 0.5)', 'dark_aura'),
        ('37', 'Satoru Gojo', '五条悟', 'Jujutsu Kaisen', 'shonen_new', 'Throughout heaven and earth, I alone am the honored one. 🤞', '#8B5CF6', 'rgba(139, 92, 246, 0.5)', 'stars'),
        ('38', 'Ryomen Sukuna', '両面宿儺', 'Jujutsu Kaisen', 'shonen_new', 'Domain Expansion: Malevolent Shrine! ⛩️', '#DC2626', 'rgba(220, 38, 38, 0.5)', 'blood'),
        ('39', 'Tanjiro Kamado', '竈門炭治郎', 'Demon Slayer', 'shonen_new', 'Total Concentration: Water Breathing! 🌊', '#10B981', 'rgba(16, 185, 129, 0.5)', 'water'),
        ('40', 'Nezuko Kamado', '竈門禰豆子', 'Demon Slayer', 'shonen_new', 'Mmh mmh! Blood Demon Art: Exploding Blood! 🌸', '#F472B6', 'rgba(244, 114, 182, 0.5)', 'sakura'),
        ('41', 'Zenitsu Agatsuma', '我妻善逸', 'Demon Slayer', 'shonen_new', 'Thunder Breathing, First Form: Thunderclap and Flash! ⚡', '#FACC15', 'rgba(250, 204, 21, 0.5)', 'lightning'),
        ('42', 'Levi Ackerman', 'リヴァイ・アッカーマン', 'Attack on Titan', 'shonen_new', 'Dedicate your hearts! Clean your rooms first. ⚔️', '#059669', 'rgba(5, 150, 105, 0.5)', 'feathers'),
        ('43', 'Eren Yeager', 'エレン・イェーガー', 'Attack on Titan', 'shonen_new', 'If you win, you live. Tatakae! 🕊️', '#D97706', 'rgba(217, 119, 6, 0.5)', 'fire'),
        ('44', 'Sung Jin-Woo', 'ソン・ジヌ', 'Solo Leveling', 'shonen_new', 'Arise. 🌑', '#7C3AED', 'rgba(124, 58, 237, 0.5)', 'dark_aura'),
    ],
    5: [
        ('45', 'Hatsune Miku', '初音ミク', 'Vocaloid', 'waifu_game', 'Sing with all your heart! 🎵', '#06B6D4', 'rgba(6, 182, 212, 0.5)', 'notes'),
        ('46', 'Rem', 'レム', 'Re:Zero', 'waifu_game', 'From zero, let\'s start our story! 💙', '#38BDF8', 'rgba(56, 189, 248, 0.5)', 'ice'),
        ('47', 'Zero Two', 'ゼロツー', 'Darling in the Franxx', 'waifu_game', 'Will you be my Darling? 🍭', '#F43F5E', 'rgba(244, 63, 94, 0.5)', 'sakura'),
        ('48', 'Marin Kitagawa', '喜多川海夢', 'My Dress-Up Darling', 'waifu_game', 'Gojo-kun! Let\'s do cosplay together! ✨', '#FB7185', 'rgba(251, 113, 133, 0.5)', 'stars'),
        ('49', 'Frieren', 'フリーレン', 'Frieren: Beyond Journey\'s End', 'waifu_game', 'It\'s dark! It\'s scary! Mimic help! 🪄', '#E2E8F0', 'rgba(226, 232, 240, 0.5)', 'feathers'),
        ('50', 'Fern', 'フェルン', 'Frieren: Beyond Journey\'s End', 'waifu_game', 'Zoltraak. Frieren-sama, please wake up. 🦋', '#9333EA', 'rgba(147, 51, 234, 0.5)', 'stars'),
        ('51', 'Anya Forger', 'アーニャ・フォージャー', 'Spy x Family', 'waifu_game', 'Waku waku! Heh 𓁹‿𓁹 Peanuts! 🥜', '#F472B6', 'rgba(244, 114, 182, 0.5)', 'stars'),
        ('52', 'Yor Forger', 'ヨル・フォージャー', 'Spy x Family', 'waifu_game', 'May I have the honor of taking your life? 🌹', '#E11D48', 'rgba(225, 29, 72, 0.5)', 'blood'),
        ('53', 'Kurumi Tokisaki', '時崎狂三', 'Date A Live', 'waifu_game', 'Zafkiel! Our date has only just begun, Ara ara~ ⏳', '#DC2626', 'rgba(220, 38, 38, 0.5)', 'spider_lily'),
        ('54', 'Saber (Artoria)', 'アルトリア・ペンドラゴン', 'Fate/stay night', 'waifu_game', 'I ask of you: Are you my Master? Excalibur! ⚔️', '#2563EB', 'rgba(37, 99, 235, 0.5)', 'gold_dust'),
        ('55', '2B (NieR)', 'ヨルハ二号B型', 'NieR: Automata', 'waifu_game', 'Everything that lives is designed to end. Glory to mankind. 🤖', '#94A3B8', 'rgba(148, 163, 184, 0.5)', 'feathers'),
    ]
}

target_dir = os.path.join(os.path.dirname(__file__), 'src', 'components', 'pixel-companion', 'characters')

for batch_num, chars in batches.items():
    file_path = os.path.join(target_dir, f'batch{batch_num}.tsx')
    content = [
        "import React from 'react';",
        "import { PixelCharacter } from '../types';",
        "import { CharacterImage } from '../pixel-helper';",
        "",
        f"export const BATCH_{batch_num}_CHARACTERS: PixelCharacter[] = [",
    ]
    for cid, name, jp, origin, cat, quote, accent, glow, particle in chars:
        safe_name = name.replace("'", "\\'")
        safe_quote = quote.replace("'", "\\'")
        safe_origin = origin.replace("'", "\\'")
        content.extend([
            f"  // {cid}. {name}",
            "  {",
            f"    id: '{cid}',",
            f"    name: '{safe_name}',",
            f"    jpName: '{jp}',",
            f"    origin: '{safe_origin}',",
            f"    category: '{cat}',",
            f"    quote: '{safe_quote}',",
            f"    accentColor: '{accent}',",
            f"    glowColor: '{glow}',",
            f"    particleType: '{particle}',",
            "    rarity: 5,",
            f"    imageUrl: '/characters/{cid}.png',",
            "    renderSprite: ({ size = 64, className = '' }) => (",
            f"      <CharacterImage",
            f"        src=\"/characters/{cid}.png\"",
            f"        alt=\"{safe_name}\"",
            "        size={size}",
            "        className={className}",
            f"        glowColor=\"{glow}\"",
            "      />",
            "    ),",
            "  },",
        ])
    content.append("];\n")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))
    print(f'Wrote batch{batch_num}.tsx')
