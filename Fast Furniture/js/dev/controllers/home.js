;

FastFurniture.fn.home = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var home = this;

        fastFurnitureData.getHomeCategories(function (response) {

            home.renderHomeCategories(response);

        });

    },

    renderHomeCategories: function (categories) {

        ve.bind({
            targetSelector: ".products-wrapper", 
            templateName: "categoryGridItem", 
            data:{ "categories": categories }
        }, window.performance.now());

        //var start, end;

        //start = window.performance.now();

        //requestAnimationFrame(function () {

        //    document.querySelector(".products-wrapper").innerHTML = categories;

        //    end = window.performance.now();

        //    console.log("home rendered in ms: ", end - start);

        //});

    }

});

