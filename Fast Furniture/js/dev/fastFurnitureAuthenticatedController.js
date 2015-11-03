;

FastFurniture.fn.fastFurnitureAuthenticatedController = FastFurniture.fn.fastFurnitureController.extend({

    //Custom Fast Furniture functions common to many authentication requiring view controllers should go here.

    init: function (response) {

        if (!this.isAuthenticated()) {
            window.location.hash = "#!login/";
            //+encodeURIComponent(this.getRoute());
            return;
        }

        this._super(response);

    },


    isAuthenticated: function () {

        return !(null === localStorage.getItem("fast-furniture-user-session"));

    }

});

