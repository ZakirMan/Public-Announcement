var CACHE_NAME = "pw-v3";

self.addEventListener("install", function (event) {
    console.log("[Service Worker] Устанавливаем кеш...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            const urlsToCache = [
                "/",
                "/index.html",
                "/styles.css",
                "/script.js",
                "/audio/boarding.mp3",
                "/audio/boarding_f.mp3",
                "/audio/refueling_end.mp3",
                "/audio/recount.mp3"
            ];
            console.log("Пробуем загрузить и закешировать:", urlsToCache);
            return cache.addAll(urlsToCache)
                .then(() => console.log("Все файлы успешно закешированы!"))
                .catch(error => console.error("Ошибка при кешировании файлов:", error));
        })
    );
});

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

self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] Запрос:", event.request.url);
    
    // Проверяем, это аудиофайл и поддерживает ли он Range-запрос
    if (event.request.url.includes("/audio/") && event.request.headers.get("range")) {
        console.log("[Service Worker] Обрабатываем Range-запрос для:", event.request.url);
        
        event.respondWith(
            caches.open(CACHE_NAME).then(async cache => {
                const response = await cache.match(event.request.url);
                if (!response) {
                    console.log("[Service Worker] Аудиофайл не найден в кеше!");
                    return fetch(event.request);
                }

                const blob = await response.blob();
                return new Response(blob, {
                    status: 206, // Partial Content
                    headers: {
                        "Content-Type": "audio/mpeg",
                        "Accept-Ranges": "bytes"
                    }
                });
            })
        );
        return;
    }

    // Обычная обработка запросов
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                if (event.request.destination === "audio") {
                    console.log("[Service Worker] Ошибка сети. Подставляем заглушку для аудио.");
                    return caches.match("/audio/recount.mp3");
                }
            });
        })
    );
});