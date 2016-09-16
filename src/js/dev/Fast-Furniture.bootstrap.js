//kicks off the application

var appPrefix = "Fast-Furniture-",
    appConfig = {
        "environment": "dev"
    },
    lsCache = l2Storeagecache(),
    ajax = new AJAX({
        cache: lsCache,
        appKey: appPrefix,
        API_ROOT: "data/"
    }),
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

    fastFurniture = FastFurniture({
        appPrefix: appPrefix,
        appKey: appPrefix,
        "services": {
            "viewEngine": ve
        }
    });


ve.setupAssets(function () {

    ve.processSPA(function () {

        _spa = SPA({
            "AppContext": fastFurniture,
            "viewEngine": ve,
            "viewSelector": "[type='text/x--template']",
            "defaultPage": "index",
            "viewWrapper": "#main",
            "viewTransition": "slide",
            "defaultTitle": "Fast Furniture"
        });

    });


});
