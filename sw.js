const staticCacheName = 's-app-v3'

const assetUrls = [
  'index.html'
]

self.addEventListener('install', event => {
 event.waitUntil(
  caches.open(staticCacheName).then(cache => cache.addAll(assetUrls) )
 )
})

self.addEventListener('activate', event => {
console.log('Service worker activate')
})