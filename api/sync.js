// GET /api/sync?id=CODE -> { state }      PUT /api/sync { id, state } -> { ok }
// The sync code is the only key: anyone with it can read and write that progress.
import { db, validId, send, body } from './_lib.js';

const MAX = 1_500_000;

export default async function handler(req, res) {
  const store = db();
  if (!store) return send(res, 503, { error: 'Sync is not set up on this deployment.' });
  if (req.method === 'GET') {
    const id = String(req.query.id || '');
    if (!validId(id)) return send(res, 400, { error: 'Invalid sync code.' });
    const raw = await store.get(`state:${id}`);
    return send(res, 200, { state: raw ? JSON.parse(raw) : null });
  }
  if (req.method === 'PUT' || req.method === 'POST') {
    const { id, state } = body(req);
    if (!validId(id)) return send(res, 400, { error: 'Invalid sync code.' });
    if (!state || typeof state !== 'object' || typeof state.q !== 'object') return send(res, 400, { error: 'Missing progress data.' });
    const json = JSON.stringify(state);
    if (json.length > MAX) return send(res, 413, { error: 'Progress data is too large.' });
    await store.set(`state:${id}`, json);
    return send(res, 200, { ok: true, savedAt: Date.now() });
  }
  res.setHeader('Allow', 'GET, PUT');
  return send(res, 405, { error: 'Method not allowed.' });
}
