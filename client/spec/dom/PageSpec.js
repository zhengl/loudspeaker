require(['DOMBoardFactory', 'DOMNoteFactory', 'Event', 'Point'], function(DOMBoardFactory, DOMNoteFactory, Event, Point){


describe('Page', function(){
	var baord;
	var note;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		var boardElement = addDiv("board", body);

		var palette = document.createElement('div');
		
		var paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		palette.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		palette.appendChild(paletteBlack);
		
		addDiv("rubbishbin", body);

		var noteElement = addDiv("note", body);
		addDiv("note-rubbishbin", body);

		board = DOMBoardFactory.create(boardElement, 100, 100, palette, "rubbishbin", 10, 50);
		note = DOMNoteFactory.create(noteElement, 50, 50, palette, "note-rubbishbin", 1, 10);
	});

	it("appends another page", function(){
		drawALineOn(note, 0, 0, 20, 0);

		expectOneItem(note);
		expectNoDraftItem(note);
		expectNoItem(board);
		expectNoDraftItem(board);

		board.addItem(note);
		drawALineOn(note, 10, 0, 10, 10);

		expectOneItem(note);
		expectNoDraftItem(note);
		expectOneItem(board);
		expectNoDraftItem(board);

		drawALineOn(board, 20, 20, 30, 30);
		expectOneItem(note);
		expectNoDraftItem(note);
		expect(board.getContext().getItems().length).toEqual(2);
		expectNoDraftItem(board);
	});

	it("should be movable after being appended as a note", function(){
		board.addItem(note);

		triggerStartMovingEvent(board.getEventBus(), note, 0, 0);
		triggerMoveToEvent(board.getEventBus(), 10, 10);
		triggerFinishMovingEvent(board.getEventBus());

		expect(note.getPosition()).toEqual({x: 10, y: 10});
	});

	it("should be removable after being appended", function(){
		board.addItem(note);
		note.remove();

		expectNoItem(board);
	});

	it("should not be movable as a board", function(){
		triggerStartMovingEvent(board.getEventBus(), board, 0, 0);
		triggerMoveToEvent(board.getEventBus(), 10, 10);
		triggerFinishMovingEvent(board.getEventBus());

		expect(board.getPosition()).not.toEqual({x: 10, y: 10});
	});

	it("should be movable as a note", function(){
		triggerStartMovingEvent(note.getEventBus(), note, 0, 0);
		triggerMoveToEvent(note.getEventBus(), 10, 10);
		triggerFinishMovingEvent(note.getEventBus());

		expect(note.getPosition()).toEqual({x: 10, y: 10});
		expect(note.getElement().style.position).toEqual('fixed');
		expect(note.getElement().style.top).toEqual('10px');
		expect(note.getElement().style.left).toEqual('10px');
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