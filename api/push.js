// POST /api/push { action: 'subscribe' | 'unsubscribe' | 'test', id, subscription?, endpoint?, tz?, lang? }
import webpush from 'web-push';
import { db, pushReady, validId, send, body, reminderFor, langOf, safeToday } from './_lib.js';

export function vapid() {
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:noreply@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  return webpush;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Method not allowed.' }); }
  const store = db();
  if (!store || !pushReady()) return send(res, 503, { error: 'Reminders are not set up on this deployment.' });
  const { action, id, subscription, endpoint, tz, lang } = body(req);
  if (!validId(id)) return send(res, 400, { error: 'Invalid sync code.' });

  if (action === 'subscribe') {
    if (!subscription || typeof subscription.endpoint !== 'string' || !/^https:\/\//.test(subscription.endpoint) || !subscription.keys) return send(res, 400, { error: 'Invalid subscription.' });
    await store.hset(`subs:${id}`, { [subscription.endpoint]: JSON.stringify({ subscription, tz: typeof tz === 'string' ? tz.slice(0, 64) : 'Europe/Stockholm', lang: langOf(lang), at: Date.now() }) });
    await store.sadd('subs:ids', id);
    return send(res, 200, { ok: true });
  }
  if (action === 'unsubscribe') {
    if (typeof endpoint === 'string') await store.hdel(`subs:${id}`, endpoint);
    return send(res, 200, { ok: true });
  }
  if (action === 'test') {
    const subs = (await store.hgetall(`subs:${id}`)) || {};
    const raw = await store.get(`state:${id}`);
    const state = raw ? JSON.parse(raw) : null;
    let sent = 0;
    for (const [ep, v] of Object.entries(subs)) {
      const { subscription, tz: subTz, lang: subLang } = JSON.parse(v);
      const msg = reminderFor(state, subTz, subLang) || safeToday(subLang);
      try { await vapid().sendNotification(subscription, JSON.stringify({ ...msg, url: '/#today', tag: 'test' })); sent++; }
      catch (e) { if (e.statusCode === 404 || e.statusCode === 410) await store.hdel(`subs:${id}`, ep); }
    }
    return send(res, 200, { ok: true, sent });
  }
  return send(res, 400, { error: 'Unknown action.' });
}
