// GET /api/config -> which cloud features this deployment has.
import { db, pushReady, send } from './_lib.js';

export default function handler(req, res) {
  send(res, 200, { sync: !!db(), push: !!db() && pushReady(), vapidPublicKey: process.env.VAPID_PUBLIC_KEY || null });
}
