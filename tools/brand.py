import sys, os
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
sys.path.insert(0, os.path.join(WS, ".pydeps"))
import pymupdf
from PIL import Image

doc = pymupdf.open(os.path.join(WS, "BROCHURE SETI (2).pdf"))
for xref in (28, 182):
    print(xref, "SMask:", doc.xref_get_key(xref, "SMask"))
    pix = pymupdf.Pixmap(doc, xref)
    print("  pix", pix.width, pix.height, pix.n, pix.alpha)
    out = os.path.join(WS, ".review", "assets", f"pix{xref}.png")
    pix.save(out)
    print("  saved", out)
