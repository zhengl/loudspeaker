var request = require('request');
var server = require('../server')

beforeEach(function(){
	server.start(8080);
})


describe("Server", function(){
	it("runs", function(done){
		request("http://localhost:8080", function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	});
});

afterEach(function(){
	server.stop();
})