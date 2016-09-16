(function (undefined) {

    "use strict";


    var Authenticate = function (config) {

        return new Authenticate.fn.init(config);

    };


    Authenticate.fn = Authenticate.prototype = {

        constructor: Authenticate,

        init: function (config) {

            var authenticate = this;

            if (!config.ajax || !config.provider) {
                throw "Must provide an AJAX provider and list the authentication provider";
            }

            authenticate.ajax = config.ajax;
            authenticate.cache = config.cache;
            authenticate.provider = config.provider;
            authenticate.appPrefix = config.appPrefix;

            return authenticate;
        },

        cache: undefined,
        provider: "",
        appPrefix: "",

        isAuthenticated: function () {

            return (this.getUserToken() !== null);

        },

        getUserToken: function () {

            var token = JSON.parse(localStorage.getItem(this.appPrefix + "userToken"));

            if (token) {
                return token;
            }

            return JSON.parse(sessionStorage.getItem(this.appPrefix + "userToken"));

        },

        saveUserToken: function (token, remember) {

            if (remember) {

                localStorage.setItem(this.appPrefix + "userToken", JSON.stringify(token));

            } else {

                sessionStorage.setItem(this.appPrefix + "userToken", JSON.stringify(token));
            }

        },

        login: function (username, password, remember, success, error) {

            var auth = this;

            return auth.ajax.postData({
                url: "https://love2dev.auth0.com/oauth/ro",
                success: function (jwt) {

                    jwt = auth.FormatJWT(jwt.id_token);

                    auth.saveUserToken(jwt, remember);

                    if (success) {
                        success(jwt);
                    }

                },
                error: error,
                data: {
                    "client_id": "oYREKdagTrGmgKDZKN6CSxmGM7kVhKDs",
                    "username": username,
                    "password": password,
                    "id_token": "",
                    "connection": "Username-Password-Authentication",
                    "grant_type": "passwordurn",
                    "scope": "openid profile",
                    "device": ""
                }
            });

        },

        loginSocial: function (social) { },

        logout: function () {

            var tokenKey = this.appPrefix + "userToken";

            var token = localStorage.getItem(tokenKey);

            if (token) {
                localStorage.removeItem(tokenKey);
                return;
            }

            sessionStorage.removeItem(tokenKey);

        },

        getUserProfile: function (userid) {

            var auth = this;

            //https://love2dev.auth0.com/api/v2/users/auth0%7C5642114bc511bfb07cc86aa7?fields=picture%2Cuser_metadata%2Cemail%2Cuser_id%2Cusername&include_fields=true
        },



        isInRole: function(role) {

            var roles = this.cache.getObject("user-Profile");

            return (roles.indexOf(role) > -1);

        },


        FormatJWT: function (jwt) {

            if (jwt === "") {
                return "";
            }

            var segments = jwt.split('.'),
                header, content;

            if (segments.length != 3) {
                throw "JWT is required to have three segments"
            }

            content = this.Base64URLDecode(segments[1]);

            return content;

        },

        Base64URLDecode: function (base64UrlEncodedValue) {

            var result,
                newValue = base64UrlEncodedValue.replace("-", "+").replace("_", "/");

            try {

                result = decodeURIComponent(escape(window.atob(newValue)));

            } catch (e) {
                throw "Base64URL decode of JWT segment failed";
            }

            return JSON.parse(result);
        },

        version: "0.0.1"
    };

    // Give the init function the Authenticate prototype for later instantiation
    Authenticate.fn.init.prototype = Authenticate.fn;


    return window.Authenticate = Authenticate;

}());
