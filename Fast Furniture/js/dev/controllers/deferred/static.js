;

FastFurniture.fn.static = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var st = this;

        fastFurnitureData.getStatic(response.paramValues.slug, function (content) {

            st.renderContent(content);

        });

    },

    renderContent: function (content) {

        var home = this;

        content.Content = content.Content.split(/\r\n/);

        ve.bind({
            targetSelector: ".spa-view-static",
            templateName: "staticText",
            data: content
        });


    }

});

