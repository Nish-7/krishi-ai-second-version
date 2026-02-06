const CACHE_NAME = "krishi-ai-shell-v5";
const DATA_CACHE_NAME = "krishi-ai-data-v5";

const APP_SHELL = [
  "/",
  "/login",
  "/static/css/styles.css",
  "/static/js/app.js",
  "/static/js/login.js",
  "/static/js/recommend.js",
  "/static/js/roi.js",
  "/static/js/fertilizers.js",
  "/static/js/sell.js",
  "/static/js/profile.js",
  "/static/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);

      // Pre-cache fertilizer data for offline view
      try {
        const dataCache = await caches.open(DATA_CACHE_NAME);
        const response = await fetch("/api/fertilizers");
        if (response.ok) {
          await dataCache.put("/api/fertilizers", response.clone());
        }
      } catch (e) {
        // Ignore if offline during install
      }

      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Cache-first for static app shell
  if (request.method === "GET" && APP_SHELL.includes(new URL(request.url).pathname)) {
    event.respondWith(
      caches.match(request).then((response) => response || fetch(request))
    );
    return;
  }

  // Cache-first for fertilizer API
  if (request.method === "GET" && new URL(request.url).pathname === "/api/fertilizers") {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) =>
          cache.match(request).then((cached) => {
            const networkFetch = fetch(request)
              .then((response) => {
                if (response.ok) cache.put(request, response.clone());
                return response;
              })
              .catch(() => cached);
            return cached || networkFetch;
          })
        )
    );
    return;
  }
});

