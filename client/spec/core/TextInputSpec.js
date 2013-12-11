require(['TextInput', 'Text', 'Point', 'Context'], function(TextInput, Text, Point, Context){

describe("TextInput", function(){
	var textInput;

	beforeEach(function(){
		var context = new Context();
		textInput = new TextInput(context);
	});

	it("writes and records text", function(){
		var text = createText();
		textInput.write(text);
		expect(textInput.getText().getValue()).toBe("Hello World!");
	});

	it("flushes and empty its value", function(){
		var text = createText();
		textInput.write(text);
		textInput.flush();
		expect(textInput.getText()).toBeUndefined();
	});

	function createText(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		return text;
	}	
});

});
