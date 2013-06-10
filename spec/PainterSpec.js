describe("Painter", function(){
	var painter = new Painter(new Context());
	
	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
	
	function expectOneItem(painter){
		expect(painter.context.getItems().length).toEqual(1);
	}

	function expectOneDraftItem(painter){
		expect(painter.context.getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(painter){
		expect(painter.context.getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(painter){
		expect(painter.context.getDraftItems().length).toEqual(0);
	}
	
	function expectIsAnItem(item){
		expect(item instanceof Item).toBe(true);
	}
	
	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		var item = painter.draw(line);
		expectOneItem(painter);
		expectIsAnItem(item);
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		var item = painter.draft(line);
		expectOneDraftItem(painter);
		expectNoItem(painter);
		expectIsAnItem(item);
	});
	
	it("should have only one draft item when repeat drafting", function(){
		var line = createLine(10, 10, 20, 20);
		painter.draft(line);
		expectOneDraftItem(painter);
		line = createLine(20, 20, 30, 30);
		painter.draft(line);
		expectOneDraftItem(painter);
	});
	
	it("should DRAW a line with steps", function(){
		painter.selectShape(Palette.Shape.Line);

		painter.startDraft(new Point(10, 10));
		expectNoItem(painter);
		expectOneDraftItem(painter);
		
		painter.draftTo(new Point(10, 20));
		expectNoItem(painter);
		expectOneDraftItem(painter);
		
		painter.draftTo(new Point(20, 20));
		painter.draftTo(new Point(20, 30));
		painter.endDraft(new Point(30, 30));
		
		var line = painter.context.getItems()[0];
		expectIsAnItem(line);
		expectOneItem(painter);
		expectNoDraftItem(painter);
		expectOneItem(painter);			
	});
});