function EventLogger(){
	this.events = new Array();
}

EventLogger.prototype.notify = function(event, data) {
	this.events.push({event: event, data: data});
};