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
console.log('Questions per topic:', count, '\nTotal questions:', ctx.QB.length, ' with pictures:', ctx.QB.filter((q) => q.img).length, '\nLessons:', Object.keys(ctx.LESSONS).join(', ') || '(none)', '\nPictures rendered:', pics);
if (errors.length) { console.log(`\n${errors.length} ERROR(S):\n` + errors.join('\n')); process.exit(1); }
console.log('OK');
