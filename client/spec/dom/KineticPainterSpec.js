require(['KineticPainter', 'KineticContext', 'DOMPalette', 'Point', 'Line', 'KineticLine', 'EventBus', 'Event', 'PainterEventHandler'], function(KineticPainter, KineticContext, DOMPalette, Point, Line, KineticLine, EventBus, Event, PainterEventHandler){


describe("KineticPainter", function(){
	var painter;
	var eventBus;

	beforeEach(function(){
		var body = document.getElementsByTagName('body')[0];
		var board = document.createElement('div');
		board.id = "board";

		var palette = document.createElement('div');
		palette.id = "palette";

		body.appendChild(board);
		body.appendChild(palette);
		painter = new KineticPainter(KineticLine, new KineticContext('board', 50, 50), new DOMPalette('palette'));
	});

	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		painter.draw(line);
		var item = painter.getContext().getItems()[0];
		expect(item instanceof KineticLine).toBeTruthy();
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		painter.draft(line);
		var item = painter.getContext().getDraftItems()[0];
		expect(item instanceof KineticLine).toBeTruthy();
	});

	it("should DRAW a line with steps", function(){
		painter.getPalette().setColor('red');
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
		expectOneItem(painter);
		expectNoDraftItem(painter);
		expectOneItem(painter);	
		expect(line.getColor()).toEqual('red');
	});

		
	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
	
});


});
