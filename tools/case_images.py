import os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
IMG = os.path.join(WS, "seti-technology", "public", "images")
W, H = 1600, 1000


def gradient(top, bottom):
    img = Image.new("RGB", (W, H), bottom)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        color = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=color)
    return img


def add_glow(base, center, radius, color, strength=0.55):
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(layer).ellipse(
        (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius), fill=color
    )
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.45))
    layer = layer.point(lambda v: int(v * strength))
    return ImageChops.add(base, layer)


def make(src, out, accent=(41, 226, 249)):
    base = gradient((13, 48, 74), (4, 20, 31))
    base = add_glow(base, (1150, 380), 520, (10, 70, 92), 0.9)
    base = add_glow(base, (300, 900), 420, (8, 50, 70), 0.7)
    canvas = base.convert("RGBA")

    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 64):
        gd.line([(x, 0), (x, H)], fill=(41, 226, 249, 14))
    for y in range(0, H, 64):
        gd.line([(0, y), (W, y)], fill=(41, 226, 249, 14))
    canvas.alpha_composite(grid)

    art = Image.open(os.path.join(IMG, src)).convert("RGBA")
    size = 860
    art = art.resize((size, int(art.height * size / art.width)), Image.LANCZOS)

    cx, cy = 1080, 500
    halo = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(halo).ellipse((cx - 300, cy - 300, cx + 300, cy + 300), fill=accent)
    halo = halo.filter(ImageFilter.GaussianBlur(110))
    halo = halo.point(lambda v: int(v * 0.35))
    canvas = ImageChops.add(canvas.convert("RGB"), halo).convert("RGBA")
    canvas.alpha_composite(art, (cx - size // 2, cy - art.height // 2))

    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for y in range(H):
        a = int(120 * max(0, (y - H * 0.55) / (H * 0.45)))
        sd.line([(0, y), (W, y)], fill=(4, 20, 31, a))
    canvas.alpha_composite(shade)

    canvas.convert("RGB").save(os.path.join(IMG, out), "WEBP", quality=86, method=5)
    print(out, os.path.getsize(os.path.join(IMG, out)) // 1024, "KB")


make("videovigilancia.webp", "caso-retail.webp")
make("incendio.webp", "caso-pesquera.webp")
make("control-acceso.webp", "caso-campus.webp")
make("redes.webp", "caso-redes.webp")
make("videovigilancia.webp", "caso-mineria.webp", accent=(61, 187, 200))
