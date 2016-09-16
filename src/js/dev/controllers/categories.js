;

FastFurniture.fn.categories = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getItem("data/categories.json", "slug", "home-categories")
            .then(function (categories) {

                home.renderHomeCategories(categories);

            });

    },

    renderHomeCategories: function (categories) {

        ve.bind({
            targetSelector: ".categories-grid",
            templateName: "categoryListItem",
            data: { "categories": categories }
        });

    }

});

