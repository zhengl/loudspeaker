define('TextingGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function TextingGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.click = 0;
	this.doubleClickTimerId;

	var readyToTextStep1 = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.readyToText1);
	var readyToTextStep2 = new GestureStep(Event.Kinetic.MOVE_TO, this.readyToText2);
	var startTextingStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startTexting);

	readyToTextStep1.addNextStep(readyToTextStep2);
	readyToTextStep2.addNextStep(startTextingStep);
	startTextingStep.addNextStep(readyToTextStep1);
	GestureDetector.call(this, readyToTextStep1, monitor);
}

DOUBLE_CLICK = 2;
DOUBLE_CLICK_INTERVAL = 200;

TextingGestureDetector.prototype = new GestureDetector();
TextingGestureDetector.prototype.constructor = TextingGestureDetector;

TextingGestureDetector.prototype.readyToText1 = function(event) {
	this.click++;
	var self = this;
	this.doubleClickTimerId = window.setTimeout(function(){
		self.click = 0;
	}, DOUBLE_CLICK_INTERVAL);
};

TextingGestureDetector.prototype.readyToText2 = function(event) {
};

TextingGestureDetector.prototype.startTexting = function(event) {
	this.click++;
	if (this.click == DOUBLE_CLICK) {
		this.click = 0;
		window.clearTimeout(this.doubleClickTimerId);
		this.eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(event.offsetX, event.offsetY)]));
		this.inform(this);
	}
};

return TextingGestureDetector;

});