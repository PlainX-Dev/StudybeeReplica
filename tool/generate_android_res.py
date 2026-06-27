#!/usr/bin/env python3
"""Generate Android launcher-icon mipmaps, the adaptive-icon foreground and the
native splash drawable from the same bee artwork used for the Flutter assets."""

import os

from PIL import Image

from generate_assets import _draw_bee, YELLOW

ROOT = os.path.join(os.path.dirname(__file__), "..")
RES = os.path.join(ROOT, "android", "app", "src", "main", "res")

# density bucket -> scale factor
DENSITIES = {
    "mdpi": 1,
    "hdpi": 1.5,
    "xhdpi": 2,
    "xxhdpi": 3,
    "xxxhdpi": 4,
}


def out(path, img):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print("wrote", os.path.relpath(path, ROOT), img.size)


def main():
    for bucket, scale in DENSITIES.items():
        # --- legacy square launcher icon (yellow bg + bee) ---
        size = int(48 * scale)
        full = Image.new("RGBA", (size, size), YELLOW)
        full.alpha_composite(_draw_bee(size, pad_ratio=0.16))
        out(os.path.join(RES, f"mipmap-{bucket}", "ic_launcher.png"), full)

        # --- adaptive foreground (108dp, transparent, padded safe zone) ---
        fsize = int(108 * scale)
        fg = _draw_bee(fsize, pad_ratio=0.42)
        out(os.path.join(RES, f"mipmap-{bucket}", "ic_launcher_foreground.png"),
            fg)

        # --- native splash logo (transparent bee centred on yellow window) ---
        ssize = int(150 * scale)
        out(os.path.join(RES, f"drawable-{bucket}", "splash_logo.png"),
            _draw_bee(ssize, pad_ratio=0.10))

    # fallback splash for the density-less drawable/ folder
    out(os.path.join(RES, "drawable", "splash_logo.png"),
        _draw_bee(225, pad_ratio=0.10))


if __name__ == "__main__":
    main()
