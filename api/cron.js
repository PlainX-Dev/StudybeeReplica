// Daily reminder, run by Vercel Cron (see vercel.json). Sends a push to every learner who has
// not yet studied today; skips learners whose streak is already safe.
import { db, pushReady, send, reminderFor } from './_lib.js';
import { vapid, pushError } from './push.js';

export default async function handler(req, res) {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return send(res, 401, { error: 'Unauthorized.' });
  const store = db();
  if (!store || !pushReady()) return send(res, 503, { error: 'Reminders are not set up on this deployment.' });
  const wp = vapid();
  let sent = 0, skipped = 0, removed = 0, failed = 0;
  for (const id of await store.smembers('subs:ids')) {
    const subs = (await store.hgetall(`subs:${id}`)) || {};
    const entries = Object.entries(subs);
    if (!entries.length) { await store.srem('subs:ids', id); continue; }
    const raw = await store.get(`state:${id}`);
    const state = raw ? JSON.parse(raw) : null;
    for (const [ep, v] of entries) {
      const { subscription, tz, lang } = JSON.parse(v);
      const msg = reminderFor(state, tz, lang);
      if (!msg) { skipped++; continue; }
      try { await wp.sendNotification(subscription, JSON.stringify({ ...msg, url: '/#today', tag: 'daily' }), { TTL: 6 * 3600 }); sent++; }
      catch (e) {
        if (e.statusCode === 404 || e.statusCode === 410) { await store.hdel(`subs:${id}`, ep); removed++; }
        else { failed++; console.error('reminder failed:', pushError(e)); }
      }
    }
  }
  return send(res, 200, { ok: true, sent, skipped, removed, failed });
}
