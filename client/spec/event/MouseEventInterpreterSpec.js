require(['MouseEventInterpreter', 'EventBus', 'Event'], function(MouseEventInterpreter, EventBus, Event){

describe('MouseEventInterpreter', function(){
	var interpreter;
	var eventBus;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		interpreter = new MouseEventInterpreter(eventBus);
		jasmine.Clock.useMock();
	});

	it("triggers START_DRAWING after MOUSE_DOWN and MOVE_TO", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, [{x: 20, y: 20}]));
	});

	it("triggers START_TEXTING after MOUSE_DOWN and MOUSE_DOWN", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, [{x: 10, y: 10}]));
	});

	it("triggers START_SELECTING_COLOR after long press", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, [{x: 10, y: 10}]));
	});

	it("should not trigger START_SELECTING_COLOR after long drawing", function(){
		interpreter.interpret(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		interpreter.interpret(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).not.toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, [{x: 10, y: 10}]));
	});		

	function createEvent(type, x, y){
		var options = {
			bubbles: false,
			cancelable: false,
			view: window,
			detail: 0,
			screenX: 0,
			screenY: 0,
			clientX: x,
			clientY: y,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			button: 0,
			relatedTarget: undefined
		};
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent( type, options.bubbles, options.cancelable,
			options.view, options.detail,
			options.screenX, options.screenY, options.clientX, options.clientY,
			options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
			options.button, options.relatedTarget || document.body.parentNode );
		return event;
	}		
});

});