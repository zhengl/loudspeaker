define('NoteDraggingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Note'], function(GestureDetector, GestureStep, Event, Point, Note){


function NoteDraggingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;

	var startDraggingStep = new GestureStep(Event.Mouse.MOUSE_DOWN, this.startDragging);
	var moveToStep = new GestureStep(Event.Mouse.MOVE_TO, this.moveTo);
	var finishDraggingStep = new GestureStep(Event.Mouse.MOUSE_UP, this.finishDragging);

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
			document.body.onmousemove = function(event){
				self.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.clientX, event.clientY) }));
			};

			document.body.onmouseup = function(){
				self.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING));
			};
		}, DRAGGING_INTERVAL);
	}  else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.moveTo = function(event) {
	if(this.isMoving) {
		this.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.clientX, event.clientY) }));
		this.inform(this);
	} else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.finishDragging = function() {
	if(this.isMoving) {
		this.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING));
		this.inform(this);

		document.body.onmousemove = null;
		document.body.onmouseup = null;
	} else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.rewind = function() {
	this.currentCandidateSteps = this.rootSteps;
	window.clearTimeout(this.draggingTimerId);
	document.body.onmousemove = null;
	document.body.onmouseup = null;
};

return NoteDraggingGestureDetector;

});