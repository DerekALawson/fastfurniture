//kicks off the application

;

(function (window, undefined) {

    "use strict";


    var appPrefix = "Fast-Furniture-",
        appConfig = {
            "environment": "dev"
        },
        lsCache = l2Storeagecache(),
        data = new FastFurnitureData(lsCache, appPrefix),
        ve = simpleViewEngine({
            "appName": "Fast-Furniture",
            "appPrefix": "Fast-Furniture-",
            cache: lsCache
        }),

        fastFurniture = FastFurniture({
            appPrefix: appPrefix,
            appKey: appPrefix,
            "services": {
                "viewEngine": ve,
                "data": data,
                "auth": new Authenticate({
                    ajax: data,
                    cache: lsCache,
                    appPrefix: appPrefix,
                    provider: "Auth0"
                })
            }
        });


    ve.setupAssets(function () {

        ve.processSPA(function () {

            SPA({
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

} (window));