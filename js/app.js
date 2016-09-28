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
        // var editCards = document.getElementsByClassName('edit-card');
        // var deleteCards = document.getElementsByClassName('delete-card');
        // var draggables = document.getElementsByClassName('list-card');
        // var droppables = document.getElementsByClassName('list-card-area');

        App.showCart();
    },
    /*Show Items from JSON in cart*/
    showCart: function () {
        var cartData;
        App.getJSONData("https://api.myjson.com/bins/19ynm",
        function(data) {
            var tr;
            App.getElement('item-nos').innerHTML = data.productsInCart.length;
            for (var i = 0; i < data.productsInCart.length; i++) {
                tr = $('<tr/>');
                tr.append("<td><div class=\"row\"><div class=\"col-sm-4\"><img src=\"assets/" + data.productsInCart[i].p_variation
                + ".jpg\" alt=\"...\" class=\"img-responsive\"/></div><div class=\"col-sm-8\"><h4 class=\"nomargin font--dark\">"
                + data.productsInCart[i].p_variation+ " " + data.productsInCart[i].p_name + "</h4><p>Style#: "
                + data.productsInCart[i].p_style + "</p><p>Colour: " + data.productsInCart[i].p_selected_color.name
                + "</p><p class=\"font--light item--action\"><span class=\"edit--item\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</span> | <span>&times; Remove</span> | <span>Save for Later</span></p></div></div></td>");
                tr.append("<td data-th=\"Size\" class=\"text-center\">" + data.productsInCart[i].p_selected_size.code + "</td>");
                tr.append("<td data-th=\"Qty\"><input type=\"number\" class=\"form-control text-center\" value=\"1\"></td>");
                tr.append("<td data-th=\"Price\" class=\"text-center\">" + data.productsInCart[i].c_currency + data.productsInCart[i].p_price + "</td>");
                $('#cart tbody').append(tr);
            }
            App.cartSummary(data);
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
    cartSummary: function (data) {
      var totalPrice = 0;
      var discount = 0;
      var discountPrice = 0;
      var estimatedPrice = 0;
        for (var i = 0; i < data.productsInCart.length; i++) {
            totalPrice = data.productsInCart[i].p_price + totalPrice;
        }
        if(data.productsInCart.length = 3) {
            discount = 0.05;
        } else if (3 < data.productsInCart.length < 6) {
            discount = 0.10;
        } else if (data.productsInCart.length > 6){
            discount = 0.25;
        } else { discount = 0; }
        discountPrice = totalPrice * discount;
        estimatedPrice = totalPrice - discountPrice;

        console.log(totalPrice +"-"+ discount +"-"+ discountPrice +"-"+ estimatedPrice);

        document.getElementById('totalPrice').innerHTML = '$'+ totalPrice;
        document.getElementById('discountPrice').innerHTML = discountPrice ? '-$'+ discountPrice : 0;
        document.getElementById('estimatedPrice').innerHTML = '$'+ estimatedPrice;
    },
    getElement: function (id) {
        var ele = document.getElementById(id);
        return ele;
    }
};

/*Document Onload*/
document.addEventListener("DOMContentLoaded", function () {
    App.init();
}, false);
