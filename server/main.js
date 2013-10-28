var server = require('./server');
var repository = require('./spec/fakeDB');
var fixture = require('./spec/fixture/boards');

exports.start = function(){
	repository.populate(fixture);
	server.start(8080, repository);
};

exports.stop = function(){
	server.stop();
};
