/* Körkort 30 — app logic. Plain JS, no build step, works from file:// and when hosted. */
(function () {
  'use strict';
  I18N.apply(); // swap content to the chosen language before anything reads TOPICS/QB/LESSONS/PLAN
  { // static shell text (shell.html ships the Swedish default)
    const sub = document.querySelector('.brand small'); if (sub) sub.textContent = T('brand.sub');
    const md = document.querySelector('meta[name=description]'); if (md) md.content = T('meta.description');
    document.querySelectorAll('#nav, #tabs').forEach((n) => n.setAttribute('aria-label', T('nav.sections')));
  }

  const $ =(s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TOPIC = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  const LETTERS = ['A', 'B', 'C', 'D'];
  const DAY_MS = 86400000;
  const DAILY_GOAL = 30; // questions a day for the green ring
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------- storage
  const KEY = 'korkort30.v1';
  const fresh = () => ({ start: null, testDate: null, setAt: 0, q: {}, lessons: {}, done: {}, doneT: {}, mocks: [], log: [], days: {}, xp: 0, badges: {}, best: 0, epoch: Math.random().toString(36).slice(2), epochAt: 0 });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* storage blocked: run in memory */ }
  let storageOk = true;
  function saveLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; } catch (e) { storageOk = false; }
  }
  function save() { saveLocal(); scheduleSync(); }

  // ------------------------------------------------------------- dates
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmt = (d) => d.toLocaleDateString(I18N.locale, { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtLong = (d) => d.toLocaleDateString(I18N.locale, { weekday: 'long', day: 'numeric', month: 'long' });
  function planDay() {
    if (!S.start) return 1;
    const n = Math.floor((today() - parse(S.start)) / DAY_MS) + 1;
    return Math.max(1, Math.min(30, n));
  }
  const dateOfDay = (n) => new Date(parse(S.start || iso(today())).getTime() + (n - 1) * DAY_MS);
  const greeting = () => { const h = new Date().getHours(); return T(h < 5 ? 'greet.late' : h < 12 ? 'greet.morning' : h < 18 ? 'greet.afternoon' : 'greet.evening'); };

  // ------------------------------------------------------------- icons (SF Symbols-style line icons)
  const ICON = {
    today: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    plan: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    lessons: '<path d="M4 5.5C6.5 4 9.5 4 12 5.5v14c-2.5-1.5-5.5-1.5-8 0z"/><path d="M20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/>',
    practice: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    mock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6M19 6l1.5-1.5"/>',
    mistakes: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    signs: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4M12 17v.5"/>',
    progress: '<path d="M4 20V11M10 20V5M16 20v-7M22 20H2"/>',
    flame: '<path d="M12 22c4.4 0 7-2.9 7-6.6 0-3.6-2.4-5.6-3.6-8.4-.3 1.8-1.2 3-2.4 3.6.3-3.4-1.3-6.5-4.2-8.6.2 3-1.4 5.1-2.9 7C4.6 10.9 5 12.7 5 15.4 5 19.1 7.6 22 12 22z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    car: '<path d="M5 17h14v-4l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
    person: '<circle cx="12" cy="6" r="3"/><path d="M6 21v-5a6 6 0 0 1 12 0v5"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15z"/><path d="M5 19 13 11"/>',
    cross: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  };
  const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`;

  // Each topic gets an iOS-Settings-style tile: a coloured square holding a sign or a glyph.
  const TOPIC_LOOK = {
    signs: ['#ff9500', { sign: 'w-danger' }], priority: ['#ff3b30', { sign: 'yield' }], turning: ['#007aff', { sign: 'roundabout-mandatory' }],
    speed: ['#ff2d55', { sign: 'speed-50' }], parking: ['#0a84ff', { sign: 'parking' }], roads: ['#30b0c7', { sign: 'motorway' }],
    vulnerable: ['#5856d6', { sign: 'ped-crossing' }], people: ['#af52de', { glyph: 'person' }], conditions: ['#64748b', { sign: 'w-moose' }],
    vehicle: ['#34c759', { glyph: 'car' }], environment: ['#30a46c', { glyph: 'leaf' }], emergency: ['#ff3b30', { glyph: 'cross' }],
  };
  function topicTile(id, size = 36) {
    const [c, look] = TOPIC_LOOK[id] || ['#8e8e93', { glyph: 'star' }];
    const inner = look.sign ? Signs.svg(look.sign, Math.round(size * 0.72)) : `<span style="color:#fff">${icon(look.glyph)}</span>`;
    return `<span class="tile" style="--tile:${c};--s:${size}px">${inner}</span>`;
  }

  // ------------------------------------------------------ question pool
  // Sign drill questions are generated from the sign library.
  // Signs.group() returns English group names; they are data keys here and get translated for display.
  const GROUP_KEY = { 'Warning signs': 'warning', 'Prohibition signs': 'prohibition', 'Priority signs': 'priority', 'Mandatory signs': 'mandatory', 'Information signs': 'information' };
  const SIGN_Q = Signs.list().map((name) => {
    const group = Signs.group(name);
    const pool = Signs.list().filter((n) => n !== name);
    const same = pool.filter((n) => Signs.group(n) === group && !(/^speed-/.test(n) && /^speed-/.test(name)));
    const pick = (arr, k, seed) => arr.map((v, i) => [v, (i * 7919 + seed * 104729) % 1000]).sort((a, b) => a[1] - b[1]).slice(0, k).map((x) => x[0]);
    const seed = name.length * 31 + name.charCodeAt(0);
    const wrong = pick(same.length >= 3 ? same : pool, 3, seed).map((n) => Signs.name(n));
    return {
      id: `sign-${name}`, topic: 'signs', generated: true,
      q: T('sign.q'), img: { sign: name },
      options: [Signs.name(name)].concat(wrong), answer: 0,
      explain: T('sign.explain', { name: Signs.name(name), hint: groupHint(group) }),
    };
  });
  function groupHint(g) { return GROUP_KEY[g] ? T(`signs.hint.${GROUP_KEY[g]}`) : ''; }
  const ALL = QB.concat(SIGN_Q);
  const REAL = QB; // written questions (used for practice + mocks)

  // ------------------------------------------------------------- stats
  const qs = (id) => S.q[id] || (S.q[id] = { seen: 0, right: 0, wrong: 0, box: 0, last: 0, miss: false });
  const dayRec = (d = iso(today())) => S.days[d] || (S.days[d] = { a: 0, r: 0, t: 0 });
  function record(id, ok) {
    const s = qs(id);
    s.seen++; s.last = Date.now();
    if (ok) { s.right++; s.box = Math.min(5, s.box + 1); if (s.box >= 2) s.miss = false; }
    else { s.wrong++; s.box = 0; s.miss = true; }
    const d = dayRec(); d.a++; if (ok) d.r++;
  }
  function topicStats(topicId) {
    const list = REAL.filter((q) => q.topic === topicId).concat(topicId === 'signs' ? SIGN_Q : []);
    let seen = 0, right = 0, tries = 0, mastered = 0;
    for (const q of list) {
      const s = S.q[q.id];
      if (!s || !s.seen) continue;
      seen++; right += s.right; tries += s.seen; if (s.box >= 2) mastered++;
    }
    return { total: list.length, seen, acc: tries ? right / tries : null, mastery: list.length ? mastered / list.length : 0 };
  }
  function weakTopics(k = 2) {
    return TOPICS.map((t) => ({ id: t.id, st: topicStats(t.id) }))
      .filter((x) => x.st.total)
      .map((x) => ({ id: x.id, score: (x.st.acc ?? 0.5) * 0.6 + x.st.mastery * 0.4 }))
      .sort((a, b) => a.score - b.score).slice(0, k).map((x) => x.id);
  }
  const mistakes = () => ALL.filter((q) => S.q[q.id] && S.q[q.id].miss);
  function readiness() {
    const recent = S.mocks.slice(-3);
    const mockPart = recent.length ? recent.reduce((a, m) => a + m.score / m.total, 0) / recent.length : null;
    const topicPart = TOPICS.reduce((a, t) => a + topicStats(t.id).mastery, 0) / TOPICS.length;
    if (mockPart === null) return { pct: Math.round(topicPart * 70), basis: 'topics' };
    return { pct: Math.round((mockPart * 0.7 + topicPart * 0.3) * 100), basis: 'mocks' };
  }

  // ------------------------------------------------------------- streaks, XP, levels, badges
  const activeOn = (d) => { const r = S.days[d]; return !!r && (r.a >= 10 || r.t > 0); };
  function streak() {
    let n = 0; let d = today();
    if (!activeOn(iso(d))) d = new Date(d.getTime() - DAY_MS); // today still open: count up to yesterday
    while (activeOn(iso(d))) { n++; d = new Date(d.getTime() - DAY_MS); }
    return { n, todayDone: activeOn(iso(today())) };
  }
  const LEVELS = [0, 150, 400, 800, 1300, 2000, 2900, 4000, 5300, 6800, 8500, 10500].map((xp, i) => [xp, T(`level.${i}`)]);
  function level() {
    let i = 0; while (i + 1 < LEVELS.length && S.xp >= LEVELS[i + 1][0]) i++;
    const cur = LEVELS[i][0], nxt = LEVELS[i + 1] ? LEVELS[i + 1][0] : cur;
    return { n: i + 1, name: LEVELS[i][1], next: LEVELS[i + 1] ? LEVELS[i + 1][1] : null, frac: nxt > cur ? (S.xp - cur) / (nxt - cur) : 1, toNext: nxt - S.xp };
  }
  const BADGES = [
    { id: 'first', test: () => S.log.length >= 1 },
    { id: 'day1', test: () => PLAN.some((d) => dayDone(d.day)) },
    { id: 's3', test: () => S.best >= 3 },
    { id: 's7', test: () => S.best >= 7 },
    { id: 's14', test: () => S.best >= 14 },
    { id: 's30', test: () => S.best >= 30 },
    { id: 'q100', test: () => totalAnswered() >= 100 },
    { id: 'q500', test: () => totalAnswered() >= 500 },
    { id: 'perfect', test: () => S.log.some((l) => l.total >= 15 && l.right === l.total) },
    { id: 'combo10', test: () => (S.maxCombo || 0) >= 10 },
    { id: 'mock1', test: () => S.mocks.length >= 1 },
    { id: 'pass', test: () => S.mocks.some((m) => m.passed) },
    { id: 'm60', test: () => S.mocks.some((m) => m.score / m.total >= 60 / 65) },
    { id: 'signs', test: () => SIGN_Q.every((q) => (S.q[q.id] || {}).box >= 2) },
    { id: 'junction', test: () => topicStats('priority').mastery >= 0.8 },
    { id: 'lessons', test: () => Object.keys(S.lessons).length >= 12 },
  ];
  for (const b of BADGES) { b.name = T(`badge.${b.id}.name`); b.desc = T(`badge.${b.id}.desc`); }
  const totalAnswered = () => Object.values(S.q).reduce((a, s) => a + s.seen, 0);
  let newBadges = [];
  function checkBadges() {
    S.best = Math.max(S.best || 0, streak().n);
    for (const b of BADGES) if (!S.badges[b.id] && b.test()) { S.badges[b.id] = Date.now(); S.xp += 50; newBadges.push(b); }
  }
  function addXP(n) { S.xp = Math.max(0, (S.xp || 0) + n); }

  // ------------------------------------------------------ picking questions
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function priority(q) {
    const s = S.q[q.id];
    if (!s || !s.seen) return Math.random() * 0.5;                // unseen first
    if (s.miss) return 0.2 + Math.random() * 0.5;                  // then mistakes
    return 1 + s.box + (Date.now() - s.last < DAY_MS ? 2 : 0) + Math.random(); // then least known
  }
  function resolveTopics(topics) {
    if (!topics || topics.includes('all')) return TOPICS.map((t) => t.id);
    return [...new Set(topics.flatMap((t) => (t === 'weak' ? weakTopics(2) : [t])))];
  }
  function pickPractice(topics, n) {
    const ids = resolveTopics(topics);
    let pool = REAL.filter((q) => ids.includes(q.topic));
    if (ids.length === 1 && ids[0] === 'signs') pool = pool.concat(SIGN_Q);
    if (!pool.length) pool = SIGN_Q.filter((q) => ids.includes(q.topic));
    const byTopic = {};
    for (const q of pool.slice().sort((a, b) => priority(a) - priority(b))) (byTopic[q.topic] = byTopic[q.topic] || []).push(q);
    const out = []; const keys = shuffle(Object.keys(byTopic));
    while (out.length < Math.min(n, pool.length)) for (const k of keys) { if (byTopic[k].length && out.length < n) out.push(byTopic[k].shift()); }
    return shuffle(out);
  }
  function pickMock() {
    const out = [];
    for (const [topic, k] of Object.entries(MOCK_MIX)) {
      const pool = shuffle(REAL.filter((q) => q.topic === topic)).sort((a, b) => ((S.q[a.id] || {}).last || 0) - ((S.q[b.id] || {}).last || 0));
      out.push(...pool.slice(0, k));
    }
    const rest = shuffle(ALL.filter((q) => !out.includes(q)));
    while (out.length < MOCK.questions && rest.length) out.push(rest.shift());
    return shuffle(out);
  }
  function pickSigns(n) {
    const sorted = SIGN_Q.slice().sort((a, b) => priority(a) - priority(b));
    return shuffle(n ? sorted.slice(0, n) : sorted);
  }

  // ------------------------------------------------------------- plan helpers
  const dayDone = (n) => PLAN[n - 1].tasks.every((_, i) => S.done[`${n}-${i}`]);
  const dayProgress = (n) => PLAN[n - 1].tasks.filter((_, i) => S.done[`${n}-${i}`]).length / PLAN[n - 1].tasks.length;
  function markDone(key, on = true) {
    const was = !!S.done[key];
    S.done[key] = on; S.doneT[key] = Date.now();
    if (on && !was) {
      dayRec().t++; addXP(40);
      const n = +key.split('-')[0];
      if (dayDone(n)) { addXP(100); celebrate = { title: T('celebrate.title', { n }), body: n < 30 ? T('celebrate.tomorrow', { title: PLAN[n].title }) : T('celebrate.planDone') }; }
    }
  }
  let celebrate = null;

  // ------------------------------------------------------------- session
  let session = null;
  let timer = null;
  let pendingTask = null;
  function startSession(opts) {
    if (!opts.items.length) { toast(T('session.none')); return; }
    const items = opts.items.map((q) => ({ q, order: shuffle(q.options.map((_, i) => i)), pick: null }));
    session = { mode: opts.mode, title: opts.title, items, i: 0, taskKey: opts.taskKey || null, started: Date.now(), revealed: false, finished: false,
      deadline: opts.mode === 'mock' ? Date.now() + MOCK.minutes * 60000 : null, combo: 0, xp: 0, xpBefore: S.xp, levelBefore: level().n };
    go('quiz');
  }
  function startTask(dayN, idx) {
    const day = PLAN[dayN - 1]; const t = day.tasks[idx]; const key = `${dayN}-${idx}`;
    if (t.type === 'lesson') { const topic = t.topic === 'weak' ? weakTopics(1)[0] : t.topic; pendingTask = { key, topic }; go(`lesson-${topic}`); return; }
    if (t.type === 'facts') { pendingTask = { key, facts: true }; go('facts'); return; }
    if (t.type === 'todo') { markDone(key, !S.done[key]); checkBadges(); save(); render(); return; }
    if (t.type === 'practice') {
      const topics = resolveTopics(t.topics);
      startSession({ mode: 'practice', title: t.label || T('session.practiceTopics', { topics: topics.map((x) => TOPIC[x].short).join(' + ') }), items: pickPractice(t.topics, t.n), taskKey: key });
    }
    if (t.type === 'signs') startSession({ mode: 'practice', title: t.n ? T('session.signDrill') : T('session.everySign'), items: pickSigns(t.n), taskKey: key });
    if (t.type === 'review') {
      const list = mistakes();
      if (!list.length) { markDone(key); checkBadges(); save(); toast(T('session.noMistakesTicked')); render(); return; }
      startSession({ mode: 'practice', title: T('session.mistakesReview'), items: shuffle(list).slice(0, 40), taskKey: key });
    }
    if (t.type === 'mock') startSession({ mode: 'mock', title: T('session.mock'), items: pickMock(), taskKey: key });
  }
  function nextTask() {
    const n = planDay(); const i = PLAN[n - 1].tasks.findIndex((_, k) => !S.done[`${n}-${k}`]);
    return i < 0 ? null : { n, i, t: PLAN[n - 1].tasks[i] };
  }

  function answer(optIndex) {
    const it = session.items[session.i];
    if (session.mode === 'mock') { it.pick = optIndex; render(); return; }
    if (session.revealed) return;
    it.pick = optIndex; session.revealed = true;
    const ok = optIndex === it.q.answer;
    record(it.q.id, ok);
    if (ok) { session.combo++; const g = 10 + (session.combo >= 3 ? 5 : 0); session.xp += g; addXP(g); S.maxCombo = Math.max(S.maxCombo || 0, session.combo); }
    else { session.combo = 0; session.xp += 2; addXP(2); }
    save();
    render();
    const fb = $('.feedback'); if (fb && window.innerWidth < 900) fb.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'nearest' });
  }
  function next() {
    if (session.mode !== 'mock' && !session.revealed) return;
    if (session.i < session.items.length - 1) { session.i++; session.revealed = false; render(); window.scrollTo({ top: 0 }); }
    else finish();
  }
  function finish() {
    if (!session || session.finished) return;
    session.finished = true;
    clearInterval(timer);
    const right = session.items.filter((x) => x.pick === x.q.answer).length;
    const total = session.items.length;
    if (session.mode === 'mock') {
      for (const it of session.items) record(it.q.id, it.pick === it.q.answer);
      const byTopic = {};
      for (const it of session.items) { const b = byTopic[it.q.topic] || (byTopic[it.q.topic] = [0, 0]); b[1]++; if (it.pick === it.q.answer) b[0]++; }
      const passed = Math.round((right / total) * MOCK.questions) >= MOCK.pass;
      S.mocks.push({ date: Date.now(), score: right, total, passed, byTopic, secs: Math.round((Date.now() - session.started) / 1000) });
      const g = right * 5 + 100 + (passed ? 200 : 0); session.xp += g; addXP(g);
    }
    S.log.push({ date: Date.now(), mode: session.mode, title: session.title, right, total });
    if (session.taskKey) markDone(session.taskKey);
    newBadges = [];
    checkBadges();
    session.badges = newBadges.slice();
    save();
    session.result = { right, total };
    render();
    if (right / total >= 0.8 || session.badges.length || celebrate) confetti();
  }

  // ------------------------------------------------------------- routing
  let route = (location.hash || '#today').slice(1);
  function go(r) { route = r; if (location.hash.slice(1) !== r) history.replaceState(null, '', '#' + r); render(); window.scrollTo({ top: 0 }); }
  window.addEventListener('hashchange', () => { route = location.hash.slice(1) || 'today'; render(); window.scrollTo({ top: 0 }); });

  const NAV = ['today', 'plan', 'lessons', 'practice', 'mock', 'mistakes', 'signs', 'progress'].map((id) => [id, T(`nav.${id}`), id]);
  const TABS = ['today', 'plan', 'lessons', 'practice', 'progress'];
  function activeSection() {
    if (route.startsWith('lesson-') || route === 'facts') return 'lessons';
    if (route.startsWith('day-')) return 'plan';
    if (route === 'quiz') return session && session.mode === 'mock' ? 'mock' : 'practice';
    return route;
  }

  function render() {
    if (route !== 'quiz') clearInterval(timer);
    const active = activeSection();
    const mc = mistakes().length;
    const st = streak(); const lv = level();
    $('#nav').innerHTML = NAV.map(([id, label, ic]) => `<a href="#${id}" class="${active === id ? 'on' : ''}" ${active === id ? 'aria-current="page"' : ''}>${icon(ic)}<span>${label}</span>${id === 'mistakes' && mc ? `<span class="pill">${mc}</span>` : ''}</a>`).join('');
    $('#tabs').innerHTML = TABS.map((id) => { const n = NAV.find((x) => x[0] === id); const on = active === id || (id === 'practice' && ['mock', 'mistakes', 'signs'].includes(active)); return `<a href="#${id}" class="${on ? 'on' : ''}" ${on ? 'aria-current="page"' : ''}>${icon(n[2])}<span>${n[1]}</span></a>`; }).join('');
    $('#me').innerHTML = S.start ? `<div class="me-row"><span class="chip flame ${st.todayDone ? 'lit' : ''}">${icon('flame')}${st.n}</span><span class="chip">${icon('star')}${S.xp} XP</span></div>
      <div class="me-level"><span>${T('level.label', { n: lv.n, name: esc(lv.name) })}</span><span class="lbar"><i style="width:${Math.round(lv.frac * 100)}%"></i></span></div>` : '';
    let ls = $('#langSwitch');
    if (!ls) { ls = document.createElement('div'); ls.id = 'langSwitch'; ls.className = 'actions'; $('.sidebar').appendChild(ls); }
    ls.innerHTML = langButtons('small');
    document.body.classList.toggle('focus', route === 'quiz' && !!session && !session.finished);
    const main = $('#main');
    let html;
    if (!S.start && route !== 'progress') html = viewWelcome();
    else if (route === 'today') html = viewToday();
    else if (route === 'plan') html = viewPlan();
    else if (route.startsWith('day-')) html = viewDay(+route.slice(4));
    else if (route === 'lessons') html = viewLessons();
    else if (route.startsWith('lesson-')) html = viewLesson(route.slice(7));
    else if (route === 'facts') html = viewFacts();
    else if (route === 'practice') html = viewPractice();
    else if (route === 'quiz') html = session ? viewQuiz() : viewPractice();
    else if (route === 'mock') html = viewMockIntro();
    else if (route === 'mistakes') html = viewMistakes();
    else if (route === 'signs') html = viewSigns();
    else if (route === 'progress') html = viewProgress();
    else html = viewToday();
    main.innerHTML = html;
    main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter');
    if (route === 'quiz' && session && session.mode === 'mock' && !session.finished) tickTimer();
    if (celebrate && route !== 'quiz') showCelebrate();
    if (newBadges.length && !(route === 'quiz' && session && session.finished)) { for (const b of newBadges) toast(T('badge.unlocked', { name: b.name }), 'trophy'); newBadges = []; }
  }

  // ------------------------------------------------------------- shared bits
  /** Svenska / English switch. Labels stay in their own language so either is findable. */
  function langButtons(size = '') {
    return `<span class="muted small">${T('lang.label')}</span>` + ['sv', 'en'].map((l) => `<button class="btn ${LANG === l ? 'filled' : 'plain'} ${size}" data-act="lang" data-lang="${l}" lang="${l}" aria-pressed="${LANG === l}">${T(`lang.${l}`)}</button>`).join('');
  }
  /** A question's picture: its approved real photo (photos.js) with the credit, falling back to the
   *  drawing if the photo cannot load, for example offline; otherwise the drawing. */
  function questionPic(q) {
    const drawn = Scene.render(q.img);
    const p = (window.PHOTOS || {})[q.id];
    if (!p) return drawn;
    return `<span class="photo"><img src="photos/${esc(p.file)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('fail')">` +
      `<small>${T('photo.credit', { author: esc(p.author), license: `<a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener">${esc(p.license)}</a>` })} · <a href="${esc(p.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></small></span>` +
      `<span class="photo-fallback">${drawn}</span>`;
  }

  function rings(vals, size = 168) {
    // vals: [{v: 0..1+, color, track}]
    const c = size / 2; const w = size * 0.115; const gap = w * 0.22;
    return `<svg class="rings" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">${vals.map((r, i) => {
      const rad = c - w / 2 - i * (w + gap); const len = 2 * Math.PI * rad; const v = Math.max(0, Math.min(1, r.v));
      return `<circle cx="${c}" cy="${c}" r="${rad}" fill="none" stroke="${r.color}" stroke-opacity=".22" stroke-width="${w}"/>` +
        `<circle class="ring" cx="${c}" cy="${c}" r="${rad}" fill="none" stroke="${r.color}" stroke-width="${w}" stroke-linecap="round" transform="rotate(-90 ${c} ${c})" style="--len:${len.toFixed(1)};--off:${(len * (1 - v)).toFixed(1)}" stroke-dasharray="${len.toFixed(1)}" stroke-dashoffset="${(len * (1 - v)).toFixed(1)}"/>`;
    }).join('')}</svg>`;
  }
  const RING = { plan: '#ff375f', q: '#30d158', acc: '#0a84ff' };
  function todayRings() {
    const n = planDay(); const d = S.days[iso(today())] || { a: 0, r: 0 };
    const tasksDone = PLAN[n - 1].tasks.filter((_, i) => S.done[`${n}-${i}`]).length; const tasksAll = PLAN[n - 1].tasks.length;
    const acc = d.a ? d.r / d.a : 0;
    return { tasksDone, tasksAll, a: d.a, acc, vals: [{ v: tasksDone / tasksAll, color: RING.plan }, { v: d.a / DAILY_GOAL, color: RING.q }, { v: d.a ? acc / 0.85 : 0, color: RING.acc }] };
  }
  function weekStrip() {
    const out = []; const t = today();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(t.getTime() - i * DAY_MS); const k = iso(d); const on = activeOn(k);
      out.push(`<li class="${on ? 'on' : ''} ${i === 0 ? 'now' : ''}"><span>${d.toLocaleDateString(I18N.locale, { weekday: 'narrow' })}</span><i>${on ? icon('check') : ''}</i></li>`);
    }
    return `<ol class="week-strip" aria-label="${T('today.last7')}">${out.join('')}</ol>`;
  }

  function taskLabel(t, dayN) {
    switch (t.type) {
      case 'lesson': return t.topic === 'weak' ? `${T('task.rereadWeak')}${dayN && planDay() >= dayN ? `: ${TOPIC[weakTopics(1)[0]].name}` : ''}` : TOPIC[t.topic].name;
      case 'practice': {
        const names = t.topics.includes('all') ? T('task.allTopics') : t.topics.includes('weak') ? T('task.yourWeakest') : t.topics.map((x) => TOPIC[x].short).join(', ');
        return `${t.label || names}`;
      }
      case 'signs': return t.n ? T('task.nSigns', { n: t.n }) : T('task.everySign', { n: SIGN_Q.length });
      case 'review': return T('task.reviewMistakes');
      case 'mock': return T('task.mockLabel', { q: MOCK.questions, m: MOCK.minutes });
      case 'facts': return T('task.factsSheet');
      case 'todo': return t.text;
      default: return '';
    }
  }
  function taskSub(t) {
    switch (t.type) {
      case 'lesson': return T('task.sub.lesson');
      case 'practice': return `${T('common.questions', { n: t.n })}${t.label ? ` · ${t.topics.includes('all') ? T('task.sub.allTopics') : t.topics.includes('weak') ? T('task.sub.weakest') : t.topics.map((x) => TOPIC[x].short).join(', ')}` : ''}`;
      case 'signs': return T('task.sub.signs');
      case 'review': return T('task.sub.onList', { n: mistakes().length });
      case 'mock': return T('task.sub.mock');
      case 'facts': return T('task.sub.read');
      case 'todo': return T('task.sub.todo');
      default: return '';
    }
  }
  const taskMins = (t) => ({ lesson: 20, practice: Math.round(t.n * 0.75), signs: t.n ? Math.ceil(t.n / 3) : 15, review: 10, mock: MOCK.minutes + 10, facts: 15, todo: 5 }[t.type] || 10);
  const TASK_ICON = { lesson: ['lessons', '#ff9500'], practice: ['practice', '#007aff'], signs: ['signs', '#ff9f0a'], review: ['mistakes', '#ff375f'], mock: ['mock', '#5856d6'], facts: ['lessons', '#34c759'], todo: ['check', '#8e8e93'] };

  function taskList(dayN) {
    const day = PLAN[dayN - 1];
    return `<ol class="group tasks">${day.tasks.map((t, i) => {
      const key = `${dayN}-${i}`; const done = !!S.done[key];
      const [ic, color] = TASK_ICON[t.type];
      const action = t.type === 'todo' ? (done ? T('task.undo') : T('task.done')) : done ? T('task.again') : T('common.start');
      return `<li class="row task ${done ? 'done' : ''}">
        <button class="check" data-act="toggle" data-key="${key}" aria-pressed="${done}" aria-label="${done ? T('task.markNotDone') : T('task.markDone')}">${icon('check')}</button>
        <span class="tile small" style="--tile:${color};--s:30px"><span style="color:#fff">${icon(ic)}</span></span>
        <div class="tbody"><span class="tlabel">${esc(taskLabel(t, dayN))}</span><span class="tsub">${esc(taskSub(t))} · ${taskMins(t)} min</span></div>
        <button class="btn ${done ? 'tinted' : 'filled'} small" data-act="task" data-day="${dayN}" data-i="${i}">${action}</button>
      </li>`;
    }).join('')}</ol>`;
  }

  // ------------------------------------------------------------- cloud: sync between devices + daily reminders
  // Works on the hosted site only (Vercel functions in /api). A random sync code links devices.
  const hosted = /^https?:$/.test(location.protocol);
  const SYNC_KEY = 'korkort30.sync';
  const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const cloud = { checked: false, sync: false, push: false, vapid: null, status: 'off', last: 0, error: '', subscribed: false };
  let syncId = null;
  try { syncId = localStorage.getItem(SYNC_KEY); } catch (e) { /* no storage */ }
  const newCode = () => Array.from(crypto.getRandomValues(new Uint8Array(20)), (b) => CODE_CHARS[b % 32]).join('');
  const prettyCode = (c) => (c || '').match(/.{1,4}/g).join('-');
  const cleanCode = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/[01IO]/g, '');
  const linkUrl = () => `${location.origin}${location.pathname}#link-${syncId}`;
  async function api(path, opts = {}) {
    const r = await fetch(`/api/${path}`, { headers: { 'content-type': 'application/json' }, ...opts });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || T('error.server', { status: r.status }));
    return j;
  }
  /** Merge two progress states. Every field merges so that no device's work is lost. */
  function merge(a, b) {
    if (!b) return a;
    if ((a.epoch || '') !== (b.epoch || '') && (a.epochAt || 0) !== (b.epochAt || 0)) return (a.epochAt || 0) > (b.epochAt || 0) ? a : Object.assign(fresh(), b);
    const m = Object.assign(fresh(), a);
    const newer = (b.setAt || 0) > (a.setAt || 0) ? b : a;
    m.start = newer.start || a.start || b.start; m.testDate = newer.testDate ?? a.testDate; m.setAt = Math.max(a.setAt || 0, b.setAt || 0);
    m.q = { ...a.q };
    for (const [id, s] of Object.entries(b.q || {})) { const o = m.q[id]; if (!o || s.seen > o.seen || (s.seen === o.seen && s.last > o.last)) m.q[id] = s; }
    m.lessons = { ...b.lessons, ...a.lessons };
    m.done = {}; m.doneT = {};
    for (const k of new Set([...Object.keys(a.done || {}), ...Object.keys(b.done || {})])) {
      const ta = (a.doneT || {})[k] || 0, tb = (b.doneT || {})[k] || 0;
      m.done[k] = ta === tb ? !!((a.done || {})[k] || (b.done || {})[k]) : ta > tb ? !!a.done[k] : !!b.done[k];
      m.doneT[k] = Math.max(ta, tb);
    }
    const byDate = (x, y) => { const seen = new Set(); return [...(x || []), ...(y || [])].filter((e) => { const k = `${e.date}|${e.title || ''}|${e.score ?? e.right}`; if (seen.has(k)) return false; seen.add(k); return true; }).sort((p, q) => p.date - q.date); };
    m.mocks = byDate(a.mocks, b.mocks); m.log = byDate(a.log, b.log);
    m.days = { ...a.days };
    for (const [d, r] of Object.entries(b.days || {})) { const o = m.days[d] || { a: 0, r: 0, t: 0 }; m.days[d] = { a: Math.max(o.a, r.a), r: Math.max(o.r, r.r), t: Math.max(o.t, r.t) }; }
    m.badges = { ...b.badges, ...a.badges };
    for (const k of ['xp', 'best', 'maxCombo']) m[k] = Math.max(a[k] || 0, b[k] || 0);
    m.epoch = a.epoch || b.epoch; m.epochAt = Math.max(a.epochAt || 0, b.epochAt || 0);
    return m;
  }
  let syncing = Promise.resolve(); let pushT = null; let dirty = false;
  function syncNow(opts = {}) {
    if (!hosted || !syncId || !cloud.sync) return Promise.resolve();
    syncing = syncing.then(async () => {
      cloud.status = 'syncing'; paintSync();
      try {
        if (!opts.overwrite) {
          const { state } = await api(`sync?id=${syncId}`);
          const before = JSON.stringify(S);
          S = merge(S, state);
          if (JSON.stringify(S) !== before) { saveLocal(); if (!opts.quiet) render(); }
        }
        await api('sync', { method: 'PUT', body: JSON.stringify({ id: syncId, state: S }), keepalive: JSON.stringify(S).length < 60000 });
        dirty = false; cloud.status = 'ok'; cloud.last = Date.now(); cloud.error = '';
      } catch (e) { cloud.status = 'error'; cloud.error = e.message; }
      paintSync();
    });
    return syncing;
  }
  function scheduleSync() { if (!syncId) return; dirty = true; clearTimeout(pushT); pushT = setTimeout(() => syncNow({ quiet: true }), 2500); }
  function paintSync() { const el = $('#syncStatus'); if (el) el.innerHTML = syncLine(); const dot = $('#syncDot'); if (dot) dot.className = `syncdot ${cloud.status}`; }
  function syncLine() {
    if (cloud.status === 'syncing') return T('sync.syncing');
    if (cloud.status === 'error') return T('sync.notSynced', { error: esc(cloud.error) });
    if (cloud.last) return T('sync.syncedAt', { time: new Date(cloud.last).toLocaleTimeString(I18N.locale, { hour: '2-digit', minute: '2-digit' }) });
    return T('sync.waiting');
  }
  async function linkDevice(code, { fresh: isNew = false } = {}) {
    syncId = code;
    try { localStorage.setItem(SYNC_KEY, code); } catch (e) { /* ignore */ }
    if (!isNew) {
      const { state } = await api(`sync?id=${code}`);
      if (state) { S.epoch = state.epoch; S.epochAt = state.epochAt; S = merge(S, state); saveLocal(); }
    }
    await syncNow({ overwrite: isNew });
  }
  function unlink() { syncId = null; try { localStorage.removeItem(SYNC_KEY); } catch (e) { /* ignore */ } cloud.status = 'off'; }

  // --- reminders
  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const b64ToBytes = (s) => { const p = '='.repeat((4 - (s.length % 4)) % 4); const raw = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(raw, (c) => c.charCodeAt(0)); };
  let swReg = null;
  async function registerSW() {
    if (!hosted || !('serviceWorker' in navigator)) return null;
    try { swReg = await navigator.serviceWorker.register('/sw.js'); return swReg; } catch (e) { return null; }
  }
  async function refreshPushState() {
    if (!swReg || !pushSupported()) { cloud.subscribed = false; return; }
    const sub = await swReg.pushManager.getSubscription();
    cloud.subscribed = !!sub && Notification.permission === 'granted';
  }
  async function enableReminders() {
    if (!syncId) await linkDevice(newCode(), { fresh: true });
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') throw new Error(perm === 'denied' ? T('rem.blocked') : T('rem.notAllowed'));
    const reg = swReg || (await registerSW());
    if (!reg) throw new Error(T('rem.noService'));
    await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(cloud.vapid) }));
    await api('push', { method: 'POST', body: JSON.stringify({ action: 'subscribe', id: syncId, subscription: sub.toJSON(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, lang: LANG }) });
    cloud.subscribed = true;
  }
  async function disableReminders() {
    const sub = swReg && (await swReg.pushManager.getSubscription());
    if (sub) { await api('push', { method: 'POST', body: JSON.stringify({ action: 'unsubscribe', id: syncId, endpoint: sub.endpoint }) }).catch(() => {}); await sub.unsubscribe(); }
    cloud.subscribed = false;
  }

  async function cloudInit() {
    if (!hosted) { cloud.checked = true; return; }
    registerSW().then(refreshPushState).then(() => { if (route === 'progress' || route === 'today') render(); });
    try { const c = await api('config'); cloud.sync = c.sync; cloud.push = c.push; cloud.vapid = c.vapidPublicKey; } catch (e) { /* no API: plain static hosting */ }
    cloud.checked = true;
    const m = location.hash.match(/^#link-([A-Za-z0-9-]+)$/);
    if (m && cloud.sync) {
      const code = cleanCode(m[1]);
      history.replaceState(null, '', '#today'); route = 'today';
      if (code.length === 20) { try { await linkDevice(code); toast(T('sync.linkedHere')); } catch (e) { toast(T('sync.couldNotLink', { error: e.message }), 'close'); } }
    } else if (syncId && cloud.sync) await syncNow({ quiet: true });
    render();
  }
  document.addEventListener('visibilitychange', () => {
    if (!syncId || !cloud.sync) return;
    if (document.visibilityState === 'hidden' && dirty) { clearTimeout(pushT); syncNow({ quiet: true }); }
    if (document.visibilityState === 'visible' && Date.now() - cloud.last > 15000) syncNow();
  });

  function cloudCard() {
    if (!hosted) return `<section class="card"><h2>${T('sync.cardTitle')}</h2><p class="muted">${T('sync.fileOnly')}</p></section>`;
    if (!cloud.checked) return `<section class="card"><h2>${T('sync.cardTitle')}</h2><p class="muted">${T('sync.checking')}</p></section>`;
    if (!cloud.sync) return `<section class="card"><h2>${T('sync.cardTitle')}</h2><p class="muted">${esc(T('sync.notSetUp'))}</p></section>`;
    const sync = syncId
      ? `<div class="row-between"><h2>${T('sync.title')}</h2><span class="syncdot ${cloud.status}" id="syncDot" aria-hidden="true"></span></div>
         <p class="muted small" id="syncStatus">${syncLine()}</p>
         <p>${T('sync.openLink')}</p>
         <div class="codebox"><span class="code">${prettyCode(syncId)}</span></div>
         <div class="actions"><button class="btn filled" data-act="copyLink">${T('sync.copyLink')}</button><button class="btn tinted" data-act="syncNow">${T('sync.now')}</button><button class="btn plain" data-act="unlinkAsk">${T('sync.unlink')}</button></div>
         <p class="muted small">${T('sync.keepPrivate')}</p>`
      : `<h2>${T('sync.title')}</h2>
         <p>${T('sync.intro')}</p>
         <div class="actions"><button class="btn filled" data-act="syncOn">${T('sync.turnOn')}</button></div>
         <form id="linkForm" class="row-form"><div class="field"><label for="linkCode">${T('sync.enterCode')}</label><input id="linkCode" class="text" autocomplete="off" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"></div><button class="btn tinted" type="submit">${T('sync.link')}</button></form>`;
    let rem;
    if (!cloud.push) rem = `<p class="muted">${T('rem.noVapid')}</p>`;
    else if (isIOS() && !standalone()) rem = `<p>${T('rem.iosIntro')}</p><ol class="steps"><li>${T('rem.iosStep1Html')}</li><li>${T('rem.iosStep2Html')}</li><li>${T('rem.iosStep3')}</li></ol>`;
    else if (!pushSupported()) rem = `<p class="muted">${esc(T('rem.unsupported'))}</p>`;
    else if (cloud.subscribed) rem = `<p><b class="okc">${T('rem.onLabel')}</b> ${esc(T('rem.onBody'))}</p><div class="actions"><button class="btn tinted" data-act="pushTest">${T('rem.sendTest')}</button><button class="btn plain" data-act="pushOff">${T('rem.turnOffHere')}</button></div>`;
    else rem = `<p>${esc(T('rem.offBody'))}</p><div class="actions"><button class="btn filled" data-act="pushOn">${T('rem.turnOn')}</button></div>${!syncId ? `<p class="muted small">${T('rem.alsoSync')}</p>` : ''}`;
    return `<section class="card" id="cloud">${sync}</section><section class="card"><h2>${T('rem.title')}</h2>${rem}</section>`;
  }
  function reminderPromo() {
    if (!hosted || !cloud.push || cloud.subscribed || !pushSupported() && !isIOS()) return '';
    try { if (localStorage.getItem('korkort30.nopromo')) return ''; } catch (e) { /* ignore */ }
    return `<section class="card promo"><span class="tile" style="--tile:#ff3b30;--s:40px"><span style="color:#fff">${icon('bell')}</span></span><div class="grow"><b>${T('promo.title')}</b><span class="muted small">${T('promo.body')}</span></div><a class="btn tinted small" href="#progress">${T('promo.setUp')}</a><button class="iconbtn" data-act="noPromo" aria-label="${T('common.hide')}">${icon('close')}</button></section>`;
  }

  // ------------------------------------------------------------- views
  function viewWelcome() {
    const t = iso(today());
    const suggested = iso(new Date(today().getTime() + 30 * DAY_MS));
    return `
      <section class="welcome">
        <div class="welcome-art" aria-hidden="true">${rings([{ v: 0.82, color: RING.plan }, { v: 0.64, color: RING.q }, { v: 0.9, color: RING.acc }], 220)}
          <span class="float s1">${Signs.svg('yield', 64)}</span><span class="float s2">${Signs.svg('w-moose', 58)}</span><span class="float s3">${Signs.svg('speed-50', 54)}</span><span class="float s4">${Signs.svg('main-road', 50)}</span></div>
        <div class="actions welcome-lang">${langButtons('small')}</div>
        <p class="eyebrow">${T('welcome.eyebrow')}</p>
        <h1 class="display">${T('welcome.titleHtml')}</h1>
        <p class="lede">${T('welcome.lede', { n: REAL.length + SIGN_Q.length })}</p>
        <form class="card start" id="startForm">
          <div class="field"><label for="startDate">${T('plan.day', { n: 1 })}</label><input type="date" id="startDate" value="${t}" required></div>
          <div class="field"><label for="testDate">${T('welcome.testDate')} <span class="muted">${T('welcome.optional')}</span></label><input type="date" id="testDate" value="${suggested}"></div>
          <button class="btn filled large" type="submit">${T('welcome.startDay1')}</button>
        </form>
        <ul class="facts-strip">
          <li><b>${MOCK.questions}</b><span>${T('welcome.scored')}</span></li>
          <li><b>${MOCK.pass}</b><span>${T('welcome.toPass')}</span></li>
          <li><b>${MOCK.minutes}</b><span>${T('welcome.minutes')}</span></li>
          <li><b>30</b><span>${T('welcome.days')}</span></li>
        </ul>
      </section>`;
  }

  function journey(n) {
    const dots = PLAN.map((d) => {
      const p = dayProgress(d.day); const cls = p === 1 ? 'done' : d.day === n ? 'now' : d.day < n ? 'late' : '';
      const mock = d.tasks.some((t) => t.type === 'mock');
      return `<a href="#day-${d.day}" class="jd ${cls} ${mock ? 'mock' : ''}" title="${T('plan.dayTitle', { n: d.day, title: esc(d.title) })}" aria-label="${T('plan.dayTitle', { n: d.day, title: esc(d.title) })}${p === 1 ? T('journey.complete') : ''}">${d.day === n ? `<span class="jcar">${icon('car')}</span>` : ''}</a>`;
    }).join('');
    return `<div class="journey"><div class="jtrack">${dots}</div><div class="jlabels"><span>${T('plan.day', { n: 1 })}</span><span>${T('journey.mocksStart')}</span><span>${T('journey.test')}</span></div></div>`;
  }

  function viewToday() {
    const n = planDay(); const day = PLAN[n - 1];
    const r = readiness(); const st = streak(); const lv = level(); const R = todayRings();
    const last = S.mocks[S.mocks.length - 1];
    const behind = PLAN.slice(0, n - 1).filter((d) => !dayDone(d.day)).map((d) => d.day);
    const testIn = S.testDate ? Math.round((parse(S.testDate) - today()) / DAY_MS) : null;
    const nt = nextTask();
    const weak = weakTopics(3);
    const tomorrow = PLAN[n];
    const earned = BADGES.filter((b) => S.badges[b.id]).sort((a, b) => S.badges[b.id] - S.badges[a.id]);
    return `
      <header class="pagehead">
        <p class="eyebrow">${fmtLong(today())}${testIn !== null ? ` · ${testIn > 0 ? T('today.testIn', { n: testIn }) : testIn === 0 ? T('today.testDay') : T('today.testPassed')}` : ''}</p>
        <h1 class="large-title">${greeting()}</h1>
      </header>

      <section class="hero">
        <div class="hero-rings">${rings(R.vals, 176)}</div>
        <div class="hero-body">
          <p class="hero-eyebrow">${T('plan.dayOf30', { n })}</p>
          <h2 class="hero-title">${esc(day.title)}</h2>
          <p class="hero-focus">${esc(day.focus)}</p>
          <ul class="legend">
            <li style="--c:${RING.plan}"><b>${R.tasksDone}/${R.tasksAll}</b><span>${T('today.tasks')}</span></li>
            <li style="--c:${RING.q}"><b>${R.a}/${DAILY_GOAL}</b><span>${T('today.questions')}</span></li>
            <li style="--c:${RING.acc}"><b>${R.a ? Math.round(R.acc * 100) + '%' : '–'}</b><span>${T('today.accuracy')}</span></li>
          </ul>
          ${nt ? `<button class="btn filled large hero-cta" data-act="task" data-day="${nt.n}" data-i="${nt.i}">${T('today.cta', { verb: S.done[`${nt.n}-0`] || nt.i > 0 ? T('common.continue') : T('common.start'), label: esc(nt.t.type === 'todo' ? T('task.todoLower') : taskLabel(nt.t, nt.n)) })} ${icon('chevron')}</button>`
            : `<div class="hero-done">${icon('check')} ${T('today.planDone')}${tomorrow ? ` ${T('today.tomorrowHtml', { title: esc(tomorrow.title) })}` : ''} <button class="btn tinted small" data-act="quick" data-topics="all" data-n="20">${T('today.bonus')}</button></div>`}
        </div>
      </section>

      ${journey(n)}

      <div class="grid-2">
        <section class="stack">
          <div class="section-head"><h2>${T('today.tasksTitle')}</h2><span class="muted">${T('common.goal', { goal: esc(day.goal) })}</span></div>
          ${taskList(n)}
          ${behind.length ? `<p class="note">${icon('mistakes')} <span>${T('today.unfinishedHtml', { days: behind.map((d) => `<a href="#day-${d}">${T('plan.dayLower', { n: d })}</a>`).join(', ') })}</span></p>` : ''}
          ${tomorrow ? `<a class="card teaser" href="#day-${tomorrow.day}"><span class="eyebrow">${T('today.tomorrowDay', { n: tomorrow.day })}</span><b>${esc(tomorrow.title)}</b><span class="muted">${esc(tomorrow.focus)}</span>${tomorrow.tasks.some((t) => t.type === 'mock') ? `<span class="tag">${T('session.mock')}</span>` : ''}</a>` : ''}
        </section>
        <aside class="stack">
          <section class="card streak-card">
            <div class="streak-top"><span class="flame-big ${st.todayDone ? 'lit' : ''}">${icon('flame')}</span><div><b class="big">${T('streak.days', { n: st.n })}</b><span class="muted">${st.todayDone ? T('today.streakSafe') : st.n ? T('today.streakKeep') : T('today.streakStart')}</span></div></div>
            ${weekStrip()}
          </section>
          <section class="card">
            <div class="row-between"><h3>${T('level.label', { n: lv.n, name: esc(lv.name) })}</h3><span class="muted small">${S.xp} XP</span></div>
            <div class="lbar big"><i style="width:${Math.round(lv.frac * 100)}%"></i></div>
            <p class="muted small">${lv.next ? T('level.toNext', { n: lv.toNext, next: esc(lv.next) }) : T('level.top')}</p>
          </section>
          <section class="card">
            <div class="row-between"><h3>${T('today.readiness')}</h3><span class="big-num">${r.pct}%</span></div>
            <div class="meter"><i style="width:${r.pct}%"></i><em style="left:${(MOCK.pass / MOCK.questions) * 100}%"></em></div>
            <p class="muted small">${r.basis === 'mocks' ? T('today.readyMocks') : T('today.readyTopics')} ${T('today.passLine')}</p>
            ${last ? `<p class="small">${T('today.lastMock')} <b class="${last.passed ? 'okc' : 'badc'}">${last.score}/${last.total} · ${last.passed ? T('today.pass') : T('today.notYet')}</b></p>` : ''}
          </section>
          <section class="card">
            <h3>${T('today.focusTopics')}</h3>
            <ul class="group plain">${weak.map((id) => { const s = topicStats(id); return `<li class="row"><a href="#lesson-${id}" class="rowlink">${topicTile(id, 28)}<span class="grow">${esc(TOPIC[id].name)}</span><span class="muted small">${s.acc === null ? T('today.new') : Math.round(s.acc * 100) + '%'}</span>${icon('chevron', 'chev')}</a></li>`; }).join('')}</ul>
            <button class="btn tinted" data-act="quick" data-topics="weak" data-n="20">${T('today.practiseThese')}</button>
          </section>
          ${reminderPromo()}
          <a class="card badges-mini" href="#progress"><div class="row-between"><h3>${T('badge.title')}</h3><span class="muted small">${earned.length}/${BADGES.length}</span></div>
            <div class="badge-row">${BADGES.slice(0, 6).map((b) => badgeIcon(b, !!S.badges[b.id], 40)).join('')}</div></a>
        </aside>
      </div>`;
  }
  function badgeIcon(b, on, size = 56) {
    return `<span class="medal ${on ? 'on' : ''}" style="--m:${size}px" title="${esc(b.name)}: ${esc(b.desc)}">${icon(on ? (b.id.startsWith('s') && b.id !== 'signs' ? 'flame' : b.id.startsWith('m') || b.id === 'pass' ? 'trophy' : 'star') : 'lock')}</span>`;
  }

  function viewPlan() {
    const n = planDay();
    const doneDays = PLAN.filter((d) => dayDone(d.day)).length;
    const weeks = [1, 2, 3, 4].map((w) => {
      const days = PLAN.filter((d) => d.week === w);
      const name = T(`plan.week${w}`);
      return `<section class="week"><div class="section-head"><h2>${T('plan.week', { n: w })}</h2><span class="muted">${name}</span></div><div class="days">${days.map((d) => {
        const p = dayProgress(d.day); const state = p === 1 ? 'done' : d.day === n ? 'now' : d.day < n ? 'late' : d.day > n ? 'future' : '';
        return `<a class="day ${state}" href="#day-${d.day}">
          <div class="day-top"><span class="dnum">${d.day}</span>${rings([{ v: p, color: p === 1 ? '#30d158' : '#0a84ff' }], 30)}</div>
          <span class="ddate">${S.start ? fmt(dateOfDay(d.day)) : ''}${d.day === n ? T('plan.todaySuffix') : ''}</span>
          <span class="dtitle">${esc(d.title)}</span>
          ${d.tasks.some((t) => t.type === 'mock') ? `<span class="tag">${T('plan.mockTag')}</span>` : ''}
        </a>`;
      }).join('')}</div></section>`;
    }).join('');
    return `<header class="pagehead"><p class="eyebrow">${T('plan.daysComplete', { n: doneDays })}</p><h1 class="large-title">${T('plan.title')}</h1>
      <p class="lede">${T('plan.lede')}</p></header>${weeks}`;
  }

  function viewDay(n) {
    if (!(n >= 1 && n <= 30)) return viewPlan();
    const d = PLAN[n - 1];
    return `<header class="pagehead"><p class="eyebrow"><a href="#plan">${T('nav.plan')}</a> · ${T('plan.day', { n })}${S.start ? ` · ${fmt(dateOfDay(n))}` : ''}</p><h1 class="large-title">${esc(d.title)}</h1><p class="lede">${esc(d.focus)}</p></header>
      <div class="section-head"><h2>${T('plan.tasks')}</h2><span class="muted">${T('common.goal', { goal: esc(d.goal) })}</span></div>${taskList(n)}
      <nav class="pager">${n > 1 ? `<a class="btn plain" href="#day-${n - 1}">${T('plan.prevDay', { n: n - 1 })}</a>` : '<span></span>'}${n < 30 ? `<a class="btn plain" href="#day-${n + 1}">${T('plan.nextDay', { n: n + 1 })}</a>` : ''}</nav>`;
  }

  function viewLessons() {
    const read = Object.keys(S.lessons).length;
    return `<header class="pagehead"><p class="eyebrow">${T('lessons.read', { n: read })}</p><h1 class="large-title">${T('nav.lessons')}</h1><p class="lede">${T('lessons.lede')}</p></header>
      <a class="card feature" href="#facts"><span class="tile" style="--tile:#34c759;--s:44px"><span style="color:#fff">${icon('lessons')}</span></span><div><b>${T('task.factsSheet')}</b><span class="muted">${T('lessons.factsSub')}</span></div>${icon('chevron', 'chev')}</a>
      <ul class="group">${TOPICS.map((t) => {
        const l = LESSONS[t.id]; const st = topicStats(t.id); const done = S.lessons[t.id];
        return `<li class="row"><a class="rowlink" href="#lesson-${t.id}">${topicTile(t.id)}
          <span class="grow"><span class="rtitle">${esc(t.name)}</span><span class="rsub">${l ? `${l.minutes || 15} min` : T('lessons.soon')} · ${T('common.questions', { n: st.total })} · ${T('lessons.mastered', { n: Math.round(st.mastery * 100) })}</span></span>
          ${done ? `<span class="okdot" aria-label="${T('lessons.readAria')}">${icon('check')}</span>` : ''}${icon('chevron', 'chev')}</a></li>`;
      }).join('')}</ul>`;
  }

  function viewLesson(id) {
    const t = TOPIC[id]; const l = LESSONS[id];
    if (!t) return viewLessons();
    if (!l) return `<header class="pagehead"><p class="eyebrow"><a href="#lessons">${T('nav.lessons')}</a></p><h1 class="large-title">${esc(t.name)}</h1></header><p class="lede">${T('lesson.notWritten')}</p><div class="actions"><button class="btn filled" data-act="quick" data-topics="${id}" data-n="15">${T('lesson.practiseTopic', { topic: esc(t.short) })}</button></div>`;
    const idx = TOPICS.indexOf(t);
    return `<article class="lesson">
      <header class="pagehead lesson-head">${topicTile(id, 56)}<p class="eyebrow"><a href="#lessons">${T('nav.lessons')}</a> · ${T('lesson.topicOf', { n: idx + 1 })} · ${l.minutes || 15} min</p><h1 class="large-title">${esc(l.title)}</h1>${l.intro ? `<p class="lede">${esc(l.intro)}</p>` : ''}</header>
      ${l.sections.map((s) => `<section class="lsec"><h2>${esc(s.h)}</h2><div class="prose">${s.body}</div>
        ${(s.pics || []).length ? `<div class="pics">${s.pics.map((p) => `<figure class="pic">${Scene.render(p)}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}</section>`).join('')}
      <section class="card keyfacts"><h2>${T('lesson.keyFacts')}</h2><ul>${l.keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>
      <div class="actions">
        <button class="btn filled large" data-act="lessonDone" data-topic="${id}">${S.lessons[id] ? T('lesson.practiseThis') : T('lesson.markRead')}</button>
        ${TOPICS[idx + 1] ? `<a class="btn plain" href="#lesson-${TOPICS[idx + 1].id}">${T('lesson.next', { topic: esc(TOPICS[idx + 1].short) })}</a>` : ''}
      </div></article>`;
  }

  function viewFacts() {
    return `<header class="pagehead"><p class="eyebrow"><a href="#lessons">${T('nav.lessons')}</a></p><h1 class="large-title">${T('lesson.keyFacts')}</h1><p class="lede">${T('facts.lede')}</p></header>
      <div class="factsgrid">${TOPICS.filter((t) => LESSONS[t.id]).map((t) => `<section class="card"><a class="facts-h" href="#lesson-${t.id}">${topicTile(t.id, 30)}<h2>${esc(t.name)}</h2></a><ul>${LESSONS[t.id].keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>`).join('')}</div>
      ${pendingTask && pendingTask.facts ? `<div class="actions"><button class="btn filled large" data-act="factsDone">${T('facts.done')}</button></div>` : ''}`;
  }

  function viewPractice() {
    const mc = mistakes().length;
    return `<header class="pagehead"><p class="eyebrow">${T('practice.eyebrow')}</p><h1 class="large-title">${T('nav.practice')}</h1><p class="lede">${T('practice.lede')}</p></header>
      <div class="hub">
        <button class="hubcard c-blue" data-act="quick" data-topics="all" data-n="20"><span>${icon('bolt')}</span><b>${T('session.quick20')}</b><em>${T('practice.mixed')}</em></button>
        <button class="hubcard c-orange" data-act="quick" data-topics="weak" data-n="20"><span>${icon('star')}</span><b>${T('session.weakSpots')}</b><em>${esc(weakTopics(2).map((x) => TOPIC[x].short).join(' + '))}</em></button>
        <a class="hubcard c-indigo" href="#mock"><span>${icon('mock')}</span><b>${T('nav.mock')}</b><em>${T('common.qMin', { q: MOCK.questions, m: MOCK.minutes })}</em></a>
        <a class="hubcard c-pink" href="#mistakes"><span>${icon('mistakes')}</span><b>${T('nav.mistakes')}</b><em>${T('practice.toFix', { n: mc })}</em></a>
        <a class="hubcard c-yellow" href="#signs"><span>${icon('signs')}</span><b>${T('nav.signs')}</b><em>${T('practice.nSigns', { n: SIGN_Q.length })}</em></a>
      </div>
      <form class="card" id="practiceForm">
        <h2>${T('practice.build')}</h2>
        <fieldset><legend>${T('practice.topics')}</legend><div class="chips">
          ${TOPICS.map((t) => `<label class="chip"><input type="checkbox" name="topic" value="${t.id}"><span>${esc(t.short)} <em>${topicStats(t.id).total}</em></span></label>`).join('')}
        </div></fieldset>
        <fieldset><legend>${T('practice.length')}</legend><div class="seg" role="radiogroup">${[10, 20, 30, 50].map((n, i) => `<label><input type="radio" name="n" value="${n}" ${i === 1 ? 'checked' : ''}><span>${n}</span></label>`).join('')}</div></fieldset>
        <div class="actions"><button class="btn filled large" type="submit">${T('common.start')}</button></div>
        <p class="muted small" id="practiceMsg" role="status"></p>
      </form>`;
  }

  function viewMockIntro() {
    const passes = S.mocks.filter((m) => m.passed).length;
    return `<header class="pagehead"><p class="eyebrow">${T('mock.eyebrow')}</p><h1 class="large-title">${T('nav.mock')}</h1>
      <p class="lede">${T('mock.lede', { q: MOCK.questions, m: MOCK.minutes, p: MOCK.pass })}</p></header>
      <div class="grid-2"><section class="card mock-card">
        <div class="mock-dial">${rings([{ v: 1, color: '#5e5ce6' }], 120)}<span><b>${MOCK.minutes}</b>min</span></div>
        <ul class="prose"><li>${T('mock.tip1')}</li><li>${T('mock.tip2')}</li><li>${T('mock.tip3')}</li><li>${T('mock.tip4')}</li></ul>
        <button class="btn filled large" data-act="mock">${T('mock.start')}</button>
      </section>
      <section class="card"><div class="row-between"><h2>${T('mock.yours')}</h2><span class="muted">${T('mock.takenPassed', { n: S.mocks.length, p: passes })}</span></div>${S.mocks.length ? mockChart() + mockTable() : `<p class="muted">${T('mock.none')}</p>`}</section></div>`;
  }
  function mockTable() {
    return `<div class="tablewrap"><table class="tbl"><thead><tr><th>${T('mock.thDate')}</th><th>${T('mock.thScore')}</th><th>${T('mock.thTime')}</th><th>${T('mock.thResult')}</th></tr></thead><tbody>${S.mocks.slice().reverse().map((m) =>
      `<tr><td>${new Date(m.date).toLocaleDateString(I18N.locale)}</td><td class="num">${m.score}/${m.total}</td><td class="num">${Math.floor(m.secs / 60)}:${String(m.secs % 60).padStart(2, '0')}</td><td><span class="badge ${m.passed ? 'ok' : 'bad'}">${m.passed ? T('mock.pass') : T('mock.fail')}</span></td></tr>`).join('')}</tbody></table></div>`;
  }

  function viewMistakes() {
    const list = mistakes();
    return `<header class="pagehead"><p class="eyebrow">${T('mistakes.eyebrow')}</p><h1 class="large-title">${T('nav.mistakes')}</h1>
      <p class="lede">${T('mistakes.lede')}</p></header>
      ${list.length ? `<div class="actions"><button class="btn filled large" data-act="review">${T('mistakes.reviewN', { n: Math.min(40, list.length) })}</button></div>
      <div class="mlist">${list.map((q) => `<details class="card mitem"><summary>${topicTile(q.topic, 28)}<span class="grow">${esc(q.q)}</span>${icon('chevron', 'chev')}</summary>
        ${q.img ? `<div class="pic">${questionPic(q)}</div>` : ''}<p><b class="okc">${T('mistakes.correct')}</b> ${esc(q.options[q.answer])}</p><p class="prose muted">${esc(q.explain)}</p></details>`).join('')}</div>`
      : `<section class="card empty"><span class="tile" style="--tile:#30d158;--s:56px"><span style="color:#fff">${icon('check')}</span></span><h2>${T('mistakes.clear')}</h2><p class="muted">${T('mistakes.clearBody')}</p><a class="btn tinted" href="#practice">${T('common.practise')}</a></section>`}`;
  }

  function viewSigns() {
    const groups = {};
    for (const n of Signs.list()) (groups[Signs.group(n)] = groups[Signs.group(n)] || []).push(n);
    const order = ['Warning signs', 'Priority signs', 'Prohibition signs', 'Mandatory signs', 'Information signs'];
    return `<header class="pagehead"><p class="eyebrow">${T('signs.count', { n: Signs.list().length })}</p><h1 class="large-title">${T('nav.signs')}</h1>
      <p class="lede">${T('signs.lede')}</p>
      <div class="actions"><button class="btn filled" data-act="signdrill" data-n="20">${T('signs.drill20')}</button><button class="btn tinted" data-act="signdrill" data-n="0">${T('session.everySign')}</button><button class="btn plain" data-act="revealAll">${T('signs.showAll')}</button></div></header>
      ${order.filter((g) => groups[g]).map((g) => `<section class="signgroup"><div class="section-head"><h2>${T(`signs.group.${GROUP_KEY[g]}`)}</h2><span class="muted">${esc(T(`signs.sub.${GROUP_KEY[g]}`))}</span></div><div class="signs">${groups[g].map((n) => {
        const s = S.q[`sign-${n}`]; const m = s && s.box >= 2;
        return `<button class="signcard ${m ? 'mastered' : ''}" data-act="flip" aria-expanded="false">${Signs.svg(n, 84)}<span class="sname">${esc(Signs.name(n))}</span>${m ? `<span class="okdot" aria-label="${T('signs.mastered')}">${icon('check')}</span>` : ''}</button>`;
      }).join('')}</div></section>`).join('')}`;
  }

  function viewProgress() {
    const totalSeen = Object.values(S.q).filter((s) => s.seen).length;
    const answered = totalAnswered();
    const right = Object.values(S.q).reduce((a, s) => a + s.right, 0);
    const daysDone = PLAN.filter((d) => dayDone(d.day)).length;
    const lv = level(); const st = streak();
    return `<header class="pagehead"><p class="eyebrow">${T('level.label', { n: lv.n, name: esc(lv.name) })} · ${S.xp} XP</p><h1 class="large-title">${T('nav.progress')}</h1></header>
      <ul class="stats">
        <li style="--c:#ff375f"><b>${daysDone}<small>/30</small></b><span>${T('progress.planDays')}</span></li>
        <li style="--c:#ff9f0a"><b>${st.n}</b><span>${T('progress.streak', { n: S.best || st.n })}</span></li>
        <li style="--c:#30d158"><b>${answered ? Math.round((right / answered) * 100) : 0}%</b><span>${T('progress.answersRight', { n: answered })}</span></li>
        <li style="--c:#0a84ff"><b>${totalSeen}<small>/${ALL.length}</small></b><span>${T('progress.seen')}</span></li>
      </ul>
      <div class="grid-2 even">${cloudCard()}</div>
      <section class="card"><div class="row-between"><h2>${T('badge.title')}</h2><span class="muted">${T('common.ofN', { n: Object.keys(S.badges).length, m: BADGES.length })}</span></div>
        <div class="badges">${BADGES.map((b) => `<div class="badge-item ${S.badges[b.id] ? 'on' : ''}">${badgeIcon(b, !!S.badges[b.id])}<b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join('')}</div></section>
      <section class="card"><h2>${T('progress.topics')}</h2><ul class="group plain">
        ${TOPICS.map((t) => { const s = topicStats(t.id); return `<li class="row"><a class="rowlink" href="#lesson-${t.id}">${topicTile(t.id, 30)}<span class="grow"><span class="rtitle">${esc(t.name)}</span><span class="mbar"><i style="width:${s.mastery * 100}%"></i></span></span><span class="muted small num">${s.acc === null ? '–' : Math.round(s.acc * 100) + '%'}</span></a></li>`; }).join('')}
      </ul><p class="muted small">${T('progress.barsNote')}</p></section>
      ${S.mocks.length ? `<section class="card"><h2>${T('mock.chartTitle')}</h2>${mockChart()}${mockTable()}</section>` : ''}
      <section class="card"><h2>${T('settings.title')}</h2>
        <div class="actions">${langButtons()}</div>
        <form id="settingsForm" class="row-form">
          <div class="field"><label for="setStart">${T('settings.day1')}</label><input type="date" id="setStart" value="${S.start || iso(today())}"></div>
          <div class="field"><label for="setTest">${T('welcome.testDate')}</label><input type="date" id="setTest" value="${S.testDate || ''}"></div>
          <button class="btn filled" type="submit">${T('settings.save')}</button>
        </form>
        <p class="muted small">${storageOk ? T('settings.storageOk') : T('settings.storageBlocked')}</p>
        <div class="actions"><button class="btn tinted" data-act="export">${T('settings.copyBackup')}</button><button class="btn tinted" data-act="importOpen">${T('settings.restoreFrom')}</button><button class="btn danger" data-act="resetAsk">${T('settings.reset')}</button></div>
        <div id="backupArea"></div>
      </section>`;
  }
  function mockChart() {
    const m = S.mocks.slice(-12); const W = 560, H = 180, P = 30;
    const x = (i) => P + (m.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (m.length - 1));
    const y = (v) => H - P - v * (H - 2 * P);
    const passY = y(MOCK.pass / MOCK.questions);
    const line = m.map((r, i) => `${i ? 'L' : 'M'}${x(i)} ${y(r.score / r.total)}`).join(' ');
    const area = m.length > 1 ? `${line} L${x(m.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z` : '';
    return `<div class="tablewrap"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${T('mock.chartAria')}">
      ${[0, 0.5, 1].map((v) => `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${P - 8}" y="${y(v) + 4}" text-anchor="end" class="axis">${Math.round(v * MOCK.questions)}</text>`).join('')}
      <line x1="${P}" x2="${W - P}" y1="${passY}" y2="${passY}" class="pass"/><text x="${W - P}" y="${passY - 6}" text-anchor="end" class="axis">${T('mock.chartPass', { n: MOCK.pass })}</text>
      ${area ? `<path d="${area}" class="area"/>` : ''}<path d="${line}" class="line"/>${m.map((r, i) => `<circle cx="${x(i)}" cy="${y(r.score / r.total)}" r="${i === m.length - 1 ? 5.5 : 3.5}" class="${r.passed ? 'dot ok' : 'dot bad'}"/>`).join('')}
    </svg></div>`;
  }

  // ------------------------------------------------------------- quiz view
  function viewQuiz() {
    const s = session;
    if (s.finished) return viewResult();
    const it = s.items[s.i]; const q = it.q; const mock = s.mode === 'mock';
    const answered = s.items.filter((x) => x.pick !== null).length;
    const ok = it.pick === q.answer;
    const opts = it.order.map((oi, k) => {
      let cls = '';
      if (!mock && s.revealed) { if (oi === q.answer) cls = 'right'; else if (oi === it.pick) cls = 'wrong'; else cls = 'dim'; }
      if (mock && it.pick === oi) cls = 'picked';
      const mark = cls === 'right' ? icon('check') : cls === 'wrong' ? icon('close') : LETTERS[k];
      return `<button class="opt ${cls}" data-act="answer" data-o="${oi}" ${!mock && s.revealed ? 'disabled' : ''}><span class="letter">${mark}</span><span>${esc(q.options[oi])}</span></button>`;
    }).join('');
    const pct = ((mock ? answered : s.i + (s.revealed ? 1 : 0)) / s.items.length) * 100;
    return `<div class="quiz">
      <div class="qbar">
        <button class="iconbtn" data-act="quit" aria-label="${mock ? T('quiz.handIn') : T('quiz.end')}">${icon('close')}</button>
        <div class="qprog" role="progressbar" aria-valuemin="0" aria-valuemax="${s.items.length}" aria-valuenow="${mock ? answered : s.i}"><i style="width:${pct}%"></i></div>
        ${mock ? `<div class="timer" id="timer"></div>` : `<div class="combo ${s.combo >= 3 ? 'hot' : ''}" aria-live="polite">${icon('flame')}<b>${s.combo}</b></div>`}
      </div>
      <div class="qgrid ${q.img ? '' : 'noimg'}">
        ${q.img ? `<figure class="pic qpic">${questionPic(q)}</figure>` : ''}
        <div class="qside">
          <p class="eyebrow">${esc(s.title)} · ${esc(TOPIC[q.topic].short)} · ${T('common.ofN', { n: s.i + 1, m: s.items.length })}</p>
          <h1 class="qtext">${esc(q.q)}</h1>
          <div class="opts" role="group" aria-label="${T('quiz.answers')}">${opts}</div>
          ${!mock && s.revealed ? `<div class="feedback ${ok ? 'ok' : 'bad'}" role="status"><b>${ok ? (s.combo >= 3 ? T('quiz.correctStreak', { n: s.combo }) : T('quiz.correct')) : T('quiz.notQuite')}</b><p>${esc(q.explain)}</p></div>` : ''}
          <div class="qnav">
            ${mock ? `<button class="btn plain" data-act="prev" ${s.i === 0 ? 'disabled' : ''}>${T('quiz.back')}</button>` : ''}
            <button class="btn filled large" data-act="next" ${!mock && !s.revealed ? 'disabled' : ''}>${s.i === s.items.length - 1 ? (mock ? T('quiz.handIn') : T('quiz.finish')) : mock && it.pick === null ? T('quiz.skip') : T('common.continue')}</button>
          </div>
          <p class="muted small keys">${T('quiz.keys')}</p>
        </div>
      </div>
      ${mock ? `<div class="qmap" aria-label="${T('quiz.map')}">${s.items.map((x, i) => `<button class="${i === s.i ? 'cur' : ''} ${x.pick !== null ? 'ans' : ''}" data-act="jump" data-i="${i}" aria-label="${T('quiz.qN', { n: i + 1 })}${x.pick !== null ? T('quiz.answered') : ''}">${i + 1}</button>`).join('')}</div>` : ''}
    </div>`;
  }
  function tickTimer() {
    clearInterval(timer);
    const upd = () => {
      const el = $('#timer'); if (!session || session.finished) { clearInterval(timer); return; }
      const left = Math.max(0, session.deadline - Date.now());
      if (el) { el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; el.classList.toggle('low', left < 5 * 60000); }
      if (left <= 0) { toast(T('mock.timeUp')); finish(); }
    };
    upd(); timer = setInterval(upd, 1000);
  }
  function viewResult() {
    const s = session; const { right, total } = s.result; const mock = s.mode === 'mock';
    const pct = Math.round((right / total) * 100);
    const passed = mock && Math.round((right / total) * MOCK.questions) >= MOCK.pass;
    const wrong = s.items.filter((x) => x.pick !== x.q.answer);
    const byTopic = {};
    for (const it of s.items) { const b = byTopic[it.q.topic] || (byTopic[it.q.topic] = [0, 0]); b[1]++; if (it.pick === it.q.answer) b[0]++; }
    const lv = level(); const levelUp = lv.n > s.levelBefore;
    const color = mock ? (passed ? '#30d158' : '#ff453a') : pct >= 80 ? '#30d158' : pct >= 60 ? '#ff9f0a' : '#ff453a';
    const headline = T(mock ? (passed ? (pct >= 92 ? 'result.testReady' : 'result.pass') : 'result.notPass') : pct >= 90 ? 'result.excellent' : pct >= 75 ? 'result.nice' : pct >= 50 ? 'result.getting' : 'result.keepGoing');
    const tip = mock ? (passed ? (pct >= 92 ? T('result.tipKeep') : T('result.tipAim', { q: MOCK.questions })) : T('result.tipNeed', { p: MOCK.pass }))
      : pct >= 90 ? T('result.tipMastered') : pct >= 75 ? T('result.tipList') : T('result.tipReread');
    return `<section class="result">
        <div class="result-ring">${rings([{ v: right / total, color }], 200)}<span><b>${right}<small>/${total}</small></b><em>${pct}%</em></span></div>
        <p class="eyebrow">${esc(s.title)}</p>
        <h1 class="large-title">${headline}</h1>
        <p class="lede">${tip}</p>
        <div class="rewards">
          <span class="reward">${icon('star')}<b>+${s.xp} XP</b></span>
          ${levelUp ? `<span class="reward lvl">${icon('trophy')}<b>${T('level.up', { n: lv.n, name: esc(lv.name) })}</b></span>` : ''}
          ${s.badges.map((b) => `<span class="reward badge-new">${icon('trophy')}<b>${esc(b.name)}</b></span>`).join('')}
          ${celebrate ? `<span class="reward day">${icon('check')}<b>${esc(celebrate.title)}</b></span>` : ''}
        </div>
        <div class="actions center">
          ${s.taskKey ? `<a class="btn filled large" href="#today">${T('result.backToday')}</a>` : ''}
          ${wrong.length ? `<button class="btn ${s.taskKey ? 'tinted' : 'filled'} large" data-act="retryWrong">${T('result.retry', { n: wrong.length })}</button>` : ''}
          <a class="btn plain large" href="#practice">${T('result.more')}</a>
        </div>
      </section>
      <section class="card"><h2>${T('result.byTopic')}</h2><ul class="group plain">${Object.entries(byTopic).map(([t, [r, n]]) => `<li class="row"><span class="rowlink">${topicTile(t, 28)}<span class="grow">${esc(TOPIC[t].name)}</span><span class="num ${r === n ? 'okc' : ''}">${r}/${n}</span></span></li>`).join('')}</ul></section>
      ${wrong.length ? `<div class="section-head"><h2>${T('result.review')}</h2><span class="muted">${T('result.nMissed', { n: wrong.length })}</span></div><div class="mlist">${wrong.map((it) => `<article class="card mitem open">
        <p class="eyebrow">${esc(TOPIC[it.q.topic].short)}</p><h3>${esc(it.q.q)}</h3>${it.q.img ? `<div class="pic">${Scene.render(it.q.img)}</div>` : ''}
        ${it.pick !== null ? `<p class="ans bad">${icon('close')} ${esc(it.q.options[it.pick])}</p>` : `<p class="ans bad">${T('result.notAnswered')}</p>`}
        <p class="ans ok">${icon('check')} ${esc(it.q.options[it.q.answer])}</p><p class="prose muted">${esc(it.q.explain)}</p></article>`).join('')}</div>` : ''}`;
  }

  // ------------------------------------------------------------- feedback: toasts, confetti, celebration
  function toast(msg, ic = 'check') {
    const t = $('#toast'); t.innerHTML = `${icon(ic)}<span>${esc(msg)}</span>`; t.hidden = false;
    t.classList.remove('in'); void t.offsetWidth; t.classList.add('in');
    clearTimeout(toast.h); toast.h = setTimeout(() => { t.hidden = true; }, 3400);
  }
  function showCelebrate() {
    const c = celebrate; celebrate = null;
    const el = $('#celebrate');
    el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="celeT">${rings([{ v: 1, color: RING.plan }, { v: 1, color: RING.q }, { v: 1, color: RING.acc }], 150)}
      <h2 id="celeT">${esc(c.title)}</h2><p>${esc(c.body)}</p><p class="muted small">${T('celebrate.xp')}</p><button class="btn filled large" data-act="closeCele">${T('celebrate.ok')}</button></div>`;
    el.hidden = false; confetti();
    $('#celebrate .btn').focus();
  }
  function confetti() {
    if (reduceMotion()) return;
    const cv = $('#confetti'); const ctx = cv.getContext('2d');
    const W = cv.width = window.innerWidth * devicePixelRatio, H = cv.height = window.innerHeight * devicePixelRatio;
    const colors = ['#ffcd00', '#0a84ff', '#30d158', '#ff375f', '#ff9f0a', '#bf5af2'];
    const ps = Array.from({ length: 160 }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 22 * devicePixelRatio, vy: (-Math.random() * 18 - 6) * devicePixelRatio,
      s: (6 + Math.random() * 6) * devicePixelRatio, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[(Math.random() * colors.length) | 0] }));
    let f = 0; cv.hidden = false;
    (function step() {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) { p.vy += 0.55 * devicePixelRatio; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }
      if (++f < 150) requestAnimationFrame(step); else { ctx.clearRect(0, 0, W, H); cv.hidden = true; }
    })();
  }

  // ------------------------------------------------------------- events
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'toggle') { markDone(b.dataset.key, !S.done[b.dataset.key]); newBadges = []; checkBadges(); save(); render(); }
    else if (act === 'task') startTask(+b.dataset.day, +b.dataset.i);
    else if (act === 'answer') answer(+b.dataset.o);
    else if (act === 'next') next();
    else if (act === 'prev') { if (session.i > 0) { session.i--; render(); } }
    else if (act === 'jump') { session.i = +b.dataset.i; render(); }
    else if (act === 'quit') {
      if (session.mode === 'mock') {
        const left = session.items.filter((x) => x.pick === null).length;
        if (left && b.dataset.sure !== '1') { b.dataset.sure = '1'; toast(T('mock.unanswered', { n: left }), 'mock'); return; }
        finish();
      } else if (session.items.some((x) => x.pick !== null)) { session.items = session.items.filter((x) => x.pick !== null); finish(); }
      else { session = null; go('practice'); }
    }
    else if (act === 'quick') { const topics = b.dataset.topics.split(','); startSession({ mode: 'practice', title: topics[0] === 'weak' ? T('session.weakSpots') : topics[0] === 'all' ? T('session.quick20') : T('session.practiceTopics', { topics: TOPIC[topics[0]].short }), items: pickPractice(topics, +b.dataset.n) }); }
    else if (act === 'mock') startSession({ mode: 'mock', title: T('session.mock'), items: pickMock(), taskKey: findTask('mock') });
    else if (act === 'review') startSession({ mode: 'practice', title: T('session.mistakesReview'), items: shuffle(mistakes()).slice(0, 40), taskKey: findTask('review') });
    else if (act === 'signdrill') startSession({ mode: 'practice', title: +b.dataset.n ? T('session.signDrill') : T('session.everySign'), items: pickSigns(+b.dataset.n) });
    else if (act === 'retryWrong') { const w = session.items.filter((x) => x.pick !== x.q.answer).map((x) => x.q); startSession({ mode: 'practice', title: T('session.retryMissed'), items: w }); }
    else if (act === 'lessonDone') {
      const topic = b.dataset.topic; const first = !S.lessons[topic]; S.lessons[topic] = Date.now(); if (first) addXP(30);
      if (pendingTask && pendingTask.topic === topic) { markDone(pendingTask.key); pendingTask = null; }
      else { const k = findTask('lesson', topic); if (k) markDone(k); }
      newBadges = []; checkBadges(); save();
      startSession({ mode: 'practice', title: T('session.practiceTopics', { topics: TOPIC[topic].short }), items: pickPractice([topic], 10) });
    }
    else if (act === 'factsDone') { if (pendingTask && pendingTask.facts) { markDone(pendingTask.key); pendingTask = null; checkBadges(); save(); } go('today'); }
    else if (act === 'flip') { const on = b.classList.toggle('on'); b.setAttribute('aria-expanded', on); }
    else if (act === 'revealAll') { document.querySelectorAll('.signcard').forEach((c) => { c.classList.add('on'); c.setAttribute('aria-expanded', 'true'); }); }
    else if (act === 'closeCele') { $('#celebrate').hidden = true; }
    else if (act === 'export') {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
      $('#backupArea').innerHTML = `<label for="bk" class="muted small">${T('backup.yours')}</label><textarea id="bk" rows="4" readonly>${code}</textarea>`;
      $('#bk').select();
      (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => toast(T('backup.copied')), () => toast(T('backup.selectCopy')));
    }
    else if (act === 'importOpen') $('#backupArea').innerHTML = `<label for="imp" class="muted small">${T('backup.paste')}</label><textarea id="imp" rows="4"></textarea><div class="actions"><button class="btn filled" data-act="importDo">${T('backup.restore')}</button></div>`;
    else if (act === 'importDo') {
      try { const data = JSON.parse(decodeURIComponent(escape(atob($('#imp').value.trim())))); if (!data || typeof data.q !== 'object') throw new Error(); S = Object.assign(fresh(), data); save(); toast(T('backup.restored')); render(); }
      catch (err) { toast(T('backup.bad'), 'close'); }
    }
    else if (act === 'resetAsk') { $('#backupArea').innerHTML = `<p class="note">${icon('signs')}<span>${T('reset.warn')}</span></p><div class="actions"><button class="btn danger" data-act="resetDo">${T('reset.do')}</button></div>`; }
    else if (act === 'resetDo') { S = fresh(); S.epochAt = Date.now(); saveLocal(); syncNow({ overwrite: true }); session = null; go('today'); toast(T('reset.done')); }
    else if (act === 'syncOn') { cloudAction(() => linkDevice(newCode(), { fresh: true }), T('sync.on')); }
    else if (act === 'syncNow') { cloudAction(() => syncNow(), T('sync.synced')); }
    else if (act === 'copyLink') { const u = linkUrl(); (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => toast(T('sync.linkCopied')), () => { const b2 = $('.codebox'); if (b2) b2.insertAdjacentHTML('beforeend', `<input class="text" readonly value="${esc(u)}" onfocus="this.select()">`); }); }
    else if (act === 'unlinkAsk') { b.dataset.act = 'unlinkDo'; b.textContent = T('sync.tapAgain'); b.classList.add('danger'); }
    else if (act === 'unlinkDo') { unlink(); render(); toast(T('sync.unlinked')); }
    else if (act === 'pushOn') { cloudAction(enableReminders, T('rem.isOn')); }
    else if (act === 'pushOff') { cloudAction(disableReminders, T('rem.turnedOff')); }
    else if (act === 'pushTest') { cloudAction(async () => { const r = await api('push', { method: 'POST', body: JSON.stringify({ action: 'test', id: syncId, lang: LANG }) }); if (!r.sent) throw new Error(T('rem.noDevice')); }, T('rem.testSent')); }
    else if (act === 'lang') I18N.set(b.dataset.lang);
    else if (act === 'noPromo') { try { localStorage.setItem('korkort30.nopromo', '1'); } catch (e2) { /* ignore */ } render(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#celebrate').hidden) { $('#celebrate').hidden = true; return; }
    if (route !== 'quiz' || !session || session.finished) return;
    if (e.target.matches('input, textarea')) return;
    const k = e.key.toUpperCase();
    const n = ['1', '2', '3', '4'].indexOf(k);
    const idx = n >= 0 ? n : LETTERS.indexOf(k);
    const it = session.items[session.i];
    if (idx >= 0 && idx < it.order.length) { e.preventDefault(); answer(it.order[idx]); }
    else if (e.key === 'Enter' || e.key === 'ArrowRight') { if (e.target.matches('button') && e.key === 'Enter') return; e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' && session.mode === 'mock' && session.i > 0) { session.i--; render(); }
  });
  function findTask(type, topic) {
    const n = planDay(); const d = PLAN[n - 1];
    const i = d.tasks.findIndex((t, k) => t.type === type && (!topic || t.topic === topic) && !S.done[`${n}-${k}`]);
    return i >= 0 ? `${n}-${i}` : null;
  }
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.id === 'startForm') {
      S.start = $('#startDate').value || iso(today()); S.testDate = $('#testDate').value || null; S.setAt = Date.now(); save(); go('today');
    } else if (e.target.id === 'practiceForm') {
      const topics = [...e.target.querySelectorAll('input[name=topic]:checked')].map((x) => x.value);
      const n = +(e.target.querySelector('input[name=n]:checked') || {}).value || 20;
      if (!topics.length) { $('#practiceMsg').textContent = T('practice.pickTopic'); return; }
      startSession({ mode: 'practice', title: topics.length === 1 ? T('session.practiceTopics', { topics: TOPIC[topics[0]].short }) : T('session.custom'), items: pickPractice(topics, n) });
    } else if (e.target.id === 'settingsForm') {
      S.start = $('#setStart').value || S.start; S.testDate = $('#setTest').value || null; S.setAt = Date.now(); save(); toast(T('settings.saved')); render();
    } else if (e.target.id === 'linkForm') {
      const code = cleanCode($('#linkCode').value);
      if (code.length !== 20) { toast(T('sync.codeLength'), 'close'); return; }
      cloudAction(() => linkDevice(code), T('sync.linked'));
    }
  });

  async function cloudAction(fn, okMsg) {
    try { await fn(); toast(okMsg); } catch (e) { toast(e.message, 'close'); }
    render();
  }

  checkBadges(); newBadges = [];
  render();
  cloudInit();
})();
