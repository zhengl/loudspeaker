describe("Page", function() {
	var page;

	beforeEach(function() {
		page = new Page(new Context());
	});

	it("should return a Line after drawing a line", function() {
		var item = page.drawLine([new Point(0, 0), new Point(10, 10)]);
		expect(page.context.getItems().length).toEqual(1);
		expect(item instanceof Line).toBe(true);
	});
  
	it("should be able to register event triggers", function() {
		var eventTrigger = new EventTrigger();
		page.registerEventTrigger(eventTrigger);
		eventTrigger.trigger(new Event(Page.Event.START_DRAWING));
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
			
			eventTrigger.trigger(new Event(Page.Event.MOVE_TO, [new Point(10, 10)]));
			eventTrigger.trigger(new Event(Page.Event.START_DRAWING));
			eventTrigger.trigger(new Event(Page.Event.MOVE_TO, [new Point(20, 20)]));
			eventTrigger.trigger(new Event(Page.Event.STOP_DRAWING));

			var line = page.context.items[0];
			expect(line instanceof Line).toBe(true);
		});
		
		it("should move a line with events", function() {
			var item = page.drawLine([new Point(10, 10), new Point(20, 20)]);
			var eventTrigger = new EventTrigger();
			item.registerEventTrigger(createEventTriggerAdapter(eventTrigger));			
			
			eventTrigger.trigger(new Event(Item.Event.START_MOVING));
			var newPosition = new Point(20, 20);
			eventTrigger.trigger(new Event(Item.Event.MOVE_TO, [newPosition]));
			eventTrigger.trigger(new Event(Item.Event.STOP_MOVING));
			
			var line = page.context.items[0];
			expect(line instanceof Line).toBe(true);
			expect(line.position).toBe(newPosition);
		});		
	});
  
	describe("with KineticJS implementation", function(){
		beforeEach(function() {
			page = new Page(new KineticContext("board"));
		});

		it("should return a Line after drawing a line", function() {
			var item = page.drawLine([new Point(0, 0), new Point(10, 10)]);
			expect(page.context.getItems().length).toEqual(1);
			expect(item instanceof Line).toBe(true);
		});
	});

});