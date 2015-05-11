(function (window, undefined) {

    "use strict";

    /*
	 * initial load grabs module definitions
	 * loops through them and stamps references to scripts and CSS in DOM
	 * views are just views and processed like we have been.
	 * when a script or CSS is stampped ensure the reference has not already been added
	 *	this will involve checking the id and the target URL.
	 * allow script to be added in a deferred mannor so they can be lazy loaded
	 * assets do not need to added as the application flows by default
	 * they can be loaded up front.
	 * however there should be a mechanism to load them as the user
	 * opens views in modules. no sense in loading assets for a module that is rarely used
	 * all the time.
	 * 
	 */

    var SPAPM = function (settings) {

        return new SPAPM.fn.init(settings);

    };

    SPAPM.fn = SPAPM.prototype = {

        constructor: SPAPM,

        init: function (settings) {

            var pm = this;

            if (!settings) {
                settings = {};
            }

            //these are required
            pm.viewEngine = settings.viewEngine;
            pm.cache = settings.cache;

            if (settings.ViewSelector) {

                ViewSelector: settings.ViewSelector;

            }

            if (settings.cssSelector) {

                cssSelector: settings.cssSelector;

            }

            if (settings.scriptSelector) {

                scriptSelector: settings.scriptSelector;

            }

            if (settings.appPrefix) {
                pm.appPrefix = settings.appPrefix;
            }

            return pm;
        },

        version: "0.0.1",

        viewEngine: undefined,
        cache: undefined,

        mainWrappperSelector: "main",
        currentClass: "current",
        appPrefix: "SPAapp-",


        ViewSelector: "script[class='spa-view']",
        LayoutSelector: "script[class='spa-layout']",
        cssSelector: "script[type='x-spa-css']",
        scriptSelector: "script[type='x-spa-js']",
        TemplateSelector: "[type='text/x-simpleTemplate-template']",

        views: {},
        templates: {},

        loadImport: function (ImportURL, moduleName) {

            var pm = this;

            pm.getImport(ImportURL, function (content) {

                pm.parseImport(content, moduleName);

            });

        },

        getImport: function (route, callback) {

            var request = new XMLHttpRequest();
            request.open('GET', route, true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var resp = request.responseText.replace(/(\r\n|\n|\r)/gm, "");

                    if (callback) {
                        callback(resp);
                    }

                } else {
                    // We reached our target server, but it returned an error

                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();

        },

        parseImport: function (content, moduleName) {

            var pm = this,
				moduleDef = {
				    name: moduleName
				},
				module = document.createElement("div");

            module.innerHTML = content;

            moduleDef.Views = pm.processViews(module.querySelectorAll(pm.ViewSelector +
													", " + pm.LayoutSelector), moduleName);

            moduleDef.scripts = pm.processScripts(module.querySelector(pm.scriptSelector), moduleName);

            moduleDef.css = pm.processCSS(module.querySelector(pm.cssSelector), moduleName);

            pm.processTemplates(module.querySelectorAll(pm.TemplateSelector));

            pm.cache.setObject("spa-module-" + moduleName, moduleDef, +new Date() + 86400000000); //long long time in the future

        },

        processViews: function (moduleViews, moduleName) {

            var pm = this,
				ele = document.createElement("div");

            for (var i = 0; i < moduleViews.length; i++) {

                ele.appendChild(moduleViews[i]);

            }

            pm.viewEngine.parseViews(ele.innerHTML);

            pm.setupRoutes(moduleViews);

        },

        processTemplates: function (temps) {

            var pm = this,
                temp, viewMarkup;

                pm.templates = JSON.parse(localStorage.getItem(pm.appPrefix + "templates")) || {};

            //todo: refactor to common function with above loop
            for (var i = 0; i < temps.length; i++) {

                temp = temps[i];
                viewMarkup = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

                pm.templates[temp.id] = viewMarkup;

                localStorage.setItem(pm.appPrefix + "templates", JSON.stringify(pm.templates));

                pm.viewEngine.getTemplates();

//                if (remove === true) {

                    if (temp.parentNode) {
                        temp.parentNode.removeChild(temp);
                    }

        //        }

            }

        },
        
        processCSS: function (css) {

            var pm = this,
				cssRefs = pm.cache.getObject(pm.appPrefix + -"css") || {},
			    cssObjs = {};

            if (!css) {
                return;
            }

            if (css.innerHTML !== "") {

                cssObjs = JSON.parse(css.innerHTML);

            }

            cssRefs = $.extend(cssRefs, cssObjs);

            for (var ref in cssRefs) {
                pm.appendCSS(cssRefs[ref]);
            }

            pm.cache.setObject(pm.appPrefix + -"css", cssRefs);

        },

        appendCSS: function (cssObj) {

            var pm = this,
				cssLink;

            if (!document.getElementById(cssObj.id)) {

                cssLink = document.createElement("link");

                cssLink.id = cssObj.id;

                cssLink.rel = "stylesheet";
                cssLink.type = "text/css";
                cssLink.href = cssObj.url;

                document.head.appendChild(cssLink);

            }

        },

        processScripts: function (scripts) {

            var pm = this,
				scriptRefs = pm.cache.getObject(pm.appPrefix + "-scripts") || {},
			    jsObjs = {};

            if (!scripts) {
                return;
            }

            if (scripts.innerHTML !== "") {

                jsObjs = JSON.parse(scripts.innerHTML);

            }

            scriptRefs = $.extend(scriptRefs, jsObjs);

            for (var ref in scriptRefs) {
                pm.appendScript(scriptRefs[ref]);
            }

            pm.cache.setObject(pm.appPrefix + "-scripts", jsObjs);

        },

        appendScript: function (src) {

            var pm = this,
				script;

            if (!document.getElementById(src.id)) {

                pm.scriptLoadingState += 1;

                script = document.createElement("script");

                script.id = src.id;
                script.src = src.url;

                script.onload = function () {

                    pm.scriptLoadingState -= 1;

                    if (pm.scriptLoadingState === 0 && pm.assetsComplete) {
                        pm.assetsComplete();
                    }

                };


                document.body.appendChild(script);

            }

        },

        scriptLoadingState: 0,

        assetsComplete: function () { },

        setupAssets: function (done) {

            var pm = this,
				asset,
				scriptRefs = pm.cache.getObject(pm.appPrefix + "-scripts"),
				cssRefs = pm.cache.getObject(pm.appPrefix + "-css");

            pm.assetsComplete = done;

            for (asset in scriptRefs) {
                pm.appendScript(scriptRefs[asset]);
            }

            for (asset in cssRefs) {
                pm.appendCSS(cssRefs[asset]);
            }

            if (pm.scriptLoadingState === 0 && pm.assetsComplete) {
                pm.assetsComplete();
            }
        },

        getAttributeDefault: function (ele, attr, def) {

            return (ele.hasAttribute(attr) ? ele.getAttribute(attr) : def);

        },

        getRoutes: function () {

            return JSON.parse(localStorage.getItem(this.appPrefix + "routes")) || {};
        },

        setRoutes: function (routes) {

            localStorage.setItem(this.appPrefix + "routes", JSON.stringify(routes));
        },

        setupRoutes: function (views) {

            var pm = this,
				routes = pm.getRoutes(),
				i = 0,
				rawPath, view, route, viewId;

            if (views.length === undefined) {
                views = [views];
            }

            for (; i < views.length; i++) {

                view = views[i];

                if (view.hasAttributes() && view.hasAttribute("id")) {

                    viewId = view.getAttribute("id");
                    rawPath = pm.getAttributeDefault(view, "spa-route", "");

                    route = pm.createRoute(viewId, rawPath, view);

                    if (route) {

                        routes[route.path] = route;

                    }

                }

            }

            pm.setRoutes(routes);

        },

        createRoute: function (viewId, rawPath, view) {

            //need to check for duplicate path
            var pm = this,
				route = {
				    viewId: viewId,
				    viewModule: pm.getAttributeDefault(view, "spa-module", viewId),
				    path: rawPath.split("/:")[0],
				    params: rawPath.split("/:").slice(1),
				    spaViewId: pm.getAttributeDefault(view, "spa-view-id", "#" + viewId),
				    title: pm.getAttributeDefault(view, "spa-title", ""),
				    viewType: pm.getAttributeDefault(view, "spa-view-type", "view"),
				    layout: pm.getAttributeDefault(view, "spa-layout", undefined),
				    transition: pm.getAttributeDefault(view, "spa-transition", ""),
				    paramValues: {},
				    beforeonload: pm.getAttributeDefault(view, "spa-beforeonload", undefined),
				    onload: pm.getAttributeDefault(view, "spa-onload", undefined),
				    afteronload: pm.getAttributeDefault(view, "spa-afteronload", undefined),
				    beforeunload: pm.getAttributeDefault(view, "spa-beforeunload", undefined),
				    unload: pm.getAttributeDefault(view, "spa-unload", undefined),
				    afterunload: pm.getAttributeDefault(view, "spa-afterunload", undefined)
				};

            if (route.viewType === "view") {

                return route;

            }

        }


    };

    // Give the init function the spapm prototype for later instantiation
    SPAPM.fn.init.prototype = SPAPM.fn;

    return (window.SPAPM = SPAPM);


}(window));