require(['Item', 'Point', 'EventBus'], function(Item, Point, EventBus){


describe("Item", function(){
	var item;

	beforeEach(function(){
		item = new Item();
	});
	
	it("should be movable", function(){
		var newPosition = new Point(10, 10);
		item.moveTo(newPosition);
		expect(item.position).toEqual(newPosition);
	});

	it("should be able to enable event handling", function(){
		item.registerEventBus(new EventBus());
		expect(item.getEventBus()).toBeDefined();
	});
});


});
