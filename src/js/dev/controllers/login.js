;

FastFurniture.fn.login = FastFurniture.fn.fastFurnitureController.extend({

    onload: function (response) {

        var loginBtn = document.querySelector(".btn-login"),
            loginView = this,
            username, password;


        if (!auth.isAuthenticated()) {

            $(".login-form").show();

            loginBtn.addEventListener("click", function (e) {

                e.preventDefault();

                username = document.querySelector(".username");
                password = document.querySelector(".password");

                auth.login(username.value,
                                        password.value,
                                        function (data) {

                                            console.log(data);
                                            //data = loginView.syntaxHighlight(JSON.stringify(data, undefined, 4));

                                            //document.querySelector(".response-area")
                                            //    .appendChild(document.createElement('pre')).innerHTML = data;

                                        });

                return false;

            });

        }

    },

    //http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    syntaxHighlight: function (json) {

        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

});

