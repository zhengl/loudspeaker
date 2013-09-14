define('PaintingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function PaintingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.monitor = monitor;

	var readyToDrawStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.readyToDraw);
	var startDrawingStep = new GestureStep(Event.Kinetic.MOVE_TO, this.startDrawing);
	var drawToStep = new GestureStep(Event.Kinetic.MOVE_TO, this.drawTo);
	var finishDrawingStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.finishDrawing);

	readyToDrawStep.addNextStep(startDrawingStep);
	startDrawingStep.addNextStep(drawToStep);
	startDrawingStep.addNextStep(finishDrawingStep);
	drawToStep.addNextStep(drawToStep);
	drawToStep.addNextStep(finishDrawingStep);
	finishDrawingStep.addNextStep(readyToDrawStep);
	GestureDetector.call(this, readyToDrawStep, monitor);
}

PaintingGestureDetector.prototype = new GestureDetector();
PaintingGestureDetector.prototype.constructor = PaintingGestureDetector;

PaintingGestureDetector.prototype.readyToDraw = function(event) {
};

PaintingGestureDetector.prototype.startDrawing = function(event) {
	this.eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	this.inform(this);
};

PaintingGestureDetector.prototype.drawTo = function(event){
	this.eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(event.offsetX, event.offsetY)]));
	this.inform(this);
};

PaintingGestureDetector.prototype.finishDrawing = function(event){
	this.eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	this.inform(this);
};

return PaintingGestureDetector;

});