define('Item', ['EventHandleable', 'ItemEventHandler'], function(EventHandleable, ItemEventHandler){


function Item(){
	this.isSelected = false;
}

Item.prototype = new EventHandleable(new ItemEventHandler());
Item.prototype.constructor = Item;

Item.prototype.getUUID = function(){
	return this.uuid;
};

Item.prototype.setUUID = function(uuid){
	this.uuid = uuid;
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