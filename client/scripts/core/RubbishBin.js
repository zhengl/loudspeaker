define('RubbishBin', ['Event'], function(Event){


function RubbishBin(leftTop, rightBottom){
	this.leftTop = leftTop;
	this.rightBottom = rightBottom;
}

RubbishBin.prototype.isInside = function(point) {
	return point.x > this.leftTop.x && point.x < this.rightBottom.x
	&& point.y > this.leftTop.y && point.y < this.rightBottom.y
};

RubbishBin.prototype.open = function() {
	this.isOpen = true;
};

RubbishBin.prototype.close = function() {
	this.isOpen = false;
};

RubbishBin.prototype.setEventBus = function(eventBus) {
	this.eventBus = eventBus;
};

RubbishBin.prototype.registerEventBus = function(eventBus) {
	eventBus.addListener(this);
};

RubbishBin.prototype.notify = function(event){
	if ((event.name == Event.Page.FINISH_MOVING || event.name == Event.Page.MOVE_TO) && this.isInside(event.data[0])) {
		this.open();
	} else {
		this.close();
	}
};

return RubbishBin;

});