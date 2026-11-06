import sys, os
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf
from PIL import Image

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
out = os.path.join(WS, ".review", "assets2")
os.makedirs(out, exist_ok=True)
xrefs = [32, 33, 39, 79, 545, 125, 144, 161, 169, 195, 754, 183, 730, 384]
for xref in xrefs:
    info = doc.extract_image(xref)
    path = os.path.join(out, f"x{xref}.{info['ext']}")
    with open(path, "wb") as fh:
        fh.write(info["image"])
    im = Image.open(path)
    print(xref, im.size, im.mode, info["ext"])

# logo alpha probe
logo = Image.open(os.path.join(WS, ".review", "assets", "x28.png"))
print("logo", logo.size, logo.mode)
logo = logo.convert("RGBA")
corners = [logo.getpixel(p) for p in [(0, 0), (479, 0), (0, 215), (479, 215), (240, 5)]]
print("corners", corners)
