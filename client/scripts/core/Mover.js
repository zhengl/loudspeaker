define('Mover', ['EventHandleable', 'Point', 'MoverEventHandler', 'Context'], function(EventHandleable, Point, MoverEventHandler, Context){


function Mover(context){
	this.context = context;
}

Mover.prototype = new EventHandleable(new MoverEventHandler());
Mover.prototype.constructor = Mover;

Mover.prototype.getContext = function(){
	return this.context;
};

Mover.prototype.startMoving = function(item, relativePosition) {
	item.relativePosition = relativePosition;
	this.context.removeItem(item);
	this.context.addDraftItem(item);
	this.movingItem = item;
};

Mover.prototype.finishMoving = function() {
	if (this.rubbishBin && this.rubbishBin.isOpen) {
		this.movingItem.remove();
		this.rubbishBin.close();
	} else {
		this.context.addItem(this.movingItem);
	}
		
	this.context.clearDraftItems();
	delete this.movingItem.relativePosition;
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