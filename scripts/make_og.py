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
NAVY = (0x0B, 0x29, 0x3F)
WHITE = (255, 255, 255)
MIST = (0xCA, 0xDA, 0xE7)
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

    # 2026-11-07 改版：分享圖直接說產品（與首頁主標一致），品牌標語只留 Turn Information into Insight.
    d = ImageDraw.Draw(im)
    d.text((80, 212), "台股 AI 財報預估", font=font(32, True), fill=(0x86, 0xC5, 0xFA))
    d.text((80, 262), "輸入股票代號，", font=font(76, True), fill=WHITE)
    d.text((80, 352), "7 分鐘完成財報預估。", font=font(76, True), fill=WHITE)
    d.text((80, 470), "每一項財務假設都附上出處　·　未來三年三表與 EPS", font=font(30), fill=MIST)
    d.text((80, 545), "Turn Information into Insight.", font=font(26), fill=GRAY)
    d.text((W - 80 - d.textlength("infoflask.com", font=font(26)), 545), "infoflask.com", font=font(26), fill=GRAY)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(OUT, optimize=True)
    print(f"written {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
