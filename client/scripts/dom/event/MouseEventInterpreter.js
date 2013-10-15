define('MouseEventInterpreter', function(){


function MouseEvextInterpreter(eventPreprocessor){
	this.eventPreprocessor = eventPreprocessor;
	this.detectors = [];
}

MouseEvextInterpreter.prototype.addDetector = function(detector) {
	this.detectors.push(detector);
};

MouseEvextInterpreter.prototype.removeDetector = function(detectorClass) {
	for(var i = 0; i < this.detectors.length; i++) {
		if(this.detectors[i] instanceof detectorClass) {
			this.detectors.splice(i, 1);
			break;
		}
	}
};

MouseEvextInterpreter.prototype.interpret = function(event){
	var targetEvent = event;

	if (undefined != this.eventPreprocessor) {
		targetEvent = this.eventPreprocessor.process(event)
	}

	for (var i = 0; i < this.detectors.length; i++) {
		this.detectors[i].detect(targetEvent);
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