describe("Item", function(){
	var item;

	beforeEach(function(){
		item = new Item();
	});
	
	it("should have have position", function(){
		expect(item.position instanceof Point).toBe(true);
	});
	
	it("should be movable", function(){
		var newPosition = new Point(10, 10);
		item.moveTo(newPosition);
		expect(item.position).toEqual(newPosition);
	});
});