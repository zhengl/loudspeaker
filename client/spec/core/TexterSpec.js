require(['Texter', 'Context', 'Palette', 'Point', 'Text', 'TextInput', 'KineticContext', 'KineticTextInput', 'EventBus', 'Event'], function(Texter, Context, Palette, Point, Text, TextInput, KineticContext, KineticTextInput, EventBus, Event){

describe("Texter", function(){
	var texter;
	var eventBus;

	beforeEach(function(){
		texter = new Texter(new Palette(), new TextInput(new Context()));
	});

	describe("with event handling", function(){

		beforeEach(function(){
			eventBus = new EventBus();
			texter.enableEventHandling(eventBus);
		});

		it("should return a Text after writing words", function() {
			var text = createText();
			texter.write(text);
			var item = texter.getContext().getItems()[0];
			expect(item).toBeInstanceOf(Text);
			expect(texter).toHaveOneItem();
		});

		it("should have no item after writing words", function(){
			var text = createText();
			texter.draft(text);
			var item = texter.getContext().getDraftItems()[0];
			expect(item).toBeInstanceOf(Text);
			expect(texter).toHaveOneDraftItem();
			expect(texter).toHaveNoItem();
		});

		it("should create a input widget with event START_TEXTING", function(){
			triggerStartTextingEvent(eventBus, 10, 20);

			var textInput = texter.getTextInput();
			expect(textInput).toBeDefined();
			expect(textInput.getPosition()).toEqual({x: 10, y: 20});
		});

	});

	function createText(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		return text;
	}
});

});
