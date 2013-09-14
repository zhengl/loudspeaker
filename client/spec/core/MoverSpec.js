require(['Mover', 'RubbishBin', 'Context', 'Line', 'Text', 'Point', 'EventBus', 'Event', 'MoverEventHandler', 'ItemEventHandler'], function(Mover, RubbishBin, Context, Line, Text, Point, EventBus, Event, MoverEventHandler, ItemEventHandler){

describe("Mover", function(){
	var mover;
	var context;

	beforeEach(function(){
		context = new Context();
		mover = new Mover(context);
	});

	it("should move a line", function(){
		var line = new Line([new Point(0, 0), new Point(10, 10)])
		context.addItem(line);

		mover.startMoving(line);
		mover.moveTo(new Point(20, 20));
		mover.finishMoving();
		expect(line.getPosition()).toEqual({x: 20, y:20});
	});

	it("should be able to set removal zone", function(){
		var line = new Line([new Point(0, 0), new Point(10, 10)])
		context.addItem(line);

		expect(context.getItems().length).toEqual(1);

		var rubbishBin = new RubbishBin();
		mover.setRubbishBin(rubbishBin);
		rubbishBin.open();

		mover.startMoving(line);
		mover.moveTo(new Point(45, 10));
		mover.finishMoving();
		expect(context.getItems().length).toEqual(0);
	});

	describe("with event handling", function(){
		beforeEach(function(){
			eventBus = new EventBus();
			mover.enableEventHandling(eventBus);	
		});

		it("should move a line with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = new Line([new Point(0, 0), new Point(10, 10)])
			context.addItem(line);
			line.enableEventHandling(eventBus);

			triggerSelectEvent(line);
			triggerStartMovingEvent(line, 5, 5);
			expectNoItem(mover);
			expectOneDraftItem(mover);			
			
			triggerPageMoveToEvent(20, 20);
			expectNoItem(mover);
			expectOneDraftItem(mover);
			
			triggerFinishMovingEvent(line);
			expectOneItem(mover);
			expectNoDraftItem(mover);

			line = mover.getContext().getItems()[0];
			expect(line.getPosition()).toEqual({x: 15, y: 15});
		});


		it("should move lines with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = new Line([new Point(0, 0), new Point(10, 10)])
			context.addItem(line);
			line.enableEventHandling(eventBus);

			var line2 = new Line([new Point(0, 0), new Point(10, 10)])
			context.addItem(line2);

			expect(mover.getContext().getItems().length).toEqual(2);
						
			triggerSelectEvent(line);
			triggerStartMovingEvent(line, 5, 5);
			expectOneItem(mover);
			expectOneDraftItem(mover);			
			
			triggerPageMoveToEvent(20, 20);
			expectOneItem(mover);
			expectOneDraftItem(mover);
			
			triggerFinishMovingEvent(line);
			expect(mover.getContext().getItems().length).toEqual(2);
			expectNoDraftItem(mover);

			item = mover.getContext().getItems()[1];
			expect(item.getPosition()).toEqual({x: 15, y: 15});
		});	

		it("should move a line with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var line = new Line([new Point(0, 0), new Point(10, 10)])
			context.addItem(line);
			line.enableEventHandling(eventBus);

			triggerSelectEvent(line);
			triggerStartMovingEvent(line, 5, 5);
			expectNoItem(mover);
			expectOneDraftItem(mover);			
			
			triggerItemMoveToEvent(line, 20, 20);
			expectNoItem(mover);
			expectOneDraftItem(mover);
			
			item = mover.getContext().getDraftItems()[0];
			expect(item.getPosition()).toEqual({x: 15, y: 15});			

			triggerFinishMovingEvent(line);
			expectOneItem(mover);
			expectNoDraftItem(mover);
			item = mover.getContext().getItems()[0];
			expect(item.getPosition()).toEqual({x: 15, y: 15});
		});

		it("should move a text with events, Item.START_MOVING, Page.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = new Text("Hello World");
			text.setPosition(new Point(10, 10));
			context.addItem(text);
			text.enableEventHandling(eventBus);
		
			triggerSelectEvent(text);
			triggerStartMovingEvent(text, 5, 5);
			expectNoItem(mover);
			expectOneDraftItem(mover);			
			
			triggerPageMoveToEvent(20, 20);
			expectNoItem(mover);
			expectOneDraftItem(mover);
			
			triggerFinishMovingEvent(text);
			expectOneItem(mover);
			expectNoDraftItem(mover);

			item = mover.getContext().getItems()[0];
			expect(item.getPosition()).toEqual({x: 15, y: 15});
		});

		it("should move a text with events, Item.START_MOVING, Item.MOVE_TO, Item.STOP_MOVING after being selected", function() {
			var text = new Text("Hello World");
			text.setPosition(new Point(10, 10));
			context.addItem(text);
			text.enableEventHandling(eventBus);

			triggerSelectEvent(text);
			triggerStartMovingEvent(text, 5, 5);
			expectNoItem(mover);
			expectOneDraftItem(mover);			
			
			triggerItemMoveToEvent(text, 20, 20);
			expectNoItem(mover);
			expectOneDraftItem(mover);
			
			triggerFinishMovingEvent(text);
			expectOneItem(mover);
			expectNoDraftItem(mover);

			text = mover.getContext().getItems()[0];
			expect(text.getPosition()).toEqual({x: 15, y: 15});
		});	
	});

	function expectOneItem(mover){
		expect(mover.getContext().getItems().length).toEqual(1);
	}

	function expectOneDraftItem(mover){
		expect(mover.getContext().getDraftItems().length).toEqual(1);
	}
	
	function expectNoItem(mover){
		expect(mover.getContext().getItems().length).toEqual(0);
	}
	
	function expectNoDraftItem(mover){
		expect(mover.getContext().getDraftItems().length).toEqual(0);
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

	function triggerPageMoveToEvent(x, y){
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(x, y)]));
	}

	function triggerItemMoveToEvent(item, x, y){
		eventBus.publish(new Event(Event.Item.MOVE_TO, [item, new Point(x, y)]));
	}

});

});
