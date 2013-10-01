define('MouseEventInterpreter', function(){


function MouseEvextInterpreter(eventBus, detectors, eventPreprocessor){
	this.eventBus = eventBus;
	this.eventPreprocessor = eventPreprocessor;

	this.setDetectors(eventBus, detectors);
}

MouseEvextInterpreter.prototype.setDetectors = function(eventBus, detectors) {
	this.detectors = [];
	for (var i = 0; i < detectors.length; i++) {
		this.detectors.push(new detectors[i](eventBus, this));
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