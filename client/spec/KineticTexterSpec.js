require(['KineticTexter', 'KineticContext', 'DOMPalette', 'Point', 'Text', 'KineticText', 'EventBus', 'Event', 'TextInput'], function(KineticTexter, KineticContext, DOMPalette, Point, Text, KineticText, EventBus, Event, TextInput){


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
		texter = new KineticTexter(new DOMPalette('palette'), new TextInput(new KineticContext('board', 50, 50)));
	});

	it("should return a KineticText after drawing a line", function() {
		var text = createText();
		var item = texter.write(text);
		expect(item instanceof KineticText).toBeTruthy();
	});

	it("should have no item after drafting a line", function(){
		var text = createText();
		var item = texter.write(text);
		expect(item instanceof KineticText).toBeTruthy()
	});

		
	function createText() {
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 10));
		return text;
	}
	
});


});