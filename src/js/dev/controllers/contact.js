FastFurniture.fn.contact = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {


        if (this._super(response)) {

            this.bindForm();

        };
    },

    bindForm: function () {

        var contact = this,
            submitBtn = document.querySelector(".btn-contact-submit");

        submitBtn.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            contact.submitForm();

            return false;
        });
    },


    submitForm: function () {

        var contact = this,
            request = {
                "FirstName": document.querySelector("[name='FirstName']").value,
                "LastName": document.querySelector("[name='LastName']").value,
                "EMail": document.querySelector("[name='contact-email']").value,
                "Body": document.querySelector("[name='message']").value
            };

        contact.rotScope.data.postData({
                url: "http://love2devapi20160606115144.azurewebsites.net/api/InfoRequest",
                data: request
            })
            .then(function (result) {

                window.location.hash = "#!content/contact-confirmation";

            });

    }

});