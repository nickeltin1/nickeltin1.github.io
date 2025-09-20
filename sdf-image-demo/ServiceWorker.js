const cacheName = "nickeltn-SDF Image Demo-1.1.0";
const contentToCache = [
    "Build/55a4adf9323dc057a006df5e6ab4c972.loader.js",
    "Build/dd7c0f44507decec7f2a645e2eddbebd.framework.js",
    "Build/a91db0f4ef27fec38b77454e2d4c3604.data",
    "Build/f53315a11b466602f85fdb10d5958942.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
