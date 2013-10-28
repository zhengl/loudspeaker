require(['NoteEventTransformer', 'Event', 'Board', 'Note', 'Point', 'KineticContext'], function(NoteEventTransformer, Event, Board, Note, Point, KineticContext){


describe('NoteEventTransformer', function(){
	var transformer;
	var board;
	var note;

	var boardElement;

	beforeEach(function(){
		transformer = new NoteEventTransformer();
		note = new Note();
		board = new Board();

		boardElement = document.createElement('div');
		boardElement.style.position = "absolute";
		boardElement.style.top = '0';
		boardElement.style.left = '0';
		boardElement.id = 'board';
		board.setElement(boardElement);

		var context = new KineticContext(boardElement, 50, 50);
		board.setContext(context);
		context.setPage(board);

		var noteElement = document.createElement('div');
		note.setElement(noteElement);
		note.moveTo(new Point(10, 10));

		document.body.appendChild(boardElement);

		board.addItem(note);
	});

	it("should transform coordinates for MOVE_TO of Note", function(){
		var event = new Event(Event.Page.MOVE_TO, { item: note, position: { x: 10, y: 10} });
		var transformedEvent = transformer.transform(event);
		expect(transformedEvent.data.position.x).toEqual(20);
		expect(transformedEvent.data.position.y).toEqual(20);
	});

	it("should transform coordinates for MOVE_TO of Note with zoom percentage", function(){
		note.setZoomPercentage(2);
		var event = new Event(Event.Page.MOVE_TO, { item: note, position: { x: 10, y: 10} });
		var transformedEvent = transformer.transform(event);
		expect(transformedEvent.data.position.x).toEqual(30);
		expect(transformedEvent.data.position.y).toEqual(30);
	});	

	afterEach(function(){
		document.body.removeChild(boardElement);
	});
});


});