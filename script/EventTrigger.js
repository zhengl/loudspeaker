function EventTrigger(){
	this.listeners = new Array();
}

EventTrigger.prototype.triggerEvent = function(event, data){
	if(undefined == event) {
		return;
	}
	
	for(index in this.listeners) {
		this.listeners[index].notify(event, data);
	}
};

EventTrigger.prototype.addListener = function(listener){
	this.listeners.push(listener);
};