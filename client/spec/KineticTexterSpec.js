require(['KineticTexter', 'KineticContext', 'DOMPalette', 'Point', 'Text', 'KineticText', 'EventBus', 'Event', 'KineticTextInput'], function(KineticTexter, KineticContext, DOMPalette, Point, Text, KineticText, EventBus, Event, KineticTextInput){


describe("KineticTexter", function(){
	var texter;
	var eventBus;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		var board = document.createElement('div');
		board.id = "board";

		var palette = document.createElement('div');
		palette.id = "palette";

		body.appendChild(board);
		body.appendChild(palette);
		texter = new KineticTexter(new DOMPalette('palette'), new KineticTextInput(new KineticContext('board', 50, 50)));
	});

	it("should return a KineticText after drawing a line", function() {
		var text = createText();
		texter.write(text);
		var item = texter.getContext().getItems()[0];
		expect(item instanceof KineticText).toBeTruthy();
	});

	it("should have no item after drafting a line", function(){
		var text = createText();
		texter.write(text);
		var item = texter.getContext().getItems()[0];
		expect(item instanceof KineticText).toBeTruthy()
	});

		
	function createText() {
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 10));
		return text;
	}
	
});


});