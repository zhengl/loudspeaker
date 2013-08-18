require(['Environment', 'Page', 'Item', 'Point', 'Line', 'Text', 'EventBus', 'Context', 'Painter', 'Texter'], function(Environment, Page, Item, Point, Line, Text, EventBus, Context, Painter, Texter){


describe("Item", function(){
	var item;

	beforeEach(function(){
		Environment.setDummy();
		item = new Item();
	});
	
	it("should be movable", function(){
		var newPosition = new Point(10, 10);
		item.moveTo(newPosition);
		expect(item.position).toEqual(newPosition);
	});

	it("should be able to enable event handling", function(){
		item.registerEventBus(new EventBus());
		expect(item.getEventBus()).toBeDefined();
	});
});

describe("Line", function(){
	var page;

	beforeEach(function(){
		var context = new Context();
		var painter = new Painter(context);
		page = new Page(painter);
	});

	it("serialize to JSON", function(){
		var line = new Line([new Point(0, 0), new Point(1, 1), new Point(2, 2)], 'red');
		line.setPosition(new Point(10, 10));

		var result = page.draw(line);
		expect(result.serialize()).toEqual({
			type: "line",
			color: "red",
			points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
			position: {x: 10, y: 10},
		});
	});
});

describe("Text", function(){
	var page;

	beforeEach(function(){
		var context = new Context();
		var texter = new Texter(context);
		page = new Page(null, texter, null);
	});

	it("serialize to JSON", function(){
		var text = new Text("Hello World!", "red");
		text.setPosition(new Point(10, 10));

		var result = page.write(text);
		expect(result.serialize()).toEqual({
			type: "text",
			color: "red",
			content: "Hello World!",
			position: {x: 10, y: 10},
		});
	});
});


});
