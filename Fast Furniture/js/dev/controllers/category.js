;

FastFurniture.fn.category = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        fastFurnitureData.addCategory({
            "Name": "Chris Love",
            "Slug": "chrislove",
            "Children": []
        }, function (response) {
            console.log(response);
        });

        fastFurnitureData.udpateCategory({
            "Name": "Chris Love",
            "Slug": "chrislove",
            "Children": []
        });

        fastFurnitureData.getCategory("clocks");

        fastFurnitureData.deleteCategory("clocks");

        fastFurnitureData.getCategories(function () {

            console.log("categories recieved");

        });

        fastFurnitureData.getCategoryProducts("clocks", function () {

            console.log("recieved category products");
        });

    }

});

