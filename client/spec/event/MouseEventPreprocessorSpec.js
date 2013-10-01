require(['MouseEventPreprocessor', 'Note', 'Board', 'KineticContext'], function(MouseEventPreprocessor, Note, Board, KineticContext){


describe('MouseEventPreprocessor', function(){
	var preprocessor;

	beforeEach(function(){
		preprocessor = new MouseEventPreprocessor();
	});

	it("zooms event offset", function(){
		preprocessor.setZoomPercentage(0.9);
		var event = preprocessor.process(createEvent("mousedown", 100, 50));

		expect(event.offsetX).toEqual(90);
		expect(event.offsetY).toEqual(45);
	});

	it("recalculates event offset for notes on board", function(){
		var note = new Note();

		var noteElement = document.createElement("div");
		noteElement.style.position = "absolute";
		noteElement.style.left = "50px";
		noteElement.style.top = "50px";
		note.setElement(noteElement);

		var board = new Board();
		var boardElement = document.createElement("div");
		boardElement.id = "board";
		boardElement.style.position = "relative";
		boardElement.style.width = "100px";
		boardElement.style.height = "100px";
		board.setElement(boardElement);

		var context = new KineticContext(boardElement.id, 100, 100);
		board.setContext(context);
		context.setPage(board);

		document.body.appendChild(boardElement);
		
		board.addItem(note);

		var event = preprocessor.process(createEvent("mousedown", 10, 10, note));
		expect(event.offsetX).toEqual(60);
		expect(event.offsetY).toEqual(60);	
	});
});


});