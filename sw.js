const CACHE_NAME = 'lic-manager-v3'; 

self.addEventListener('install', (e) => {
  self.skipWaiting(); // नया वर्ज़न तुरंत एक्टिवेट करें
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.json'
    ])),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // पुराने ख़राब कैश को डिलीट करें
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)) // इंटरनेट होने पर हमेशा नया पेज लाएं
  );
});
