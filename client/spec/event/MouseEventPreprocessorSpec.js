require(['MouseEventPreprocessor', 'Note', 'Board', 'KineticContext', 'Point'], function(MouseEventPreprocessor, Note, Board, KineticContext, Point){


describe('MouseEventPreprocessor', function(){
	var preprocessor;

	beforeEach(function(){
		preprocessor = new MouseEventPreprocessor();
	});

	it("zooms event offset", function(){
		preprocessor.setZoomPercentage(0.9);
		var event = preprocessor.process(createEvent("mousedown", null, null, null, 100, 50));

		expect(event.canvasX).toEqual(90);
		expect(event.canvasY).toEqual(45);
	});

	it("recalculates event offset for notes on board", function(){
		var note = new Note();

		var noteElement = document.createElement("div");
		note.setElement(noteElement);
		note.setPosition(new Point(50, 50));

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

		var event = preprocessor.process(createEvent("mousedown", null, null, note, 10, 10));
		expect(event.canvasX).toEqual(10);
		expect(event.canvasY).toEqual(10);	
	});
});


});