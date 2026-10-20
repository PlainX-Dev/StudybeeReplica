/* Körkort 30 — app logic. Plain JS, no build step, works from file:// and when hosted. */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
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
  const fmt = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtLong = (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  function planDay() {
    if (!S.start) return 1;
    const n = Math.floor((today() - parse(S.start)) / DAY_MS) + 1;
    return Math.max(1, Math.min(30, n));
  }
  const dateOfDay = (n) => new Date(parse(S.start || iso(today())).getTime() + (n - 1) * DAY_MS);
  const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Late-night study' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

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
  const SIGN_Q = Signs.list().map((name) => {
    const group = Signs.group(name);
    const pool = Signs.list().filter((n) => n !== name);
    const same = pool.filter((n) => Signs.group(n) === group && !(/^speed-/.test(n) && /^speed-/.test(name)));
    const pick = (arr, k, seed) => arr.map((v, i) => [v, (i * 7919 + seed * 104729) % 1000]).sort((a, b) => a[1] - b[1]).slice(0, k).map((x) => x[0]);
    const seed = name.length * 31 + name.charCodeAt(0);
    const wrong = pick(same.length >= 3 ? same : pool, 3, seed).map((n) => Signs.name(n));
    return {
      id: `sign-${name}`, topic: 'signs', generated: true,
      q: 'What does this sign mean?', img: { sign: name },
      options: [Signs.name(name)].concat(wrong), answer: 0,
      explain: `This is the sign "${Signs.name(name)}". ${group} ${groupHint(group)}`,
    };
  });
  function groupHint(g) {
    return {
      'Warning signs': 'are red-bordered triangles with a yellow face: they warn you about something ahead.',
      'Prohibition signs': 'are round with a red border: they tell you what you may not do.',
      'Priority signs': 'tell you who gives way at the next junction or narrow section.',
      'Mandatory signs': 'are blue discs: they tell you what you must do.',
      'Information signs': 'are blue rectangles: they give information or mark special road types.',
    }[g] || '';
  }
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
  const LEVELS = [
    [0, 'L-plate'], [150, 'Car park'], [400, 'Gravel road'], [800, 'Village street'], [1300, 'Country road'], [2000, 'Main road'],
    [2900, 'Expressway'], [4000, 'Motorway'], [5300, 'Night driver'], [6800, 'Winter pro'], [8500, 'Moose spotter'], [10500, 'Licence ready'],
  ];
  function level() {
    let i = 0; while (i + 1 < LEVELS.length && S.xp >= LEVELS[i + 1][0]) i++;
    const cur = LEVELS[i][0], nxt = LEVELS[i + 1] ? LEVELS[i + 1][0] : cur;
    return { n: i + 1, name: LEVELS[i][1], next: LEVELS[i + 1] ? LEVELS[i + 1][1] : null, frac: nxt > cur ? (S.xp - cur) / (nxt - cur) : 1, toNext: nxt - S.xp };
  }
  const BADGES = [
    { id: 'first', name: 'First kilometre', desc: 'Finish your first quiz.', test: () => S.log.length >= 1 },
    { id: 'day1', name: 'Day one done', desc: 'Complete every task on a plan day.', test: () => PLAN.some((d) => dayDone(d.day)) },
    { id: 's3', name: 'Warming up', desc: 'Study 3 days in a row.', test: () => S.best >= 3 },
    { id: 's7', name: 'One-week streak', desc: 'Study 7 days in a row.', test: () => S.best >= 7 },
    { id: 's14', name: 'Two-week streak', desc: 'Study 14 days in a row.', test: () => S.best >= 14 },
    { id: 's30', name: 'Unbroken', desc: 'Study 30 days in a row.', test: () => S.best >= 30 },
    { id: 'q100', name: 'Hundred club', desc: 'Answer 100 questions.', test: () => totalAnswered() >= 100 },
    { id: 'q500', name: 'High mileage', desc: 'Answer 500 questions.', test: () => totalAnswered() >= 500 },
    { id: 'perfect', name: 'Clean run', desc: 'Score 100% on a quiz of 15+ questions.', test: () => S.log.some((l) => l.total >= 15 && l.right === l.total) },
    { id: 'combo10', name: 'On a roll', desc: 'Get 10 right in a row.', test: () => (S.maxCombo || 0) >= 10 },
    { id: 'mock1', name: 'Exam nerves', desc: 'Sit your first mock exam.', test: () => S.mocks.length >= 1 },
    { id: 'pass', name: 'Passed', desc: 'Pass a mock exam.', test: () => S.mocks.some((m) => m.passed) },
    { id: 'm60', name: 'Test ready', desc: 'Score 60/65 or more on a mock.', test: () => S.mocks.some((m) => m.score / m.total >= 60 / 65) },
    { id: 'signs', name: 'Sign reader', desc: 'Master every sign in the drill.', test: () => SIGN_Q.every((q) => (S.q[q.id] || {}).box >= 2) },
    { id: 'junction', name: 'Junction ace', desc: 'Master 80% of the right-of-way questions.', test: () => topicStats('priority').mastery >= 0.8 },
    { id: 'lessons', name: 'Bookworm', desc: 'Read all 12 lessons.', test: () => Object.keys(S.lessons).length >= 12 },
  ];
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
      if (dayDone(n)) { addXP(100); celebrate = { title: `Day ${n} complete`, body: n < 30 ? `Tomorrow: ${PLAN[n].title}.` : 'The whole plan is done. Go pass that test.' }; }
    }
  }
  let celebrate = null;

  // ------------------------------------------------------------- session
  let session = null;
  let timer = null;
  let pendingTask = null;
  function startSession(opts) {
    if (!opts.items.length) { toast('No questions available for that choice yet.'); return; }
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
      startSession({ mode: 'practice', title: t.label || `${topics.map((x) => TOPIC[x].short).join(' + ')} practice`, items: pickPractice(t.topics, t.n), taskKey: key });
    }
    if (t.type === 'signs') startSession({ mode: 'practice', title: t.n ? `Sign drill` : 'Every sign', items: pickSigns(t.n), taskKey: key });
    if (t.type === 'review') {
      const list = mistakes();
      if (!list.length) { markDone(key); checkBadges(); save(); toast('No mistakes to review. Task ticked off.'); render(); return; }
      startSession({ mode: 'practice', title: 'Mistakes review', items: shuffle(list).slice(0, 40), taskKey: key });
    }
    if (t.type === 'mock') startSession({ mode: 'mock', title: 'Mock exam', items: pickMock(), taskKey: key });
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

  const NAV = [
    ['today', 'Today', 'today'], ['plan', 'Plan', 'plan'], ['lessons', 'Learn', 'lessons'], ['practice', 'Practice', 'practice'],
    ['mock', 'Mock exam', 'mock'], ['mistakes', 'Mistakes', 'mistakes'], ['signs', 'Signs', 'signs'], ['progress', 'Progress', 'progress'],
  ];
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
      <div class="me-level"><span>Level ${lv.n} · ${esc(lv.name)}</span><span class="lbar"><i style="width:${Math.round(lv.frac * 100)}%"></i></span></div>` : '';
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
    if (newBadges.length && !(route === 'quiz' && session && session.finished)) { for (const b of newBadges) toast(`Badge unlocked: ${b.name}`, 'trophy'); newBadges = []; }
  }

  // ------------------------------------------------------------- shared bits
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
      out.push(`<li class="${on ? 'on' : ''} ${i === 0 ? 'now' : ''}"><span>${d.toLocaleDateString('en-GB', { weekday: 'narrow' })}</span><i>${on ? icon('check') : ''}</i></li>`);
    }
    return `<ol class="week-strip" aria-label="Last 7 days">${out.join('')}</ol>`;
  }

  function taskLabel(t, dayN) {
    switch (t.type) {
      case 'lesson': return t.topic === 'weak' ? `Reread your weakest topic${dayN && planDay() >= dayN ? `: ${TOPIC[weakTopics(1)[0]].name}` : ''}` : TOPIC[t.topic].name;
      case 'practice': {
        const names = t.topics.includes('all') ? 'All topics' : t.topics.includes('weak') ? 'Your weakest topics' : t.topics.map((x) => TOPIC[x].short).join(', ');
        return `${t.label || names}`;
      }
      case 'signs': return t.n ? `${t.n} signs` : `Every sign (${SIGN_Q.length})`;
      case 'review': return 'Review your mistakes';
      case 'mock': return `${MOCK.questions} questions, ${MOCK.minutes} minutes`;
      case 'facts': return 'Key-facts sheet';
      case 'todo': return t.text;
      default: return '';
    }
  }
  function taskSub(t) {
    switch (t.type) {
      case 'lesson': return 'Lesson';
      case 'practice': return `${t.n} questions${t.label ? ` · ${t.topics.includes('all') ? 'all topics' : t.topics.includes('weak') ? 'weakest topics' : t.topics.map((x) => TOPIC[x].short).join(', ')}` : ''}`;
      case 'signs': return 'Sign drill';
      case 'review': return `${mistakes().length} on the list`;
      case 'mock': return 'Mock exam';
      case 'facts': return 'Read';
      case 'todo': return 'To do';
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
      const action = t.type === 'todo' ? (done ? 'Undo' : 'Done') : done ? 'Again' : 'Start';
      return `<li class="row task ${done ? 'done' : ''}">
        <button class="check" data-act="toggle" data-key="${key}" aria-pressed="${done}" aria-label="${done ? 'Mark not done' : 'Mark done'}">${icon('check')}</button>
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
    if (!r.ok) throw new Error(j.error || `Server error ${r.status}`);
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
    if (cloud.status === 'syncing') return 'Syncing…';
    if (cloud.status === 'error') return `Not synced: ${esc(cloud.error)}`;
    if (cloud.last) return `Synced ${new Date(cloud.last).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
    return 'Waiting to sync';
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
    if (perm !== 'granted') throw new Error(perm === 'denied' ? 'Notifications are blocked for this site. Allow them in your browser or phone settings, then try again.' : 'Notifications were not allowed.');
    const reg = swReg || (await registerSW());
    if (!reg) throw new Error('This browser cannot run the reminder service.');
    await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(cloud.vapid) }));
    await api('push', { method: 'POST', body: JSON.stringify({ action: 'subscribe', id: syncId, subscription: sub.toJSON(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone }) });
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
      if (code.length === 20) { try { await linkDevice(code); toast('This device is now linked. Progress is shared.'); } catch (e) { toast(`Could not link: ${e.message}`, 'close'); } }
    } else if (syncId && cloud.sync) await syncNow({ quiet: true });
    render();
  }
  document.addEventListener('visibilitychange', () => {
    if (!syncId || !cloud.sync) return;
    if (document.visibilityState === 'hidden' && dirty) { clearTimeout(pushT); syncNow({ quiet: true }); }
    if (document.visibilityState === 'visible' && Date.now() - cloud.last > 15000) syncNow();
  });

  function cloudCard() {
    if (!hosted) return `<section class="card"><h2>Sync and reminders</h2><p class="muted">These work on the hosted site. This copy was opened from a file on your computer, so progress stays in this browser.</p></section>`;
    if (!cloud.checked) return `<section class="card"><h2>Sync and reminders</h2><p class="muted">Checking the server…</p></section>`;
    if (!cloud.sync) return `<section class="card"><h2>Sync and reminders</h2><p class="muted">The server for sync isn't set up yet. Connect an Upstash Redis database to this project in Vercel (see the README), then redeploy.</p></section>`;
    const sync = syncId
      ? `<div class="row-between"><h2>Sync between devices</h2><span class="syncdot ${cloud.status}" id="syncDot" aria-hidden="true"></span></div>
         <p class="muted small" id="syncStatus">${syncLine()}</p>
         <p>Open this link on your phone (or any device) once. After that, both share the same progress automatically.</p>
         <div class="codebox"><span class="code">${prettyCode(syncId)}</span></div>
         <div class="actions"><button class="btn filled" data-act="copyLink">Copy link for your phone</button><button class="btn tinted" data-act="syncNow">Sync now</button><button class="btn plain" data-act="unlinkAsk">Unlink this device</button></div>
         <p class="muted small">Keep the code private: anyone with it can see and change this progress.</p>`
      : `<h2>Sync between devices</h2>
         <p>Share one set of progress between your PC and phone: streak, plan, mistakes and mock results.</p>
         <div class="actions"><button class="btn filled" data-act="syncOn">Turn on sync</button></div>
         <form id="linkForm" class="row-form"><div class="field"><label for="linkCode">Already set up on another device? Enter its code</label><input id="linkCode" class="text" autocomplete="off" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"></div><button class="btn tinted" type="submit">Link</button></form>`;
    let rem;
    if (!cloud.push) rem = `<p class="muted">Reminders need VAPID keys on the server. See the README.</p>`;
    else if (isIOS() && !standalone()) rem = `<p>On iPhone, reminders work from the Home Screen app:</p><ol class="steps"><li>Tap the <b>Share</b> button in Safari.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Open Körkort 30 from the new icon and come back here.</li></ol>`;
    else if (!pushSupported()) rem = `<p class="muted">This browser can't receive notifications. Try Chrome on Android, or the Home Screen app on iPhone.</p>`;
    else if (cloud.subscribed) rem = `<p><b class="okc">On.</b> You get one reminder each evening, around 18:00 Swedish time, only on days you haven't studied yet.</p><div class="actions"><button class="btn tinted" data-act="pushTest">Send a test now</button><button class="btn plain" data-act="pushOff">Turn off on this device</button></div>`;
    else rem = `<p>One reminder each evening, around 18:00 Swedish time, only on days you haven't studied yet. It tells you your plan day and your streak.</p><div class="actions"><button class="btn filled" data-act="pushOn">Turn on daily reminder</button></div>${!syncId ? '<p class="muted small">This also turns on sync, so the reminder knows when you have already studied on another device.</p>' : ''}`;
    return `<section class="card" id="cloud">${sync}</section><section class="card"><h2>Daily reminder</h2>${rem}</section>`;
  }
  function reminderPromo() {
    if (!hosted || !cloud.push || cloud.subscribed || !pushSupported() && !isIOS()) return '';
    try { if (localStorage.getItem('korkort30.nopromo')) return ''; } catch (e) { /* ignore */ }
    return `<section class="card promo"><span class="tile" style="--tile:#ff3b30;--s:40px"><span style="color:#fff">${icon('bell')}</span></span><div class="grow"><b>Never miss a day</b><span class="muted small">Get a short evening reminder on your phone, and share progress with your PC.</span></div><a class="btn tinted small" href="#progress">Set up</a><button class="iconbtn" data-act="noPromo" aria-label="Hide">${icon('close')}</button></section>`;
  }

  // ------------------------------------------------------------- views
  function viewWelcome() {
    const t = iso(today());
    const suggested = iso(new Date(today().getTime() + 30 * DAY_MS));
    return `
      <section class="welcome">
        <div class="welcome-art" aria-hidden="true">${rings([{ v: 0.82, color: RING.plan }, { v: 0.64, color: RING.q }, { v: 0.9, color: RING.acc }], 220)}
          <span class="float s1">${Signs.svg('yield', 64)}</span><span class="float s2">${Signs.svg('w-moose', 58)}</span><span class="float s3">${Signs.svg('speed-50', 54)}</span><span class="float s4">${Signs.svg('main-road', 50)}</span></div>
        <p class="eyebrow">Swedish B-licence theory test</p>
        <h1 class="display">Thirty days to your&nbsp;theory test.</h1>
        <p class="lede">About an hour a day. ${REAL.length + SIGN_Q.length} questions drawn like the real thing: junctions, roundabouts, hazards and every sign. Close your rings, keep your streak and finish with full mock exams.</p>
        <form class="card start" id="startForm">
          <div class="field"><label for="startDate">Day 1</label><input type="date" id="startDate" value="${t}" required></div>
          <div class="field"><label for="testDate">Test date <span class="muted">(optional)</span></label><input type="date" id="testDate" value="${suggested}"></div>
          <button class="btn filled large" type="submit">Start day 1</button>
        </form>
        <ul class="facts-strip">
          <li><b>${MOCK.questions}</b><span>scored questions</span></li>
          <li><b>${MOCK.pass}</b><span>to pass</span></li>
          <li><b>${MOCK.minutes}</b><span>minutes</span></li>
          <li><b>30</b><span>days</span></li>
        </ul>
      </section>`;
  }

  function journey(n) {
    const dots = PLAN.map((d) => {
      const p = dayProgress(d.day); const cls = p === 1 ? 'done' : d.day === n ? 'now' : d.day < n ? 'late' : '';
      const mock = d.tasks.some((t) => t.type === 'mock');
      return `<a href="#day-${d.day}" class="jd ${cls} ${mock ? 'mock' : ''}" title="Day ${d.day}: ${esc(d.title)}" aria-label="Day ${d.day}: ${esc(d.title)}${p === 1 ? ', complete' : ''}">${d.day === n ? `<span class="jcar">${icon('car')}</span>` : ''}</a>`;
    }).join('');
    return `<div class="journey"><div class="jtrack">${dots}</div><div class="jlabels"><span>Day 1</span><span>Mocks start day 14</span><span>Test</span></div></div>`;
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
        <p class="eyebrow">${fmtLong(today())}${testIn !== null ? ` · ${testIn > 0 ? `test in ${testIn} day${testIn === 1 ? '' : 's'}` : testIn === 0 ? 'test day' : 'test date passed'}` : ''}</p>
        <h1 class="large-title">${greeting()}</h1>
      </header>

      <section class="hero">
        <div class="hero-rings">${rings(R.vals, 176)}</div>
        <div class="hero-body">
          <p class="hero-eyebrow">Day ${n} of 30</p>
          <h2 class="hero-title">${esc(day.title)}</h2>
          <p class="hero-focus">${esc(day.focus)}</p>
          <ul class="legend">
            <li style="--c:${RING.plan}"><b>${R.tasksDone}/${R.tasksAll}</b><span>tasks</span></li>
            <li style="--c:${RING.q}"><b>${R.a}/${DAILY_GOAL}</b><span>questions</span></li>
            <li style="--c:${RING.acc}"><b>${R.a ? Math.round(R.acc * 100) + '%' : '–'}</b><span>accuracy</span></li>
          </ul>
          ${nt ? `<button class="btn filled large hero-cta" data-act="task" data-day="${nt.n}" data-i="${nt.i}">${S.done[`${nt.n}-0`] || nt.i > 0 ? 'Continue' : 'Start'}: ${esc(taskSub(nt.t) === 'To do' ? 'to-do' : taskLabel(nt.t, nt.n))} ${icon('chevron')}</button>`
            : `<div class="hero-done">${icon('check')} Today's plan is done.${tomorrow ? ` Tomorrow: <b>${esc(tomorrow.title)}</b>.` : ''} <button class="btn tinted small" data-act="quick" data-topics="all" data-n="20">Bonus round: 20 questions</button></div>`}
        </div>
      </section>

      ${journey(n)}

      <div class="grid-2">
        <section class="stack">
          <div class="section-head"><h2>Today's tasks</h2><span class="muted">Goal: ${esc(day.goal)}</span></div>
          ${taskList(n)}
          ${behind.length ? `<p class="note">${icon('mistakes')} <span>Unfinished: ${behind.map((d) => `<a href="#day-${d}">day ${d}</a>`).join(', ')}. The plan builds on itself, so catch up first.</span></p>` : ''}
          ${tomorrow ? `<a class="card teaser" href="#day-${tomorrow.day}"><span class="eyebrow">Tomorrow · Day ${tomorrow.day}</span><b>${esc(tomorrow.title)}</b><span class="muted">${esc(tomorrow.focus)}</span>${tomorrow.tasks.some((t) => t.type === 'mock') ? '<span class="tag">Mock exam</span>' : ''}</a>` : ''}
        </section>
        <aside class="stack">
          <section class="card streak-card">
            <div class="streak-top"><span class="flame-big ${st.todayDone ? 'lit' : ''}">${icon('flame')}</span><div><b class="big">${st.n} day${st.n === 1 ? '' : 's'}</b><span class="muted">${st.todayDone ? 'Streak safe for today.' : st.n ? 'Answer 10 questions to keep it going.' : 'Answer 10 questions to start a streak.'}</span></div></div>
            ${weekStrip()}
          </section>
          <section class="card">
            <div class="row-between"><h3>Level ${lv.n} · ${esc(lv.name)}</h3><span class="muted small">${S.xp} XP</span></div>
            <div class="lbar big"><i style="width:${Math.round(lv.frac * 100)}%"></i></div>
            <p class="muted small">${lv.next ? `${lv.toNext} XP to ${esc(lv.next)}` : 'Top level reached.'}</p>
          </section>
          <section class="card">
            <div class="row-between"><h3>Test readiness</h3><span class="big-num">${r.pct}%</span></div>
            <div class="meter"><i style="width:${r.pct}%"></i><em style="left:${(MOCK.pass / MOCK.questions) * 100}%"></em></div>
            <p class="muted small">${r.basis === 'mocks' ? 'From your last mocks and topic mastery.' : 'From topic mastery. Your first mock on day 14 gives a real reading.'} The line marks the pass mark.</p>
            ${last ? `<p class="small">Last mock: <b class="${last.passed ? 'okc' : 'badc'}">${last.score}/${last.total} · ${last.passed ? 'pass' : 'not yet'}</b></p>` : ''}
          </section>
          <section class="card">
            <h3>Focus topics</h3>
            <ul class="group plain">${weak.map((id) => { const s = topicStats(id); return `<li class="row"><a href="#lesson-${id}" class="rowlink">${topicTile(id, 28)}<span class="grow">${esc(TOPIC[id].name)}</span><span class="muted small">${s.acc === null ? 'new' : Math.round(s.acc * 100) + '%'}</span>${icon('chevron', 'chev')}</a></li>`; }).join('')}</ul>
            <button class="btn tinted" data-act="quick" data-topics="weak" data-n="20">Practise these</button>
          </section>
          ${reminderPromo()}
          <a class="card badges-mini" href="#progress"><div class="row-between"><h3>Badges</h3><span class="muted small">${earned.length}/${BADGES.length}</span></div>
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
      const name = { 1: 'Foundations', 2: 'All the rules', 3: 'First mocks and weak spots', 4: 'Exam mode' }[w];
      return `<section class="week"><div class="section-head"><h2>Week ${w}</h2><span class="muted">${name}</span></div><div class="days">${days.map((d) => {
        const p = dayProgress(d.day); const state = p === 1 ? 'done' : d.day === n ? 'now' : d.day < n ? 'late' : d.day > n ? 'future' : '';
        return `<a class="day ${state}" href="#day-${d.day}">
          <div class="day-top"><span class="dnum">${d.day}</span>${rings([{ v: p, color: p === 1 ? '#30d158' : '#0a84ff' }], 30)}</div>
          <span class="ddate">${S.start ? fmt(dateOfDay(d.day)) : ''}${d.day === n ? ' · today' : ''}</span>
          <span class="dtitle">${esc(d.title)}</span>
          ${d.tasks.some((t) => t.type === 'mock') ? '<span class="tag">Mock</span>' : ''}
        </a>`;
      }).join('')}</div></section>`;
    }).join('');
    return `<header class="pagehead"><p class="eyebrow">${doneDays} of 30 days complete</p><h1 class="large-title">Your plan</h1>
      <p class="lede">Weeks 1–3 teach every topic and drill the picture questions. From day 14 you sit a full mock every two or three days and spend the days between on your weakest topics. You are ready when you score 60/65 or more on two mocks in a row.</p></header>${weeks}`;
  }

  function viewDay(n) {
    if (!(n >= 1 && n <= 30)) return viewPlan();
    const d = PLAN[n - 1];
    return `<header class="pagehead"><p class="eyebrow"><a href="#plan">Plan</a> · Day ${n}${S.start ? ` · ${fmt(dateOfDay(n))}` : ''}</p><h1 class="large-title">${esc(d.title)}</h1><p class="lede">${esc(d.focus)}</p></header>
      <div class="section-head"><h2>Tasks</h2><span class="muted">Goal: ${esc(d.goal)}</span></div>${taskList(n)}
      <nav class="pager">${n > 1 ? `<a class="btn plain" href="#day-${n - 1}">← Day ${n - 1}</a>` : '<span></span>'}${n < 30 ? `<a class="btn plain" href="#day-${n + 1}">Day ${n + 1} →</a>` : ''}</nav>`;
  }

  function viewLessons() {
    const read = Object.keys(S.lessons).length;
    return `<header class="pagehead"><p class="eyebrow">${read} of 12 read</p><h1 class="large-title">Learn</h1><p class="lede">One lesson per topic, with pictures and a key-facts box at the end. Read one, then practise it straight away.</p></header>
      <a class="card feature" href="#facts"><span class="tile" style="--tile:#34c759;--s:44px"><span style="color:#fff">${icon('lessons')}</span></span><div><b>Key-facts sheet</b><span class="muted">Every rule and number on one page. Read it on days 21, 24 and 30.</span></div>${icon('chevron', 'chev')}</a>
      <ul class="group">${TOPICS.map((t) => {
        const l = LESSONS[t.id]; const st = topicStats(t.id); const done = S.lessons[t.id];
        return `<li class="row"><a class="rowlink" href="#lesson-${t.id}">${topicTile(t.id)}
          <span class="grow"><span class="rtitle">${esc(t.name)}</span><span class="rsub">${l ? `${l.minutes || 15} min` : 'Coming soon'} · ${st.total} questions · ${Math.round(st.mastery * 100)}% mastered</span></span>
          ${done ? `<span class="okdot" aria-label="Read">${icon('check')}</span>` : ''}${icon('chevron', 'chev')}</a></li>`;
      }).join('')}</ul>`;
  }

  function viewLesson(id) {
    const t = TOPIC[id]; const l = LESSONS[id];
    if (!t) return viewLessons();
    if (!l) return `<header class="pagehead"><p class="eyebrow"><a href="#lessons">Learn</a></p><h1 class="large-title">${esc(t.name)}</h1></header><p class="lede">This lesson is not written yet. You can still practise the topic.</p><div class="actions"><button class="btn filled" data-act="quick" data-topics="${id}" data-n="15">Practise ${esc(t.short)}</button></div>`;
    const idx = TOPICS.indexOf(t);
    return `<article class="lesson">
      <header class="pagehead lesson-head">${topicTile(id, 56)}<p class="eyebrow"><a href="#lessons">Learn</a> · Topic ${idx + 1} of 12 · ${l.minutes || 15} min</p><h1 class="large-title">${esc(l.title)}</h1>${l.intro ? `<p class="lede">${esc(l.intro)}</p>` : ''}</header>
      ${l.sections.map((s) => `<section class="lsec"><h2>${esc(s.h)}</h2><div class="prose">${s.body}</div>
        ${(s.pics || []).length ? `<div class="pics">${s.pics.map((p) => `<figure class="pic">${Scene.render(p)}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}</section>`).join('')}
      <section class="card keyfacts"><h2>Key facts</h2><ul>${l.keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>
      <div class="actions">
        <button class="btn filled large" data-act="lessonDone" data-topic="${id}">${S.lessons[id] ? 'Practise this topic' : 'Mark as read and practise'}</button>
        ${TOPICS[idx + 1] ? `<a class="btn plain" href="#lesson-${TOPICS[idx + 1].id}">Next: ${esc(TOPICS[idx + 1].short)} →</a>` : ''}
      </div></article>`;
  }

  function viewFacts() {
    return `<header class="pagehead"><p class="eyebrow"><a href="#lessons">Learn</a></p><h1 class="large-title">Key facts</h1><p class="lede">The rules and numbers from every lesson on one page.</p></header>
      <div class="factsgrid">${TOPICS.filter((t) => LESSONS[t.id]).map((t) => `<section class="card"><a class="facts-h" href="#lesson-${t.id}">${topicTile(t.id, 30)}<h2>${esc(t.name)}</h2></a><ul>${LESSONS[t.id].keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>`).join('')}</div>
      ${pendingTask && pendingTask.facts ? `<div class="actions"><button class="btn filled large" data-act="factsDone">Done reading</button></div>` : ''}`;
  }

  function viewPractice() {
    const mc = mistakes().length;
    return `<header class="pagehead"><p class="eyebrow">Train</p><h1 class="large-title">Practice</h1><p class="lede">New questions and past mistakes come up first. You see the answer and why after every question.</p></header>
      <div class="hub">
        <button class="hubcard c-blue" data-act="quick" data-topics="all" data-n="20"><span>${icon('bolt')}</span><b>Quick 20</b><em>Mixed topics</em></button>
        <button class="hubcard c-orange" data-act="quick" data-topics="weak" data-n="20"><span>${icon('star')}</span><b>Weak spots</b><em>${esc(weakTopics(2).map((x) => TOPIC[x].short).join(' + '))}</em></button>
        <a class="hubcard c-indigo" href="#mock"><span>${icon('mock')}</span><b>Mock exam</b><em>${MOCK.questions} questions · ${MOCK.minutes} min</em></a>
        <a class="hubcard c-pink" href="#mistakes"><span>${icon('mistakes')}</span><b>Mistakes</b><em>${mc} to fix</em></a>
        <a class="hubcard c-yellow" href="#signs"><span>${icon('signs')}</span><b>Signs</b><em>${SIGN_Q.length} signs</em></a>
      </div>
      <form class="card" id="practiceForm">
        <h2>Build your own</h2>
        <fieldset><legend>Topics</legend><div class="chips">
          ${TOPICS.map((t) => `<label class="chip"><input type="checkbox" name="topic" value="${t.id}"><span>${esc(t.short)} <em>${topicStats(t.id).total}</em></span></label>`).join('')}
        </div></fieldset>
        <fieldset><legend>Length</legend><div class="seg" role="radiogroup">${[10, 20, 30, 50].map((n, i) => `<label><input type="radio" name="n" value="${n}" ${i === 1 ? 'checked' : ''}><span>${n}</span></label>`).join('')}</div></fieldset>
        <div class="actions"><button class="btn filled large" type="submit">Start</button></div>
        <p class="muted small" id="practiceMsg" role="status"></p>
      </form>`;
  }

  function viewMockIntro() {
    const passes = S.mocks.filter((m) => m.passed).length;
    return `<header class="pagehead"><p class="eyebrow">Exam conditions</p><h1 class="large-title">Mock exam</h1>
      <p class="lede">${MOCK.questions} questions in ${MOCK.minutes} minutes, spread across topics like the real test. Answers stay hidden until you hand in. You need ${MOCK.pass} correct.</p></header>
      <div class="grid-2"><section class="card mock-card">
        <div class="mock-dial">${rings([{ v: 1, color: '#5e5ce6' }], 120)}<span><b>${MOCK.minutes}</b>min</span></div>
        <ul class="prose"><li>Sit somewhere quiet and put your phone away.</li><li>Skip and come back with the question map.</li><li>Read every option. Many wrong answers are almost right.</li><li>The real test has 70 questions: 65 scored and 5 unscored trial questions.</li></ul>
        <button class="btn filled large" data-act="mock">Start mock exam</button>
      </section>
      <section class="card"><div class="row-between"><h2>Your mocks</h2><span class="muted">${S.mocks.length} taken · ${passes} passed</span></div>${S.mocks.length ? mockChart() + mockTable() : '<p class="muted">None yet. The plan schedules your first one on day 14.</p>'}</section></div>`;
  }
  function mockTable() {
    return `<div class="tablewrap"><table class="tbl"><thead><tr><th>Date</th><th>Score</th><th>Time</th><th>Result</th></tr></thead><tbody>${S.mocks.slice().reverse().map((m) =>
      `<tr><td>${new Date(m.date).toLocaleDateString('en-GB')}</td><td class="num">${m.score}/${m.total}</td><td class="num">${Math.floor(m.secs / 60)}:${String(m.secs % 60).padStart(2, '0')}</td><td><span class="badge ${m.passed ? 'ok' : 'bad'}">${m.passed ? 'Pass' : 'Fail'}</span></td></tr>`).join('')}</tbody></table></div>`;
  }

  function viewMistakes() {
    const list = mistakes();
    return `<header class="pagehead"><p class="eyebrow">Learn from every miss</p><h1 class="large-title">Mistakes</h1>
      <p class="lede">Every wrong answer lands here. It leaves after you get it right twice in a row.</p></header>
      ${list.length ? `<div class="actions"><button class="btn filled large" data-act="review">Review ${Math.min(40, list.length)} now</button></div>
      <div class="mlist">${list.map((q) => `<details class="card mitem"><summary>${topicTile(q.topic, 28)}<span class="grow">${esc(q.q)}</span>${icon('chevron', 'chev')}</summary>
        ${q.img ? `<div class="pic">${Scene.render(q.img)}</div>` : ''}<p><b class="okc">Correct:</b> ${esc(q.options[q.answer])}</p><p class="prose muted">${esc(q.explain)}</p></details>`).join('')}</div>`
      : `<section class="card empty"><span class="tile" style="--tile:#30d158;--s:56px"><span style="color:#fff">${icon('check')}</span></span><h2>All clear</h2><p class="muted">Nothing to fix right now. Anything you get wrong will show up here.</p><a class="btn tinted" href="#practice">Practise</a></section>`}`;
  }

  function viewSigns() {
    const groups = {};
    for (const n of Signs.list()) (groups[Signs.group(n)] = groups[Signs.group(n)] || []).push(n);
    const order = ['Warning signs', 'Priority signs', 'Prohibition signs', 'Mandatory signs', 'Information signs'];
    return `<header class="pagehead"><p class="eyebrow">${Signs.list().length} Swedish signs</p><h1 class="large-title">Signs</h1>
      <p class="lede">Swedish signs have a yellow face where most of Europe uses white. Tap a sign to reveal its name.</p>
      <div class="actions"><button class="btn filled" data-act="signdrill" data-n="20">Drill 20 signs</button><button class="btn tinted" data-act="signdrill" data-n="0">Every sign</button><button class="btn plain" data-act="revealAll">Show all names</button></div></header>
      ${order.filter((g) => groups[g]).map((g) => `<section class="signgroup"><div class="section-head"><h2>${g}</h2><span class="muted">${esc(groupHint(g).replace(/^are /, '').replace(/^tell/, 'Tell').replace(/^./, (c) => c.toUpperCase()))}</span></div><div class="signs">${groups[g].map((n) => {
        const s = S.q[`sign-${n}`]; const m = s && s.box >= 2;
        return `<button class="signcard ${m ? 'mastered' : ''}" data-act="flip" aria-expanded="false">${Signs.svg(n, 84)}<span class="sname">${esc(Signs.name(n))}</span>${m ? `<span class="okdot" aria-label="Mastered">${icon('check')}</span>` : ''}</button>`;
      }).join('')}</div></section>`).join('')}`;
  }

  function viewProgress() {
    const totalSeen = Object.values(S.q).filter((s) => s.seen).length;
    const answered = totalAnswered();
    const right = Object.values(S.q).reduce((a, s) => a + s.right, 0);
    const daysDone = PLAN.filter((d) => dayDone(d.day)).length;
    const lv = level(); const st = streak();
    return `<header class="pagehead"><p class="eyebrow">Level ${lv.n} · ${esc(lv.name)} · ${S.xp} XP</p><h1 class="large-title">Progress</h1></header>
      <ul class="stats">
        <li style="--c:#ff375f"><b>${daysDone}<small>/30</small></b><span>plan days complete</span></li>
        <li style="--c:#ff9f0a"><b>${st.n}</b><span>day streak · best ${S.best || st.n}</span></li>
        <li style="--c:#30d158"><b>${answered ? Math.round((right / answered) * 100) : 0}%</b><span>of ${answered} answers right</span></li>
        <li style="--c:#0a84ff"><b>${totalSeen}<small>/${ALL.length}</small></b><span>questions seen</span></li>
      </ul>
      <div class="grid-2 even">${cloudCard()}</div>
      <section class="card"><div class="row-between"><h2>Badges</h2><span class="muted">${Object.keys(S.badges).length} of ${BADGES.length}</span></div>
        <div class="badges">${BADGES.map((b) => `<div class="badge-item ${S.badges[b.id] ? 'on' : ''}">${badgeIcon(b, !!S.badges[b.id])}<b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join('')}</div></section>
      <section class="card"><h2>Topics</h2><ul class="group plain">
        ${TOPICS.map((t) => { const s = topicStats(t.id); return `<li class="row"><a class="rowlink" href="#lesson-${t.id}">${topicTile(t.id, 30)}<span class="grow"><span class="rtitle">${esc(t.name)}</span><span class="mbar"><i style="width:${s.mastery * 100}%"></i></span></span><span class="muted small num">${s.acc === null ? '–' : Math.round(s.acc * 100) + '%'}</span></a></li>`; }).join('')}
      </ul><p class="muted small">Bars show mastery: a question is mastered after two right answers in a row. The percentage is your accuracy.</p></section>
      ${S.mocks.length ? `<section class="card"><h2>Mock exams</h2>${mockChart()}${mockTable()}</section>` : ''}
      <section class="card"><h2>Settings</h2>
        <form id="settingsForm" class="row-form">
          <div class="field"><label for="setStart">Day 1 of the plan</label><input type="date" id="setStart" value="${S.start || iso(today())}"></div>
          <div class="field"><label for="setTest">Test date</label><input type="date" id="setTest" value="${S.testDate || ''}"></div>
          <button class="btn filled" type="submit">Save dates</button>
        </form>
        <p class="muted small">${storageOk ? 'Progress is saved in this browser. Copy a backup code to move it to another device.' : 'This browser is blocking storage, so progress will be lost when you close the page. Copy a backup code.'}</p>
        <div class="actions"><button class="btn tinted" data-act="export">Copy backup code</button><button class="btn tinted" data-act="importOpen">Restore from code</button><button class="btn danger" data-act="resetAsk">Reset everything</button></div>
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
    return `<div class="tablewrap"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mock exam scores">
      ${[0, 0.5, 1].map((v) => `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${P - 8}" y="${y(v) + 4}" text-anchor="end" class="axis">${Math.round(v * MOCK.questions)}</text>`).join('')}
      <line x1="${P}" x2="${W - P}" y1="${passY}" y2="${passY}" class="pass"/><text x="${W - P}" y="${passY - 6}" text-anchor="end" class="axis">pass ${MOCK.pass}</text>
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
        <button class="iconbtn" data-act="quit" aria-label="${mock ? 'Hand in' : 'End session'}">${icon('close')}</button>
        <div class="qprog" role="progressbar" aria-valuemin="0" aria-valuemax="${s.items.length}" aria-valuenow="${mock ? answered : s.i}"><i style="width:${pct}%"></i></div>
        ${mock ? `<div class="timer" id="timer"></div>` : `<div class="combo ${s.combo >= 3 ? 'hot' : ''}" aria-live="polite">${icon('flame')}<b>${s.combo}</b></div>`}
      </div>
      <div class="qgrid ${q.img ? '' : 'noimg'}">
        ${q.img ? `<figure class="pic qpic">${Scene.render(q.img)}</figure>` : ''}
        <div class="qside">
          <p class="eyebrow">${esc(s.title)} · ${esc(TOPIC[q.topic].short)} · ${s.i + 1} of ${s.items.length}</p>
          <h1 class="qtext">${esc(q.q)}</h1>
          <div class="opts" role="group" aria-label="Answers">${opts}</div>
          ${!mock && s.revealed ? `<div class="feedback ${ok ? 'ok' : 'bad'}" role="status"><b>${ok ? (s.combo >= 3 ? `Correct · ${s.combo} in a row` : 'Correct') : 'Not quite'}</b><p>${esc(q.explain)}</p></div>` : ''}
          <div class="qnav">
            ${mock ? `<button class="btn plain" data-act="prev" ${s.i === 0 ? 'disabled' : ''}>← Back</button>` : ''}
            <button class="btn filled large" data-act="next" ${!mock && !s.revealed ? 'disabled' : ''}>${s.i === s.items.length - 1 ? (mock ? 'Hand in' : 'Finish') : mock && it.pick === null ? 'Skip' : 'Continue'}</button>
          </div>
          <p class="muted small keys">Keyboard: 1–4 to answer, Enter to continue.</p>
        </div>
      </div>
      ${mock ? `<div class="qmap" aria-label="Question map">${s.items.map((x, i) => `<button class="${i === s.i ? 'cur' : ''} ${x.pick !== null ? 'ans' : ''}" data-act="jump" data-i="${i}" aria-label="Question ${i + 1}${x.pick !== null ? ', answered' : ''}">${i + 1}</button>`).join('')}</div>` : ''}
    </div>`;
  }
  function tickTimer() {
    clearInterval(timer);
    const upd = () => {
      const el = $('#timer'); if (!session || session.finished) { clearInterval(timer); return; }
      const left = Math.max(0, session.deadline - Date.now());
      if (el) { el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; el.classList.toggle('low', left < 5 * 60000); }
      if (left <= 0) { toast('Time is up. Your exam was handed in.'); finish(); }
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
    const headline = mock ? (passed ? (pct >= 92 ? 'Test-ready form.' : 'Pass.') : 'Not a pass yet.') : pct >= 90 ? 'Excellent.' : pct >= 75 ? 'Nice work.' : pct >= 50 ? 'Getting there.' : 'Keep going.';
    const tip = mock ? (passed ? (pct >= 92 ? 'Keep it there until test day.' : `Aim for 60/${MOCK.questions} or better so a bad day still passes.`) : `You need ${MOCK.pass}. Go through the misses below, then practise your weakest topics.`)
      : pct >= 90 ? 'These questions are moving into your mastered pile.' : pct >= 75 ? 'The misses below are on your mistakes list now.' : 'Read the explanations below, then reread the lesson for this topic.';
    return `<section class="result">
        <div class="result-ring">${rings([{ v: right / total, color }], 200)}<span><b>${right}<small>/${total}</small></b><em>${pct}%</em></span></div>
        <p class="eyebrow">${esc(s.title)}</p>
        <h1 class="large-title">${headline}</h1>
        <p class="lede">${tip}</p>
        <div class="rewards">
          <span class="reward">${icon('star')}<b>+${s.xp} XP</b></span>
          ${levelUp ? `<span class="reward lvl">${icon('trophy')}<b>Level ${lv.n}: ${esc(lv.name)}</b></span>` : ''}
          ${s.badges.map((b) => `<span class="reward badge-new">${icon('trophy')}<b>${esc(b.name)}</b></span>`).join('')}
          ${celebrate ? `<span class="reward day">${icon('check')}<b>${esc(celebrate.title)}</b></span>` : ''}
        </div>
        <div class="actions center">
          ${s.taskKey ? `<a class="btn filled large" href="#today">Back to today</a>` : ''}
          ${wrong.length ? `<button class="btn ${s.taskKey ? 'tinted' : 'filled'} large" data-act="retryWrong">Retry ${wrong.length} missed</button>` : ''}
          <a class="btn plain large" href="#practice">More practice</a>
        </div>
      </section>
      <section class="card"><h2>By topic</h2><ul class="group plain">${Object.entries(byTopic).map(([t, [r, n]]) => `<li class="row"><span class="rowlink">${topicTile(t, 28)}<span class="grow">${esc(TOPIC[t].name)}</span><span class="num ${r === n ? 'okc' : ''}">${r}/${n}</span></span></li>`).join('')}</ul></section>
      ${wrong.length ? `<div class="section-head"><h2>Review</h2><span class="muted">${wrong.length} missed</span></div><div class="mlist">${wrong.map((it) => `<article class="card mitem open">
        <p class="eyebrow">${esc(TOPIC[it.q.topic].short)}</p><h3>${esc(it.q.q)}</h3>${it.q.img ? `<div class="pic">${Scene.render(it.q.img)}</div>` : ''}
        ${it.pick !== null ? `<p class="ans bad">${icon('close')} ${esc(it.q.options[it.pick])}</p>` : '<p class="ans bad">Not answered</p>'}
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
      <h2 id="celeT">${esc(c.title)}</h2><p>${esc(c.body)}</p><p class="muted small">+100 XP for finishing the day.</p><button class="btn filled large" data-act="closeCele">Nice</button></div>`;
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
        if (left && b.dataset.sure !== '1') { b.dataset.sure = '1'; toast(`${left} unanswered. Tap × again to hand in anyway.`, 'mock'); return; }
        finish();
      } else if (session.items.some((x) => x.pick !== null)) { session.items = session.items.filter((x) => x.pick !== null); finish(); }
      else { session = null; go('practice'); }
    }
    else if (act === 'quick') { const topics = b.dataset.topics.split(','); startSession({ mode: 'practice', title: topics[0] === 'weak' ? 'Weak spots' : topics[0] === 'all' ? 'Quick 20' : `${TOPIC[topics[0]].short} practice`, items: pickPractice(topics, +b.dataset.n) }); }
    else if (act === 'mock') startSession({ mode: 'mock', title: 'Mock exam', items: pickMock(), taskKey: findTask('mock') });
    else if (act === 'review') startSession({ mode: 'practice', title: 'Mistakes review', items: shuffle(mistakes()).slice(0, 40), taskKey: findTask('review') });
    else if (act === 'signdrill') startSession({ mode: 'practice', title: +b.dataset.n ? 'Sign drill' : 'Every sign', items: pickSigns(+b.dataset.n) });
    else if (act === 'retryWrong') { const w = session.items.filter((x) => x.pick !== x.q.answer).map((x) => x.q); startSession({ mode: 'practice', title: 'Retry missed', items: w }); }
    else if (act === 'lessonDone') {
      const topic = b.dataset.topic; const first = !S.lessons[topic]; S.lessons[topic] = Date.now(); if (first) addXP(30);
      if (pendingTask && pendingTask.topic === topic) { markDone(pendingTask.key); pendingTask = null; }
      else { const k = findTask('lesson', topic); if (k) markDone(k); }
      newBadges = []; checkBadges(); save();
      startSession({ mode: 'practice', title: `${TOPIC[topic].short} practice`, items: pickPractice([topic], 10) });
    }
    else if (act === 'factsDone') { if (pendingTask && pendingTask.facts) { markDone(pendingTask.key); pendingTask = null; checkBadges(); save(); } go('today'); }
    else if (act === 'flip') { const on = b.classList.toggle('on'); b.setAttribute('aria-expanded', on); }
    else if (act === 'revealAll') { document.querySelectorAll('.signcard').forEach((c) => { c.classList.add('on'); c.setAttribute('aria-expanded', 'true'); }); }
    else if (act === 'closeCele') { $('#celebrate').hidden = true; }
    else if (act === 'export') {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
      $('#backupArea').innerHTML = `<label for="bk" class="muted small">Your backup code. Keep it somewhere safe.</label><textarea id="bk" rows="4" readonly>${code}</textarea>`;
      $('#bk').select();
      (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => toast('Backup code copied.'), () => toast('Select the code and copy it.'));
    }
    else if (act === 'importOpen') $('#backupArea').innerHTML = `<label for="imp" class="muted small">Paste a backup code</label><textarea id="imp" rows="4"></textarea><div class="actions"><button class="btn filled" data-act="importDo">Restore</button></div>`;
    else if (act === 'importDo') {
      try { const data = JSON.parse(decodeURIComponent(escape(atob($('#imp').value.trim())))); if (!data || typeof data.q !== 'object') throw new Error(); S = Object.assign(fresh(), data); save(); toast('Progress restored.'); render(); }
      catch (err) { toast('That code could not be read. Copy the whole code and try again.', 'close'); }
    }
    else if (act === 'resetAsk') { $('#backupArea').innerHTML = `<p class="note">${icon('signs')}<span>This deletes all progress, streaks, badges and mock results in this browser.</span></p><div class="actions"><button class="btn danger" data-act="resetDo">Delete everything</button></div>`; }
    else if (act === 'resetDo') { S = fresh(); S.epochAt = Date.now(); saveLocal(); syncNow({ overwrite: true }); session = null; go('today'); toast('Progress deleted.'); }
    else if (act === 'syncOn') { cloudAction(() => linkDevice(newCode(), { fresh: true }), 'Sync is on. Copy the link to your phone.'); }
    else if (act === 'syncNow') { cloudAction(() => syncNow(), 'Synced.'); }
    else if (act === 'copyLink') { const u = linkUrl(); (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => toast('Link copied. Open it on your phone.'), () => { const b2 = $('.codebox'); if (b2) b2.insertAdjacentHTML('beforeend', `<input class="text" readonly value="${esc(u)}" onfocus="this.select()">`); }); }
    else if (act === 'unlinkAsk') { b.dataset.act = 'unlinkDo'; b.textContent = 'Tap again to unlink'; b.classList.add('danger'); }
    else if (act === 'unlinkDo') { unlink(); render(); toast('This device is unlinked. Its progress stays here.'); }
    else if (act === 'pushOn') { cloudAction(enableReminders, 'Daily reminder is on.'); }
    else if (act === 'pushOff') { cloudAction(disableReminders, 'Reminder turned off on this device.'); }
    else if (act === 'pushTest') { cloudAction(async () => { const r = await api('push', { method: 'POST', body: JSON.stringify({ action: 'test', id: syncId }) }); if (!r.sent) throw new Error('No device received it. Turn the reminder off and on again.'); }, 'Test sent. It should arrive in a few seconds.'); }
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
      if (!topics.length) { $('#practiceMsg').textContent = 'Pick at least one topic.'; return; }
      startSession({ mode: 'practice', title: topics.length === 1 ? `${TOPIC[topics[0]].short} practice` : 'Custom practice', items: pickPractice(topics, n) });
    } else if (e.target.id === 'settingsForm') {
      S.start = $('#setStart').value || S.start; S.testDate = $('#setTest').value || null; S.setAt = Date.now(); save(); toast('Dates saved.'); render();
    } else if (e.target.id === 'linkForm') {
      const code = cleanCode($('#linkCode').value);
      if (code.length !== 20) { toast('A sync code has 20 letters and digits.', 'close'); return; }
      cloudAction(() => linkDevice(code), 'Linked. Progress is now shared.');
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
