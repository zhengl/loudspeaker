require(['DOMRubbishBin', 'Point', 'jquery'], function(DOMRubbishBin, Point, $){

describe("DOMRubbishBin", function(){
	it("should cover a point", function(){
		var body = document.getElementsByTagName('body')[0];
		var rubbishBin = document.createElement('div');
		var rubbishBinId = rubbishBin.id = "rubbish_bin";
		rubbishBin.className = "rubbishbin";
		body.appendChild(rubbishBin);		

		var bin = new DOMRubbishBin(new Point(40, 0), new Point(50, 50), rubbishBinId);
		bin.close();
		expect(bin.element.className).toEqual("rubbishbin collapse");

		bin.open();
		expect(bin.element.className).toEqual("rubbishbin expand");
	});
});

});