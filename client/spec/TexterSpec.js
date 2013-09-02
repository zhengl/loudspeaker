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
			var item = texter.write(text);
			expect(item instanceof Text).toBeTruthy();
			expectOneItem(texter);
		});

		it("should have no item after writing words", function(){
			var text = createText();
			var item = texter.draft(text);
			expect(item instanceof Text).toBeTruthy();
			expectOneDraftItem(texter);
			expectNoItem(texter);
		});

		it("should create a input widget with event START_TEXTING", function(){
			triggerStartTextingEvent(10, 20);

			var textInput = texter.getTextInput();
			expect(textInput).toBeDefined();
			expect(textInput.getPosition()).toEqual({x: 10, y: 20});
		});

	});

	describe("with KineticJS context", function(){
		beforeEach(function(){
			var body = document.getElementsByTagName('body')[0];
			var board = document.createElement('div');
			board.id = "board";

			body.appendChild(board);

			var context = new KineticContext("board", 500, 500);
			var textInput = new KineticTextInput(context);
			texter = new Texter(new Palette(), textInput);
		});

		it("should start texting and create an input", function(){
			texter.startTexting(new Point(10, 20));
			expect(texter.getTextInput().getPosition().x).toBe(10);
			expect(texter.getTextInput().getPosition().y).toBe(20);
		});

		it("should write some words and flush to the context", function(){
			var text = createText();
			texter.write(text);
			expect(texter.getTextInput().context.getItems().length).toEqual(1);
		});
		
	});

	function createText(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		return text;
	}

	function expectOneItem(texter){
		expect(texter.getContext().getItems().length).toEqual(1);
	}

	function expectOneDraftItem(texter){
		expect(texter.getContext().getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(texter){
		expect(texter.getContext().getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(texter){
		expect(texter.getContext().getDraftItems().length).toEqual(0);
	}

	function triggerStartTextingEvent(x, y){
		eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(x, y)]));
	}
});

});
