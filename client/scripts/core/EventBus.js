define('EventBus', function(){


function EventBus(){
	this.listeners = new Array();
}

EventBus.prototype.addListener = function(listener){
	this.listeners.push(listener);
};

EventBus.prototype.removeListener = function(listener){
	var resultListeners = new Array();
	for(var i = 0; i < this.listeners.length; i++){
		if(listener != this.listeners[i]) {
			resultListeners.push(this.listeners[i]);
		}
	}
	this.listeners = resultListeners;
};

EventBus.prototype.publish = function(event){
	if (!event){
		return;
	}
	console.log(event);
	for (var index in this.listeners) {
		this.listeners[index].notify(event);
	}
}

return EventBus;

	
});