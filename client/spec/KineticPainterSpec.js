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
		painter = new KineticPainter(new KineticContext('board', 50, 50), new DOMPalette('palette'));
	});

	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		var item = painter.draw(line);
		expect(item instanceof KineticLine).toBeTruthy();
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		var item = painter.draft(line);
		expect(item instanceof KineticLine).toBeTruthy()
	});

		
	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
	
});


});
