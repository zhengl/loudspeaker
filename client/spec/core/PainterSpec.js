require(['Painter', 'Context', 'Palette', 'Point', 'Item', 'Line', 'EventBus', 'Event'], function(Painter, Context, Palette, Point, Item, Line, EventBus, Event){


describe("Painter", function(){
	var painter;
	var eventBus;

	beforeEach(function(){
		painter = new Painter(new Context(), new Palette());
	});

	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		painter.draw(line);
		var item = painter.getContext().getItems()[0];
		expect(item instanceof Line).toBeTruthy();
		expectOneItem(painter);
	});

	it("should have no item after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		painter.draft(line);
		var item = painter.getContext().getDraftItems()[0];
		expect(item instanceof Line).toBeTruthy();
		expectOneDraftItem(painter);
		expectNoItem(painter);
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

	it("shows pallete", function(){
		painter.showPalette(new Point(20, 20));
		expect(painter.getPalette().getPosition()).toEqual({x: 20, y: 20});
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
			expectOneDraftItem(painter);
			expectNoItem(painter);
			
			triggerDrawToEvent(eventBus, 30, 30);
			expectOneDraftItem(painter);
			expectNoItem(painter);
			
			triggerFinishDrawingEvent(eventBus, 30, 30);
			expectNoDraftItem(painter);
			expectOneItem(painter);

			var line = painter.getContext().getItems()[0];
			expect(line instanceof Line).toBeTruthy();
		});

		it("should stop drawing with event STOP_DRAWING", function(){			
			triggerStartDrawingEvent(eventBus, 10, 10);
			
			triggerDrawToEvent(eventBus, 20, 20);
			expectOneDraftItem(painter);
			expectNoItem(painter);
			
			triggerStopDrawingEvent(eventBus);
			expectNoDraftItem(painter);
			expectNoItem(painter);
		});
	});

	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
});


});
