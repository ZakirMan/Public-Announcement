var CACHE_NAME = "pw-v3";

self.addEventListener("install", function (event) {
    console.log("[Service Worker] Устанавливаем кеш...");
    event.waitUntil(
        caches.open("pw-v3").then(async cache => {
            const urlsToCache = [
                "./index.html",
                "./styles.css",
                "./script.js",
                "./audio/boarding.mp3",
                "./audio/boarding_f.mp3",
                "./audio/refueling_end.mp3",
                "./audio/recount.mp3"
            ];

            for (const url of urlsToCache) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Ошибка загрузки ${url}`);
                    await cache.put(url, response);
                    console.log(`✅ Файл закеширован: ${url}`);
                } catch (error) {
                    console.error(`❌ Ошибка кеширования ${url}:`, error);
                }
            }
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

    // Проверка аудиофайлов
    if (event.request.destination === "audio") {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    console.log("[Service Worker] Отдаем аудио из кеша:", event.request.url);
                    return response;
                } else {
                    console.log("[Service Worker] Аудиофайл не найден в кеше, пробуем загрузить:", event.request.url);
                    return fetch(event.request).then(networkResponse => {
                        return caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    }).catch(() => {
                        console.log("[Service Worker] Ошибка сети. Подставляем заглушку для аудио.");
                        return caches.match("/audio/recount.mp3");
                    });
                }
            })
        );
        return;
    }

    // Обычная обработка запросов
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});