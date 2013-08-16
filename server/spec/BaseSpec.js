var request = require('superagent');
var expect = require('expect.js');
var server = require('../server')
var server;

before(function(){
	server.start(8080);
})


describe("Server", function(){
	it("runs", function(done){
		request.get("localhost:8080").end(function(res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			done();
		});
	});
});

after(function(){
	server.stop();
})