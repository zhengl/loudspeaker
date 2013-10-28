require(['MouseEventPreprocessor', 'Note', 'Board', 'KineticContext', 'Point'], function(MouseEventPreprocessor, Note, Board, KineticContext, Point){


describe('MouseEventPreprocessor', function(){
	var preprocessor;

	beforeEach(function(){
		preprocessor = new MouseEventPreprocessor();
	});

	it("zooms event offset", function(){
		preprocessor.setZoomPercentage(0.9);
		var event = preprocessor.process(createEvent("mousedown", null, null, null, 100, 50));

		expect(event.canvasX).toEqual(90);
		expect(event.canvasY).toEqual(45);
	});
});


});