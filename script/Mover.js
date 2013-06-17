function Mover(context){
	this.context = context;
}

Mover.prototype.startMoving = function(item) {
	this.isMoving = true;
	this.movingItem = item;
	this.context.startMoving(item);
};

Mover.prototype.finishMoving = function(item) {
	this.isMoving = false;
	this.context.finishMoving(this.movingItem);
};

Mover.prototype.moveTo = function(point){
	var item = this.movingItem;
	item.moveTo(new Point(point.x - item.relativePosition.x, point.y - item.relativePosition.y));
};