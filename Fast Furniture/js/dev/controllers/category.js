;

/*
 * widths
 * < 720 : 150
 * < 1024: 220
 * > 1024: 320
 * 
 */

FastFurniture.fn.category = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {
        
        document.querySelector(".spa-view-category .view-title-large").innerHTML = response.paramValues.Name;

        fastFurnitureData.getCategoryProducts(response.paramValues.Name, function (response) {

            ve.bind({
                targetSelector: ".products-wrapper",
                templateName: "productGridItem",
                data: { "products": response },
                callback: function () {

                    var totalWidth = 0,
                        wrapper = document.querySelector(".products-wrapper"),
                        width = window.innerWidth,
                        itemWidth = 0,
                        firstWidth = 0;

                    if (width <720) {
                        itemWidth = 150;
                        firstWidth = 150;
                    } else if (width > 720 && width < 1024) {
                        itemWidth = 220;
                        firstWidth = 420;
                    } else {
                        itemWidth = 320;
                        firstWidth = 420;
                    }

                    if (response.length % 2 === 1) {
                        totalWidth = (((response.length - 1) * itemWidth) / 2);
                    } else {
                        totalWidth = ((response.length * itemWidth) / 2);
                    }

                    wrapper.style.width = (firstWidth + totalWidth) + "px";

                }
            });


        });

    }

});

