require(['KineticPainter', 'KineticContext', 'DOMPalette', 'Point', 'Line', 'KineticLine', 'EventBus', 'Event', 'PainterEventHandler'], function(KineticPainter, KineticContext, DOMPalette, Point, Line, KineticLine, EventBus, Event, PainterEventHandler){


describe("KineticPainter", function(){
	var painter;
	var eventBus;
	var board;
	var palette;

	beforeEach(function(){
		board = document.createElement('div');
		board.id = "board";

		palette = document.createElement('div');
		palette.id = "palette";

		document.body.appendChild(board);
		document.body.appendChild(palette);
		painter = new KineticPainter(KineticLine, new KineticContext('board', 50, 50), new DOMPalette('palette'));
	});

	it("should draw a line", function() {
		var line = createLine(0, 0, 10, 10);
		painter.draw(line);
		var item = painter.getContext().getItems()[0];
		expect(item).toBeInstanceOf(KineticLine);
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		painter.draft(line);
		var item = painter.getContext().getDraftItems()[0];
		expect(item).toBeInstanceOf(KineticLine);
	});

	it("should DRAW a line with steps", function(){
		painter.getPalette().setColor('red');
		painter.startDraft(new Point(10, 10));
		expect(painter).toHaveNoItem();
		expect(painter).toHaveOneDraftItem();
		
		painter.draftTo(new Point(10, 20));
		expect(painter).toHaveNoItem();
		expect(painter).toHaveOneDraftItem();
		
		painter.draftTo(new Point(20, 30));
		painter.endDraft(new Point(30, 30));
		
		var line = painter.context.getItems()[0];
		expect(painter).toHaveOneItem();
		expect(painter).toHaveNoDraftItem();
		expect(painter).toHaveOneItem();
		expect(line.getColor()).toEqual('red');
	});

	it("should DRAW lines with steps", function(){
		for(var i = 1; i <= 10; i++){
			var offset = i * 13;
			painter.startDraft(new Point(0 + offset, 0));
			painter.draftTo(new Point(0 + offset, 10));
			painter.endDraft(new Point(0 + offset, 30));
			expect(painter).toHaveNumberOfItemsEqual(i);		
		}
	});

	afterEach(function(){
		document.body.removeChild(board);
		document.body.removeChild(palette);
	});

		
	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
	
});


});
