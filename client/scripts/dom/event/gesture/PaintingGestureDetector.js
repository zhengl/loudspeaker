define('PaintingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Item', 'Page'], function(GestureDetector, GestureStep, Event, Point, Item, Page){


function PaintingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.monitor = monitor;

	var readyToDrawStep1 = new GestureStep(Event.Mouse.MOUSE_DOWN, this.readyToDraw);
	var readyToDrawStep2 = new GestureStep(Event.Mouse.MOVE_TO, this.readyToDraw);
	var stopDrawingStep = new GestureStep(Event.Mouse.MOUSE_UP, this.stopDrawing);
	var startDrawingStep = new GestureStep(Event.Mouse.MOVE_TO, this.startDrawing);
	var drawToStep = new GestureStep(Event.Mouse.MOVE_TO, this.drawTo);
	var finishDrawingStep = new GestureStep(Event.Mouse.MOUSE_UP, this.finishDrawing);

	readyToDrawStep1.addNextStep(readyToDrawStep2);
	readyToDrawStep1.addNextStep(stopDrawingStep);
	readyToDrawStep2.addNextStep(startDrawingStep);
	readyToDrawStep2.addNextStep(stopDrawingStep);
	startDrawingStep.addNextStep(drawToStep);
	startDrawingStep.addNextStep(finishDrawingStep);
	drawToStep.addNextStep(drawToStep);
	drawToStep.addNextStep(finishDrawingStep);
	finishDrawingStep.addNextStep(readyToDrawStep1);
	GestureDetector.call(this, readyToDrawStep1, monitor);
}

PaintingGestureDetector.prototype = new GestureDetector();
PaintingGestureDetector.prototype.constructor = PaintingGestureDetector;

PaintingGestureDetector.prototype.readyToDraw = function(event) {
	if (!event.targetItem.context) {
		this.rewind();
	}
};

PaintingGestureDetector.prototype.stopDrawing = function() {
	this.rewind();
};

PaintingGestureDetector.prototype.startDrawing = function(event) {
	this.eventBus.publish(new Event(Event.Page.START_DRAWING, { position: new Point(event.canvasX, event.canvasY) }));
	this.inform(this);
};

PaintingGestureDetector.prototype.drawTo = function(event){
	this.eventBus.publish(new Event(Event.Page.DRAW_TO, { position: new Point(event.canvasX, event.canvasY) }));
	this.inform(this);
};

PaintingGestureDetector.prototype.finishDrawing = function(event){
	this.eventBus.publish(new Event(Event.Page.FINISH_DRAWING, { position: new Point(event.canvasX, event.canvasY) }));
	this.inform(this);
};

return PaintingGestureDetector;

});