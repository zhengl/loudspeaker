define('RemovalZone', function(){


function RemovalZone(leftTop, rightBottom){
	this.leftTop = leftTop;
	this.rightBottom = rightBottom;
}

RemovalZone.prototype.covers = function(point) {
	return point.x > this.leftTop.x && point.x < this.rightBottom.x
	&& point.y > this.leftTop.y && point.y < this.rightBottom.y
};

return RemovalZone;

});