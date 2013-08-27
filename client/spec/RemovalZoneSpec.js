require(['RemovalZone', 'Point'], function(RemovalZone, Point){

describe("RemovalZone", function(){
	it("should cover a point", function(){
		var zone = new RemovalZone(new Point(40, 0), new Point(50, 50))
		expect(zone.covers(new Point(45, 10))).toBeTruthy();
		expect(zone.covers(new Point(0, 0))).toBeFalsy();
	});
});

});