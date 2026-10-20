#!/usr/bin/env python3
"""Draw the app icons (yellow tile with a red give-way triangle) into src/static/."""
import pathlib
from PIL import Image, ImageDraw

OUT = pathlib.Path(__file__).parent.parent / 'src' / 'static'
YELLOW, YELLOW_DARK, RED = (255, 205, 0), (245, 184, 0), (210, 38, 48)

def icon(size, rounded=True, pad=0.0):
    s = size * 4  # supersample
    im = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for y in range(s):  # vertical gradient
        t = y / s
        c = tuple(int(YELLOW[i] * (1 - t) + YELLOW_DARK[i] * t) for i in range(3))
        d.line([(0, y), (s, y)], fill=c + (255,))
    if rounded:
        mask = Image.new('L', (s, s), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.225), fill=255)
        im.putalpha(mask)
    m = s * (0.2 + pad)
    w = s - 2 * m
    tri = [(m, m + w * 0.12), (s - m, m + w * 0.12), (s / 2, m + w * 0.98)]
    d.polygon(tri, fill=RED)
    inset = w * 0.2
    d.polygon([(m + inset, m + w * 0.12 + inset * 0.55), (s - m - inset, m + w * 0.12 + inset * 0.55), (s / 2, m + w * 0.98 - inset * 1.1)], fill=YELLOW)
    return im.resize((size, size), Image.LANCZOS)

def badge(size):
    s = size * 4
    im = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    m = s * 0.12
    d.polygon([(m, m * 1.4), (s - m, m * 1.4), (s / 2, s - m)], fill=(255, 255, 255, 255))
    d.polygon([(m * 2.6, m * 2.2), (s - m * 2.6, m * 2.2), (s / 2, s - m * 2.9)], fill=(0, 0, 0, 0))
    return im.resize((size, size), Image.LANCZOS)

OUT.mkdir(parents=True, exist_ok=True)
icon(192).save(OUT / 'icon-192.png')
icon(512).save(OUT / 'icon-512.png')
icon(512, rounded=False, pad=0.08).save(OUT / 'icon-maskable-512.png')
icon(180, rounded=False).convert('RGB').save(OUT / 'apple-touch-icon.png')
badge(72).save(OUT / 'badge-72.png')
print('icons written to', OUT)
