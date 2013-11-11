require(['NoteDraggingGestureDetector', 'EventBus', 'Event', 'Point', 'Note'], function(NoteDraggingGestureDetector, EventBus, Event, Point, Note){


describe("NoteDraggingGestureDetector", function(){
	var eventBus;
	var detector;
	var item;
	var draggable;

	var note;

	beforeEach(function(){
		note = new Note();
		draggable = document.createElement('div');
		note.setElement(draggable);
		document.body.appendChild(draggable);
		
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new NoteDraggingGestureDetector(eventBus);
		jasmine.Clock.useMock();
	});

	it("triggers START_DRAGGING after long press at a note", function(){
		detector.detect(createEvent(Event.Mouse.MOUSE_DOWN, null, null, note, 10, 10));
		jasmine.Clock.tick(501);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.START_DRAGGING, { item: note, position: {x: 10, y: 10} }));
	});

	it("triggers MOVE_TO after long press and MOVE_TO on note", function(){
		detector.detect(createEvent(Event.Mouse.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Mouse.MOVE_TO, null, null, note, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.MOVE_TO, { position: {x: 10, y: 10} }));
	});

	it("triggers MOVE_TO after long press and MOVE_TO on body", function(){
		detector.detect(createEvent(Event.Mouse.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		var event = createEvent(Event.Mouse.MOVE_TO, null, null, note, 10, 10);
		fireEvent(document.body, 'mousemove', event);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.MOVE_TO, { position: {x: 10, y: 10} }));
		detector.rewind();
	});

	it("triggers FINISH_DRAGGING after long press and MOVE_TO, and MOUSE_UP on note", function(){
		detector.detect(createEvent(Event.Mouse.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Mouse.MOVE_TO, null, null, note, 10, 10));
		detector.detect(createEvent(Event.Mouse.MOUSE_UP, null, null, note, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.FINISH_DRAGGING));
	});

	afterEach(function(){
		draggable.parentNode.removeChild(draggable);
	});

});

});
