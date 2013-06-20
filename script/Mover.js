function Mover(context){
	this.context = context;
}

Mover.prototype.startMoving = function(item) {
	this.isMoving = true;
	this.movingItem = this.context.startMoving(item);
	this.movingItem.isMoving = true;
};

Mover.prototype.finishMoving = function(item) {
	this.isMoving = false;
	this.movingItem = this.context.finishMoving(this.movingItem);
	this.movingItem.isMoving = false;
};

Mover.prototype.moveTo = function(point){
	var item = this.movingItem;
	var newX = point.x - item.relativePosition.x;
	var newY = point.y - item.relativePosition.y;
	this.context.moveTo(item, new Point(newX, newY));
};