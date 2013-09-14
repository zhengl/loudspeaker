require(['MovingGestureDetector', 'EventBus', 'Event', 'Line'], function(MovingGestureDetector, EventBus, Event, Line){


describe("MovingGestureDetector", function(){
	var eventBus;
	var detector;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new MovingGestureDetector(eventBus);
	});

	it("triggers START_MOVING after MOUSE_DOWN at an Item", function(){
		var item = new Line();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, new Line()));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_MOVING, [item, {x: 10, y: 10}]));
	});

	it("triggers MOVE_TO after MOUSE_DOWN, MOVE_TO at an Item", function(){
		var item = new Line();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.MOVE_TO, [{x: 20, y: 20}]));
	});

	it("triggers FINISH_MOVING after MOUSE_DOWN, MOVE_TO and MOUSE_UP", function(){
		var item = new Line();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10, item));
		detector.detect(createEvent(Event.Kinetic.MOVE_TO, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 30, 30));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.FINISH_MOVING, [{x: 30, y: 30}]));
	});		

	function createEvent(type, x, y, target){
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
		event.targetItem = target;
		return event;
	}	
});

});
