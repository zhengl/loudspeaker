function Mover(context){
	this.context = context;
}

Mover.prototype.startMoving = function(item) {
	this.context.startMoving(item);
};

Mover.prototype.finishMoving = function(item) {
	this.context.finishMoving(item);
};