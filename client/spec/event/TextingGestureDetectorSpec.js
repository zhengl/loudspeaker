require(['TextingGestureDetector', 'EventBus', 'Event', 'Line', 'Page', 'Context'], function(TextingGestureDetector, EventBus, Event, Line, Page, Context){


describe("TextingGestureDetector", function(){
	var eventBus;
	var detector;
	var page;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new TextingGestureDetector(eventBus);
		page = new Page();
		page.setContext(new Context());
		jasmine.Clock.useMock();
	});

	it("triggers START_TEXTING after MOUSE_DOWN, MOVE_TO and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		jasmine.Clock.tick(100);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, { position: {x: 10, y: 10} }));
	});

	it("triggers nothing after MOUSE_DOWN, MOVE_TO and MOUSE_DOWN at item", function(){
		var line = new Line();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, line));
		jasmine.Clock.tick(100);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, line));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});	

	it("triggers nothing after MOUSE_DOWN (a while long then doubleclick interval) and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		jasmine.Clock.tick(201);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers START_TEXTING after two double-clicks", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 20, 20, page));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 20, 20, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, { position: {x: 20, y: 20} }));
	});

	it("rewinds", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		jasmine.Clock.tick(100);
		detector.rewind();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		jasmine.Clock.tick(101);

		expect(eventBus.publish).not.toHaveBeenCalled();
	});	
});


});