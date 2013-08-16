var express  = require("express")
var app = express();
var server;

app.get("/", function(req, res){
	res.send(200);
});

function start(port) {
	server = app.listen(port);
	console.log("Server has started.");
}

function stop() {
	server.close();
	console.log("Server has stopped.");
}


exports.start = start;
exports.stop = stop;
