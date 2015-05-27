;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        console.log("onload home");

        fastFurniture.phoneMQL = home.setImageSizes;
        fastFurniture.smallTabletMQL = home.setImageSizes;
        fastFurniture.tabletMQL = home.setImageSizes;
        fastFurniture.desktopMQL = home.setImageSizes;

        fastFurnitureData.getHomeCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        var home = this;

        ve.bind({
            targetSelector: ".products-wrapper", 
            templateName: "categoryGridItem", 
            data: { "categories": categories },
            callback: home.setImageSizes
        });

    },

    setImageSizes: function () {

        var home = this,
            width = window.innerWidth,
            i = 0,
            productImages = document.querySelectorAll(".product-grid-photo");

        if (width < 600) {

            console.log("setup thumbnails");

            for (i = 0; i < productImages.length; i++) {
                productImages[i].src = productImages[i].src.replace(/originals|display|mobile/, "thumb")
            }

        } else if (width >= 600 && width <= 720) {

            console.log("setup mobile");

            for (i = 0; i < productImages.length; i++) {
                productImages[i].src = productImages[i].src.replace(/originals|display|thumb/, "mobile")
            }

        } else if (width > 720 && width <= 980) {

            console.log("setup mobile with lead display");

            for (i = 0; i < productImages.length; i++) {

                if (i === 0) {

                    productImages[i].src = productImages[i].src.replace(/originals|mobile|thumb/, "display")

                } else {

                    productImages[i].src = productImages[i].src.replace(/originals|display|thumb/, "mobile")
                }

            }

        } else if (width > 980) {

            console.log("setup displays with lead original");

            for (i = 0; i < productImages.length; i++) {

                if (i === 0) {

                    productImages[i].src = productImages[i].src.replace(/display|mobile|thumb/, "originals")

                } else {

                    productImages[i].src = productImages[i].src.replace(/originals|mobile|thumb/, "display")
                }
            }
        }

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

    beforeunload: function () {

        var home = this;

        console.log("unload home");

        fastFurniture.phoneMQL = undefined;
        fastFurniture.smallTabletMQL = undefined;
        fastFurniture.tabletMQL = undefined;
        fastFurniture.desktopMQL = undefined;

    }


});

