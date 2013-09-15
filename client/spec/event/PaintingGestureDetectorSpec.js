require(['PaintingGestureDetector', 'EventBus', 'Event'], function(PaintingGestureDetector, EventBus, Event){


describe("PaintingGestureDetector", function(){
	var eventBus;
	var detector;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new PaintingGestureDetector(eventBus);
	});

	it("triggers START_DRAWING after MOUSE_DOWN, MOVE_TO and MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, [{x: 30, y: 30}]));
	});

	it("triggers DRAW_TO after MOUSE_DOWN, MOVE_TO, MOVE_TO and MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 40, 40));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.DRAW_TO, [{x: 40, y: 40}]));
	});	

	it("triggers FINISH_DRAWING after MOUSE_DOWN, MOVE_TO, MOVE_TO and MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 40, 40));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.FINISH_DRAWING, [{x: 40, y: 40}]));
	});

	it("triggers nothing after MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers nothing after MOVE_TO", function(){
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 30, 30));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});				

	it("triggers START_DRAWING after MOUSE_DOWN, MOVE_TO, MOVE_TO, MOUSE_UP and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 40, 40));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 50, 50));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 50, 50));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_DRAWING, [{x: 50, y: 50}]));
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