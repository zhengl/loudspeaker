require(['NoteEventTransformer', 'Event', 'Board', 'Note', 'Point'], function(NoteEventTransformer, Event, Board, Note, Point){


describe('NoteEventTransformer', function(){
	var transformer;
	var board;
	var note;

	beforeEach(function(){
		transformer = new NoteEventTransformer();
		note = new Note();
		board = new Board();	

		var boardElement = document.createElement('div');
		boardElement.style.position = "absolute";
		boardElement.style.top = '0';
		boardElement.style.left = '0';
		board.setElement(boardElement);

		var noteElement = document.createElement('div');
		note.setElement(noteElement);
		note.moveTo(new Point(10, 10))

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
});


});