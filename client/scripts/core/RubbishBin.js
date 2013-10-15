define('RubbishBin', ['EventHandleable', 'RubbishBinEventHandler'], function(EventHandleable, RubbishBinEventHandler){


function RubbishBin(leftTop, rightBottom){
	this.leftTop = leftTop;
	this.rightBottom = rightBottom;
}

RubbishBin.prototype = new EventHandleable(new RubbishBinEventHandler());
RubbishBin.prototype.constructor = RubbishBin;

RubbishBin.prototype.isInside = function(point) {
	return point.x > this.leftTop.x && point.x < this.rightBottom.x &&
	point.y > this.leftTop.y && point.y < this.rightBottom.y;
};

RubbishBin.prototype.open = function() {
	this.isOpen = true;
};

RubbishBin.prototype.close = function() {
	this.isOpen = false;
};

return RubbishBin;

});