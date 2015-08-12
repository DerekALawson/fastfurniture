;

FastFurniture.fn.product = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        this.getProduct(response.paramValues.Name);
    },

    getProduct: function (slug) {

        var prod = this;

        fastFurnitureData.getProduct(slug, function (response) {

            try {

                ve.bind({
                    targetSelector: ".product-details",
                    templateName: "productDetails",
                    data: response,
                    callback: function () {

                        document.querySelector(".add-to-cart")
                            .addEventListener("click", prod.addProductToCart);

                    }
                });

                ve.bind({
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

