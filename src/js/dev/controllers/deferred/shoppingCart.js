;

FastFurniture.fn.shoppingCart = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var cart = this;

        ve.bind({
            targetSelector: ".shopping-cart-wrapper",
            templateName: "shoppingCartTemplate",
            data: {
                "Items": [
                    {
                        "Id": 46535,
                        "Name": "0275S1 mcneilly stat",
                        "Slug": "0275S1-mcneilly-stat",
                        "Photos": {
                            "Original": "0275S1-mcneilly-stat.jpg",
                            "Display": "0275S1-mcneilly-stat.jpg",
                            "Mobile": "0275S1-mcneilly-stat.jpg",
                            "Thumb": "0275S1-mcneilly-stat.jpg"
                        },
                        "Qty": 3,
                        "Price": 549.0
                    },
                    {
                        "Id": 46535,
                        "Name": "0275S1 mcneilly stat",
                        "Slug": "0275S1-mcneilly-stat",
                        "Photos": { "Original": "0275S1-mcneilly-stat.jpg", "Display": "0275S1-mcneilly-stat.jpg", "Mobile": "0275S1-mcneilly-stat.jpg", "Thumb": "0275S1-mcneilly-stat.jpg" },
                        "Qty": 3,
                        "Price": 549.0
                    }
                ],
                "salesTax": "$49",
                "shipping": "$99",
                "grandTotal": "999"
            },
            callback: function(){
                //add stuff here

                cart.setupActions();

            }
        });


        cart.setupActions();


    },

    setupActions: function () {

        var cart = this;

        deeptissue(".btn-update").tap(function (e) {

            console.log("shopping cart updated");

        });
        
        deeptissue(".cart-item-qty").tap(function (e) {

            var target = e.target;

            console.log("shopping cart qty edit: ", target.innerHTML);

        });

    }

});

