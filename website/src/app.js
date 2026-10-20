/* Körkort 30 — app logic. Plain JS, no build step, works from file:// and as a hosted page. */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TOPIC = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  const LETTERS = ['A', 'B', 'C', 'D'];
  const DAY_MS = 86400000;

  // ------------------------------------------------------------- storage
  const KEY = 'korkort30.v1';
  const fresh = () => ({ start: null, testDate: null, q: {}, lessons: {}, done: {}, mocks: [], log: [] });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* storage blocked: run in memory */ }
  let storageOk = true;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; } catch (e) { storageOk = false; }
  }

  // ------------------------------------------------------------- dates
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmt = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  function planDay() {
    if (!S.start) return 1;
    const n = Math.floor((today() - parse(S.start)) / DAY_MS) + 1;
    return Math.max(1, Math.min(30, n));
  }
  const dateOfDay = (n) => new Date(parse(S.start || iso(today())).getTime() + (n - 1) * DAY_MS);

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
      explain: `This is the sign "${Signs.name(name)}". ${group.replace(/s$/, '')}s ${groupHint(group)}`,
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
  const BY_ID = Object.fromEntries(ALL.map((q) => [q.id, q]));
  const REAL = QB; // written questions (used for practice + mocks)

  // ------------------------------------------------------------- stats
  const qs = (id) => S.q[id] || (S.q[id] = { seen: 0, right: 0, wrong: 0, box: 0, last: 0, miss: false });
  function record(id, ok) {
    const s = qs(id);
    s.seen++; s.last = Date.now();
    if (ok) { s.right++; s.box = Math.min(5, s.box + 1); if (s.box >= 2) s.miss = false; }
    else { s.wrong++; s.box = 0; s.miss = true; }
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

  // ------------------------------------------------------ picking questions
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function priority(q) {
    const s = S.q[q.id];
    if (!s || !s.seen) return 0 + Math.random() * 0.5;            // unseen first
    if (s.miss) return 0.2 + Math.random() * 0.5;                  // then mistakes
    return 1 + s.box + (Date.now() - s.last < DAY_MS ? 2 : 0) + Math.random(); // then least known
  }
  function resolveTopics(topics) {
    if (!topics || topics.includes('all')) return TOPICS.map((t) => t.id);
    return topics.flatMap((t) => (t === 'weak' ? weakTopics(2) : [t]));
  }
  function pickPractice(topics, n) {
    const ids = resolveTopics(topics);
    let pool = REAL.filter((q) => ids.includes(q.topic));
    if (ids.length === 1 && ids[0] === 'signs') pool = pool.concat(SIGN_Q);
    if (!pool.length) pool = SIGN_Q.filter((q) => ids.includes(q.topic));
    // spread across topics: round-robin from each topic's best candidates
    const byTopic = {};
    for (const q of pool.slice().sort((a, b) => priority(a) - priority(b))) (byTopic[q.topic] = byTopic[q.topic] || []).push(q);
    const out = []; const keys = shuffle(Object.keys(byTopic));
    while (out.length < Math.min(n, pool.length)) for (const k of keys) { if (byTopic[k].length && out.length < n) out.push(byTopic[k].shift()); }
    return shuffle(out);
  }
  function pickMock() {
    const out = [];
    for (const [topic, k] of Object.entries(MOCK_MIX)) {
      const pool = REAL.filter((q) => q.topic === topic).sort((a, b) => ((S.q[a.id] || {}).last || 0) - ((S.q[b.id] || {}).last || 0) + (Math.random() - 0.5) * 1e5);
      out.push(...pool.slice(0, k));
    }
    // top up from anything (signs drill included) if a topic is short
    const rest = shuffle(ALL.filter((q) => !out.includes(q)));
    while (out.length < MOCK.questions && rest.length) out.push(rest.shift());
    return shuffle(out);
  }
  function pickSigns(n) {
    const sorted = SIGN_Q.slice().sort((a, b) => priority(a) - priority(b));
    return shuffle(n ? sorted.slice(0, n) : sorted);
  }

  // ------------------------------------------------------------- session
  let session = null;
  let timer = null;
  function startSession(opts) {
    const items = opts.items.map((q) => ({ q, order: shuffle(q.options.map((_, i) => i)), pick: null }));
    session = { mode: opts.mode, title: opts.title, items, i: 0, taskKey: opts.taskKey || null, started: Date.now(), revealed: false, finished: false,
      deadline: opts.mode === 'mock' ? Date.now() + MOCK.minutes * 60000 : null, topics: opts.topics || null };
    go('quiz');
  }
  function startTask(dayN, idx) {
    const day = PLAN[dayN - 1]; const t = day.tasks[idx]; const key = `${dayN}-${idx}`;
    if (t.type === 'lesson') { const topic = t.topic === 'weak' ? weakTopics(1)[0] : t.topic; pendingTask = { key, topic }; go(`lesson-${topic}`); return; }
    if (t.type === 'facts') { pendingTask = { key, facts: true }; go('facts'); return; }
    if (t.type === 'todo') { S.done[key] = !S.done[key]; save(); render(); return; }
    if (t.type === 'practice') {
      const topics = resolveTopics(t.topics);
      startSession({ mode: 'practice', title: t.label || `${topics.map((x) => TOPIC[x].short).join(' + ')} practice`, items: pickPractice(t.topics, t.n), taskKey: key, topics });
    }
    if (t.type === 'signs') startSession({ mode: 'practice', title: t.n ? `Sign drill (${t.n})` : 'Every sign', items: pickSigns(t.n), taskKey: key, topics: ['signs'] });
    if (t.type === 'review') {
      const list = mistakes();
      if (!list.length) { S.done[key] = true; save(); toast('No mistakes to review. Task ticked off.'); render(); return; }
      startSession({ mode: 'practice', title: 'Mistakes review', items: shuffle(list).slice(0, 40), taskKey: key });
    }
    if (t.type === 'mock') startSession({ mode: 'mock', title: `Mock exam`, items: pickMock(), taskKey: key });
  }
  let pendingTask = null;

  function answer(optIndex) {
    const it = session.items[session.i];
    if (session.mode === 'mock') { it.pick = optIndex; render(); return; }
    if (session.revealed) return;
    it.pick = optIndex; session.revealed = true;
    record(it.q.id, optIndex === it.q.answer); save();
    render();
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
      for (const it of session.items) if (it.pick !== null) record(it.q.id, it.pick === it.q.answer); else record(it.q.id, false);
      const byTopic = {};
      for (const it of session.items) { const b = byTopic[it.q.topic] || (byTopic[it.q.topic] = [0, 0]); b[1]++; if (it.pick === it.q.answer) b[0]++; }
      const scaled = Math.round((right / total) * MOCK.questions);
      S.mocks.push({ date: Date.now(), score: right, total, passed: scaled >= MOCK.pass, byTopic, secs: Math.round((Date.now() - session.started) / 1000) });
    }
    S.log.push({ date: Date.now(), mode: session.mode, title: session.title, right, total });
    if (session.taskKey) S.done[session.taskKey] = true;
    save();
    session.result = { right, total };
    render();
  }

  // ------------------------------------------------------------- routing
  let route = (location.hash || '#today').slice(1);
  function go(r) { route = r; if (location.hash.slice(1) !== r) history.replaceState(null, '', '#' + r); render(); window.scrollTo({ top: 0 }); }
  window.addEventListener('hashchange', () => { route = location.hash.slice(1) || 'today'; render(); });

  const NAV = [
    ['today', 'Today'], ['plan', '30-day plan'], ['lessons', 'Lessons'], ['practice', 'Practice'],
    ['mock', 'Mock exam'], ['mistakes', 'Mistakes'], ['signs', 'Signs'], ['progress', 'Progress'],
  ];

  function render() {
    if (route !== 'quiz') clearInterval(timer);
    const nav = $('#nav');
    const active = route.startsWith('lesson-') || route === 'facts' ? 'lessons' : route.startsWith('day-') ? 'plan' : route === 'quiz' ? (session && session.mode === 'mock' ? 'mock' : 'practice') : route;
    nav.innerHTML = NAV.map(([id, label]) => `<a href="#${id}" class="${active === id ? 'on' : ''}" ${active === id ? 'aria-current="page"' : ''}>${label}${id === 'mistakes' && mistakes().length ? ` <span class="pill">${mistakes().length}</span>` : ''}</a>`).join('');
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
    if (route === 'quiz' && session && session.mode === 'mock' && !session.finished) tickTimer();
    const h = main.querySelector('h1'); if (h && document.activeElement === document.body) h.setAttribute('tabindex', '-1');
  }

  // ------------------------------------------------------------- views
  function viewWelcome() {
    const t = iso(today());
    const suggested = iso(new Date(today().getTime() + 30 * DAY_MS));
    return `
      <section class="hero">
        <p class="eyebrow">Swedish B-licence theory test</p>
        <h1>Pass the theory test in 30 days.</h1>
        <p class="lede">One plan, about an hour a day. Lessons with pictures, ${REAL.length + SIGN_Q.length} practice questions built like the real test, and timed mock exams of ${MOCK.questions} questions in ${MOCK.minutes} minutes.</p>
        <form class="start card" id="startForm">
          <div class="field"><label for="startDate">Day 1 of your plan</label><input type="date" id="startDate" value="${t}" required></div>
          <div class="field"><label for="testDate">Your test date <span class="muted">(optional)</span></label><input type="date" id="testDate" value="${suggested}"></div>
          <button class="btn primary" type="submit">Start the plan</button>
        </form>
        <ul class="facts-strip">
          <li><b>${MOCK.questions}</b><span>scored questions</span></li>
          <li><b>${MOCK.pass}</b><span>correct to pass</span></li>
          <li><b>${MOCK.minutes}</b><span>minutes</span></li>
          <li><b>30</b><span>days of plan</span></li>
        </ul>
      </section>`;
  }

  function roadProgress(n) {
    const at = (d) => `left:calc(22px + (100% - 160px) * ${((d - 1) / 29).toFixed(4)})`;
    const posts = [1, 7, 14, 21].map((d) => `<span class="post" style="${at(d)}"><i>Day ${d}</i></span>`).join('');
    return `<div class="road" role="img" aria-label="Day ${n} of 30">
      <div class="lane"></div>${posts}
      <span class="car" style="${at(n)}"><svg viewBox="-14 -24 28 48" width="22" height="36" aria-hidden="true">${carSvg()}</svg></span>
      <span class="finish">DAY 30 · TEST</span></div>`;
  }
  const carSvg = () => `<g transform="rotate(90)"><rect x="-12" y="-21" width="24" height="42" rx="7" fill="var(--blue)"/><path d="M-9 -11 Q0 -15 9 -11 L8 -4 L-8 -4 Z" fill="#0b1220" opacity=".8"/><path d="M-8 10 L8 10 L9 15 Q0 18 -9 15 Z" fill="#0b1220" opacity=".6"/></g>`;

  function taskLabel(t, dayN) {
    switch (t.type) {
      case 'lesson': return t.topic === 'weak' ? `Reread the lesson on your weakest topic${dayN && planDay() >= dayN ? ` (${TOPIC[weakTopics(1)[0]].name})` : ''}` : `Lesson: ${TOPIC[t.topic].name}`;
      case 'practice': {
        const names = t.topics.includes('all') ? 'all topics' : t.topics.includes('weak') ? 'your weakest topics' : t.topics.map((x) => TOPIC[x].short).join(', ');
        return `${t.label || 'Practice'}: ${t.n} questions, ${names}`;
      }
      case 'signs': return t.n ? `Sign drill: ${t.n} signs` : `Sign drill: every sign (${SIGN_Q.length})`;
      case 'review': return 'Review your mistakes';
      case 'mock': return `Mock exam: ${MOCK.questions} questions, ${MOCK.minutes} min`;
      case 'facts': return 'Read the key-facts sheet';
      case 'todo': return t.text;
      default: return '';
    }
  }
  const taskMins = (t) => ({ lesson: 20, practice: Math.round(t.n * 0.75), signs: t.n ? Math.ceil(t.n / 3) : 15, review: 10, mock: MOCK.minutes + 10, facts: 15, todo: 5 }[t.type] || 10);
  const KIND = { lesson: 'Read', practice: 'Quiz', signs: 'Signs', review: 'Review', mock: 'Mock', facts: 'Read', todo: 'To do' };

  function taskList(dayN) {
    const day = PLAN[dayN - 1];
    return `<ol class="tasks">${day.tasks.map((t, i) => {
      const key = `${dayN}-${i}`; const done = !!S.done[key];
      const action = t.type === 'todo' ? (done ? 'Undo' : 'Mark done') : done ? 'Do again' : 'Start';
      return `<li class="task ${done ? 'done' : ''}">
        <button class="check" data-act="toggle" data-key="${key}" aria-pressed="${done}" aria-label="${done ? 'Mark not done' : 'Mark done'}">${done ? '✓' : ''}</button>
        <div class="tbody"><span class="kind k-${t.type}">${KIND[t.type]}</span><span class="tlabel">${esc(taskLabel(t, dayN))}</span><span class="mins">~${taskMins(t)} min</span></div>
        <button class="btn ${done ? 'ghost' : 'primary'} small" data-act="task" data-day="${dayN}" data-i="${i}">${action}</button>
      </li>`;
    }).join('')}</ol>`;
  }
  const dayDone = (n) => PLAN[n - 1].tasks.every((_, i) => S.done[`${n}-${i}`]);
  const dayProgress = (n) => PLAN[n - 1].tasks.filter((_, i) => S.done[`${n}-${i}`]).length / PLAN[n - 1].tasks.length;

  function viewToday() {
    const n = planDay(); const day = PLAN[n - 1];
    const r = readiness();
    const last = S.mocks[S.mocks.length - 1];
    const behind = PLAN.slice(0, n - 1).filter((d) => !dayDone(d.day)).map((d) => d.day);
    const testIn = S.testDate ? Math.round((parse(S.testDate) - today()) / DAY_MS) : null;
    const weak = weakTopics(3);
    return `
      <header class="pagehead">
        <p class="eyebrow">${fmt(today())}${testIn !== null ? ` · ${testIn > 0 ? `test in ${testIn} day${testIn === 1 ? '' : 's'}` : testIn === 0 ? 'test day' : 'test date passed'}` : ''}</p>
        <h1>Day ${n}: ${esc(day.title)}</h1>
        <p class="lede">${esc(day.focus)}</p>
      </header>
      ${roadProgress(n)}
      <div class="grid-2">
        <section class="card">
          <div class="cardhead"><h2>Today's tasks</h2><span class="muted">Goal: ${esc(day.goal)}</span></div>
          ${taskList(n)}
          ${behind.length ? `<p class="note warn">Unfinished earlier days: ${behind.map((d) => `<a href="#day-${d}">day ${d}</a>`).join(', ')}. Catch up before moving on; the plan builds on itself.</p>` : ''}
        </section>
        <aside class="stack">
          <section class="card">
            <h2>Test readiness</h2>
            <div class="gauge"><b>${r.pct}%</b><span>${r.basis === 'mocks' ? 'based on your last mocks and topic mastery' : 'based on topic mastery. Take a mock on day 14 for a real reading.'}</span></div>
            <div class="bar"><i style="width:${r.pct}%"></i><em style="left:${(MOCK.pass / MOCK.questions) * 100}%" title="Pass mark"></em></div>
            <p class="muted small">The marker is the pass mark (${MOCK.pass}/${MOCK.questions}). Aim to sit well past it: 90%+.</p>
          </section>
          <section class="card">
            <h2>Last mock</h2>
            ${last ? `<p class="score ${last.passed ? 'ok' : 'bad'}"><b>${last.score}/${last.total}</b> ${last.passed ? 'Pass' : 'Not yet a pass'}</p><p class="muted small">${new Date(last.date).toLocaleDateString('en-GB')}</p>` : `<p class="muted">No mock taken yet. Your first is on day 14.</p>`}
          </section>
          <section class="card">
            <h2>Weakest topics</h2>
            <ul class="weak">${weak.map((id) => { const st = topicStats(id); return `<li><a href="#lesson-${id}">${esc(TOPIC[id].name)}</a><span>${st.acc === null ? 'not started' : Math.round(st.acc * 100) + '%'}</span></li>`; }).join('')}</ul>
            <button class="btn ghost small" data-act="quick" data-topics="weak" data-n="20">Practise these (20)</button>
          </section>
        </aside>
      </div>`;
  }

  function viewPlan() {
    const n = planDay();
    const weeks = [1, 2, 3, 4].map((w) => {
      const days = PLAN.filter((d) => d.week === w);
      const name = { 1: 'Foundations', 2: 'All the rules', 3: 'First mocks and weak spots', 4: 'Exam mode' }[w];
      return `<section class="week"><h2><span>Week ${w}</span> ${name}</h2><div class="days">${days.map((d) => {
        const p = dayProgress(d.day); const state = p === 1 ? 'done' : d.day === n ? 'now' : d.day < n ? 'late' : '';
        return `<a class="day ${state}" href="#day-${d.day}">
          <span class="dnum">${d.day}</span><span class="ddate">${S.start ? fmt(dateOfDay(d.day)) : ''}</span>
          <span class="dtitle">${esc(d.title)}</span>
          <span class="dbar"><i style="width:${p * 100}%"></i></span>
          ${d.tasks.some((t) => t.type === 'mock') ? '<span class="tag">Mock</span>' : ''}
        </a>`;
      }).join('')}</div></section>`;
    }).join('');
    return `<header class="pagehead"><p class="eyebrow">30 days · about an hour a day</p><h1>Your plan</h1>
      <p class="lede">Weeks 1–3 teach every topic once and drill the picture questions. From day 14 you sit a full mock every two or three days and spend the days between on your weakest topics. You are ready when you score 60/65 or more on two mocks in a row.</p></header>${weeks}`;
  }

  function viewDay(n) {
    if (!(n >= 1 && n <= 30)) return viewPlan();
    const d = PLAN[n - 1];
    return `<header class="pagehead"><p class="eyebrow"><a href="#plan">30-day plan</a> · Day ${n}${S.start ? ` · ${fmt(dateOfDay(n))}` : ''}</p><h1>${esc(d.title)}</h1><p class="lede">${esc(d.focus)}</p></header>
      <section class="card"><div class="cardhead"><h2>Tasks</h2><span class="muted">Goal: ${esc(d.goal)}</span></div>${taskList(n)}</section>
      <nav class="pager">${n > 1 ? `<a class="btn ghost" href="#day-${n - 1}">← Day ${n - 1}</a>` : '<span></span>'}${n < 30 ? `<a class="btn ghost" href="#day-${n + 1}">Day ${n + 1} →</a>` : ''}</nav>`;
  }

  function viewLessons() {
    return `<header class="pagehead"><p class="eyebrow">12 topics</p><h1>Lessons</h1><p class="lede">Each lesson covers one topic with pictures and ends with the key facts. Read it, then practise that topic straight away.</p>
      <p><a class="btn ghost" href="#facts">Key-facts sheet: every topic on one page</a></p></header>
      <div class="topics">${TOPICS.map((t, i) => {
        const l = LESSONS[t.id]; const st = topicStats(t.id); const read = S.lessons[t.id];
        return `<a class="topic" href="#lesson-${t.id}"><span class="tnum">${String(i + 1).padStart(2, '0')}</span>
          <span class="tname">${esc(t.name)}</span>
          <span class="tmeta">${l ? `${l.minutes || 15} min read` : 'Lesson coming'} · ${st.total} questions${read ? ' · <b class="okc">read</b>' : ''}</span>
          <span class="dbar"><i style="width:${st.mastery * 100}%"></i></span></a>`;
      }).join('')}</div>`;
  }

  function viewLesson(id) {
    const t = TOPIC[id]; const l = LESSONS[id];
    if (!t) return viewLessons();
    if (!l) return `<header class="pagehead"><h1>${esc(t.name)}</h1></header><p>This lesson is not available.</p>`;
    const idx = TOPICS.indexOf(t);
    return `<article class="lesson">
      <header class="pagehead"><p class="eyebrow"><a href="#lessons">Lessons</a> · Topic ${idx + 1} of 12 · ${l.minutes || 15} min</p><h1>${esc(l.title)}</h1>${l.intro ? `<p class="lede">${esc(l.intro)}</p>` : ''}</header>
      ${l.sections.map((s) => `<section class="lsec"><h2>${esc(s.h)}</h2><div class="prose">${s.body}</div>
        ${(s.pics || []).length ? `<div class="pics">${s.pics.map((p) => `<figure class="pic">${Scene.render(p)}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}</section>`).join('')}
      <section class="card keyfacts"><h2>Key facts</h2><ul>${l.keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>
      <div class="actions">
        <button class="btn primary" data-act="lessonDone" data-topic="${id}">${S.lessons[id] ? 'Read ✓ · Practise this topic' : 'Mark as read and practise'}</button>
        ${TOPICS[idx + 1] ? `<a class="btn ghost" href="#lesson-${TOPICS[idx + 1].id}">Next lesson: ${esc(TOPICS[idx + 1].short)} →</a>` : ''}
      </div></article>`;
  }

  function viewFacts() {
    return `<header class="pagehead"><p class="eyebrow"><a href="#lessons">Lessons</a></p><h1>Key-facts sheet</h1><p class="lede">The rules and numbers from every lesson on one page. Read it on days 21, 24 and 30.</p></header>
      <div class="factsgrid">${TOPICS.filter((t) => LESSONS[t.id]).map((t) => `<section class="card"><h2><a href="#lesson-${t.id}">${esc(t.name)}</a></h2><ul>${LESSONS[t.id].keyFacts.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>`).join('')}</div>
      ${pendingTask && pendingTask.facts ? `<div class="actions"><button class="btn primary" data-act="factsDone">Done reading</button></div>` : ''}`;
  }

  function viewPractice() {
    return `<header class="pagehead"><p class="eyebrow">Free practice</p><h1>Practice</h1><p class="lede">Pick topics and a length. You see the answer and the explanation after every question. Unseen questions and past mistakes come up first.</p></header>
      <form class="card" id="practiceForm">
        <fieldset><legend>Topics</legend><div class="chips">
          ${TOPICS.map((t) => { const st = topicStats(t.id); return `<label class="chip"><input type="checkbox" name="topic" value="${t.id}"><span>${esc(t.name)} <em>${st.total}</em></span></label>`; }).join('')}
        </div></fieldset>
        <fieldset><legend>Length</legend><div class="chips">${[10, 20, 30, 50].map((n, i) => `<label class="chip"><input type="radio" name="n" value="${n}" ${i === 1 ? 'checked' : ''}><span>${n} questions</span></label>`).join('')}</div></fieldset>
        <div class="actions"><button class="btn primary" type="submit">Start practice</button>
          <button class="btn ghost" type="button" data-act="quick" data-topics="all" data-n="20">20 mixed questions</button>
          <button class="btn ghost" type="button" data-act="quick" data-topics="weak" data-n="20">20 from my weakest topics</button></div>
        <p class="muted small" id="practiceMsg" role="status"></p>
      </form>`;
  }

  function viewMockIntro() {
    const passes = S.mocks.filter((m) => m.passed).length;
    return `<header class="pagehead"><p class="eyebrow">Exam conditions</p><h1>Mock exam</h1>
      <p class="lede">${MOCK.questions} questions in ${MOCK.minutes} minutes, spread across topics the way the real test is. No answers are shown until you hand in. You need ${MOCK.pass} correct to pass.</p></header>
      <div class="grid-2"><section class="card">
        <h2>Before you start</h2>
        <ul class="prose"><li>Sit somewhere quiet and put your phone away.</li><li>You can skip and come back: use the question map.</li><li>Read every option before you choose. Many wrong answers are almost right.</li><li>The real test has 70 questions; 5 of them are unscored trial questions, so the scored part matches this mock.</li></ul>
        <div class="actions"><button class="btn primary" data-act="mock">Start mock exam</button></div>
      </section>
      <section class="card"><h2>Your mocks</h2>${S.mocks.length ? `<p class="muted">${S.mocks.length} taken, ${passes} passed.</p>${mockTable()}` : '<p class="muted">None yet.</p>'}</section></div>`;
  }
  function mockTable() {
    return `<div class="tablewrap"><table class="tbl"><thead><tr><th>Date</th><th>Score</th><th>Time</th><th>Result</th></tr></thead><tbody>${S.mocks.slice().reverse().map((m) =>
      `<tr><td>${new Date(m.date).toLocaleDateString('en-GB')}</td><td class="num">${m.score}/${m.total}</td><td class="num">${Math.floor(m.secs / 60)}:${String(m.secs % 60).padStart(2, '0')}</td><td><span class="badge ${m.passed ? 'ok' : 'bad'}">${m.passed ? 'Pass' : 'Fail'}</span></td></tr>`).join('')}</tbody></table></div>`;
  }

  function viewMistakes() {
    const list = mistakes();
    return `<header class="pagehead"><p class="eyebrow">Learn from every wrong answer</p><h1>Mistakes</h1>
      <p class="lede">Every question you get wrong lands here. It leaves the list after you answer it correctly twice in a row.</p></header>
      ${list.length ? `<div class="actions"><button class="btn primary" data-act="review">Review ${Math.min(40, list.length)} mistakes now</button></div>
      <div class="mlist">${list.map((q) => `<details class="card mitem"><summary><span class="kind">${esc(TOPIC[q.topic].short)}</span> ${esc(q.q)}</summary>
        ${q.img ? `<div class="pic">${Scene.render(q.img)}</div>` : ''}<p><b class="okc">Correct:</b> ${esc(q.options[q.answer])}</p><p class="prose">${esc(q.explain)}</p></details>`).join('')}</div>`
      : `<section class="card empty"><h2>No mistakes on the list</h2><p class="muted">Keep practising. Anything you get wrong will show up here.</p><a class="btn ghost" href="#practice">Practise</a></section>`}`;
  }

  function viewSigns() {
    const groups = {};
    for (const n of Signs.list()) (groups[Signs.group(n)] = groups[Signs.group(n)] || []).push(n);
    const order = ['Warning signs', 'Priority signs', 'Prohibition signs', 'Mandatory signs', 'Information signs'];
    return `<header class="pagehead"><p class="eyebrow">${Signs.list().length} Swedish signs</p><h1>Signs</h1>
      <p class="lede">Swedish signs have a yellow face where most of Europe uses white. Click a sign to reveal its name, or test yourself with a drill.</p>
      <div class="actions"><button class="btn primary" data-act="signdrill" data-n="20">Sign drill: 20 signs</button><button class="btn ghost" data-act="signdrill" data-n="0">Every sign</button><button class="btn ghost" data-act="revealAll">Show all names</button></div></header>
      ${order.filter((g) => groups[g]).map((g) => `<section class="signgroup"><h2>${g}</h2><p class="muted">${esc(groupHint(g).replace(/^are /, 'They are ').replace(/^tell/, 'They tell'))}</p><div class="signs">${groups[g].map((n) =>
        `<button class="signcard" data-act="flip" aria-expanded="false">${Signs.svg(n, 88)}<span class="sname">${esc(Signs.name(n))}</span></button>`).join('')}</div></section>`).join('')}`;
  }

  function viewProgress() {
    const totalSeen = Object.values(S.q).filter((s) => s.seen).length;
    const answered = Object.values(S.q).reduce((a, s) => a + s.seen, 0);
    const right = Object.values(S.q).reduce((a, s) => a + s.right, 0);
    const daysDone = PLAN.filter((d) => dayDone(d.day)).length;
    return `<header class="pagehead"><p class="eyebrow">Your numbers</p><h1>Progress</h1></header>
      <ul class="stats">
        <li><b>${daysDone}/30</b><span>plan days complete</span></li>
        <li><b>${totalSeen}/${ALL.length}</b><span>questions seen</span></li>
        <li><b>${answered ? Math.round((right / answered) * 100) : 0}%</b><span>of ${answered} answers correct</span></li>
        <li><b>${S.mocks.length}</b><span>mock exams</span></li>
      </ul>
      <section class="card"><h2>By topic</h2><div class="tablewrap"><table class="tbl"><thead><tr><th>Topic</th><th>Seen</th><th>Accuracy</th><th>Mastered</th></tr></thead><tbody>
        ${TOPICS.map((t) => { const st = topicStats(t.id); return `<tr><td><a href="#lesson-${t.id}">${esc(t.name)}</a></td><td class="num">${st.seen}/${st.total}</td><td class="num">${st.acc === null ? '–' : Math.round(st.acc * 100) + '%'}</td><td><span class="dbar wide"><i style="width:${st.mastery * 100}%"></i></span></td></tr>`; }).join('')}
      </tbody></table></div><p class="muted small">A question counts as mastered after two correct answers in a row.</p></section>
      ${S.mocks.length ? `<section class="card"><h2>Mock exams</h2>${mockChart()}${mockTable()}</section>` : ''}
      <section class="card"><h2>Settings</h2>
        <form id="settingsForm" class="row">
          <div class="field"><label for="setStart">Day 1 of the plan</label><input type="date" id="setStart" value="${S.start || iso(today())}"></div>
          <div class="field"><label for="setTest">Test date</label><input type="date" id="setTest" value="${S.testDate || ''}"></div>
          <button class="btn primary" type="submit">Save dates</button>
        </form>
        <p class="muted small">${storageOk ? 'Progress is saved in this browser on this computer. Use the backup below to move it or keep it safe.' : 'This browser is blocking storage, so progress will be lost when you close the page. Use the backup below.'}</p>
        <h3>Backup</h3>
        <div class="actions"><button class="btn ghost" data-act="export">Copy backup code</button><button class="btn ghost" data-act="importOpen">Restore from code</button><button class="btn danger" data-act="resetAsk">Reset everything</button></div>
        <div id="backupArea"></div>
      </section>`;
  }
  function mockChart() {
    const m = S.mocks.slice(-12); const W = 560, H = 180, P = 28;
    const x = (i) => P + (m.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (m.length - 1));
    const y = (v) => H - P - v * (H - 2 * P);
    const passY = y(MOCK.pass / MOCK.questions);
    const line = m.map((r, i) => `${i ? 'L' : 'M'}${x(i)} ${y(r.score / r.total)}`).join(' ');
    return `<div class="tablewrap"><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mock exam scores">
      ${[0, 0.5, 1].map((v) => `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${P - 6}" y="${y(v) + 4}" text-anchor="end" class="axis">${Math.round(v * MOCK.questions)}</text>`).join('')}
      <line x1="${P}" x2="${W - P}" y1="${passY}" y2="${passY}" class="pass"/><text x="${W - P}" y="${passY - 6}" text-anchor="end" class="axis">pass ${MOCK.pass}</text>
      <path d="${line}" class="line"/>${m.map((r, i) => `<circle cx="${x(i)}" cy="${y(r.score / r.total)}" r="${i === m.length - 1 ? 5 : 3.5}" class="${r.passed ? 'dot ok' : 'dot bad'}"/>`).join('')}
    </svg></div>`;
  }

  // ------------------------------------------------------------- quiz view
  function viewQuiz() {
    const s = session;
    if (s.finished) return viewResult();
    const it = s.items[s.i]; const q = it.q; const mock = s.mode === 'mock';
    const answered = s.items.filter((x) => x.pick !== null).length;
    const opts = it.order.map((oi, k) => {
      let cls = '';
      if (!mock && s.revealed) { if (oi === q.answer) cls = 'right'; else if (oi === it.pick) cls = 'wrong'; else cls = 'dim'; }
      if (mock && it.pick === oi) cls = 'picked';
      return `<button class="opt ${cls}" data-act="answer" data-o="${oi}" ${!mock && s.revealed ? 'disabled' : ''}><span class="letter">${LETTERS[k]}</span><span>${esc(q.options[oi])}</span></button>`;
    }).join('');
    const ok = it.pick === q.answer;
    return `<div class="quiz">
      <div class="qbar">
        <div><p class="eyebrow">${esc(s.title)} · ${esc(TOPIC[q.topic].short)}</p><p class="qcount">Question <b>${s.i + 1}</b> of ${s.items.length}</p></div>
        ${mock ? `<div class="timer" id="timer" aria-live="off"></div>` : `<div class="qscore">${s.items.filter((x) => x.pick !== null && x.pick === x.q.answer).length} right</div>`}
        <button class="btn ghost small" data-act="quit">${mock ? 'Hand in' : 'End'}</button>
      </div>
      <div class="qprog"><i style="width:${((mock ? answered : s.i + (s.revealed ? 1 : 0)) / s.items.length) * 100}%"></i></div>
      <div class="qgrid ${q.img ? '' : 'noimg'}">
        ${q.img ? `<figure class="pic qpic">${Scene.render(q.img)}</figure>` : ''}
        <div class="qside">
          <h1 class="qtext">${esc(q.q)}</h1>
          <div class="opts" role="group" aria-label="Answers">${opts}</div>
          ${!mock && s.revealed ? `<div class="feedback ${ok ? 'ok' : 'bad'}" role="status"><b>${ok ? 'Correct.' : 'Not quite.'}</b> ${esc(q.explain)}</div>` : ''}
          <div class="qnav">
            ${mock ? `<button class="btn ghost" data-act="prev" ${s.i === 0 ? 'disabled' : ''}>← Back</button>` : ''}
            <button class="btn primary" data-act="next" ${!mock && !s.revealed ? 'disabled' : ''}>${s.i === s.items.length - 1 ? (mock ? 'Hand in' : 'Finish') : mock && it.pick === null ? 'Skip' : 'Next'} →</button>
          </div>
          <p class="muted small keys">Keys: 1–4 or A–D to answer, Enter for next.</p>
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
    return `<header class="pagehead"><p class="eyebrow">${esc(s.title)} · finished</p>
      <h1>${right} of ${total} correct${mock ? (passed ? ': pass' : ': not a pass yet') : ''}</h1>
      <p class="lede">${mock ? (passed ? (pct >= 92 ? 'That is test-ready form. Keep it there.' : `A pass, but aim for 60/${MOCK.questions} or better so a bad day still passes.`) : `You need ${MOCK.pass}. Go through every wrong answer below, then practise your weakest topics.`) : pct >= 90 ? 'Excellent. These questions are moving into your mastered pile.' : pct >= 75 ? 'Good. Go through the misses below; they are now on your mistakes list.' : 'Read the explanations below, then reread the lesson for this topic.'}</p></header>
      <div class="grid-2"><section class="card"><h2>By topic</h2><ul class="weak">${Object.entries(byTopic).map(([t, [r, n]]) => `<li><span>${esc(TOPIC[t].name)}</span><span class="num">${r}/${n}</span></li>`).join('')}</ul></section>
      <section class="card"><h2>Next</h2><div class="actions col">
        ${s.taskKey ? `<a class="btn primary" href="#today">Back to today's plan</a>` : ''}
        ${wrong.length ? `<button class="btn ${s.taskKey ? 'ghost' : 'primary'}" data-act="retryWrong">Retry the ${wrong.length} I got wrong</button>` : ''}
        <a class="btn ghost" href="#practice">More practice</a></div></section></div>
      ${wrong.length ? `<h2 class="sectionh">Wrong answers</h2><div class="mlist">${wrong.map((it) => `<article class="card mitem open">
        <p class="eyebrow">${esc(TOPIC[it.q.topic].short)}</p><h3>${esc(it.q.q)}</h3>${it.q.img ? `<div class="pic">${Scene.render(it.q.img)}</div>` : ''}
        ${it.pick !== null ? `<p><b class="badc">You answered:</b> ${esc(it.q.options[it.pick])}</p>` : '<p><b class="badc">Not answered</b></p>'}
        <p><b class="okc">Correct:</b> ${esc(it.q.options[it.q.answer])}</p><p class="prose">${esc(it.q.explain)}</p></article>`).join('')}</div>` : ''}`;
  }

  // ------------------------------------------------------------- events
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => { t.hidden = true; }, 3200);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'toggle') { S.done[b.dataset.key] = !S.done[b.dataset.key]; save(); render(); }
    else if (act === 'task') startTask(+b.dataset.day, +b.dataset.i);
    else if (act === 'answer') answer(+b.dataset.o);
    else if (act === 'next') next();
    else if (act === 'prev') { if (session.i > 0) { session.i--; render(); } }
    else if (act === 'jump') { session.i = +b.dataset.i; render(); }
    else if (act === 'quit') {
      if (session.mode === 'mock') {
        const left = session.items.filter((x) => x.pick === null).length;
        if (left && b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = `${left} unanswered. Hand in anyway?`; return; }
        finish();
      } else if (session.items.some((x) => x.pick !== null)) { session.items = session.items.filter((x) => x.pick !== null); finish(); }
      else { session = null; go('practice'); }
    }
    else if (act === 'quick') { const topics = b.dataset.topics.split(','); startSession({ mode: 'practice', title: topics[0] === 'weak' ? 'Weak-topic boost' : 'Mixed practice', items: pickPractice(topics, +b.dataset.n), topics }); }
    else if (act === 'mock') startSession({ mode: 'mock', title: 'Mock exam', items: pickMock(), taskKey: findTask('mock') });
    else if (act === 'review') startSession({ mode: 'practice', title: 'Mistakes review', items: shuffle(mistakes()).slice(0, 40), taskKey: findTask('review') });
    else if (act === 'signdrill') startSession({ mode: 'practice', title: +b.dataset.n ? 'Sign drill' : 'Every sign', items: pickSigns(+b.dataset.n), topics: ['signs'] });
    else if (act === 'retryWrong') { const w = session.items.filter((x) => x.pick !== x.q.answer).map((x) => x.q); startSession({ mode: 'practice', title: 'Retry wrong answers', items: w }); }
    else if (act === 'lessonDone') {
      const topic = b.dataset.topic; S.lessons[topic] = Date.now();
      if (pendingTask && pendingTask.topic === topic) { S.done[pendingTask.key] = true; pendingTask = null; }
      else { const k = findTask('lesson', topic); if (k) S.done[k] = true; }
      save(); startSession({ mode: 'practice', title: `${TOPIC[topic].short} practice`, items: pickPractice([topic], 10), topics: [topic] });
    }
    else if (act === 'factsDone') { if (pendingTask && pendingTask.facts) { S.done[pendingTask.key] = true; pendingTask = null; save(); } go('today'); }
    else if (act === 'flip') { const on = b.classList.toggle('on'); b.setAttribute('aria-expanded', on); }
    else if (act === 'revealAll') { document.querySelectorAll('.signcard').forEach((c) => { c.classList.add('on'); c.setAttribute('aria-expanded', 'true'); }); }
    else if (act === 'export') {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
      $('#backupArea').innerHTML = `<label for="bk" class="muted small">Your backup code. Keep it somewhere safe.</label><textarea id="bk" rows="4" readonly>${code}</textarea>`;
      const ta = $('#bk'); ta.select();
      (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => toast('Backup code copied.'), () => toast('Select the code and copy it.'));
    }
    else if (act === 'importOpen') $('#backupArea').innerHTML = `<label for="imp" class="muted small">Paste a backup code</label><textarea id="imp" rows="4"></textarea><div class="actions"><button class="btn primary" data-act="importDo">Restore</button></div>`;
    else if (act === 'importDo') {
      try { const data = JSON.parse(decodeURIComponent(escape(atob($('#imp').value.trim())))); if (!data || typeof data.q !== 'object') throw new Error(); S = Object.assign(fresh(), data); save(); toast('Progress restored.'); render(); }
      catch (err) { toast('That code could not be read. Copy the whole code and try again.'); }
    }
    else if (act === 'resetAsk') { $('#backupArea').innerHTML = `<p class="note warn">This deletes all progress, plan ticks and mock results on this computer.</p><div class="actions"><button class="btn danger" data-act="resetDo">Yes, delete everything</button></div>`; }
    else if (act === 'resetDo') { S = fresh(); save(); session = null; go('today'); toast('Progress deleted.'); }
  });
  function findTask(type, topic) {
    // tick the first unfinished task of this type on today's plan day, if there is one
    const n = planDay(); const d = PLAN[n - 1];
    const i = d.tasks.findIndex((t, k) => t.type === type && (!topic || t.topic === topic) && !S.done[`${n}-${k}`]);
    return i >= 0 ? `${n}-${i}` : null;
  }
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.id === 'startForm') {
      S.start = $('#startDate').value || iso(today()); S.testDate = $('#testDate').value || null; save(); go('today');
    } else if (e.target.id === 'practiceForm') {
      const topics = [...e.target.querySelectorAll('input[name=topic]:checked')].map((x) => x.value);
      const n = +(e.target.querySelector('input[name=n]:checked') || {}).value || 20;
      if (!topics.length) { $('#practiceMsg').textContent = 'Pick at least one topic, or use one of the quick buttons.'; return; }
      startSession({ mode: 'practice', title: topics.length === 1 ? `${TOPIC[topics[0]].short} practice` : 'Custom practice', items: pickPractice(topics, n), topics });
    } else if (e.target.id === 'settingsForm') {
      S.start = $('#setStart').value || S.start; S.testDate = $('#setTest').value || null; save(); toast('Dates saved.'); render();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (route !== 'quiz' || !session || session.finished) return;
    if (e.target.matches('input, textarea')) return;
    const k = e.key.toUpperCase();
    const idx = ['1', '2', '3', '4'].indexOf(k) >= 0 ? ['1', '2', '3', '4'].indexOf(k) : LETTERS.indexOf(k);
    const it = session.items[session.i];
    if (idx >= 0 && idx < it.order.length) { e.preventDefault(); answer(it.order[idx]); }
    else if (e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' && session.mode === 'mock' && session.i > 0) { session.i--; render(); }
  });

  render();
})();
