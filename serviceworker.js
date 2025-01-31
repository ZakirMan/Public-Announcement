var staticCachName = "pw";

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(staticCachName).then(function(cache){
            return cache.addAll([
                "/",              // Корневая страница
                "/index.html",
                "styles.css",
                "script.js",
                "/serviceworker.js" // Сам service worker (опционально)

            ]);
        })
    );
});

self.addEventListener("fetch", function(event){
    if (event.request.url.includes("styles.css")) {
        event.respondWith(fetch(event.request)); // Всегда загружает актуальный CSS
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request).catch(() => {
                console.log("Ошибка загрузки:", event.request.url);
            });
        })
    );
});

self.addEventListener("install", function (e) {
    self.skipWaiting(); // Говорит сервис-воркеру сразу активироваться
});