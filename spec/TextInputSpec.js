describe("TextInput", function(){
	var textInput;

	beforeEach(function(){
		textInput = new TextInput();
	});

	it("writes and records text", function(){
		textInput.write("Hello World!");
		expect(textInput.getText()).toBe("Hello World!");
	});
});