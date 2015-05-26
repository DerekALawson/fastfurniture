
;

(function (window, undefined) {

    "use strict";

    var menuItems = {
        topMenu: [
            {
                title: "home",
                iconClass: "icon-home",
                url: "#!"
            },
            {
                title: "categories",
                iconClass: "icon-tags",
                url: "#!categories"
            }
            , {
                title: "search",
                iconClass: "icon-search",
                url: "#!search"
            }, {
                title: "contact",
                iconClass: "icon-mail-alt",
                url: "#!contact"
            }
        ],
        subMenu: [
             {
                 title: "living room",
                 url: "#!category/Living-Room"
             }
             , {
                 title: "dining room",
                 url: "#!category/dining"
             }
             , {
                 title: "office",
                 url: "#!category/Office"
             }
            , {
                title: "bedroom",
                url: "#!category/bedroom"
            },
            {
                "title": "Account",
                "url": "#!account"
            },
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

            var backBtn = document.querySelector(".nav-icon.icon-left-open");

            deeptissue(backBtn).tap(function () {

                history.back();

            });

            window.addEventListener("hashchange", function () {

                if (window.history.length > 1) {

                    backBtn.classList.add("show");

                }

            });



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
                            "icon": "icon-home"
                        },
                        {
                            "Name": "Categories",
                            "Slug": "categories",
                            "icon": "icon-tags",
                            "children": []
                        },
                        {
                            "Name": "Login",
                            "Slug": "login",
                            "icon": "icon-key"
                        },
                        {
                            "Name": "Account",
                            "Slug": "account",
                            "icon": "icon-user"
                        },
                        {
                            "Name": "Privacy",
                            "Slug": "s/privacy",
                            "icon": "icon-lock"
                        },
                        {
                            "Name": "About",
                            "Slug": "s/about",
                            "icon": "icon-info-circled"
                        },
                        {
                            "Name": "Contact",
                            "Slug": "contact",
                            "icon": "icon-mail-alt"
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






