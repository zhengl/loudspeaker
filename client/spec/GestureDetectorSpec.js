require(['GestureDetector', 'GestureStep', 'Event'], function(GestureDetector, GestureStep, Event){


describe("GestureDetector", function(){
	it("reacts to single step", function(){
		var action = jasmine.createSpy();

		var step = new GestureStep(Event.Kinetic.MOUSE_DOWN, action);
		var detector = new GestureDetector(step);
		detector.detect(Event.Kinetic.MOUSE_DOWN);

		expect(action).toHaveBeenCalled();
	});

	it("reacts to subsequent step", function(){
		var action1 = jasmine.createSpy();
		var action2 = jasmine.createSpy();

		var step1 = new GestureStep(Event.Kinetic.MOUSE_DOWN, action1);
		var step2 = new GestureStep(Event.Kinetic.MOUSE_DOWN, action2);
		step1.setNext(step2);

		var detector = new GestureDetector(step1);
		detector.detect(Event.Kinetic.MOUSE_DOWN);

		expect(action1).toHaveBeenCalled();
		expect(action2).not.toHaveBeenCalled();

		detector.detect(Event.Kinetic.MOUSE_DOWN);

		expect(action1).toHaveBeenCalled();
		expect(action2).toHaveBeenCalled(); 		
	});

	it("reacts to cyclic step", function(){
		var action = jasmine.createSpy();

		var step = new GestureStep(Event.Kinetic.MOUSE_DOWN, action);
		step.setNext(step);

		var detector = new GestureDetector(step);
		detector.detect(Event.Kinetic.MOUSE_DOWN);
		expect(action.calls.length).toEqual(1);

		detector.detect(Event.Kinetic.MOUSE_DOWN);
		expect(action.calls.length).toEqual(2);
	});		
});


});