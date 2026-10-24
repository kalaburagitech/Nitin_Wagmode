"""Generate the portfolio's original artwork: project and blog covers,
favicons, and the Open Graph image (which uses public/assets/profile-square.jpg).

Usage: python scripts/generate-assets.py   (requires Pillow)
Re-run after changing the name, colors, or project list below.
"""
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ASSETS = PUBLIC / "assets"

NAME = "Nitin Wagmode"
INITIALS = "NW"
ROLE = "Frontend Developer"
STACK = "React.js · Next.js · React Native · TypeScript"
PRIMARY = "#2DD4BF"  # default "teal" accent (dark theme) from src/data/site.js
BG = "#0A0D14"
CARD = "#111621"
LINE = "#2A3344"
FONT = "'Space Grotesk', 'Segoe UI', Arial, sans-serif"


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip() + "\n", encoding="utf-8")


def wrap(text, max_len):
    lines, line = [], ""
    for word in text.split():
        if len(line) + len(word) + 1 > max_len and line:
            lines.append(line)
            line = word
        else:
            line = f"{line} {word}".strip()
    lines.append(line)
    return lines


def cover(title, label, subtitle, accent, motif, width=1200, height=675):
    title_lines = wrap(title, 22)
    title_svg = "".join(
        f'<text x="96" y="{230 + i * 64}" fill="#F8FAFC" font-family="{FONT}" font-size="54" font-weight="800">{escape(t)}</text>'
        for i, t in enumerate(title_lines[:3])
    )
    sub_y = 230 + len(title_lines[:3]) * 64 + 10
    sub_svg = "".join(
        f'<text x="96" y="{sub_y + i * 34}" fill="#94A3B8" font-family="{FONT}" font-size="24">{escape(t)}</text>'
        for i, t in enumerate(wrap(subtitle, 40)[:2])
    )
    return f"""
<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="{width}" y2="{height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="{accent}" stop-opacity="0.32"/>
      <stop offset="0.5" stop-color="{CARD}"/>
      <stop offset="1" stop-color="{PRIMARY}" stop-opacity="0.22"/>
    </linearGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="{LINE}" stroke-opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="{width}" height="{height}" fill="{BG}"/>
  <rect width="{width}" height="{height}" fill="url(#bg)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)" opacity="0.55"/>
  <rect x="96" y="100" width="{len(label) * 14 + 60}" height="50" rx="25" fill="{accent}" fill-opacity="0.16" stroke="{accent}" stroke-opacity="0.8"/>
  <text x="126" y="133" fill="{accent}" font-family="{FONT}" font-size="21" font-weight="800">{escape(label)}</text>
  {title_svg}
  {sub_svg}
  <g transform="translate(760 150)">{motif(accent)}</g>
</svg>"""


def motif_phone(accent):
    return f"""
  <rect x="60" y="0" width="200" height="380" rx="30" fill="#0B1020" stroke="{accent}" stroke-width="4"/>
  <rect x="120" y="16" width="80" height="8" rx="4" fill="{LINE}"/>
  <rect x="84" y="48" width="152" height="70" rx="12" fill="#1E293B"/>
  <circle cx="114" cy="83" r="14" fill="{accent}"/>
  <rect x="138" y="72" width="82" height="8" rx="4" fill="{LINE}"/>
  <rect x="138" y="88" width="60" height="8" rx="4" fill="{LINE}"/>
  <rect x="84" y="132" width="152" height="70" rx="12" fill="#1E293B"/>
  <circle cx="114" cy="167" r="14" fill="#22C55E"/>
  <rect x="138" y="156" width="82" height="8" rx="4" fill="{LINE}"/>
  <rect x="138" y="172" width="60" height="8" rx="4" fill="{LINE}"/>
  <rect x="84" y="216" width="152" height="70" rx="12" fill="#1E293B"/>
  <rect x="104" y="232" width="40" height="40" rx="6" fill="none" stroke="{accent}" stroke-width="4"/>
  <rect x="114" y="242" width="20" height="20" fill="{accent}"/>
  <rect x="156" y="240" width="64" height="8" rx="4" fill="{LINE}"/>
  <rect x="104" y="310" width="112" height="40" rx="20" fill="{accent}"/>"""


def motif_dashboard(accent):
    return f"""
  <rect x="0" y="20" width="330" height="330" rx="20" fill="#0B1020" stroke="{LINE}" stroke-width="3"/>
  <rect x="20" y="44" width="90" height="56" rx="10" fill="#1E293B"/>
  <rect x="120" y="44" width="90" height="56" rx="10" fill="#1E293B"/>
  <rect x="220" y="44" width="90" height="56" rx="10" fill="#1E293B"/>
  <rect x="32" y="60" width="44" height="10" rx="5" fill="{accent}"/>
  <rect x="132" y="60" width="44" height="10" rx="5" fill="#38BDF8"/>
  <rect x="232" y="60" width="44" height="10" rx="5" fill="#22C55E"/>
  <rect x="40" y="250" width="34" height="80" rx="6" fill="{accent}" fill-opacity="0.8"/>
  <rect x="90" y="200" width="34" height="130" rx="6" fill="{accent}"/>
  <rect x="140" y="230" width="34" height="100" rx="6" fill="{accent}" fill-opacity="0.6"/>
  <rect x="190" y="160" width="34" height="170" rx="6" fill="{accent}"/>
  <rect x="240" y="190" width="34" height="140" rx="6" fill="{accent}" fill-opacity="0.8"/>
  <polyline points="56,180 106,140 156,160 206,110 256,130 290,96" fill="none" stroke="#F8FAFC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>"""


def motif_store(accent):
    cards = ""
    for i, (x, y) in enumerate([(0, 20), (170, 20), (0, 200), (170, 200)]):
        cards += f"""
  <rect x="{x}" y="{y}" width="150" height="160" rx="16" fill="#0B1020" stroke="{LINE}" stroke-width="3"/>
  <rect x="{x + 16}" y="{y + 16}" width="118" height="70" rx="10" fill="{accent}" fill-opacity="{0.25 + i * 0.12:.2f}"/>
  <rect x="{x + 16}" y="{y + 100}" width="90" height="10" rx="5" fill="{LINE}"/>
  <rect x="{x + 16}" y="{y + 122}" width="50" height="14" rx="7" fill="{accent}"/>"""
    return cards


def motif_json(accent):
    lines = [
        ('{', "#F8FAFC", 0), ('"type": "form",', accent, 1), ('"fields": [', "#38BDF8", 1),
        ('{ "kind": "text" },', "#94A3B8", 2), ('{ "kind": "select" }', "#94A3B8", 2), ("],", "#38BDF8", 1),
        ('"layout": "grid"', accent, 1), ("}", "#F8FAFC", 0),
    ]
    text = "".join(
        f'<text x="{24 + indent * 24}" y="{64 + i * 36}" fill="{color}" font-family="Consolas, monospace" font-size="22">{escape(t)}</text>'
        for i, (t, color, indent) in enumerate(lines)
    )
    return f"""
  <rect x="0" y="20" width="330" height="340" rx="20" fill="#0B1020" stroke="{LINE}" stroke-width="3"/>
  {text}"""


def motif_shield(accent):
    return f"""
  <path d="M165 10 L300 60 V180 C300 270 240 330 165 360 C90 330 30 270 30 180 V60 Z" fill="#0B1020" stroke="{accent}" stroke-width="5"/>
  <rect x="120" y="160" width="90" height="80" rx="12" fill="{accent}"/>
  <path d="M135 160 V130 A30 30 0 0 1 195 130 V160" fill="none" stroke="{accent}" stroke-width="10"/>
  <circle cx="165" cy="198" r="10" fill="#0B1020"/>"""


def motif_sync(accent):
    return f"""
  <circle cx="165" cy="190" r="140" fill="#0B1020" stroke="{LINE}" stroke-width="3"/>
  <path d="M95 160 A75 75 0 0 1 230 140" fill="none" stroke="{accent}" stroke-width="12" stroke-linecap="round"/>
  <path d="M235 220 A75 75 0 0 1 100 240" fill="none" stroke="#38BDF8" stroke-width="12" stroke-linecap="round"/>
  <path d="M215 112 L240 140 L205 152 Z" fill="{accent}"/>
  <path d="M115 268 L90 240 L125 228 Z" fill="#38BDF8"/>"""


def motif_server(accent):
    rows = "".join(
        f'<rect x="20" y="{40 + i * 100}" width="290" height="76" rx="14" fill="#0B1020" stroke="{LINE}" stroke-width="3"/>'
        f'<circle cx="56" cy="{78 + i * 100}" r="10" fill="{accent if i != 1 else "#22C55E"}"/>'
        f'<rect x="84" y="{72 + i * 100}" width="{180 - i * 30}" height="12" rx="6" fill="{LINE}"/>'
        for i in range(3)
    )
    return rows


PROJECTS = [
    ("klb-connect", "KLB Connect", "Field Operations", "Attendance, patrols, inspections, GPS, QR, and offline sync", "#22C55E", motif_phone),
    ("stalwart-recon", "Stalwart Recon", "Field Ops + Admin", "React Native app and React.js admin dashboard with RBAC", "#38BDF8", motif_dashboard),
    ("boas-co", "BOAS.CO", "E-commerce", "Next.js SSR migration and e-commerce launch", "#F97316", motif_store),
    ("morf", "MORF", "UI Engineering", "JSON-driven UI rendering engine in React and TypeScript", "#A855F7", motif_json),
    ("closal", "CLOSAL", "Web Application", "Reusable React components, pagination, filtering, and error handling", "#EC4899", motif_dashboard),
    ("sunnystateagency", "SunnyStateAgency", "Web Application", "SEO-optimized frontend features with Redux Toolkit", "#F59E0B", motif_store),
]

BLOG_COVERS = [
    ("rbac-protected-routes-react", "Role-Based Access in React", "Auth & Security", "Protected routes and permission checks across web and mobile", "#E879F9", motif_shield),
    ("flatlist-performance-field-apps", "FlatList Tuning for Field Apps", "React Native", "Keeping long operational lists smooth on mid-range phones", "#38BDF8", motif_phone),
    ("json-driven-ui-rendering-engine", "JSON-Driven UI Rendering", "React + TypeScript", "Turning configuration into typed, reusable components", "#A855F7", motif_json),
    ("offline-sync-react-native", "Offline Sync in React Native", "React Native", "Queueing field data until the network comes back", "#22C55E", motif_sync),
    ("nextjs-ssr-migration-ecommerce", "Moving an E-commerce App to Next.js SSR", "Next.js", "A practical migration path from a client-rendered React app", "#F97316", motif_server),
]


# --------------------------------------------------------------------------
# Raster icons + Open Graph image
# --------------------------------------------------------------------------
def load_font(size, bold=True):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def icon_png(size, transparent=False):
    scale = 4
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0) if transparent else hex_rgb(BG) + (255,))
    draw = ImageDraw.Draw(img)
    pad = 0 if not transparent else s * 0.04
    draw.rounded_rectangle([pad, pad, s - pad, s - pad], radius=s * 0.22, fill=hex_rgb(PRIMARY))
    font = load_font(int(s * 0.42))
    draw.text((s / 2, s / 2 + s * 0.01), INITIALS, font=font, fill=hex_rgb(BG), anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


def og_image():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), hex_rgb(BG))
    draw = ImageDraw.Draw(img)
    for x in range(0, w, 56):
        draw.line([(x, 0), (x, h)], fill=(18, 23, 33))
    for y in range(0, h, 56):
        draw.line([(0, y), (w, y)], fill=(18, 23, 33))
    glow = Image.new("RGB", (w, h), hex_rgb(PRIMARY))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse([700, -200, 1300, 400], fill=60)
    img.paste(glow, (0, 0), mask.filter(ImageFilter.GaussianBlur(140)))

    photo_path = ASSETS / "profile-square.jpg"
    if photo_path.exists():
        size = 430
        photo = Image.open(photo_path).convert("RGB").resize((size, size), Image.LANCZOS)
        round_mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(round_mask).rounded_rectangle([0, 0, size, size], radius=40, fill=255)
        img.paste(photo, (w - size - 80, (h - size) // 2), round_mask)

    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([80, 120, 80 + 62, 182], radius=14, fill=hex_rgb(PRIMARY))
    draw.text((111, 152), INITIALS, font=load_font(28), fill=hex_rgb(BG), anchor="mm")
    draw.text((80, 262), NAME, font=load_font(76), fill=(243, 245, 250), anchor="lm")
    draw.text((80, 346), ROLE, font=load_font(40), fill=hex_rgb(PRIMARY), anchor="lm")
    draw.text((80, 410), STACK, font=load_font(26, bold=False), fill=(150, 160, 178), anchor="lm")
    draw.text((80, 520), "Bengaluru, India  ·  Open to relocation & remote", font=load_font(24, bold=False), fill=(150, 160, 178), anchor="lm")
    return img


def main():
    for slug, title, label, subtitle, accent, motif in PROJECTS:
        write(ASSETS / "projects" / f"{slug}.svg", cover(title, label, subtitle, accent, motif))
    for slug, title, label, subtitle, accent, motif in BLOG_COVERS:
        write(ASSETS / "blog" / f"{slug}.svg", cover(title, label, subtitle, accent, motif))

    icon_png(512).save(PUBLIC / "icon-512.png")
    icon_png(192).save(PUBLIC / "icon-192.png")
    icon_png(180).convert("RGB").save(PUBLIC / "apple-touch-icon.png")
    icon_png(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    og_image().save(PUBLIC / "og-image.png", optimize=True)
    print("Assets generated in", PUBLIC)


if __name__ == "__main__":
    main()
