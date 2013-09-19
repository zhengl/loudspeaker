require(['MouseEventPreprocessor'], function(MouseEventPreprocessor){


describe('MouseEventPreprocessor', function(){
	it("zooms event offset", function(){
		var preprocessor = new MouseEventPreprocessor();
		preprocessor.setZoomPercentage(0.9);
		var event = preprocessor.process(createEvent("mousedown", 100, 50));

		expect(event.offsetX).toEqual(90);
		expect(event.offsetY).toEqual(45);
	});
});


});