const CACHE_NAME = "diario-de-bordo-v1";

const ARQUIVOS_PARA_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );

  self.skipWaiting();
});

// Remove caches antigos
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomesCaches) => {
      return Promise.all(
        nomesCaches
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      );
    })
  );

  self.clients.claim();
});

// Permite utilizar os arquivos mesmo sem internet
self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      return respostaCache || fetch(evento.request);
    })
  );
});