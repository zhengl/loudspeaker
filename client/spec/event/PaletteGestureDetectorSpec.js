require(['PaletteGestureDetector', 'EventBus', 'Event', 'Line'], function(PaletteGestureDetector, EventBus, Event, Line){


describe("PaletteGestureDetector", function(){
	var eventBus;
	var detector;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new PaletteGestureDetector(eventBus);
		jasmine.Clock.useMock();
	});

	it("triggers START_SELECTING_COLOR after long press", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, { position: {x: 10, y: 10} }));
	});

	it("triggers nothing after long press at item", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, new Line()));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).not.toHaveBeenCalled();
	});	

	it("should note trigger START_SELECTING_COLOR after MOUSE_DOWN and MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 10, 10));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).not.toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, { position: {x: 10, y: 10} }));
	});	

	it("rewinds", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(500);
		detector.rewind();
		jasmine.Clock.tick(501);

		expect(eventBus.publish).not.toHaveBeenCalled();
	});
});


});