define('PaintingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Item'], function(GestureDetector, GestureStep, Event, Point, Item){


function PaintingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.monitor = monitor;

	var readyToDrawStep1 = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.readyToDraw);
	var readyToDrawStep2 = new GestureStep(Event.Kinetic.MOVE_TO, this.readyToDraw);
	var startDrawingStep = new GestureStep(Event.Kinetic.MOVE_TO, this.startDrawing);
	var drawToStep = new GestureStep(Event.Kinetic.MOVE_TO, this.drawTo);
	var finishDrawingStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.finishDrawing);

	readyToDrawStep1.addNextStep(readyToDrawStep2);
	readyToDrawStep2.addNextStep(startDrawingStep);
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
	if (undefined != event.targetItem) {
		this.rewind();
	} 
};

PaintingGestureDetector.prototype.startDrawing = function(event) {
	this.eventBus.publish(new Event(Event.Page.START_DRAWING, { data: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

PaintingGestureDetector.prototype.drawTo = function(event){
	this.eventBus.publish(new Event(Event.Page.DRAW_TO, { data: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

PaintingGestureDetector.prototype.finishDrawing = function(event){
	this.eventBus.publish(new Event(Event.Page.FINISH_DRAWING, { data: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

return PaintingGestureDetector;

});