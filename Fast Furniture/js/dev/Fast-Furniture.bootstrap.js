//kicks off the application

var appPrefix = "Fast-Furniture-",
    lsCache = l2Storeagecache(),
    ajax = new AJAX(lsCache, appPrefix),
	ve = simpleViewEngine({
	    "appName": "Fast-Furniture",
	    "appPrefix": "Fast-Furniture-",
	    cache: lsCache
	}),
    auth = new Authenticate({
        ajax: ajax,
        cache: lsCache,
        appPrefix: appPrefix,
        provider: "Auth0"
    });

fastFurnitureData = new FastFurnitureData(lsCache, appPrefix),

	fastFurniture = FastFurniture();
    
fastFurniture.appKey = appPrefix;

ve.setupAssets(function () {

    _spa = SPA({
        "AppContext": fastFurniture,
        "viewEngine": ve,
        "auth": auth,
        "defaultPage": "index",
        "viewWrapper": "#main",
        "viewTransition": "slide",
        "defaultTitle": "Fast Furniture"
    });

    ve.loadImport("deferred.html", "deferred");

});
