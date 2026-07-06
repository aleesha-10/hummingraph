// path: public/sw.js
//
// Minimal service worker. Its main job is just existing — Chrome requires
// an active service worker for the "Add to Home Screen" install prompt to
// show up. This one does a light network-first pass with a fallback cache,
// which as a side effect means already-visited pages load instantly if
// someone opens the app with a flaky connection.

const CACHE_NAME = "hummingraph-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
