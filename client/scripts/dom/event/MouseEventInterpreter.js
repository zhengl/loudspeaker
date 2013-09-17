define('MouseEventInterpreter', ['PaintingGestureDetector', 'TextingGestureDetector', 'PaletteGestureDetector', 'SelectingGestureDetector', 'MovingGestureDetector'], function(PaintingGestureDetector, TextingGestureDetector, PaletteGestureDetector, SelectingGestureDetector, MovingGestureDetector){


function MouseEvextInterpreter(eventBus){
	this.eventBus = eventBus;

	this.detectors = [
		new PaletteGestureDetector(eventBus, this),
		new PaintingGestureDetector(eventBus, this),
		new TextingGestureDetector(eventBus, this),
		new SelectingGestureDetector(eventBus, this),
		new MovingGestureDetector(eventBus, this)
	];

}

MouseEvextInterpreter.prototype.interpret = function(event){
	for (var i = 0; i < this.detectors.length; i++) {
		this.detectors[i].detect(event);
	}
};

MouseEvextInterpreter.prototype.inform = function(detector) {
	for (var i = 0; i < this.detectors.length; i++) {
		if (detector !== this.detectors[i]) {
			this.detectors[i].rewind();
		}
	}
};

return MouseEvextInterpreter;


});