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
		texter.palette.setColor('red');
	});

	it("should return a KineticText after write words", function() {
		var text = createText();
		texter.write(text);
		var item = texter.getContext().getItems()[0];
		expect(item instanceof KineticText).toBeTruthy();
		expect(item.getColor()).toEqual('red');
	});

	it("should have no item after drafting words", function(){
		var text = createText();
		texter.draft(text);
		var item = texter.getContext().getDraftItems()[0];
		expect(item instanceof KineticText).toBeTruthy();
		expect(texter.getContext().getItems().length).toEqual(0);
	});

		
	function createText() {
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 10));
		return text;
	}
	
});


});