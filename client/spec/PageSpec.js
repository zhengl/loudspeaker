define(function(require){
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

	// it("unserialize", function(){
	// 	var unserializer = new UnserializeStrategy();
	// 	unserializer.process(page, {
	// 		uuid: "00000000-0000-0000-0001-000000000000",
	// 		items: [
	// 			{
	// 				uuid: "00000000-0000-0000-0000-000000000001",
	// 				type: "line",
	// 				color: "black",
	// 				points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
	// 				position: {x: 10, y: 10},
	// 			},
	// 			{
	// 				uuid: "00000000-0000-0000-0000-000000000002",
	// 				type: "text",
	// 				color: "blue",
	// 				content: "Hello World!",
	// 				position: {x: 20, y: 20},
	// 			},
	// 			]
	// 	});

	// 	var items = page.getContext().getItems();
	// 	expect(page.getUUID()).toEqual("00000000-0000-0000-0001-000000000000");
	// 	expect(items.length).toEqual(2);
		
	// 	var line = items[0];
	// 	expect(line instanceof Line).toBe(true);
	// 	expect(line.getUUID()).toEqual("00000000-0000-0000-0000-000000000001");
	// 	expect(line.getColor()).toEqual('black');
	// 	expect(line.getPosition()).toEqual({x: 10, y: 10});
	// 	expect(line.getPoints()).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]);

	// 	var text = items[1];
	// 	expect(text instanceof Text).toBe(true);
	// 	expect(text.getUUID()).toEqual("00000000-0000-0000-0000-000000000002");
	// 	expect(text.getValue()).toEqual('Hello World!');
	// 	expect(text.getColor()).toEqual('blue');
	// 	expect(text.getPosition()).toEqual({x: 20, y: 20});
	// });

	// it("serialize", function(){
	// 	var pageUUID = page.getUUID();

	// 	var line = createLine(10, 10, 20, 20);
	// 	var lineUUID = line.getUUID();
	// 	line.setColor('black');
	// 	line.setPosition(new Point(30, 30));
	// 	page.draw(line);

	// 	var text = createText("Hello World!", 10, 20);
	// 	var textUUID = text.getUUID();
	// 	text.setColor('blue');
	// 	text.setPosition(new Point(0, 0));
	// 	page.write(text);

	// 	var serializer = new SerializeStrategy();
	// 	expect(serializer.process(page)).toEqual({
	// 		uuid: pageUUID,
	// 		items: [
	// 			{
	// 				uuid: lineUUID,
	// 				type: "line",
	// 				color: "black",
	// 				points: [{x: 10, y: 10}, {x: 20, y: 20}],
	// 				position: {x: 30, y: 30},
	// 			},
	// 			{
	// 				uuid: textUUID,
	// 				type: "text",
	// 				color: "blue",
	// 				content: "Hello World!",
	// 				position: {x: 0, y: 0},
	// 			},
	// 			]
	// 	});
	// });
  
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