function EventTrigger(){
	this.listeners = new Array();
}

EventTrigger.prototype.addListener = function(listener){
	this.listeners.push(listener);
}

EventTrigger.prototype.trigger = function(event, data){
	if (undefined == event){
		return;
	}
	
	for (var index in this.listeners) {
		this.listeners[index].notify(event, data);
	}
}