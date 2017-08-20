

(function() {
  'use strict';
 
  self.importScripts('node_modules/localforage/dist/localforage.js')

  var staticFilesToCache = [
    '.',
    'index.html',
    '/dist/app.bundle.js',
    '/offline.html',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2'
  ];

  var staticCaches = 'my-appshell-cache';  //Will use Cache, falling back to Network.
  var apiCaches = "my-api-cache"; //Will use Cache then Network.
	var apiForage = "my-api-db"

  
  // console.log('local forage ',localforage);

  localforage.config({
    driver: [localforage.INDEXEDDB,
             localforage.LOCALSTORAGE],
    name: apiForage,
    storeName: 'my-indexeddb-store'
  });

  localforage.setItem('key1',{name:'Gethyl George', interest: "React Redux PWA"}).then(function(res){console.log('Key 1 resolved')})

  self.addEventListener('install', function(event) {
    console.log('%c##Service Worker##',
                'background: #008000	; color: #fff',
                'Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCaches)
            .then(function(cache) {
              return cache.addAll(staticFilesToCache);
            })
            .then(function(){
               self.skipWaiting().then(function(res){
                 console.log('%c##Service Worker##',
                  'background: #0D47A1; color:#fff',
                  'Skip Waiting ran.....', res);
               });
            })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('%c##Service Worker##',
                'background: #008000	; color: #fff',
                'Activating new service worker...');

    var cacheWhitelist = [staticCaches,apiCaches];

    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
           cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function(val){
         return self.clients.claim().then(function(res){
                 console.log('%c##Service Worker##',
                  'background: #0D47A1; color:#fff',
                  'Client claiming', res);
               });
      })
    );
  });

  /* if found in CACHE then return from CACHE else from NETWORK */
  self.addEventListener('fetch', function(event) {
    // console.log('Fetch event for >>>> ', event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
          }

          console.log('%c##Service Worker##',
                'background: #FF9800	; color: #fff',
                'Not in Cache... Making Network request for ', event.request.url);

          return fetch(event.request)
                  .then(function(response) {
                    if (response.status === 404) {
                      return caches.match('/offline.html');
                    }
                    //This code prevents caching Github api responses.
                    if (event.request.url.indexOf('github') > -1 ) {
                        console.log('%c ##Service Worker##',
                          'background: #FF9800	; color: #fff',
                          'GitHub API requests will not be cached from the Service Worker.');
                        return response;
                    }

                    return response
                  });
        })
        .catch(function(error) {
          console.log('%c##Service Worker##',
            'background: #D50000	; color: #fff',
            'Failed to fetch', event.request.url);
          return caches.match('/offline.html');
        })
    );
  });

})();
