var cacheStorage = "Cache-test";

var cacheFiles = [
  "/",
  "style.css",
  "livingroom.jpg",
  "bedroom.jpg",
  "sw.js",
  "manifest.json",
  "offline-img.png",
  "index.html",
];
// register- install - fetch -active
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheStorage).then((cache) => {
      console.log("sw: writing files into cache");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("active", (e) => {
  console.log("sw: service worker ready and activated", e);
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch((err) => {
        return caches.match("offline-img.png");
      })
  );
});
