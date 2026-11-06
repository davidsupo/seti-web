import sys, os
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf
from PIL import Image, ImageDraw, ImageFilter

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
IMG = os.path.join(WS, "seti-technology", "public", "images")

TARGETS = [
    (125, "incendio.webp"),
    (144, "videovigilancia.webp"),
    (161, "control-acceso.webp"),
    (169, "redes.webp"),
]


def extract(xref):
    info = doc.extract_image(xref)
    from io import BytesIO

    return Image.open(BytesIO(info["image"])).convert("RGBA")


for xref, name in TARGETS:
    img = extract(xref)

    # Recorta el contenido real (descarta el fondo negro del PNG original)
    gray = img.convert("L").point(lambda v: 255 if v > 26 else 0)
    bbox = gray.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Lienzo cuadrado centrado
    side = max(img.width, img.height)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(img, ((side - img.width) // 2, (side - img.height) // 2))

    mask = Image.new("L", (side, side), 0)
    inset = int(side * 0.012)
    ImageDraw.Draw(mask).ellipse((inset, inset, side - inset, side - inset), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(side * 0.002))
    square.putalpha(mask)

    out = square.resize((900, 900), Image.LANCZOS)
    path = os.path.join(IMG, name)
    out.save(path, "WEBP", quality=86, method=5)
    print(name, out.size, os.path.getsize(path) // 1024, "KB")
