/*  Parent Object*/
var App = {
	/*Initialistaion*/
	init: function() {
		/*Event handlers*/
		$(document).on("click", ".edit--modal", function(e) {
			var itemIndex = $('#cart-content tr').index($(this).closest('tr'));
			App.showEdit(e, itemIndex);
		});
		App.showCart();
	},
	/*Show Items from JSON in cart*/
	showCart: function() {
		var cartData;
		App.getJSONData("https://api.myjson.com/bins/19ynm",
			function(data) {
				var tr;
				document.getElementById('item-nos').innerHTML = data.productsInCart.length;
				for (var i = 0; i < data.productsInCart.length; i++) {
					tr = $('<tr/>');
					tr.append("<td><div class=\"row\"><div class=\"col-sm-4 text-center\"><img src=\"assets/" + data.productsInCart[i].p_variation + ".jpg\" alt=\"...\" class=\"img-responsive\"/></div><div class=\"col-sm-8\"><h4 class=\"nomargin font--dark\">" + data.productsInCart[i].p_variation + " " + data.productsInCart[i].p_name + "</h4><p>Style#: " + data.productsInCart[i].p_style + "</p><p>Colour: " + data.productsInCart[i].p_selected_color.name + "</p><p class=\"font--light item--action\"><span class=\"edit--modal\" data-toggle=\"modal\" data-target=\"#editModal\">Edit</span> | <span>&times; Remove</span> | <span>Save for Later</span></p></div></div></td>");
					tr.append("<td data-th=\"Size\" class=\"item--size\">" + data.productsInCart[i].p_selected_size.code + "</td>");
					tr.append("<td data-th=\"Qty\"><input type=\"number\" class=\"form-control text-center\" value=\"1\"></td>");
					tr.append("<td data-th=\"Price\" class=\"item--price\">" + data.productsInCart[i].c_currency + data.productsInCart[i].p_price + "</td>");
					$('#cart tbody').append(tr);
				}
				App.cartSummary(data);
			});
	},
	/*Request JSON data from URL*/
	getJSONData: function(url, callback) {
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
	/*Update the Cart Summary*/
	cartSummary: function(data) {
		var totalPrice = 0;
		var discount = 0;
		var discountPrice = 0;
		var estimatedPrice = 0;
		for (var i = 0; i < data.productsInCart.length; i++) {
			totalPrice = data.productsInCart[i].p_price + totalPrice;
		}
		if (data.productsInCart.length = 3) {
			discount = 0.05;
		} else if (3 < data.productsInCart.length < 6) {
			discount = 0.10;
		} else if (data.productsInCart.length > 6) {
			discount = 0.25;
		} else {
			discount = 0;
		}
		discountPrice = totalPrice * discount;
		estimatedPrice = totalPrice - discountPrice;
		document.getElementById('totalPrice').innerHTML = '$' + totalPrice;
		document.getElementById('discountPrice').innerHTML = discountPrice ? '-$' + discountPrice : 0;
		document.getElementById('estimatedPrice').innerHTML = '$' + estimatedPrice;
	},
	/*Show Edit PopUp*/
	showEdit: function(e, itemIndex) {
		e.preventDefault();
		e.stopPropagation();
		App.getJSONData("https://api.myjson.com/bins/19ynm",
			function(data) {
				document.getElementById('item-name').innerHTML = data.productsInCart[itemIndex].p_variation + " " + data.productsInCart[itemIndex].p_name;
				document.getElementById('item-price').innerHTML = data.productsInCart[itemIndex].c_currency + data.productsInCart[itemIndex].p_price;
				document.getElementById("item-image").src = "assets/" + data.productsInCart[itemIndex].p_variation + ".jpg";
				var sizeVariant = document.getElementById("item-size-variant");
				for (i = 0; i < data.productsInCart[itemIndex].p_available_options.sizes.length; i++) {
					var option = document.createElement("option");
					option.text = data.productsInCart[itemIndex].p_available_options.sizes[i].name;
					sizeVariant.add(option);
				}
			});
	}
};
/*Document Onload*/
document.addEventListener("DOMContentLoaded", function() {
	App.init();
}, false);
