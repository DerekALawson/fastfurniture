;

FastFurniture.fn.category = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        //fastFurnitureData.addCategory({
        //    "Name": "Chris Love",
        //    "Slug": "chrislove",
        //    "Children": []
        //}, function (response) {
        //    console.log(response);
        //});

        //fastFurnitureData.udpateCategory({
        //    "Name": "Chris Love",
        //    "Slug": "chrislove",
        //    "Children": []
        //});

        //fastFurnitureData.getCategory("clocks");

        //fastFurnitureData.deleteCategory("clocks");

        //fastFurnitureData.getCategories(function () {

        //    console.log("categories recieved");

        //});

        fastFurnitureData.getCategoryProducts(response.paramValues.Name, function (response) {


            ve.bind({
                targetSelector: ".products-wrapper",
                templateName: "productGridItem",
                data: { "products": response },
                callback: function () {

                    var totalWidth = 0,
                        wrapper = document.querySelector(".products-wrapper");

                    if (response.length % 2 === 1) {
                        totalWidth = (((response.length - 1) * 260) / 2) + 440
                    } else {
                        totalWidth = ((response.length * 260) / 2) + 440
                    }

                    wrapper.style.width = totalWidth + "px";

                }
            });


        });

    }

});

