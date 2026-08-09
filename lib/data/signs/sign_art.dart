/// Vector building blocks for the road sign library.
///
/// Every sign is a 100×100 SVG. Frames (triangle, disc, rectangle) carry the
/// official Swedish colours; pictograms are drawn in a single flat geometric
/// style so the whole set reads as one designed family rather than 200
/// mismatched tracings.
library;

import 'dart:math' as math;

/// Builds a polygon path with each corner rounded off by [r], the way real
/// pressed-aluminium signs are — vertices are trimmed back along both edges
/// and joined with a curve through the original corner point.
String _roundedPolygon(List<List<double>> pts, double r) {
  final n = pts.length;
  List<double> toward(List<double> from, List<double> to, double d) {
    final dx = to[0] - from[0], dy = to[1] - from[1];
    final len = math.sqrt(dx * dx + dy * dy);
    final t = d / len;
    return [from[0] + dx * t, from[1] + dy * t];
  }

  final entries = <List<double>>[];
  final exits = <List<double>>[];
  for (var i = 0; i < n; i++) {
    final prev = pts[(i - 1 + n) % n];
    final cur = pts[i];
    final next = pts[(i + 1) % n];
    entries.add(toward(cur, prev, r));
    exits.add(toward(cur, next, r));
  }

  String p(List<double> pt) => '${pt[0].toStringAsFixed(2)} ${pt[1].toStringAsFixed(2)}';

  final b = StringBuffer('M ${p(entries[0])} ');
  for (var i = 0; i < n; i++) {
    b.write('Q ${p(pts[i])} ${p(exits[i])} ');
    b.write('L ${p(entries[(i + 1) % n])} ');
  }
  b.write('Z');
  return b.toString();
}

// ── Official colours ───────────────────────────────────────────────────────

const kYellow = '#FFCC00';
const kRed = '#C8102E';
const kBlue = '#0057A6';
const kBlack = '#1A1A1A';
const kWhite = '#FFFFFF';
const kGreen = '#00784E';
const kGrey = '#5A5A66';
const kBrown = '#7A4F2A';

String _doc(String body) =>
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">$body</svg>';

/// Places a pictogram (drawn in its own 0–100 box) inside a frame.
String place(String art, {double scale = 0.5, double dx = 0, double dy = 0}) {
  final t = 50 - 50 * scale;
  return '<g transform="translate(${(t + dx).toStringAsFixed(2)},'
      '${(t + dy).toStringAsFixed(2)}) scale(${scale.toStringAsFixed(3)})">$art</g>';
}

// ── Frames ─────────────────────────────────────────────────────────────────

const _warnTriangle = [
  [50.0, 4.0],
  [97.0, 89.0],
  [3.0, 89.0],
];

const _giveWayTriangle = [
  [3.0, 11.0],
  [97.0, 11.0],
  [50.0, 94.0],
];

/// A — warning. Yellow triangle, red border, black pictogram. Corners are
/// rounded like the real pressed-metal plate, not sharp vector points.
String warn(String art, {double scale = 0.44, double dx = 0, double dy = 8}) => _doc(
      '<path d="${_roundedPolygon(_warnTriangle, 9)}" fill="$kYellow" stroke="$kRed" '
      'stroke-width="8" stroke-linejoin="round"/>${place(art, scale: scale, dx: dx, dy: dy)}',
    );

/// B1 — give way. Inverted triangle, no pictogram. Official Swedish B1 signs
/// (Transportstyrelsen) use the same yellow field as warning signs.
String giveWay() => _doc(
      '<path d="${_roundedPolygon(_giveWayTriangle, 9)}" fill="$kYellow" stroke="$kRed" '
      'stroke-width="8" stroke-linejoin="round"/>',
    );

/// B2 — stop. Red octagon; the word STOP is drawn as an overlay.
String stopOctagon() => _doc(
      '<path d="M31 3 H69 L97 31 V69 L69 97 H31 L3 69 V31 Z" fill="$kRed" '
      'stroke="$kWhite" stroke-width="5" stroke-linejoin="round"/>',
    );

/// B4 — priority road. White diamond with a yellow heart.
String priority({bool ended = false}) => _doc(
      '<path d="M50 2 L98 50 L50 98 L2 50 Z" fill="$kWhite" stroke="$kBlack" '
      'stroke-width="2"/><path d="M50 16 L84 50 L50 84 L16 50 Z" fill="$kYellow"/>'
      '${ended ? '<path d="M18 18 L82 82" stroke="$kBlack" stroke-width="7" stroke-linecap="round"/>' : ''}',
    );

/// C — prohibition. Yellow disc inside a red ring.
String prohibit(String art,
        {double scale = 0.52, double dx = 0, double dy = 0, bool slash = false}) =>
    _doc(
      '<circle cx="50" cy="50" r="47" fill="$kRed"/>'
      '<circle cx="50" cy="50" r="36" fill="$kYellow"/>'
      '${place(art, scale: scale, dx: dx, dy: dy)}'
      '${slash ? '<path d="M22 78 L78 22" stroke="$kRed" stroke-width="9" stroke-linecap="round"/>' : ''}',
    );

/// An empty prohibition disc — for signs whose content is a number.
String prohibitPlain() => _doc(
      '<circle cx="50" cy="50" r="47" fill="$kRed"/>'
      '<circle cx="50" cy="50" r="36" fill="$kYellow"/>',
    );

/// C31-style disc used for end-of-restriction signs (grey slash, no red).
String prohibitEnd(String art, {double scale = 0.52}) => _doc(
      '<circle cx="50" cy="50" r="47" fill="$kBlack"/>'
      '<circle cx="50" cy="50" r="43" fill="$kYellow"/>'
      '${place(art, scale: scale)}'
      '<path d="M24 76 L76 24" stroke="$kBlack" stroke-width="7" stroke-linecap="round"/>',
    );

/// D — mandatory. Blue disc, white pictogram.
String mandatory(String art, {double scale = 0.56, double dy = 0}) => _doc(
      '<circle cx="50" cy="50" r="47" fill="$kWhite"/>'
      '<circle cx="50" cy="50" r="44" fill="$kBlue"/>'
      '${place(art, scale: scale, dy: dy)}',
    );

/// E — instruction. Blue rectangle, white pictogram.
String blueBox(String art, {double scale = 0.62, double dy = 0}) => _doc(
      '<rect x="3" y="9" width="94" height="82" rx="6" fill="$kWhite"/>'
      '<rect x="6" y="12" width="88" height="76" rx="4" fill="$kBlue"/>'
      '${place(art, scale: scale, dy: dy)}',
    );

/// Blue rectangle with a white inner panel — the "zone" layout.
String blueZone(String art, {double scale = 0.5, double dy = -4}) => _doc(
      '<rect x="3" y="5" width="94" height="90" rx="6" fill="$kWhite"/>'
      '<rect x="6" y="8" width="88" height="84" rx="4" fill="$kBlue"/>'
      '<rect x="16" y="18" width="68" height="52" rx="3" fill="$kWhite"/>'
      '${place(art, scale: scale, dy: dy)}',
    );

/// F/G — guide and service. White or coloured rectangle.
String panel(String art, {String fill = kWhite, double scale = 0.6, double dy = 0}) =>
    _doc(
      '<rect x="3" y="9" width="94" height="82" rx="6" fill="$kBlack"/>'
      '<rect x="6" y="12" width="88" height="76" rx="4" fill="$fill"/>'
      '${place(art, scale: scale, dy: dy)}',
    );

/// T — supplementary plate hung under another sign.
String plate(String art, {double scale = 0.55}) => _doc(
      '<rect x="3" y="22" width="94" height="56" rx="5" fill="$kRed"/>'
      '<rect x="9" y="28" width="82" height="44" rx="3" fill="$kYellow"/>'
      '${place(art, scale: scale)}',
    );

/// An empty plate — content supplied as an overlay.
String platePlain() => _doc(
      '<rect x="3" y="22" width="94" height="56" rx="5" fill="$kRed"/>'
      '<rect x="9" y="28" width="82" height="44" rx="3" fill="$kYellow"/>',
    );

/// M — road markings, drawn on a strip of asphalt.
String asphalt(String art) => _doc(
      '<rect x="0" y="0" width="100" height="100" rx="6" fill="#3C3C46"/>$art',
    );

// ── Pictogram primitives (each drawn inside its own 0–100 box) ─────────────

const ped = '<g fill="$kBlack"><circle cx="52" cy="12" r="10"/>'
    '<path d="M42 26 h16 l14 24 -8 6 -10 -16 -2 12 12 20 -2 24 h-10 l-2 -22 -12 -18 '
    '-6 22 -10 -3 8 -30 z"/></g>';

const pedWhite = '<g fill="$kWhite"><circle cx="52" cy="12" r="10"/>'
    '<path d="M42 26 h16 l14 24 -8 6 -10 -16 -2 12 12 20 -2 24 h-10 l-2 -22 -12 -18 '
    '-6 22 -10 -3 8 -30 z"/></g>';

const children = '<g fill="$kBlack">'
    '<circle cx="30" cy="16" r="9"/><path d="M22 28 h16 l8 22 -7 4 -6 -12 v10 l7 20 '
    '-2 20 h-9 l-1 -18 -6 -14 -4 32 -9 -1 4 -40 z"/>'
    '<circle cx="70" cy="22" r="8"/><path d="M62 33 h15 l9 20 -6 4 -6 -11 v9 l6 18 '
    '-2 18 h-8 l-1 -16 -5 -12 -4 28 -8 -1 4 -36 z"/></g>';

const bike = '<g fill="none" stroke="$kBlack" stroke-width="7">'
    '<circle cx="22" cy="68" r="20"/><circle cx="78" cy="68" r="20"/>'
    '<path d="M22 68 L42 34 H62 M42 34 L58 68 M62 34 L78 68" stroke-linecap="round"/>'
    '<path d="M36 30 H52" stroke-linecap="round"/></g>';

const bikeWhite = '<g fill="none" stroke="$kWhite" stroke-width="7">'
    '<circle cx="22" cy="68" r="20"/><circle cx="78" cy="68" r="20"/>'
    '<path d="M22 68 L42 34 H62 M42 34 L58 68 M62 34 L78 68" stroke-linecap="round"/>'
    '<path d="M36 30 H52" stroke-linecap="round"/></g>';

const moped = '<g fill="none" stroke="$kBlack" stroke-width="7">'
    '<circle cx="22" cy="72" r="16"/><circle cx="80" cy="72" r="16"/>'
    '<path d="M22 72 H50 l6 -18 h18 M56 54 L72 72" stroke-linecap="round"/>'
    '<path d="M66 40 H82" stroke-linecap="round"/></g>'
    '<circle cx="48" cy="30" r="9" fill="$kBlack"/>';

const motorcycle = '<g fill="none" stroke="$kBlack" stroke-width="8">'
    '<circle cx="20" cy="72" r="18"/><circle cx="80" cy="72" r="18"/>'
    '<path d="M20 72 H44 l10 -20 h20 M54 52 L74 72" stroke-linecap="round"/></g>'
    '<g fill="$kBlack"><circle cx="46" cy="24" r="11"/>'
    '<path d="M38 36 h18 l12 16 -7 6 -9 -10 -4 16 h-14 z"/></g>';

const carFront = '<g fill="$kBlack">'
    '<path d="M14 62 c0-10 4-20 8-26 2-6 8-8 28-8 s26 2 28 8 c4 6 8 16 8 26 v16 '
    'c0 3-2 5-5 5 h-8 c-3 0-5-2-5-5 v-4 H32 v4 c0 3-2 5-5 5 h-8 c-3 0-5-2-5-5 z"/></g>'
    '<path d="M28 40 h44 l6 16 H22 z" fill="$kYellow"/>'
    '<circle cx="26" cy="60" r="5" fill="$kYellow"/><circle cx="74" cy="60" r="5" fill="$kYellow"/>';

const carSide = '<g fill="$kBlack">'
    '<path d="M6 66 v-12 c0-4 3-7 8-9 l10-16 c2-3 5-5 9-5 h26 c4 0 8 2 11 5 l14 16 '
    'c6 2 10 5 10 9 v12 c0 3-2 5-5 5 h-6 a11 11 0 0 0 -22 0 H39 a11 11 0 0 0 -22 0 '
    'h-6 c-3 0-5-2-5-5 z"/>'
    '<circle cx="28" cy="72" r="11"/><circle cx="72" cy="72" r="11"/></g>'
    '<circle cx="28" cy="72" r="4" fill="$kYellow"/><circle cx="72" cy="72" r="4" fill="$kYellow"/>'
    '<path d="M28 44 l7-12 h14 v12 z M55 32 h9 l10 12 H55 z" fill="$kYellow"/>';

const carSideWhite = '<g fill="$kWhite">'
    '<path d="M6 66 v-12 c0-4 3-7 8-9 l10-16 c2-3 5-5 9-5 h26 c4 0 8 2 11 5 l14 16 '
    'c6 2 10 5 10 9 v12 c0 3-2 5-5 5 h-6 a11 11 0 0 0 -22 0 H39 a11 11 0 0 0 -22 0 '
    'h-6 c-3 0-5-2-5-5 z"/>'
    '<circle cx="28" cy="72" r="11"/><circle cx="72" cy="72" r="11"/></g>'
    '<circle cx="28" cy="72" r="4" fill="$kBlue"/><circle cx="72" cy="72" r="4" fill="$kBlue"/>'
    '<path d="M28 44 l7-12 h14 v12 z M55 32 h9 l10 12 H55 z" fill="$kBlue"/>';

const truck = '<g fill="$kBlack">'
    '<path d="M4 30 h50 v40 H4 z"/>'
    '<path d="M58 42 h20 l14 16 v12 H58 z"/>'
    '<circle cx="24" cy="74" r="12"/><circle cx="76" cy="74" r="12"/></g>'
    '<circle cx="24" cy="74" r="5" fill="$kYellow"/><circle cx="76" cy="74" r="5" fill="$kYellow"/>'
    '<path d="M62 46 h13 l8 10 H62 z" fill="$kYellow"/>';

const bus = '<g fill="$kBlack">'
    '<rect x="6" y="24" width="88" height="48" rx="8"/>'
    '<circle cx="26" cy="76" r="10"/><circle cx="74" cy="76" r="10"/></g>'
    '<g fill="$kYellow"><rect x="14" y="32" width="20" height="14" rx="2"/>'
    '<rect x="40" y="32" width="20" height="14" rx="2"/>'
    '<rect x="66" y="32" width="20" height="14" rx="2"/></g>';

const busWhite = '<g fill="$kWhite">'
    '<rect x="6" y="24" width="88" height="48" rx="8"/>'
    '<circle cx="26" cy="76" r="10"/><circle cx="74" cy="76" r="10"/></g>'
    '<g fill="$kBlue"><rect x="14" y="32" width="20" height="14" rx="2"/>'
    '<rect x="40" y="32" width="20" height="14" rx="2"/>'
    '<rect x="66" y="32" width="20" height="14" rx="2"/></g>';

const tractor = '<g fill="$kBlack">'
    '<path d="M20 44 h26 l6-16 h20 v28 H20 z"/>'
    '<circle cx="26" cy="66" r="20"/><circle cx="78" cy="72" r="14"/></g>'
    '<circle cx="26" cy="66" r="8" fill="$kYellow"/><circle cx="78" cy="72" r="6" fill="$kYellow"/>';

const train = '<g fill="$kBlack">'
    '<path d="M24 12 h52 c4 0 6 3 6 6 v50 c0 4-3 6-6 6 H24 c-4 0-6-3-6-6 V18 c0-3 2-6 6-6 z"/>'
    '<rect x="12" y="78" width="76" height="9" rx="4"/>'
    '<path d="M26 90 h48 v6 H26 z"/></g>'
    '<g fill="$kYellow"><rect x="28" y="22" width="18" height="16" rx="2"/>'
    '<rect x="54" y="22" width="18" height="16" rx="2"/>'
    '<circle cx="36" cy="58" r="6"/><circle cx="64" cy="58" r="6"/></g>';

const tram = '<g fill="$kBlack">'
    '<path d="M26 20 h48 c4 0 6 3 6 6 v52 c0 4-3 6-6 6 H26 c-4 0-6-3-6-6 V26 c0-3 2-6 6-6 z"/>'
    '<path d="M48 4 h4 v16 h-4 z"/><path d="M30 8 h40 v4 H30 z"/></g>'
    '<g fill="$kYellow"><rect x="28" y="30" width="44" height="18" rx="2"/>'
    '<circle cx="38" cy="66" r="6"/><circle cx="62" cy="66" r="6"/></g>';

// Animals — one flat construction reused, so the family stays consistent.
String _animal({
  required String antlers,
  double bodyW = 46,
  String fill = kBlack,
}) =>
    '<g fill="$fill">'
    '<rect x="${(50 - bodyW / 2).toStringAsFixed(0)}" y="40" width="${bodyW.toStringAsFixed(0)}" '
    'height="24" rx="10"/>'
    '<path d="M${(50 + bodyW / 2 - 4).toStringAsFixed(0)} 44 l16 -12 6 -14 8 2 -4 16 8 6 -4 10 z"/>'
    '<rect x="${(50 - bodyW / 2 + 3).toStringAsFixed(0)}" y="60" width="7" height="28" rx="3"/>'
    '<rect x="${(50 - bodyW / 2 + 14).toStringAsFixed(0)}" y="60" width="7" height="28" rx="3"/>'
    '<rect x="${(50 + bodyW / 2 - 18).toStringAsFixed(0)}" y="60" width="7" height="28" rx="3"/>'
    '<rect x="${(50 + bodyW / 2 - 8).toStringAsFixed(0)}" y="60" width="7" height="28" rx="3"/>'
    '$antlers</g>';

/// Moose — the broad palmate antlers are the whole recognition cue.
final moose = _animal(
  bodyW: 50,
  antlers: '<path d="M74 20 l-16 -6 -4 -12 8 -2 6 8 8 2 z"/>'
      '<path d="M86 18 l14 -8 6 -12 -8 -4 -6 10 -12 6 z" transform="translate(-14,0)"/>'
      '<path d="M70 8 h10 v6 h-10 z"/>',
);

/// Deer — narrow branched antlers.
final deer = _animal(
  bodyW: 40,
  antlers: '<path d="M72 22 l-2 -18 5 -1 3 12 z"/><path d="M78 22 l4 -16 5 2 -4 15 z"/>'
      '<path d="M70 8 l-8 -6 3 -4 8 6 z"/><path d="M84 8 l8 -6 3 4 -8 6 z"/>',
);

/// Reindeer — heavy curved antlers.
final reindeer = _animal(
  bodyW: 42,
  antlers: '<path d="M72 22 c-6 -12 -14 -14 -20 -12 l2 -6 c10 -2 20 4 24 14 z"/>'
      '<path d="M82 22 c2 -14 10 -20 18 -20 l1 6 c-8 2 -12 8 -13 16 z"/>',
);

/// Cattle — horns, no antlers.
final cattle = _animal(
  bodyW: 50,
  antlers: '<path d="M70 24 c-8 -4 -14 -2 -16 4 l-5 -3 c3 -9 13 -11 22 -6 z"/>'
      '<path d="M84 24 c8 -4 14 -2 16 4 l5 -3 c-3 -9 -13 -11 -22 -6 z"/>',
);

/// Horse — mane instead of horns.
final horse = _animal(
  bodyW: 46,
  antlers: '<path d="M62 32 l14 -12 6 4 -12 14 z"/>',
);

const wildBoar = '<g fill="$kBlack">'
    '<ellipse cx="46" cy="52" rx="30" ry="18"/>'
    '<path d="M72 44 l18 -6 8 8 -6 8 -18 4 z"/>'
    '<path d="M92 52 l8 4 -8 4 z"/>'
    '<rect x="26" y="66" width="7" height="22" rx="3"/><rect x="38" y="66" width="7" height="22" rx="3"/>'
    '<rect x="54" y="66" width="7" height="22" rx="3"/><rect x="64" y="66" width="7" height="22" rx="3"/>'
    '<path d="M16 46 l-10 -8 -2 8 8 8 z"/></g>';

// ── Road-geometry pictograms ───────────────────────────────────────────────

const crossroads = '<g fill="$kBlack"><rect x="42" y="4" width="16" height="92"/>'
    '<rect x="4" y="42" width="92" height="16"/></g>';

const tJunctionRight = '<g fill="$kBlack"><rect x="42" y="4" width="16" height="92"/>'
    '<rect x="50" y="42" width="46" height="16"/></g>';

const tJunctionLeft = '<g fill="$kBlack"><rect x="42" y="4" width="16" height="92"/>'
    '<rect x="4" y="42" width="46" height="16"/></g>';

const tJunctionTop = '<g fill="$kBlack"><rect x="42" y="40" width="16" height="56"/>'
    '<rect x="4" y="24" width="92" height="16"/></g>';

const bendRight = '<path d="M40 96 V52 c0-16 12-26 26-26 h6 l-14 -18 h10 l20 24 -20 24 h-10 '
    'l14 -18 h-6 c-8 0-12 6-12 14 v44 z" fill="$kBlack"/>';

const bendLeft = '<g transform="translate(100,0) scale(-1,1)">$bendRight</g>';

const doubleBendRight = '<path d="M42 96 V66 c0-12 16-12 16-24 V26 l-12 0 18 -20 18 20 h-12 v18 '
    'c0 16-16 14-16 26 v26 z" fill="$kBlack"/>';

const doubleBendLeft = '<g transform="translate(100,0) scale(-1,1)">$doubleBendRight</g>';

const narrowBoth = '<g fill="$kBlack"><path d="M16 96 V56 L34 24 V4 h-8 v18 L8 56 v40 z"/>'
    '<path d="M84 96 V56 L66 24 V4 h8 v18 l18 34 v40 z"/></g>';

const narrowRight = '<g fill="$kBlack"><rect x="14" y="4" width="9" height="92"/>'
    '<path d="M86 96 V56 L68 24 V4 h9 v18 l18 34 v40 z"/></g>';

const narrowLeft = '<g transform="translate(100,0) scale(-1,1)">$narrowRight</g>';

const crest = '<path d="M4 84 C30 84 34 20 50 20 C66 20 70 84 96 84 v10 H4 z" fill="$kBlack"/>';

const dip = '<path d="M4 20 C30 20 34 84 50 84 C66 84 70 20 96 20 v-8 H4 z" fill="$kBlack"/>';

const slipperyRoad = '<g fill="$kBlack">'
    '<path d="M30 12 h40 v44 H30 z" transform="rotate(-8 50 34)"/>'
    '<circle cx="34" cy="20" r="7" transform="rotate(-8 50 34)"/>'
    '<circle cx="66" cy="20" r="7" transform="rotate(-8 50 34)"/></g>'
    '<g stroke="$kBlack" stroke-width="7" fill="none" stroke-linecap="round">'
    '<path d="M22 96 c8 -12 -6 -18 2 -30"/><path d="M78 96 c-8 -12 6 -18 -2 -30"/></g>';

const trafficLight = '<g><rect x="30" y="4" width="40" height="92" rx="8" fill="$kBlack"/>'
    '<circle cx="50" cy="24" r="12" fill="#E4002B"/>'
    '<circle cx="50" cy="50" r="12" fill="#F5A623"/>'
    '<circle cx="50" cy="76" r="12" fill="#2FBF71"/></g>';

const roundaboutArrows = '<g fill="none" stroke="$kBlack" stroke-width="10">'
    '<path d="M50 12 a38 38 0 1 1 -26 66" stroke-linecap="round"/></g>'
    '<path d="M62 4 l-16 8 16 10 z" fill="$kBlack"/>';

/// A single continuous arrow sweeping most of the way around, one
/// arrowhead — the real D3 roundabout pictogram, not two facing arrows.
const roundaboutWhite = '<g fill="none" stroke="$kWhite" stroke-width="9" '
    'stroke-linecap="round"><path d="M50 12 a38 38 0 1 1 -26 66"/></g>'
    '<path d="M60 4 l-17 8 16 10 z" fill="$kWhite"/>';

const exclamation = '<g fill="$kBlack"><rect x="42" y="10" width="16" height="52" rx="7"/>'
    '<circle cx="50" cy="80" r="10"/></g>';

const roadworks = '<g fill="$kBlack"><circle cx="40" cy="12" r="9"/>'
    '<path d="M30 26 h20 l6 12 -8 6 -4 -8 v10 l6 14 -2 24 h-9 l-1 -20 -8 -14 z"/>'
    '<path d="M52 40 L84 74" stroke="$kBlack" stroke-width="8" stroke-linecap="round"/>'
    '<path d="M78 62 l18 18 -8 8 -18 -18 z"/>'
    '<rect x="20" y="88" width="60" height="8" rx="3"/></g>';

const fallingRocks = '<g fill="$kBlack"><path d="M14 6 h10 v76 c0 6 4 10 10 10 h-20 z"/>'
    '<path d="M44 30 l12 -6 8 10 -8 8 z"/><path d="M64 54 l14 -4 6 12 -12 6 z"/>'
    '<path d="M40 70 l10 -2 4 10 -10 4 z"/><path d="M74 82 l12 -2 4 10 -12 2 z"/></g>';

const steepUp = '<g fill="$kBlack"><path d="M6 88 L94 20 v68 z"/></g>';
const steepDown = '<g fill="$kBlack"><path d="M94 88 L6 20 v68 z"/></g>';

const wind = '<g fill="$kBlack"><rect x="8" y="6" width="8" height="88" rx="3"/>'
    '<path d="M18 14 l70 12 -70 22 z"/></g>';

const snowflake = '<g stroke="$kBlack" stroke-width="8" stroke-linecap="round">'
    '<path d="M50 8 V92 M14 29 L86 71 M86 29 L14 71"/>'
    '<path d="M36 18 L50 30 L64 18 M36 82 L50 70 L64 82" fill="none"/></g>';

const queue = '<g fill="$kBlack">'
    '<rect x="18" y="8" width="64" height="20" rx="6"/>'
    '<rect x="18" y="40" width="64" height="20" rx="6"/>'
    '<rect x="18" y="72" width="64" height="20" rx="6"/></g>';

const ferry = '<g fill="$kBlack"><path d="M8 62 h84 l-12 26 H20 z"/>'
    '<rect x="28" y="34" width="44" height="24" rx="4"/>'
    '<rect x="44" y="14" width="12" height="20" rx="3"/></g>';

const airplane = '<path d="M50 4 c6 0 8 8 8 18 v10 l36 22 v10 l-36 -10 v20 l12 10 v8 '
    'l-20 -6 -20 6 v-8 l12 -10 v-20 l-36 10 v-10 l36 -22 V22 c0-10 2-18 8-18 z" fill="$kBlack"/>';

const tunnelArt = '<path d="M10 92 V52 a40 40 0 0 1 80 0 v40 H70 V52 a20 20 0 0 0 -40 0 v40 z" '
    'fill="$kBlack"/>';

const bump = '<g fill="$kBlack"><rect x="4" y="70" width="92" height="12"/>'
    '<path d="M28 70 c6 -26 38 -26 44 0 z"/></g>';

const stAndrew = '<g stroke="$kRed" stroke-width="12" stroke-linecap="round">'
    '<path d="M10 30 L90 70 M10 70 L90 30"/></g>';

const barrier = '<g fill="$kBlack"><rect x="6" y="10" width="12" height="80" rx="4"/>'
    '<rect x="16" y="34" width="80" height="14" rx="5"/></g>'
    '<g fill="$kRed"><rect x="30" y="34" width="16" height="14"/>'
    '<rect x="62" y="34" width="16" height="14"/></g>';

const zebra = '<g fill="$kBlack"><path d="M6 96 L26 40 h12 L18 96 z"/>'
    '<path d="M32 96 L52 40 h12 L44 96 z"/><path d="M58 96 L78 40 h12 L70 96 z"/></g>';

// ── Arrows ─────────────────────────────────────────────────────────────────

String arrowUp([String fill = kWhite]) =>
    '<path d="M50 6 L82 44 H64 v46 H36 V44 H18 z" fill="$fill"/>';

String arrowRight([String fill = kWhite]) =>
    '<path d="M94 50 L56 82 V64 H10 V36 h46 V18 z" fill="$fill"/>';

String arrowLeft([String fill = kWhite]) =>
    '<path d="M6 50 L44 18 v18 h46 v28 H44 v18 z" fill="$fill"/>';

String arrowUpRight([String fill = kWhite]) =>
    '<path d="M36 92 V44 c0-14 10-22 24-22 h8 V6 l24 24 -24 24 V38 h-8 c-6 0-10 3-10 10 v44 z" '
    'fill="$fill"/>';

String arrowUpLeft([String fill = kWhite]) =>
    '<g transform="translate(100,0) scale(-1,1)">${arrowUpRight(fill)}</g>';

String arrowsBoth([String fill = kWhite]) =>
    '<path d="M6 50 L34 26 v14 h32 V26 l28 24 -28 24 V60 H34 v14 z" fill="$fill"/>';

/// Two arrows for the meeting signs — one red, one black or white.
String meetingArrows({required bool youGiveWay}) {
  final up = youGiveWay ? kRed : kBlack;
  final down = youGiveWay ? kBlack : kRed;
  return '<path d="M32 92 V26 l-12 0 18 -20 18 20 h-12 v66 z" fill="$up" '
      'transform="translate(-6,0)"/>'
      '<path d="M68 8 v66 l12 0 -18 20 -18 -20 h12 V8 z" fill="$down" '
      'transform="translate(6,0)"/>';
}

const motorwayArt = '<g fill="$kWhite">'
    '<path d="M50 4 L74 30 H60 v62 H40 V30 H26 z"/>'
    '<rect x="4" y="46" width="14" height="46" rx="4"/>'
    '<rect x="82" y="46" width="14" height="46" rx="4"/></g>';

const clearwayArt = '<g fill="$kWhite">'
    '<path d="M50 8 L72 34 H60 v58 H40 V34 H28 z"/>'
    '<rect x="10" y="52" width="12" height="40" rx="4"/>'
    '<rect x="78" y="52" width="12" height="40" rx="4"/></g>';

const oneWayArt = '<path d="M4 42 h70 V24 l24 26 -24 26 V58 H4 z" fill="$kWhite"/>';

const bumpSign = '<g fill="$kWhite"><rect x="6" y="66" width="88" height="10" rx="4"/>'
    '<path d="M28 66 c6 -24 38 -24 44 0 z"/></g>';

const chargingArt = '<g fill="$kWhite">'
    '<path d="M56 6 L26 54 h20 l-8 40 32 -50 H50 z"/></g>';

const hospitalArt = '<g fill="$kWhite"><rect x="38" y="10" width="24" height="80" rx="4"/>'
    '<rect x="10" y="38" width="80" height="24" rx="4"/></g>';

const fuelArt = '<g fill="$kWhite">'
    '<path d="M18 90 V18 c0-6 4-10 10-10 h20 c6 0 10 4 10 10 v72 z"/>'
    '<rect x="10" y="88" width="56" height="8" rx="3"/>'
    '<path d="M66 34 h10 v34 a6 6 0 0 0 12 0 V44 h-6 V30 l-10 -12 -6 6 8 8 v-2 z"/></g>';

const foodArt = '<g fill="$kWhite">'
    '<path d="M22 8 v34 a8 8 0 0 0 16 0 V8 h-5 v26 h-3 V8 h-5 v26 h-3 V8 z"/>'
    '<rect x="26" y="42" width="8" height="50" rx="3"/>'
    '<path d="M62 8 c12 0 18 12 18 26 0 10-4 14-8 16 v42 h-10 V50 c-6-4-8-10-8-18 0-12 4-24 8-24 z"/></g>';

const phoneArt = '<path d="M26 14 c10 -8 18 4 22 12 3 6 -4 8 -6 12 -2 6 12 20 18 18 4 -2 '
    '6 -9 12 -6 8 4 20 12 12 22 -8 10 -26 8 -42 -6 C26 52 16 22 26 14 z" fill="$kWhite"/>';

const infoArt = '<g fill="$kWhite"><circle cx="50" cy="18" r="10"/>'
    '<rect x="40" y="36" width="20" height="56" rx="6"/></g>';

const wcArt = '<g fill="$kWhite"><circle cx="28" cy="12" r="9"/>'
    '<path d="M18 26 h20 l8 30 h-9 v36 H27 V70 h-4 v22 H13 V56 H4 z" transform="translate(6,0)"/>'
    '<circle cx="74" cy="12" r="9"/>'
    '<path d="M74 26 c8 0 14 6 16 16 l4 20 h-9 l-3 -14 v44 H66 V48 l-3 14 h-9 l4 -20 '
    'c2 -10 8 -16 16 -16 z"/></g>';

const disabledArt = '<g fill="$kWhite"><circle cx="60" cy="14" r="10"/>'
    '<path d="M46 30 h14 v22 h22 v12 H60 c-8 0-14-6-14-14 z"/>'
    '<circle cx="46" cy="66" r="26" fill="none" stroke="$kWhite" stroke-width="8"/></g>';

const bothDirections = '<path d="M50 6 L74 34 H58 v32 h16 L50 94 26 66 h16 V34 H26 z" fill="$kWhite"/>';
