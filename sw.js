// Piano Coach Service Worker — v0.85
// Network-first voor HTML (updates landen meteen), cache-first runtime voor de rest
// (MIDIs, CDN, icons). Werkt op zowel localhost-root als GitHub-Pages-subpad
// omdat alle paden relatief aan de SW-scope worden opgelost.

const CACHE = 'piano-coach-v85';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg',
  'https://cdn.jsdelivr.net/npm/@tonejs/midi@2.0.28/build/Midi.js',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // addAll faalt als één resource 404't; voeg los toe zodat install nooit breekt
      Promise.all(CORE.map((u) => c.add(u).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isHTML =
    e.request.mode === 'navigate' ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('.html');

  if (isHTML) {
    // Network-first: verse app, val terug op cache bij offline
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first runtime voor MIDIs, CDN, icons
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request)
          .then((resp) => {
            if (resp.ok && (url.origin === self.location.origin || url.host.includes('jsdelivr'))) {
              const clone = resp.clone();
              caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
            }
            return resp;
          })
          .catch(() => cached)
    )
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
