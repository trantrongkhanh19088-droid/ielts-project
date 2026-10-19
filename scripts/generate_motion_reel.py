import os
import sys
import time
import math
import subprocess
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont
import scipy.io.wavfile as wav
import imageio_ffmpeg

# ==============================================================================
# CONFIGURATION & CONSTANTS
# ==============================================================================
WIDTH = 1920
HEIGHT = 1080
FPS = 60
DURATION = 15.0
TOTAL_FRAMES = int(FPS * DURATION)  # 900 frames
SAMPLE_RATE = 44100

OUTPUT_DIR = os.path.join(os.getcwd(), 'public')
os.makedirs(OUTPUT_DIR, exist_ok=True)
VIDEO_OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'showreel_15s.mp4')
AUDIO_TEMP_PATH = os.path.join(os.getcwd(), 'scripts', 'temp_soundtrack.wav')

# Load fonts
FONT_DIR = r'C:\Windows\Fonts'
def get_font(name, size):
    path = os.path.join(FONT_DIR, name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

font_title_huge = get_font('bahnschrift.ttf', 110)
font_title_large = get_font('bahnschrift.ttf', 72)
font_title_medium = get_font('bahnschrift.ttf', 44)
font_mono_bold = get_font('consolab.ttf', 24)
font_mono_small = get_font('consolab.ttf', 16)
font_serif = get_font('georgia.ttf', 32)

# ==============================================================================
# 1. PROCEDURAL CINEMATIC AUDIO SYNTHESIZER
# ==============================================================================
def generate_soundtrack():
    print("[1/3] Synthesizing 15-second cinematic sci-fi soundtrack...")
    total_samples = int(SAMPLE_RATE * DURATION)
    t = np.linspace(0, DURATION, total_samples, endpoint=False)
    
    left = np.zeros(total_samples, dtype=np.float32)
    right = np.zeros(total_samples, dtype=np.float32)
    
    # Helper: add kick drum / sub-boom
    def add_kick(start_t, freq_start=150.0, freq_end=38.0, decay=0.45, amp=0.8):
        idx_start = int(start_t * SAMPLE_RATE)
        dur_samples = int(decay * 3.0 * SAMPLE_RATE)
        if idx_start >= total_samples:
            return
        dur_samples = min(dur_samples, total_samples - idx_start)
        tk = np.linspace(0, dur_samples / SAMPLE_RATE, dur_samples, endpoint=False)
        # exponential pitch envelope
        f = freq_end + (freq_start - freq_end) * np.exp(-18.0 * tk)
        phase = 2.0 * np.pi * np.cumsum(f) / SAMPLE_RATE
        env = np.exp(-tk / decay)
        kick = np.sin(phase) * env * amp
        left[idx_start:idx_start+dur_samples] += kick
        right[idx_start:idx_start+dur_samples] += kick

    # Helper: add white noise hi-hat / cymbal
    def add_hihat(start_t, decay=0.08, amp=0.25):
        idx_start = int(start_t * SAMPLE_RATE)
        dur_samples = int(decay * 4.0 * SAMPLE_RATE)
        if idx_start >= total_samples:
            return
        dur_samples = min(dur_samples, total_samples - idx_start)
        noise = np.random.uniform(-1, 1, dur_samples).astype(np.float32)
        # simple high pass via difference
        noise[1:] = noise[1:] - 0.85 * noise[:-1]
        env = np.exp(-np.linspace(0, dur_samples / SAMPLE_RATE, dur_samples) / decay)
        hat = noise * env * amp
        left[idx_start:idx_start+dur_samples] += hat * 0.9
        right[idx_start:idx_start+dur_samples] += hat * 1.1

    # Helper: add synth bass note
    def add_bass_note(start_t, freq, dur=0.35, amp=0.35, pan=0.0):
        idx_start = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        if idx_start >= total_samples:
            return
        dur_samples = min(dur_samples, total_samples - idx_start)
        tb = np.linspace(0, dur_samples / SAMPLE_RATE, dur_samples, endpoint=False)
        # Sawtooth wave + sub sine
        saw = 2.0 * (tb * freq - np.floor(0.5 + tb * freq))
        sine = np.sin(2.0 * np.pi * (freq * 0.5) * tb)
        env = (1.0 - np.exp(-tb * 50.0)) * np.exp(-tb * 3.5)
        sound = (saw * 0.6 + sine * 0.4) * env * amp
        left[idx_start:idx_start+dur_samples] += sound * (1.0 - pan)
        right[idx_start:idx_start+dur_samples] += sound * (1.0 + pan)

    # Helper: add noise riser
    def add_riser(start_t, end_t, amp=0.4):
        idx_s = int(start_t * SAMPLE_RATE)
        idx_e = int(end_t * SAMPLE_RATE)
        dur = idx_e - idx_s
        if dur <= 0: return
        dur = min(dur, total_samples - idx_s)
        tr = np.linspace(0, 1.0, dur)
        noise = np.random.uniform(-1, 1, dur).astype(np.float32)
        env = (tr ** 2.5) * amp
        # frequency sweep
        sweep = np.sin(2.0 * np.pi * (100.0 + 2200.0 * (tr ** 3.0)) * np.linspace(0, dur/SAMPLE_RATE, dur))
        combined = (noise * 0.7 + sweep * 0.3) * env
        left[idx_s:idx_s+dur] += combined * (1.0 - 0.3 * np.sin(tr * np.pi * 6))
        right[idx_s:idx_s+dur] += combined * (1.0 + 0.3 * np.sin(tr * np.pi * 6))

    # --- 1. Sub Drops on Scene Transitions ---
    add_kick(0.2, freq_start=180, freq_end=35, decay=0.8, amp=0.9)
    add_kick(3.5, freq_start=190, freq_end=40, decay=0.7, amp=0.95)
    add_kick(7.5, freq_start=220, freq_end=38, decay=0.6, amp=1.0)
    add_kick(11.5, freq_start=160, freq_end=32, decay=1.4, amp=1.1)

    # --- 2. Risers before drops ---
    add_riser(2.2, 3.5, amp=0.35)
    add_riser(6.2, 7.5, amp=0.45)
    add_riser(10.0, 11.35, amp=0.55)

    # --- 3. Scene 2 Techno Cyber Beat (3.5s to 7.5s) ---
    d_minor_notes = [73.42, 87.31, 98.0, 110.0, 130.81] # D2, F2, G2, A2, C3
    for beat_idx, bt in enumerate(np.arange(3.5, 7.5, 0.25)):
        if beat_idx % 2 == 0:
            add_kick(bt, freq_start=130, freq_end=48, decay=0.25, amp=0.7)
        add_hihat(bt + 0.125, decay=0.06, amp=0.2)
        note = d_minor_notes[beat_idx % len(d_minor_notes)]
        add_bass_note(bt, note, dur=0.22, amp=0.3, pan=0.2 if beat_idx%2 else -0.2)

    # --- 4. Scene 3 Hyperdrive Rolling Beat (7.5s to 11.2s) ---
    for beat_idx, bt in enumerate(np.arange(7.5, 11.2, 0.125)): # 16th notes
        if beat_idx % 4 == 0:
            add_kick(bt, freq_start=160, freq_end=42, decay=0.22, amp=0.85)
        add_hihat(bt, decay=0.04, amp=0.25)
        fast_note = d_minor_notes[(beat_idx * 2) % len(d_minor_notes)] * 1.5
        add_bass_note(bt, fast_note, dur=0.1, amp=0.28, pan=0.3 * np.sin(beat_idx))

    # --- 5. Scene 4 Celestial Finale (11.5s to 15.0s) ---
    # Majestic D Major / Dsus2 celestial shimmer chord: D3 (146.8), A3 (220.0), E4 (329.6), F#4 (369.9), A4 (440.0)
    chord_freqs = [146.83, 220.0, 329.63, 369.99, 440.0, 587.33]
    t_finale = t[t >= 11.5] - 11.5
    finale_len = len(t_finale)
    if finale_len > 0:
        pad_sound = np.zeros(finale_len, dtype=np.float32)
        for cf in chord_freqs:
            # multiple detuned oscillators for rich lush cinema sound
            osc1 = np.sin(2.0 * np.pi * cf * t_finale)
            osc2 = np.sin(2.0 * np.pi * (cf * 1.003) * t_finale)
            osc3 = np.sin(2.0 * np.pi * (cf * 0.997) * t_finale)
            pad_sound += (osc1 + osc2 * 0.7 + osc3 * 0.7) * (1.0 / len(chord_freqs))
        
        # Smooth attack, long majestic decay
        env_finale = np.minimum(t_finale / 0.4, 1.0) * np.exp(-t_finale / 3.0)
        left[-finale_len:] += pad_sound * env_finale * 0.55
        right[-finale_len:] += pad_sound * env_finale * 0.55

    # --- 6. Ambient Drone Bed & Filtered Harmonic Hum ---
    drone = np.sin(2.0 * np.pi * 55.0 * t) * 0.15 + np.sin(2.0 * np.pi * 110.0 * t) * 0.08
    # stereo chorus
    left += drone * (1.0 + 0.15 * np.sin(t * 1.5))
    right += drone * (1.0 - 0.15 * np.sin(t * 1.5))

    # Master Limiter / Soft-clipper with Headroom
    audio_stereo = np.column_stack((left, right))
    audio_stereo = np.tanh(audio_stereo * 1.4) * 0.92
    audio_int16 = (audio_stereo * 32767.0).astype(np.int16)
    
    wav.write(AUDIO_TEMP_PATH, SAMPLE_RATE, audio_int16)
    print(f"Soundtrack rendered successfully: {AUDIO_TEMP_PATH}")

# ==============================================================================
# 2. 3D MATH & GEOMETRIC TRANSFORMATION ENGINE
# ==============================================================================
def rotate_3d(points, rx, ry, rz):
    """Rotate an array of 3D points [N, 3] by Euler angles in radians."""
    cx, sx = math.cos(rx), math.sin(rx)
    cy, sy = math.cos(ry), math.sin(ry)
    cz, sz = math.cos(rz), math.sin(rz)
    
    Rx = np.array([[1, 0, 0], [0, cx, -sx], [0, sx, cx]], dtype=np.float32)
    Ry = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]], dtype=np.float32)
    Rz = np.array([[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]], dtype=np.float32)
    
    R = Rz @ Ry @ Rx
    return points @ R.T

def project_3d(points_3d, fov=850.0, cam_z=600.0, center=(960, 540)):
    """Perspective projection from 3D to 2D screen coordinates."""
    z = points_3d[:, 2] + cam_z
    z = np.maximum(z, 1.0) # avoid div by zero
    scale = fov / z
    x2d = points_3d[:, 0] * scale + center[0]
    y2d = points_3d[:, 1] * scale + center[1]
    return np.column_stack((x2d, y2d, z))

# Geodesic Icosahedron geometry
phi = (1.0 + math.sqrt(5.0)) / 2.0
ico_vertices = np.array([
    [-1,  phi,  0], [ 1,  phi,  0], [-1, -phi,  0], [ 1, -phi,  0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi,  0, -1], [ phi,  0,  1], [-phi,  0, -1], [-phi,  0,  1]
], dtype=np.float32)
ico_vertices = ico_vertices / np.linalg.norm(ico_vertices[0]) # normalize

# Find edges (pairs of vertices with distance ~ 1.05)
ico_edges = []
for i in range(len(ico_vertices)):
    for j in range(i + 1, len(ico_vertices)):
        dist = np.linalg.norm(ico_vertices[i] - ico_vertices[j])
        if 0.95 < dist < 1.15:
            ico_edges.append((i, j))

# 3D Torii Gate Geometry
torii_beams = [
    # Top curved beam (Kasagi)
    [(-280, -220, 0), (280, -220, 0)],
    [(-300, -235, 10), (300, -235, 10)],
    [(-280, -220, 0), (-300, -235, 10)],
    [(280, -220, 0), (300, -235, 10)],
    # Lower horizontal beam (Nuki)
    [(-240, -150, 0), (240, -150, 0)],
    [(-240, -165, 5), (240, -165, 5)],
    # Left Pillar
    [(-170, -220, 0), (-175, 230, 0)],
    [(-160, -220, 10), (-165, 230, 10)],
    [(-175, 230, 0), (-165, 230, 10)],
    # Right Pillar
    [(170, -220, 0), (175, 230, 0)],
    [(160, -220, 10), (165, 230, 10)],
    [(175, 230, 0), (165, 230, 10)],
    # Center tablet strut (Gakuzuka)
    [(-25, -220, 0), (-25, -150, 0)],
    [(25, -220, 0), (25, -150, 0)],
    [(-25, -185, 0), (25, -185, 0)],
]

# Starfield particles for Scene 3
NUM_STARS = 260
np.random.seed(42)
star_x = np.random.uniform(-900, 900, NUM_STARS).astype(np.float32)
star_y = np.random.uniform(-550, 550, NUM_STARS).astype(np.float32)
star_z = np.random.uniform(50, 2000, NUM_STARS).astype(np.float32)
star_speed = np.random.uniform(25, 45, NUM_STARS).astype(np.float32)

# Floating embers for Scene 4
NUM_EMBERS = 90
ember_x = np.random.uniform(-600, 600, NUM_EMBERS).astype(np.float32)
ember_y = np.random.uniform(100, 500, NUM_EMBERS).astype(np.float32)
ember_vx = np.random.uniform(-0.8, 0.8, NUM_EMBERS).astype(np.float32)
ember_vy = np.random.uniform(-1.5, -3.2, NUM_EMBERS).astype(np.float32)
ember_size = np.random.uniform(1.5, 4.0, NUM_EMBERS).astype(np.float32)

# ==============================================================================
# 3. FRAME RENDERING LOGIC (60 FPS)
# ==============================================================================
def render_frame(frame_idx):
    t_sec = frame_idx / FPS
    frame = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
    
    # Background subtle cosmic gradient
    base_col = np.array([12, 10, 15], dtype=np.float32) # deep obsidian BGR
    # Add subtle radial falloff
    y_idx, x_idx = np.ogrid[:HEIGHT, :WIDTH]
    dist_center = np.sqrt((x_idx - WIDTH//2)**2 + (y_idx - HEIGHT//2)**2) / 1000.0
    vignette = np.clip(1.0 - 0.45 * (dist_center ** 2), 0.2, 1.0)
    for c in range(3):
        frame[:, :, c] = (base_col[c] * vignette).astype(np.uint8)
        
    # Micro noise texture
    noise = np.random.randint(0, 8, (HEIGHT, WIDTH, 3), dtype=np.uint8)
    frame = cv2.add(frame, noise)

    # -------------------------------------------------------------------------
    # SCENE 1: INITIALIZATION & GIMBAL GYROSCOPE (0.0s - 3.5s | Frames 0 - 210)
    # -------------------------------------------------------------------------
    if frame_idx < 210:
        progress = frame_idx / 210.0
        
        # Grid lines pulsing
        grid_alpha = 0.15 + 0.1 * math.sin(t_sec * 6.0)
        grid_col = (int(60 * grid_alpha), int(70 * grid_alpha), int(90 * grid_alpha))
        for gx in range(0, WIDTH, 120):
            cv2.line(frame, (gx, 0), (gx, HEIGHT), grid_col, 1)
        for gy in range(0, HEIGHT, 120):
            cv2.line(frame, (0, gy), (WIDTH, gy), grid_col, 1)

        # Concentric 3D Gyroscope Rings
        spin_speed = (progress ** 1.8) * 12.0
        r_outer = int(240 + 30 * math.sin(t_sec * 3.0))
        r_mid = int(180 + 20 * math.cos(t_sec * 4.0))
        r_inner = 120
        center = (WIDTH // 2, HEIGHT // 2)

        # Draw outer ring with rotating tick marks
        num_ticks = 48
        rot_angle = t_sec * 0.8
        for i in range(num_ticks):
            angle = (i / num_ticks) * 2.0 * math.pi + rot_angle
            p1 = (int(center[0] + (r_outer - 8) * math.cos(angle)), int(center[1] + (r_outer - 8) * math.sin(angle)))
            p2 = (int(center[0] + (r_outer + 8) * math.cos(angle)), int(center[1] + (r_outer + 8) * math.sin(angle)))
            col = (0, 240, 255) if i % 4 == 0 else (120, 130, 150)
            cv2.line(frame, p1, p2, col, 1 if i % 4 != 0 else 2, cv2.LINE_AA)
        cv2.circle(frame, center, r_outer, (60, 160, 200), 1, cv2.LINE_AA)

        # Draw middle dashed ring rotating opposite
        rot_mid = -t_sec * 1.5
        for a in range(0, 360, 15):
            rad1 = math.radians(a + rot_mid * 60.0)
            rad2 = math.radians(a + 8 + rot_mid * 60.0)
            p1 = (int(center[0] + r_mid * math.cos(rad1)), int(center[1] + r_mid * math.sin(rad1)))
            p2 = (int(center[0] + r_mid * math.cos(rad2)), int(center[1] + r_mid * math.sin(rad2)))
            cv2.line(frame, p1, p2, (220, 100, 240), 2, cv2.LINE_AA)

        # Draw inner cyan circle with orbiting photon satellites
        cv2.circle(frame, center, r_inner, (0, 220, 255), 2, cv2.LINE_AA)
        for sat_idx, sat_spd in enumerate([3.5, -4.2, 2.8]):
            sat_ang = t_sec * sat_spd + sat_idx * (2 * math.pi / 3)
            sx = int(center[0] + r_inner * math.cos(sat_ang))
            sy = int(center[1] + r_inner * math.sin(sat_ang))
            cv2.circle(frame, (sx, sy), 6, (255, 255, 255), -1, cv2.LINE_AA)
            cv2.circle(frame, (sx, sy), 14, (0, 240, 255), 1, cv2.LINE_AA)

        # Crosshairs in center
        ch_len = 18
        cv2.line(frame, (center[0] - ch_len, center[1]), (center[0] + ch_len, center[1]), (255, 255, 255), 1, cv2.LINE_AA)
        cv2.line(frame, (center[0], center[1] - ch_len), (center[0], center[1] + ch_len), (255, 255, 255), 1, cv2.LINE_AA)

        # Kinetic Text using PIL
        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_img)

        # Main Title: ANTIGRAVITY with tracking expansion
        title_text = "ANTIGRAVITY"
        tracking = int(progress * 38.0)
        # Calculate total text width with tracking
        total_w = sum(draw.textbbox((0, 0), ch, font=font_title_large)[2] for ch in title_text) + (len(title_text) - 1) * tracking
        start_x = (WIDTH - total_w) // 2
        curr_x = start_x
        title_y = HEIGHT // 2 - 290
        
        # Sub-glow color
        for ch in title_text:
            w = draw.textbbox((0, 0), ch, font=font_title_large)[2]
            draw.text((curr_x, title_y), ch, font=font_title_large, fill=(245, 245, 250))
            curr_x += w + tracking

        # Category eyebrow
        eyebrow = f"01 // KINETIC SYSTEM CALIBRATION & INERTIA // {t_sec:.2f}S"
        draw.text((WIDTH//2 - 280, title_y - 45), eyebrow, font=font_mono_bold, fill=(0, 240, 255))

        # Bottom label
        subtext = "PRECISION 3D ROTATIONAL MATRIX & HYPER-VELOCITY ENGINE"
        draw.text((WIDTH//2 - 320, HEIGHT // 2 + 300), subtext, font=font_mono_bold, fill=(200, 210, 225))

        frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # -------------------------------------------------------------------------
    # SCENE 2: 3D HYPERSTRUCTURE & GEOMETRIC MASTER (3.5s - 7.5s | Frames 210 - 450)
    # -------------------------------------------------------------------------
    elif frame_idx < 450:
        local_frame = frame_idx - 210
        p2 = local_frame / 240.0
        
        # 3D Undulating Perspective Floor Grid
        cam_rot_y = t_sec * 0.4
        grid_pts = []
        for gx in range(-800, 801, 100):
            for gz in range(-400, 801, 80):
                # wave height
                dist_r = math.sqrt(gx*gx + gz*gz)
                gy = 280 + math.sin(dist_r * 0.015 - t_sec * 6.0) * 35.0
                grid_pts.append([gx, gy, gz])
        
        grid_3d = rotate_3d(np.array(grid_pts, dtype=np.float32), 0.35, cam_rot_y * 0.3, 0)
        grid_2d = project_3d(grid_3d, fov=800, cam_z=750, center=(WIDTH//2, HEIGHT//2))
        
        # Draw floor dots
        for pt in grid_2d[::2]:
            x, y, z = int(pt[0]), int(pt[1]), pt[2]
            if 0 <= x < WIDTH and 0 <= y < HEIGHT:
                alpha = max(0.1, min(1.0, 1.0 - z / 1400.0))
                cv2.circle(frame, (x, y), 2, (int(80 * alpha), int(120 * alpha), int(180 * alpha)), -1)

        # 3D Rotating Geodesic Icosahedron
        scale_ico = 220.0 + 20.0 * math.sin(t_sec * 5.0)
        ico_scaled = ico_vertices * scale_ico
        
        # Complex rotation
        rx = t_sec * 1.2
        ry = t_sec * 1.8
        rz = t_sec * 0.7
        ico_rotated = rotate_3d(ico_scaled, rx, ry, rz)
        center_shape = (WIDTH // 2, HEIGHT // 2 - 20)
        ico_proj = project_3d(ico_rotated, fov=850, cam_z=600, center=center_shape)

        # Draw edges with depth cueing
        sorted_edges = sorted(ico_edges, key=lambda e: -(ico_proj[e[0]][2] + ico_proj[e[1]][2]))
        for e in sorted_edges:
            p1 = (int(ico_proj[e[0]][0]), int(ico_proj[e[0]][1]))
            p2 = (int(ico_proj[e[1]][0]), int(ico_proj[e[1]][1]))
            avg_z = (ico_proj[e[0]][2] + ico_proj[e[1]][2]) * 0.5
            # depth intensity
            intensity = max(0.2, min(1.0, 1.0 - (avg_z - 350.0) / 500.0))
            col = (int(255 * intensity), int(140 * intensity), int(40 * intensity)) # Electric cyan
            cv2.line(frame, p1, p2, col, 2 if intensity > 0.6 else 1, cv2.LINE_AA)

        # Draw vertex glowing nodes
        for v in ico_proj:
            vx, vy, vz = int(v[0]), int(v[1]), v[2]
            intensity = max(0.3, min(1.0, 1.0 - (vz - 350.0) / 500.0))
            cv2.circle(frame, (vx, vy), int(5 * intensity) + 2, (255, 255, 255), -1, cv2.LINE_AA)
            cv2.circle(frame, (vx, vy), int(10 * intensity) + 4, (0, 240, 255), 1, cv2.LINE_AA)

        # Inner pulsating glowing core
        core_r = int(45 + 15 * math.sin(t_sec * 10.0))
        cv2.circle(frame, center_shape, core_r, (240, 60, 220), 2, cv2.LINE_AA)
        cv2.circle(frame, center_shape, int(core_r * 0.6), (255, 255, 255), -1, cv2.LINE_AA)

        # Audio Spectrum Visualizer at Bottom
        num_bars = 48
        bar_w = 14
        bar_gap = 8
        total_spec_w = num_bars * (bar_w + bar_gap)
        start_bx = (WIDTH - total_spec_w) // 2
        for bi in range(num_bars):
            # procedural rhythmic height
            spec_h = int(20 + 85 * abs(math.sin(t_sec * 8.0 + bi * 0.35)) * (0.8 + 0.4 * math.cos(bi * 0.2)))
            bx = start_bx + bi * (bar_w + bar_gap)
            by = HEIGHT - 140
            cv2.rectangle(frame, (bx, by - spec_h), (bx + bar_w, by), (0, 230, 255), -1)
            cv2.rectangle(frame, (bx, by - spec_h - 4), (bx + bar_w, by - spec_h - 2), (255, 255, 255), -1)

        # Staggered Dynamic Typography Cuts
        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_img)

        tagline = "02 // GEOMETRIC TOPOLOGY & FLUID EULER DYNAMICS"
        draw.text((WIDTH//2 - 270, 75), tagline, font=font_mono_bold, fill=(0, 240, 255))

        # Big impact words switching on beats
        if local_frame < 80:
            word = "PRECISION"
            accent_col = (0, 240, 255)
        elif local_frame < 160:
            word = "VELOCITY"
            accent_col = (255, 100, 220)
        else:
            word = "DIMENSION"
            accent_col = (255, 220, 60)
            
        w_box = draw.textbbox((0, 0), word, font=font_title_large)
        ww = w_box[2] - w_box[0]
        draw.text(((WIDTH - ww)//2, 115), word, font=font_title_large, fill=accent_col)
        
        # Target coordinate brackets
        draw.text((120, HEIGHT//2 - 20), f"ROT_X: {math.degrees(rx)%360:05.1f}°\nROT_Y: {math.degrees(ry)%360:05.1f}°\nROT_Z: {math.degrees(rz)%360:05.1f}°\nVERTICES: 12\nEDGES: 30", font=font_mono_small, fill=(160, 175, 195))
        draw.text((WIDTH - 280, HEIGHT//2 - 20), f"POLYTOPE: ICOSAHEDRON\nSYMMETRY: IH_GROUP\nEULER: V-E+F=2\nTOPOLOGY: MANIFOLD\nSAMPLING: 60FPS", font=font_mono_small, fill=(160, 175, 195))

        frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # -------------------------------------------------------------------------
    # SCENE 3: HYPERDRIVE VORTEX & KINETIC CLIMAX (7.5s - 11.5s | Frames 450 - 690)
    # -------------------------------------------------------------------------
    elif frame_idx < 690:
        local_frame = frame_idx - 450
        p3 = local_frame / 240.0
        center = (WIDTH // 2, HEIGHT // 2)

        # Update and draw 3D Hyperdrive Streaking Stars
        global star_z
        star_z -= (star_speed * (1.0 + p3 * 2.5))
        # Reset stars that pass camera
        reset_mask = star_z <= 20.0
        star_z[reset_mask] = np.random.uniform(1600, 2000, np.sum(reset_mask))

        pts_cur = np.column_stack((star_x, star_y, star_z))
        pts_prev = np.column_stack((star_x, star_y, star_z + (star_speed * (2.5 + p3 * 4.0))))
        
        proj_cur = project_3d(pts_cur, fov=900, cam_z=0, center=center)
        proj_prev = project_3d(pts_prev, fov=900, cam_z=0, center=center)

        for i in range(NUM_STARS):
            x1, y1 = int(proj_cur[i][0]), int(proj_cur[i][1])
            x2, y2 = int(proj_prev[i][0]), int(proj_prev[i][1])
            if 0 <= x1 < WIDTH and 0 <= y1 < HEIGHT:
                z_depth = star_z[i]
                brightness = int(max(0.2, min(1.0, 1.0 - z_depth / 1800.0)) * 255)
                # Cyan to white streak
                col = (brightness, brightness, 255) if i % 2 == 0 else (255, brightness, int(brightness * 0.8))
                cv2.line(frame, (x1, y1), (x2, y2), col, 2 if z_depth < 400 else 1, cv2.LINE_AA)

        # Infinite Tunnel Concentric Glowing Squares
        tunnel_spd = t_sec * 4.0
        for ti in range(8):
            tz = (ti * 0.125 + (tunnel_spd * 0.15)) % 1.0
            sq_size = int(60.0 + 800.0 * (tz ** 2.2))
            sq_alpha = math.sin(tz * math.pi)
            sq_col = (int(255 * sq_alpha), int(60 * sq_alpha), int(220 * sq_alpha))
            tl = (center[0] - sq_size, center[1] - int(sq_size * 0.6))
            br = (center[0] + sq_size, center[1] + int(sq_size * 0.6))
            cv2.rectangle(frame, tl, br, sq_col, 2, cv2.LINE_AA)

        # Rotating Radar Scope in corner
        radar_center = (WIDTH - 160, 160)
        radar_r = 70
        cv2.circle(frame, radar_center, radar_r, (0, 200, 255), 1, cv2.LINE_AA)
        cv2.circle(frame, radar_center, int(radar_r * 0.5), (0, 120, 180), 1, cv2.LINE_AA)
        radar_angle = t_sec * 6.5
        rx2 = int(radar_center[0] + radar_r * math.cos(radar_angle))
        ry2 = int(radar_center[1] + radar_r * math.sin(radar_angle))
        cv2.line(frame, radar_center, (rx2, ry2), (0, 255, 255), 2, cv2.LINE_AA)

        # Horizontal Glitch Slices on heavy beats
        if local_frame % 30 in [0, 1, 2]:
            slice_y = np.random.randint(200, HEIGHT - 200)
            slice_h = np.random.randint(25, 70)
            shift = np.random.randint(-35, 35)
            frame[slice_y:slice_y+slice_h] = np.roll(frame[slice_y:slice_y+slice_h], shift, axis=1)

        # Kinetic Climax Typography
        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_img)

        draw.text((WIDTH//2 - 220, 75), "03 // HYPERDRIVE VELOCITY VORTEX", font=font_mono_bold, fill=(255, 200, 0))

        # Fast cutting words
        words = ["UNCONSTRAINED", "KINETIC FORCE", "PURE IMPACT", "TRANSCENDENCE"]
        w_idx = int(local_frame / 60.0) % len(words)
        active_w = words[w_idx]
        
        wb = draw.textbbox((0, 0), active_w, font=font_title_huge)
        ww = wb[2] - wb[0]
        # Draw background black bar behind text for stark Swiss punch
        draw.rectangle([(WIDTH - ww)//2 - 25, HEIGHT//2 - 65, (WIDTH + ww)//2 + 25, HEIGHT//2 + 65], fill=(10, 10, 15))
        draw.rectangle([(WIDTH - ww)//2 - 25, HEIGHT//2 - 65, (WIDTH + ww)//2 + 25, HEIGHT//2 + 65], outline=(0, 240, 255), width=2)
        draw.text(((WIDTH - ww)//2, HEIGHT//2 - 58), active_w, font=font_title_huge, fill=(255, 255, 255))

        frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # -------------------------------------------------------------------------
    # SCENE 4: THE TORII MONUMENT & CELESTIAL FINALE (11.5s - 15.0s | Frames 690 - 900)
    # -------------------------------------------------------------------------
    else:
        local_frame = frame_idx - 690
        p4 = local_frame / 210.0
        center = (WIDTH // 2, HEIGHT // 2 - 20)

        # Radiant Sacred Sunburst Mandala (Seigaiha / Sun rays)
        num_rays = 36
        ray_rot = t_sec * 0.15
        ray_alpha = min(1.0, local_frame / 40.0)
        for i in range(num_rays):
            angle = (i / num_rays) * 2.0 * math.pi + ray_rot
            rx = int(center[0] + 550 * math.cos(angle))
            ry = int(center[1] + 550 * math.sin(angle))
            col = (int(30 * ray_alpha), int(90 * ray_alpha), int(150 * ray_alpha)) # subtle golden amber
            cv2.line(frame, center, (rx, ry), col, 1, cv2.LINE_AA)

        # Concentric halo rings
        for hr in [140, 220, 310, 420]:
            cv2.circle(frame, center, hr, (int(20 * ray_alpha), int(80 * ray_alpha), int(140 * ray_alpha)), 1, cv2.LINE_AA)

        # 3D Torii Gate Assembly
        torii_rot_y = math.sin(t_sec * 0.6) * 0.18 # majestic slow yaw
        torii_rot_x = 0.08 + math.sin(t_sec * 0.4) * 0.04
        
        # Entrance rise effect
        rise_y = max(0.0, 1.0 - local_frame / 35.0) * 160.0
        
        for beam in torii_beams:
            ptA = np.array([beam[0][0], beam[0][1] + rise_y, beam[0][2]], dtype=np.float32)
            ptB = np.array([beam[1][0], beam[1][1] + rise_y, beam[1][2]], dtype=np.float32)
            
            pts = np.vstack([ptA, ptB])
            pts_rot = rotate_3d(pts, torii_rot_x, torii_rot_y, 0)
            proj = project_3d(pts_rot, fov=900, cam_z=600, center=center)
            
            p1 = (int(proj[0][0]), int(proj[0][1]))
            p2 = (int(proj[1][0]), int(proj[1][1]))
            
            # Gold beam with vermilion highlights
            cv2.line(frame, p1, p2, (40, 180, 245), 3, cv2.LINE_AA) # Gold BGR
            cv2.line(frame, p1, p2, (255, 255, 255), 1, cv2.LINE_AA) # White specular core

        # Torii Center Kanji Plaque
        plaque_3d = np.array([[0, -185 + rise_y, 0]], dtype=np.float32)
        plaque_proj = project_3d(rotate_3d(plaque_3d, torii_rot_x, torii_rot_y, 0), fov=900, cam_z=600, center=center)
        px, py = int(plaque_proj[0][0]), int(plaque_proj[0][1])
        cv2.rectangle(frame, (px - 22, py - 20), (px + 22, py + 20), (20, 25, 200), -1) # Vermilion red plaque
        cv2.rectangle(frame, (px - 22, py - 20), (px + 22, py + 20), (0, 220, 255), 1)

        # Update and render rising ember particles
        global ember_x, ember_y
        ember_y += ember_vy
        ember_x += ember_vx + np.sin(t_sec * 3.0 + ember_size) * 0.4
        # Reset embers that float off
        reset_e = ember_y < -HEIGHT//2 - 50
        ember_y[reset_e] = HEIGHT//2 + 50
        ember_x[reset_e] = np.random.uniform(-500, 500, np.sum(reset_e))

        for ei in range(NUM_EMBERS):
            ex = int(center[0] + ember_x[ei])
            ey = int(center[1] + ember_y[ei])
            if 0 <= ex < WIDTH and 0 <= ey < HEIGHT:
                es = int(ember_size[ei])
                col = (30, 200, 255) if ei % 3 == 0 else (120, 150, 255) # gold and sakura
                cv2.circle(frame, (ex, ey), es, col, -1, cv2.LINE_AA)

        # Finale Master Typography
        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_img)

        # Inscribe Kanji on Plaque
        draw.text((px - 14, py - 18), "合格", font=font_mono_bold, fill=(255, 255, 255))

        # Bottom Titles Fade In smoothly
        text_alpha = min(1.0, max(0.0, (local_frame - 20) / 40.0))
        text_fade_col = int(255 * text_alpha)
        
        main_title = "A N T I G R A V I T Y"
        tb = draw.textbbox((0, 0), main_title, font=font_title_large)
        tw = tb[2] - tb[0]
        draw.text(((WIDTH - tw)//2, HEIGHT - 220), main_title, font=font_title_large, fill=(text_fade_col, int(text_fade_col*0.9), int(text_fade_col*0.6)))

        subtitle = "MOTION DESIGN STUDIO // GENERATIVE ARTISTRY"
        sb = draw.textbbox((0, 0), subtitle, font=font_mono_bold)
        sw = sb[2] - sb[0]
        draw.text(((WIDTH - sw)//2, HEIGHT - 140), subtitle, font=font_mono_bold, fill=(0, int(220 * text_alpha), int(255 * text_alpha)))

        specs = "SIXTY FRAMES PER SECOND // PURE DETERMINISTIC CODE // 2026"
        spb = draw.textbbox((0, 0), specs, font=font_mono_small)
        spw = spb[2] - spb[0]
        draw.text(((WIDTH - spw)//2, HEIGHT - 105), specs, font=font_mono_small, fill=(int(180 * text_alpha), int(190 * text_alpha), int(205 * text_alpha)))

        frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

        # Fade out to pure black on the last 30 frames (0.5s)
        if local_frame >= 180:
            fade_out = 1.0 - (local_frame - 180) / 30.0
            frame = (frame.astype(np.float32) * fade_out).astype(np.uint8)

    # =========================================================================
    # GLOBAL POST-PROCESSING: OPTICAL BLOOM & CHROMATIC ABERRATION
    # =========================================================================
    # Optical Glow Bloom
    small = cv2.resize(frame, (WIDTH // 4, HEIGHT // 4), interpolation=cv2.INTER_LINEAR)
    blurred = cv2.GaussianBlur(small, (21, 21), 0)
    bloom = cv2.resize(blurred, (WIDTH, HEIGHT), interpolation=cv2.INTER_LINEAR)
    frame = cv2.addWeighted(frame, 1.0, bloom, 0.42, 0)

    # Chromatic Aberration on impact frames
    shift_amount = 0
    if frame_idx in range(0, 15) or frame_idx in range(210, 225) or frame_idx in range(450, 465) or frame_idx in range(690, 710):
        shift_amount = 6
    elif frame_idx >= 450 and frame_idx < 690 and (frame_idx % 30 in [0, 1]):
        shift_amount = 4

    if shift_amount > 0:
        b, g, r = cv2.split(frame)
        r = np.roll(r, shift_amount, axis=1)
        b = np.roll(b, -shift_amount, axis=1)
        frame = cv2.merge([b, g, r])

    # Cinematic Letterbox Technical Rules
    cv2.line(frame, (60, 45), (WIDTH - 60, 45), (60, 70, 85), 1)
    cv2.line(frame, (60, HEIGHT - 45), (WIDTH - 60, HEIGHT - 45), (60, 70, 85), 1)
    
    # Corner registration brackets
    bracket_len = 16
    for cx_b, cy_b in [(60, 45), (WIDTH - 60, 45), (60, HEIGHT - 45), (WIDTH - 60, HEIGHT - 45)]:
        dx = bracket_len if cx_b == 60 else -bracket_len
        dy = bracket_len if cy_b == 45 else -bracket_len
        cv2.line(frame, (cx_b, cy_b), (cx_b + dx, cy_b), (0, 240, 255), 2)
        cv2.line(frame, (cx_b, cy_b), (cx_b, cy_b + dy), (0, 240, 255), 2)

    # Top & Bottom Telemetry
    cv2.putText(frame, f"REC [60.00 FPS] // FRM: {frame_idx:04d}/{TOTAL_FRAMES} // TC: {t_sec:05.2f}S", (75, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 195, 215), 1, cv2.LINE_AA)
    cv2.putText(frame, "CAM: PERSPECTIVE_3D // LAT: 35.6762 N // LON: 139.6503 E", (WIDTH - 530, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 195, 215), 1, cv2.LINE_AA)
    
    # Bottom Progress Bar
    bar_width = WIDTH - 150
    progress_w = int(bar_width * (frame_idx / TOTAL_FRAMES))
    cv2.line(frame, (75, HEIGHT - 35), (WIDTH - 75, HEIGHT - 35), (45, 55, 65), 2)
    cv2.line(frame, (75, HEIGHT - 35), (75 + progress_w, HEIGHT - 35), (0, 240, 255), 2)
    cv2.circle(frame, (75 + progress_w, HEIGHT - 35), 4, (255, 255, 255), -1, cv2.LINE_AA)

    return frame

# ==============================================================================
# 4. MAIN PIPELINE: RENDER & ENCODE MP4 WITH FFMPEG
# ==============================================================================
def main():
    start_time = time.time()
    print("=" * 70)
    print("ANTIGRAVITY // 15-SECOND KINETIC MOTION GRAPHICS VIDEO GENERATOR")
    print(f"Target: {WIDTH}x{HEIGHT} @ {FPS} FPS ({TOTAL_FRAMES} frames)")
    print(f"Output: {VIDEO_OUTPUT_PATH}")
    print("=" * 70)

    # Step 1: Synthesize Audio
    generate_soundtrack()

    # Step 2: Launch FFmpeg pipe
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    ffmpeg_cmd = [
        ffmpeg_exe,
        '-y',                           # Overwrite output
        '-f', 'rawvideo',               # Input is raw video stream
        '-vcodec', 'rawvideo',
        '-s', f'{WIDTH}x{HEIGHT}',      # Resolution
        '-pix_fmt', 'bgr24',            # OpenCV default pixel format
        '-r', str(FPS),                 # Framerate
        '-i', '-',                      # Read video from STDIN
        '-i', AUDIO_TEMP_PATH,          # Soundtrack from WAV
        '-c:v', 'libx264',              # H.264 video codec
        '-preset', 'fast',              # Encoding speed
        '-crf', '18',                   # High visually lossless quality
        '-pix_fmt', 'yuv420p',          # Universal compatibility for browser / mobile
        '-c:a', 'aac',                  # AAC audio codec
        '-b:a', '320k',                 # High audio bitrate
        '-shortest',                    # Match duration
        VIDEO_OUTPUT_PATH
    ]

    print("[2/3] Spawning FFmpeg video encoding pipeline...")
    process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

    # Step 3: Render and pipe all 900 frames
    print("[3/3] Rendering 900 frames @ 60 FPS...")
    last_print = time.time()
    
    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        process.stdin.write(frame.tobytes())
        
        if i % 60 == 0 or i == TOTAL_FRAMES - 1:
            curr_t = time.time()
            fps_actual = (i + 1) / (curr_t - start_time)
            eta = (TOTAL_FRAMES - i - 1) / max(fps_actual, 0.01)
            pct = (i + 1) / TOTAL_FRAMES * 100.0
            print(f"  Frame {i+1:04d}/{TOTAL_FRAMES} ({pct:5.1f}%) | Speed: {fps_actual:4.1f} fps | ETA: {eta:4.1f}s")

    # Close pipe and wait for FFmpeg to finish
    process.stdin.close()
    stderr_output = process.stderr.read().decode('utf-8', errors='ignore')
    process.wait()

    if process.returncode != 0:
        print("FFmpeg error:", stderr_output)
        sys.exit(1)

    # Copy to brain artifact directory if possible
    brain_dir = r"C:\Users\Admin\.gemini\antigravity\brain\6d7c8391-fade-4372-9d65-21709c665a0e"
    if os.path.exists(brain_dir):
        brain_video = os.path.join(brain_dir, 'showreel_15s.mp4')
        import shutil
        shutil.copyfile(VIDEO_OUTPUT_PATH, brain_video)
        print(f"Copied to brain artifacts: {brain_video}")

    elapsed = time.time() - start_time
    file_size_mb = os.path.getsize(VIDEO_OUTPUT_PATH) / (1024 * 1024)
    print("=" * 70)
    print("VIDEO GENERATION COMPLETE!")
    print(f"File Path: {VIDEO_OUTPUT_PATH}")
    print(f"Duration: 15.00 seconds ({TOTAL_FRAMES} frames @ 60.0 FPS)")
    print(f"Resolution: {WIDTH}x{HEIGHT} (Full HD 1080p)")
    print(f"File Size: {file_size_mb:.2f} MB")
    print(f"Total Render Time: {elapsed:.2f} seconds ({TOTAL_FRAMES / elapsed:.1f} FPS)")
    print("=" * 70)

if __name__ == '__main__':
    main()
