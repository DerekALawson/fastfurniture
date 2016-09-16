/*

Standard preloader Item Object Structure:


*/


(function (window, undefined) {

    "use strict";

    var preloader = {

        selector: "[role='progressbar']",

        show: function () {

            var target = document.querySelector(this.selector);

            if (target) {

                target.setAttribute("aria-busy", "true");
                target.classList.add("show");
                target.classList.remove("hide");
            }

        },

        hide: function () {

            var target = document.querySelector(this.selector);

            if (target) {

                target.setAttribute("aria-busy", "false");
                target.classList.add("hide");
                target.classList.remove("show");
            }

        }

    };

    return (window.preloader = preloader);


} (window));