require(['KineticTextInput', 'KineticContext', 'Text', 'Point', 'KineticText'], function(KineticTextInput, KineticContext, Text, Point, KineticText){


describe("KineticTextInput", function(){
	var textInput;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		var board = document.createElement('div');
		board.id = "board";

		body.appendChild(board);

		var context = new KineticContext('board', 50, 50);
		textInput = new KineticTextInput(context);
		textInput.show();
	});

	it("writes and records text", function(){
		var text = new Text("Hello World!");
		text.setPosition(new Point(10, 20));
		textInput.write(text);
		var item = textInput.getContext().getDraftItems()[0];
		expect(item instanceof KineticText).toBeTruthy();
		textInput.flush();
		item = textInput.getContext().getItems()[0];
		expect(item instanceof KineticText).toBeTruthy();
		expect(item.getValue()).toBe("Hello World!");
	});
});


});