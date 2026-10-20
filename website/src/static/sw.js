/* Körkort 30 service worker: daily reminder notifications and an offline copy of the app. */
const CACHE = 'k30-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

// Pages: network first, fall back to the last copy so the app opens offline.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || req.mode !== 'navigate') return;
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      const c = await caches.open(CACHE); c.put('/', res.clone());
      return res;
    } catch (err) {
      return (await caches.match('/')) || Response.error();
    }
  })());
});

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Körkort 30', {
    body: d.body || 'Time for today’s theory session.',
    icon: '/icon-192.png', badge: '/badge-72.png', tag: d.tag || 'daily', renotify: true,
    data: { url: d.url || '/#today' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/#today';
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) { if ('focus' in w) { if (w.navigate) await w.navigate(url); return w.focus(); } }
    return self.clients.openWindow(url);
  })());
});
