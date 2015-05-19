﻿
;

(function (window, undefined) {

    "use strict";

    var menuItems = {
        topMenu: [
            {
                title: "home",
                iconClass: "home-icon",
                url: "#!"
            },
            {
                title: "categories",
                iconClass: "categories-icon",
                url: "#!categories"
            }
            , {
                title: "search",
                iconClass: "icon-search",
                url: "#!search"
            }, {
                title: "contact",
                iconClass: "contact-icon",
                url: "#!contact"
            }
        ],
        subMenu: [
             {
                 title: "living room",
                 url: "#!category/Living-Room"
             }
             , {
                 title: "dinning room",
                 url: "#!category/dinning-room"
             }
             , {
                 title: "office",
                 url: "#!category/Office"
             }
            , {
                title: "bedroom",
                url: "#!category/bedroom"
            }
            ,
            {
                title: "privacy",
                url: "#!s/privacy"
            }
        ]
    };

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

            toolbar(".toolbar", {
                menuItems: menuItems
            });


            app.setupHamburger();


            return app;
        },

        parsingEnd: function () {

            this.setupMenu();

        },

        setupHamburger: function () {

            deeptissue(".hamburger-nav, .left-panel").tap(function () {
                requestAnimationFrame(function () {

                    $("body").toggleClass("expand-menu");

                });
            });

            //deeptissue(".left-panel").tap(function () {

            //    $("body").toggleClass("expand-menu");

            //});


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






