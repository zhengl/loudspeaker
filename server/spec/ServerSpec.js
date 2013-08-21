var request = require('request');
var server = require('../server');
var repository = require('./fakeDB');
var fixture = require('./fixture/boards')
var util = require('util');

beforeEach(function(){
	repository.populate(fixture);
	server.start(8080, repository);
});

describe("Server", function(){
	var baseUrl = "http://localhost:8080";

	it("runs", function(done){
		request.get(baseUrl, function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	});

	it("returns list of boards", function(done){
		request.get(
			{
				uri: baseUrl + "/boards",
				json: true
			},
			function(error, response, body){
				expect(response.statusCode).toEqual(200);
				expect(util.isArray(body)).toBeTruthy();
				done();
			}
		);
	});
});

afterEach(function(){
	server.stop();
});
