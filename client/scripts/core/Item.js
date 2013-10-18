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
};

Item.prototype.addTo = function(context) {
	context.getItems().push(this);
	this.setParent(context);
};

Item.prototype.addDraftTo = function(context) {
	context.getDraftItems().push(this);
	this.setParent(context);
};

Item.prototype.setParent = function(parent) {
	this.parent = parent;
};

Item.prototype.getParent = function() {
	return this.parent;
};

return Item;

	
});