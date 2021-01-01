$(function () {


	$("#navbarToggle").blur(function (event) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
});

(function (global) {

	var dc = {};

	var homeHtml = "snippets/home-snippet.html";

	// A url to get categories JSON data
	var allCategoriesUrl = 
		"http://davids-restaurant.herokuapp.com/categories.json";

	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/category-snippet.html"

	// A url to get menu items JSON data
	var menuItemUrl = 
		"http://davids-restaurant.herokuapp.com/menu_items.json?category=";

	var menuItemTitleHtml = "snippets/menu-items-title.html";
	var menuItemHtml = "snippets/menu-item.html";

	// Insert the html code into the the element identified by "selector"
	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	// Show loading icon inside the element identified by "selector"
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
  	html += "<img src='images/ajax-loader.gif'></div>";
  	insertHtml(selector, html);
	};

	// Return the given string which substitute 
	// of '{{propName}}' with the propValue
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		// Replace all propToReplace inside the given string by propValue
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}

	var switchMenuToActive = function () {
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navHomeButton").className = classes;

		classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") == -1) {
			classes += "active";
			document.querySelector("#navMenuButton").className = classes;
		}
	};

	document.addEventListener("DOMContentLoaded", function (event) {
		
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml, 
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			}, 
			false
		);
	});

	dc.loadMenuCategories = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
	};

	dc.loadMenuItems = function (categoryShort) {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(menuItemUrl + categoryShort, buildAndShowMenuItemsHTML);
	};

	var buildAndShowCategoriesHTML = function (categories) {
		$ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {

			$ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
				switchMenuToActive();

				var categoriesViewHtml = 
					buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);

				insertHtml("#main-content", categoriesViewHtml);

			}, false);
		}, false);
	};

	var buildAndShowMenuItemsHTML = function (categoryMenuItems) {
		$ajaxUtils.sendGetRequest(menuItemTitleHtml, function (menuItemsTitleHtml) {

			$ajaxUtils.sendGetRequest(menuItemHtml, function (menuItemHtml) {
				switchMenuToActive();

				var menuItemsViewHtml = 
					buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);

				insertHtml("#main-content", menuItemsViewHtml);

			}, false);
		}, false);
	};	

	var buildCategoriesViewHtml = function (categories, categoriesTitleHtml, categoryHtml) {
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section calss='row'>";

		// Loop over the categories
		for (var i = 0; i < categories.length; i++) {
			var html = categoryHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "short_name", short_name);
			finalHtml += html;
		}

		finalHtml += "</section>";

		return finalHtml;
	};

	var buildMenuItemsViewHtml = function (categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
		menuItemsTitleHtml = 
			insertProperty(menuItemsTitleHtml, "name", 
										 categoryMenuItems.category.name);
		menuItemsTitleHtml = 
			insertProperty(menuItemsTitleHtml, "special_instructions", 
										 categoryMenuItems.category.special_instructions);

		var finalHtml = menuItemsTitleHtml;
		finalHtml += "<section calss='row'>";

		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;

		for (var i = 0; i < menuItems.length; i++) {
			var html = menuItemHtml;
			html = insertProperty(html, "short_name", menuItems[i].short_name);
			html = insertProperty(html, "catShortName", catShortName);
			html = insertItemPrice(html, "price_small", menuItems[i].price_small);
			html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
			html = insertItemPrice(html, "price_large", menuItems[i].price_large);
			html = insertItemPortionName(html, "small_portion_name", menuItems[i].large_portion_name);
			html = insertProperty(html, "name", menuItems[i].name);
			html = insertProperty(html, "description", menuItems[i].description);

			if (i % 2 != 0) {
				html += 
					"<div class='clearfix visible-md-block visible-lg-block'></div>";
			}

			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;

	};

	var insertItemPrice = function (html, pricePropName, priceValue) {
		if (!priceValue) {
			return insertProperty(html, pricePropName, "");
		}
		else {
			priceValue = '$' + priceValue.toFixed(2);
			return insertProperty(html, pricePropName, priceValue);
		}
	};

	var insertItemPortionName = function (html, portionPropName, portionValue) {
		if (!portionValue) {
			return insertProperty(html, portionPropName, "");
		}
		else {
			portionValue = '(' + portionValue + ')';
			return insertProperty(html, portionPropName, portionValue);
		}
	};

	global.$dc = dc;

})(window);