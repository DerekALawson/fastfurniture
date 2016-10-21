;

FastFurniture.fn.fastFurnitureController = Controller.extend({

  //Custom Fast Furniture functions common to many view controllers should go here.
  onload: function (response) {

    return true;

  },

  render: function (options) {

    this.rootScope.viewEngine.bind(options);

  }


});