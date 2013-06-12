describe("Item", function(){
	var item;

	beforeEach(function(){
		Environment.setDummy();
		item = new Item();
	});
	
	it("should be movable", function(){
		var newPosition = new Point(10, 10);
		item.moveTo(newPosition);
		expect(item.position).toEqual(newPosition);
	});

	it("should be able to enable event handling", function(){
		item.enableEventHandling();
		expect(item.getOutputEventTrigger()).toBeDefined();
		expect(item.getInputEventTrigger()).toBeDefined();
	});
});