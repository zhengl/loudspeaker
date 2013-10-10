define('EventBridge', function(){

function EventBridge(){

}

EventBridge.prototype.bridge = function(from, to) {
	this.from = from;
	this.to = to;

	this.from.addListener(this);
};

EventBridge.prototype.setFilter = function(filter) {
	this.filter = filter;
};

EventBridge.prototype.notify = function(event) {
	if(undefined == this.filter) {
		this.to.publish(event);
	} else if (this.filter.accept(event)) {
		this.to.publish(event);
	}
};


return EventBridge;

});