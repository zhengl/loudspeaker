define('MouseEventOnContextInterpreter', ['PaintingGestureDetector', 'TextingGestureDetector', 'PaletteGestureDetector'], function(PaintingGestureDetector, TextingGestureDetector, PaletteGestureDetector){


function MouseEventOnContextInterpreter(eventBus){
	this.eventBus = eventBus;

	this.detectors = [
		new PaintingGestureDetector(eventBus, this),
		new TextingGestureDetector(eventBus, this),
		new PaletteGestureDetector(eventBus, this)
	];

}

MouseEventOnContextInterpreter.prototype.interpret = function(event){
	for (var i = 0; i < this.detectors.length; i++) {
		this.detectors[i].detect(event);
	}
};

MouseEventOnContextInterpreter.prototype.inform = function(detector) {
	for (var i = 0; i < this.detectors.length; i++) {
		if (detector !== this.detectors[i]) {
			this.detectors[i].rewind();
		}
	}
};

return MouseEventOnContextInterpreter;


});