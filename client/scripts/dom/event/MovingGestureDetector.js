define('MovingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Note'], function(GestureDetector, GestureStep, Event, Point, Note){


function MovingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;

	var startMovingStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startMoving);
	var moveToStep = new GestureStep(Event.Kinetic.MOVE_TO, this.moveTo);
	var finishMovingStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.finishMoving);

	startMovingStep.addNextStep(moveToStep);
	moveToStep.addNextStep(moveToStep);
	moveToStep.addNextStep(finishMovingStep);
	finishMovingStep.addNextStep(startMovingStep);
	GestureDetector.call(this, startMovingStep, monitor);
}

MovingGestureDetector.prototype = new GestureDetector();
MovingGestureDetector.prototype.constructor = MovingGestureDetector;

HOVERING_INTERVAL = 500;

MovingGestureDetector.prototype.startMoving = function(event) {
	if (undefined != event.targetItem) {
		var currentPosition = event.targetItem.getPosition();
		var position;
		
		if(event.targetItem instanceof Note && event.targetItem.hasParent()) {
			var canvasPosition = this.getCanvasPositionForNote(event);
			position = new Point(canvasPosition.x - currentPosition.x, canvasPosition.y - currentPosition.y);
		} else {
			position = new Point(event.canvasX - currentPosition.x, event.canvasY - currentPosition.y);
		}

		var data = {
			item: event.targetItem,
			position: position,
		}
		var self = this;
		this.hoveringTimerId = window.setTimeout(function(){
			self.isMoving = true;
			self.eventBus.publish(new Event(Event.Page.START_MOVING, data));
			self.inform(self);
		}, HOVERING_INTERVAL);
	} else {
		this.rewind();
	}
};

MovingGestureDetector.prototype.moveTo = function(event) {
	if (this.isMoving) {
		var position;

		if(event.targetItem instanceof Note && event.targetItem.hasParent()) {
			var canvasPosition = this.getCanvasPositionForNote(event);
			position = new Point(canvasPosition.x, canvasPosition.y);
		} else {
			position = new Point(event.canvasX, event.canvasY);
		}

		this.eventBus.publish(new Event(Event.Page.MOVE_TO, { position: position }));
		this.inform(this);
	} else {
		window.clearTimeout(this.hoveringTimerId);
		this.rewind();
	}
};

MovingGestureDetector.prototype.finishMoving = function(event) {
	this.isMoving = false;
	this.eventBus.publish(new Event(Event.Page.FINISH_MOVING, { position: new Point(event.canvasX, event.canvasY) }));
	this.inform(this);
};

MovingGestureDetector.prototype.getCanvasPositionForNote = function(event) {
	var parentRect = event.targetItem.getParent().getPage().getElement().getBoundingClientRect();
	var childRect = event.targetItem.getElement().getBoundingClientRect();
	var offsetX = childRect.left - parentRect.left + event.offsetX;
	var offsetY = childRect.top - parentRect.top + event.offsetY;
	var canvasX = offsetX * event.targetItem.zoomPercentage;
	var canvasY = offsetY * event.targetItem.zoomPercentage;
	return new Point(canvasX , canvasY);
};

return MovingGestureDetector;

});