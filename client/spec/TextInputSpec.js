require(['TextInput', 'Text', 'Point', 'Context', 'KineticContext', 'KineticTextInput'], function(TextInput, Text, Point, Context, KineticContext, KineticTextInput){

describe("TextInput", function(){
	var textInput;

	beforeEach(function(){
		var context = new Context();
		textInput = new TextInput(context);
	});

	it("writes and records text", function(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		textInput.write(text);
		expect(textInput.getText().getValue()).toBe("Hello World!");
	});
});

});
