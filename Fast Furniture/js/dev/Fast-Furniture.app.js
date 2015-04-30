
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

            app.parseServices(config.services);

            if (!app.viewEngine) {
                throw {
                    "name": "SPA Exception",
                    "message": "You must designate a viewEngine"
                };
            }


            return app;
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






