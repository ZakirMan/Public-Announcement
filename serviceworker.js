var staticCachName = "pw";

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(staticCachName).then(function(cache){
            return cache.addAll([
                "/",              // Корневая страница
                "/index.html",
                "styles.css",
                "script.js",
                "/audio/boarding.mp3",
                "/audio/boarding_f.mp3",
                "/audio/refueling_end.mp3",
                "/audio/recount.mp3",
                "/serviceworker.js" // Сам service worker (опционально)

            ]);
        })
    );
});



// Устанавливаем кеш при установке Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Перехватываем запросы и загружаем из кеша, если нет интернета
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});