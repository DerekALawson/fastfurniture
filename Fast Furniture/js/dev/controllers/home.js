;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getHomeCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        ve.bind({
            targetSelector: ".products-wrapper", 
            templateName: "categoryGridItem", 
            data:{ "categories": categories }
        }, window.performance.now());

    },

    setImageSize: function () {

        var home = this,
            width = window.innerWidth;

    },

    /*

    mqlPhone,
    mqlSmallTablet,
    mqlTablet,
    mqlDesktop,


    setupResponsiveCallbacks: function () {

        var home = this;

        home.mqlPhone = window.matchMedia("(max-width: 600px)");

        home.mqlPhone.addListener(function (e) {

            home.setImageSize();

        });


        home.mqlSmallTablet = window.matchMedia("(min-width: 600px)");

        home.mqlSmallTablet.addListener(function (e) {

            home.setImageSize();

        });

        home.mqlTablet = window.matchMedia("(min-width: 720px)");

        home.mqlTablet.addListener(function (e) {

            home.setImageSize();

        });

        home.mqlDesktop = window.matchMedia("(min-width: 1100px)");

        home.mqlDesktop.addListener(function (e) {

            home.setImageSize();

        });

    },
    */

    unload: function () {

//        var home = this;

//        if (home.mqlPhone) {
//            home.mqlPhone.removeListener();
//        }

//        mqlPhone,
//mqlSmallTablet,
//mqlTablet,
//mqlDesktop,


    }


});

