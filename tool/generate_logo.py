#!/usr/bin/env python3
"""Build the Study Bee logo as a vector (SVG) and rasterise every icon/splash
asset from it.

The mark is an original rendition of the "bee with a pencil-tip body" study
mascot: a black bee, tilted, whose striped abdomen tapers into a sharpened
pencil point, sitting on a honey-yellow squircle."""

import os

import cairosvg

ROOT = os.path.join(os.path.dirname(__file__), "..")
YELLOW = "#FFCC00"
BLACK = "#1A1A1A"

# ---- the bee, drawn upright in a 512 box, centred on (256,256) ----
# It is rotated as a whole to give the diagonal "flying down-left" pose.
BEE = f"""
  <!-- antennae -->
  <g stroke="{BLACK}" stroke-width="8" stroke-linecap="round" fill="{BLACK}">
    <path d="M242,116 Q220,86 206,68" fill="none"/>
    <path d="M270,116 Q294,88 308,72" fill="none"/>
    <circle cx="204" cy="64" r="12"/>
    <circle cx="310" cy="68" r="12"/>
  </g>

  <!-- wings (separated from the body by a thin yellow outline) -->
  <g fill="{BLACK}" stroke="{YELLOW}" stroke-width="6">
    <ellipse cx="198" cy="176" rx="30" ry="52"
             transform="rotate(-32 198 176)"/>
    <ellipse cx="314" cy="176" rx="30" ry="52"
             transform="rotate(32 314 176)"/>
  </g>

  <!-- head -->
  <circle cx="256" cy="150" r="46" fill="{BLACK}"/>

  <!-- thorax -->
  <ellipse cx="256" cy="202" rx="46" ry="40" fill="{BLACK}"/>

  <!-- abdomen tapering to a pencil point -->
  <defs>
    <clipPath id="abclip">
      <path d="M210,236 C196,300 232,404 256,440
               C280,404 316,300 302,236
               C282,210 230,210 210,236 Z"/>
    </clipPath>
  </defs>
  <path d="M210,236 C196,300 232,404 256,440
           C280,404 316,300 302,236
           C282,210 230,210 210,236 Z" fill="{BLACK}"/>
  <!-- yellow stripe gaps + the sharpened-wood collar near the tip -->
  <g clip-path="url(#abclip)" fill="{YELLOW}">
    <rect x="180" y="280" width="152" height="15"/>
    <rect x="180" y="318" width="152" height="15"/>
    <rect x="180" y="356" width="152" height="15"/>
    <rect x="180" y="396" width="152" height="15"/>
  </g>
"""


def svg_doc(with_bg: bool, fill_frac: float) -> str:
    # base bee spans roughly y 52..440 (~388 tall), centred near (256,256)
    k = 512 * fill_frac / 388.0
    bg = (
        f'<rect x="0" y="0" width="512" height="512" rx="116" ry="116" '
        f'fill="{YELLOW}"/>' if with_bg else ""
    )
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  {bg}
  <g transform="translate(256 256) rotate(-28) scale({k:.4f}) translate(-256 -256)">
  {BEE}
  </g>
</svg>
"""


def render(svg: str, path: str, size: int):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=path,
                     output_width=size, output_height=size)
    print("wrote", os.path.relpath(path, ROOT), f"{size}x{size}")


DENSITIES = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}


def main():
    full = svg_doc(with_bg=True, fill_frac=0.72)
    fg = svg_doc(with_bg=False, fill_frac=0.56)   # adaptive safe zone
    bee = svg_doc(with_bg=False, fill_frac=0.84)  # plain transparent bee

    # canonical vector deliverables
    for name, doc in (("logo.svg", full), ("logo_bee.svg", bee)):
        p = os.path.join(ROOT, "assets", name)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w") as f:
            f.write(doc)
        print("wrote", os.path.relpath(p, ROOT))

    # Flutter assets
    render(bee, os.path.join(ROOT, "assets", "images", "logo.png"), 512)
    render(full, os.path.join(ROOT, "assets", "icon", "icon.png"), 1024)
    render(fg, os.path.join(ROOT, "assets", "icon", "foreground.png"), 1024)
    render(bee, os.path.join(ROOT, "assets", "icon", "splash.png"), 768)

    # Android resources
    res = os.path.join(ROOT, "android", "app", "src", "main", "res")
    for bucket, s in DENSITIES.items():
        render(full, os.path.join(res, f"mipmap-{bucket}", "ic_launcher.png"),
               int(48 * s))
        render(fg, os.path.join(res, f"mipmap-{bucket}",
                                "ic_launcher_foreground.png"), int(108 * s))
        render(bee, os.path.join(res, f"drawable-{bucket}", "splash_logo.png"),
               int(150 * s))
    render(bee, os.path.join(res, "drawable", "splash_logo.png"), 225)


if __name__ == "__main__":
    main()
