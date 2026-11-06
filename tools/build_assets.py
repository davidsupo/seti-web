import sys, os, math
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf
from PIL import Image, ImageDraw, ImageFilter

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
PUB = os.path.join(WS, "seti-technology", "public")
IMG = os.path.join(PUB, "images")
BRAND = os.path.join(PUB, "brand")
os.makedirs(IMG, exist_ok=True)
os.makedirs(BRAND, exist_ok=True)


def rgba_from_xref(xref):
    pix = pymupdf.Pixmap(doc, xref)
    smask = doc.xref_get_key(xref, "SMask")
    if smask[0] == "xref":
        mask = pymupdf.Pixmap(doc, int(smask[1].split()[0]))
        pix = pymupdf.Pixmap(pix, mask)
    return Image.frombytes("RGBA" if pix.alpha else "RGB", (pix.width, pix.height), pix.samples).convert("RGBA")


# ---------- logo ----------
logo = rgba_from_xref(28)
# trim fully transparent margins
bbox = logo.getchannel("A").getbbox()
logo = logo.crop(bbox)
print("logo cropped", logo.size)

dark = logo.copy()
light = logo.copy()
px = light.load()
for y in range(light.height):
    for x in range(light.width):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        cyan = (b - r > 45) and (g - r > 30)
        if cyan:
            px[x, y] = (min(255, int(b * 1.05)), min(255, int(g * 1.02)), 255, a)
        else:
            # everything else becomes white, keep anti-aliasing in alpha
            lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
            px[x, y] = (255, 255, 255, int(a * (0.45 + 0.55 * lum)))

# --- re-add original alpha to dark logo for crispness
dark.save(os.path.join(BRAND, "seti-logo-dark.png"))
light.save(os.path.join(BRAND, "seti-logo-light.png"))
print("logos written")

# favicon: mark only (left square area)
mark = logo.crop((0, 0, logo.height, logo.height))
# place on transparent square with padding
pad = int(mark.height * 0.12)
canvas = Image.new("RGBA", (mark.height + pad * 2, mark.height + pad * 2), (0, 0, 0, 0))
canvas.alpha_composite(mark, (pad, pad))
for size, name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png"), (32, "favicon-32.png")):
    canvas.resize((size, size), Image.LANCZOS).save(os.path.join(PUB, name))
# maskable icon with navy background
bg = Image.new("RGBA", canvas.size, (11, 39, 72, 255))
bg.alpha_composite(canvas)
bg.resize((512, 512), Image.LANCZOS).save(os.path.join(PUB, "icon-maskable-512.png"))
print("icons written")


# ---------- circular cut helpers ----------
def circular(img, feather=3):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((0, 0, w - 1, h - 1), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    out = img.copy()
    out.putalpha(mask)
    return out


def save_webp(img, name, width=1400, quality=84, alpha=False):
    if img.width > width:
        ratio = width / img.width
        img = img.resize((width, max(1, int(img.height * ratio))), Image.LANCZOS)
    path = os.path.join(IMG, name)
    img.save(path, "WEBP", quality=quality, method=5)
    print(name, img.size, os.path.getsize(path) // 1024, "KB")


def from_xref(xref, name, width=1400, circle=False, quality=84):
    img = rgba_from_xref(xref)
    if circle:
        img = circular(img)
    save_webp(img, name, width=width, quality=quality, alpha=True)


# rect photos
from_xref(545, "alarmas-intrusion.webp", 1400)
from_xref(754, "ia-projects.webp", 1400)
from_xref(195, "herramientas-seti.webp", 1200)
from_xref(384, "circuito-fondo.webp", 1438)
from_xref(183, "mapa-peru.webp", 960)
from_xref(39, "tecnico-instalacion.webp", 1100)

# circular illustrations
for xref, name in ((125, "incendio.webp"), (144, "videovigilancia.webp"), (161, "control-acceso.webp"), (169, "redes.webp")):
    from_xref(xref, name, 900, circle=True)
