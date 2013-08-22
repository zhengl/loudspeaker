define(function(require){
	var UnserializeStrategy = require('UnserializeStrategy');
	var SerializeStrategy = require('SerializeStrategy');
	var Page = require('Page');
	var Painter = require('Painter');
	var Palette = require('Palette');
	var Context = require('Context');
	var Line = require('Line');
	var Text = require('Text');
	var Texter = require('Texter');
	var TextInput = require('TextInput');
	var Mover = require('Mover');
	var Point = require('Point');
	var Event = require('Event');
	var Item = require('Item');


describe("Page", function() {
	var page;
	var eventBus;

	beforeEach(function() {
		var palette = new Palette();
		var context = new Context();
		var textInput = new TextInput(context);
		var painter = new Painter(context, palette);
		var texter = new Texter(palette, textInput);
		var mover = new Mover(context);
		page =  new Page(painter, texter, mover);
	});

	it("should be able to be in DRAWING mode", function(){
		page.selectPaintingMode();
		expect(page.isPainting()).toBe(true);
	});

	it("should be able to be in TEXTING mode", function(){
		page.selectTextingMode();
		expect(page.isTexting()).toBe(true);
	});

	it("unserialize", function(){
		var unserializer = new UnserializeStrategy();
		unserializer.process(page, {
			items: [
				{
					uuid: "00000000-0000-0000-0000-000000000001",
					type: "line",
					color: "black",
					points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
					position: {x: 10, y: 10},
				},
				{
					uuid: "00000000-0000-0000-0000-000000000002",
					type: "text",
					color: "blue",
					content: "Hello World!",
					position: {x: 20, y: 20},
				},
				]
		});

		var items = page.getContext().getItems();
		expect(items.length).toEqual(2);
		
		var line = items[0];
		expect(line instanceof Line).toBe(true);
		expect(line.getUUID()).toEqual("00000000-0000-0000-0000-000000000001");
		expect(line.getColor()).toEqual('black');
		expect(line.getPosition()).toEqual({x: 10, y: 10});
		expect(line.getPoints()).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]);

		var text = items[1];
		expect(text instanceof Text).toBe(true);
		expect(text.getUUID()).toEqual("00000000-0000-0000-0000-000000000002");
		expect(text.getValue()).toEqual('Hello World!');
		expect(text.getColor()).toEqual('blue');
		expect(text.getPosition()).toEqual({x: 20, y: 20});
	});

	it("serialize", function(){
		var line = createLine(10, 10, 20, 20);
		var lineUUID = line.getUUID();
		line.setColor('black');
		line.setPosition(new Point(30, 30));
		page.draw(line);

		var text = createText("Hello World!", 10, 20);
		var textUUID = text.getUUID();
		text.setColor('blue');
		text.setPosition(new Point(0, 0));
		page.write(text);

		var serializer = new SerializeStrategy();
		expect(serializer.process(page)).toEqual({
			items: [
				{
					uuid: lineUUID,
					type: "line",
					color: "black",
					points: [{x: 10, y: 10}, {x: 20, y: 20}],
					position: {x: 30, y: 30},
				},
				{
					uuid: textUUID,
					type: "text",
					color: "blue",
					content: "Hello World!",
					position: {x: 0, y: 0},
				},
				]
		});
	});
	
	describe("with Event Handling", function(){
		var EventBus = require('EventBus');
		var PageEventHandler = require('PageEventHandler');

		beforeEach(function() {
			eventBus = new EventBus();
			var handler = new PageEventHandler();
			page.enableEventHandling(eventBus, handler);
		});
  
		it("should DRAW a line with events", function() {		
			triggerStartDrawingEvent(10, 10);
			triggerPageDrawToEvent(20, 20);
			triggerFinishDrawingEvent(20, 20);

			var line = page.getPainter().context.getItems()[0];
			expectIsAnItem(line);
			expect(line.getPosition()).toEqual({x: 10, y: 10});
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

			var line = page.getPainter().context.getItems()[0];
			expectIsAnItem(line);
		});
		
		it("should move a line with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
						
			triggerSelectEvent(item);
			triggerStartMovingEvent(item, 5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerPageMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent(item);
			expectOneItem(page);
			expectNoDraftItem(page);

			line = page.getPainter().context.getItems()[0];
			expect(line.getPosition()).toEqual({x: 15, y: 15});
		});

		it("should move lines with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line1 = createLine(10, 10, 20, 20);
			var item1 = page.draw(line1);
			
			var line2 = createLine(30, 30, 40, 40);
			var item2 = page.draw(line2);

			expect(page.getPainter().context.getItems().length).toEqual(2);
						
			triggerSelectEvent(item1);
			triggerStartMovingEvent(item1, 5, 5);
			expectOneItem(page);
			expectOneDraftItem(page);			
			
			triggerPageMoveToEvent(20, 20);
			expectOneItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent(item1);
			expect(page.getPainter().context.getItems().length).toEqual(2);
			expectNoDraftItem(page);

			line1 = page.getPainter().context.getItems()[1];
			expect(line1.getPosition()).toEqual({x: 15, y: 15});
		});	
		

		it("should move a line with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.draw(line);
						
			triggerSelectEvent(item);
			triggerStartMovingEvent(item, 5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerItemMoveToEvent(item, 20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			line = page.getPainter().context.getDraftItems()[0];
			expect(line.getPosition()).toEqual({x: 15, y: 15});			

			triggerFinishMovingEvent(item);
			expectOneItem(page);
			expectNoDraftItem(page);
			line = page.getPainter().context.getItems()[0];
			expect(line.getPosition()).toEqual({x: 15, y: 15});
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
						
			triggerSelectEvent(item);		
			expect(item.isSelected).toBe(true);
			
			triggerUnselectEvent(item);			
			expect(item.isSelected).toBe(false);
		});

		it("should create a input widget with event START_TEXTING", function(){
			page.selectTextingMode();

			triggerStartTextingEvent(10, 20);

			var textInput = page.getTexter().getTextInput();
			expect(textInput).toBeDefined();
			expect(textInput.getPosition()).toEqual({x: 10, y: 20});
		});

		it("should move a text with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = createText();
			var item = page.write(text);
						
			triggerSelectEvent(item);
			triggerStartMovingEvent(item, 5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerPageMoveToEvent(20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent(item);
			expectOneItem(page);
			expectNoDraftItem(page);

			text = page.getPainter().context.getItems()[0];
			expect(text.getPosition()).toEqual({x: 15, y: 15});
		});	

		it("should move a text with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = createText("Hello World", 0, 0);
			var item = page.write(text);
						
			triggerSelectEvent(item);
			triggerStartMovingEvent(item, 5, 5);
			expectNoItem(page);
			expectOneDraftItem(page);			
			
			triggerItemMoveToEvent(item, 20, 20);
			expectNoItem(page);
			expectOneDraftItem(page);
			
			triggerFinishMovingEvent(item);
			expectOneItem(page);
			expectNoDraftItem(page);

			text = page.getPainter().context.getItems()[0];
			expect(text.getPosition()).toEqual({x: 15, y: 15});
		});		
	});
  
	describe("with KineticJS context", function(){
		var DOMPalette = require('DOMPalette');
		var KineticContext = require('KineticContext');
		var KineticTextInput = require('KineticTextInput');
		var KineticLine = require('KineticLine');
		var KineticText = require('KineticText');

		beforeEach(function() {
			var body = document.getElementsByTagName('body')[0];
			var board = document.createElement('div');
			board.id = "board";

			var palette = document.createElement('div');
			palette.id = "palette";

			body.appendChild(board);
			body.appendChild(palette);

			var palette = new DOMPalette("palette");
			var context = new KineticContext("board", 50, 50);

			var painter = new Painter(context, palette);
			
			var textInput = new TextInput(context);
			var texter = new Texter(palette, textInput);
			var mover = new Mover(context);

			page = new Page(painter, texter, mover);
		});
		
		it("should return a Line after DRAWING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draw(line);


			expect(item instanceof KineticLine).toBe(true);
			expect(item.getPosition()).toEqual({x: 10, y: 10});
			expect(page.getPainter().context.layer.getChildren().toArray().length).toEqual(1);
		});

		it("should return a Line after DRAFTING a line with direct call", function() {
			var line = createLine(10, 10, 20, 20);
			var item = page.getPainter().draft(line);

			expect(item instanceof KineticLine).toBe(true);
			expect(item.getPosition()).toEqual({x: 10, y: 10});
			expect(page.getPainter().context.draftLayer.getChildren().toArray().length).toEqual(1);			
		});

		it("should return a Text after TEXTING a text with direct call", function(){
			var text = createText("Hello World!", 10, 20);
			var item = page.getTexter().write(text);

			expect(item instanceof KineticText).toBe(true);
			expect(page.getPainter().context.layer.getChildren().toArray().length).toEqual(1);
			
			var result = page.getPainter().context.layer.getChildren().toArray()[0];
			expect(result.getText()).toEqual("Hello World!");
			expect(result.getPosition()).toEqual({x: 10, y: 20});
		});

		it("should return a Text after TEXTING texts in sequence with direct call", function(){
			var text = createText("Hello ", 10, 20);
			page.getTexter().draft(text);
			expect(page.getTexter().getTextInput().context.draftLayer.getChildren().toArray().length).toEqual(1);

			text = createText("World!", 10, 20);
			page.getTexter().draft(text);
			expect(page.getTexter().getTextInput().context.draftLayer.getChildren().toArray().length).toEqual(1);

			var item = page.getTexter().finishTexting();
			expect(page.getTexter().getTextInput().context.layer.getChildren().toArray().length).toEqual(1);
			expect(page.getTexter().getTextInput().context.draftLayer.getChildren().toArray().length).toEqual(0);
			expect(item instanceof KineticText).toBe(true);
			
			var result = page.getTexter().getTextInput().context.layer.getChildren().toArray()[0];
			expect(result.getText()).toEqual("Hello World!");
			expect(result.getPosition()).toEqual({x: 10, y: 20});
		});

		it("should return a Text after DRAFTING a text with direct call", function(){
			var text = createText("Hello World!", 10, 20);
			var item = page.getTexter().draft(text);
			
			expect(item instanceof KineticText).toBe(true);
			expect(page.getTexter().getTextInput().context.draftLayer.getChildren().toArray().length).toEqual(1);

			var result = page.getTexter().getTextInput().context.draftLayer.getChildren().toArray()[0];
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
		expect(page.getPainter().context.getItems().length).toEqual(1);
	}

	function expectOneDraftItem(page){
		expect(page.getPainter().context.getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(page){
		expect(page.getPainter().context.getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(page){
		expect(page.getPainter().context.getDraftItems().length).toEqual(0);
	}
	
	function expectIsAnItem(item){
		expect(item instanceof Item).toBe(true);
	}

	function triggerPageMoveToEvent(x, y){
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(x, y)]));
	}

	function triggerPageDrawToEvent(x, y){
		eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(x, y)]));
	}

	function triggerItemMoveToEvent(item, x, y){
		eventBus.publish(new Event(Event.Item.MOVE_TO, [item, new Point(x, y)]));
	}
	
	function triggerStartDrawingEvent(x, y){
		eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(x, y)]));		
	}

	function triggerFinishDrawingEvent(x, y){
		eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(x, y)]));		
	}
	
	function triggerStopDrawingEvent(){
		eventBus.publish(new Event(Event.Page.STOP_DRAWING));		
	}
	
	function triggerSelectEvent(item){
		eventBus.publish(new Event(Event.Item.SELECT, [item]));	
	}
	
	function triggerUnselectEvent(item){
		eventBus.publish(new Event(Event.Item.UNSELECT, [item]));	
	}
	
	function triggerStartMovingEvent(item, x, y){
		eventBus.publish(new Event(Event.Item.START_MOVING, [item, new Point(x, y)]));
	}
	
	function triggerFinishMovingEvent(item){
		eventBus.publish(new Event(Event.Item.FINISH_MOVING, [item]));
	}

	function triggerStartTextingEvent(x, y){
		eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(x, y)]));
	}
});


});