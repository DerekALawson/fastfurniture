
;

(function (undefined) {

    "use strict";

    var FastFurnitureData = Class.extend({

        init: function (cache) {

            this.cache = cache;

        },

        version: "0.0.1",

        cache: undefined,

        API_ROOT: "api/data/",

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

            return this.getData(options);

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

            //if (options.data) {
            //    options.url += ("?" + this.buildAjaxDataQueryString(options.data));
            //}

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

                    try {
                        var json = JSON.parse(this.responseText);
                        options.success.call(that, json);
                    }
                    catch (e) {
                        options.success.call(that, this.responseText);
                    }

                }
            }

            if (options.data) {

                if (options.dataType === "json") {

                    xhr.send(JSON.stringify(options.data));

                } else {

                    xhr.send(JSON.stringify(options.data));

                }

            } else {

                xhr.send();

            }

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

        postJSON: function (options) {

            options.dataType = "json";

            this.postData(options);

        },

        putData: function (options) {

            options.method = "PUT";

            this.doAJAX(options);

        },

        putJSON: function (options) {
            options.dataType = "json";
            this.putData(options);
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


        getCategories: function (callback) {

            return this.getCachedData({
                url: "categories",
                cacheKey: "categories-",
                callback: callback
            });

        },

        getCategory: function (name, callback) {

            return this.getCachedData({
                url: "category?slug=" + name,
                cacheKey: "category-" + name,
                data: name,
                callback: callback
            });

        },

        getCategoryProducts: function (name, callback) {

            return this.getCachedData({
                url: "CategoryProducts?category=" + name,
                cacheKey: "category-" + name,
                data: name,
                callback: callback
            });

        },

        addCategory: function (category, callback) {

            return this.postJSON({
                url: "category",
                data: category,
                callback: callback
            });

        },

        udpateCategory: function (category, callback) {

            return this.putJSON({
                url: "category",
                data: category,
                callback: callback
            });

        },

        deleteCategory: function (name, callback) {

            return this.deleteData({
                url: "DeleteCategory?slug=" + name,
                data: name,
                callback: callback
            });

        },



        getProducts: function (callback) {

            return this.getCachedData({
                url: "product",
                cacheKey: "products-",
                callback: callback
            });

        },

        getProduct: function (slug, callback) {

            return this.getCachedData({
                url: "product?slug=" + slug,
                cacheKey: "product-" + productId,
                callback: callback
            });

        },

        addProduct: function (product, callback) {

            return this.postData({
                url: "product",
                data: product,
                callback: callback
            });

        },

        udpateProduct: function (product, callback) {

            return this.putData({
                url: "product",
                data: product,
                callback: callback
            });

        },

        deleteProduct: function (slug, callback) {

            return this.deleteData({
                url: "product?slug=" + slug,
                callback: callback
            });

        },



        getCarts: function (callback) {

            return this.getCachedData({
                url: "cart",
                cacheKey: "carts-",
                callback: callback
            });

        },

        getCart: function (cartId, callback) {

            return this.getCachedData({
                url: "cart?cartid=" + cartId,
                cacheKey: "cart-" + cartId,
                callback: callback
            });

        },

        addCart: function (cartId, cart, callback) {

            return this.postJSON({
                url: "cart",
                data: cart,
                callback: callback
            });

        },

        udpateCart: function (cart, callback) {

            return this.putJSON({
                url: "cart",
                data: cart,
                callback: callback
            });

        },

        deleteCart: function (cartId, callback) {

            return this.deleteData({
                url: "cart?cartId=" + cartId,
                callback: callback
            });

        },



        getUsers: function (callback) {

            return this.getCachedData({
                url: "user",
                cacheKey: "users-",
                callback: callback
            });

        },

        getUser: function (userId, callback) {

            return this.getCachedData({
                url: "user/" + userId,
                cacheKey: "user-" + userId,
                callback: callback
            });

        },

        addUser: function (userId, user, callback) {

            return this.postData({
                url: "user/" + userId,
                callback: callback
            });

        },

        udpateUser: function (user, callback) {

            return this.putData({
                url: "user/" + user.userId,
                callback: callback
            });

        },

        deleteUser: function (userId, callback) {

            return this.deleteData({
                url: "user/" + userId,
                callback: callback
            });

        },



        getRoles: function (callback) {

            return this.getCachedData({
                url: "role",
                cacheKey: "roles-",
                callback: callback
            });

        },

        getRole: function (roleId, callback) {

            return this.getCachedData({
                url: "role/" + roleId,
                cacheKey: "role-" + roleId,
                callback: callback
            });

        },

        addRole: function (roleId, role, callback) {

            return this.postData({
                url: "role/" + roleId,
                callback: callback
            });

        },

        udpateRole: function (role, callback) {

            return this.putData({
                url: "role/" + role.roleId,
                callback: callback
            });

        },

        deleteRole: function (roleId, callback) {

            return this.deleteData({
                url: "role/" + roleId,
                callback: callback
            });

        },



        getOrders: function (callback) {

            return this.getCachedData({
                url: "order",
                cacheKey: "orders-",
                callback: callback
            });

        },

        getOrder: function (orderId, callback) {

            return this.getCachedData({
                url: "order/" + orderId,
                cacheKey: "order-" + orderId,
                callback: callback
            });

        },

        addOrder: function (orderId, order, callback) {

            return this.postData({
                url: "order/" + orderId,
                callback: callback
            });

        },

        udpateOrder: function (order, callback) {

            return this.putData({
                url: "order/" + order.orderId,
                callback: callback
            });

        },

        deleteOrder: function (orderId, callback) {

            return this.deleteData({
                url: "order/" + orderId,
                callback: callback
            });

        },



        getContacts: function (callback) {

            return this.getCachedData({
                url: "contact",
                cacheKey: "contacts-",
                callback: callback
            });

        },

        getContact: function (contactId, callback) {

            return this.getCachedData({
                url: "contact/" + contactId,
                cacheKey: "contact-" + contactId,
                callback: callback
            });

        },

        addContact: function (contactId, contact, callback) {

            return this.postData({
                url: "contact/" + contactId,
                callback: callback
            });

        },

        udpateContact: function (contact, callback) {

            return this.putData({
                url: "contact/" + contact.contactId,
                callback: callback
            });

        },

        deleteContact: function (contactId, callback) {

            return this.deleteData({
                url: "contact/" + contactId,
                callback: callback
            });

        }



    });

    return (window.FastFurnitureData = FastFurnitureData);

}());






