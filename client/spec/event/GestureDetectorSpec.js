require(['GestureDetector', 'GestureStep', 'Event'], function(GestureDetector, GestureStep, Event){


describe("GestureDetector", function(){
	it("reacts to single step", function(){
		var action = jasmine.createSpy();

		var step = new GestureStep(Event.Kinetic.MOUSE_DOWN, action);
		var detector = new GestureDetector(step);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));

		expect(action).toHaveBeenCalled();
	});

	it("reacts to subsequent step", function(){
		var action1 = jasmine.createSpy();
		var action2 = jasmine.createSpy();

		var step1 = new GestureStep(Event.Kinetic.MOUSE_DOWN, action1);
		var step2 = new GestureStep(Event.Kinetic.MOUSE_DOWN, action2);
		step1.addNextStep(step2);

		var detector = new GestureDetector(step1);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));

		expect(action1).toHaveBeenCalled();
		expect(action2).not.toHaveBeenCalled();

		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));

		expect(action1).toHaveBeenCalled();
		expect(action2).toHaveBeenCalled(); 		
	});

	it("reacts to cyclic step", function(){
		var action = jasmine.createSpy();

		var step = new GestureStep(Event.Kinetic.MOUSE_DOWN, action);
		step.addNextStep(step);

		var detector = new GestureDetector(step);
		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));
		expect(action.calls.length).toEqual(1);

		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));
		expect(action.calls.length).toEqual(2);
	});

	it("rewinds", function(){
		var step1 = new GestureStep(Event.Kinetic.MOUSE_DOWN, function(){});
		var step2 = new GestureStep(Event.Kinetic.MOUSE_UP, function(){});
		step1.addNextStep(step2);

		var detector = new GestureDetector(step1);

		detector.detect(createEvent(Event.Kinetic.MOUSE_DOWN));
		detector.rewind();
		expect(detector.getCurrentCandidateSteps()).toEqual([step1]);
	});

	function createEvent(type){
		var options = {
			bubbles: false,
			cancelable: false,
			view: window,
			detail: 0,
			screenX: 0,
			screenY: 0,
			clientX: 1,
			clientY: 1,
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