

(function() {
  'use strict';

  var staticFilesToCache = [
    '.',
    'index.html',
    '/dist/app.bundle.js',
    '/offline.html',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2'
	];
	
	var apiToCache = [
		'http://localhost:3000/api'
	]

  var staticCaches = 'my-appshell-cache';  //Will use Cache, falling back to Network.
  var apiCaches = "my-api-cache"; //Will use Cache then Network.
	

  self.addEventListener('install', function(event) {
    console.log('%c##Service Worker##',
                'background: #008000	; color: #fff',
                'Attempting to install service worker and cache static assets');
    event.waitUntil(
			Promise.all([
				caches.open(staticCaches)   //Static Assets
					.then(function (cache) {
						return cache.addAll(staticFilesToCache);
					}),
				caches.open(apiCaches)      //API for GET
					.then(function (cache) {
						return cache.addAll(apiToCache);
					})
			]).then(function () {
				self.skipWaiting().then(function (res) {
					console.log('%c##Service Worker##',
						'background: #0D47A1; color:#fff',
						'Skip Waiting ran.....', res);
				});
			})
			.catch(function (error) {
					console.log('%c##Service Worker##',
						'background: #D50000; color:#fff',
						'Install Step failed with errors', error);
			})
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('%c##Service Worker##',
                'background: #008000	; color: #fff',
                'Activating new service worker...');

    var cacheWhitelist = [staticCaches, apiCaches];

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
		
		//Network first and then Cache Strategy
		if (event.request.url.indexOf('/api') > -1 && event.request.method === "GET") {
			event.respondWith(
				fetch(event.request)
					.then(function (networkResponse) {
						return caches.match(event.request)
							.then(function (response) {
								caches.open(apiCaches).then(function(cache){
									cache.put(event.request,networkResponse)
								})
								console.log('%c##Service Worker##',
									'background: #FF9800	; color: #fff',
									'Network request completed and updated the Cache for ', event.request.url,
									'with Reponse', response);

								return networkResponse.clone();
							});
					})
					.catch(function(error){
						console.log('Error while fetch for api ====> ',error)
						return caches.match(event.request)
							.then(function (response) {
								if (response) {
									console.log('Found ', event.request.url, ' in cache');
									return response;
								}


							});
					})
			)
		} 
		//Cache first and then Network Strategy
		else {
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
		}
  });

})();
