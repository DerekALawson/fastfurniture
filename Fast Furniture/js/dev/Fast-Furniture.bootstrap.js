

var lsCache = l2Storeagecache(),
	ve = simpleViewEngine({
		"appName": "Fast-Furniture",
		"appPrefix": "Fast-Furniture-"
	}),
	pm = SPAPM({
		viewEngine: ve,
		cache: lsCache,
		"appPrefix": "Fast-Furniture-"
	}),


	fastFurnitureData = new FastFurnitureData(/* http, */ lsCache),

	// the analytics global is assumed to be instantiated via Segment.io snippet

	fastFurniture = FastFurniture({
	    services: {
	        "viewEngine": ve,
	        "Fast-FurnitureData": fastFurnitureData
	}
	});

fastFurniture.appKey = "Fast-Furniture-";

pm.setupAssets();


_spa = SPA({
    "AppContext": fastFurniture,
	"viewEngine": ve,
	"pm": pm,
	"viewSelector": "[type='text/x-simpleTemplate-template']",
	"defaultPage": "index",
	"viewWrapper": "#main",
	"viewTransition": "slide",
	"defaultTitle": "Fast Furniture"
});

pm.loadImport("home/deferred", "deferred");
