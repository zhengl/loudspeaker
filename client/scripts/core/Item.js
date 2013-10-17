define('Item', function(){


function Item(){
	this.isSelected = false;
}

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

Item.prototype.remove = function() {
	if(this.parent) {
		this.parent.removeItem(this);
	}
};

Item.prototype.setParent = function(parent) {
	this.parent = parent;
};

Item.prototype.getParent = function() {
	return this.parent;
};

return Item;

	
});