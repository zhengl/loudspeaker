require(['Texter', 'Palette', 'Point', 'Text', 'KineticContext', 'KineticTextInput'], function(Texter, Palette, Point, Text, KineticContext, KineticTextInput){

describe("Texter", function(){
	var texter;
	var context;

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
		
		function createText(){
			var text = new Text("Hello World!");
			text.setPosition(new Point(10, 20));
			return text;
		}
	});
});

});
