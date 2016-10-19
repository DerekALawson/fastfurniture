;

FastFurniture.fn.categories = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        home.rootScope.data.getItem("data/categories.json", "slug", "home-categories")
            .then(function (categories) {

                home.renderHomeCategories(categories);

            });

    },

    renderHomeCategories: function (categories) {

        this.rootScope.viewEngine.bind({
            targetSelector: ".categories-grid",
            templateName: "categoryListItem",
            data: { "categories": categories }
        });

    }

});

