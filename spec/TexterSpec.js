describe("Texter", function(){
	var texter;

	beforeEach(function(){
		Environment.setDummy();
		texter = new Texter();
	});

	it("should start texting and create an input", function(){
		texter.startTexting(new Point(10, 20));
		expect(texter.getTextInput().getPosition().x).toBe(10);
		expect(texter.getTextInput().getPosition().y).toBe(20);
	});
});