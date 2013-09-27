require(['MouseEventInterpreter', 'EventBus', 'Event', 'PaintingGestureDetector', 'TextingGestureDetector', 'PaletteGestureDetector', 'SelectingGestureDetector', 'MovingGestureDetector'], function(MouseEventInterpreter, EventBus, Event, PaintingGestureDetector, TextingGestureDetector, PaletteGestureDetector, SelectingGestureDetector, MovingGestureDetector){

describe('MouseEventInterpreter', function(){
	var interpreter;
	var eventBus;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		interpreter = new MouseEventInterpreter(eventBus, [
			PaintingGestureDetector,
			TextingGestureDetector,
			// PaletteGestureDetector,
			// SelectingGestureDetector,
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

	// it("triggers START_SELECTING_COLOR after long press", function(){
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
	// 	jasmine.Clock.tick(1001);

	// 	expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, { position: {x: 10, y: 10} }));
	// });

	// it("should not trigger START_SELECTING_COLOR after long drawing", function(){
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
	// 	jasmine.Clock.tick(1001);

	// 	expect(eventBus.publish).not.toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, { position: {x: 10, y: 10} }));
	// });

	// it("should not trigger START_SELECTING_COLOR after START_TEXTING", function(){
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
	// 	interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
	// 	jasmine.Clock.tick(1001);

	// 	expect(eventBus.publish).not.toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, { position: {x: 10, y: 10} }));
	// });		
});

});