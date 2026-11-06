import sys, os
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
out = os.path.join(WS, ".review", "assets")
os.makedirs(out, exist_ok=True)
for xref in (28, 182, 384, 60, 474):
    info = doc.extract_image(xref)
    path = os.path.join(out, f"x{xref}.{info['ext']}")
    with open(path, "wb") as fh:
        fh.write(info["image"])
    print(path, info["width"], info["height"])
