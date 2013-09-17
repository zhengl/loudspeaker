require(['Item', 'Point', 'EventBus', 'Event', 'Context'], function(Item, Point, EventBus, Event, Context){


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

	it("should be removable", function(){
		var context = new Context();
		context.addItem(item);
		item.remove();

		expect(context.getItems().length).toEqual(0);
	});
});


});
