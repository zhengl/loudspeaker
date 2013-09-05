define('EventHandleable', function(){


function EventHandleable(handler){
	this.handler = handler;
}

EventHandleable.prototype.notify = function(event){
	if(typeof this.handler.handle[event.name] == 'function') {
		this.handler.handle[event.name](this, event);
	}
};

EventHandleable.prototype.setEventBus = function(eventBus){
	this.eventBus = eventBus;
};

EventHandleable.prototype.getEventBus = function(){
	return this.eventBus;
};

EventHandleable.prototype.setEventHandler = function(handler){
	this.handler = handler;
};

EventHandleable.prototype.getEventHandler = function(){
	return this.handler;
};

EventHandleable.prototype.enableEventHandling = function(eventBus){
	this.setEventHandler(this.getEventHandler());
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};

EventHandleable.prototype.disableEventHandling = function(){
	this.setEventHandler(null);
	this.eventBus.removeListener(this);
	this.eventBus = null;
};

return EventHandleable;

});