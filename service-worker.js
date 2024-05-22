// ***offline capabilities***
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open("app-shell-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/css/heavy.css",
        "/index.js",
      ])
    })
  )
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  )
});
