require(['DOMRubbishBin', 'Point'], function(DOMRubbishBin, Point){

describe("DOMRubbishBin", function(){
	it("opens and closes", function(){
		var rubbishBinElement = document.createElement('div');
		document.body.appendChild(rubbishBinElement);		

		var bin = new DOMRubbishBin(new Point(40, 0), new Point(50, 50), rubbishBinElement);
		bin.close();
		expect(bin.element.className).toEqual("rubbishbin collapse");

		bin.open();
		expect(bin.element.className).toEqual("rubbishbin expand");
	});
});

});