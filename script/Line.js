function Line(points){
	if (undefined == points) {
		points = new Array();
	}
	this.points = points;
}

Line.prototype = new Item();
Line.prototype.constructor = Line;

Line.prototype.getPosition = function(){
	if (undefined == this.position) {
		var minX = this.points[0].x;
		var minY = this.points[0].y;
		
		for(var index in this.points) {
			minX = this.points[index].x < minX ? this.points[index].x : minX;
			minY = this.points[index].y < minY ? this.points[index].y : minY;
		}
		
		this.position = new Point(minX, minY);
	}
	
	return this.position;
};

Line.prototype.draftize = function(){
	return this;
};

Line.prototype.undraftize = function(){
	return this;
};

Line.prototype.update = function(point){
	this.points.push(point);
};
