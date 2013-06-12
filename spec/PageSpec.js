describe("Page", function() {
	var page;
	var eventTrigger;
	
	describe("with Event Handling", function(){
		
		beforeEach(function() {
			Environment.setDummy();
			page = new Page();
			page.enableEventHandling();
			eventTrigger = page.getInputEventTrigger();
			page.getPainter().selectShape(Palette.Shape.Line);
		});
  
		it("should have registered a event trigger", function() {
			expect(page.getOutputEventTrigger()).toBeDefined();
			expect(page.getInputEventTrigger()).toBeDefined();
		});

		it("should DRAW a line with events", function() {			
			triggerStartDrawingEvent(10, 10);
			triggerMoveToEvent(20, 20);
			triggerFinishDrawingEvent(20, 20);

			var line = page.context.getItems()[0];
			expectIsAnItem(line);
			expect(line.getPosition().x).toBe(10);
			expect(line.getPosition().y).toBe(10);
			expect(line.points.length).toBe(3);
		});
		
		it("should DRAFT a line with events", function() {
			triggerStartDrawingEvent(10, 10);
			
			triggerMoveToEvent(20, 20);
			expectOneDraftItem(page);
			expectNoItem(page);
			
			triggerMoveToEvent(30, 30);
			expectOneDraftItem(page);
			expectNoItem(page);
			
			triggerFinishDrawingEvent(30, 30);
			expectNoDraftItem(page);
			expectOneItem(page);

			var line = page.context.getItems()[0];
			expectIsAnItem(line);
		});
		
		it("should move a line with events, START_MOVING, MOVE_TO, STOP_MOVING after being selected", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			
			eventTrigger = item.getInputEventTrigger();
			
			triggerSelectEvent();
			triggerStartMovingEvent(5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent();
			expectOneItem(page);
			expectNoDraftItem(page);

			line = page.context.getItems()[0];
			expect(line.getPosition().x).toBe(15);
			expect(line.getPosition().y).toBe(15);
		});	
		
		it("should stop drawing with event STOP_DRAWING", function(){			
			triggerStartDrawingEvent(10, 10);
			
			triggerMoveToEvent(20, 20);
			expectOneDraftItem(page);
			expectNoItem(page);
			
			triggerStopDrawingEvent();
			expectNoDraftItem(page);
			expectNoItem(page);
		});

		it("should be selected and unselected with event SELECT and UNSELECT", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			expect(item.isSelected).toBe(false);
			
			eventTrigger = item.getInputEventTrigger();	
			
			triggerSelectEvent();		
			expect(item.isSelected).toBe(true);
			
			triggerUnselectEvent();			
			expect(item.isSelected).toBe(false);
		});
	});
  
	describe("with KineticJS context", function(){
		beforeEach(function() {
			Environment.setMouse();
			page = new Page();
			page.enableEventHandling();
		});
		
		it("should return a Line after DRAWING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draw(line);
			expectOneItem(page);
			expectIsAnKineticItem(item);
		});

		it("should return a Line after DRAFTING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draft(line);
			expectOneDraftItem(page);
			expectIsAnKineticItem(item);
		});
		
		
		it("should MOVE a line with steps", function(){
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draw(line);
			
			item.select();
			item.startMoving(new Point(5, 5));
			expectNoItem(page);
			expectOneDraftItem(page);
			
			item.tryToMoveTo(new Point(10, 10));
			expectNoItem(page);
			expectOneDraftItem(page);
			
			item.finishMoving();
			expectOneItem(page);
			expectNoDraftItem(page);
			
			expect(item.getPosition().x).toBe(5);
			expect(item.getPosition().y).toBe(5);
		});
	});

	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}
	
	function expectOneItem(page){
		expect(page.context.getItems().length).toEqual(1);
	}

	function expectOneDraftItem(page){
		expect(page.context.getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(page){
		expect(page.context.getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(page){
		expect(page.context.getDraftItems().length).toEqual(0);
	}
	
	function expectIsAnItem(item){
		expect(item instanceof Item).toBe(true);
	}

	function expectIsAnKineticItem(item){
		expect(item instanceof Item).toBe(true);
	}

	function triggerMoveToEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.MOVE_TO, [new Point(x, y)]));
	}
	
	function triggerStartDrawingEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.START_DRAWING, [new Point(x, y)]));		
	}

	function triggerFinishDrawingEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(x, y)]));		
	}
	
	function triggerStopDrawingEvent(){
		eventTrigger.trigger(new AbstractEvent(Page.Event.STOP_DRAWING));		
	}
	
	function triggerSelectEvent(){
		eventTrigger.trigger(new AbstractEvent(Item.Event.SELECT));	
	}
	
	function triggerUnselectEvent(){
		eventTrigger.trigger(new AbstractEvent(Item.Event.UNSELECT));	
	}
	
	function triggerStartMovingEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Item.Event.START_MOVING, [new Point(x, y)]));
	}
	
	function triggerFinishMovingEvent(){
		eventTrigger.trigger(new AbstractEvent(Item.Event.FINISH_MOVING));
	}	
});