;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getHomeCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        ve.bind(".products-wrapper", "categoryGridItem", { "categories": categories });


    }

});

