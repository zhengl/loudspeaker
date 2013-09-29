define('MovingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


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
		var data = {
			item: event.targetItem,
			position: new Point(event.offsetX - currentPosition.x, event.offsetY - currentPosition.y),
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
		this.eventBus.publish(new Event(Event.Page.MOVE_TO, { position: new Point(event.offsetX, event.offsetY) }));
		this.inform(this);
	} else {
		window.clearTimeout(this.hoveringTimerId);
		this.rewind();
	}
};

MovingGestureDetector.prototype.finishMoving = function(event) {
	this.isMoving = false;
	this.eventBus.publish(new Event(Event.Page.FINISH_MOVING, { position: new Point(event.offsetX, event.offsetY) }));
	this.inform(this);
};

return MovingGestureDetector;

});