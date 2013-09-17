require(['DOMPageFactory', 'Event', 'Point'], function(DOMPageFactory, Event, Point){


describe('Page', function(){
	var baord;
	var note;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		addDiv("board", body);
		addDiv("palette", body);
		addDiv("rubbishbin", body);

		addDiv("note", body);
		addDiv("note-palette", body);
		addDiv("note-rubbishbin", body);

		board = DOMPageFactory.create("board", 100, 100, "palette", "rubbishbin", 10, 50);
		note = DOMPageFactory.create("note", 50, 50, "note-palette", "note-rubbishbin", 1, 10);
	});


	it("appends another page", function(){
		drawALineOn(note, 0, 0, 20, 0);

		expectOneItem(note);
		expectNoDraftItem(note);
		expectNoItem(board);
		expectNoDraftItem(board);

		board.appendPage(note);
		drawALineOn(note, 10, 0, 10, 10);

		expectOneItem(note);
		expectNoDraftItem(note);
		expect(board.getContext().getItems().length).toEqual(2);
		expectNoDraftItem(board);

		drawALineOn(board, 20, 20, 30, 30);
		expectOneItem(note);
		expectNoDraftItem(note);
		expect(board.getContext().getItems().length).toEqual(3);
		expectNoDraftItem(board);
	});

	it("should be movable after being appended", function(){
		board.appendPage(note);

		triggerStartMovingEvent(board.getEventBus(), note, 0, 0);
		triggerPageMoveToEvent(board.getEventBus(), 10, 10);
		triggerFinishMovingEvent(board.getEventBus());

		expect(note.getPosition()).toEqual({x: 10, y: 10});
	});

	function addDiv(id, body){
		var div = document.createElement('div');
		div.id = id;
		body.appendChild(div);
	}

	function drawALineOn(page, x1, y1, x2, y2){
		triggerStartDrawingEvent(page.getEventBus(), x1, y1);
		triggerPageDrawToEvent(page.getEventBus(), x2, x2);
		triggerFinishDrawingEvent(page.getEventBus(), x2, y2);		
	}

	function triggerPageDrawToEvent(eventBus, x, y){
		eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(x, y)]));
	}

	function triggerStartDrawingEvent(eventBus, x, y){
		eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(x, y)]));		
	}

	function triggerFinishDrawingEvent(eventBus, x, y){
		eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(x, y)]));		
	}

	function triggerStartMovingEvent(eventBus, item, x, y){
		eventBus.publish(new Event(Event.Page.START_MOVING, [item, new Point(x, y)]));
	}
	
	function triggerFinishMovingEvent(eventBus, item){
		eventBus.publish(new Event(Event.Page.FINISH_MOVING, [item]));
	}

	function triggerPageMoveToEvent(eventBus, x, y){
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(x, y)]));
	}

	function expectOneItem(page){
		expect(page.getContext().getItems().length).toEqual(1);
	}

	function expectOneDraftItem(page){
		expect(page.getContext().getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(page){
		expect(page.getContext().getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(page){
		expect(page.getContext().getDraftItems().length).toEqual(0);
	}

});


});