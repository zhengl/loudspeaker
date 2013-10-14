require(['EventBridge', 'EventBus', 'EventFilter'], function(EventBridge, EventBus, EventFilter){


describe('EventBridge', function(){
	var from;
	var to;
	var bridge;

	beforeEach(function(){
		from = new EventBus();
		to = new EventBus();
		bridge = new EventBridge();
		bridge.bridge(from, to);
		to.publish = jasmine.createSpy();
	});

	it("should route events", function(){
		triggerMoveToEvent(from, null, 0, 0);

		expect(to.publish).toHaveBeenCalled();
	});

	it("should filter events with filter", function(){
		var filter = new EventFilter();
		filter.accept(function(event){
			if(event.name == Event.Page.MOVE_TO) {
				return true;
			} else {
				false;
			}
		});

		bridge.setFilter(filter);

		triggerStopDrawingEvent(from);
		expect(to.publish).not.toHaveBeenCalled();

		triggerMoveToEvent(from, null, 0, 0);
		expect(to.publish).toHaveBeenCalled();
	});
});


});