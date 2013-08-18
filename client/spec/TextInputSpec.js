require(['TextInput', 'Text', 'Point', 'Environment', 'ContextFactory', 'KineticTextInput'], function(TextInput, Text, Point, Environment, ContextFactory, KineticTextInput){

describe("TextInput", function(){
	var textInput;

	beforeEach(function(){
		textInput = new TextInput();
	});

	it("writes and records text", function(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		textInput.write(text);
		expect(textInput.getText().getValue()).toBe("Hello World!");
	});

	describe("with DOM input element implementation", function(){
		var page;
		var textInput;

		beforeEach(function(){
			var body = document.getElementsByTagName('body')[0];
			var board = document.createElement('div');
			board.id = "board";

			body.appendChild(board);

			Environment.setMouse();
			context = ContextFactory.create();
			textInput = new KineticTextInput(context);
		});

		it("writes and records text", function(){
			var text = new Text("Hello World!");
			text.setPosition(new Point(10, 20));
			textInput.write(text);
			expect(textInput.getText().getValue()).toBe("Hello World!");
		});
	});
});

});
