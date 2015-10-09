//kicks off the application

var lsCache = l2Storeagecache(),
	ve = simpleViewEngine({
	    "appName": "Fast-Furniture",
	    "appPrefix": "Fast-Furniture-",
	    cache: lsCache
	}),

	fastFurnitureData = new FastFurnitureData(lsCache),

	fastFurniture = FastFurniture();
    
fastFurniture.appKey = "Fast-Furniture-";

ve.setupAssets(function () {

    _spa = SPA({
        "AppContext": fastFurniture,
        "viewEngine": ve,
        "viewSelector": "[type='text/x-simpleTemplate-template']",
        "defaultPage": "index",
        "viewWrapper": "#main",
        "viewTransition": "slide",
        "defaultTitle": "Fast Furniture"
    });

    ve.loadImport("deferred.html", "deferred");

});
