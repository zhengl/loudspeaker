require(['Painter', 'Context', 'Palette', 'Point', 'Line', 'EventBus', 'Event'], function(Painter, Context, Palette, Point, Line, EventBus, Event){


describe("Painter", function(){
	var painter;
	var eventBus;

	beforeEach(function(){
		painter = new Painter(Line, new Context(), new Palette());
	});

	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		painter.draw(line);
		var item = painter.getContext().getItems()[0];
		expect(item).toBeInstanceOf(Line);
		expect(painter).toHaveOneItem();
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		painter.draft(line);
		var item = painter.getContext().getDraftItems()[0];
		expect(item).toBeInstanceOf(Line);
		expect(painter).toHaveOneDraftItem();
		expect(painter).toHaveNoItem();
	});
	
	it("should have only one draft item when repeat drafting", function(){
		var line = createLine(10, 10, 20, 20);
		painter.draft(line);
		expect(painter).toHaveOneDraftItem();
		line = createLine(20, 20, 30, 30);
		painter.draft(line);
		expect(painter).toHaveOneDraftItem();
	});
	
	it("should DRAW a colored line with steps", function(){
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

	describe('with event handling', function(){
		beforeEach(function(){
			eventBus = new EventBus();
			painter.enableEventHandling(eventBus);
		});

		it("should DRAW a line with events", function() {		
			triggerStartDrawingEvent(eventBus, 10, 10);
			triggerDrawToEvent(eventBus, 20, 20);
			triggerFinishDrawingEvent(eventBus, 20, 20);

			var line = painter.getContext().getItems()[0];
			expect(line.getPosition()).toEqual({x: 10, y: 10});
			expect(line.points.length).toBe(3);
		});

		it("should DRAFT a line with events", function() {
			triggerStartDrawingEvent(eventBus, 10, 10);
			
			triggerDrawToEvent(eventBus, 20, 20);
			expect(painter).toHaveOneDraftItem();
			expect(painter).toHaveNoItem();
			
			triggerDrawToEvent(eventBus, 30, 30);
			expect(painter).toHaveOneDraftItem();
			expect(painter).toHaveNoItem();
			
			triggerFinishDrawingEvent(eventBus, 30, 30);
			expect(painter).toHaveNoDraftItem();
			expect(painter).toHaveOneItem();

			var line = painter.getContext().getItems()[0];
			expect(line).toBeInstanceOf(Line);
		});

		it("should stop drawing with event STOP_DRAWING", function(){			
			triggerStartDrawingEvent(eventBus, 10, 10);
			
			triggerDrawToEvent(eventBus, 20, 20);
			expect(painter).toHaveOneDraftItem();
			expect(painter).toHaveNoItem();
			
			triggerStopDrawingEvent(eventBus);
			expect(painter).toHaveNoDraftItem();
			expect(painter).toHaveNoItem();
		});
	});

	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
});


});
