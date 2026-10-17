import os
import fitz
from PIL import Image

SVG_TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="1" />
      <stop offset="70%" stop-color="#090d16" stop-opacity="1" />
      <stop offset="100%" stop-color="#020617" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="50%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>
    <linearGradient id="toriiRedDark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#991B1B" />
      <stop offset="50%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#7F1D1D" />
    </linearGradient>
    <linearGradient id="toriiRedLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="100%" stop-color="#B91C1C" />
    </linearGradient>
    <linearGradient id="toriiBlackRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="toriiGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
  </defs>

  <!-- Rounded App Icon Background with Vermilion Border -->
  <rect x="4" y="4" width="192" height="192" rx="42" fill="url(#bgGlow)" stroke="url(#borderGrad)" stroke-width="4" />

  <!-- Torii Gate Architectural Elements (centered: scale 0.88, offset slightly) -->
  <g transform="translate(12, 16) scale(0.88)">
    <!-- Ambient Glow behind roof -->
    <path d="M 12 36 Q 100 24 188 36 L 180 46 Q 100 36 20 46 Z" fill="#EF4444" opacity="0.4" />

    <!-- KASAGI (Curved Top Roof Beam) with Black/Gold Ridge -->
    <path d="M 10 32 Q 100 18 190 32 L 192 38 Q 100 24 8 38 Z" fill="url(#toriiBlackRoof)" />
    <path d="M 8 38 Q 100 24 192 38 L 188 50 Q 100 38 12 50 Z" fill="url(#toriiRedDark)" />

    <!-- SHIMAKI (Second Beam directly under Kasagi) -->
    <path d="M 22 50 Q 100 42 178 50 L 176 58 Q 100 50 24 58 Z" fill="url(#toriiRedLight)" />

    <!-- NUKI (Horizontal Crossbar penetrating both pillars) -->
    <path d="M 16 82 L 184 82 L 184 94 L 16 94 Z" fill="url(#toriiRedDark)" />
    <!-- Nuki protruding tips black caps -->
    <rect x="14" y="81" width="6" height="14" rx="1" fill="#0F172A" />
    <rect x="180" y="81" width="6" height="14" rx="1" fill="#0F172A" />

    <!-- GAKUZUKA & GAKU (Center Tablet / Plaque) -->
    <rect x="88" y="56" width="24" height="28" rx="2" fill="#0F172A" stroke="url(#toriiGold)" stroke-width="1.5" />
    <text x="100" y="74" text-anchor="middle" fill="#FEF08A" font-size="9" font-weight="900" font-family="serif" letter-spacing="1">合格</text>

    <!-- SHIMENAWA (Sacred Straw Rope & Zigzag Paper Shide) -->
    <path d="M 45 84 Q 100 98 155 84" stroke="#D97706" stroke-width="3.5" stroke-linecap="round" fill="none" stroke-dasharray="4 2" />
    <!-- Shide 1 -->
    <polygon points="68,91 74,91 71,98 76,98 72,106 67,100 71,100" fill="#FFFFFF" opacity="0.95" />
    <!-- Shide 2 (Center) -->
    <polygon points="97,94 103,94 100,102 106,102 101,111 96,104 100,104" fill="#FFFFFF" opacity="0.95" />
    <!-- Shide 3 -->
    <polygon points="126,91 132,91 129,98 134,98 130,106 125,100 129,100" fill="#FFFFFF" opacity="0.95" />

    <!-- HASHIRA (Two Main Slanted Pillars) -->
    <polygon points="42,50 56,50 50,158 34,158" fill="url(#toriiRedDark)" />
    <polygon points="144,50 158,50 166,158 150,158" fill="url(#toriiRedDark)" />

    <!-- Pillar Wood Highlights -->
    <line x1="48" y1="50" x2="41" y2="158" stroke="#F87171" stroke-width="1.2" opacity="0.4" />
    <line x1="152" y1="50" x2="159" y2="158" stroke="#F87171" stroke-width="1.2" opacity="0.4" />

    <!-- KAMEBARA / DAIZA (Black/Stone Base Pedestals) -->
    <path d="M 30 156 L 54 156 L 56 166 L 28 166 Z" fill="#0F172A" />
    <rect x="26" y="165" width="32" height="4" rx="1" fill="#334155" />
    <path d="M 146 156 L 170 156 L 172 166 L 144 166 Z" fill="#0F172A" />
    <rect x="142" y="165" width="32" height="4" rx="1" fill="#334155" />
  </g>
</svg>
"""

# Plain SVG for transparent favicon and vector displays
SVG_TRANSPARENT = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170">
  <defs>
    <linearGradient id="toriiRedDark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#991B1B" />
      <stop offset="50%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#7F1D1D" />
    </linearGradient>
    <linearGradient id="toriiRedLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="100%" stop-color="#B91C1C" />
    </linearGradient>
    <linearGradient id="toriiBlackRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="toriiGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
  </defs>

  <!-- Ambient Glow -->
  <path d="M 12 36 Q 100 24 188 36 L 180 46 Q 100 36 20 46 Z" fill="#EF4444" opacity="0.3" />

  <!-- KASAGI (Curved Top Roof Beam) with Black/Gold Ridge -->
  <path d="M 10 32 Q 100 18 190 32 L 192 38 Q 100 24 8 38 Z" fill="url(#toriiBlackRoof)" />
  <path d="M 8 38 Q 100 24 192 38 L 188 50 Q 100 38 12 50 Z" fill="url(#toriiRedDark)" />

  <!-- SHIMAKI (Second Beam directly under Kasagi) -->
  <path d="M 22 50 Q 100 42 178 50 L 176 58 Q 100 50 24 58 Z" fill="url(#toriiRedLight)" />

  <!-- NUKI (Horizontal Crossbar penetrating both pillars) -->
  <path d="M 16 82 L 184 82 L 184 94 L 16 94 Z" fill="url(#toriiRedDark)" />
  <!-- Nuki protruding tips black caps -->
  <rect x="14" y="81" width="6" height="14" rx="1" fill="#0F172A" />
  <rect x="180" y="81" width="6" height="14" rx="1" fill="#0F172A" />

  <!-- GAKUZUKA & GAKU (Center Tablet / Plaque) -->
  <rect x="88" y="56" width="24" height="28" rx="2" fill="#0F172A" stroke="url(#toriiGold)" stroke-width="1.5" />
  <text x="100" y="74" text-anchor="middle" fill="#FEF08A" font-size="8" font-weight="900" font-family="serif" letter-spacing="1">合格</text>

  <!-- SHIMENAWA (Sacred Straw Rope & Zigzag Paper Shide) -->
  <path d="M 45 84 Q 100 98 155 84" stroke="#D97706" stroke-width="3.5" stroke-linecap="round" fill="none" stroke-dasharray="4 2" />
  <!-- Shide 1 -->
  <polygon points="68,91 74,91 71,98 76,98 72,106 67,100 71,100" fill="#FFFFFF" opacity="0.95" />
  <!-- Shide 2 (Center) -->
  <polygon points="97,94 103,94 100,102 106,102 101,111 96,104 100,104" fill="#FFFFFF" opacity="0.95" />
  <!-- Shide 3 -->
  <polygon points="126,91 132,91 129,98 134,98 130,106 125,100 129,100" fill="#FFFFFF" opacity="0.95" />

  <!-- HASHIRA (Two Main Slanted Pillars) -->
  <polygon points="42,50 56,50 50,158 34,158" fill="url(#toriiRedDark)" />
  <polygon points="144,50 158,50 166,158 150,158" fill="url(#toriiRedDark)" />

  <!-- Pillar Wood Highlights -->
  <line x1="48" y1="50" x2="41" y2="158" stroke="#F87171" stroke-width="1.2" opacity="0.4" />
  <line x1="152" y1="50" x2="159" y2="158" stroke="#F87171" stroke-width="1.2" opacity="0.4" />

  <!-- KAMEBARA / DAIZA (Black/Stone Base Pedestals) -->
  <path d="M 30 156 L 54 156 L 56 166 L 28 166 Z" fill="#0F172A" />
  <rect x="26" y="165" width="32" height="4" rx="1" fill="#334155" />
  <path d="M 146 156 L 170 156 L 172 166 L 144 166 Z" fill="#0F172A" />
  <rect x="142" y="165" width="32" height="4" rx="1" fill="#334155" />
</svg>
"""

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(root_dir, "public")
    app_dir = os.path.join(root_dir, "src", "app")

    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)

    # 1. Save SVG files
    svg_badge_path = os.path.join(public_dir, "torii-icon.svg")
    with open(svg_badge_path, "w", encoding="utf-8") as f:
        f.write(SVG_TEMPLATE)
    print("Saved:", svg_badge_path)

    app_icon_svg = os.path.join(app_dir, "icon.svg")
    with open(app_icon_svg, "w", encoding="utf-8") as f:
        f.write(SVG_TEMPLATE)
    print("Saved:", app_icon_svg)

    # 2. Render high-res PNG using PyMuPDF
    doc = fitz.open(stream=SVG_TEMPLATE.encode("utf-8"), filetype="svg")
    # Render at 4x scale for super crisp 512x512
    matrix = fitz.Matrix(512 / 200, 512 / 200)
    pix = doc[0].get_pixmap(matrix=matrix, alpha=True)
    
    avatar_logo_path = os.path.join(public_dir, "avatar-logo.png")
    pix.save(avatar_logo_path)
    print("Saved high-res Torii avatar:", avatar_logo_path)

    # 3. Generate Favicon PNGs & multi-resolution ICO using PIL
    base_img = Image.open(avatar_logo_path).convert("RGBA")
    
    # 16x16, 32x32, 48x48, 180x180 (Apple touch icon)
    img_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)
    img_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    img_48 = base_img.resize((48, 48), Image.Resampling.LANCZOS)
    img_180 = base_img.resize((180, 180), Image.Resampling.LANCZOS)

    fav_16_path = os.path.join(public_dir, "favicon-16x16.png")
    fav_32_path = os.path.join(public_dir, "favicon-32x32.png")
    apple_path = os.path.join(public_dir, "apple-touch-icon.png")

    img_16.save(fav_16_path, "PNG")
    img_32.save(fav_32_path, "PNG")
    img_180.save(apple_path, "PNG")
    print("Saved PNG favicons: 16x16, 32x32, 180x180")

    # Save ICO containing multiple sizes: 16, 32, 48
    ico_path_public = os.path.join(public_dir, "favicon.ico")
    ico_path_app = os.path.join(app_dir, "favicon.ico")
    base_img.save(ico_path_public, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    base_img.save(ico_path_app, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved multi-res favicon.ico to public/ and src/app/")

if __name__ == "__main__":
    main()
