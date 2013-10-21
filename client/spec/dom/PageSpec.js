require(['BoardFactory', 'NoteFactory', 'DOMPalette', 'Event', 'Point', 'MouseEventPreprocessor'], function(BoardFactory, NoteFactory, DOMPalette, Event, Point, MouseEventPreprocessor){


describe('Page', function(){
	var baord;
	var note;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		var boardElement = addDiv("board", body);
		boardElement.style.position = "absolute";
		boardElement.style.top = '0';
		boardElement.style.left = '0';

		var paletteElement = document.createElement('div');
		
		var paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		paletteElement.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		paletteElement.appendChild(paletteBlack);
		var palette = new DOMPalette(paletteElement);
		
		var rubbishBinElement = document.createElement('div');
		var noteRubbishBinElement = document.createElement('div');

		var noteElement = addDiv("note", body);

		var preprocessor = new MouseEventPreprocessor();
		var options = {
			width: 100,
			height: 100,
			palette: palette,
			eventPreprocessor: preprocessor,
			rubbishbin: {
				element: rubbishBinElement,
				width: 10,
				height: 50,
			}
		};

		var noteOptions = {
			width: 50,
			height: 50,
			palette: palette,
			eventPreprocessor: preprocessor,
			rubbishbin: {
				element: noteRubbishBinElement,
				width: 1,
				height: 10,
			}
		};
		var boardFactory = new BoardFactory();
		board = boardFactory.create(boardElement, options);

		var noteFactory = new NoteFactory();
		note = noteFactory.create(noteElement, noteOptions);
	});

	it("appends another page", function(){
		drawALineOn(note, 0, 0, 20, 0);

		expectOneItem(note);
		expectNoDraftItem(note);
		expectNoItem(board);
		expectNoDraftItem(board);

		board.addItem(note);
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