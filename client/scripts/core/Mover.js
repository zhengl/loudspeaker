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
	if (this.removalZone && this.removalZone.covers(this.movingItem.getPosition())) {
		this.context.removeItem(this.movingItem);
	} else {
		this.movingItem.undraftize();
		this.context.addItem(this.movingItem);
		this.context.clearDraftItems();
		this.movingItem.isMoving = false;
	}

	return this.movingItem;
};

Mover.prototype.moveTo = function(point){
	var item = this.movingItem;
	var newX = point.x - (item.relativePosition ? item.relativePosition.x : 0);
	var newY = point.y - (item.relativePosition ? item.relativePosition.y : 0);
	var newPosition = new Point(newX, newY);

	item.moveTo(newPosition);
	this.context.refreshDraftItems();
};

Mover.prototype.setRemovalZone = function(removalZone){
	this.removalZone = removalZone;
};

return Mover;


});