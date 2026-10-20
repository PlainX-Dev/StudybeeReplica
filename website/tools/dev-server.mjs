// Local test server: serves website/dist and runs the /api functions with an in-memory store.
// Usage: K30_DEV=1 VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... node website/tools/dev-server.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

process.env.K30_DEV = process.env.K30_DEV || '1';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const dist = path.join(root, 'website', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice(5).replace(/[^a-z]/g, '');
    let raw = ''; for await (const c of req) raw += c;
    const mod = await import(path.join(root, 'api', `${name}.js`)).catch(() => null);
    if (!mod) { res.statusCode = 404; return res.end('{}'); }
    req.query = Object.fromEntries(url.searchParams); req.body = raw ? JSON.parse(raw) : {};
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); return res; };
    try { await mod.default(req, res); } catch (e) { console.error(e); res.statusCode = 500; res.end(JSON.stringify({ error: e.message })); }
    return;
  }
  const file = path.join(dist, url.pathname === '/' ? 'index.html' : path.normalize(url.pathname));
  if (!file.startsWith(dist) || !fs.existsSync(file)) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('content-type', TYPES[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(+process.argv[2] || 3030, () => console.log(`http://localhost:${+process.argv[2] || 3030}`));
