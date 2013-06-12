function EventChannel(inputEventTrigger, outputEventTrigger){
	this.inputEventTrigger = inputEventTrigger;
	this.outputEventTrigger = outputEventTrigger;
}

EventChannel.prototype.setOutputEventTrigger = function(outputEventTrigger){
	this.outputEventTrigger = outputEventTrigger;
};

EventChannel.prototype.getOutputEventTrigger = function(){
	return this.outputEventTrigger;
};

EventChannel.prototype.setInputEventTrigger = function(inputEventTrigger){
	this.inputEventTrigger = inputEventTrigger;
};

EventChannel.prototype.getInputEventTrigger = function(){
	return this.inputEventTrigger;
};