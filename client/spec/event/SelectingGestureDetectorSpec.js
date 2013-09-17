require(['SelectingGestureDetector', 'EventBus', 'Event', 'Line'], function(SelectingGestureDetector, EventBus, Event, Line){


describe("SelectingGestureDetector", function(){
	var eventBus;
	var detector;

	beforeEach(function(){
		detector = new SelectingGestureDetector();
	});

	it("selects item after MOUSE_ENTER", function(){
		var line = new Line();
		line.select = new jasmine.createSpy();
		detector.detect(createEvent(Event.Kinetic.MOUSE_ENTER, 10, 10, line));

		expect(line.select).toHaveBeenCalled();
	});

	it("unselects item after MOUSE_ENTER and MOUSE_LEAVE", function(){
		var line = new Line();
		line.unselect = new jasmine.createSpy();
		detector.detect(createEvent(Event.Kinetic.MOUSE_ENTER, 10, 10, line));
		detector.detect(createEvent(Event.Kinetic.MOUSE_LEAVE, 10, 10, line));

		expect(line.unselect).toHaveBeenCalled();
	});	

	it("does nothing MOUSE_LEAVE", function(){
		var line = new Line();
		line.select = new jasmine.createSpy();
		detector.detect(createEvent(Event.Kinetic.MOUSE_LEAVE, 10, 10, line));

		expect(line.select).not.toHaveBeenCalled();
	});	
	
});

});
