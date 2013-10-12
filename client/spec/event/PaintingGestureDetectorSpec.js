require(['PaintingGestureDetector', 'EventBus', 'Event', 'Line', 'Page', 'Context'], function(PaintingGestureDetector, EventBus, Event, Line, Page, Context){


describe("PaintingGestureDetector", function(){
	var eventBus;
	var detector;
	var page;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new PaintingGestureDetector(eventBus);
		page = new Page();
		page.setContext(new Context);
	});

	it("triggers START_DRAWING after MOUSE_DOWN, MOVE_TO and MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, { position: {x: 30, y: 30} }));
	});

	it("triggers DRAW_TO after MOUSE_DOWN, MOVE_TO, MOVE_TO and MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 40, 40, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.DRAW_TO, { position: {x: 40, y: 40} }));
	});	

	it("triggers FINISH_DRAWING after MOUSE_DOWN, MOVE_TO, MOVE_TO and MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 40, 40, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.FINISH_DRAWING, { position: {x: 40, y: 40} }));
	});

	it("triggers nothing after MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30, page));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers nothing after MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30, page));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers nothing after MOUSE_DOWN, MOUSE_UP, MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10, page));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});	

	it("triggers START_DRAWING after MOUSE_DOWN, MOVE_TO, MOVE_TO, MOUSE_UP and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 40, 40, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 50, 50, page));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 50, 50, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, { position: {x: 50, y: 50} }));
	});

	it("triggers nothing MOUSE_DOWN, MOVE_TO, MOVE_TO on item with no context", function(){
		var line = new Line();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, line));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, line));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20, line));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});
});


});