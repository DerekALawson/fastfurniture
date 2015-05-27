;
//simpleViewEngine is a deferred content management library with single page and mobile applications in mind
(function (window, undefined) {

	"use strict";

	//todo:allow passing cache provider

	var simpleViewEngine = function (settings) {

		return new simpleViewEngine.fn.init(settings);

	};

	simpleViewEngine.fn = simpleViewEngine.prototype = {

		constructor: simpleViewEngine,

		init: function (settings) {

			var viewEngine = this,
				setting;

			for (setting in settings) {
				viewEngine[setting] = settings[setting];
			}

			return viewEngine;
		},

		version: "0.0.2",

		appName : "spa app",
		appPrefix : "spaApp-",
		cache: undefined,

		ViewSelector: "script[class='spa-view']",
		LayoutSelector: "script[class='spa-layout']",
		cssSelector: "script[type='x-spa-css']",
		scriptSelector: "script[type='x-spa-js']",
		TemplateSelector: "[type='text/x-simpleTemplate-template']",

		scriptLoadingState: 0,

		assetsComplete: function () { },

		getAttributeDefault: function (ele, attr, def) {

		    return (ele.hasAttribute(attr) ? ele.getAttribute(attr) : def);

		},

		createFragment: function (htmlStr) {

		    var// frag = document.createDocumentFragment(),
				temp = document.createElement("div");

		    temp.innerHTML = htmlStr;

		    //            frag.appendChild(temp);

		    return temp;
		},

		loadImport: function (ImportURL, moduleName) {

		    var viewEngine = this;

		    viewEngine.getImport(ImportURL, function (content) {

		        viewEngine.processSPA(content, moduleName);

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

	    //this calls the parseViews, parseScripts and parseCSS functions.
		processSPA: function (content, moduleName, callback) {

		    if (typeof content === "function") {
		        callback = content;
		        content = undefined;
		    }

		    this.parseViews(content, true);
		    this.parseCSS(content);
		    this.parseScripts(content);
		    this.parseTemplates(content, true);

		    if (callback) {
		        callback();
		    }

		},

	    /*
         * Adds previously cached asset references to the DOM
         */
		setupAssets: function (done) {

		    var viewEngine = this,
				asset,
				scriptRefs = viewEngine.cache.getObject(viewEngine.appPrefix + "-scripts"),
				cssRefs = viewEngine.cache.getObject(viewEngine.appPrefix + "-css");

		    viewEngine.assetsComplete = done;

		    for (asset in scriptRefs) {
		        viewEngine.appendScript(scriptRefs[asset]);
		    }

		    for (asset in cssRefs) {
		        viewEngine.appendCSS(cssRefs[asset]);
		    }

//		    if (viewEngine.scriptLoadingState === 0 && viewEngine.assetsComplete) {
		        viewEngine.assetsComplete();
	//	    }

		},


	    /*
         * View Processing
         */

		parseViews: function (html, remove) {

		    var viewEngine = this,
				i, temp, viewMarkup,
				views = viewEngine.cache.getObject(viewEngine.appPrefix + "views") || {},
				ele = document,
				t;

		    if (remove === undefined) {
		        remove = true;
		    }

		    if (html !== undefined && typeof html !== "string") {

		        if (typeof html === "boolean") {
		            remove = html;
		        } else {
		            html = undefined;
		        }

		    }

		    if (typeof html === "string") {

		        ele = document.createElement("div");
		        ele.innerHTML = html;

		    }

		    t = ele.querySelectorAll(viewEngine.ViewSelector + ", " + viewEngine.LayoutSelector);

		    viewEngine.setupRoutes(t);

		    for (i = 0; i < t.length; i++) {

		        temp = t[i];

		        //remove whitespace to save space
		        viewMarkup = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

		        views[temp.id] = viewMarkup;

		        if (remove === true) {

		            if (temp.parentNode) {
		                temp.parentNode.removeChild(temp);
		            }

		        }

		    }

		    viewEngine.cache.setObject(viewEngine.appPrefix + "views", views);

		},

		getView: function (viewId) {

		    var views = this.cache.getObject(this.appPrefix + "views") || {};

		    return views[viewId];

		},


	    /*
         * Template Management
         */

		parseTemplates: function (html, remove) {

		    var viewEngine = this,
                temp, viewMarkup,
                temps = [],
                ele = document,
                templates = viewEngine.getTemplates();

		    if (typeof html === "string") {

		        ele = document.createElement("div");
		        ele.innerHTML = html;

		    }


		    temps = ele.querySelectorAll(viewEngine.TemplateSelector);
            
		    //todo: refactor to common function with above loop
		    for (var i = 0; i < temps.length; i++) {

		        temp = temps[i];
		        viewMarkup = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

		        templates[temp.id] = viewMarkup;

		        if (remove === true) {

		            if (temp.parentNode) {
		                temp.parentNode.removeChild(temp);
		            }

		        }

		    }

		    viewEngine.cache.setObject(viewEngine.appPrefix + "templates", templates);

		},

		getTemplates: function () {
		    return this.cache.getObject(this.appPrefix + "templates") || {};
		},

		getTemplate: function (tempName) {

		    var templates = JSON.parse(localStorage.getItem(this.appPrefix + "templates")) || {};

		    return templates[tempName];
		},


	    /*
         * CSS Processing
         */

		parseCSS: function (css) {

		    var viewEngine = this,
                cssRefs = viewEngine.cache.getObject(viewEngine.appPrefix + -"css") || {},
                cssObjs = {};

		    if (!css) {

		        css = document.querySelector(viewEngine.cssSelector);

		        if (!css) {
		            return;
		        }
		    }

		    if (typeof css === "string") {
		        var temp = document.createElement("div");

		        temp.innerHTML = css;
		        css = temp.querySelector(viewEngine.cssSelector);

		    }

		    if (css.innerHTML !== "") {

		        cssObjs = JSON.parse(css.innerHTML);

		    }

		    cssRefs = $.extend(cssRefs, cssObjs);

		    for (var ref in cssRefs) {
		        viewEngine.appendCSS(cssRefs[ref]);
		    }

		    viewEngine.cache.setObject(viewEngine.appPrefix + -"css", cssRefs);

		},

		appendCSS: function (cssObj) {

		    var viewEngine = this,
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


	    /*
         * JavaScript Processing
         */

		parseScripts: function (scripts) {

		    var viewEngine = this,
				scriptRefs = viewEngine.cache.getObject(viewEngine.appPrefix + "-scripts") || {},
			    jsObjs = {};

		    if (!scripts) {

		        scripts = document.querySelector(viewEngine.scriptSelector);

		        if (!scripts) {
		            return;
		        }
		    }   

		    if (typeof scripts === "string") {
		        var temp = document.createElement("div");

		        temp.innerHTML = scripts;
		        scripts = temp.querySelector(viewEngine.scriptSelector);

		    }

		    if (scripts.innerHTML !== "") {

		        jsObjs = JSON.parse(scripts.innerHTML);

		    }

		    scriptRefs = $.extend(scriptRefs, jsObjs);

		    for (var ref in scriptRefs) {
		        viewEngine.appendScript(scriptRefs[ref]);
		    }

		    viewEngine.cache.setObject(viewEngine.appPrefix + "-scripts", jsObjs);

		},

		appendScript: function (src) {

		    var viewEngine = this,
				script;

		    if (!document.getElementById(src.id)) {

		        viewEngine.scriptLoadingState += 1;

		        script = document.createElement("script");

		        script.id = src.id;
		        script.src = src.url;

		        script.onload = function (e) {

		            viewEngine.scriptLoadingState -= 1;

		            //console.log("viewEngine.scriptLoadingState : ", viewEngine.scriptLoadingState);

		            //if (viewEngine.scriptLoadingState === 0 && viewEngine.assetsComplete) {
		            //    viewEngine.assetsComplete();
		            //}

		        };

		        document.body.appendChild(script);

		    }

		},

	    /*
         * Routes
         */

		setupRoutes: function (views) {

		    var viewEngine = this,
				routes = viewEngine.getRoutes(),
				i = 0,
				rawPath, view, route, viewId;

		    if (views.length === undefined) {
		        views = [views];
		    }

		    for (; i < views.length; i++) {

		        view = views[i];

		        if (view.hasAttributes() && view.hasAttribute("id")) {

		            viewId = view.getAttribute("id");
		            rawPath = viewEngine.getAttributeDefault(view, "spa-route", "");

		            route = viewEngine.createRoute(viewId, rawPath, view);

		            if (route) {

		                routes[route.path] = route;

		            }

		        }

		    }

		    viewEngine.cache.setObject(viewEngine.appPrefix + "routes", routes);

		},

		createRoute: function (viewId, rawPath, view) {

		    //need to check for duplicate path
		    var viewEngine = this,
				route = {
				    viewId: viewId,
				    viewModule: viewEngine.getAttributeDefault(view, "spa-module", viewId),
				    path: rawPath.split("/:")[0],
				    params: rawPath.split("/:").slice(1),
				    spaViewId: viewEngine.getAttributeDefault(view, "spa-view-id", "#" + viewId),
				    title: viewEngine.getAttributeDefault(view, "spa-title", ""),
				    viewType: viewEngine.getAttributeDefault(view, "spa-view-type", "view"),
				    layout: viewEngine.getAttributeDefault(view, "spa-layout", undefined),
				    transition: viewEngine.getAttributeDefault(view, "spa-transition", ""),
				    paramValues: {},
				    beforeonload: viewEngine.getAttributeDefault(view, "spa-beforeonload", undefined),
				    onload: viewEngine.getAttributeDefault(view, "spa-onload", undefined),
				    afteronload: viewEngine.getAttributeDefault(view, "spa-afteronload", undefined),
				    beforeunload: viewEngine.getAttributeDefault(view, "spa-beforeunload", undefined),
				    unload: viewEngine.getAttributeDefault(view, "spa-unload", undefined),
				    afterunload: viewEngine.getAttributeDefault(view, "spa-afterunload", undefined)
				};

		    if (route.viewType === "view") {

		        return route;

		    }

		},

		getRoutes: function () {

		    return JSON.parse(localStorage.getItem(this.appPrefix + "routes")) || {};
		},


	    /*
         * 
         * engine specific code goes here
         * 
         * 
         */


		render: function (html, data) {

			var re = /<%([^%>]+)?%>/g,
				reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
				code = 'var r=[];\n',
				cursor = 0,
				match,

				add = function (line, js) {

					js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
						(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
					return add;
				}

			while (match = re.exec(html)) {
				add(html.slice(cursor, match.index))(match[1], true);
				cursor = match.index + match[0].length;
			}

			add(html.substr(cursor, html.length - cursor));
			code += 'return r.join("");';

			return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
	
		},

		bind: function (options, start) {

		    if ((typeof options.targetSelector !== "string") ||
			   (typeof options.templateName !== "string") ||
				options.data === undefined) {

				throw new Error("missing argument in mergeData");

				return;
			}

			var viewEngine = this,
				t = document.querySelector(options.targetSelector),
			    templates = viewEngine.getTemplates();

			if (!t) {
			    console.error("could not find view engine target ", options.targetSelector);
				return;
			}

			//verify it is a single node.
			if (t.length && t.length > 0) {
				t = t[0];
			}

			if (templates[options.templateName]) {

				requestAnimationFrame(function () {

				    t.innerHTML = viewEngine.render(templates[options.templateName], options.data);

				    if (start) {

				        console.log("template ", options.templateName, " rendered in ms: ", window.performance.now() - start);

				    }

                    //need a callback here because we are adding markup in the RAF, so we loose synchronous path.
				    if (options.callback) {
				        options.callback();
				    }
				});

			}

		}

	};

	// Give the init function the simpleViewEngine prototype for later instantiation
	simpleViewEngine.fn.init.prototype = simpleViewEngine.fn;

	return (window.simpleViewEngine = simpleViewEngine);

})(window);
