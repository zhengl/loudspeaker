define('Mover', ['EventHandleable', 'Point', 'MoverEventHandler', 'Context'], function(EventHandleable, Point, MoverEventHandler, Context){


function Mover(context){
	this.context = context;
}

Mover.prototype = new EventHandleable(new MoverEventHandler());
Mover.prototype.constructor = Mover;

Mover.prototype.getContext = function(){
	return this.context;
};

Mover.prototype.setMovables = function(movables) {
	this.movables = movables;
};

Mover.prototype.startMoving = function(item, relativePosition) {
	if(this.isInMovables(item)) {
		item.relativePosition = relativePosition;
		this.context.removeItem(item);
		this.context.addDraftItem(item);
		this.movingItem = item;
	}
};

Mover.prototype.moveTo = function(point){
	if(undefined !== this.movingItem) {
		var item = this.movingItem;
		var newX = point.x - (item.relativePosition ? item.relativePosition.x : 0);
		var newY = point.y - (item.relativePosition ? item.relativePosition.y : 0);
		var newPosition = new Point(newX, newY);

		item.moveTo(newPosition);
	}
};

Mover.prototype.finishMoving = function() {
	if(undefined !== this.movingItem) {
		if (this.rubbishBin && this.rubbishBin.isOpen) {
			this.context.removeItem(this.movingItem);
			this.rubbishBin.close();
		} else {
			this.context.addItem(this.movingItem);
		}
			
		this.context.clearDraftItems();
		delete this.movingItem;
	}
};

Mover.prototype.isInMovables = function(item) {
	if (undefined === this.movables) {
		return true;
	}

	for(var i = 0; i < this.movables.length; i++) {
		if (item instanceof this.movables[i]) {
			return true;
		}
	}
	return false;
};

Mover.prototype.setRubbishBin = function(rubbishBin){
	this.rubbishBin = rubbishBin;
};

Mover.prototype.getRubbishBin = function(){
	return this.rubbishBin;
};

return Mover;


});