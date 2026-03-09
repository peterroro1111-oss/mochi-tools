const CACHE_NAME = 'mochi-ai-models-v1';

// Patterns that indicate AI model / heavy WASM files worth caching
const MODEL_PATTERNS = [
  /\.onnx$/i,
  /onnx/i,
  /\.bin$/i,
  /\.wasm$/i,
  /ffmpeg-core/i,
];

// CDN domains used by @imgly/background-removal and @ffmpeg/core
const MODEL_DOMAINS = [
  'unpkg.com',
  'cdn.jsdelivr.net',
  'staticimgly.com',
];

function isModelRequest(url) {
  const parsed = new URL(url);
  // Check if it's from a known CDN domain
  const isModelDomain = MODEL_DOMAINS.some((d) => parsed.hostname.includes(d));
  // Check if URL matches model file patterns
  const isModelFile = MODEL_PATTERNS.some((p) => p.test(parsed.pathname) || p.test(parsed.href));
  return isModelDomain && isModelFile;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (!isModelRequest(request.url)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
  );
});

// Allow clients to check if a model is cached
self.addEventListener('message', (event) => {
  if (event.data?.type === 'CHECK_MODEL_CACHE') {
    caches.open(CACHE_NAME).then(async (cache) => {
      const keys = await cache.keys();
      const hasModels = keys.length > 0;
      event.source.postMessage({ type: 'MODEL_CACHE_STATUS', cached: hasModels });
    });
  }
});
