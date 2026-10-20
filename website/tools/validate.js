// Usage: node tools/validate.js   -> checks every question + lesson file, renders every picture.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', 'src');
const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
load(path.join(root, 'scenes.js')); load(path.join(root, 'topics.js'));
const only = process.argv[2];
for (const dir of ['questions', 'lessons'])
  for (const f of fs.readdirSync(path.join(root, dir)).filter((x) => x.endsWith('.js')).sort())
    if (!only || f.startsWith(only)) load(path.join(root, dir, f));
const topics = new Set(ctx.TOPICS.map((t) => t.id));
const errors = []; const ids = new Set(); const count = {}; let pics = 0;
const checkSpec = (spec, where) => {
  try { const out = ctx.Scene.render(spec); if (!/<svg/.test(out)) throw new Error('no svg'); pics++; }
  catch (e) { errors.push(`${where}: picture error: ${e.message}`); }
};
for (const q of ctx.QB) {
  const w = q.id || JSON.stringify(q).slice(0, 60);
  if (!q.id || ids.has(q.id)) errors.push(`${w}: missing or duplicate id`); ids.add(q.id);
  if (!topics.has(q.topic)) errors.push(`${w}: unknown topic ${q.topic}`);
  if (typeof q.q !== 'string' || q.q.length < 10) errors.push(`${w}: question text missing`);
  if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) errors.push(`${w}: needs 2-4 options`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) errors.push(`${w}: answer index out of range`);
  if (new Set(q.options).size !== (q.options || []).length) errors.push(`${w}: duplicate options`);
  if (typeof q.explain !== 'string' || q.explain.length < 20) errors.push(`${w}: explanation missing/too short`);
  if (q.img) checkSpec(q.img, w);
  count[q.topic] = (count[q.topic] || 0) + 1;
}
for (const [id, l] of Object.entries(ctx.LESSONS)) {
  if (!topics.has(id)) errors.push(`lesson ${id}: unknown topic`);
  if (!l.title || !Array.isArray(l.sections) || !l.sections.length) errors.push(`lesson ${id}: needs title + sections`);
  (l.sections || []).forEach((s, i) => { if (!s.h || !s.body) errors.push(`lesson ${id} section ${i}: needs h + body`); (s.pics || []).forEach((p, j) => checkSpec(p, `lesson ${id} s${i} pic${j}`)); });
  if (!Array.isArray(l.keyFacts) || l.keyFacts.length < 3) errors.push(`lesson ${id}: needs 3+ keyFacts`);
}
// Swedish overlays (src/sv/): every question, lesson, plan day, topic and sign must have Swedish text
// in the same shape as the English, or the app silently falls back to English.
if (!only) {
  ctx.SV = { qs: {}, lessons: {}, plan: {}, topics: {}, signs: {}, labels: {} }; ctx.SV.q = (o) => Object.assign(ctx.SV.qs, o);
  load(path.join(root, 'plan.js'));
  const svDir = path.join(root, 'sv');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []));
  for (const f of walk(svDir).sort()) load(f);
  const SV = ctx.SV; const sv = [];
  for (const q of ctx.QB) {
    const s = SV.qs[q.id];
    if (!s) { sv.push(`${q.id}: no Swedish text`); continue; }
    if (!s.q || !s.explain) sv.push(`${q.id}: Swedish q/explain missing`);
    if (!Array.isArray(s.options) || s.options.length !== q.options.length) sv.push(`${q.id}: Swedish options count differs`);
    else if (new Set(s.options).size !== s.options.length) sv.push(`${q.id}: duplicate Swedish options`);
  }
  for (const id of Object.keys(SV.qs)) if (!ids.has(id)) sv.push(`${id}: Swedish text for unknown question`);
  for (const [id, l] of Object.entries(ctx.LESSONS)) {
    const s = SV.lessons[id];
    if (!s) { sv.push(`lesson ${id}: no Swedish text`); continue; }
    if ((s.sections || []).length !== l.sections.length) sv.push(`lesson ${id}: Swedish section count differs`);
    if ((s.keyFacts || []).length !== (l.keyFacts || []).length) sv.push(`lesson ${id}: Swedish keyFacts count differs`);
  }
  for (const d of ctx.PLAN) {
    const s = SV.plan[d.day];
    if (!s || !s.title || !s.focus) { sv.push(`plan day ${d.day}: Swedish title/focus missing`); continue; }
    d.tasks.forEach((t, i) => { for (const k of ['text', 'label']) if (t[k] && !((s.tasks || {})[i] || {})[k]) sv.push(`plan day ${d.day} task ${i}: Swedish ${k} missing`); });
  }
  for (const t of ctx.TOPICS) if (!SV.topics[t.id] || !SV.topics[t.id].name || !SV.topics[t.id].short) sv.push(`topic ${t.id}: Swedish name missing`);
  const signNames = ctx.Signs.list().map((n) => SV.signs[n]);
  ctx.Signs.list().forEach((n, i) => { if (!signNames[i]) sv.push(`sign ${n}: Swedish name missing`); });
  if (new Set(signNames).size !== signNames.length) sv.push('Swedish sign names are not unique');
  for (const l of Object.values(ctx.LESSONS)) for (const sec of l.sections) for (const p of sec.pics || []) for (const t of p.labels || []) if (/[a-z]/.test(t) && !SV.labels[t]) sv.push(`lesson picture label "${t}": Swedish missing`);
  errors.push(...sv);
  console.log('Swedish: ' + (sv.length ? `${sv.length} problem(s)` : 'complete'));
}
console.log('Questions per topic:', count, '\nTotal questions:', ctx.QB.length, ' with pictures:', ctx.QB.filter((q) => q.img).length, '\nLessons:', Object.keys(ctx.LESSONS).join(', ') || '(none)', '\nPictures rendered:', pics);
if (errors.length) { console.log(`\n${errors.length} ERROR(S):\n` + errors.join('\n')); process.exit(1); }
console.log('OK');
