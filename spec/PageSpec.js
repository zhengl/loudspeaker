describe("Page", function() {
	var page;
	var eventTrigger;

	beforeEach(function() {
		Environment.setDummy();
		page = new Page();
	});

	it("should be able to be in DRAWING mode", function(){
		page.selectPaintingMode();
		expect(page.isPainting).toBe(true);
	});
	
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
			triggerPageDrawToEvent(20, 20);
			triggerFinishDrawingEvent(20, 20);

			var line = page.context.getItems()[0];
			expectIsAnItem(line);
			expect(line.getPosition().x).toBe(10);
			expect(line.getPosition().y).toBe(10);
			expect(line.points.length).toBe(3);
		});
		
		it("should DRAFT a line with events", function() {
			triggerStartDrawingEvent(10, 10);
			
			triggerPageDrawToEvent(20, 20);
			expectOneDraftItem(page);
			expectNoItem(page);
			
			triggerPageDrawToEvent(30, 30);
			expectOneDraftItem(page);
			expectNoItem(page);
			
			triggerFinishDrawingEvent(30, 30);
			expectNoDraftItem(page);
			expectOneItem(page);

			var line = page.context.getItems()[0];
			expectIsAnItem(line);
		});
		
		it("should move a line with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			
			eventTrigger = item.getInputEventTrigger();
			
			triggerSelectEvent();
			triggerStartMovingEvent(5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			eventTrigger = page.getInputEventTrigger();

			triggerPageMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			eventTrigger = item.getInputEventTrigger();

			triggerFinishMovingEvent();
			expectOneItem(page);~
			expectNoDraftItem(page);

			line = page.context.getItems()[0];
			expect(line.getPosition().x).toBe(15);
			expect(line.getPosition().y).toBe(15);
		});	
		

		it("should move a line with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
			
			eventTrigger = item.getInputEventTrigger();
			
			triggerSelectEvent();
			triggerStartMovingEvent(5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerItemMoveToEvent(20, 20);
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
			
			triggerPageDrawToEvent(20, 20);
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

		it("should create a input widget with event START_TEXTING", function(){
			page.selectTextingMode();

			triggerStartTextingEvent(10, 20);

			var textInput = page.getTexter().getTextInput();
			expect(textInput).toBeDefined();
			expect(textInput.getPosition().x).toBe(10);
			expect(textInput.getPosition().y).toBe(20);
		});

		it("should move a text with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = createText();
			var item = page.write(text);
			
			eventTrigger = item.getInputEventTrigger();
			
			triggerSelectEvent();
			triggerStartMovingEvent(5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			eventTrigger = page.getInputEventTrigger();

			triggerPageMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			eventTrigger = item.getInputEventTrigger();

			triggerFinishMovingEvent();
			expectOneItem(page);
			expectNoDraftItem(page);

			text = page.context.getItems()[0];
			expect(text.getPosition().x).toBe(15);
			expect(text.getPosition().y).toBe(15);
		});	

		it("should move a text with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = createText();
			var item = page.write(text);
			
			eventTrigger = item.getInputEventTrigger();
			
			triggerSelectEvent();
			triggerStartMovingEvent(5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerItemMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent();
			expectOneItem(page);
			expectNoDraftItem(page);

			text = page.context.getItems()[0];
			expect(text.getPosition().x).toBe(15);
			expect(text.getPosition().y).toBe(15);
		});		
	});
  
	describe("with KineticJS context", function(){
		beforeEach(function() {
			Environment.setMouse();
			page = new Page();
		});
		
		it("should return a Line after DRAWING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draw(line);
			expect(page.context.layer.getChildren().toArray().length).toEqual(1);
			expect(item instanceof KineticLine).toBe(true);
		});

		it("should return a Line after DRAFTING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draft(line);
			expect(page.context.draftLayer.getChildren().toArray().length).toEqual(1);
			expect(item instanceof KineticLine).toBe(true);
		});

		it("should return a Text after TEXTING a text with direct call", function(){
			var text = createText("Hello World!", 10, 20);
			var item = page.getTexter().write(text);

			expect(item instanceof KineticText).toBe(true);
			expect(page.context.layer.getChildren().toArray().length).toEqual(1);
			
			var result = page.context.layer.getChildren().toArray()[0];
			expect(result.getText()).toEqual("Hello World!");
			expect(result.getPosition()).toEqual({x: 10, y: 20});
		});

		it("should return a Text after TEXTING texts in sequence with direct call", function(){
			var text = createText("Hello ", 10, 20);
			page.getTexter().draft(text);
			expect(page.context.draftLayer.getChildren().toArray().length).toEqual(1);

			text = createText("World!", 10, 20);
			page.getTexter().draft(text);
			expect(page.context.draftLayer.getChildren().toArray().length).toEqual(1);

			var item = page.getTexter().finishTexting();
			expect(page.context.layer.getChildren().toArray().length).toEqual(1);
			expect(page.context.draftLayer.getChildren().toArray().length).toEqual(0);
			expect(item instanceof KineticText).toBe(true);
			
			var result = page.context.layer.getChildren().toArray()[0];
			expect(result.getText()).toEqual("Hello World!");
			expect(result.getPosition()).toEqual({x: 10, y: 20});
		});

		it("should return a Text after DRAFTING a text with direct call", function(){
			var text = createText("Hello World!", 10, 20);
			var item = page.getTexter().draft(text);
			
			expect(item instanceof KineticText).toBe(true);
			expect(page.context.draftLayer.getChildren().toArray().length).toEqual(1);

			var result = page.context.draftLayer.getChildren().toArray()[0];
			expect(result.getText()).toEqual("Hello World!");
			expect(result.getPosition()).toEqual({x: 10, y: 20});
		});
	});

	function createLine(x1, y1, x2, y2) {
		return new Line([new Point(x1, y1), new Point(x2, y2)]);
	}

	function createText(content, x, y){
		var text = new Text(content);
		text.setPosition(new Point(x, y));
		return text;
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

	function triggerPageMoveToEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.MOVE_TO, [new Point(x, y)]));
	}

	function triggerPageDrawToEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.DRAW_TO, [new Point(x, y)]));
	}

	function triggerItemMoveToEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Item.Event.MOVE_TO, [new Point(x, y)]));
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

	function triggerStartTextingEvent(x, y){
		eventTrigger.trigger(new AbstractEvent(Page.Event.START_TEXTING, [new Point(x, y)]));
	}
});
