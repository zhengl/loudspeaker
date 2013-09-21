define('MovingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function MovingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.longPressTimerId;
	this.isReady = false;

	var readyToMoveStep = new GestureStep(Event.Kinetic.MOUSE_ENTER, this.readyToMove);
	var stopMovingStep = new GestureStep(Event.Kinetic.MOUSE_LEAVE, this.stopMoving);
	var startMovingStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startMoving);
	var moveToStep = new GestureStep(Event.Kinetic.MOVE_TO, this.moveTo);
	var finishMovingStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.finishMoving);

	readyToMoveStep.addNextStep(startMovingStep);
	readyToMoveStep.addNextStep(stopMovingStep);
	startMovingStep.addNextStep(moveToStep);
	moveToStep.addNextStep(moveToStep);
	moveToStep.addNextStep(finishMovingStep);
	finishMovingStep.addNextStep(startMovingStep);
	GestureDetector.call(this, readyToMoveStep, monitor);
}

MovingGestureDetector.prototype = new GestureDetector();
MovingGestureDetector.prototype.constructor = MovingGestureDetector;

HOVERING_INTERVAL = 500;

MovingGestureDetector.prototype.readyToMove = function(event) {
	console.log(event.targetItem);
	if (undefined != event.targetItem){
		var self = this;
		this.hoveringTimerId = window.setTimeout(function(){
			self.isReady = true;
		}, HOVERING_INTERVAL);
	}
};

MovingGestureDetector.prototype.stopMoving = function(event) {
	window.clearTimeout(this.hoveringTimerId);
	this.isReady = false;
	this.rewind();
};

MovingGestureDetector.prototype.startMoving = function(event) {
	if (undefined != event.targetItem && this.isReady) {
		var currentPosition = event.targetItem.getPosition();
		var data = {
			item: event.targetItem,
			position: new Point(event.offsetX - currentPosition.x, event.offsetY - currentPosition.y),
		}
		this.eventBus.publish(new Event(Event.Page.START_MOVING, data));
	}
};

MovingGestureDetector.prototype.moveTo = function(event) {
	this.eventBus.publish(new Event(Event.Page.MOVE_TO, { position: new Point(event.offsetX, event.offsetY) }));
};

MovingGestureDetector.prototype.finishMoving = function(event) {
	this.eventBus.publish(new Event(Event.Page.FINISH_MOVING, { position: new Point(event.offsetX, event.offsetY) }));
};

return MovingGestureDetector;

});