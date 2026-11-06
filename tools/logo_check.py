import os
from PIL import Image
WS = r"C:\Users\SAID\OneDrive\Documentos\DeepSeek"
base = os.path.join(WS, "seti-technology", "public", "brand")
light = Image.open(os.path.join(base, "seti-logo-light.png"))
dark = Image.open(os.path.join(base, "seti-logo-dark.png"))
for name, logo, bgc in (("light", light, (11, 39, 72)), ("dark", dark, (255, 255, 255))):
    canvas = Image.new("RGBA", (logo.width + 60, logo.height + 60), bgc + (255,))
    canvas.alpha_composite(logo, (30, 30))
    out = os.path.join(WS, ".review", f"logo-{name}-check.png")
    canvas.save(out)
    print(out)
