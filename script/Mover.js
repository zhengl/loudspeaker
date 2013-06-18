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
	var newX = point.x - (item.getPosition().x - item.relativePosition.x);
	var newY = point.y - (item.getPosition().y - item.relativePosition.y);
	this.context.moveTo(item, new Point(newX, newY));
};