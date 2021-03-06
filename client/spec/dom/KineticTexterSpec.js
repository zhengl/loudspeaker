require(['KineticTexter', 'KineticContext', 'DOMPalette', 'Point', 'Text', 'KineticText', 'EventBus', 'Event', 'KineticTextInput'], function(KineticTexter, KineticContext, DOMPalette, Point, Text, KineticText, EventBus, Event, KineticTextInput){


describe("KineticTexter", function(){
	var texter;
	var eventBus;
	var board;
	var palette;

	beforeEach(function(){
		board = document.createElement('div');
		board.id = "board";

		palette = document.createElement('div');
		palette.id = "palette";

		document.body.appendChild(board);
		document.body.appendChild(palette);
		texter = new KineticTexter(new DOMPalette('palette'), new KineticTextInput(new KineticContext('board', 50, 50)));
		texter.palette.setColor('red');
	});

	it("should write words", function() {
		var text = createText();
		texter.write(text);
		var item = texter.getContext().getItems()[0];
		expect(item).toBeInstanceOf(KineticText);
		expect(item.getColor()).toEqual('red');
	});

	it("should have no item after drafting words", function(){
		var text = createText();
		texter.draft(text);
		var item = texter.getContext().getDraftItems()[0];
		expect(item).toBeInstanceOf(KineticText);
		expect(texter).toHaveNoItem();
	});

	afterEach(function(){
		document.body.removeChild(board);
		document.body.removeChild(palette);		
	});

		
	function createText() {
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 10));
		return text;
	}
	
});


});