var express  = require("express");
var app = express();
var server;

app.use(express.bodyParser());

function start(port, repository) {
	server = app.listen(port);
	
	app.get("/", function(req, res){
		res.send(200);
	});	

	app.get("/boards", function(req, res){
		res.json(200, repository.findAllBoards());
	});

	app.post("/boards", function(req, res){
		repository.addBoard(req.body);
		res.send(200);
	});
}

function stop() {
	server.close();
}

exports.start = start;
exports.stop = stop;
