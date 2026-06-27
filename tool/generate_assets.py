#!/usr/bin/env python3
"""Generate the Study Bee logo / launcher icon assets.

Draws a friendly bee on a honey-yellow background. Everything is rendered at 4x
supersampling and downscaled for clean anti-aliased edges. The bee artwork here
is original (not a copy of any existing logo)."""

import math
import os
from PIL import Image, ImageDraw

YELLOW = (255, 196, 0, 255)      # honey background  #FFC400
BODY = (247, 184, 0, 255)        # bee body gold
BODY_EDGE = (30, 30, 30, 255)
BLACK = (28, 28, 28, 255)
WHITE = (255, 255, 255, 255)
WING = (255, 255, 255, 150)
WING_EDGE = (255, 255, 255, 220)

SS = 4  # supersample factor


def _draw_bee(size, pad_ratio):
    """Return an RGBA image (size x size, transparent) containing a centred bee.

    pad_ratio controls how much empty margin surrounds the bee (bigger = smaller
    bee, used for adaptive-icon safe zones)."""
    S = size * SS
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # overall bee bounding box
    span = S * (1 - pad_ratio)
    # the head extends left and the wings/antennae extend up, so nudge the
    # drawing origin right/down to optically centre the whole bee.
    cx, cy = S / 2 + span * 0.10, S / 2 + span * 0.11
    bw = span * 0.74          # body width
    bh = span * 0.52          # body height

    # ---- wings (behind body) ----
    wing_w, wing_h = bw * 0.46, bh * 0.95
    for sign in (-1, 1):
        wx = cx + sign * bw * 0.12
        wy = cy - bh * 0.62
        wing = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        wd = ImageDraw.Draw(wing)
        wd.ellipse([wx - wing_w / 2, wy - wing_h / 2,
                    wx + wing_w / 2, wy + wing_h / 2],
                   fill=WING, outline=WING_EDGE, width=int(S * 0.006))
        wing = wing.rotate(sign * -18, center=(wx, wy))
        img.alpha_composite(wing)
    d = ImageDraw.Draw(img)

    # ---- body ----
    body_box = [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2]
    edge = int(S * 0.012)
    d.ellipse(body_box, fill=BODY, outline=BODY_EDGE, width=edge)

    # ---- stripes (clipped to body) ----
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).ellipse(body_box, fill=255)
    stripes = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stripes)
    sw = bw * 0.13
    for off in (-0.16, 0.12, 0.40):
        x = cx + bw * off
        sd.rectangle([x - sw / 2, cy - bh, x + sw / 2, cy + bh], fill=BLACK)
    # stinger
    tipx = cx + bw / 2
    sd.polygon([(tipx - sw * 0.2, cy - bh * 0.12),
                (tipx + bw * 0.16, cy),
                (tipx - sw * 0.2, cy + bh * 0.12)], fill=BLACK)
    img.paste(stripes, (0, 0), Image.composite(stripes, Image.new("RGBA", (S, S)), mask).split()[3])
    img.alpha_composite(Image.composite(stripes, Image.new("RGBA", (S, S), (0, 0, 0, 0)), mask))
    d = ImageDraw.Draw(img)

    # ---- head ----
    head_r = bh * 0.46
    hx = cx - bw / 2 - head_r * 0.35
    hy = cy
    d.ellipse([hx - head_r, hy - head_r, hx + head_r, hy + head_r],
              fill=BLACK)

    # antennae
    aw = int(S * 0.010)
    for sign in (-1, -0.4):
        ax = hx + head_r * 0.2
        ay = hy - head_r * 0.7
        ex = ax - head_r * 0.5 + sign * head_r * 0.1
        ey = ay - head_r * 0.9
        d.line([(ax, ay), (ex, ey)], fill=BLACK, width=aw)
        dr = head_r * 0.16
        d.ellipse([ex - dr, ey - dr, ex + dr, ey + dr], fill=BLACK)

    # eye + smile
    er = head_r * 0.22
    ex = hx - head_r * 0.15
    ey = hy - head_r * 0.18
    d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=WHITE)
    d.ellipse([ex - er * 0.45, ey - er * 0.25, ex + er * 0.35, ey + er * 0.55],
              fill=BLACK)
    # smile
    smr = head_r * 0.5
    d.arc([hx - smr, hy - smr * 0.1, hx + smr, hy + smr * 1.2],
          start=20, end=140, fill=WHITE, width=int(S * 0.009))

    return img.resize((size, size), Image.LANCZOS)


def save(path, img):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print("wrote", path, img.size)


def main():
    root = os.path.join(os.path.dirname(__file__), "..")
    icon_dir = os.path.join(root, "assets", "icon")
    img_dir = os.path.join(root, "assets", "images")

    # Full launcher icon: bee on yellow honey background, rounded by launcher.
    full = Image.new("RGBA", (1024, 1024), YELLOW)
    full.alpha_composite(_draw_bee(1024, pad_ratio=0.18))
    save(os.path.join(icon_dir, "icon.png"), full)

    # Adaptive foreground: transparent, extra padding for the safe zone.
    fg = _draw_bee(1024, pad_ratio=0.42)
    save(os.path.join(icon_dir, "foreground.png"), fg)

    # Native splash image (transparent bee, sits on yellow splash bg).
    save(os.path.join(icon_dir, "splash.png"), _draw_bee(768, pad_ratio=0.22))

    # In-app logo used on the Flutter splash screen.
    save(os.path.join(img_dir, "logo.png"), _draw_bee(512, pad_ratio=0.12))


if __name__ == "__main__":
    main()
