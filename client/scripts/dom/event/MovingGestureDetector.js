define('MovingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function MovingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.longPressTimerId;

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

MovingGestureDetector.prototype.startMoving = function(event) {
	if (undefined != event.targetItem) {
		var currentPosition = event.targetItem.getPosition();
		var data = {
			item: event.targetItem,
			position: new Point(event.offsetX - currentPosition.x, event.offsetY - currentPosition.y),
		}
		this.eventBus.publish(new Event(Event.Page.START_MOVING, data));
	} else {
		this.rewind();
	}
};

MovingGestureDetector.prototype.moveTo = function(event) {
	this.eventBus.publish(new Event(Event.Page.MOVE_TO, { data: new Point(event.offsetX, event.offsetY) }));
};

MovingGestureDetector.prototype.finishMoving = function(event) {
	this.eventBus.publish(new Event(Event.Page.FINISH_MOVING, { data: new Point(event.offsetX, event.offsetY) }));
};

return MovingGestureDetector;

});