var express  = require("express");
var app = express();
var server;


function start(port, repository) {
	server = app.listen(port);
	
	app.get("/", function(req, res){
	res.send(200);
	});	

	app.get("/boards", function(req, res){
		res.send(repository.findAllBoards());
		res.send(200);
	});
	
	console.log("Server has started.");
}

function stop() {
	server.close();
	console.log("Server has stopped.");
}

exports.start = start;
exports.stop = stop;
