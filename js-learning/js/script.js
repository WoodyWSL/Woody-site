// // 1st way to define a object
// var object1 = new Object();
// object1.name = "Woody";
// console.log(object1);

// // 2rd way to define a object
// var object2 = {
// 	name: "Woody2"
// }
// console.log(object2);

// // 3nd way to define a object
// function Object3 (name) {
// 	console.log(this);
// }

// var object3 = new Object3("Woody3");
// //console.log(object3);

// document.addEventListener("DOMContentLoaded", function (event) {
// 	function sayHi(event) {
// 		var name = document.getElementById("name").value;
// 		document.getElementById("content").textContent = "Hi " + name + '!';
// 	}

// 	document.getElementById("enter").addEventListener("click", sayHi);
// });

// (function (window) {
// 	var obj = {};
// 	var value = "hi";
// 	obj.foo = function () {
// 		console.log(this);
// 		console.log("value: " + value);
// 	};

// 	window.obj = obj;

// })(window);

// obj.foo();

function makeM(m) {
	return (
		function (x) {
			console.log(m);
			return m * x;
		}
	);
}

var m2 = makeM(2);
var m3 = makeM(3);
console.log(m2(10));
console.log(m3(10));
