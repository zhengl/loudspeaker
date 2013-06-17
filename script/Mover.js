function Mover(context){
	this.context = context;
}

Mover.prototype.startMoving = function(item) {
	this.isMoving = true;
	this.context.startMoving(item);
};

Mover.prototype.finishMoving = function(item) {
	this.isMoving = false;
	this.context.finishMoving(this.movingItem);
};

Mover.prototype.moveTo = function(point){
	var item = this.movingItem;
	this.context.finishMoving(item);
};