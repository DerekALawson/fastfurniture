;

FastFurniture.fn.shoppingCart = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        ve.bind({
            targetSelector: ".shopping-cart-wrapper",
            templateName: "shoppingCartTemplate",
            data: {
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
            },
            callback: function(){
            //add stuff here
            }
        });

    }

});

