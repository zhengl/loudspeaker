require(['RubbishBin', 'Point'], function(RubbishBin, Point){

describe("RubbishBin", function(){
	it("should cover a point", function(){
		var bin = new RubbishBin(new Point(40, 0), new Point(50, 50));
		expect(bin.isInside(new Point(45, 10))).toBeTruthy();
		expect(bin.isInside(new Point(0, 0))).toBeFalsy();
	});
});

});