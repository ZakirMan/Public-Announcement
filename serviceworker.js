var staticCachName = "pw";

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                "/",  
                "/index.html",
                "/styles.css",
                "/script.js",
                "/audio/boarding.mp3",
                "/audio/boarding_f.mp3",
                "/audio/refueling_end.mp3",
                "/audio/recount.mp3",
                "/serviceworker.js"
            ]);
        })
    );
});

// Активируем новый Service Worker и удаляем старый кеш
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Перехватываем запросы и загружаем из кеша
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).catch(() => {
                if (event.request.destination === "audio") {
                    return caches.match("/audio/recount.mp3"); // Заглушка для аудио
                }
            });
        })
    );
});