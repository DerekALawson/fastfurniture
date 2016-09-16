;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getItem("data/home-categories.json", "slug", "home-categories")
            .then(function (categories) {

                home.renderHomeCategories(categories);

            });

    },

    renderHomeCategories: function (categories) {

        var home = this;

        ve.bind({
            targetSelector: ".products-wrapper",
            templateName: "categoryGridItem",
            data: { "categories": categories }
        })

    }

});

