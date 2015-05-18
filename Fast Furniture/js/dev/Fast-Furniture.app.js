
;

(function (window, undefined) {

    "use strict";

    var FastFurniture = function (customSettings) {

        return new FastFurniture.fn.init(customSettings);

    };

    FastFurniture.fn = FastFurniture.prototype = {

        constructor: FastFurniture,

        init: function (config) {

            var app = this;

            if (config && config.services) {

                app.parseServices(config.services);

            }

            app.setupHamburger();


            return app;
        },

        parsingEnd: function () {

            this.setupMenu();

        },

        setupHamburger: function () {

            deeptissue(".hamburger-nav").tap(function () {
                requestAnimationFrame(function () {

                    $("body").toggleClass("expand-menu");

                });
            });


        },

        setupMenu: function () {

            var menu = [
                        {
                            "Name": "Home",
                            "Slug": "",
                            "icon": "home-icon"
                        },
                        {
                            "Name": "Categories",
                            "Slug": "categories",
                            "icon": "categories-icon",
                            "children": []
                        },
                        {
                            "Name": "Login",
                            "Slug": "login",
                            "icon": "login-icon"
                        },
                        {
                            "Name": "Privacy",
                            "Slug": "privacy",
                            "icon": "home-icon"
                        },
                        {
                            "Name": "About",
                            "Slug": "about",
                            "icon": "home-icon"
                        },
                        {
                            "Name": "Contact",
                            "Slug": "contact",
                            "icon": "home-icon"
                        }

            ];

            ve.bind({
                targetSelector: ".main-nav",
                templateName: "menuItem",
                data: { menu: menu }
            });


        },

        parseServices: function (services) {

            for (var service in services) {

                if (typeof services[service] === "function") {
                    this[service] = new services[service]();
                } else {
                    this[service] = services[service];
                }

            }

        },


        version: "0.0.1"
    };


    // Give the init function the FastFurniture prototype for later instantiation
    FastFurniture.fn.init.prototype = FastFurniture.fn;

    return (window.FastFurniture = FastFurniture);

}(window));






