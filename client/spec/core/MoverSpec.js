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

		it("should move a line with events, Page.START_MOVING, Page.MOVE_TO, Page.STOP_MOVING", function() {
			var line = new Line([new Point(0, 0), new Point(10, 10)])
			context.addItem(line);

			triggerStartMovingEvent(line, 5, 5);
			expectNoItem(mover);
			expectOneDraftItem(mover);			
			
			triggerMoveToEvent(20, 20);
			expectNoItem(mover);
			expectOneDraftItem(mover);
			
			triggerFinishMovingEvent(line);
			expectOneItem(mover);
			expectNoDraftItem(mover);

			line = mover.getContext().getItems()[0];
			expect(line.getPosition()).toEqual({x: 15, y: 15});
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

	function triggerStartMovingEvent(item, x, y){
		eventBus.publish(new Event(Event.Page.START_MOVING, [item, new Point(x, y)]));
	}
	
	function triggerFinishMovingEvent(item){
		eventBus.publish(new Event(Event.Page.FINISH_MOVING, [item]));
	}

	function triggerMoveToEvent(x, y){
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(x, y)]));
	}
});

});
