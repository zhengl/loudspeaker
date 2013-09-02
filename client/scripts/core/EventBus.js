define('EventBus', function(){


function EventBus(){
	this.listeners = new Array();
}

EventBus.prototype.addListener = function(listener){
	this.listeners.push(listener);
};

EventBus.prototype.publish = function(event, data){
	if (!event){
		return;
	}
	console.log(event);
	for (var index in this.listeners) {
		this.listeners[index].notify(event, data);
	}
}

return EventBus;

	
});