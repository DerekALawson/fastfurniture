;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getHomeCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        var home = this;

        ve.bind({
            targetSelector: ".products-wrapper", 
            templateName: "categoryGridItem", 
            data: { "categories": categories }
        });

    }

});

