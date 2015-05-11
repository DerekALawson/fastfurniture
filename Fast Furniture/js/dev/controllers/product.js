;

FastFurniture.fn.product = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        this.getProduct(response.paramValues.Name);
    },

    getProduct: function (slug) {

        var prod = this;

        fastFurnitureData.getProduct(slug, function (response) {

            ve.bind(".product-details", "productDetails", response);
            ve.bind(".product-details-related-products", "relatedProduct", response);

            document.querySelector(".add-to-cart").addEventListener("click", prod.addProductToCart);

        });

    },

    addProductToCart: function (e) {



    }

});

