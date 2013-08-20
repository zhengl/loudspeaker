define('Mover', ['Point'], function(Point){


function Mover(context){
	this.context = context;
}

Mover.prototype.startMoving = function(item) {
	this.isMoving = true;

	item.draftize();
	this.context.addDraftItem(item);
	this.context.removeItem(item);
	this.movingItem = item;
	this.movingItem.isMoving = true;
	return this.movingItem;
};

Mover.prototype.finishMoving = function() {
	this.isMoving = false;

	this.movingItem.undraftize();
	this.context.addItem(this.movingItem);
	this.context.clearDraftItems();
	this.movingItem.isMoving = false;
	return this.movingItem;
};

Mover.prototype.moveTo = function(point){
	var item = this.movingItem;
	var newX = point.x - item.relativePosition.x;
	var newY = point.y - item.relativePosition.y;

	item.moveTo(new Point(newX, newY));
	this.context.refreshDraftItems();
};

return Mover;


});