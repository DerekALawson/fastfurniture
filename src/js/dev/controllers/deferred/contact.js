;

FastFurniture.fn.contact = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var contact = this

        document.contactForm.onsubmit = contact.requestSubmit;

    },

    requestSubmit: function (e) {

        e.preventDefault();
        e.stopPropagation();

        if (!this.checkValidity()) {
            //Implement you own means of displaying error messages to the user here.
            console.info("not valid");
        } else {
            
            console.log("contact form has been submitted");

            document.querySelector(".contact-form").classList.add("hide");

            var confirm = document.querySelector(".contact-form-confirm")

            confirm.classList.add("show");
            confirm.classList.remove("hide");

        }

        return false;
    }

});

