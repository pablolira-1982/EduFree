const CACHE_NAME = 'edufree-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/Logo_principal.png',
  '/assets/Logo_EduFree.png',
  '/assets/Robo_EduFree.png',
  '/assets/banner_inicio.png',
  '/assets/disciplina_matematica.png',
  '/assets/disciplina_portugues.png',
  '/assets/disciplina_ciencias.png',
  '/assets/disciplina_historia.png',
  '/assets/disciplina_geografia.png',
  '/assets/disciplina_fisica.png',
  '/assets/disciplina_quimica.png',
  '/assets/disciplina_biologia.png',
  '/assets/disciplina_ingles.png',
  '/assets/conquista_trofeu.png',
  '/assets/conquista_fogo.png',
  '/assets/conquista_mestre_contas.png',
  '/assets/conquista_cientista.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Alguns assets estáticos podem falhar no pre-cache inicial:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia Network-First para Desenvolvimento e Cache-Fallback para Modo Offline Real
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Não interceptar requisições para a API de síntese vocal (/api/tts)
  if (url.pathname.startsWith('/api/tts')) {
    return;
  }

  // Network-First: busca versão mais recente na rede e faz fallback offline se desconectado
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
