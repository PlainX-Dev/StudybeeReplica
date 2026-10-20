// Usage: NODE_PATH=$(npm root -g) node tools/preview.js <questions-file-prefix> <out.png>
// Renders every question (picture + text + correct answer) from matching files into one PNG.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..', 'src');
const prefix = process.argv[2] || '', out = path.resolve(process.argv[3] || 'preview.png');
const files = fs.readdirSync(path.join(root, 'questions')).filter((f) => f.endsWith('.js') && f.startsWith(prefix));
const html = `<html><body style="margin:0;font:13px Arial;background:#fff"><div id="g" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px"></div>
<script>${fs.readFileSync(path.join(root, 'scenes.js'), 'utf8')}</script><script>${fs.readFileSync(path.join(root, 'topics.js'), 'utf8')}</script>
${files.map((f) => `<script>${fs.readFileSync(path.join(root, 'questions', f), 'utf8')}</script>`).join('')}
<script>for(const q of QB){const d=document.createElement('div');d.style.cssText='border:1px solid #ccc;padding:6px';
d.innerHTML='<b>'+q.id+'</b> '+q.q+(q.img?'<div style="width:100%">'+Scene.render(q.img).replace('<svg ','<svg style="width:100%;height:auto" ')+'</div>':'')+'<div style="color:#15803d">✔ '+q.options[q.answer]+'</div>';document.getElementById('g').appendChild(d);}</script></body></html>`;
(async () => {
  const tmp = path.join(require('os').tmpdir(), 'qpreview-' + process.pid + '.html'); fs.writeFileSync(tmp, html);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + tmp); await p.screenshot({ path: out, fullPage: true }); await b.close();
  console.log(errs.length ? 'ERRORS: ' + errs.join('\n') : 'wrote ' + out);
})();
