/*getElementsByClassName IE8+ support Code */
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className) {
        return this.querySelectorAll("." + className);
    };
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}
/* Data Store */

/*  Parent Object*/
var App = {
    /*Initialistaion*/
    init: function () {
        /*Event handlers*/
        // var newCards = document.getElementsByClassName('add-card');
        // var editCards = document.getElementsByClassName('edit-card');
        // var deleteCards = document.getElementsByClassName('delete-card');
        // var draggables = document.getElementsByClassName('list-card');
        // var droppables = document.getElementsByClassName('list-card-area');

        App.showCart();

    },
    /*Show Items from JSON in cart*/
    showCart: function () {
        var cartData;
        App.getJSONData("http://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm",
        function(data) {
            var tr;
            App.getElement('item-nos').innerHTML = data.productsInCart.length;
            for (var i = 0; i < data.productsInCart.length; i++) {
                tr = $('<tr/>');
                tr.append("<td><div class=\"row\"><div class=\"col-sm-4\"><img src=\"assets/" + data.productsInCart[i].p_variation
                + ".jpg\" alt=\"...\" class=\"img-responsive\"/></div><div class=\"col-sm-8\"><h3 class=\"nomargin font--dark\">"
                + data.productsInCart[i].p_variation+ " " + data.productsInCart[i].p_name + "</h3><p>Style#: "
                + data.productsInCart[i].p_style + "</p><p>Colour: " + data.productsInCart[i].p_selected_color.name
                + "</p><p class=\"font--light item--action\"><span id=\"edit-item\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</span> | <span>&times; Remove</span> | <span>Save for Later</span></p></div></div></td>");
                tr.append("<td data-th=\"Size\" class=\"text-center\">" + data.productsInCart[i].p_selected_size.code + "</td>");
                tr.append("<td data-th=\"Qty\"><input type=\"number\" class=\"form-control text-center\" value=\"1\"></td>");
                tr.append("<td data-th=\"Price\" class=\"text-center\">" + data.productsInCart[i].c_currency + data.productsInCart[i].p_price + "</td>");
                $('#cart tbody').append(tr);
            }
        });
    },
    /*Request JSON data from URL*/
    getJSONData: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "json";
        xhr.onload = function() {
          var status = xhr.status;
          if (status == 200) {
            callback(xhr.response);
          }
        };
        xhr.send();
    },
    /*Delete a task*/
    deleteCard: function () {

    },
    getElement: function (id) {
        var ele = document.getElementById(id);
        return ele;
    },
    preventNav: function (ev) {

    }
};

/*Document Onload*/
document.addEventListener("DOMContentLoaded", function () {
    App.init();
}, false);
