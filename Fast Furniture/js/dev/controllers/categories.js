;

FastFurniture.fn.categories = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        console.log(categories);

        ve.bind(".categories-grid", "categoryListItem", { "categories": categories });

    }

});

