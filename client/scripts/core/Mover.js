define('Mover', ['EventHandleable', 'Point', 'MoverEventHandler', 'Context'], function(EventHandleable, Point, MoverEventHandler, Context){


function Mover(context){
	this.context = context;
}

Mover.prototype = new EventHandleable(new MoverEventHandler());
Mover.prototype.constructor = Mover;

Mover.prototype.getContext = function(){
	return this.context;
};

Mover.prototype.startMoving = function(item) {
	this.context.setMode(Context.MODE.MOVING);

	this.context.addDraftItem(item);	
	this.context.removeItem(item);
	this.movingItem = item;
	this.movingItem.isMoving = true;
	return this.movingItem;
};

Mover.prototype.finishMoving = function() {
	this.context.setMode(Context.MODE.IDLE);

	if (this.rubbishBin && this.rubbishBin.isOpen) {
		this.context.removeItem(this.movingItem);
		this.context.clearDraftItems();
		this.rubbishBin.close();
	} else {
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
};

Mover.prototype.setRubbishBin = function(rubbishBin){
	this.rubbishBin = rubbishBin;
};

return Mover;


});