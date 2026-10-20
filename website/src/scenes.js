/*
 * Picture engine: draws Swedish road signs and traffic situations as SVG.
 *
 *   Signs.svg(name, size)      -> standalone <svg> of one road sign
 *   Scene.render(spec)         -> <svg> for a question picture, where spec is
 *     { sign: 'yield' }                        one big sign
 *     { signs: ['yield', 'stop'] }             a row of signs
 *     { junction: {...} }                      top-down crossroads / T-junction
 *     { roundabout: {...} }                    top-down roundabout
 *     { road: {...} }                          top-down straight road
 *     { view: {...} }                          driver's-eye view
 *
 * Traffic drives on the RIGHT. Arms / approaches are named by compass point:
 * 'S' is the bottom of the picture (where "you" normally come from).
 */
(function (global) {
  'use strict';

  // ---------------------------------------------------------------- helpers
  let uid = 0;
  const nextId = (p) => `${p}${++uid}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rad = (d) => (d * Math.PI) / 180;
  const ARM_ANGLE = { S: 0, W: 90, N: 180, E: 270 };
  const C = 200; // centre of the 400x400 top-down canvas

  function rot(pt, deg) {
    const a = rad(deg);
    const dx = pt[0] - C, dy = pt[1] - C;
    return [C + dx * Math.cos(a) - dy * Math.sin(a), C + dx * Math.sin(a) + dy * Math.cos(a)];
  }
  const f = (n) => Math.round(n * 10) / 10;

  const COLORS = {
    you: '#2563eb', red: '#dc2626', green: '#16a34a', grey: '#6b7280', white: '#f8fafc',
    black: '#1f2937', orange: '#ea580c', purple: '#7c3aed', yellow: '#eab308', teal: '#0d9488',
  };
  const col = (c) => COLORS[c] || c || COLORS.red;

  // ------------------------------------------------------------------ signs
  const SY = '#ffcd00'; // Swedish sign yellow
  const SR = '#d22630'; // sign red
  const SB = '#0063a6'; // sign blue
  const K = '#111';

  const tri = (inner) =>
    `<path d="M50 6 L95 88 Q96 92 92 92 L8 92 Q4 92 5 88 Z" fill="${SR}"/>` +
    `<path d="M50 22 L82 81 L18 81 Z" fill="${SY}"/>` + inner;
  const ring = (inner, fill = SY) =>
    `<circle cx="50" cy="50" r="46" fill="${SR}"/><circle cx="50" cy="50" r="35" fill="${fill}"/>` + inner;
  const blueDisc = (inner) => `<circle cx="50" cy="50" r="46" fill="${SB}" stroke="#fff" stroke-width="3"/>` + inner;
  const blueSq = (inner) => `<rect x="5" y="5" width="90" height="90" rx="8" fill="${SB}" stroke="#fff" stroke-width="3"/>` + inner;
  const arrow = (d, w = 9, c = '#fff') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const head = (x, y, ang, c = '#fff', s = 1) =>
    `<path d="M0 -13 L11 3 L-11 3 Z" fill="${c}" transform="translate(${x} ${y}) rotate(${ang}) scale(${s})"/>`;
  const person = (x, y, s = 1, c = K) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" stroke="${c}" stroke-linecap="round">` +
    `<circle cx="0" cy="-16" r="4.5" stroke="none"/>` +
    `<path d="M0 -10 L-1 4 M-1 4 L-7 16 M-1 4 L5 16 M0 -8 L-7 -1 M0 -8 L7 -2" fill="none" stroke-width="3.6"/></g>`;
  const child = (x, y, s = 1, c = K) => person(x, y, s * 0.75, c);
  const bicycle = (x, y, s = 1, c = K) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="3">` +
    `<circle cx="-11" cy="6" r="7"/><circle cx="11" cy="6" r="7"/>` +
    `<path d="M-11 6 L-3 -6 L8 -6 L11 6 M-3 -6 L1 6 L8 -6 M-5 -10 L-1 -10 M8 -6 L6 -12 L10 -12"/></g>`;
  const carSide = (x, y, s = 1, c = K) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">` +
    `<path d="M-16 4 L-16 -3 L-10 -4 L-6 -11 L7 -11 L12 -4 L16 -3 L16 4 Z"/>` +
    `<circle cx="-9" cy="5" r="3.5"/><circle cx="9" cy="5" r="3.5"/></g>`;

  const SIGNS = {
    // --- priority
    yield: { name: 'Give way (väjningsplikt)', g: `<path d="M6 10 L94 10 Q98 10 96 14 L52 92 Q50 95 48 92 L4 14 Q2 10 6 10 Z" fill="${SR}"/><path d="M22 20 L78 20 L50 72 Z" fill="${SY}"/>` },
    stop: { name: 'Stop (stopplikt)', g: `<path d="M30 4 L70 4 L96 30 L96 70 L70 96 L30 96 L4 70 L4 30 Z" fill="#fff"/><path d="M31 8 L69 8 L92 31 L92 69 L69 92 L31 92 L8 69 L8 31 Z" fill="${SR}"/><text x="50" y="59" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="25" fill="#fff" text-anchor="middle">STOP</text>` },
    'main-road': { name: 'Priority road (huvudled)', g: `<path d="M50 2 L98 50 L50 98 L2 50 Z" fill="#fff" stroke="#999" stroke-width="1"/><path d="M50 16 L84 50 L50 84 L16 50 Z" fill="${SY}"/>` },
    'end-main-road': { name: 'End of priority road', g: `<path d="M50 2 L98 50 L50 98 L2 50 Z" fill="#fff" stroke="#999" stroke-width="1"/><path d="M50 16 L84 50 L50 84 L16 50 Z" fill="${SY}"/><path d="M28 72 L72 28" stroke="${K}" stroke-width="5"/><path d="M34 78 L78 34 M22 66 L66 22" stroke="${K}" stroke-width="2"/>` },
    'oncoming-priority': { name: 'Give way to oncoming traffic', g: ring(`${arrow('M38 78 L38 30', 7, K)}${head(38, 26, 0, K, 0.8)}${arrow('M62 22 L62 70', 7, SR)}${head(62, 74, 180, SR, 0.8)}`) },
    'priority-over-oncoming': { name: 'Priority over oncoming traffic', g: blueSq(`${arrow('M38 80 L38 34', 8)}${head(38, 28, 0, '#fff', 0.85)}${arrow('M62 20 L62 66', 8, SR)}${head(62, 72, 180, SR, 0.85)}`) },

    // --- warning
    'w-crossroads': { name: 'Warning: crossroads', g: tri(`<path d="M50 38 L50 76 M38 57 L62 57" stroke="${K}" stroke-width="7"/>`) },
    'w-roundabout': { name: 'Warning: roundabout', g: tri(`<g fill="none" stroke="${K}" stroke-width="5"><path d="M36 60 A15 15 0 0 1 44 46"/><path d="M55 45 A15 15 0 0 1 64 59"/><path d="M58 70 A15 15 0 0 1 41 70"/></g><path d="M42 40 l8 6 l-9 4z M70 58 l-5 9 l-5-8z M36 74 l-2-10 l9 4z" fill="${K}"/>`) },
    'w-pedestrian-crossing': { name: 'Warning: pedestrian crossing', g: tri(`${person(50, 64, 1.05)}<path d="M33 77 L67 77" stroke="${K}" stroke-width="3" stroke-dasharray="4 3"/>`) },
    'w-children': { name: 'Warning: children', g: tri(`${person(44, 66, 1)}${child(58, 70, 1)}`) },
    'w-moose': { name: 'Warning: moose (älg)', g: tri(`<g fill="${K}"><path d="M30 58 Q32 50 42 50 L58 50 Q63 48 65 44 L70 45 L72 52 L67 55 L64 62 L62 76 L59 76 L58 64 L42 64 L40 76 L37 76 L36 63 Q30 62 30 58 Z"/><path d="M64 44 Q60 36 56 38 L60 40 L58 34 L62 38 L63 32 L66 40 L70 34 L69 41 Z"/></g>`) },
    'w-deer': { name: 'Warning: deer', g: tri(`<g fill="${K}"><path d="M34 60 Q36 53 44 53 L58 53 L63 46 L66 47 L66 53 L62 58 L61 75 L58 75 L57 63 L45 63 L43 75 L40 75 L39 63 Q34 63 34 60 Z"/><path d="M63 46 L60 38 M64 45 L67 37" stroke="${K}" stroke-width="2"/></g>`) },
    'w-roadworks': { name: 'Warning: roadworks', g: tri(`${person(46, 64, 0.95)}<path d="M54 76 L60 64 L66 76 Z" fill="${K}"/><path d="M50 58 L60 50" stroke="${K}" stroke-width="3"/>`) },
    'w-slippery': { name: 'Warning: slippery road', g: tri(`${carSide(50, 50, 0.9)}<path d="M36 74 Q40 64 46 70 T56 66 M50 76 Q54 66 60 72 T68 68" fill="none" stroke="${K}" stroke-width="2.6"/>`) },
    'w-traffic-lights': { name: 'Warning: traffic lights', g: tri(`<rect x="43" y="36" width="14" height="40" rx="4" fill="${K}"/><circle cx="50" cy="43" r="4" fill="${SR}"/><circle cx="50" cy="56" r="4" fill="#f5b400"/><circle cx="50" cy="69" r="4" fill="#1aa34a"/>`) },
    'w-level-crossing-gates': { name: 'Warning: level crossing with barriers', g: tri(`<path d="M30 74 L70 74 L70 68 L30 68 Z M34 68 L34 54 L66 54 L66 68 M40 54 L40 68 M46 54 L46 68 M52 54 L52 68 M58 54 L58 68 M64 54 L64 68" fill="${K}" stroke="${K}" stroke-width="2"/>`) },
    'w-level-crossing': { name: 'Warning: level crossing without barriers', g: tri(`<g fill="${K}"><rect x="30" y="56" width="34" height="14" rx="2"/><rect x="58" y="46" width="10" height="24"/><rect x="34" y="48" width="6" height="8"/><circle cx="36" cy="73" r="3.5"/><circle cx="48" cy="73" r="3.5"/><circle cx="60" cy="73" r="3.5"/></g>`) },
    'w-cyclists': { name: 'Warning: cyclists', g: tri(bicycle(50, 64, 1.05)) },
    'w-narrowing': { name: 'Warning: road narrows', g: tri(`<path d="M40 78 L40 62 L45 52 L45 38 M60 78 L60 62 L55 52 L55 38" fill="none" stroke="${K}" stroke-width="4.5"/>`) },
    'w-two-way': { name: 'Warning: two-way traffic', g: tri(`${arrow('M43 78 L43 46', 5, K)}${head(43, 43, 0, K, 0.55)}${arrow('M57 40 L57 72', 5, K)}${head(57, 75, 180, K, 0.55)}`) },
    'w-danger': { name: 'Warning: other danger', g: tri(`<rect x="46" y="38" width="8" height="26" rx="2" fill="${K}"/><circle cx="50" cy="72" r="4.5" fill="${K}"/>`) },
    'w-queue': { name: 'Warning: queues likely', g: tri(`${carSide(50, 46, 0.75)}${carSide(50, 58, 0.75)}${carSide(50, 70, 0.75)}`) },
    'w-steep-down': { name: 'Warning: steep hill downwards', g: tri(`<path d="M28 78 L72 78 L28 50 Z" fill="${K}"/><text x="62" y="60" font-family="Arial" font-weight="700" font-size="11" fill="${K}" text-anchor="middle">10%</text>`) },
    'w-bumps': { name: 'Warning: speed bump', g: tri(`<path d="M28 76 L40 76 Q50 58 60 76 L72 76" fill="none" stroke="${K}" stroke-width="5"/>`) },
    'w-curve-right': { name: 'Warning: bend to the right', g: tri(`<path d="M44 80 L44 60 Q44 44 60 42" fill="none" stroke="${K}" stroke-width="6"/>${head(62, 42, 90, K, 0.7)}`) },
    'w-curve-left': { name: 'Warning: bend to the left', g: tri(`<path d="M56 80 L56 60 Q56 44 40 42" fill="none" stroke="${K}" stroke-width="6"/>${head(38, 42, -90, K, 0.7)}`) },

    // --- prohibition
    'no-entry': { name: 'No entry for vehicles', g: `<circle cx="50" cy="50" r="46" fill="${SR}"/><rect x="18" y="42" width="64" height="16" fill="#fff"/>` },
    'no-vehicles': { name: 'No vehicles (both directions)', g: ring('') },
    'no-overtaking': { name: 'No overtaking', g: ring(`${carSide(38, 52, 0.95, SR)}${carSide(62, 52, 0.95, K)}`) },
    'no-left-turn': { name: 'No left turn', g: ring(`<path d="M58 76 L58 50 Q58 40 46 40 L38 40" fill="none" stroke="${K}" stroke-width="7"/>${head(34, 40, -90, K, 0.75)}<path d="M26 74 L74 26" stroke="${SR}" stroke-width="7"/>`) },
    'no-right-turn': { name: 'No right turn', g: ring(`<path d="M42 76 L42 50 Q42 40 54 40 L62 40" fill="none" stroke="${K}" stroke-width="7"/>${head(66, 40, 90, K, 0.75)}<path d="M26 74 L74 26" stroke="${SR}" stroke-width="7"/>`) },
    'no-u-turn': { name: 'No U-turn', g: ring(`<path d="M60 76 L60 44 Q60 32 49 32 Q38 32 38 44 L38 56" fill="none" stroke="${K}" stroke-width="7"/>${head(38, 60, 180, K, 0.75)}<path d="M26 74 L74 26" stroke="${SR}" stroke-width="7"/>`) },
    'no-parking': { name: 'No parking', g: `<circle cx="50" cy="50" r="46" fill="${SR}"/><circle cx="50" cy="50" r="35" fill="${SB}"/><path d="M24 24 L76 76" stroke="${SR}" stroke-width="10"/>` },
    'no-stopping': { name: 'No stopping or parking', g: `<circle cx="50" cy="50" r="46" fill="${SR}"/><circle cx="50" cy="50" r="35" fill="${SB}"/><path d="M24 24 L76 76 M76 24 L24 76" stroke="${SR}" stroke-width="10"/>` },

    // --- mandatory
    'mandatory-right': { name: 'Turn right (mandatory)', g: blueDisc(`<path d="M40 78 L40 52 Q40 40 54 40 L60 40" fill="none" stroke="#fff" stroke-width="10"/>${head(66, 40, 90, '#fff', 0.95)}`) },
    'mandatory-straight': { name: 'Straight ahead only', g: blueDisc(`${arrow('M50 82 L50 34', 10)}${head(50, 28, 0, '#fff', 0.95)}`) },
    'pass-right': { name: 'Pass on the right side', g: blueDisc(`${arrow('M34 34 L62 62', 10)}${head(66, 66, 135, '#fff', 0.95)}`) },
    'roundabout-mandatory': { name: 'Roundabout', g: blueDisc(`<g fill="none" stroke="#fff" stroke-width="7"><path d="M36 60 A17 17 0 0 1 44 34"/><path d="M56 33 A17 17 0 0 1 66 58"/><path d="M58 68 A17 17 0 0 1 38 66"/></g><path d="M44 26 l9 8 l-11 4z M72 56 l-6 11 l-6-9z M34 74 l-3-12 l10 4z" fill="#fff"/>`) },
    'bike-path': { name: 'Cycle path', g: blueDisc(bicycle(50, 52, 1.35, '#fff')) },
    footpath: { name: 'Footpath', g: blueDisc(person(50, 58, 1.45, '#fff')) },
    'shared-path': { name: 'Shared path for pedestrians and cyclists', g: blueDisc(`<path d="M50 14 L50 86" stroke="#fff" stroke-width="3"/>${person(32, 58, 1.05, '#fff')}${bicycle(70, 54, 0.75, '#fff')}`) },

    // --- speed limits
    'speed-20': speed(20), 'speed-30': speed(30), 'speed-40': speed(40), 'speed-50': speed(50), 'speed-60': speed(60),
    'speed-70': speed(70), 'speed-80': speed(80), 'speed-90': speed(90), 'speed-100': speed(100), 'speed-110': speed(110), 'speed-120': speed(120),

    // --- information
    parking: { name: 'Parking', g: blueSq(`<text x="50" y="76" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="68" fill="#fff" text-anchor="middle">P</text>`) },
    'ped-crossing': { name: 'Pedestrian crossing', g: blueSq(`<path d="M50 14 L88 84 L12 84 Z" fill="#fff"/>${person(50, 68, 1.1)}<path d="M30 80 L70 80" stroke="${K}" stroke-width="3" stroke-dasharray="5 3"/>`) },
    'bike-crossing': { name: 'Cycle crossing', g: blueSq(`<path d="M50 14 L88 84 L12 84 Z" fill="#fff"/>${bicycle(50, 66, 0.95)}`) },
    motorway: { name: 'Motorway', g: blueSq(`<path d="M24 86 L42 30 M76 86 L58 30" stroke="#fff" stroke-width="8" fill="none"/><path d="M50 86 L50 30" stroke="#fff" stroke-width="5" fill="none"/><path d="M28 34 L72 34" stroke="#fff" stroke-width="8"/>`) },
    'end-motorway': { name: 'End of motorway', g: blueSq(`<path d="M24 86 L42 30 M76 86 L58 30" stroke="#fff" stroke-width="8" fill="none"/><path d="M50 86 L50 30" stroke="#fff" stroke-width="5" fill="none"/><path d="M28 34 L72 34" stroke="#fff" stroke-width="8"/><path d="M14 86 L86 14" stroke="${SR}" stroke-width="8"/>`) },
    expressway: { name: 'Expressway (motortrafikled)', g: blueSq(carSide(50, 54, 2.1, '#fff')) },
    'dead-end': { name: 'Dead end', g: blueSq(`<path d="M50 86 L50 30" stroke="#fff" stroke-width="16"/><rect x="26" y="18" width="48" height="16" fill="${SR}"/>`) },
    'one-way': { name: 'One-way traffic', g: blueSq(`${arrow('M50 86 L50 32', 14)}${head(50, 24, 0, '#fff', 1.3)}`) },
    'pedestrian-zone': { name: 'Pedestrian priority zone (gångfartsområde)', g: blueSq(`<path d="M14 44 L30 30 L46 44 L46 62 L14 62 Z" fill="#fff"/>${person(62, 62, 1.0, '#fff')}${child(78, 64, 1.0, '#fff')}${carSide(36, 80, 0.85, '#fff')}<circle cx="74" cy="82" r="5" fill="#fff"/>`) },
    'speed-camera': { name: 'Speed camera (ATK)', g: blueSq(`<rect x="22" y="38" width="44" height="30" rx="5" fill="#fff"/><rect x="66" y="45" width="12" height="16" fill="#fff"/><circle cx="44" cy="53" r="9" fill="${SB}"/><circle cx="44" cy="53" r="5" fill="#fff"/><rect x="28" y="32" width="12" height="6" fill="#fff"/>`) },
    'bus-lane': { name: 'Bus lane', g: blueSq(`<text x="50" y="62" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="30" fill="#fff" text-anchor="middle">BUSS</text>`) },
    'meeting-place': { name: 'Passing place (mötesplats)', g: blueSq(`<text x="50" y="72" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="56" fill="#fff" text-anchor="middle">M</text>`) },
  };

  function speed(n) {
    return {
      name: `Speed limit ${n} km/h`,
      g: ring(`<text x="50" y="${n >= 100 ? 61 : 63}" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="${n >= 100 ? 29 : 37}" fill="${K}" text-anchor="middle" letter-spacing="-1">${n}</text>`),
    };
  }

  const Signs = {
    list: () => Object.keys(SIGNS),
    has: (n) => Object.prototype.hasOwnProperty.call(SIGNS, n),
    name: (n) => (SIGNS[n] ? SIGNS[n].name : n),
    group(n) {
      if (/^w-/.test(n)) return 'Warning signs';
      if (/^speed-|^no-/.test(n)) return 'Prohibition signs';
      if (['yield', 'stop', 'main-road', 'end-main-road', 'oncoming-priority', 'priority-over-oncoming'].includes(n)) return 'Priority signs';
      if (['mandatory-right', 'mandatory-straight', 'pass-right', 'roundabout-mandatory', 'bike-path', 'footpath', 'shared-path'].includes(n)) return 'Mandatory signs';
      return 'Information signs';
    },
    /** inner group in a 100x100 box */
    g(n) {
      const s = SIGNS[n];
      if (!s) throw new Error(`Unknown sign: ${n}`);
      return s.g;
    },
    svg(n, size = 120) {
      return `<svg class="sign" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${esc(Signs.name(n))}">${Signs.g(n)}</svg>`;
    },
  };

  // --------------------------------------------------------- road objects
  // All vehicles are drawn facing UP (north) centred on 0,0.
  function vehicle(kind = 'car', color = 'red', label) {
    const c = col(color);
    switch (kind) {
      case 'bus':
        return `<rect x="-14" y="-44" width="28" height="88" rx="5" fill="${c}" stroke="#0003"/>` +
          `<rect x="-11" y="-41" width="22" height="9" rx="2" fill="#1e293b" opacity=".75"/>` +
          `<rect x="-11" y="-26" width="22" height="62" rx="2" fill="#fff" opacity=".22"/>`;
      case 'truck':
        return `<rect x="-14" y="-24" width="28" height="64" rx="3" fill="#e5e7eb" stroke="#0004"/>` +
          `<rect x="-13" y="-42" width="26" height="20" rx="4" fill="${c}" stroke="#0003"/>` +
          `<rect x="-10" y="-40" width="20" height="7" rx="2" fill="#1e293b" opacity=".75"/>`;
      case 'tractor':
        return `<rect x="-15" y="4" width="8" height="18" rx="2" fill="#222"/><rect x="7" y="4" width="8" height="18" rx="2" fill="#222"/>` +
          `<rect x="-12" y="-20" width="5" height="10" rx="1" fill="#222"/><rect x="7" y="-20" width="5" height="10" rx="1" fill="#222"/>` +
          `<rect x="-8" y="-24" width="16" height="44" rx="3" fill="${c}"/><rect x="-7" y="0" width="14" height="14" fill="#fff" opacity=".35"/>`;
      case 'bike':
        return `<rect x="-2" y="-16" width="4" height="32" rx="2" fill="#222"/><rect x="-8" y="-11" width="16" height="3" rx="1.5" fill="#222"/>` +
          `<ellipse cx="0" cy="0" rx="8" ry="6" fill="${c}"/><circle cx="0" cy="-2" r="4.5" fill="#f1c27d" stroke="#0004"/>`;
      case 'moped':
        return `<rect x="-3" y="-18" width="6" height="36" rx="3" fill="#222"/><rect x="-9" y="-12" width="18" height="3" rx="1.5" fill="#222"/>` +
          `<ellipse cx="0" cy="2" rx="8" ry="10" fill="${c}"/><circle cx="0" cy="-2" r="5" fill="#fff" stroke="#0005"/>`;
      case 'ambulance':
        return carBody('#f8fafc', 1.15) + `<rect x="-12" y="-6" width="24" height="5" fill="#16a34a"/>` +
          `<rect x="-9" y="-14" width="8" height="5" rx="1" fill="#2563eb"/><rect x="1" y="-14" width="8" height="5" rx="1" fill="#2563eb"/>` +
          `<path d="M-3 6 h6 v4 h4 v6 h-4 v4 h-6 v-4 h-4 v-6 h4z" fill="#dc2626"/>`;
      case 'police':
        return carBody('#f8fafc') + `<rect x="-11" y="-4" width="22" height="4" fill="#1d4ed8"/>` +
          `<rect x="-8" y="-12" width="7" height="4" rx="1" fill="#2563eb"/><rect x="1" y="-12" width="7" height="4" rx="1" fill="#2563eb"/>`;
      case 'tram':
        return `<rect x="-14" y="-60" width="28" height="120" rx="8" fill="${c}" stroke="#0003"/>` +
          `<rect x="-11" y="-56" width="22" height="10" rx="3" fill="#1e293b" opacity=".75"/><path d="M-14 -20 h28 M-14 20 h28" stroke="#0003"/>`;
      case 'car':
      default:
        return carBody(c);
    }
  }
  function carBody(c, s = 1) {
    return `<g transform="scale(${s})"><rect x="-12" y="-21" width="24" height="42" rx="7" fill="${c}" stroke="#0004"/>` +
      `<path d="M-9 -11 Q0 -15 9 -11 L8 -4 L-8 -4 Z" fill="#1e293b" opacity=".75"/>` +
      `<path d="M-8 10 L8 10 L9 15 Q0 18 -9 15 Z" fill="#1e293b" opacity=".6"/>` +
      `<rect x="-11" y="-21" width="5" height="3" rx="1" fill="#fde68a"/><rect x="6" y="-21" width="5" height="3" rx="1" fill="#fde68a"/></g>`;
  }
  function pedTop(color = 'orange') {
    return `<ellipse cx="0" cy="0" rx="8" ry="5" fill="${col(color)}" stroke="#0005"/><circle cx="0" cy="0" r="4" fill="#f1c27d" stroke="#0005"/>`;
  }
  function placed(inner, x, y, deg = 0, s = 1) {
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(deg)}) scale(${s})">${inner}</g>`;
  }
  function tag(x, y, text, color = '#111') {
    if (!text) return '';
    return `<g transform="translate(${f(x)} ${f(y)})"><circle r="11" fill="#fff" stroke="${color}" stroke-width="2.5"/>` +
      `<text y="4.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="13" fill="${color}">${esc(text)}</text></g>`;
  }
  function trafficLight(state) {
    const on = (s) => state === s || (s === 'green' && /^green/.test(state || ''));
    const lamp = (cy, color, lit) => `<circle cx="0" cy="${cy}" r="5" fill="${lit ? color : '#3f3f46'}"/>`;
    let g = `<rect x="-8" y="-22" width="16" height="44" rx="4" fill="#18181b" stroke="#fff" stroke-width="1.5"/>` +
      lamp(-12, '#ef4444', on('red') || state === 'red-yellow') + lamp(0, '#f59e0b', on('yellow') || state === 'red-yellow') + lamp(12, '#22c55e', on('green'));
    if (state === 'green-left') g += `<path d="M3 12 h-6 m2.5 -3 l-3 3 l3 3" stroke="#000" stroke-width="1.8" fill="none"/>`;
    if (state === 'green-right') g += `<path d="M-3 12 h6 m-2.5 -3 l3 3 l-3 3" stroke="#000" stroke-width="1.8" fill="none"/>`;
    if (state === 'yellow-flash') g += `<circle cx="0" cy="0" r="8" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>`;
    return g;
  }
  function smallSign(name, x, y, size = 30) {
    return `<g transform="translate(${f(x - size / 2)} ${f(y - size / 2)}) scale(${size / 100})">` +
      `<rect x="-6" y="-6" width="112" height="112" rx="16" fill="#fff" opacity=".0"/>${Signs.g(name)}</g>`;
  }

  // ------------------------------------------------------- arrow markers
  function markerDefs(colors) {
    return colors.map((c) =>
      `<marker id="${c.id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">` +
      `<path d="M0 0 L10 5 L0 10 Z" fill="${c.color}"/></marker>`).join('');
  }
  function pathArrow(d, color, mid, dashed) {
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9" ${dashed ? 'stroke-dasharray="10 7"' : ''} marker-end="url(#${mid})"/>`;
  }
  function pts(list) {
    return list.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
  }

  // --------------------------------------------------------- junctions
  /*
   * junction: {
   *   arms: ['N','E','S','W'],         // default all four; omit one for a T-junction
   *   you: { arm:'S', path:'left'|'right'|'straight'|'uturn'|'stop', kind, at:85 },
   *   vehicles: [{ arm:'E', path:'straight', kind:'car'|'bus'|'bike'|..., color:'red', label:'B', at:85,
   *                lane:'in'|'out' (out = driving away), inside:true (already in the middle) }],
   *   peds: [{ arm:'N', x:-0.5..0.5, label, color }],     // on the crossing of that arm
   *   people: [{ x, y, label, color }],                  // anywhere, absolute coords
   *   crossings: ['N'],  bikeCrossings: ['E'],
   *   signs: { S:'yield', E:'main-road' },  lights: { S:'red' },
   *   lines: { S:'stop'|'yield' },   // stop line or shark teeth
   *   oneWay: ['N'],  // that arm is one-way leading away from the junction (no centre line)
   *   tramlines: 'NS',
   * }
   */
  function junction(o) {
    const arms = o.arms || ['N', 'E', 'S', 'W'];
    const crossings = o.crossings || [];
    const bikeX = o.bikeCrossings || [];
    const markers = [];
    const markerFor = (color) => {
      let m = markers.find((x) => x.color === color);
      if (!m) { m = { id: nextId('m'), color }; markers.push(m); }
      return m.id;
    };
    let ground = '', roads = '', marks = '', objs = '', labels = '', arrows = '';

    ground += `<rect width="400" height="400" fill="#8fbf7a"/>`;
    // pavements, then asphalt
    for (const a of arms) roads += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)"><rect x="146" y="200" width="108" height="200" fill="#cfd4d8"/></g>`;
    roads += `<rect x="146" y="146" width="108" height="108" fill="#cfd4d8"/>`;
    for (const a of arms) roads += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)"><rect x="160" y="200" width="80" height="200" fill="#5d6268"/></g>`;
    roads += `<rect x="160" y="160" width="80" height="80" fill="#5d6268"/>`;
    // close the pavement on the side without an arm
    for (const a of ['N', 'E', 'S', 'W']) if (!arms.includes(a)) roads += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)"><rect x="146" y="240" width="108" height="14" fill="#cfd4d8"/></g>`;
    if (o.tramlines === 'NS') roads += `<path d="M193 0 V400 M207 0 V400" stroke="#9ca3af" stroke-width="2.5"/>`;
    if (o.tramlines === 'EW') roads += `<path d="M0 193 H400 M0 207 H400" stroke="#9ca3af" stroke-width="2.5"/>`;

    for (const a of arms) {
      const g = [];
      const hasX = crossings.includes(a);
      const hasB = bikeX.includes(a);
      const lineY = hasX || hasB ? (hasX && hasB ? 296 : 282) : 248;
      if (!(o.oneWay || []).includes(a)) g.push(`<path d="M200 ${lineY + 6} V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="12 10"/>`);
      if (hasX) for (let x = 164; x < 238; x += 11) g.push(`<rect x="${x}" y="252" width="6" height="24" fill="#f8fafc"/>`);
      if (hasB) {
        const y0 = hasX ? 278 : 252;
        for (let x = 162; x < 240; x += 8) g.push(`<rect x="${x}" y="${y0}" width="4" height="4" fill="#f8fafc"/><rect x="${x}" y="${y0 + 14}" width="4" height="4" fill="#f8fafc"/>`);
      }
      const line = (o.lines || {})[a];
      if (line === 'stop') g.push(`<rect x="201" y="${lineY}" width="38" height="5" fill="#f8fafc"/>`);
      if (line === 'yield') for (let x = 203; x < 238; x += 9) g.push(`<path d="M${x} ${lineY} h7 l-3.5 7 z" fill="#f8fafc"/>`);
      marks += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)">${g.join('')}</g>`;
      const sp = rot([262, lineY + 22], ARM_ANGLE[a]);
      if ((o.signs || {})[a]) {
        const list = [].concat(o.signs[a]);
        list.forEach((s, i) => { const q = rot([262 + i * 0, lineY + 22 + i * 30], ARM_ANGLE[a]); objs += smallSign(s, q[0], q[1], 28); });
      }
      if ((o.lights || {})[a]) {
        const lp = rot([262, lineY + ((o.signs || {})[a] ? 56 : 22)], ARM_ANGLE[a]);
        objs += placed(trafficLight(o.lights[a]), lp[0], lp[1], 0, 0.95);
      }
      void sp;
    }

    const drawVehicle = (v, isYou) => {
      const a = v.arm || 'S';
      const ang = ARM_ANGLE[a];
      const kind = v.kind || 'car';
      const len = kind === 'bus' ? 44 : kind === 'truck' ? 42 : kind === 'tram' ? 60 : kind === 'bike' || kind === 'moped' ? 16 : 21;
      const color = isYou ? COLORS.you : col(v.color || 'red');
      const laneX = kind === 'bike' || kind === 'moped' ? 232 : 220;
      let p, heading;
      if (v.lane === 'out') {
        p = rot([180, 200 + (v.at || 90)], ang); heading = ang + 180;
      } else if (v.inside) {
        p = rot([laneX, 214], ang); heading = ang;
      } else {
        p = rot([laneX, 200 + (v.at || 85)], ang); heading = ang;
      }
      objs += placed(vehicle(kind, color), p[0], p[1], heading);
      if (v.path && v.path !== 'stop' && v.lane !== 'out') {
        const y0 = (v.inside ? 214 : 200 + (v.at || 85)) - len - 4;
        let path;
        switch (v.path) {
          case 'straight': path = [[laneX, y0], [laneX, 30]]; break;
          case 'right': path = [[laneX, y0], [laneX, 246]].concat(arc(laneX, 246, 246, 220, 2)).concat([[370, 220]]); break;
          case 'left': path = [[laneX, y0], [laneX, 232]].concat(curve([laneX, 232], [laneX, 180], [168, 180])).concat([[30, 180]]); break;
          case 'uturn': path = [[laneX, y0], [laneX, 200]].concat(curve([laneX, 200], [laneX, 168], [200, 168])).concat(curve([200, 168], [180, 168], [180, 200])).concat([[180, 330]]); break;
          default: path = null;
        }
        if (path) arrows += pathArrow(pts(path.map((q) => rot(q, ang))), color, markerFor(color), !isYou);
      }
      if (v.path === 'stop') {
        const q = rot([laneX, 200 + (v.at || 85) - len - 14], ang);
        labels += `<g transform="translate(${f(q[0])} ${f(q[1])})"><rect x="-14" y="-7" width="28" height="14" rx="3" fill="#b91c1c"/><text y="4" text-anchor="middle" font-family="Arial" font-weight="700" font-size="9" fill="#fff">STOP</text></g>`;
      }
      const lp = rot([laneX + 26, 200 + (v.inside ? 14 : (v.at || 85))], ang);
      if (isYou) labels += youTag(lp[0], lp[1]);
      else labels += tag(lp[0], lp[1], v.label, color);
    };

    for (const v of o.vehicles || []) drawVehicle(v, false);
    if (o.you) drawVehicle(o.you, true);

    for (const p of o.peds || []) {
      const ang = ARM_ANGLE[p.arm || 'S'];
      const q = rot([200 + (p.x || 0) * 70, crossings.includes(p.arm) ? 264 : 266], ang);
      objs += placed(pedTop(p.color || 'orange'), q[0], q[1], ang + 90);
      if (p.label) labels += tag(q[0] + 16, q[1] - 16, p.label, '#9a3412');
    }
    for (const p of o.people || []) {
      objs += placed(pedTop(p.color || 'orange'), p.x, p.y, p.rot || 0);
      if (p.label) labels += tag(p.x + 16, p.y - 16, p.label, '#9a3412');
    }

    return svgWrap(400, 400, `<defs>${markerDefs(markers)}</defs>${ground}${roads}${marks}${arrows}${objs}${labels}`, o.alt);
  }

  function youTag(x, y) {
    return `<g transform="translate(${f(x)} ${f(y)})"><rect x="-17" y="-10" width="34" height="20" rx="10" fill="${COLORS.you}" stroke="#fff" stroke-width="2"/>` +
      `<text y="4.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="11.5" fill="#fff">${window.I18N ? I18N.you : 'YOU'}</text></g>`;
  }
  function curve(p0, c, p1, n = 10) {
    const out = [];
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      out.push([(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]]);
    }
    return out;
  }
  function arc(x0, y0, x1, y1) { return curve([x0, y0], [x0, y1], [x1, y1]); }

  // -------------------------------------------------------- roundabout
  /*
   * roundabout: {
   *   arms: ['N','E','S','W'],
   *   you: { arm:'S', exit:'E'|'N'|'W'|'S', at: 0..1 progress (0 = waiting at entry) },
   *   vehicles: [{ ring: degrees (0=E, 90=S, 180=W, 270=N), label, color, exit }, { arm:'W', label }],
   *   signs: { S:'yield' }, crossings: ['S'],
   *   showIndicator: 'right'|'left'   // blinking indicator on your car
   * }
   */
  function roundabout(o) {
    const arms = o.arms || ['N', 'E', 'S', 'W'];
    const markers = [];
    const markerFor = (color) => {
      let m = markers.find((x) => x.color === color);
      if (!m) { m = { id: nextId('m'), color }; markers.push(m); }
      return m.id;
    };
    let g = `<rect width="400" height="400" fill="#8fbf7a"/>`;
    for (const a of arms) g += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)"><rect x="146" y="250" width="108" height="150" fill="#cfd4d8"/></g>`;
    g += `<circle cx="200" cy="200" r="112" fill="#cfd4d8"/>`;
    for (const a of arms) g += `<g transform="rotate(${ARM_ANGLE[a]} 200 200)"><rect x="160" y="250" width="80" height="150" fill="#5d6268"/>` +
      `<path d="M200 312 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="12 10"/>` +
      `<path d="M190 300 L200 288 L210 300 Z" fill="#e5e7eb" stroke="#9ca3af"/>` +
      ((o.crossings || []).includes(a) ? Array.from({ length: 7 }, (_, i) => `<rect x="${164 + i * 11}" y="318" width="6" height="22" fill="#f8fafc"/>`).join('') : '') +
      Array.from({ length: 4 }, (_, i) => `<path d="M${203 + i * 9} 304 h7 l-3.5 7 z" fill="#f8fafc"/>`).join('') +
      `</g>`;
    g += `<circle cx="200" cy="200" r="100" fill="#5d6268"/>`;
    g += `<circle cx="200" cy="200" r="46" fill="#cfd4d8"/><circle cx="200" cy="200" r="40" fill="#79a865"/>`;
    for (const a of arms) if ((o.signs || {})[a]) { const q = rot([262, 330], ARM_ANGLE[a]); g += smallSign(o.signs[a], q[0], q[1], 28); }

    const R = 72;
    const PHI = { E: 0, S: 90, W: 180, N: 270 };
    const D = 16; // angular offset of the lanes either side of the arm axis
    const ringPt = (deg, r = R) => [200 + r * Math.cos(rad(deg)), 200 + r * Math.sin(rad(deg))];
    let objs = '', arrows = '', labels = '';

    const route = (arm, exit) => {
      const inAng = PHI[arm] - D;
      let outAng = PHI[exit] + D;
      while (outAng >= inAng) outAng -= 360;
      if (inAng - outAng < 20) outAng -= 360;
      const p = [];
      const entry = rot([220, 300], ARM_ANGLE[arm]);
      p.push(entry);
      for (let a = inAng; a >= outAng; a -= 6) p.push(ringPt(a));
      p.push(ringPt(outAng));
      p.push(rot([180, 380], ARM_ANGLE[exit]));
      return p;
    };

    const draw = (v, isYou) => {
      const color = isYou ? COLORS.you : col(v.color || 'red');
      if (v.ring !== undefined) {
        const p = ringPt(v.ring);
        objs += placed(vehicle(v.kind || 'car', color), p[0], p[1], v.ring);
        if (v.exit) {
          const outAng0 = PHI[v.exit] + D;
          let outAng = outAng0;
          while (outAng >= v.ring - 10) outAng -= 360;
          const p2 = [];
          for (let a = v.ring - 18; a >= outAng; a -= 6) p2.push(ringPt(a));
          p2.push(ringPt(outAng));
          p2.push(rot([180, 380], ARM_ANGLE[v.exit]));
          arrows += pathArrow(pts(p2), color, markerFor(color), !isYou);
        }
        const lp = ringPt(v.ring, R + 40);
        labels += isYou ? youTag(lp[0], lp[1]) : tag(lp[0], lp[1], v.label, color);
        return;
      }
      const ang = ARM_ANGLE[v.arm || 'S'];
      const p = rot([220, 330], ang);
      objs += placed(vehicle(v.kind || 'car', color), p[0], p[1], ang);
      if (v.exit) arrows += pathArrow(pts(route(v.arm || 'S', v.exit)), color, markerFor(color), !isYou);
      const lp = rot([250, 352], ang);
      labels += isYou ? youTag(lp[0], lp[1]) : tag(lp[0], lp[1], v.label, color);
      if (isYou && o.showIndicator) {
        const side = o.showIndicator === 'right' ? 1 : -1;
        const ip = rot([220 + side * 12, 310], ang);
        objs += `<circle cx="${f(ip[0])}" cy="${f(ip[1])}" r="5" fill="#f59e0b" stroke="#fff" stroke-width="1.5"><animate attributeName="opacity" values="1;0.15;1" dur="0.9s" repeatCount="indefinite"/></circle>`;
      }
    };
    for (const v of o.vehicles || []) draw(v, false);
    if (o.you) draw(o.you, true);
    return svgWrap(400, 400, `<defs>${markerDefs(markers)}</defs>${g}${arrows}${objs}${labels}`, o.alt);
  }

  // --------------------------------------------------------- straight road
  /*
   * road: {
   *   lanes: 2 (one each way) | 4 (two each way, divided) | 'oneway2' (two lanes, same direction),
   *   centre: 'dashed' | 'warning' | 'solid' | 'double' | 'solid-left' (solid on your side, dashed theirs) | 'barrier',
   *   you: { lane: 'right'|'left'|'oncoming'|'shoulder', y: 330, path: 'straight'|'overtake'|'change-left'|'change-right'|'stop'|'pull-in' },
   *   objects: [{ kind:'car'|'bus'|'truck'|'bike'|'moped'|'tractor'|'ped'|'child'|'ball'|'moose'|'deer'|'cone'|'ambulance'|'police',
   *               lane:'right'|'left'|'oncoming'|'oncoming2'|'shoulder'|'far-shoulder'|'verge'|'far-verge', y, label, color, dir:'up'|'down', path }],
   *   crossing: y (zebra across the road), busStop: y (bay on your side), signs: [{ name, y, side:'right'|'left' }],
   *   solidEdge: true
   * }
   */
  function road(o) {
    const lanes = o.lanes || 2;
    const markers = [];
    const markerFor = (color) => {
      let m = markers.find((x) => x.color === color);
      if (!m) { m = { id: nextId('m'), color }; markers.push(m); }
      return m.id;
    };
    const W = 46; // lane width
    let left, right, laneX;
    if (lanes === 4) {
      left = 200 - 2 * W - 8; right = 200 + 2 * W + 8;
      laneX = { oncoming2: left + W / 2, oncoming: left + 1.5 * W, left: 208 + W / 2, right: 208 + 1.5 * W };
    } else if (lanes === 'oneway2') {
      left = 200 - W; right = 200 + W;
      laneX = { left: 200 - W / 2, right: 200 + W / 2 };
    } else {
      left = 200 - W; right = 200 + W;
      laneX = { oncoming: 200 - W / 2, right: 200 + W / 2, left: 200 - W / 2 };
    }
    laneX.shoulder = right + 16; laneX['far-shoulder'] = left - 16;
    laneX.verge = right + 44; laneX['far-verge'] = left - 44;

    let g = `<rect width="400" height="400" fill="#8fbf7a"/>`;
    g += `<rect x="${left - 26}" y="0" width="${right - left + 52}" height="400" fill="#b7bcc1"/>`;
    g += `<rect x="${left}" y="0" width="${right - left}" height="400" fill="#5d6268"/>`;
    if (o.busStop !== undefined) g += `<path d="M${right} ${o.busStop - 70} L${right + 24} ${o.busStop - 50} L${right + 24} ${o.busStop + 50} L${right} ${o.busStop + 70} Z" fill="#5d6268"/>` +
      `<rect x="${right + 30}" y="${o.busStop - 10}" width="20" height="20" rx="3" fill="#ffcd00" stroke="#111"/><text x="${right + 40}" y="${o.busStop + 4}" font-family="Arial" font-weight="700" font-size="10" text-anchor="middle">H</text>`;
    const edge = o.solidEdge ? '' : 'stroke-dasharray="6 6"';
    g += `<path d="M${left + 3} 0 V400 M${right - 3} 0 V400" stroke="#f1f5f9" stroke-width="2" ${edge}/>`;
    if (lanes === 4) {
      g += `<rect x="192" y="0" width="16" height="400" fill="#9ca3af"/><path d="M196 0 V400 M204 0 V400" stroke="#e5e7eb" stroke-width="2"/>`;
      g += `<path d="M${200 - 8 - W} 0 V400 M${208 + W} 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="14 12"/>`;
    } else if (lanes === 'oneway2') {
      g += `<path d="M200 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="14 12"/>`;
    } else {
      const c = o.centre || 'dashed';
      if (c === 'dashed') g += `<path d="M200 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="12 18"/>`;
      if (c === 'warning') g += `<path d="M200 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="36 9"/>`;
      if (c === 'solid') g += `<path d="M200 0 V400" stroke="#fff" stroke-width="3"/>`;
      if (c === 'double') g += `<path d="M197 0 V400 M203 0 V400" stroke="#fff" stroke-width="2.5"/>`;
      if (c === 'solid-left') g += `<path d="M203 0 V400" stroke="#fff" stroke-width="2.5"/><path d="M197 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="12 18"/>`;
      if (c === 'solid-right') g += `<path d="M197 0 V400" stroke="#fff" stroke-width="2.5"/><path d="M203 0 V400" stroke="#fff" stroke-width="2.5" stroke-dasharray="12 18"/>`;
      if (c === 'barrier') g += `<path d="M200 0 V400" stroke="#d1d5db" stroke-width="5"/><path d="M200 0 V400" stroke="#6b7280" stroke-width="1.5" stroke-dasharray="3 9"/>`;
    }
    if (o.crossing !== undefined) for (let x = left + 4; x < right - 4; x += 12) g += `<rect x="${x}" y="${o.crossing - 12}" width="7" height="24" fill="#f8fafc"/>`;

    let objs = '', arrows = '', labels = '';
    for (const s of o.signs || []) {
      const x = s.side === 'left' ? left - 44 : right + 40;
      objs += `<rect x="${x - 1.5}" y="${s.y}" width="3" height="22" fill="#6b7280"/>` + smallSign(s.name, x, s.y, 30);
    }
    const one = (v, isYou) => {
      const kind = v.kind || 'car';
      const x = v.x !== undefined ? v.x : laneX[v.lane || (isYou ? 'right' : 'oncoming')];
      const down = v.dir ? v.dir === 'down' : ['oncoming', 'oncoming2', 'far-shoulder'].includes(v.lane) && !isYou;
      const y = v.y !== undefined ? v.y : 300;
      const color = isYou ? COLORS.you : col(v.color || 'red');
      if (['ped', 'child'].includes(kind)) objs += placed(pedTop(v.color || 'orange'), x, y, v.rot || 90, kind === 'child' ? 0.8 : 1);
      else if (kind === 'ball') objs += `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#ef4444" stroke="#fff" stroke-width="2"/>`;
      else if (kind === 'moose' || kind === 'deer') objs += placed(animalTop(kind), x, y, v.rot || 90);
      else if (kind === 'cone') objs += `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#f97316" stroke="#fff" stroke-width="2"/>`;
      else objs += placed(vehicle(kind, color), x, y, down ? 180 : 0);
      if (v.path && v.path !== 'straight-none') {
        const sgn = down ? 1 : -1;
        const y0 = y + sgn * 30;
        let p = null;
        const lx = laneX.left !== undefined ? laneX.left : 200 - W / 2;
        switch (v.path) {
          case 'straight': p = [[x, y0], [x, y0 + sgn * 150]]; break;
          case 'overtake': p = [[x, y0]].concat(curve([x, y0 - 25], [x, y0 - 60], [lx, y0 - 90])).concat([[lx, y0 - 190]]).concat(curve([lx, y0 - 190], [lx, y0 - 230], [x, y0 - 250])); break;
          case 'change-left': p = [[x, y0]].concat(curve([x, y0 - 20], [x, y0 - 70], [x - W, y0 - 110])).concat([[x - W, y0 - 200]]); break;
          case 'change-right': p = [[x, y0]].concat(curve([x, y0 - 20], [x, y0 - 70], [x + W, y0 - 110])).concat([[x + W, y0 - 200]]); break;
          case 'pull-in': p = [[x, y0]].concat(curve([x, y0 - 20], [x, y0 - 60], [laneX.shoulder, y0 - 100])); break;
          case 'stop': break;
          default: break;
        }
        if (p) arrows += pathArrow(pts(p), color, markerFor(color), !isYou);
      }
      if (isYou) labels += youTag(x + 36, y + 10);
      else labels += tag(x + 26, y + 12, v.label, ['ped', 'child'].includes(kind) ? '#9a3412' : color);
    };
    for (const v of o.objects || []) one(v, false);
    if (o.you) one(o.you, true);
    return svgWrap(400, 400, `<defs>${markerDefs(markers)}</defs>${g}${arrows}${objs}${labels}`, o.alt);
  }
  function animalTop(kind) {
    const s = kind === 'moose' ? 1.25 : 0.9;
    return `<g transform="scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="20" fill="#5b3a1e"/><ellipse cx="0" cy="-22" rx="5" ry="8" fill="#5b3a1e"/>` +
      (kind === 'moose' ? `<path d="M-4 -26 Q-14 -30 -16 -22 M4 -26 Q14 -30 16 -22" stroke="#3b2510" stroke-width="3" fill="none"/>` : '') + `</g>`;
  }

  // ------------------------------------------------------- driver's view
  /*
   * view: {
   *   centre: 'dashed'|'solid'|'none', time:'day'|'night'|'dusk', weather:'clear'|'rain'|'snow'|'fog',
   *   curve: -1..1 (negative = bends left), crest: true (road disappears over a hill),
   *   lanes: 2 | 1 (narrow road) | 'motorway',
   *   signs: [{ name, side:'right'|'left', d: 0.05..0.9 }],
   *   objects: [{ kind:'car'|'truck'|'bus'|'bike'|'ped'|'child'|'ball'|'moose'|'deer'|'tractor', x:-1.6..1.6 (0 = centre line, 0.5 = your lane), d, label, color, facing:'away'|'toward' }],
   *   crossing: d, snowbanks: true, icy: true, glare: true, headlights: true (oncoming headlights)
   * }
   */
  function view(o) {
    const night = o.time === 'night', dusk = o.time === 'dusk';
    const HY = o.crest ? 162 : 150; // horizon
    const BY = 300;
    const yAt = (d) => HY + (BY - HY) * Math.pow(1 - d, 2.2);
    const half = (d) => 6 + 220 * Math.pow(1 - d, 2.2);
    const cx = (d) => 200 + (o.curve || 0) * 140 * Math.pow(d, 1.6);
    const roadEnd = o.crest ? 0.62 : 0.97;
    const skyTop = night ? '#0b1020' : dusk ? '#334155' : o.weather === 'fog' ? '#cbd5e1' : o.weather === 'snow' ? '#cbd5e1' : '#9cc9ef';
    const skyBot = night ? '#1e293b' : dusk ? '#f59e0b' : o.weather === 'fog' ? '#e2e8f0' : '#dbeafe';
    const ground = night ? '#1f2a1c' : o.weather === 'snow' || o.icy ? '#e8eef3' : '#7fae6a';
    const asphalt = night ? '#2a2d31' : o.weather === 'rain' ? '#4b5057' : o.icy ? '#9aa4ad' : '#646a70';
    const sid = nextId('sky');
    let g = `<defs><linearGradient id="${sid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyBot}"/></linearGradient></defs>`;
    g += `<rect width="400" height="300" fill="url(#${sid})"/>`;
    if (!night && !o.weather && !dusk) g += `<ellipse cx="90" cy="60" rx="34" ry="10" fill="#fff" opacity=".8"/><ellipse cx="300" cy="42" rx="40" ry="11" fill="#fff" opacity=".7"/>`;
    if (o.glare) g += `<circle cx="210" cy="${HY - 8}" r="26" fill="#fff7cc"/><circle cx="210" cy="${HY - 8}" r="60" fill="#fde68a" opacity=".45"/>`;
    // trees on horizon
    if (!o.weather || o.weather !== 'fog') g += `<path d="M0 ${HY} ${Array.from({ length: 21 }, (_, i) => `L${i * 20} ${HY - 8 - ((i * 37) % 13)} L${i * 20 + 10} ${HY}`).join(' ')} L400 ${HY} Z" fill="${night ? '#0f172a' : '#3f6b3a'}"/>`;
    g += `<rect y="${HY}" width="400" height="${300 - HY}" fill="${ground}"/>`;
    // road polygon
    const N = 30;
    const L = [], R = [];
    for (let i = 0; i <= N; i++) {
      const d = (i / N) * roadEnd;
      L.push([cx(d) - half(d), yAt(d)]); R.push([cx(d) + half(d), yAt(d)]);
    }
    const lanesN = o.lanes || 2;
    g += `<path d="${pts(L.concat(R.reverse()))} Z" fill="${asphalt}"/>`;
    R.reverse();
    if (o.snowbanks) g += `<path d="${pts(L.map((p) => [p[0] - 2, p[1]]))}" stroke="#fff" stroke-width="10" fill="none"/><path d="${pts(R.map((p) => [p[0] + 2, p[1]]))}" stroke="#fff" stroke-width="10" fill="none"/>`;
    // edge lines
    const edgeCol = night ? '#e2e8f0' : '#f1f5f9';
    g += `<path d="${pts(L.map((p, i) => [p[0] + 4 * (1 - i / N), p[1]]))}" stroke="${edgeCol}" stroke-width="2" fill="none" stroke-dasharray="8 8"/>`;
    g += `<path d="${pts(R.map((p, i) => [p[0] - 4 * (1 - i / N), p[1]]))}" stroke="${edgeCol}" stroke-width="2" fill="none" stroke-dasharray="8 8"/>`;
    // centre line
    const centre = o.centre || (lanesN === 1 ? 'none' : 'dashed');
    if (centre !== 'none') {
      for (let i = 0; i < N; i++) {
        const d0 = (i / N) * roadEnd, d1 = ((i + 0.55) / N) * roadEnd;
        if (centre === 'dashed' && i % 2) continue;
        const w = 4 * (1 - d0) + 0.5;
        g += `<path d="M${f(cx(d0))} ${f(yAt(d0))} L${f(cx(centre === 'dashed' ? d1 : (i + 1) / N * roadEnd))} ${f(yAt(centre === 'dashed' ? d1 : (i + 1) / N * roadEnd))}" stroke="#fff" stroke-width="${f(w)}"/>`;
      }
    }
    if (lanesN === 'motorway') {
      for (const k of [-0.5, 0.5]) for (let i = 0; i < N; i += 2) {
        const d0 = (i / N) * roadEnd, d1 = ((i + 0.6) / N) * roadEnd;
        g += `<path d="M${f(cx(d0) + k * half(d0))} ${f(yAt(d0))} L${f(cx(d1) + k * half(d1))} ${f(yAt(d1))}" stroke="#fff" stroke-width="${f(3 * (1 - d0) + 0.5)}"/>`;
      }
    }
    if (o.crossing !== undefined) {
      const d = o.crossing, y0 = yAt(d), y1 = yAt(d + 0.035);
      for (let k = -1; k < 1; k += 0.16) {
        const xa = cx(d) + k * half(d), xb = cx(d) + (k + 0.09) * half(d);
        const xc = cx(d + 0.035) + (k + 0.09) * half(d + 0.035), xd = cx(d + 0.035) + k * half(d + 0.035);
        g += `<path d="M${f(xa)} ${f(y0)} L${f(xb)} ${f(y0)} L${f(xc)} ${f(y1)} L${f(xd)} ${f(y1)} Z" fill="#f8fafc"/>`;
      }
    }
    // signs and objects sorted far -> near
    const items = [];
    for (const s of o.signs || []) items.push({ d: s.d ?? 0.3, draw: () => {
      const side = s.side === 'left' ? -1 : 1;
      const sc = half(s.d ?? 0.3) / 220;
      const x = cx(s.d ?? 0.3) + side * (half(s.d ?? 0.3) + 30 * sc + 6);
      const yb = yAt(s.d ?? 0.3);
      const size = Math.min(84, 18 + 110 * sc);
      const xs = Math.max(size / 2 + 4, Math.min(400 - size / 2 - 4, x));
      const top = Math.max(size / 2 + 4, yb - size * 1.6);
      return `<rect x="${f(xs - 1.5 - sc * 2)}" y="${f(top)}" width="${f(3 + sc * 4)}" height="${f(yb - top)}" fill="#9ca3af"/>` + smallSign(s.name, xs, top, size);
    } });
    for (const ob of o.objects || []) items.push({ d: ob.d ?? 0.3, draw: () => sprite(ob) });
    items.sort((a, b) => b.d - a.d);
    function sprite(ob) {
      const d = ob.d ?? 0.3;
      const sc = half(d) / 220;
      const x = cx(d) + (ob.x ?? 0.5) * half(d);
      const y = yAt(d);
      const c = col(ob.color || 'red');
      let s = '';
      switch (ob.kind) {
        case 'child': case 'ped': {
          const h = (ob.kind === 'child' ? 70 : 105) * sc;
          s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(h / 40)})"><circle cx="0" cy="-35" r="5" fill="#f1c27d"/><rect x="-6" y="-30" width="12" height="16" rx="4" fill="${col(ob.color || 'orange')}"/><rect x="-5" y="-15" width="4" height="15" fill="#1e3a8a"/><rect x="1" y="-15" width="4" height="15" fill="#1e3a8a"/></g>`;
          break;
        }
        case 'ball': s = `<circle cx="${f(x)}" cy="${f(y - 10 * sc)}" r="${f(10 * sc + 1)}" fill="#ef4444" stroke="#fff" stroke-width="${f(2 * sc + 0.5)}"/>`; break;
        case 'moose': case 'deer': {
          const k = ob.kind === 'moose' ? 1.3 : 0.9;
          s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc * 1.6 * k)})" fill="#4a2f17"><path d="M-30 -40 Q-30 -55 -10 -55 L18 -55 L26 -66 L34 -64 L36 -54 L28 -48 L24 -40 L22 0 L17 0 L15 -36 L-18 -36 L-20 0 L-25 0 L-26 -36 Z"/>${ob.kind === 'moose' ? '<path d="M26 -66 Q16 -80 12 -76 L20 -72 L14 -84 L24 -74 L26 -86 L30 -72 L38 -84 L36 -70 Z"/>' : ''}</g>`;
          break;
        }
        case 'bike': {
          const h = 100 * sc;
          s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(h / 40)})"><rect x="-1.5" y="-14" width="3" height="14" fill="#111"/><circle cx="0" cy="-36" r="4.5" fill="#f1c27d"/><rect x="-6" y="-31" width="12" height="15" rx="4" fill="${col(ob.color || 'green')}"/><rect x="-5" y="-17" width="10" height="6" fill="#1e3a8a"/></g>`;
          break;
        }
        case 'tractor': case 'truck': case 'bus': case 'car': default: {
          const w = (ob.kind === 'car' || !ob.kind ? 150 : 175) * sc;
          const h = (ob.kind === 'car' || !ob.kind ? 95 : ob.kind === 'tractor' ? 130 : 165) * sc;
          const toward = ob.facing === 'toward';
          s = `<g transform="translate(${f(x)} ${f(y)})">` +
            `<rect x="${f(-w / 2)}" y="${f(-h)}" width="${f(w)}" height="${f(h * 0.88)}" rx="${f(8 * sc + 1)}" fill="${ob.kind === 'truck' ? '#e5e7eb' : c}" stroke="#0005"/>` +
            `<rect x="${f(-w * 0.38)}" y="${f(-h * 0.92)}" width="${f(w * 0.76)}" height="${f(h * 0.3)}" rx="${f(4 * sc)}" fill="${ob.kind === 'truck' ? c : '#1e293b'}" opacity=".85"/>` +
            `<rect x="${f(-w / 2 + 4 * sc)}" y="${f(-h * 0.12)}" width="${f(w * 0.12)}" height="${f(h * 0.12)}" fill="#111"/><rect x="${f(w / 2 - 4 * sc - w * 0.12)}" y="${f(-h * 0.12)}" width="${f(w * 0.12)}" height="${f(h * 0.12)}" fill="#111"/>` +
            `<rect x="${f(-w * 0.44)}" y="${f(-h * 0.45)}" width="${f(w * 0.14)}" height="${f(h * 0.1)}" fill="${toward ? '#fffbe6' : '#ef4444'}"/><rect x="${f(w * 0.3)}" y="${f(-h * 0.45)}" width="${f(w * 0.14)}" height="${f(h * 0.1)}" fill="${toward ? '#fffbe6' : '#ef4444'}"/>` +
            (ob.braking ? `<rect x="${f(-w * 0.1)}" y="${f(-h * 0.98)}" width="${f(w * 0.2)}" height="${f(h * 0.05)}" fill="#ef4444"/>` : '') +
            (ob.kind === 'tractor' ? `<path d="M${f(-w * 0.3)} ${f(-h * 0.98)} L${f(w * 0.3)} ${f(-h * 0.98)} L${f(w * 0.2)} ${f(-h * 1.12)} L${f(-w * 0.2)} ${f(-h * 1.12)} Z" fill="#f97316"/>` : '') +
            (ob.kind === 'bus' ? `<rect x="${f(-w * 0.2)}" y="${f(-h * 0.6)}" width="${f(w * 0.4)}" height="${f(h * 0.12)}" fill="#fde047"/>` : '') +
            `</g>`;
          if (toward && night) s += `<circle cx="${f(x - w * 0.37)}" cy="${f(y - h * 0.4)}" r="${f(20 * sc + 3)}" fill="#fffbe6" opacity=".9"/><circle cx="${f(x + w * 0.37)}" cy="${f(y - h * 0.4)}" r="${f(20 * sc + 3)}" fill="#fffbe6" opacity=".9"/>`;
        }
      }
      if (ob.label) s += tag(x + 6 + 40 * sc, y - 70 * sc - 10, ob.label, '#111');
      return s;
    }
    g += items.map((i) => i.draw()).join('');
    if (night) g += `<path d="M120 300 L185 ${HY + 40} L215 ${HY + 40} L280 300 Z" fill="#fef9c3" opacity=".12"/>`;
    if (o.headlights) g += `<circle cx="${f(cx(0.75) - 8)}" cy="${f(yAt(0.75) - 4)}" r="9" fill="#fffbe6"/><circle cx="${f(cx(0.75) - 22)}" cy="${f(yAt(0.75) - 4)}" r="9" fill="#fffbe6"/><circle cx="${f(cx(0.75) - 15)}" cy="${f(yAt(0.75) - 4)}" r="40" fill="#fffbe6" opacity=".35"/>`;
    if (o.weather === 'rain') g += `<g stroke="#e2e8f0" stroke-width="1.2" opacity=".7">${Array.from({ length: 70 }, (_, i) => { const x = (i * 53) % 400, y = (i * 97) % 280; return `<path d="M${x} ${y} l-4 12"/>`; }).join('')}</g>`;
    if (o.weather === 'snow') g += `<g fill="#fff" opacity=".9">${Array.from({ length: 90 }, (_, i) => `<circle cx="${(i * 47) % 400}" cy="${(i * 83) % 300}" r="${1 + (i % 3)}"/>`).join('')}</g>`;
    if (o.weather === 'fog') g += `<rect width="400" height="300" fill="#e5e7eb" opacity=".55"/>`;
    // dashboard edge
    g += `<path d="M0 300 L0 284 Q200 268 400 284 L400 300 Z" fill="#111827"/>`;
    return svgWrap(400, 300, g, o.alt);
  }

  // ---------------------------------------------------------------- wrap
  function svgWrap(w, h, inner, alt) {
    return `<svg class="scene" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(alt || 'Traffic situation')}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  const Scene = {
    render(spec) {
      if (!spec) return '';
      if (spec.sign) return `<div class="scene-sign">${Signs.svg(spec.sign, 180)}</div>`;
      if (spec.signs) return `<div class="scene-signs">${spec.signs.map((s) => `<figure>${Signs.svg(s, 120)}${spec.labels ? `<figcaption>${esc(spec.labels[spec.signs.indexOf(s)])}</figcaption>` : ''}</figure>`).join('')}</div>`;
      if (spec.junction) return junction(spec.junction);
      if (spec.roundabout) return roundabout(spec.roundabout);
      if (spec.road) return road(spec.road);
      if (spec.view) return view(spec.view);
      throw new Error('Unknown scene spec: ' + JSON.stringify(spec));
    },
    junction, roundabout, road, view,
  };

  global.Signs = Signs;
  global.Scene = Scene;
})(typeof window !== 'undefined' ? window : globalThis);
