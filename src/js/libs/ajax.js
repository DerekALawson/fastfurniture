/*
 * 
 * Probably should break this into different modules/services that inherit from the base class/module.
 * 
 */


;

(function (undefined) {

    "use strict";

    /*
     * AJAX
     */
    var AJAX = Class.extend({

        init: function (config) {

            this.appKey = config.appKey || this.appKey;
            this.cache = config.cache || this.cache;
            this.API_ROOT = config.API_ROOT || this.API_ROOT;

        },

        version: "0.0.1.0",

        cache: undefined,

        API_ROOT: "",

        ttl: 30000, //30 seconds, for development purposes

        injectors: [],

        createInjector: function (injector) {

            injectors.push(injector);

        },

        status: {
            "0": "notOnitialized",
            "1": "connectionEstablished",
            "2": "received",
            "3": "processing",
            "4": "success"
        },

        appKey: "spa-app-",

        authTokenKey: "userToken",

        getCachedObject: function (options) {

            return this.getCachedData(options, true);

        },

        getCachedData: function (options, isJSON) {

            var appData = this,
                getType = "getItem",
                cachedData;

            return new Promise(function (resolve, reject) {

                if (isJSON) {
                    getType = "getObject";
                }

                if (appData.cache) {

                    cachedData = appData.cache[getType](appData.appKey + options.cacheKey);

                    if (cachedData) {

                        resolve(cachedData);

                    }

                }

                options.cache = (appData.cache) ? true : false;
                options.type = options.type || "json";

                appData.getData(options).then(function (result) {

                    resolve(result);

                }).catch(function (error) {

                    reject(error);

                });

            });

        },

        FORM_ENCODED: "application/x-www-form-urlencoded",
        JSON_ENCODED: "application/x-json",
        HTML_ENCODED: "text/html",

        buildAjaxDataQueryString: function (data) {
            var name, qs = "";

            for (name in data) {

                if (qs === "") {
                    qs += name + "=" + data[name];
                } else {
                    qs += "&" + name + "=" + data[name];
                }

            }

            return qs;

        },

        defaultHeaders: {
            contentType: 'application/x-www-form-urlencoded',
            accept: {
                '*': 'text/javascript, text/html, application/json, text/xml, */*'
                , xml: 'application/xml, text/xml'
                , html: 'text/html'
                , text: 'text/plain'
                , json: 'application/json, text/javascript'
                , js: 'application/javascript, text/javascript'
            }
        },

        getAcceptHeader: function (type) {

            if (!type || type === "") {
                return this.defaultHeaders.accept["*"];
            }

            return this.defaultHeaders.accept[type];

        },

        ajaxSettings: {
            cache: false,
            cacheTTL: 60000, //1 minute default
            dataType: "json",
            method: 'get',
            type: 'json',
            contentType: 'application/json',
            success: function (d) { }
        },

        failsuccess: function (data) {

            if (data.responseText) {
                console.error(JSON.stringify(data.responseText));
            }

        },

        doAJAX: function (options) {

            var that = this,
                xhr = new XMLHttpRequest(),
                promise = new Promise(function (resolve, reject) {

                    options = $.extend({},
                        that.ajaxSettings,
                        options);

                    if (options.onload) {
                        xhr.onload = options.onload;
                    }

                    if (options.onerror) {
                        xhr.onerror = options.onerror;
                    }

                    if (options.url.indexOf("http://") < 0 && options.url.indexOf("https://") < 0) {

                        options.url = that.API_ROOT + options.url;

                    }

                    xhr.open(options.method, options.url);
                    xhr.setRequestHeader("Content-Type", options.contentType);
                    xhr.setRequestHeader("Accept", that.getAcceptHeader(options.type));

                    //authentication header

                    if (localStorage.getItem(that.authTokenKey)) {

                        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem(that.authTokenKey));

                    }

                    //xhr.addEventListener("progress", function () { console.info("progress"); }, false);
                    //xhr.addEventListener("load", function () { console.info("load"); }, false);
                    //xhr.addEventListener("error", function () { console.info("error"); }, false);
                    //xhr.addEventListener("abort", function () { console.info("abort"); }, false);

                    xhr.onreadystatechange = function (e) {

                        if (xhr.readyState != 4 && options[xhr.readyState]) {

                            options[xhr.readyState]();

                        }

                        if (xhr.readyState === 4) {

                            if (xhr.status >= 200 && xhr.status < 300) {

                                try {

                                    var result = this.responseText;

                                    if (options.cache) {
                                        that.cache.setObject(options.cacheKey, result, options.cacheTTL);
                                    }

                                    switch (options.type) {

                                        case "json":

                                            if (result && result !== "") {

                                                result = JSON.parse(result);

                                            }

                                            break;

                                        //case "text":

                                        //    options.success.call(that, this.responseText);

                                        //    break;

                                        // default: //DOMString

                                        //     resolve(this.responseText);

                                    }

                                    resolve(result);

                                }
                                catch (e) {

                                    reject(Error(e.message));

                                }

                            }

                            if ((xhr.status >= 200 && xhr.status < 207) && options.error) {

                                reject(Error(this.responseText));


                                // try {

                                //     switch (options.type) {

                                //         case "json":

                                //             options.error.call(that, JSON.parse(this.responseText));

                                //             break;

                                //         default: //DOMString

                                //             options.error.call(that, this.responseText);

                                //     }

                                // }
                                // catch (e) {

                                //     options.error.call(that, e.message);

                                // }

                            }

                        }
                    }

                    if (options.data) {

                        if (options.dataType === "json") {

                            xhr.send(JSON.stringify(options.data));

                        } else {

                            xhr.send(options.data);

                        }

                    } else {

                        xhr.send();

                    }

                });

            return promise;

        },

        getData: function (options) {

            var ajaxOptions = $.extend({},
                this.ajaxSettings,
                options);

            if (options.type === "jsonp") {
                delete ajaxOptions.contentType;
                delete ajaxOptions.dataType;
            }

            //            ajaxOptions.url = "http://fastfurniture.love2dev.com/" + ajaxOptions.url;

            return this.doAJAX(ajaxOptions);

        },


        patchData: function (options) {

            options.method = "PATCH";

            return this.doAJAX(options);

        },

        patchJSON: function (options) {

            options.dataType = "json";

            return this.patchData(options);

        },

        postData: function (options) {

            options.method = "POST";

            return this.doAJAX(options);

        },

        postJSON: function (options) {

            options.dataType = "json";

            return this.postData(options);

        },

        putData: function (options) {

            options.method = "PUT";

            return this.doAJAX(options);

        },

        putJSON: function (options) {
            options.dataType = "json";
            return this.putData(options);
        },

        deleteData: function (options) {

            options.method = "DELETE";

            return this.doAJAX(options);

        },

       getItem: function (url, keyName, keyValue) {

            return this.getCachedObject({
                url: url,
                cacheKey: this.appKey + "-" + keyName + "-" + keyValue
            });

        }

        /*,

        addBook: function (item, obj) {
        
            return this.postData({
                url: item + "/Add" + item,
                data: obj
            });
        
        },

        udpateBook: function (item, obj) {
        
            return this.putData({
                url: item + "/Update" + item,
                data: obj
            });
        
        },

        deleteBook: function (item, obj) {
        
            return this.deleteData({
                url: item + "/Delete" + item
            });
        
        }
*/


    });

    return (window.AJAX = AJAX);

} ());


