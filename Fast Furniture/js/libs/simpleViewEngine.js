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

			viewEngine.views = JSON.parse(localStorage.getItem(viewEngine.appPrefix + "views"));

			if (!viewEngine.views) {
				viewEngine.views = {};
			}

			for (setting in settings) {
				viewEngine[setting] = settings[setting];
			}


			return viewEngine;
		},

		version: "0.0.1",

		bp: undefined,
		eventPrefix: "spa-",
		$rootScope: undefined,
		templateService: undefined,
		ViewSelector: "script[class='spa-view']",
		LayoutSelector: "script[class='spa-layout']",
		TemplateSelector: "[type='text/x-simpleTemplate-template']",
		appPrefix: "spaApp-",

		views: {},
		templates: {},


		parseViews: function (html, remove) {

			var viewEngine = this,
				i, temp, viewMarkup,
				views = JSON.parse(localStorage.getItem(viewEngine.appPrefix + "views")) || {},
				templates = JSON.parse(localStorage.getItem(viewEngine.appPrefix + "templates")) || {},
				ele = document,
				t, temps;

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

			temps = ele.querySelectorAll(viewEngine.TemplateSelector);

			for (i = 0; i < t.length; i++) {

				temp = t[i];
				viewMarkup = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

				views[temp.id] = viewMarkup;

				if (remove === true) {

					if (temp.parentNode) {
						temp.parentNode.removeChild(temp);
					}

				}

			}

			viewEngine.setViews(views);
			viewEngine.saveViews();

			//todo: refactor to common function with above loop
			for (i = 0; i < temps.length; i++) {

				temp = temps[i];
				viewMarkup = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

				templates[temp.id] = viewMarkup;

			}

			viewEngine.setTemplates(templates);
			viewEngine.saveTemplates();

		},

		createChildView: function (route) {

			//only return the layout and the child view if the layout does not already exist.

			var simpleViewEngine = this,
				layout,
				view,
				viewAnchor;

			layout = simpleViewEngine.views[route.layout];

			if (layout) {

				layout = simpleViewEngine.createFragment(layout);

				viewAnchor = layout.querySelector(".spa-child-view");

				if (viewAnchor) {
					viewAnchor.innerHTML = simpleViewEngine.views[route.viewId];
				}

				return layout.innerHTML;
			} else {

				view = simpleViewEngine.createFragment(simpleViewEngine.views[route.viewId]);
				return view.innerHTML;
			}

			return;

		},

		createFragment: function (htmlStr) {

			var// frag = document.createDocumentFragment(),
				temp = document.createElement("div");

			temp.innerHTML = htmlStr;

			//            frag.appendChild(temp);

			return temp;
		},

		getView: function (viewId) {

			var viewEngine = this;

			//if (route.layout) {

			//	return viewEngine.createChildView(route);

			//} else {

			return viewEngine.views[viewId];

			//			}

		},

		getViews: function () {
			return this.views
		},

		setView: function (viewId, view) {

			if (typeof view === "string") {
				this.views[viewId] = view;
			}

		},

		setViews: function (views) {

			var that = this,
				view;

			for (view in views) {
				that.setView(view, views[view]);
			}

		},

		compileViews: function (views) {

			var that = this,
				i;

			if (views === undefined || views.length === 0) {
				that.parseViews();
				views = that.getViews();
			}

			for (i in views) {
				if (typeof views[i] === "function") {
					views[i] = views[i];
				} else {
					views[i] = views[i];
				}
			}

		},

		addViews: function (views) {

			var that = this,
				name, copy;

			for (name in views) {
				//  src = target[name];
				copy = views[name];

				// Prevent never-ending loop
				if (that.views === copy) {
					continue;
				}

				if (copy !== undefined) {
					that.views[name] = copy;
				}
			}

			that.saveViews();

		},

		saveViews: function () {

			var that = this;

			localStorage.setItem(that.appPrefix + "views", JSON.stringify(that.views));

		},

		setTemplate: function (templateId, template) {

			if (typeof template === "string") {
				this.templates[templateId] = template;
			}

		},

		setTemplates: function (templates) {

			var that = this,
				template;

			for (template in templates) {
				that.setTemplate(template, templates[template]);
			}

		},


		saveTemplates: function () {

			var that = this;

			localStorage.setItem(that.appPrefix + "templates", JSON.stringify(that.templates));

		},


		removeView: function (key) {

			delete this.views[key];

		},

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

		bind: function (targetSelector, templateName, data) {

			if ((typeof targetSelector !== "string") ||
			   (typeof templateName !== "string") ||
				data === undefined) {

				throw new Error("missing argument in mergeData");

				return;
			}

			var that = this,
				t = document.querySelector(targetSelector);

			if (!t) {
				console.error("could not find view engine target ", targetSelector);
				return;
			}

			//verify it is a single node.
			if (t.length && t.length > 0) {
				t = t[0];
			}

			if (that.templates[templateName]) {

				requestAnimationFrame(function () {

					t.innerHTML = that.render(that.templates[templateName], data);

				});

			}

		}

	};

	// Give the init function the simpleViewEngine prototype for later instantiation
	simpleViewEngine.fn.init.prototype = simpleViewEngine.fn;

	return (window.simpleViewEngine = simpleViewEngine);

})(window);
