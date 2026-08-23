import os
from PIL import Image

src_path = '/home/lezscripts/.gemini/antigravity/brain/b873d450-24ff-4037-9180-637561b12405/media__1787465688825.jpg'
out_path = '/home/lezscripts/Downloads/Portfolio/public/profile.png'

try:
    from rembg import remove
    print("Trying rembg...")
    img = Image.open(src_path)
    out = remove(img)
    out.save(out_path)
    print("SUCCESS_REMBG")
except Exception as e:
    print("Using PIL color distance thresholding...", e)
    img = Image.open(src_path).convert("RGBA")
    pixdata = img.load()
    width, height = img.size

    bg_r, bg_g, bg_b, _ = pixdata[10, 10]

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixdata[x, y]
            dist = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2) ** 0.5
            if dist < 45:
                pixdata[x, y] = (r, g, b, 0)
            elif dist < 80:
                alpha = int(((dist - 45) / 35.0) * 255)
                pixdata[x, y] = (r, g, b, alpha)
            else:
                pixdata[x, y] = (r, g, b, 255)

    img.save(out_path)
    print("SUCCESS_PIL")
