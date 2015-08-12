;

FastFurniture.fn.categories = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getCategories(home.renderHomeCategories);

    },

    renderHomeCategories: function (categories) {

        ve.bind({
            targetSelector: ".categories-grid",
            templateName: "categoryListItem",
            data: { "categories": categories }
        });

    }

});

