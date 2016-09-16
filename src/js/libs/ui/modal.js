/*

Standard modal Item Object Structure:


*/


(function (window, undefined) {

    "use strict";

    var modal = function (node, options) {

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
            node = node[0]; //limit the modal application to a single node for now, just makes sense
        }

        var that = new modal.fn.init();

        that.options = that.settings =
            $.extend({}, that.settings, options);

        that.target = node;

        return that;

    };

    modal.fn = modal.prototype = {

        constructor: modal,

        init: function () {
            return this;
        },

        version: "0.0.1",

        options: {},

        target: undefined,

        isShown: false,

        injectMarkup: function (dlgTemplate, bodyTemplate) {

            var that = this;

            return new Promise(function (resolve, reject) {

                ve.bind({
                    "targetSelector": that.settings.modalTarget,
                    "templateName": "modaldialogTemplate",
                    "data": {}
                }).then(function () {

                    ve.bind({
                        "targetSelector": that.settings.modalBody,
                        "templateName": "newslettersignupTemplate",
                        "data": {}
                    })
                        .then(function () {
                            resolve();
                        })
                        .catch(function () {
                            reject();
                        });

                });

            });

        },

        show: function (delay, key) {

            var that = this,
                $body = $("body");

            return new Promise(function (resolve, reject) {

                if (localStorage.getItem(key)) {
                    resolve();
                }

                that.timer = setTimeout(function () {

                    that.injectMarkup()
                        .then(function () {

                            var close = document.querySelector(".modal .close");

                            if (close) {

                                close.addEventListener("click", function (e) {

                                    e.preventDefault();

                                    that.hide();

                                });

                            }

                            that.escape();

                            $body.addClass(that.settings.openClass);

                            that.isShown = true;

                            resolve();

                        });

                }, delay);

            });

        },

        timer: undefined,

        hide: function () {

            var that = this,
                $body = $("body"),
                $modal = $(".modal"),
                $target = $(that.settings.modalTarget);

            clearTimeout(that.timer);

            $modal.on("transitionend", function () {

                $target.html("");

                $body.removeClass(that.settings.openClass);

            });

            $modal.removeClass("in");

        },

        escape: function () {

            var that = this;

            document.body.addEventListener("keyup", function (e) {

                var key = e.keyCode || e.which || e.charCode || 0;

                e.preventDefault();

                if (key === 27) {

                    that.hide();

                }

                return false;

            });

        },

        TRANSITION_DURATION: 300,
        BACKDROP_TRANSITION_DURATION: 150,

        settings: {
            modalTemplateName: "modaldialogTemplate",
            modalBody: ".modal-content",
            modalTarget: ".modal-target",
            closeBtn: ".modal-header .close",
            openClass: 'modal-open',
            backdrop: true,
            keyboard: true,
            show: true
        }

    };

    // Give the init function the modal prototype for later instantiation
    modal.fn.init.prototype = modal.fn;


    return (window.modal = modal);


} (window));