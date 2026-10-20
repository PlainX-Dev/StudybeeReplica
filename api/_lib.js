// Shared helpers for the Vercel functions: storage, validation and the daily reminder text.
import { Redis } from '@upstash/redis';
import PLAN_TITLES from './_plan.js';

let client;
/** Upstash Redis (Vercel Marketplace). In local dev (K30_DEV=1) an in-memory stand-in is used. */
export function db() {
  if (client !== undefined) return client;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) client = new Redis({ url, token, automaticDeserialization: false });
  else if (process.env.K30_DEV) client = memoryStore();
  else client = null;
  return client;
}
function memoryStore() {
  const m = new Map();
  return {
    get: async (k) => m.get(k) ?? null,
    set: async (k, v) => { m.set(k, v); return 'OK'; },
    del: async (k) => { m.delete(k); return 1; },
    hset: async (k, o) => { m.set(k, Object.assign(m.get(k) || {}, o)); return 1; },
    hgetall: async (k) => m.get(k) || null,
    hdel: async (k, f) => { const h = m.get(k); if (h) delete h[f]; return 1; },
    sadd: async (k, v) => { const s = m.get(k) || new Set(); s.add(v); m.set(k, s); return 1; },
    srem: async (k, v) => { const s = m.get(k); if (s) s.delete(v); return 1; },
    smembers: async (k) => [...(m.get(k) || [])],
  };
}

export const pushReady = () => !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
export const validId = (id) => typeof id === 'string' && /^[A-Z2-9]{20}$/.test(id);

export function send(res, status, body) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}
export function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}

const dateIn = (tz, d = new Date()) => {
  try { return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d); }
  catch { return d.toISOString().slice(0, 10); }
};
const shift = (isoDay, n) => { const d = new Date(isoDay + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

/** The reminder for one learner, or null when they have already studied today. */
export function reminderFor(state, tz = 'Europe/Stockholm') {
  if (!state || !state.start) return { title: 'Körkort 30', body: 'Set your start date and begin day 1 of your theory plan.' };
  const today = dateIn(tz);
  const days = state.days || {};
  const active = (d) => { const r = days[d]; return !!r && (r.a >= 10 || r.t > 0); };
  if (active(today)) return null;
  let streak = 0; let d = shift(today, -1);
  while (active(d)) { streak++; d = shift(d, -1); }
  const dayN = Math.max(1, Math.min(30, Math.round((new Date(today + 'T12:00:00Z') - new Date(state.start + 'T12:00:00Z')) / 86400000) + 1));
  const title = PLAN_TITLES[dayN - 1] || 'Your plan';
  const test = state.testDate ? Math.round((new Date(state.testDate + 'T12:00:00Z') - new Date(today + 'T12:00:00Z')) / 86400000) : null;
  const when = test !== null && test >= 0 ? (test === 0 ? ' Test day!' : ` Test in ${test} day${test === 1 ? '' : 's'}.`) : '';
  return {
    title: streak > 0 ? `Keep your ${streak}-day streak alive` : `Day ${dayN}: ${title}`,
    body: streak > 0 ? `Day ${dayN}: ${title}. Answer 10 questions to keep it going.${when}` : `Your next session is ready. About an hour today.${when}`,
  };
}
