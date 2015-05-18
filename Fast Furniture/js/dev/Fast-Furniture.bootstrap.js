

var lsCache = l2Storeagecache(),
	ve = simpleViewEngine({
	    "appName": "Fast-Furniture",
	    "appPrefix": "Fast-Furniture-",
	    cache: lsCache
	}),

	fastFurnitureData = new FastFurnitureData(/* http, */ lsCache),

	// the analytics global is assumed to be instantiated via Segment.io snippet

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

    ve.loadImport("home/deferred", "deferred");

});


//window.addEventListener("DOMContentLoaded", function () {});

