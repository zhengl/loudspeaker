require(['Item', 'Point', 'EventBus', 'Event'], function(Item, Point, EventBus, Event){


describe("Item", function(){
	var item;
	var eventBus;

	beforeEach(function(){
		item = new Item();
	});
	
	it("should be movable", function(){
		var newPosition = new Point(10, 10);
		item.moveTo(newPosition);
		expect(item.position).toEqual(newPosition);
	});

	describe("with event handling", function(){
		it("should be selected and unselected with event SELECT and UNSELECT", function() {
			eventBus = new EventBus();
			item.enableEventHandling(eventBus);
						
			triggerSelectEvent(item);		
			expect(item.isSelected).toBe(true);
			
			triggerUnselectEvent(item);			
			expect(item.isSelected).toBe(false);
		});
	});

	function triggerSelectEvent(item){
		eventBus.publish(new Event(Event.Item.SELECT, [item]));	
	}
	
	function triggerUnselectEvent(item){
		eventBus.publish(new Event(Event.Item.UNSELECT, [item]));	
	}

});


});
