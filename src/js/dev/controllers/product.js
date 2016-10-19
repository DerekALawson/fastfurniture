;

FastFurniture.fn.product = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        this.getProduct(response.paramValues.Name);
    },

    getProduct: function (slug) {

        var prod = this;

        prod.rootScope.data.getItem("data/Products/" + slug + ".json", "product", slug)
            .then(function (response) {

            try {

                prod.rootScope.viewEngine.bind({
                    targetSelector: ".product-details",
                    templateName: "productDetails",
                    data: response,
                    callback: function () {

                        document.querySelector(".add-to-cart")
                            .addEventListener("click", prod.addProductToCart);

                    }
                });

                prod.rootScope.viewEngine.bind({
                    targetSelector: ".product-details-related-products",
                    templateName: "relatedProduct",
                    data: response
                });

            } catch (e) {

                console.log("error ", e);

            }

        });

    },

    addProductToCart: function (e) {

    }

});

