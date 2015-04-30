
;

(function (undefined) {

    "use strict";

    var FastFurnitureData = Class.extend({

        init: function (cache) {

            this.cache = cache;

        },

        version: "0.0.1",

        cache: undefined,

        API_ROOT: "api/",

        ttl: 30000, //30 seconds, for development purposes

        appKey: "fast-funriture-",

        getCachedData: function (options) {

            var appData = this,
                cachedData = appData.cache.getObject(appData.appKey + options.cacheKey);

            if (cachedData) {

                if (options.callback) {
                    options.callback(cachedData);
                    return;
                }
            }

            return this.getData({
                url: options.url,
                callback: options.callback
            });

        },


        FORM_ENCODED: "application/x-www-form-urlencoded",
        JSON_ENCODED: "application/x-json",

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

        errorCallback: function (err) {

            err = JSON.parse(err.response);

            console.error(err.message);


        },

        serialize: function (obj, join) {
            var str = [], p;

            if (join === undefined) {
                join = true;
            }

            for (p in obj) {

                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }

            if (join) {

                return str.join("&");

            }

            return str;
        },
       
        ajaxSettings: {
            cache: false,
            dataType: "json",
            method: 'get',
            type: 'json',
            contentType: 'application/json',
            success: function (d) { }
        },

        failCallback: function (data) {

            if (data.responseText) {
                console.error(JSON.stringify(data.responseText));
            }

        },
          
        doAJAX: function (options) {

            var that = this,
                xhr = new XMLHttpRequest();

            options = $.extend({},
                    this.ajaxSettings,
                    options);

            if (options.data) {
                options.url += ("?" + this.buildAjaxDataQueryString(options.data));
            }

            options.url = this.API_ROOT + options.url;

            xhr.open(options.method, options.url);
            xhr.setRequestHeader("Content-Type", options.contentType);
            xhr.setRequestHeader("Accept", this.getAcceptHeader(options.type));

            //xhr.addEventListener("progress", function () { console.info("progress"); }, false);
            //xhr.addEventListener("load", function () { console.info("load"); }, false);
            //xhr.addEventListener("error", function () { console.info("error"); }, false);
            //xhr.addEventListener("abort", function () { console.info("abort"); }, false);

            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4 && xhr.status == 200 && options.success) {
                    options.success.call(that, JSON.parse(this.responseText));
                }
            }

            xhr.send();

        },

        getData: function (options) {

            var ajaxOptions = $.extend({},
                                this.ajaxSettings,
                                options);

            if (options.type === "jsonp") {
                delete ajaxOptions.contentType;
                delete ajaxOptions.dataType;
            }

            this.doAJAX(ajaxOptions);

        },

        postData: function (options) {

            options.method = "POST";

            this.doAJAX(options);

        },

        putData: function (options) {
            
            options.method = "PUT";

            this.doAJAX(options);

        },

        deleteData: function (options) {
            
            options.method = "DELETE";

            this.doAJAX(options);

        },


        /*
         * 
         * Add Application specific CRUD methods here
         * 
         */


            getcategorys: function (callback) {
            
                return this.getCachedData({
                    url: "category",
                    cacheKey: "categorys-",
                    callback: callback
                });

            },

            getcategory: function (categoryId, callback) {
            
                return this.getCachedData({
                    url: "category/" + categoryId,
                    cacheKey: "category-" + categoryId,
                    callback: callback
                });

            },

            addcategory: function (categoryId, category, callback) {
            
                return this.postData({
                    url: "category/" + categoryId,
                    callback: callback
                });
            
            },

            udpatecategory: function (category, callback) {
            
                return this.putData({
                    url: "category/" + category.categoryId,
                    callback: callback
                });
            
            },

            deletecategory: function (categoryId, callback) {
            
                return this.deleteData({
                    url: "category/" + categoryId,
                    callback: callback
                });
            
            },



            getproducts: function (callback) {
            
                return this.getCachedData({
                    url: "product",
                    cacheKey: "products-",
                    callback: callback
                });

            },

            getproduct: function (productId, callback) {
            
                return this.getCachedData({
                    url: "product/" + productId,
                    cacheKey: "product-" + productId,
                    callback: callback
                });

            },

            addproduct: function (productId, product, callback) {
            
                return this.postData({
                    url: "product/" + productId,
                    callback: callback
                });
            
            },

            udpateproduct: function (product, callback) {
            
                return this.putData({
                    url: "product/" + product.productId,
                    callback: callback
                });
            
            },

            deleteproduct: function (productId, callback) {
            
                return this.deleteData({
                    url: "product/" + productId,
                    callback: callback
                });
            
            },



            getcarts: function (callback) {
            
                return this.getCachedData({
                    url: "cart",
                    cacheKey: "carts-",
                    callback: callback
                });

            },

            getcart: function (cartId, callback) {
            
                return this.getCachedData({
                    url: "cart/" + cartId,
                    cacheKey: "cart-" + cartId,
                    callback: callback
                });

            },

            addcart: function (cartId, cart, callback) {
            
                return this.postData({
                    url: "cart/" + cartId,
                    callback: callback
                });
            
            },

            udpatecart: function (cart, callback) {
            
                return this.putData({
                    url: "cart/" + cart.cartId,
                    callback: callback
                });
            
            },

            deletecart: function (cartId, callback) {
            
                return this.deleteData({
                    url: "cart/" + cartId,
                    callback: callback
                });
            
            },



            getusers: function (callback) {
            
                return this.getCachedData({
                    url: "user",
                    cacheKey: "users-",
                    callback: callback
                });

            },

            getuser: function (userId, callback) {
            
                return this.getCachedData({
                    url: "user/" + userId,
                    cacheKey: "user-" + userId,
                    callback: callback
                });

            },

            adduser: function (userId, user, callback) {
            
                return this.postData({
                    url: "user/" + userId,
                    callback: callback
                });
            
            },

            udpateuser: function (user, callback) {
            
                return this.putData({
                    url: "user/" + user.userId,
                    callback: callback
                });
            
            },

            deleteuser: function (userId, callback) {
            
                return this.deleteData({
                    url: "user/" + userId,
                    callback: callback
                });
            
            },



            getroles: function (callback) {
            
                return this.getCachedData({
                    url: "role",
                    cacheKey: "roles-",
                    callback: callback
                });

            },

            getrole: function (roleId, callback) {
            
                return this.getCachedData({
                    url: "role/" + roleId,
                    cacheKey: "role-" + roleId,
                    callback: callback
                });

            },

            addrole: function (roleId, role, callback) {
            
                return this.postData({
                    url: "role/" + roleId,
                    callback: callback
                });
            
            },

            udpaterole: function (role, callback) {
            
                return this.putData({
                    url: "role/" + role.roleId,
                    callback: callback
                });
            
            },

            deleterole: function (roleId, callback) {
            
                return this.deleteData({
                    url: "role/" + roleId,
                    callback: callback
                });
            
            },



            getorders: function (callback) {
            
                return this.getCachedData({
                    url: "order",
                    cacheKey: "orders-",
                    callback: callback
                });

            },

            getorder: function (orderId, callback) {
            
                return this.getCachedData({
                    url: "order/" + orderId,
                    cacheKey: "order-" + orderId,
                    callback: callback
                });

            },

            addorder: function (orderId, order, callback) {
            
                return this.postData({
                    url: "order/" + orderId,
                    callback: callback
                });
            
            },

            udpateorder: function (order, callback) {
            
                return this.putData({
                    url: "order/" + order.orderId,
                    callback: callback
                });
            
            },

            deleteorder: function (orderId, callback) {
            
                return this.deleteData({
                    url: "order/" + orderId,
                    callback: callback
                });
            
            },



            getcontacts: function (callback) {
            
                return this.getCachedData({
                    url: "contact",
                    cacheKey: "contacts-",
                    callback: callback
                });

            },

            getcontact: function (contactId, callback) {
            
                return this.getCachedData({
                    url: "contact/" + contactId,
                    cacheKey: "contact-" + contactId,
                    callback: callback
                });

            },

            addcontact: function (contactId, contact, callback) {
            
                return this.postData({
                    url: "contact/" + contactId,
                    callback: callback
                });
            
            },

            udpatecontact: function (contact, callback) {
            
                return this.putData({
                    url: "contact/" + contact.contactId,
                    callback: callback
                });
            
            },

            deletecontact: function (contactId, callback) {
            
                return this.deleteData({
                    url: "contact/" + contactId,
                    callback: callback
                });
            
            },



    });

    return (window.FastFurnitureData = FastFurnitureData);

}());






