import urllib.request
import urllib.parse
import json
import os
import io
import time
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'characters')
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_wikia_image_url(wiki, title, file_candidates=None):
    base_domain = f'https://{wiki}.fandom.com'
    referer = f'{base_domain}/wiki/{title}'
    
    # 1. Try file candidates first
    if file_candidates:
        titles_param = '|'.join([f'File:{f}' for f in file_candidates])
        url = f'{base_domain}/api.php?action=query&titles={urllib.parse.quote(titles_param)}&prop=imageinfo&iiprop=url&format=json'
        req = urllib.request.Request(url, headers=HEADERS)
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, p in pages.items():
                    if 'imageinfo' in p and p['imageinfo']:
                        img_url = p['imageinfo'][0]['url']
                        if img_url:
                            return img_url, referer
        except Exception as e:
            pass

    # 2. Try pageimages thumbnail
    url = f'{base_domain}/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&pithumbsize=600&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if 'thumbnail' in p:
                    return p['thumbnail']['source'], referer
    except Exception as e:
        pass

    # 3. Try images list on page
    url = f'{base_domain}/api.php?action=query&titles={urllib.parse.quote(title)}&prop=images&imlimit=20&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                images = p.get('images', [])
                for img_info in images:
                    img_title = img_info.get('title', '')
                    if any(ext in img_title.lower() for ext in ['.png', '.jpg', '.webp']) and not any(skip in img_title.lower() for skip in ['icon', 'site', 'logo', 'badge']):
                        # fetch its url
                        info_url = f'{base_domain}/api.php?action=query&titles={urllib.parse.quote(img_title)}&prop=imageinfo&iiprop=url&format=json'
                        r = urllib.request.Request(info_url, headers=HEADERS)
                        with urllib.request.urlopen(r, timeout=10) as r_resp:
                            r_data = json.loads(r_resp.read().decode('utf-8'))
                            for _, rp in r_data.get('query', {}).get('pages', {}).items():
                                if 'imageinfo' in rp and rp['imageinfo']:
                                    return rp['imageinfo'][0]['url'], referer
    except Exception as e:
        pass

    return None, None

def download_and_save(img_url, referer, out_path, max_dim=512):
    headers = dict(HEADERS)
    if referer:
        headers['Referer'] = referer

    req = urllib.request.Request(img_url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as resp:
        content = resp.read()
        img = Image.open(io.BytesIO(content))

        # Ensure RGBA for transparent display
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Resize smoothly with high quality Lanczos filter
        w, h = img.size
        if w > max_dim or h > max_dim:
            ratio = min(max_dim / w, max_dim / h)
            new_size = (max(1, int(w * ratio)), max(1, int(h * ratio)))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

        img.save(out_path, format='PNG', optimize=True)
        return img.size

CHARACTERS = [
    # BATCH 1: Genshin & Honkai (1-11)
    ('01', 'Raiden Shogun', 'genshin-impact', 'Raiden_Shogun', ['Raiden_Shogun_Wish.png', 'Character_Raiden_Shogun_Wish.png', 'Raiden_Shogun_Icon.png']),
    ('02', 'Hu Tao', 'genshin-impact', 'Hu_Tao', ['Hu_Tao_Wish.png', 'Character_Hu_Tao_Wish.png', 'Hu_Tao_Icon.png']),
    ('03', 'Sandrone', 'genshin-impact', 'Sandrone', ['Sandrone_Icon.png', 'Character_Sandrone_Concept_Art.png', 'Sandrone.png']),
    ('04', 'Furina', 'genshin-impact', 'Furina', ['Furina_Wish.png', 'Character_Furina_Wish.png', 'Furina_Icon.png']),
    ('05', 'Nahida', 'genshin-impact', 'Nahida', ['Nahida_Wish.png', 'Character_Nahida_Wish.png', 'Nahida_Icon.png']),
    ('06', 'Yae Miko', 'genshin-impact', 'Yae_Miko', ['Yae_Miko_Wish.png', 'Character_Yae_Miko_Wish.png', 'Yae_Miko_Icon.png']),
    ('07', 'Zhongli', 'genshin-impact', 'Zhongli', ['Zhongli_Wish.png', 'Character_Zhongli_Wish.png', 'Zhongli_Icon.png']),
    ('08', 'Kamisato Ayaka', 'genshin-impact', 'Kamisato_Ayaka', ['Kamisato_Ayaka_Wish.png', 'Character_Kamisato_Ayaka_Wish.png', 'Kamisato_Ayaka_Icon.png']),
    ('09', 'Keqing', 'genshin-impact', 'Keqing', ['Keqing_Wish.png', 'Character_Keqing_Wish.png', 'Keqing_Icon.png']),
    ('10', 'Ganyu', 'genshin-impact', 'Ganyu', ['Ganyu_Wish.png', 'Character_Ganyu_Wish.png', 'Ganyu_Icon.png']),
    ('11', 'Arlecchino', 'genshin-impact', 'Arlecchino', ['Arlecchino_Wish.png', 'Character_Arlecchino_Wish.png', 'Arlecchino_Icon.png']),

    # BATCH 2: Genshin & Honkai (12-22)
    ('12', 'Navia', 'genshin-impact', 'Navia', ['Navia_Wish.png', 'Character_Navia_Wish.png', 'Navia_Icon.png']),
    ('13', 'Neuvillette', 'genshin-impact', 'Neuvillette', ['Neuvillette_Wish.png', 'Character_Neuvillette_Wish.png', 'Neuvillette_Icon.png']),
    ('14', 'Xiao', 'genshin-impact', 'Xiao', ['Xiao_Wish.png', 'Character_Xiao_Wish.png', 'Xiao_Icon.png']),
    ('15', 'Kaedehara Kazuha', 'genshin-impact', 'Kaedehara_Kazuha', ['Kaedehara_Kazuha_Wish.png', 'Character_Kaedehara_Kazuha_Wish.png', 'Kaedehara_Kazuha_Icon.png']),
    ('16', 'Venti', 'genshin-impact', 'Venti', ['Venti_Wish.png', 'Character_Venti_Wish.png', 'Venti_Icon.png']),
    ('17', 'Shenhe', 'genshin-impact', 'Shenhe', ['Shenhe_Wish.png', 'Character_Shenhe_Wish.png', 'Shenhe_Icon.png']),
    ('18', 'Nilou', 'genshin-impact', 'Nilou', ['Nilou_Wish.png', 'Character_Nilou_Wish.png', 'Nilou_Icon.png']),
    ('19', 'Kafka', 'houkai-star-rail', 'Kafka', ['Character_Kafka_Splash_Art.png', 'Character_Kafka_Icon.png', 'Kafka.png']),
    ('20', 'Firefly', 'houkai-star-rail', 'Firefly', ['Character_Firefly_Splash_Art.png', 'Character_Firefly_Icon.png', 'Firefly.png']),
    ('21', 'Acheron', 'houkai-star-rail', 'Acheron', ['Character_Acheron_Splash_Art.png', 'Character_Acheron_Icon.png', 'Acheron.png']),
    ('22', 'Sparkle', 'houkai-star-rail', 'Sparkle', ['Character_Sparkle_Splash_Art.png', 'Character_Sparkle_Icon.png', 'Sparkle.png']),

    # BATCH 3: Shonen Jump Classics (23-33)
    ('23', 'Monkey D. Luffy', 'onepiece', 'Monkey_D._Luffy', ['Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png', 'Luffy.png']),
    ('24', 'Roronoa Zoro', 'onepiece', 'Roronoa_Zoro', ['Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png', 'Zoro.png']),
    ('25', 'Sanji', 'onepiece', 'Sanji', ['Sanji_Anime_Post_Timeskip_Infobox.png', 'Sanji.png']),
    ('26', 'Naruto Uzumaki', 'naruto', 'Naruto_Uzumaki', ['Naruto_Part_II.png', 'Naruto_Part_I.png', 'Naruto_Uzumaki.png']),
    ('27', 'Sasuke Uchiha', 'naruto', 'Sasuke_Uchiha', ['Sasuke_Part_II.png', 'Sasuke_Part_I.png', 'Sasuke_Uchiha.png']),
    ('28', 'Kakashi Hatake', 'naruto', 'Kakashi_Hatake', ['Kakashi_Hatake.png', 'Kakashi.png']),
    ('29', 'Son Goku', 'dragonball', 'Goku', ['Goku_anime_profile.png', 'Son_Goku.png', 'Goku.png']),
    ('30', 'Vegeta', 'dragonball', 'Vegeta', ['Vegeta_anime_profile.png', 'Vegeta.png']),
    ('31', 'Ichigo Kurosaki', 'bleach', 'Ichigo_Kurosaki', ['Ichigo_Kurosaki.png', 'Ichigo.png']),
    ('32', 'Gon Freecss', 'hunterxhunter', 'Gon_Freecss', ['Gon_Freecss_2011.png', 'Gon_Freecss.png']),
    ('33', 'Killua Zoldyck', 'hunterxhunter', 'Killua_Zoldyck', ['Killua_Zoldyck_2011.png', 'Killua_Zoldyck.png']),

    # BATCH 4: Shonen New Gen & Dark Fantasy (34-44)
    ('34', 'Chainsaw Man', 'chainsaw-man', 'Denji', ['Chainsaw_Man_Anime.png', 'Denji_Anime.png', 'Chainsaw_Man.png']),
    ('35', 'Power', 'chainsaw-man', 'Power', ['Power_Anime.png', 'Power.png']),
    ('36', 'Makima', 'chainsaw-man', 'Makima', ['Makima_Anime.png', 'Makima.png']),
    ('37', 'Satoru Gojo', 'jujutsu-kaisen', 'Satoru_Gojo', ['Satoru_Gojo_%28Anime_2%29.png', 'Satoru_Gojo.png']),
    ('38', 'Ryomen Sukuna', 'jujutsu-kaisen', 'Sukuna', ['Ryomen_Sukuna_Anime.png', 'Sukuna.png']),
    ('39', 'Tanjiro Kamado', 'kimetsu-no-yaiba', 'Tanjiro_Kamado', ['Tanjiro_anime_right_face.png', 'Tanjiro_Kamado.png']),
    ('40', 'Nezuko Kamado', 'kimetsu-no-yaiba', 'Nezuko_Kamado', ['Nezuko_anime_right_face.png', 'Nezuko_Kamado.png']),
    ('41', 'Zenitsu Agatsuma', 'kimetsu-no-yaiba', 'Zenitsu_Agatsuma', ['Zenitsu_anime_right_face.png', 'Zenitsu_Agatsuma.png']),
    ('42', 'Levi Ackerman', 'attackontitan', 'Levi_Ackerman', ['Levi_Ackerman_character_image.png', 'Levi.png']),
    ('43', 'Eren Yeager', 'attackontitan', 'Eren_Yeager', ['Eren_Yeager_character_image.png', 'Eren.png']),
    ('44', 'Sung Jin-Woo', 'solo-leveling', 'Sung_Jinwoo', ['Sung_Jin-Woo_Manhwa.png', 'Sung_Jinwoo.png', 'Jinwoo.png']),

    # BATCH 5: Waifu, Vocaloid & Game Icons (45-55)
    ('45', 'Hatsune Miku', 'vocaloid', 'Hatsune_Miku', ['Hatsune_Miku_V4X_bundle_transparent.png', 'Hatsune_Miku.png', 'Miku.png']),
    ('46', 'Rem', 'rezero', 'Rem', ['Rem_Anime.png', 'Rem.png']),
    ('47', 'Zero Two', 'darling-in-the-franxx', 'Zero_Two', ['Zero_Two_Anime.png', 'Zero_Two.png']),
    ('48', 'Marin Kitagawa', 'sono-bisque-doll-wa-koi-wo-suru', 'Marin_Kitagawa', ['Marin_Kitagawa_Anime.png', 'Marin_Kitagawa.png']),
    ('49', 'Frieren', 'frieren', 'Frieren', ['Frieren_anime_profile.png', 'Frieren.png']),
    ('50', 'Fern', 'frieren', 'Fern', ['Fern_anime_profile.png', 'Fern.png']),
    ('51', 'Anya Forger', 'spy-x-family9171', 'Anya_Forger', ['Anya_Forger_Anime.png', 'Anya_Forger.png']),
    ('52', 'Yor Forger', 'spy-x-family9171', 'Yor_Forger', ['Yor_Forger_Anime.png', 'Yor_Forger.png']),
    ('53', 'Kurumi Tokisaki', 'date-a-live', 'Kurumi_Tokisaki', ['Kurumi_Tokisaki.png', 'Kurumi.png']),
    ('54', 'Saber', 'typemoon', 'Saber_(Fate/stay_night)', ['Saber_FGO.png', 'Artoria_Pendragon.png', 'Saber.png']),
    ('55', '2B', 'nier', 'YoRHa_No.2_Type_B', ['2B.png', 'YoRHa_No.2_Type_B.png']),
]

def main():
    success_count = 0
    failed = []

    print(f'Starting high-resolution character image download for all 55 characters...')
    for char_id, name, wiki, title, files in CHARACTERS:
        out_file = os.path.join(OUTPUT_DIR, f'{char_id}.png')
        if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
            print(f'[{char_id}/55] {name} already exists ({os.path.getsize(out_file)} bytes). Skipping.')
            success_count += 1
            continue

        print(f'[{char_id}/55] Downloading {name} ({wiki}/{title})...')
        img_url, referer = fetch_wikia_image_url(wiki, title, files)
        
        # If spy-x-family9171 fails, try spy-x-family
        if not img_url and wiki == 'spy-x-family9171':
            img_url, referer = fetch_wikia_image_url('spy-x-family', title, files)
            
        if img_url:
            try:
                size = download_and_save(img_url, referer, out_file)
                print(f'  [OK] Saved {char_id}.png {size} ({os.path.getsize(out_file)} bytes)')
                success_count += 1
            except Exception as e:
                print(f'  [FAIL] Failed to download {name} from {img_url}: {e}')
                failed.append((char_id, name, str(e)))
        else:
            print(f'  [FAIL] No image URL found for {name}')
            failed.append((char_id, name, 'URL not found'))
            
        time.sleep(0.3)

    print(f'\nFinished download! Success: {success_count}/55. Failed: {len(failed)}')
    if failed:
        print('Failed list:', failed)

if __name__ == '__main__':
    main()
