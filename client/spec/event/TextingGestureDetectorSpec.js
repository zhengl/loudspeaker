require(['TextingGestureDetector', 'EventBus', 'Event'], function(TextingGestureDetector, EventBus, Event){


describe("TextingGestureDetector", function(){
	var eventBus;
	var detector;

	beforeEach(function(){
		eventBus = new EventBus();
		eventBus.publish = jasmine.createSpy();
		detector = new TextingGestureDetector(eventBus);
		jasmine.Clock.useMock();
	});

	it("triggers START_TEXTING after MOUSE_DOWN and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(100);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, [{x: 10, y: 10}]));
	});

	it("triggers nothing after MOUSE_DOWN (a while long then doubleclick interval) and MOUSE_DOWN", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(201);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));

		expect(eventBus.publish).not.toHaveBeenCalled();
	});

	it("triggers START_TEXTING after two double-clicks", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 20, 20));
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 20, 20));

		expect(eventBus.publish).toHaveBeenCalledWith(new Event(Event.Page.START_TEXTING, [{x: 20, y: 20}]));
	});

	it("rewinds", function(){
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(100);
		detector.rewind();
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN, 10, 10));
		jasmine.Clock.tick(101);

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