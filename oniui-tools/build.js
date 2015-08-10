var requirejs = require("requirejs")
requirejs.optimize({
	baseUrl: '.',
	name: "output",
	out: "main.js"
	//exclude: "avalon"
}, function(res) {
	console.log(res) // ³É¹¦
}, function(err) {
	console.log(err) // ³ö´í
})