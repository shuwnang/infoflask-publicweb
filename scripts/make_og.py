#!/usr/bin/env python3
"""產生 Open Graph 分享圖 public/og.png（1200×630），使用正式 logo（public/logo-white.svg）。
用法：python3 scripts/make_og.py   （需要 Pillow、PyMuPDF 與系統 Noto Sans CJK 字型）
"""
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og.png"
LOGO = ROOT / "public" / "logo-white.svg"
NAVY = (0x13, 0x24, 0x3A)
WHITE = (255, 255, 255)
MIST = (0xDD, 0xE5, 0xEF)
GRAY = (0x9A, 0xA7, 0xB5)


def font(size: int, bold: bool = False):
    cands = [
        f"/usr/share/fonts/opentype/noto/NotoSansCJK-{'Bold' if bold else 'Regular'}.ttc",
        f"/usr/share/fonts/opentype/noto/NotoSansCJK-{'Black' if bold else 'Medium'}.ttc",
    ]
    for c in cands:
        if Path(c).exists():
            return ImageFont.truetype(c, size, index=2)  # index 2 = TC
    return ImageFont.load_default()


def render_logo(width: int) -> Image.Image:
    doc = pymupdf.open(str(LOGO))
    page = doc[0]
    zoom = width / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=True)
    return Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)


def main() -> None:
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), NAVY)
    glow = Image.new("RGB", (W, H), NAVY)
    gd = ImageDraw.Draw(glow)
    for r in range(420, 0, -6):
        a = int(18 * (1 - r / 420))
        gd.ellipse((W - 200 - r, -150 - r, W - 200 + r, -150 + r), fill=(NAVY[0] + a, NAVY[1] + a, NAVY[2] + a))
    im = Image.blend(im, glow, 0.9).convert("RGBA")

    logo = render_logo(300)
    im.alpha_composite(logo, (80, 80))

    d = ImageDraw.Draw(im)
    d.text((80, 230), "Turn Information", font=font(84, True), fill=WHITE)
    d.text((80, 325), "into Insight.", font=font(84, True), fill=(0x9F, 0xD9, 0xD3))
    d.text((80, 455), "讓 AI 融入投資研究，讓投資更簡單。", font=font(36), fill=MIST)
    d.text((80, 540), "AI 模擬財務報表　·　Your Research, Your Model.", font=font(26), fill=GRAY)
    d.text((W - 80 - d.textlength("infoflask.com", font=font(26)), 540), "infoflask.com", font=font(26), fill=GRAY)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(OUT, optimize=True)
    print(f"written {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
