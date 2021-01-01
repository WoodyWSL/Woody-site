document.addEventListener("DOMContentLoaded", function (event) {
	document.querySelector("button").addEventListener(
		"click", 
		function () {
		console.log("clicked");
		$ajaxUtils.sendGetRequest("/Ajax-learning/name/text.txt", function (res) {
			var name = res;
			console.log("Name: ");

			document.querySelector("#content").innerHTML = 
				"<h2>Hello " + name + "!</h2>";
		}, 
		false);
	});
});