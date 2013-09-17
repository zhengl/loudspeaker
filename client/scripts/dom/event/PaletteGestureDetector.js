define('PaletteGestureDetector', ['GestureDetector', 'GestureStep', 'Event', 'Point'], function(GestureDetector, GestureStep, Event, Point){


function PaletteGestureDetector(eventBus, monitor){
	this.eventBus = eventBus;
	this.longPressTimerIds;

	var startShowingPaletteStep = new GestureStep(Event.Kinetic.MOUSE_DOWN, this.startShowingPalette);
	var stopShowingPaletteStep = new GestureStep(Event.Kinetic.MOUSE_UP, this.stopShowingPalette);

	startShowingPaletteStep.addNextStep(stopShowingPaletteStep);
	stopShowingPaletteStep.addNextStep(startShowingPaletteStep);
	GestureDetector.call(this, startShowingPaletteStep, monitor);
}

LONG_PRESS_INTERVAL = 1000;

PaletteGestureDetector.prototype = new GestureDetector();
PaletteGestureDetector.prototype.constructor = PaletteGestureDetector;

PaletteGestureDetector.prototype.startShowingPalette = function(event) {
	if(undefined == event.targetItem) {		
		var self = this;
		this.longPressTimerId = window.setTimeout(function(){
			self.eventBus.publish(new Event(Event.Page.START_SELECTING_COLOR, { position: new Point(event.pageX, event.pageY) }));
			self.inform(this);
		}, LONG_PRESS_INTERVAL);
	} else {
		this.rewind();
	}
};

PaletteGestureDetector.prototype.stopShowingPalette = function(event) {
	this.rewind();
};

PaletteGestureDetector.prototype.rewind = function() {
	this.currentCandidateSteps = this.rootSteps;
	if (this.longPressTimerId) {
		window.clearTimeout(this.longPressTimerId);
	}
};

return PaletteGestureDetector;

});