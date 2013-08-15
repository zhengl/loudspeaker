define('Item', ['ItemEventHandler'], function(ItemEventHandler){


function Item(){
	this.isSelected = false;

	this.handler = new ItemEventHandler();
}

Item.prototype.notify = function(event){
	if(typeof this.handler.handle[event.name] == 'function' && event.data[0] === this) {
		this.handler.handle[event.name](this, event);
	}
};

Item.prototype.getEventBus = function(){
	return this.eventBus;
};

Item.prototype.registerEventBus = function(eventBus){
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};

Item.prototype.getPosition = function(){
	return this.position;
};

Item.prototype.setPosition = function(point){
	this.position = point;
};

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
};

Item.prototype.select = function(){
	this.isSelected = true;
};

Item.prototype.unselect = function(){
	this.isSelected = false;
};

return Item;

	
});