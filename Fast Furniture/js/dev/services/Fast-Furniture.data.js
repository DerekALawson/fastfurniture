﻿
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

                if (options.success) {
                    options.success(cachedData);
                    return;
                }
            }

            options.cache = true;

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

        errorsuccess: function (err) {

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

                        if (options.cache) {
                            that.cache.setObject(that.appKey + options.cacheKey, json, options.cacheTTL);
                        }


                    }
                    catch (e) {

                        options.success.call(that, this.responseText);

                        if (options.cache) {
                            that.cache.setItem(that.appKey + options.cacheKey, this.responseText, options.cacheTTL);
                        }

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


        getCategories: function (success) {

            return this.getCachedData({
                url: "categories",
                cacheKey: "categories-",
                success: success
            });

        },

        getHomeCategories: function (success) {

            return this.getCachedData({
                url: "homecategories",
                cacheKey: "home-categories",
                success: success
            });

        },

        getCategory: function (name, success) {

            return this.getCachedData({
                url: "category?slug=" + name,
                cacheKey: "category-" + name,
                data: name,
                success: success
            });

        },

        getCategoryProducts: function (name, success) {

            return this.getCachedData({
                url: "CategoryProducts?category=" + name,
                cacheKey: "category-" + name,
                data: name,
                success: success
            });

        },

        addCategory: function (category, success) {

            return this.postJSON({
                url: "category",
                data: category,
                success: success
            });

        },

        udpateCategory: function (category, success) {

            return this.putJSON({
                url: "category",
                data: category,
                success: success
            });

        },

        deleteCategory: function (name, success) {

            return this.deleteData({
                url: "DeleteCategory?slug=" + name,
                data: name,
                success: success
            });

        },



        getProducts: function (success) {

            return this.getCachedData({
                url: "products",
                cacheKey: "products-",
                success: success
            });

        },

        getRelatedProducts: function (success) {

            return this.getCachedData({
                url: "relatedproducts",
                cacheKey: "relatedproducts-",
                success: success
            });

        },


        getProduct: function (slug, success) {

            return this.getCachedData({
                url: "product?slug=" + slug,
                cacheKey: "product-" + slug,
                success: success
            });

        },

        addProduct: function (product, success) {

            return this.postData({
                url: "product",
                data: product,
                success: success
            });

        },

        udpateProduct: function (product, success) {

            return this.putData({
                url: "product",
                data: product,
                success: success
            });

        },

        deleteProduct: function (slug, success) {

            return this.deleteData({
                url: "product?slug=" + slug,
                success: success
            });

        },



        getCarts: function (success) {

            return this.getCachedData({
                url: "cart",
                cacheKey: "carts-",
                success: success
            });

        },

        getCart: function (cartId, success) {

            return this.getCachedData({
                url: "cart?cartid=" + cartId,
                cacheKey: "cart-" + cartId,
                success: success
            });

        },

        addCart: function (cartId, cart, success) {

            return this.postJSON({
                url: "cart",
                data: cart,
                success: success
            });

        },

        udpateCart: function (cart, success) {

            return this.putJSON({
                url: "cart",
                data: cart,
                success: success
            });

        },

        deleteCart: function (cartId, success) {

            return this.deleteData({
                url: "cart?cartId=" + cartId,
                success: success
            });

        },



        getUsers: function (success) {

            return this.getCachedData({
                url: "user",
                cacheKey: "users-",
                success: success
            });

        },

        getUser: function (userId, success) {

            return this.getCachedData({
                url: "user/" + userId,
                cacheKey: "user-" + userId,
                success: success
            });

        },

        addUser: function (userId, user, success) {

            return this.postData({
                url: "user/" + userId,
                success: success
            });

        },

        udpateUser: function (user, success) {

            return this.putData({
                url: "user/" + user.userId,
                success: success
            });

        },

        deleteUser: function (userId, success) {

            return this.deleteData({
                url: "user/" + userId,
                success: success
            });

        },



        getRoles: function (success) {

            return this.getCachedData({
                url: "role",
                cacheKey: "roles-",
                success: success
            });

        },

        getRole: function (roleId, success) {

            return this.getCachedData({
                url: "role/" + roleId,
                cacheKey: "role-" + roleId,
                success: success
            });

        },

        addRole: function (roleId, role, success) {

            return this.postData({
                url: "role/" + roleId,
                success: success
            });

        },

        udpateRole: function (role, success) {

            return this.putData({
                url: "role/" + role.roleId,
                success: success
            });

        },

        deleteRole: function (roleId, success) {

            return this.deleteData({
                url: "role/" + roleId,
                success: success
            });

        },



        getOrders: function (success) {

            return this.getCachedData({
                url: "order",
                cacheKey: "orders-",
                success: success
            });

        },

        getOrder: function (orderId, success) {

            return this.getCachedData({
                url: "order/" + orderId,
                cacheKey: "order-" + orderId,
                success: success
            });

        },

        addOrder: function (orderId, order, success) {

            return this.postData({
                url: "order/" + orderId,
                success: success
            });

        },

        udpateOrder: function (order, success) {

            return this.putData({
                url: "order/" + order.orderId,
                success: success
            });

        },

        deleteOrder: function (orderId, success) {

            return this.deleteData({
                url: "order/" + orderId,
                success: success
            });

        },



        getContacts: function (success) {

            return this.getCachedData({
                url: "contact",
                cacheKey: "contacts-",
                success: success
            });

        },

        getContact: function (contactId, success) {

            return this.getCachedData({
                url: "contact/" + contactId,
                cacheKey: "contact-" + contactId,
                success: success
            });

        },

        addContact: function (contactId, contact, success) {

            return this.postData({
                url: "contact/" + contactId,
                success: success
            });

        },

        udpateContact: function (contact, success) {

            return this.putData({
                url: "contact/" + contact.contactId,
                success: success
            });

        },

        deleteContact: function (contactId, success) {

            return this.deleteData({
                url: "contact/" + contactId,
                success: success
            });

        }



    });

    return (window.FastFurnitureData = FastFurnitureData);

}());






