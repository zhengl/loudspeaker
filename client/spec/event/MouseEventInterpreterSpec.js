require(['MouseEventInterpreter', 'EventBus', 'Event', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector'], function(MouseEventInterpreter, EventBus, Event, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector){

describe('MouseEventInterpreter', function(){
	var interpreter;
	var eventBus;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		interpreter = new MouseEventInterpreter(eventBus, [
			PaintingGestureDetector,
			TextingGestureDetector,
			MovingGestureDetector
			]);
		jasmine.Clock.useMock();
	});

	it("triggers START_DRAWING after MOUSE_DOWN and MOVE_TO", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, { position: {x: 20, y: 20} }));
	});

	it("triggers START_TEXTING after MOUSE_DOWN and MOUSE_DOWN", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, { position: {x: 10, y: 10} }));
	});

});

});