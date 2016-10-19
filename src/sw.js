var cacheName = 'fast-furninture-app';
var filesToCache = [
  "index.html",
  "Fast-Furniture-600x310.png",
  "css/libs/spa.css",
  "css/libs/app.css",
  "css/libs/ui/preloader.css",
  "css/libs/ui/toolbar.css",
  "css/libs/ui/touch.css",
  "css/dev/core/grid.css",
  "css/dev/core/list.css",
  "css/dev/core/typography.css",
  "css/dev/core/form.css",
  "css/dev/core/buttons.css",
  "css/dev/core/code.css",
  "css/dev/ui/action-menu.css",
  "css/dev/ui/animations.css",
  "css/dev/ui/grid.css",
  "css/dev/ui/hamburger.css",
  "css/dev/ui/loader.css",
  "css/dev/ui/navigation.css",
  "css/dev/ui/search.css",
  "css/dev/ui/social.css",
  "css/dev/ui/typography.css",
  "css/dev/views/categories.css",
  "css/dev/views/category.css",
  "css/dev/views/forgotemail.css",
  "css/dev/views/forgotpassword.css",
  "css/dev/views/home.css",
  "css/dev/views/login.css",
  "css/dev/views/NotFound.css",
  "css/dev/views/product.css",
  "css/dev/views/search.css",
  "js/libs/spa.js", "js/libs/class.js", "js/libs/controller.js", "js/libs/dollarbill.min.js", "js/libs/simpleViewEngine.js", "js/libs/l2Storagecache.js", "js/libs/authenticate.js", "js/libs/deeptissue.js", "js/libs/ui/toolbar.min.js", "js/libs/ui/modal.js", "js/libs/ui/preloader.js", "js/libs/ui/pop-up-promotional.js", "js/libs/ajax.js", "js/dev/services/Fast-Furniture.data.js", "js/dev/Fast-Furniture.app.js", "js/dev/fastFurnitureController.js", "js/dev/fastFurnitureAuthenticatedController.js", "js/dev/controllers/categories.js", "js/dev/controllers/category.js", "js/dev/controllers/forgotemail.js", "js/dev/controllers/forgotpassword.js", "js/dev/controllers/home.js", "js/dev/controllers/login.js", "js/dev/controllers/NotFound.js", "js/dev/controllers/product.js", "js/dev/controllers/search.js", "js/dev/Fast-Furniture.bootstrap.js"
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache).catch(function (error) {

        console.log(error);

      });
    })
  );

  self.skipWaiting();

});

self.addEventListener('activate', function (event) {
  console.log('Service Worker activating.');
});


function writeHeaders(resp) {

  if (resp) {

    var headers = resp.headers,
      values = headers.keys();

    for (var value of values) {
      console.log(value, ": ", headers.get(value));
    }

  }

}

function cacheRequest(cacheName, event, response) {

  caches.open(cacheName).then(function (cache) {
    cache.put(event.request, response);
  })
    .catch(function (e) {

      console.log("error: ", event.request);

    });

}

function fetchAsset(event) {

  if (event.request) {

    return fetch(event.request).then(function (response) {

      cacheRequest("v1", event, response.clone());

      return response;

    }).catch(function (exc) {

      console.error("failed fetching ", event.request.url, " : ", exc);

    });

  }

}


function isNewerVersion(request, response) {

  var previousModified = new Date(request.headers.get("last-modified")),
    lastModified = new Date(response.headers.get("last-modified"));

  return (lastModified > previousModified);

}


function getLocation(href) {

  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}

self.addEventListener('fetch', function (event) {


  // var url = getLocation(event.request.url);

  // if (url && url.pathname === "/") {

  //   event.request.url += "index.html";

  // }

  //intercept fetch request (any request from the UI thread for a file or API) and return from cache or get from server & cache it
  event.respondWith(

    caches.match(event.request).then(function (resp) {

      //catch this so we wont waste resources on an obvious exception state
      if (resp && event.request.mode !== "navigate") {

        //make sure we get the latest version for the cache.
        //it will be available the next time it is requested
        fetch(event.request, {
          method: "HEAD"
        })
          .then(function (response) {

            if (isNewerVersion(event.request, response.clone())) {

              fetchAsset(event);

            }

          });

      }

      return resp || fetchAsset(event);

    })

  );

});