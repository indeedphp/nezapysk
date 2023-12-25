
const staticCache = 'site-static-1';
const assets = [
'/',
'index.html',
'manifest.json',
'favicon.ico',
'img/icon-144x144.png',
'img/icon-720x540.png'
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