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

// ***Pre-fetching routes***
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open("app-shell-v1").then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/about',
        '/contact',
        '/styles.css',
        '/app.js'
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

// ****advance caching strategy****

self.addEventListener('fetch', event => {
  // console.log("fetch :", event);
  event.respondWith(
    caches.open('dynamic-v1').then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          console.log("networkResponse :", networkResponse.clone());
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});

// ****background synchronization****
self.addEventListener("sync", event => {
  if(event.tag === "sync-user-data") {
    event.waitUntil(getUserData())
  }
})

function syncUserData() {
  return fetch('/sync', {
    method: 'POST',
    body: JSON.stringify(getDataToSync()),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// *** Push Notification***

self.addEventListener("push", event => {
  const data = event.data.json();
  const option = {
    body: data.body,
    icon: "assets/icons/phonepe.png",
    badge: "assets/icons/phonepe.png",
    data: { url: data.url }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  )
});




