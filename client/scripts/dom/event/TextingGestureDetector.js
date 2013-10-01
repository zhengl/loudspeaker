define('TextingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point', 'Page'], function(GestureDetector, GestureStep, Event, Point, Page){


function TextingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.click = 0;
	this.doubleClickTimerId;

	var readyToTextStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.readyToText);
	var startTextingStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startTexting);

	readyToTextStep.addNextStep(startTextingStep);
	startTextingStep.addNextStep(readyToTextStep);
	GestureDetector.call(this, readyToTextStep, monitor);
}

DOUBLE_CLICK = 2;
DOUBLE_CLICK_INTERVAL = 200;

TextingGestureDetector.prototype = new GestureDetector();
TextingGestureDetector.prototype.constructor = TextingGestureDetector;

TextingGestureDetector.prototype.readyToText = function(event) {
	if (!event.targetItem.hasParent()){
		this.click++;
		var self = this;
		this.doubleClickTimerId = window.setTimeout(function(){
			self.click = 0;
		}, DOUBLE_CLICK_INTERVAL);
	} else {
		this.rewind();
	}
};

TextingGestureDetector.prototype.startTexting = function(event) {
	this.click++;
	if (this.click == DOUBLE_CLICK) {
		this.click = 0;
		window.clearTimeout(this.doubleClickTimerId);
		this.eventBus.publish(new Event(Event.Page.START_TEXTING, { position: new Point(event.offsetX, event.offsetY) }));
		this.inform(this);
	}
};

return TextingGestureDetector;

});