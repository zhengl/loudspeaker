require(['BoardFactory', 'NoteFactory', 'Palette', 'Event', 'Point', 'MouseEventPreprocessor'], function(BoardFactory, NoteFactory, Palette, Event, Point, MouseEventPreprocessor){


describe('Page', function(){
	var baord;
	var note;
	var boardElement;
	var noteElement;

	var BOARD_WIDTH = 100;
	var BOARD_HEIGHT = 100;
	var BOARD_RATIO = 16 / 9;

	var NOTE_WIDTH = 50;
	var NOTE_HEIGHT = 50;
	var NOTE_RATIO = 1;

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
			width: BOARD_WIDTH,
			height: BOARD_HEIGHT,
			ratio: BOARD_RATIO,
			palette: palette,
			eventPreprocessor: preprocessor,
		};

		var noteOptions = {
			element: noteElement,
			width: NOTE_WIDTH,
			height: NOTE_HEIGHT,
			ratio: NOTE_RATIO,
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

		expect(note).toHaveOneItem();
		expect(note).toHaveNoDraftItem();
		expect(board).toHaveNoItem();
		expect(board).toHaveNoDraftItem();

		board.addItem(note);
		expect(board.getElement().lastChild).toBe(note.getElement());
		drawALineOn(note, 10, 0, 10, 10);

		expect(note.getContext().getItems().length).toEqual(2);
		expect(note).toHaveNoDraftItem();
		expect(board).toHaveOneItem();
		expect(board).toHaveNoDraftItem();

		drawALineOn(board, 20, 20, 30, 30);
		expect(note.getContext().getItems().length).toEqual(2);
		expect(note).toHaveNoDraftItem();
		expect(board.getContext().getItems().length).toEqual(2);
		expect(board).toHaveNoDraftItem();
	});

	it("should be movable after being appended as a note", function(){
		board.addItem(note);

		triggerStartMovingEvent(note.getEventBus(), note, 0, 0);
		triggerMoveToEvent(note.getEventBus(), note, 10, 10);
		triggerFinishMovingEvent(note.getEventBus());

		expect(note.getPosition()).toEqual({x: 10, y: 10});
		expect(board.getElement().lastChild).toBe(note.getElement());
	});

	it("should reset zoom percentage after window resize", function(){
		noteElement.style.width = "100px";
		fireResizeEvent();

		expect(note.getZoomPercentage()).toEqual(NOTE_WIDTH / 100);
	});

	it("should not relocate after window resize as a note not being appended to a board", function(){
		board.addItem(note);
		note.moveTo(new Point(10, 20));

		noteElement.style.width = "100px";
		fireResizeEvent();

		expect(noteElement.style.left).toEqual('20px');
		expect(noteElement.style.top).toEqual('40px');
	});

	it("should relocate after window resize as a note being appended to a board", function(){
		fireResizeEvent();

		expect(noteElement.style.left).toEqual('');
		expect(noteElement.style.top).toEqual('');
	});

	it("should be removable after being appended", function(){
		board.addItem(note);
		board.getContext().removeItem(note);

		expect(board).toHaveNoItem();
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