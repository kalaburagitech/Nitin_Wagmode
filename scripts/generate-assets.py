"""Generate the portfolio's original artwork: logo, placeholder portrait,
illustrations, project and blog covers, favicons, and the Open Graph image.

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
PRIMARY = "#EAB308"  # matches the site's default "yellow" primary color
PRIMARY_DARK = "#A16207"
BG = "#05060D"
CARD = "#111827"
LINE = "#334155"
FONT = "Sora, 'Segoe UI', Arial, sans-serif"


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip() + "\n", encoding="utf-8")


# --------------------------------------------------------------------------
# Logo
# --------------------------------------------------------------------------
def logo(fg, accent):
    return f"""
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" role="img" aria-label="{NAME} logo">
  <circle cx="30" cy="30" r="26" fill="none" stroke="{fg}" stroke-width="3.5"/>
  <path d="M30 4 A26 26 0 0 1 56 30" fill="none" stroke="{accent}" stroke-width="3.5" stroke-linecap="round"/>
  <text x="30" y="37.5" text-anchor="middle" font-family="{FONT}" font-size="21" font-weight="800" fill="{fg}" letter-spacing="-1">{INITIALS}</text>
  <circle cx="64" cy="44" r="3" fill="{accent}"/>
</svg>"""


# --------------------------------------------------------------------------
# Placeholder portrait (shown until a real photo is added)
# --------------------------------------------------------------------------
PORTRAIT = f"""
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" role="img" aria-label="{NAME} — profile placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1F2937"/>
      <stop offset="1" stop-color="{BG}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="{PRIMARY}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="{PRIMARY}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="figure" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#374151"/>
      <stop offset="1" stop-color="#1F2937"/>
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="#FFFFFF" stroke-opacity="0.04"/>
    </pattern>
  </defs>
  <rect width="400" height="500" fill="url(#bg)"/>
  <rect width="400" height="500" fill="url(#grid)"/>
  <rect width="400" height="500" fill="url(#glow)"/>
  <circle cx="200" cy="190" r="78" fill="url(#figure)" stroke="{PRIMARY}" stroke-opacity="0.35" stroke-width="2"/>
  <path d="M60 500 C60 380 120 300 200 300 C280 300 340 380 340 500 Z" fill="url(#figure)" stroke="{PRIMARY}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="200" y="212" text-anchor="middle" font-family="{FONT}" font-size="64" font-weight="800" fill="{PRIMARY}" letter-spacing="-2">{INITIALS}</text>
  <g font-family="'Fira Code', Consolas, monospace" font-size="15" fill="#9CA3AF" fill-opacity="0.55">
    <text x="28" y="48">&lt;Frontend /&gt;</text>
    <text x="268" y="84">{{ react }}</text>
    <text x="300" y="300">=&gt;</text>
    <text x="34" y="320">tsx</text>
  </g>
</svg>"""


# --------------------------------------------------------------------------
# About illustration: laptop dashboard + phone app
# --------------------------------------------------------------------------
ABOUT = f"""
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 560" role="img" aria-label="Web dashboard and mobile app illustration">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.55">
      <stop offset="0" stop-color="{PRIMARY}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="{PRIMARY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="480" height="560" fill="url(#glow)"/>
  <!-- laptop -->
  <rect x="40" y="150" width="330" height="210" rx="14" fill="{CARD}" stroke="{LINE}" stroke-width="3"/>
  <rect x="56" y="166" width="298" height="178" rx="6" fill="#0B1020"/>
  <rect x="56" y="166" width="62" height="178" fill="#151E2F"/>
  <rect x="68" y="182" width="38" height="8" rx="4" fill="{PRIMARY}"/>
  <rect x="68" y="202" width="38" height="6" rx="3" fill="{LINE}"/>
  <rect x="68" y="216" width="30" height="6" rx="3" fill="{LINE}"/>
  <rect x="68" y="230" width="34" height="6" rx="3" fill="{LINE}"/>
  <rect x="132" y="182" width="66" height="44" rx="6" fill="#1E293B"/>
  <rect x="206" y="182" width="66" height="44" rx="6" fill="#1E293B"/>
  <rect x="280" y="182" width="62" height="44" rx="6" fill="#1E293B"/>
  <rect x="140" y="194" width="30" height="8" rx="4" fill="{PRIMARY}"/>
  <rect x="214" y="194" width="30" height="8" rx="4" fill="#38BDF8"/>
  <rect x="288" y="194" width="30" height="8" rx="4" fill="#22C55E"/>
  <polyline points="140,320 170,296 200,306 232,272 262,284 296,250 334,262" fill="none" stroke="{PRIMARY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="132" y="238" width="210" height="96" rx="6" fill="none" stroke="{LINE}" stroke-width="2"/>
  <path d="M20 360 H390 L372 382 H38 Z" fill="#1F2937" stroke="{LINE}" stroke-width="3" stroke-linejoin="round"/>
  <!-- phone -->
  <rect x="318" y="230" width="128" height="250" rx="20" fill="{CARD}" stroke="{PRIMARY}" stroke-width="3"/>
  <rect x="330" y="252" width="104" height="206" rx="8" fill="#0B1020"/>
  <rect x="364" y="240" width="36" height="5" rx="2.5" fill="{LINE}"/>
  <rect x="340" y="264" width="60" height="8" rx="4" fill="{PRIMARY}"/>
  <rect x="340" y="284" width="84" height="38" rx="6" fill="#1E293B"/>
  <rect x="340" y="330" width="84" height="38" rx="6" fill="#1E293B"/>
  <rect x="340" y="376" width="84" height="38" rx="6" fill="#1E293B"/>
  <circle cx="354" cy="303" r="7" fill="#22C55E"/>
  <circle cx="354" cy="349" r="7" fill="#38BDF8"/>
  <circle cx="354" cy="395" r="7" fill="{PRIMARY}"/>
  <rect x="368" y="298" width="46" height="5" rx="2.5" fill="{LINE}"/>
  <rect x="368" y="344" width="40" height="5" rx="2.5" fill="{LINE}"/>
  <rect x="368" y="390" width="44" height="5" rx="2.5" fill="{LINE}"/>
  <rect x="352" y="428" width="60" height="18" rx="9" fill="{PRIMARY}"/>
  <!-- floating code chips -->
  <g font-family="'Fira Code', Consolas, monospace" font-size="15" font-weight="600">
    <rect x="44" y="70" width="170" height="40" rx="12" fill="{CARD}" stroke="{LINE}" stroke-width="2"/>
    <text x="60" y="96" fill="#61DAFB">&lt;App /&gt;</text>
    <text x="130" y="96" fill="#9CA3AF">.tsx</text>
    <rect x="250" y="110" width="170" height="40" rx="12" fill="{CARD}" stroke="{LINE}" stroke-width="2"/>
    <text x="266" y="136" fill="{PRIMARY}">useSelector()</text>
    <rect x="40" y="420" width="190" height="40" rx="12" fill="{CARD}" stroke="{LINE}" stroke-width="2"/>
    <text x="56" y="446" fill="#22C55E">await fetch(api)</text>
  </g>
</svg>"""


# --------------------------------------------------------------------------
# Covers (projects + blog) in the reference's blog-cover visual language
# --------------------------------------------------------------------------
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
  <rect width="{width}" height="{height}" fill="#0B1020"/>
  <rect width="{width}" height="{height}" fill="url(#bg)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)" opacity="0.55"/>
  <rect x="64" y="58" width="{width - 128}" height="{height - 116}" rx="30" fill="{CARD}" fill-opacity="0.9" stroke="{LINE}" stroke-width="2"/>
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
    background = (0, 0, 0, 0) if transparent else hex_rgb(BG) + (255,)
    img = Image.new("RGBA", (s, s), background)
    draw = ImageDraw.Draw(img)
    pad = s * 0.1
    width = max(2, int(s * 0.055))
    draw.ellipse([pad, pad, s - pad, s - pad], outline=hex_rgb("#F8FAFC"), width=width)
    draw.arc([pad, pad, s - pad, s - pad], start=-90, end=0, fill=hex_rgb(PRIMARY), width=width)
    font = load_font(int(s * 0.36))
    draw.text((s / 2, s / 2), INITIALS, font=font, fill=hex_rgb(PRIMARY), anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


def og_image():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), hex_rgb(BG))
    draw = ImageDraw.Draw(img)
    for x in range(0, w, 48):
        draw.line([(x, 0), (x, h)], fill=(20, 24, 36))
    for y in range(0, h, 48):
        draw.line([(0, y), (w, y)], fill=(20, 24, 36))
    glow = Image.new("RGB", (w, h), hex_rgb(PRIMARY))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse([760, -220, 1360, 380], fill=70)
    mask = mask.filter(ImageFilter.GaussianBlur(120))
    img.paste(glow, (0, 0), mask)
    draw = ImageDraw.Draw(img)
    draw.line([(80, 150), (130, 150)], fill=hex_rgb(PRIMARY), width=3)
    draw.text((145, 150), "PORTFOLIO", font=load_font(26), fill=hex_rgb(PRIMARY), anchor="lm")
    draw.text((80, 250), NAME, font=load_font(92), fill=(248, 250, 252), anchor="lm")
    draw.text((80, 350), ROLE, font=load_font(48), fill=hex_rgb(PRIMARY), anchor="lm")
    draw.text((80, 420), STACK, font=load_font(30, bold=False), fill=(148, 163, 184), anchor="lm")
    draw.text((80, 530), "Bengaluru, India  ·  Open to relocation & remote", font=load_font(26, bold=False), fill=(148, 163, 184), anchor="lm")
    badge = icon_png(200, transparent=True)
    img.paste(badge, (920, 330), badge)
    return img


def main():
    write(ASSETS / "logo-on-dark.svg", logo("#F8FAFC", PRIMARY))
    write(ASSETS / "logo-on-light.svg", logo("#0F172A", PRIMARY_DARK))
    write(ASSETS / "profile-placeholder.svg", PORTRAIT)
    write(ASSETS / "about-illustration.svg", ABOUT)

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
