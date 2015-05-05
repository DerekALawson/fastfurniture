;

FastFurniture.fn.categories = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getCategories(home.renderHomeCategories);

    },

    renderHomeCategories: function (categories) {

        console.log(categories);

        ve.bind(".categories-grid", "categoryListItem", { "categories": categories });

    },

    callMe: function () {

        console.log("called me");

    }

});

