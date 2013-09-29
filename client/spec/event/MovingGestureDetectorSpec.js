require(['MovingGestureDetector', 'EventBus', 'Event', 'Line', 'Point', 'Note'], function(MovingGestureDetector, EventBus, Event, Line, Point, Note){


describe("MovingGestureDetector", function(){
	var eventBus;
	var detector;
	var item;

	var board;
	var note;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new MovingGestureDetector(eventBus);
		item = new Line([new Point(10, 10)]);
		jasmine.Clock.useMock();
	});

	it("triggers nothing after MOUSE_DOWN at an Item", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers nothing after MOUSE_DOWN and MOVE_TO at an Item", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		jasmine.Clock.tick(301);
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 10, 10, item));
		jasmine.Clock.tick(201);

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers START_MOVING after long press at an Item", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		jasmine.Clock.tick(501);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_MOVING, { item: item, position: {x: 0, y: 0} }));
	});

	it("triggers MOVE_TO after long press, MOVE_TO at an Item", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		jasmine.Clock.tick(501);		
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.MOVE_TO, { position: {x: 20, y: 20} }));
	});

	it("triggers FINISH_MOVING after long press, MOVE_TO and MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		jasmine.Clock.tick(501);
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.FINISH_MOVING, { position: {x: 30, y: 30} }));
	});		
});

});
