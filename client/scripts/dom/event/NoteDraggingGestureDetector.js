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

HOVERING_INTERVAL = 500;

NoteDraggingGestureDetector.prototype.startDragging = function(event) {
	if (event.targetItem instanceof Note) {
		var self = this;
		this.hoveringTimerId = window.setTimeout(function(){
			self.eventBus.publish(new Event(Event.Note.START_DRAGGING, {item: event.targetItem}));
			self.inform(self);
		}, HOVERING_INTERVAL);		
	}  else {
		this.rewind();
	}
};

NoteDraggingGestureDetector.prototype.moveTo = function(event) {
	this.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

NoteDraggingGestureDetector.prototype.finishDragging = function(event) {
	this.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING, { position: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

return NoteDraggingGestureDetector;

});