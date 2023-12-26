
const staticCache = 'site-static-15';
const assets = [
'.',
'img/a.png',
'img/apple-icon-precomposed.png',
'img/favicon-16x16.png',
'img/favicon-32x32.png',
'img/favicon-96x96.png',
'img/favicon.ico',
'img/icon-114x114.png',
'img/icon-120x120.png',
'img/icon-144x144.png',
'img/icon-152x152.png',
'img/icon-16x16.png',
'img/icon-180x180.png',
'img/icon-192x192.png',
'img/icon-256x256.png',
'img/icon-320x460.png',
'img/icon-36x36.png',
'img/icon-384x384.png',
'img/icon-48x48.png',
'img/icon-512x512.png',
'img/icon-540x720.png',
'img/icon-57x57.png',
'img/icon-60x60.png',
'img/icon-720x540.png',
'img/icon-72x72.png',
'img/icon-76x76.png',
'img/icon-96x96.png',
'images/akb.webp',
'images/immo.webp',
'images/kapot.webp',
'images/panel-priborov.webp',
'images/starter.webp',
'images/yxo.webp',
'index.html',
'manifest.json',
'favicon.ico',
'bootstrap.min.css'
];

self.addEventListener('install', evt => {
    console.log('Service worker has been installed');

    self.skipWaiting();


    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets);
        })
    );
});


self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== staticCache) {
                        return caches.delete(cache); //Deleting the old cache (cache v1)
                    }
                })
            );
        })
            .then(function () {
                console.info("Old caches are cleared!");
                return self.clients.claim();
            })
    );
});


self.addEventListener('fetch', event => {
  console.log('fetch', event.request.url)
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request){

const cached = await caches.match(request)
return cached ?? await fetch (request)
}


// self.addEventListener('fetch', evt => {
//     console.log('SW is fetching data');
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             return cacheRes || fetch(evt.request)  // if item is in cache use it, if isn't go to the server and fetch it
//         })
//     )
// });