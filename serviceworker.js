var staticCachName = "pw";

var CACHE_NAME = "pw-v2"; // Обновил имя кеша, чтобы принудительно обновить

self.addEventListener("install", function (event) {
    console.log("[Service Worker] Устанавливаем кеш...");
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
                "/audio/recount.mp3"
            ]);
        })
    );
});

// Активируем новый Service Worker и удаляем старый кеш
self.addEventListener("activate", function (event) {
    console.log("[Service Worker] Активирован!");
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Удаляем старый кеш:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Перехватываем запросы и загружаем из кеша
self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] Запрос:", event.request.url);
    
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log("[Service Worker] Загружено из кеша:", event.request.url);
                return response;
            }

            console.log("[Service Worker] Файл не найден в кеше, пробуем загрузить:", event.request.url);
            return fetch(event.request).catch(() => {
                if (event.request.destination === "audio") {
                    console.log("[Service Worker] Ошибка сети. Подставляем заглушку для аудио.");
                    return caches.match("/audio/recount.mp3");
                }
            });
        })
    );
});