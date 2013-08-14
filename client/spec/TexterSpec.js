describe("Texter", function(){
	var texter;
	var context;

	describe("with KineticJS context", function(){
		beforeEach(function(){
			Environment.setMouse();
			context = ContextFactory.create();
			texter = new Texter(context, new Palette());
		});

		it("should start texting and create an input", function(){
			texter.startTexting(new Point(10, 20));
			expect(texter.getTextInput().getPosition().x).toBe(10);
			expect(texter.getTextInput().getPosition().y).toBe(20);
		});

		it("should write some words and flush to the context", function(){
			var text = createText();
			texter.write(text);
			expect(texter.context.getItems().length).toEqual(1);
			expect(texter.getTextInput().element).toBeUndefined();
		});
		
		function createText(){
			var text = new Text("Hello World!");
			text.setPosition(new Point(10, 20));
			return text;
		}
	});
});