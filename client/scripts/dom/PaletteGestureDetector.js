define('PaletteGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function PaletteGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.longPressTimerId;

	var startShowPaletteStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startShowPalette);

	startShowPaletteStep.addNextStep(startShowPaletteStep);
	GestureDetector.call(this, startShowPaletteStep, monitor);
}

LONG_PRESS_INTERVAL = 1000;

PaletteGestureDetector.prototype = new GestureDetector();
PaletteGestureDetector.prototype.constructor = PaletteGestureDetector;

PaletteGestureDetector.prototype.startShowPalette = function(event) {
	var self = this;
	this.longPressTimerId = window.setTimeout(function(){
		self.eventBus.publish(new Event(Event.Page.START_SELECTING_COLOR, [new Point(event.pageX, event.pageY)]));
		self.inform(this);
	}, LONG_PRESS_INTERVAL);
};

PaletteGestureDetector.prototype.rewind = function() {
	this.currentCandidateSteps = this.rootSteps;

	if (this.longPressTimerId) {
		window.clearTimeout(this.longPressTimerId);
	}
};

return PaletteGestureDetector;

});