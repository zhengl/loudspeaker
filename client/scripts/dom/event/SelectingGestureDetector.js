define('SelectingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function SelectingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;

	var selectStep = new GestureStep(Event.Kinetic.MOUSE_ENTER, this.select);
	var unselectStep = new GestureStep(Event.Kinetic.MOUSE_LEAVE, this.unselect);

	selectStep.addNextStep(unselectStep);
	unselectStep.addNextStep(selectStep);
	GestureDetector.call(this, selectStep, monitor);
}

SelectingGestureDetector.prototype = new GestureDetector();
SelectingGestureDetector.prototype.constructor = SelectingGestureDetector;

SelectingGestureDetector.prototype.select = function(event) {
	if (undefined != event.targetItem) {
		event.targetItem.select();
		console.log("select")
		this.inform();
	} else {
		this.rewind();
	}
};

SelectingGestureDetector.prototype.unselect = function(event) {
	if (undefined != event.targetItem) {
		event.targetItem.unselect();
		this.inform();
	}
};

return SelectingGestureDetector;

});