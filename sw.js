const CACHE_NAME = 'clari-v1';
const ASSETS_TO_CACHE = [
  '/ai-mentor/',
  '/ai-mentor/index.html',
  '/ai-mentor/css/design-tokens.css',
  '/ai-mentor/css/components.css',
  '/ai-mentor/js/data-manager.js',
  '/ai-mentor/js/clari-mascot.js',
  '/ai-mentor/js/achievements.js',
  '/ai-mentor/manifest.json'
];

// Install: pre-cache critical assets, skipWaiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches, claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first with network fallback, update cache on network success
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version, and fetch update in background
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Only cache successful responses from same origin
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed - if this is a navigation request, serve offline fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/ai-mentor/index.html');
            }
            return null;
          });

        // Return cache immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
