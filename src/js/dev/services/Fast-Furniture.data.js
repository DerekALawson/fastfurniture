/*
 * 
 * Probably should break this into different modules/services that inherit from the base class/module.
 * 
 */


;

(function (undefined) {

    "use strict";

    /*
     * FastFurnitureData
     */
    var FastFurnitureData = AJAX.extend({

        init: function (cache, appKey) {

            this._super(cache, appKey);

        },

        version: "0.0.2",

        /*
         * 
         * Add Application specific CRUD methods here
         * 
         */


        getCategories: function (success) {

            return this.getCachedObject({
                url: "categories",
                cacheKey: "categories-",
                success: success
            });

        },

        getHomeCategories: function (success) {

            return this.getCachedObject({
                url: "homecategories",
                cacheKey: "home-categories",
                success: success,
                //                type: "html",
                cacheTTL: 300000
            });

        },

        getCategory: function (name, success) {

            return this.getCachedObject({
                url: "category?slug=" + name,
                cacheKey: "category-" + name,
                data: name,
                success: success
            });

        },

        getCategoryProducts: function (name, success) {

            return this.getCachedObject({
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

            return this.getCachedObject({
                url: "products",
                cacheKey: "products-",
                success: success
            });

        },

        getRelatedProducts: function (success) {

            return this.getCachedObject({
                url: "relatedproducts",
                cacheKey: "relatedproducts-",
                success: success
            });

        },


        getProduct: function (slug, success) {

            return this.getCachedObject({
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

            return this.getCachedObject({
                url: "cart",
                cacheKey: "carts-",
                success: success
            });

        },

        getCart: function (cartId, success) {

            return this.getCachedObject({
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

            return this.getCachedObject({
                url: "user",
                cacheKey: "users-",
                success: success
            });

        },

        getUser: function (userId, success) {

            return this.getCachedObject({
                url: "user/" + userId,
                cacheKey: "user-" + userId,
                success: success
            });

        },

        addUser: function (user, success) {

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



        //getRoles: function (success) {

        //    return this.getCachedObject({
        //        url: "role",
        //        cacheKey: "roles-",
        //        success: success
        //    });

        //},

        //getRole: function (roleId, success) {

        //    return this.getCachedObject({
        //        url: "role/" + roleId,
        //        cacheKey: "role-" + roleId,
        //        success: success
        //    });

        //},

        //addRole: function (roleId, role, success) {

        //    return this.postData({
        //        url: "role/" + roleId,
        //        success: success
        //    });

        //},

        //udpateRole: function (role, success) {

        //    return this.putData({
        //        url: "role/" + role.roleId,
        //        success: success
        //    });

        //},

        //deleteRole: function (roleId, success) {

        //    return this.deleteData({
        //        url: "role/" + roleId,
        //        success: success
        //    });

        //},



        getOrders: function (success) {

            return this.getCachedObject({
                url: "order",
                cacheKey: "orders-",
                success: success
            });

        },

        getOrder: function (orderId, success) {

            return this.getCachedObject({
                url: "order/" + orderId,
                cacheKey: "order-" + orderId,
                success: success
            });

        },

        addOrder: function (order, success) {

            return this.postData({
                url: "order/",
                success: success
            });

        },

        //udpateOrder: function (order, success) {

        //    return this.putData({
        //        url: "order/" + order.orderId,
        //        success: success
        //    });

        //},

        //deleteOrder: function (orderId, success) {

        //    return this.deleteData({
        //        url: "order/" + orderId,
        //        success: success
        //    });

        //},

        getContacts: function (success) {

            return this.getCachedObject({
                url: "contact",
                cacheKey: "contacts-",
                success: success
            });

        },

        getContact: function (contactId, success) {

            return this.getCachedObject({
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

        },

        searchProducts: function (term, success) {

            return this.getCachedObject({
                url: "search?term=" + term,
                cacheKey: "search-tern-" + term,
                data: term,
                success: success
            });

        },

        getStatic: function (slug, success) {

            return this.getCachedObject({
                url: "static?slug=" + slug,
                cacheKey: "static-slug-" + slug,
                data: slug,
                success: success
            });


        }


        //updatePassword: function (userid, newPassword) {

        //    return this.patchJSON({
        //        url: "https://love2dev.auth0.com/api/v2/users/" + userid,
        //        success: success,
        //        data: {
        //            "password": newPassword
        //        }
        //    });

        //},

        //updateUser: function (userid, userInfo) {

        //    return this.patchJSON({
        //        url: "https://love2dev.auth0.com/api/v2/users/" + userid,
        //        success: success,
        //        data: userInfo
        //    });

        //},

        //deleteUser: function (userid) {

        //    return this.patchJSON({
        //        url: "https://love2dev.auth0.com/api/v2/users/" + userid,
        //        success: success
        //    });

        //},

        //createUser: function (userInfo) {

        //    return this.postJSON({
        //        url: "https://love2dev.auth0.com/api/v2/users/",
        //        success: success,
        //        data: userInfo
        //    });

        //},

        //recoverPassword: function () {

        //    ///api/v2/users/{id} 

        //},

        //getUserProfile: function (id) { }

    });

    return (window.FastFurnitureData = FastFurnitureData);

}());






