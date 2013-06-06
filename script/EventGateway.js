function EventGateway(interpreter){
}

EventGateway.prototype.trigger = function(target, rawEvent, data){
	var interpretedEvent = interpreter.translate(rawEvent);
	target.notify(interpretedEvent, data);
};