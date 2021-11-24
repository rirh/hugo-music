
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("install", function(event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),

      // 清理旧版本
      caches.keys().then(function(cacheList) {
        return Promise.all(
          cacheList.map(function(cacheName) {
            if (cacheName !== "cachev1") {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener("message", event => {
  if (event.data.action == "SKIP_WAITING") self.skipWaiting();
});
