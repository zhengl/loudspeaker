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
});


});
