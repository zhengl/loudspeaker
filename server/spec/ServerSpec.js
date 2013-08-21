var request = require('request');
var server = require('../server');
var repository = require('./fakeDB');
var fixture = require('./fixture/boards');
var newBoard = require('./fixture/newBoard')
var util = require('util');

beforeEach(function(){
	repository.populate(fixture);
	server.start(8080, repository);
});

describe("Server", function(){
	var baseUrl = "http://localhost:8080";
	var boardsUrl = baseUrl + "/boards";

	it("runs", function(done){
		request.get(baseUrl, function(error, response, body){
			expect(response.statusCode).toEqual(200);
			done();
		});
	});

	it("returns list of boards", function(done){
		request.get(
			{
				uri: boardsUrl,
				json: true
			},
			function(error, response, body){
				expect(response.statusCode).toEqual(200);
				expect(util.isArray(body)).toBeTruthy();
				var board = body[0];
				expect(board.uuid).toBeDefined();
				expect(board.pages).toBeDefined();
				expect(board.pages.length).toBeGreaterThan(0);
				done();
			}
		);
	});

	it("adds board", function(done){
		request.post({ uri: boardsUrl, json: newBoard });

		request.get(
			{
				uri: boardsUrl,
				json: true
			},
			function(error, response, body){
				expect(response.statusCode).toEqual(200);
				expect(util.isArray(body)).toBeTruthy();
				var boards = body;
				expect(boards.length).toEqual(2);
				done();
			}
		);		
	});
});

afterEach(function(){
	server.stop();
});
