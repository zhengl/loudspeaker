require(['MouseEventInterpreter', 'EventBus', 'Event', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector', 'Page', 'Context'], function(MouseEventInterpreter, EventBus, Event, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector, Page, Context){

describe('MouseEventInterpreter', function(){
	var interpreter;
	var eventBus;
	var page;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		page = new Page();
		page.setContext(new Context())
		page.setPosition({x: 0, y: 0});
		interpreter = new MouseEventInterpreter();
		interpreter.addDetector(new PaintingGestureDetector(eventBus, interpreter));
		interpreter.addDetector(new TextingGestureDetector(eventBus, interpreter));
		interpreter.addDetector(new MovingGestureDetector(eventBus, interpreter));
		jasmine.Clock.useMock();
	});

	it("triggers START_DRAWING after MOUSE_DOWN and MOVE_TO", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, { position: {x: 20, y: 20} }));
	});

	it("triggers START_TEXTING after MOUSE_DOWN and MOUSE_DOWN", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, page));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, { position: {x: 10, y: 10} }));
	});

	it("remove a detector by class", function(){
		interpreter.removeDetector(MovingGestureDetector);
		expect(interpreter.detectors.length).toEqual(2);
	});

});

});