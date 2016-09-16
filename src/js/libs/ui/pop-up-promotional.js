/*

Standard popuppromo Item Object Structure:


*/


(function (window, undefined) {

    "use strict";

    var popuppromo = function (node, customSettings) {

        if (!node) {
            return node;
        }

        if (typeof node === "string") { //assume selector

            node = document.querySelector(node);

            if (!node) {
                return node;
            }

        }

        if ("length" in node) {  //rude detection for nodeList
            node = node[0]; //limit the popuppromo application to a single node for now, just makes sense
        }

        var that = new popuppromo.fn.init(),
            settings = that.settings =
                $.extend({}, that.settings, customSettings);

        that.support = $.buildVendorNames();
        that.support.transitionEnd =
            that.eventNames[that.support.transition] || null;

        that.setuppopuppromoElements(node, settings);
        that.applyTransitionEnd();
        //     that.setupOritentationChange();
        that.setpopuppromoMenu(settings.menuItems);

        return that;
    };

    popuppromo.fn = popuppromo.prototype = {

        constructor: popuppromo,

        init: function () {
            return this;
        },

        version: "0.0.1",

        popuppromo: undefined,
        topMenu: undefined,
        subMenu: undefined,
        expandTarget: undefined,

        hasMouse: "",
        touchType: "",
        touchStart: "",

        div: undefined,
        support: {},
        eventNames: {
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'WebkitTransition': 'webkitTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },

        /*
        Use this method to configure or change the items displayed in the popuppromo.
        There are two arrays in the menuItems object, topMenu and subMenu. They
        are parsed to build the menu items using the templates defined in the settings
        object.
        */
        setpopuppromoMenu: function (menuItems) {

            var i = 0,
                topHTML = "",
                subHTML = "",
                that = this,
                settings = that.settings;

            that.expandpopuppromo(true);

            that.topMenu.innerHTML = "";
            that.subMenu.innerHTML = "";

            if (menuItems.topMenu) {

                //will replace this with a forEach soon....
                for (i = 0; i < menuItems.topMenu.length; i++) {
                    topHTML += that.parseMenuItem(menuItems.topMenu[i],
                        settings.popuppromoItemTemplate);
                }

            }

            if (menuItems.subMenu) {

                for (i = 0; i < menuItems.subMenu.length; i++) {
                    subHTML += that.parseMenuItem(menuItems.subMenu[i],
                        settings.subMenuItemTemplate);
                }

            }

            i = menuItems.topMenu.length;

            if (topHTML === "" && subHTML === "") {
                that.popuppromo.style.display = "none";
            } else {

                topHTML += "<div class='expand-popuppromo'>...</div>";
                i++;

                that.topMenu.innerHTML = topHTML;
                that.subMenu.innerHTML = subHTML;

                that.setIconWidth(i);
                that.setOrientation();

                window.addEventListener("resize", function (e) {
                    that.setIconWidth(i);
                    that.setOrientation();
                });

                that.expandTarget = that.popuppromo.querySelector(settings.expandTargetSelector);

                that.setupExpand();
                that.bindCallBacks(menuItems);
                that.bindAutoCollapse();
            }

        },

        parseMenuItem: function (menuItem, template) {

            return template.replace("{{title}}", menuItem.title)
                .replace("{{url}}", menuItem.url)
                .replace("{{iconClass}}", menuItem.iconClass);

        },

        setIconWidth: function (count) {

            var settings = this.settings,
                tbitem = document.querySelector(settings.topMenuItemSelector).clientWidth,
                wWidth = window.innerWidth,
                mWidth = Math.floor((((wWidth - (count * tbitem)) / (count * 2)) / wWidth) * 98),
                tbItems = document.querySelectorAll(settings.topMenuItemSelector),
                exp = document.querySelector(settings.topMenuItemSelector);

            for (count = 0; count < tbItems.length; count++) {
                tbItems[count].style.marginRight = mWidth + "%";
                tbItems[count].style.marginLeft = mWidth + "%";
            }

            if (exp) {
                exp.style.marginRight = mWidth + "%";
                exp.style.marginLeft = mWidth + "%";
            }

        },

        setOrientation: function () {

            if (window.innerWidth < window.innerHeight) {
                this.popuppromo.orientation = portrait;
            } else {
                this.popuppromo.orientation = landscape;
            }

        },

        bindCallBacks: function (menuItems) {

            var i = 0,
                that = this,
                menuItem, target;

            for (i = 0; i < menuItems.topMenu.length; i++) {

                menuItem = menuItems.topMenu[i];

                if (menuItem.callback) {
                    that.bindTapEvent(
                        document.querySelector("." + menuItem.iconClass),
                        menuItem.callback);

                }
            }

            for (i = 0; i < menuItems.subMenu.length; i++) {

                menuItem = menuItems.subMenu[i];

                if (menuItem.callback) {
                    that.bindTapEvent(
                        document.querySelector("." + menuItem.iconClass),
                        menuItem.callback);

                }
            }

        },

        buildTransitionValue: function (prop) {

            var settings = this.settings;

            return prop + " " + settings.expandSpeed + "ms " + settings.easing;
        },

        setuppopuppromoElements: function (node, settings) {

            var that = this;

            that.popuppromo = node;
            that.topMenu = that.popuppromo.querySelector(settings.topMenuSelector);
            that.subMenu = that.popuppromo.querySelector(settings.subMenuSelector);

        },

        applyTransitionEnd: function () {

            var that = this;

            //This gets called when the animation is complete
            that.popuppromo.addEventListener(that.support.transitionEnd, function (e) {
                that.transitionEnd(e);
            });

        },

        transitionEnd: function (e) {

            this.popuppromo.style[this.support.transition] = "";

        },

        setupTouch: function () {

            var that = this;

            that.touchType = window.navigator.msPointerEnabled ? "pointer" :
                "ontouchstart" in window ? "touch" : "mouse";

            that.hasMouse = ("ontouchstart" in window && "onmousedown" in window);

            that.touchStart = this.touchType === "pointer" ? "MSPointerDown" :
                this.touchType === "touch" ? "touchstart" : "mousedown";

        },

        setupExpand: function () {

            var that = this;

            that.setupTouch();
            that.bindTapEvent(that.expandTarget, function (e) {
                e.preventDefault();
                that.expandpopuppromo();
            });

        },

        bindAutoCollapse: function () {

            var that = this, i = 0,
                topMenuItems = document.querySelectorAll(that.settings.topMenuItemSelector +
                    ", " + that.settings.subMenuSelector);

            for (i = 0; i < topMenuItems.length; i++) {

                that.bindTapEvent(topMenuItems[i], function () {
                    that.expandpopuppromo(true);
                });

            }

        },

        bindTapEvent: function (target, callback) {

            var that = this;

            if (!target) {
                return;
            }

            //bind both here beacause Chrome desktop can fire either depending on how the user initiates the input
            target.addEventListener(that.touchStart, function (e) {
                callback.call(that, e);
            });

            if (that.hasMouse) {
                target.addEventListener("mousedown", function (e) {
                    callback.call(that, e);
                });
            }

        },

        expandpopuppromo: function (forceClose) {

            var that = this,
                settings = that.settings,
                popuppromo = that.popuppromo,
                top, sub;

            if (forceClose === true &&
                (popuppromo.expanded === undefined || popuppromo.expanded === false)) {
                return;
            }


            if (popuppromo.orientation === portrait) {
                popuppromo.style[that.support.transition] = that.buildTransitionValue("height");
            } else {
                popuppromo.style[that.support.transition] = that.buildTransitionValue("width");
            }

            if (popuppromo.expanded) {

                if (popuppromo.orientation === portrait) {
                    popuppromo.style.height = settings.minHeight + "px";
                } else {
                    popuppromo.style.width = settings.minWidth + "px";
                }

                popuppromo.expanded = false;

            } else {

                top = (that.topMenu !== undefined) ?
                    that.topMenu.getBoundingClientRect() : { height: "0px", width: "0px" };
                sub = (that.subMenu !== undefined) ?
                    that.subMenu.getBoundingClientRect() : { height: "0px", width: "0px" };

                if (that.popuppromo.orientation === portrait) {

                    popuppromo.style.height = (top.height + sub.height) + "px";

                }
                else {

                    if (settings.menuItems.subMenu.length > 0) {
                        popuppromo.style.width = settings.expandWidth + "px";
                    }

                }

                popuppromo.expanded = true;
            }

        },

        settings: {

            minHeight: 35,
            minWidth: 42,
            expandWidth: 200,
            collapseOnSelect: true,

            mainSelector: ".popuppromo",
            topMenuSelector: ".popuppromo-top-menu",
            subMenuSelector: ".popuppromo-sub-menu",
            expandTargetSelector: ".expand-popuppromo",
            topMenuItemSelector: ".popuppromo-item",

            expandSpeed: 1000, //ms
            that: undefined,

            easing: "ease-in-out"
        }

    };

    // Give the init function the popuppromo prototype for later instantiation
    popuppromo.fn.init.prototype = popuppromo.fn;


    return (window.popuppromo = popuppromo);


} (window));