;

FastFurniture.fn.product = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {


        this.getRelatedProducts();
        this.getProduct(response.paramValues.Name);
    },

    getProduct: function (slug) {

        fastFurnitureData.getProduct(slug, function (response) {

            ve.bind(".product-details", "productDetails", response);

        });

    },

    getRelatedProducts: function () {

        fastFurnitureData.getRelatedProducts(function (response) {

            ve.bind(".product-details-related-products", "relatedProduct", {
                "product": {
                    "relatedProducts": response
                }});

        });


    }

});

