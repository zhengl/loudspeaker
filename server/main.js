var server = require('./server');
var repository = require('./spec/fakeDB');
var fixture = require('./spec/fixture/boards');

repository.populate(fixture);
server.start(8080, repository);


