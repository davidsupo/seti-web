import sys, os
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf
from PIL import Image

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
xref = 28
pix = pymupdf.Pixmap(doc, xref)
smask = doc.xref_get_key(xref, "SMask")
mask = pymupdf.Pixmap(doc, int(smask[1].split()[0]))
pix = pymupdf.Pixmap(pix, mask)
logo = Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)
logo = logo.crop(logo.getchannel("A").getbbox())

light = logo.copy()
px = light.load()
for y in range(light.height):
    for x in range(light.width):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        if g > 120 and b > 130:  # teal / cyan accents keep brand colour
            px[x, y] = (110, 235, 255, a)
        else:
            px[x, y] = (255, 255, 255, a)

light.save(os.path.join(WS, "seti-technology", "public", "brand", "seti-logo-light.png"))
print("ok", light.size)
