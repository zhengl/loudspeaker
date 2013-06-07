describe("Page", function() {
	var page;

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
	
	beforeEach(function() {
		page = new Page(new Context());
	});

	it("should return a Line after drawing a line", function() {
		var line = createLine(0, 0, 10, 10);
		var item = page.draw(line);
		expectOneItem(page);
		expectIsAnItem(item);
	});

	it("should return nothing after drafting a line", function(){
		var line = createLine(0, 0, 10, 10);
		var item = page.draft(line);
		expectOneDraftItem(page);
		expectNoItem(page);
		expectIsAnItem(item);
	});
	
	it("should have only one draft item when repeat drafting", function(){
		var line = createLine(10, 10, 20, 20);
		page.draft(line);
		expectOneDraftItem(page);
		line = createLine(20, 20, 30, 30);
		page.draft(line);
		expectOneDraftItem(page);
	});
	
	it("should be able to register event triggers", function() {
		var eventTrigger = new EventTrigger();
		page.registerEventTrigger(eventTrigger);
		page.selectLine();
		eventTrigger.trigger(new AbstractEvent(Page.Event.START_DRAWING, [new Point(0, 0)]));
		expect(page.isPainting).toBe(true);
	});
  
  
	describe("with Event Handling", function(){
		var page;
		var eventTrigger;
		
		beforeEach(function() {
			page = new Page(new Context());
			eventTrigger = new EventTrigger();
		});
		
		function createEventTriggerAdapter(){
			var eventTriggerAdapter = new EventTriggerAdapter(new DummyEventInterpreter());
			eventTrigger.addListener(eventTriggerAdapter);
			return eventTriggerAdapter;
		}
		
		function registerEventListenerAdapter(listener){
			listener.registerEventTrigger(createEventTriggerAdapter(eventTrigger));
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
		
		function triggerSelectEvent(){
			eventTrigger.trigger(new AbstractEvent(Item.Event.SELECT));	
		}
		
		function triggerUnselectEvent(){
			eventTrigger.trigger(new AbstractEvent(Item.Event.UNSELECT));	
		}
		
		function triggerStartMovingEvent(){
			eventTrigger.trigger(new AbstractEvent(Item.Event.START_MOVING));
		}
		
		function triggerStopMovingEvent(){
			eventTrigger.trigger(new AbstractEvent(Item.Event.STOP_MOVING));
		}
  
		it("should DRAW a line with events", function() {
			page.selectLine();
			registerEventListenerAdapter(page);
			
			triggerStartDrawingEvent(10, 10);
			triggerMoveToEvent(20, 20);
			triggerFinishDrawingEvent(20, 20);

			var line = page.context.getItems()[0];
			expectIsAnItem(line);
			expect(line.getPosition().x).toBe(10);
			expect(line.getPosition().y).toBe(10);
			expect(line.points.length).toBe(2);
		});
		
		it("should DRAFT a line with events", function() {
			page.selectLine();
			registerEventListenerAdapter(page);
			
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

			registerEventListenerAdapter(item);		
			
			triggerSelectEvent();
			triggerStartMovingEvent();
			var newPosition = new Point(20, 20);
			eventTrigger.trigger(new AbstractEvent(Item.Event.MOVE_TO, [newPosition]));
			triggerStopMovingEvent();
			
			var line = page.context.getItems()[0];
			expect(line.position).toBe(newPosition);
		});	

		it("should be selected and unselected with event SELECT and UNSELECT", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			var line = page.context.getItems()[0];
			expect(line.isSelected).toBe(false);
			
			registerEventListenerAdapter(item);		
			
			triggerSelectEvent();		
			expect(line.isSelected).toBe(true);
			
			triggerUnselectEvent();			
			expect(line.isSelected).toBe(false);
		});			
	});
  
	describe("with KineticJS context", function(){
		beforeEach(function() {
			page = new Page(new KineticContext("board"));
		});
		
		function expectIsAnKineticItem(item){
			expect(item instanceof Item).toBe(true);
		}
		
		it("should return a Line after DRAWING a line", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			expectOneItem(page);
			expectIsAnKineticItem(item);
		});

		it("should return a Line after DRAFTING a line", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draft(line);
			expectOneDraftItem(page);
			expectIsAnKineticItem(item);
		});
	});
});