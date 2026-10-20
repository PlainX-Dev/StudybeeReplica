#!/usr/bin/env python3
"""Download the official Swedish road-sign artwork from Transportstyrelsen and embed it.

  python tools/fetch_signs.py   -> writes src/signs-official.js

Every sign the app shows comes from Transportstyrelsen's own vägmärken pages
(https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/vagmarken/).
The images are scaled down and stored as data URIs, so the page still works offline.
To add a sign: add its key, official code and image file below, run this script,
then add the key's name in src/scenes.js and src/sv/signs.js.
"""
import base64, io, pathlib, urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://www.transportstyrelsen.se/globalassets/global/vag/vagmarken2/'
MAX = 240  # px on the long side: sharp at the 120px the app draws signs at, on 2x screens

A, B, C, D, E = ('a.-varningsmarken/', 'b.-vajningspliktsmarken/', 'c.-forbudsmarken/',
                 'd.-pabudsmarken/', 'e.-anvisningsmarken/')

# app key -> (official code, path under BASE)
SIGNS = {
    'yield': ('B1', B + 'b01.-vajningsplikt/b1-1.png'),
    'stop': ('B2', B + 'b02.-stopplikt/b2-1.png'),
    'ped-crossing': ('B3', B + 'b03.-overgangsstalle/b3-1.png'),
    'main-road': ('B4', B + 'b04.-huvudled/b4-1.png'),
    'end-main-road': ('B5', B + 'b05.-huvudled-upphor/b5-1.png'),
    'oncoming-priority': ('B6', B + 'b06.-vajningsplikt-mot-motande-trafik/b6-1.png'),
    'priority-over-oncoming': ('B7', B + 'b07.-motande-trafik-har-vajningsplikt/b7-1.png'),
    'bike-crossing': ('B8', B + 'b08.-cykeloverfart/b8-1.png'),
    'w-curve-left': ('A1', A + 'a01.-varning-for-farlig-kurva/a1-1.png'),
    'w-curve-right': ('A1', A + 'a01.-varning-for-farlig-kurva/a1-2.png'),
    'w-steep-down': ('A3', A + 'a03.-varning-for-nedforslutning/a3-1.png'),
    'w-narrowing': ('A5', A + 'a05.-varning-for-avsmalnande-vag/a5-1.png'),
    'w-bumps': ('A9', A + 'a09.-varning-for-farthinder/a9-1.png'),
    'w-slippery': ('A10', A + 'a10.-varning-for-slirig-vag/a10-1.png'),
    'w-pedestrian-crossing': ('A13', A + 'a13.-varning-for-overgangsstalle/a13-1.png'),
    'w-children': ('A15', A + 'a15.-varning-for-barn/a15-1.png'),
    'w-cyclists': ('A16', A + 'a16.-varning-for-cyklande-och-mopedforare/a16-1.png'),
    'w-moose': ('A19', A + 'a19.-varning-for-djur/a19-1.png'),
    'w-deer': ('A19', A + 'a19.-varning-for-djur/a19-2.png'),
    'w-roadworks': ('A20', A + 'a20.-varning-for-vagarbete/a20-1.png'),
    'w-traffic-lights': ('A22', A + 'a22.-varning-for-flerfargssignal/a22-1.png'),
    'w-two-way': ('A25', A + 'a25.-varning-for-motande-trafik/a25-1.png'),
    'w-crossroads': ('A28', A + 'a28.-varning-for-vagkorsning/a28-1.png'),
    'w-roundabout': ('A30', A + 'a30.-varning-for-cirkulationsplats/a30-1.png'),
    'w-queue': ('A34', A + 'a34.-varning-for-ko/a34-1.png'),
    'w-level-crossing-gates': ('A35', A + 'a35.-varning-for-jarnvagskorsning-med-bommar/a35-1.png'),
    'w-level-crossing': ('A36', A + 'a36.-varning-for-jarnvagskorsning-utan-bommar/a36-1.png'),
    'w-danger': ('A40', A + 'a40.-varning-for-annan-fara/a40-1.png'),
    'no-entry': ('C1', C + 'c01.-forbud-mot-infart-med-fordon/c1-1.png'),
    'no-vehicles': ('C2', C + 'c02.-forbud-mot-trafik-med-fordon/c2-1.png'),
    'no-left-turn': ('C25', C + 'c25.-forbud-mot-svang-i-korsning/c25-1.png'),
    'no-right-turn': ('C25', C + 'c25.-forbud-mot-svang-i-korsning/c25-2.png'),
    'no-u-turn': ('C26', C + 'c26.-forbud-mot-u-svang/c26-1.png'),
    'no-overtaking': ('C27', C + 'c27.-forbud-mot-omkorning/c27-1.png'),
    'speed-30': ('C31', C + 'c31.-hastighetsbegransning/c31-3.png'),
    'speed-40': ('C31', C + 'c31.-hastighetsbegransning/c31-4.png'),
    'speed-50': ('C31', C + 'c31.-hastighetsbegransning/c31-5.png'),
    'speed-60': ('C31', C + 'c31.-hastighetsbegransning/c31-6.png'),
    'speed-70': ('C31', C + 'c31.-hastighetsbegransning/c31-7.png'),
    'speed-80': ('C31', C + 'c31.-hastighetsbegransning/c31-8.png'),
    'speed-90': ('C31', C + 'c31.-hastighetsbegransning/c31-9.png'),
    'speed-100': ('C31', C + 'c31.-hastighetsbegransning/c31-10.png'),
    'speed-110': ('C31', C + 'c31.-hastighetsbegransning/c31-11.png'),
    'speed-120': ('C31', C + 'c31.-hastighetsbegransning/c31-12.png'),
    'no-parking': ('C35', C + 'c35.-forbud-mot-att-parkera-fordon/c35-1.png'),
    'no-stopping': ('C39', C + 'c39.-forbud-mot-att-stanna-och-parkera-fordon/c39-1.png'),
    'mandatory-straight': ('D1', D + 'd01.-pabjuden-korriktning/d1-3.png'),
    'mandatory-right': ('D1', D + 'd01.-pabjuden-korriktning/d1-5.png'),
    'pass-right': ('D2', D + 'd02.-pabjuden-korbana/d2-1.png'),
    'roundabout-mandatory': ('D3', D + 'd03.-cirkulationsplats/d3-1.png'),
    'bike-path': ('D4', D + 'd04.-pabjuden-cykelbana/d4-1.png'),
    'footpath': ('D5', D + 'd05.-pabjuden-gangbana/d5-1.png'),
    'shared-path': ('D6', D + 'd06.-pabjuden-gang--och-cykelbana/d6-1.png'),
    'bus-lane': ('D10', D + 'd10.-pabjudet-korfalt-eller-korbana-for-fordon-i-linjetrafik-m.fl/d10-1.png'),
    'motorway': ('E1', E + 'e01.-motorvag/e-11.png'),
    'end-motorway': ('E2', E + 'e02.-motorvag-upphor/e2-1.png'),
    'expressway': ('E3', E + 'e03.-motortrafikled/e3-1.png'),
    'pedestrian-zone': ('E9', E + 'e09.-gangfartsomrade/e9-1.png'),
    'one-way': ('E16', E + 'e16.-enkelriktad-trafik/e16-2.png'),
    'dead-end': ('E17', E + 'e17.-atervandsvag/e17-1.png'),
    'meeting-place': ('E18', E + 'e18.-motesplats/e18-1.png'),
    'parking': ('E19', E + 'e19.-parkering/e19-1.png'),
    'speed-camera': ('E24', E + 'e24.-automatisk-trafikovervakning/e24-1.png'),
}


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 (korkort30 sign fetch)'})
    return urllib.request.urlopen(req, timeout=30).read()


def shrink(raw):
    im = Image.open(io.BytesIO(raw)).convert('RGBA')
    im.thumbnail((MAX, MAX), Image.LANCZOS)
    im = im.quantize(colors=64, method=Image.Quantize.FASTOCTREE)  # signs use a handful of colours; keeps the page small
    out = io.BytesIO()
    im.save(out, 'PNG', optimize=True)
    return im.size, out.getvalue()


if __name__ == '__main__':
    lines = ['/* Generated by tools/fetch_signs.py. Do not edit.',
             ' * Official road-sign artwork from Transportstyrelsen (vägmärkesförordningen, SFS 2007:90),',
             ' * downloaded from transportstyrelsen.se. key: [official code, width, height, data URI] */',
             'window.SIGN_ART = {']
    for key, (code, path) in SIGNS.items():
        (w, h), png = shrink(fetch(path))
        lines.append(f"  '{key}': ['{code}', {w}, {h}, 'data:image/png;base64,{base64.b64encode(png).decode()}'],")
        print(f'{key:24} {code:4} {w}x{h} {len(png) // 1024} KB')
    lines.append('};')
    out = ROOT / 'src' / 'signs-official.js'
    out.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('wrote', out, f'({out.stat().st_size // 1024} KB)')
