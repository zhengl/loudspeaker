require(['BoardFactory', 'NoteFactory', 'Palette', 'Event', 'Point', 'MouseEventPreprocessor'], function(BoardFactory, NoteFactory, Palette, Event, Point, MouseEventPreprocessor){


describe('Page', function(){
	var baord;
	var note;
	var boardElement;
	var noteElement;

	beforeEach(function(){
		boardElement = document.createElement('div');
		boardElement.id = 'board';
		boardElement.style.position = "absolute";
		boardElement.style.top = '0';
		boardElement.style.left = '0';
		document.body.appendChild(boardElement);

		var palette = new Palette();
		
		noteElement = document.createElement('div');
		noteElement.id = 'note';
		document.body.appendChild(noteElement);

		var preprocessor = new MouseEventPreprocessor();
		var options = {
			element: boardElement,
			width: 100,
			height: 100,
			palette: palette,
			eventPreprocessor: preprocessor,
		};

		var noteOptions = {
			element: noteElement,
			width: 50,
			height: 50,
			palette: palette,
			eventPreprocessor: preprocessor,
		};
		var boardFactory = new BoardFactory();
		boardFactory.setOptions(options);
		board = boardFactory.create();

		var noteFactory = new NoteFactory();
		noteFactory.setOptions(noteOptions);
		note = noteFactory.create();
	});

	it("appends another page", function(){
		drawALineOn(note, 0, 0, 20, 0);

		expectOneItem(note);
		expectNoDraftItem(note);
		expectNoItem(board);
		expectNoDraftItem(board);

		board.addItem(note);
		expect(board.getElement().lastChild).toBe(note.getElement());
		drawALineOn(note, 10, 0, 10, 10);

		expect(note.getContext().getItems().length).toEqual(2);
		expectNoDraftItem(note);
		expectOneItem(board);
		expectNoDraftItem(board);

		drawALineOn(board, 20, 20, 30, 30);
		expect(note.getContext().getItems().length).toEqual(2);
		expectNoDraftItem(note);
		expect(board.getContext().getItems().length).toEqual(2);
		expectNoDraftItem(board);
	});

	it("should be movable after being appended as a note", function(){
		board.addItem(note);

		triggerStartMovingEvent(note.getEventBus(), note, 0, 0);
		triggerMoveToEvent(note.getEventBus(), note, 10, 10);
		triggerFinishMovingEvent(note.getEventBus());

		expect(note.getPosition()).toEqual({x: 10, y: 10});
		// expect(board.getElement().lastChild).toBe(note.getElement());
	});

	it("should be removable after being appended", function(){
		board.addItem(note);
		board.getContext().removeItem(note);

		expectNoItem(board);
	});

	it("should not be movable as a board", function(){
		triggerStartMovingEvent(board.getEventBus(), board, 0, 0);
		triggerMoveToEvent(board.getEventBus(), board, 10, 10);
		triggerFinishMovingEvent(board.getEventBus());

		expect(board.getPosition()).not.toEqual({x: 10, y: 10});
	});

	afterEach(function(){
		if(noteElement.parentNode) noteElement.parentNode.removeChild(noteElement);
		document.body.removeChild(boardElement);
	});

	function addDiv(id, body){
		var div = document.createElement('div');
		div.id = id;
		body.appendChild(div);
		return div;
	}

	function drawALineOn(page, x1, y1, x2, y2){
		triggerStartDrawingEvent(page.getEventBus(), x1, y1);
		triggerDrawToEvent(page.getEventBus(), x2, x2);
		triggerFinishDrawingEvent(page.getEventBus(), x2, y2);		
	}

});


});