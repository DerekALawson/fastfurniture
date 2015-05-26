;

FastFurniture.fn.search = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var sv = this,
            searchField = document.getElementById("searchTerm");

        //clear the field just in case a previous value was entered and the markup not cleared from the page
        searchField.value = "";

        document.furnitureSearch.addEventListener("keypress", function (e) {
            sv.searchKeyCheck(e);
        });

        searchField.addEventListener("focus", sv.manageSearchIcons);
        searchField.addEventListener("blur", sv.manageSearchIcons);

        sv.searchData(response.paramValues.term);

    },

    searchData: function (term) {

        var sv = this,
            value = term || document.getElementById("searchTerm").value;

        if (value !== "") {

            fastFurnitureData.searchProducts(value, function (response) {

                if (response) {

                    document.querySelector(".search-result-list").innerHTML = "";
                    document.querySelector(".y-scroller-wrapper").scrollLeft = 0;

                    ve.bind({
                        targetSelector: ".search-result-list",
                        templateName: "searchReultItems",
                        data: {products: response}
                    });


                } else {
                    document.querySelector(".search-result-list").innerHTML = "<p>Sorry No Results</p>";
                }

            });

        }

    },

    searchKeyCheck: function (e) {

        //http://stackoverflow.com/questions/585396/how-to-prevent-enter-keypress-to-submit-a-web-form

        e = e || event;

        var sv = this,
            target = e.target || e.srcElement,
            txtArea = /textarea/i.test((target).tagName),
            key = e.keyCode || e.which || e.charCode || 0,
            ret = txtArea || (key) !== 13;

        if (ret) {
            return false;
        }

        sv.manageSearchIcons();

        if (key === 13) {

            e.preventDefault();

            sv.searchData();

        }

        return false;

    },

    manageSearchIcons: function (e) {

        var searchField = document.getElementById("searchTerm"),
            searchIcon = document.querySelector(".search-input-icon");

        if (searchField.value != "") {
            searchField.style.width = "100%";
            searchIcon.style.display = "none";
        } else {
            searchIcon.style.display = "inline-block";
            searchField.style.width = "";
        }

    }


});

