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
  // Official artwork from Transportstyrelsen, embedded by tools/fetch_signs.py (signs-official.js).
  // Only the English names live here; Swedish names are in sv/signs.js.
  const SIGNS = {
    yield: 'Give way (väjningsplikt)',
    stop: 'Stop (stopplikt)',
    'main-road': 'Priority road (huvudled)',
    'end-main-road': 'End of priority road',
    'oncoming-priority': 'Give way to oncoming traffic',
    'priority-over-oncoming': 'Priority over oncoming traffic',
    'w-crossroads': 'Warning: crossroads',
    'w-roundabout': 'Warning: roundabout',
    'w-pedestrian-crossing': 'Warning: pedestrian crossing',
    'w-children': 'Warning: children',
    'w-moose': 'Warning: moose (älg)',
    'w-deer': 'Warning: deer',
    'w-roadworks': 'Warning: roadworks',
    'w-slippery': 'Warning: slippery road',
    'w-traffic-lights': 'Warning: traffic lights',
    'w-level-crossing-gates': 'Warning: level crossing with barriers',
    'w-level-crossing': 'Warning: level crossing without barriers',
    'w-cyclists': 'Warning: cyclists',
    'w-narrowing': 'Warning: road narrows',
    'w-two-way': 'Warning: two-way traffic',
    'w-danger': 'Warning: other danger',
    'w-queue': 'Warning: queues likely',
    'w-steep-down': 'Warning: steep hill downwards',
    'w-bumps': 'Warning: speed bump',
    'w-curve-right': 'Warning: bend to the right',
    'w-curve-left': 'Warning: bend to the left',
    'no-entry': 'No entry for vehicles',
    'no-vehicles': 'No vehicles (both directions)',
    'no-overtaking': 'No overtaking',
    'no-left-turn': 'No left turn',
    'no-right-turn': 'No right turn',
    'no-u-turn': 'No U-turn',
    'no-parking': 'No parking',
    'no-stopping': 'No stopping or parking',
    'mandatory-right': 'Turn right (mandatory)',
    'mandatory-straight': 'Straight ahead only',
    'pass-right': 'Pass on the right side',
    'roundabout-mandatory': 'Roundabout',
    'bike-path': 'Cycle path',
    footpath: 'Footpath',
    'shared-path': 'Shared path for pedestrians and cyclists',
    'speed-30': 'Speed limit 30 km/h',
    'speed-40': 'Speed limit 40 km/h',
    'speed-50': 'Speed limit 50 km/h',
    'speed-60': 'Speed limit 60 km/h',
    'speed-70': 'Speed limit 70 km/h',
    'speed-80': 'Speed limit 80 km/h',
    'speed-90': 'Speed limit 90 km/h',
    'speed-100': 'Speed limit 100 km/h',
    'speed-110': 'Speed limit 110 km/h',
    'speed-120': 'Speed limit 120 km/h',
    parking: 'Parking',
    'ped-crossing': 'Pedestrian crossing',
    'bike-crossing': 'Cycle crossing',
    motorway: 'Motorway',
    'end-motorway': 'End of motorway',
    expressway: 'Expressway (motortrafikled)',
    'dead-end': 'Dead end',
    'one-way': 'One-way traffic',
    'pedestrian-zone': 'Pedestrian priority zone (gångfartsområde)',
    'speed-camera': 'Speed camera (ATK)',
    'bus-lane': 'Bus lane',
    'meeting-place': 'Passing place (mötesplats)',
  };

  const Signs = {
    list: () => Object.keys(SIGNS),
    has: (n) => Object.prototype.hasOwnProperty.call(SIGNS, n),
    name: (n) => SIGNS[n] || n,
    group(n) {
      if (/^w-/.test(n)) return 'Warning signs';
      if (/^speed-|^no-/.test(n)) return 'Prohibition signs';
      if (['yield', 'stop', 'main-road', 'end-main-road', 'oncoming-priority', 'priority-over-oncoming'].includes(n)) return 'Priority signs';
      if (['mandatory-right', 'mandatory-straight', 'pass-right', 'roundabout-mandatory', 'bike-path', 'footpath', 'shared-path'].includes(n)) return 'Mandatory signs';
      return 'Information signs';
    },
    /** the official sign picture, fitted into a 100x100 box */
    g(n) {
      const art = (window.SIGN_ART || {})[n];
      if (!SIGNS[n] || !art) throw new Error(`Unknown sign: ${n}`);
      return `<image href="${art[3]}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>`;
    },
    /** official sign number, e.g. B1 */
    code: (n) => ((window.SIGN_ART || {})[n] || [])[0],
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
