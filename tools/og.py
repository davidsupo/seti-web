import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
PUB = os.path.join(WS, "seti-technology", "public")
W, H = 1200, 630

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\bahnschrift.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
]


def font(size):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


# ---------- fondo ----------
bg = Image.new("RGB", (W, H), "#04141f")
top, bottom = (11, 39, 72), (4, 20, 31)
for y in range(H):
    t = y / H
    color = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    ImageDraw.Draw(bg).line([(0, y), (W, y)], fill=color)

# glow
glow = Image.new("RGB", (W, H), (0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((W - 520, -260, W + 220, 380), fill=(12, 90, 110))
glow = glow.filter(ImageFilter.GaussianBlur(120))
bg = Image.blend(bg, Image.blend(bg, glow, 0.55), 0.65)

d = ImageDraw.Draw(bg, "RGBA")

# rejilla
for x in range(0, W, 60):
    d.line([(x, 0), (x, H)], fill=(41, 226, 249, 12))
for y in range(0, H, 60):
    d.line([(0, y), (W, y)], fill=(41, 226, 249, 12))

# esquinas técnicas
d.line([(0, 0), (260, 0)], fill=(61, 187, 200, 160), width=3)
d.line([(0, 0), (0, 180)], fill=(61, 187, 200, 160), width=3)
d.line([(W, H), (W - 260, H)], fill=(61, 187, 200, 160), width=3)
d.line([(W, H), (W, H - 180)], fill=(61, 187, 200, 160), width=3)

# ---------- logo ----------
logo = Image.open(os.path.join(PUB, "brand", "seti-logo-light.png")).convert("RGBA")
logo_h = 74
logo_w = int(logo.width * logo_h / logo.height)
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
bg.paste(logo, (78, 64), logo)

# ---------- tipografía ----------
f_huge = font(96)
f_kicker = font(26)
f_small = font(21)

d.text((78, 214), "SEGURIDAD", font=f_huge, fill=(255, 255, 255))
d.text((78, 312), "ELECTRÓNICA", font=f_huge, fill=(6, 30, 48), stroke_width=2, stroke_fill=(41, 226, 249))

# kicker con tracking manual
kicker = "P R O J E C T S   &   I A"
d.text((84, 440), kicker, font=f_kicker, fill=(41, 226, 249))

# línea divisoria
d.line([(84, 502), (520, 502)], fill=(41, 226, 249, 120), width=2)

d.text((84, 526), "Seguridad electrónica · Cobertura nacional", font=f_small, fill=(168, 195, 214))
d.text(
    (84, 556),
    "Trujillo · Piura · Chiclayo · Jaén · Chimbote · Lima · Arequipa",
    font=f_small,
    fill=(120, 150, 172),
)

# etiqueta superior derecha
label = "PROJECTS & IA"
lw = d.textlength(label, font=f_small)
d.rounded_rectangle([(W - lw - 130, 74), (W - 78, 116)], radius=21, outline=(41, 226, 249, 150), width=1)
d.text((W - lw - 104, 84), label, font=f_small, fill=(41, 226, 249))

bg.save(os.path.join(PUB, "og-default.png"), optimize=True)
print("og-default.png", bg.size, os.path.getsize(os.path.join(PUB, "og-default.png")) // 1024, "KB")
