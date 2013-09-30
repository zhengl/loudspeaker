require(['NoteDraggingGestureDetector', 'EventBus', 'Event', 'Point', 'Note'], function(NoteDraggingGestureDetector, EventBus, Event, Point, Note){


describe("NoteDraggingGestureDetector", function(){
	var eventBus;
	var detector;
	var item;

	var note;

	beforeEach(function(){
		note = new Note();
		var draggable = document.createElement('div');
		note.setElement(draggable);
		document.body.appendChild(draggable);
		
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new NoteDraggingGestureDetector(eventBus);
		jasmine.Clock.useMock();
	});

	it("triggers ENABLE_DND after long press at a note", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.START_DRAGGING, { item: note, position: {x: 10, y: 10} }));
	});

	it("triggers MOVE_TO after long press and MOVE_TO on note", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10, note));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.MOVE_TO, { position: {x: 10, y: 10} }));
	});

	it("triggers MOVE_TO after long press and MOVE_TO on document", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.MOVE_TO, { position: {x: 10, y: 10} }));
	});

	it("triggers FINISH_DRAGGING after long press and MOVE_TO, and MOUSE_UP on note", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, note));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10, note));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 10, 10, note));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Note.FINISH_DRAGGING, { position: {x: 10, y: 10} }));
	});	

});

});
