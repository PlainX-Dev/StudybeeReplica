/*
 * Language support. English is the source text in topics.js, plan.js, questions/ and lessons/.
 * Swedish lives in sv/ as overlays keyed by the same ids, and replaces the English text in place
 * at start-up when the chosen language is Swedish. Switching language saves the choice and reloads.
 *
 *   SV.q({ 'turning-01': { q, options: [...same order...], explain } })
 *   SV.lessons.people = { title, intro, sections: [{ h, body }, ...same order...], keyFacts: [...] }
 *   SV.plan = { 1: { title, focus, goal, tasks: { 0: { text, label } } }, ... }
 *   SV.topics = { signs: { name, short } }
 *   SV.signs = { yield: 'Väjningsplikt', ... }
 *   SV.labels = { 'Give way': 'Väjningsplikt' }   word captions under lesson pictures, keyed by the English text
 *   UI strings: STRINGS in strings.js, read with T('key', { n: 3 }).
 */
(function () {
  const KEY = 'korkort30.lang';
  let lang = 'sv';
  try { const v = localStorage.getItem(KEY); if (v === 'en' || v === 'sv') lang = v; } catch {}
  window.LANG = lang;
  document.documentElement.lang = lang;

  const SV = window.SV = { qs: {}, lessons: {}, plan: {}, topics: {}, signs: {}, labels: {} };
  SV.q = (o) => Object.assign(SV.qs, o);

  window.STRINGS = window.STRINGS || {};
  /** UI text for the current language. `{name}` placeholders are filled from vars; a value may also be a function of vars. */
  window.T = (key, vars = {}) => {
    const e = window.STRINGS[key];
    if (!e) return key;
    let s = e[lang] ?? e.en;
    if (typeof s === 'function') return s(vars);
    return String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  };

  window.I18N = {
    lang,
    locale: lang === 'sv' ? 'sv-SE' : 'en-GB',
    you: lang === 'sv' ? 'DU' : 'YOU',
    set(next) {
      if (next === lang) return;
      try { localStorage.setItem(KEY, next); } catch {}
      location.reload();
    },
    /** Swap the English content for Swedish. Runs once, after every content file has loaded. */
    apply() {
      if (lang !== 'sv') return;
      for (const t of window.TOPICS || []) Object.assign(t, SV.topics[t.id] || {});
      for (const q of window.QB || []) {
        const s = SV.qs[q.id];
        if (!s) continue;
        if (s.q) q.q = s.q;
        if (s.explain) q.explain = s.explain;
        if (Array.isArray(s.options) && s.options.length === q.options.length) q.options = s.options.slice();
      }
      for (const [id, l] of Object.entries(window.LESSONS || {})) {
        const s = SV.lessons[id];
        if (!s) continue;
        for (const k of ['title', 'intro']) if (s[k]) l[k] = s[k];
        if (Array.isArray(s.keyFacts) && s.keyFacts.length) l.keyFacts = s.keyFacts.slice();
        (s.sections || []).forEach((sec, i) => { if (l.sections[i] && sec) Object.assign(l.sections[i], { h: sec.h || l.sections[i].h, body: sec.body || l.sections[i].body }); });
      }
      for (const l of Object.values(window.LESSONS || {}))
        for (const sec of l.sections || []) for (const p of sec.pics || []) if (p.labels) p.labels = p.labels.map((t) => SV.labels[t] || t);
      for (const d of window.PLAN || []) {
        const s = SV.plan[d.day];
        if (!s) continue;
        for (const k of ['title', 'focus', 'goal']) if (s[k]) d[k] = s[k];
        for (const [i, t] of Object.entries(s.tasks || {})) if (d.tasks[i]) for (const k of ['text', 'label']) if (t[k] && d.tasks[i][k]) d.tasks[i][k] = t[k];
      }
      if (window.Signs) {
        const name = window.Signs.name;
        window.Signs.name = (n) => SV.signs[n] || name(n);
      }
    },
  };
})();
