describe("TextInput", function(){
	var textInput;

	beforeEach(function(){
		textInput = new TextInput();
	});

	it("writes and records text", function(){
		textInput.write(new Text("Hello World!"));
		expect(textInput.getText().getValue()).toBe("Hello World!");
	});

	describe("with DOM input element implementation", function(){
		var page;
		var textInput;

		beforeEach(function(){
			Environment.setMouse();
			context = ContextFactory.create();
			textInput = new CanvasTextInput(context);
		});

		it("writes and records text", function(){
			textInput.write(new Text("Hello World!"));
			expect(textInput.getText().getValue()).toBe("Hello World!");
		});
	});
});