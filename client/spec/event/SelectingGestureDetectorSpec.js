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
