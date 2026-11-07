const CACHE_NAME = 'adventura-shell-v1'
const APP_BASE = new URL('./', self.registration.scope).pathname
const APP_SHELL = [APP_BASE, `${APP_BASE}manifest.webmanifest`, `${APP_BASE}icons/adventura.svg`]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('adventura-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        const copy = response.clone()
        void caches.open(CACHE_NAME).then((cache) => cache.put(APP_BASE, copy))
        return response
      }).catch(async () => (await caches.match(request)) || (await caches.match(APP_BASE))),
    )
    return
  }

  if (url.pathname.startsWith(APP_BASE)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone()
          void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        }
        return response
      })),
    )
  }
})
