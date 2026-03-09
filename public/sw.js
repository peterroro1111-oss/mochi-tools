const AI_CACHE = 'mochi-ai-models-v1';
const STATIC_CACHE = 'mochi-static-v1';

// AI model patterns (do NOT change — these have their own caching)
const MODEL_PATTERNS = [
  /\.onnx$/i,
  /onnx/i,
  /\.bin$/i,
  /\.wasm$/i,
  /ffmpeg-core/i,
];

const MODEL_DOMAINS = [
  'unpkg.com',
  'cdn.jsdelivr.net',
  'staticimgly.com',
];

function isModelRequest(url) {
  const parsed = new URL(url);
  const isModelDomain = MODEL_DOMAINS.some((d) => parsed.hostname.includes(d));
  const isModelFile = MODEL_PATTERNS.some((p) => p.test(parsed.pathname) || p.test(parsed.href));
  return isModelDomain && isModelFile;
}

// Static assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/mochi-logo-transparent.png',
  '/favicon-192x192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== AI_CACHE && name !== STATIC_CACHE)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // AI model requests: cache-first
  if (isModelRequest(request.url)) {
    event.respondWith(
      caches.open(AI_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
    );
    return;
  }

  // Skip external requests (analytics, CDNs not in model list, etc.)
  if (url.origin !== self.location.origin) return;

  // Skip API routes and _next/webpack-hmr (dev)
  if (url.pathname.startsWith('/api/') || url.pathname.includes('webpack-hmr')) return;

  // For same-origin navigations and static assets: network-first with cache fallback
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Static assets (_next/static, images, fonts): cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|woff|woff2|css|js)$/)
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
    );
    return;
  }
});

// Allow clients to check if a model is cached
self.addEventListener('message', (event) => {
  if (event.data?.type === 'CHECK_MODEL_CACHE') {
    caches.open(AI_CACHE).then(async (cache) => {
      const keys = await cache.keys();
      const hasModels = keys.length > 0;
      event.source.postMessage({ type: 'MODEL_CACHE_STATUS', cached: hasModels });
    });
  }
});
