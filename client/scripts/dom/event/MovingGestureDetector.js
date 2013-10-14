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

MOVING_INTERVAL = 500;

MovingGestureDetector.prototype.startMoving = function(event) {
	var currentPosition = event.targetItem.getPosition() || new Point(0, 0);
	var data = {
		item: event.targetItem,
		position: new Point(event.canvasX - currentPosition.x, event.canvasY - currentPosition.y),
	}
	var self = this;
	this.movingTimerId = window.setTimeout(function(){
		self.isMoving = true;
		self.eventBus.publish(new Event(Event.Page.START_MOVING, data));
		self.inform(self);
	}, MOVING_INTERVAL);
	console.log("moving: " + this.movingTimerId)
};

MovingGestureDetector.prototype.moveTo = function(event) {
	if (this.isMoving) {
		this.eventBus.publish(new Event(Event.Page.MOVE_TO, { item: event.targetItem, position: new Point(event.canvasX, event.canvasY) }));
		this.inform(this);
	} else {
		this.rewind();
	}
};

MovingGestureDetector.prototype.finishMoving = function(event) {
	this.isMoving = false;
	this.eventBus.publish(new Event(Event.Page.FINISH_MOVING, { item: event.targetItem, position: new Point(event.canvasX, event.canvasY) }));
	this.inform(this);
};

MovingGestureDetector.prototype.rewind = function() {
	console.log("rewind moving: " + this.movingTimerId)
	window.clearTimeout(this.movingTimerId);
	this.currentCandidateSteps = this.rootSteps;
};


return MovingGestureDetector;

});