define("EventBus", function(){


function EventBus(){
	this.listeners = [];
}

EventBus.prototype.addListener = function(listener){
	this.listeners.push(listener);
};

EventBus.prototype.removeListener = function(listener){
	for(var i = 0; i < this.listeners.length; i++){
		if(listener === this.listeners[i]) {
			this.listeners[i].splice(i, 1);
		}
	}
};

EventBus.prototype.publish = function(event){
	if (!event){
		return;
	}

	for (var index in this.listeners) {
		this.listeners[index].notify(event);
	}
};

return EventBus;

	
});