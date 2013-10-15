define('NoteDraggingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Note'], function(GestureDetector, GestureStep, Event, Point, Note){


function NoteDraggingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;

	var startDraggingStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startDragging);
	var moveToStep = new GestureStep(Event.Kinetic.MOVE_TO, this.moveTo);
	var finishDraggingStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.finishDragging);

	startDraggingStep.addNextStep(moveToStep);
	moveToStep.addNextStep(moveToStep);
	moveToStep.addNextStep(finishDraggingStep);
	finishDraggingStep.addNextStep(startDraggingStep);
	GestureDetector.call(this, startDraggingStep, monitor);
}

NoteDraggingGestureDetector.prototype = new GestureDetector();
NoteDraggingGestureDetector.prototype.constructor = NoteDraggingGestureDetector;

var DRAGGING_INTERVAL = 500;

NoteDraggingGestureDetector.prototype.startDragging = function(event) {
	if (event.targetItem instanceof Note) {
		var self = this;
		this.draggingTimerId = window.setTimeout(function(){
			self.eventBus.publish(new Event(Event.Note.START_DRAGGING, {item: event.targetItem, position: new Point(event.canvasX, event.canvasY) }));
			self.isMoving = true;
			self.inform(self);
		}, DRAGGING_INTERVAL);
	}  else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.moveTo = function(event) {
	if(this.isMoving) {
		this.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.pageX, event.pageY) }));
		this.inform(this);
	} else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.finishDragging = function() {
	if(this.isMoving) {
		this.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING));
		this.inform(this);
	} else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.rewind = function() {
	this.currentCandidateSteps = this.rootSteps;
	window.clearTimeout(this.draggingTimerId);
};

return NoteDraggingGestureDetector;

});