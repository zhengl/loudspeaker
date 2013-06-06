describe("Page", function() {
	var page;

	beforeEach(function() {
		page = new Page(new Context());
	});

	it("should return a Line after drawing a line", function() {
		var item = page.drawLine([new Point(0, 0), new Point(10, 10)]);
		expect(page.context.getItems().length).toEqual(1);
		expect(item instanceof Item).toBe(true);
	});
  
	it("should be able to register event triggers", function() {
		var eventTrigger = new EventTrigger();
		page.registerEventTrigger(eventTrigger);
		eventTrigger.trigger(new AbstractEvent(Page.Event.START_DRAWING));
		console.log(page);
		expect(page.isPainting).toBe(true);
	});
  
  
	describe("Event Handling", function(){
		var page;
		
		function createEventTriggerAdapter(eventTrigger){
			var eventTriggerAdapter = new EventTriggerAdapter(new DummyEventInterpreter());
			eventTrigger.addListener(eventTriggerAdapter);
			return eventTriggerAdapter;
		}
		
		beforeEach(function() {
			page = new Page(new Context());
		});
  
		it("should listen to events by adapter and draw a line with events", function() {
			page.selectLine();
			var eventTrigger = new EventTrigger();
			page.registerEventTrigger(createEventTriggerAdapter(eventTrigger));
			
			eventTrigger.trigger(new AbstractEvent(Page.Event.MOVE_TO, [new Point(10, 10)]));
			eventTrigger.trigger(new AbstractEvent(Page.Event.START_DRAWING));
			eventTrigger.trigger(new AbstractEvent(Page.Event.MOVE_TO, [new Point(20, 20)]));
			eventTrigger.trigger(new AbstractEvent(Page.Event.STOP_DRAWING));

			var line = page.context.items[0];
			expect(line instanceof Item).toBe(true);
		});
		
		it("should move a line with events, START_MOVING, MOVE_TO, STOP_MOVING after being selected", function() {
			var item = page.drawLine([new Point(10, 10), new Point(20, 20)]);

			var eventTrigger = new EventTrigger();
			item.registerEventTrigger(createEventTriggerAdapter(eventTrigger));			
			
			eventTrigger.trigger(new AbstractEvent(Item.Event.SELECT));	
			eventTrigger.trigger(new AbstractEvent(Item.Event.START_MOVING));
			var newPosition = new Point(20, 20);
			eventTrigger.trigger(new AbstractEvent(Item.Event.MOVE_TO, [newPosition]));
			eventTrigger.trigger(new AbstractEvent(Item.Event.STOP_MOVING));
			
			var line = page.context.items[0];
			expect(line.position).toBe(newPosition);
		});	

		it("should be selected and unselected with event SELECT and UNSELECT", function() {
			var item = page.drawLine([new Point(10, 10), new Point(20, 20)]);
			var line = page.context.items[0];
			expect(line.isSelected).toBe(false);
			
			var eventTrigger = new EventTrigger();
			item.registerEventTrigger(createEventTriggerAdapter(eventTrigger));			
			
			eventTrigger.trigger(new AbstractEvent(Item.Event.SELECT));			
			expect(line.isSelected).toBe(true);
			
			eventTrigger.trigger(new AbstractEvent(Item.Event.UNSELECT));			
			expect(line.isSelected).toBe(false);
		});			
	});
  
	describe("with KineticJS implementation", function(){
		beforeEach(function() {
			page = new Page(new KineticContext("board"));
		});
		
		it("should return a Line after drawing a line", function() {
			var item = page.drawLine([new Point(0, 0), new Point(10, 10)]);
			expect(page.context.getItems().length).toEqual(1);
			expect(item instanceof Item).toBe(true);
		});		
	});

});