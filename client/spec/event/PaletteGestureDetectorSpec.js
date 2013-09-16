require(['PaletteGestureDetector', 'EventBus', 'Event'], function(PaletteGestureDetector, EventBus, Event){


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

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, [{x: 10, y: 10}]));
	});

	it("should note trigger START_SELECTING_COLOR after MOUSE_DOWN and MOUSE_UP", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOUSE_UP, 10, 10));
		jasmine.Clock.tick(1001);

		expect(eventBus.publish).not.toHaveBeenCalledWith(new Event(Event.Page.START_SELECTING_COLOR, [{x: 10, y: 10}]));
	});	

	it("rewinds", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(500);
		detector.rewind();
		jasmine.Clock.tick(501);

		expect(eventBus.publish).not.toHaveBeenCalled();
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