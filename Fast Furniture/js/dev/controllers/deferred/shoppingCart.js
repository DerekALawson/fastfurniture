;

FastFurniture.fn.shoppingCart = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        ve.bind(".shopping-cart-wrapper", "shoppingCartTemplate", {
            "Items": [
                {
                    "Id": 46535,
                    "Name": "0275S1-mcneilly-stat",
                    "Slug": "0275S1-mcneilly-stat",
                    "Photos": {
                        "Original": "0275S1-mcneilly-stat.jpg",
                        "Display": "0275S1-mcneilly-stat.jpg",
                        "Mobile": "0275S1-mcneilly-stat.jpg",
                        "Thumb": "0275S1-mcneilly-stat.jpg"
                    },
                    "Price": 549.0
                },
                {
                    "Id": 46535,
                    "Name": "0275S1-mcneilly-stat",
                    "Slug": "0275S1-mcneilly-stat",
                    "Photos": { "Original": "0275S1-mcneilly-stat.jpg", "Display": "0275S1-mcneilly-stat.jpg", "Mobile": "0275S1-mcneilly-stat.jpg", "Thumb": "0275S1-mcneilly-stat.jpg" },
                    "Price": 549.0
                }
            ],
            "salesTax": "$49",
            "shipping": "$99",
            "grandTotal": "999"
        });

    }

});

