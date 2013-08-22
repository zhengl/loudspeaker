define('Line', ['Item', 'Point'], function(Item, Point){


function Line(points, color){
	if (undefined == points) {
		points = new Array();
	}
	this.points = points;
	this.color = color;
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

Line.prototype.setColor = function(color) {
	this.color = color;
};

Line.prototype.getColor = function() {
	return this.color;
};

Line.prototype.getPoints = function(){
	return this.points;
};

Line.prototype.serialize = function() {
	return {
		uuid: this.getUUID(),
		type: "line",
		color: this.color,
		points: this.points,
		position: this.position,
	};
};

Line.unserialize = function(json){
	var line = new Line(json.points, json.color);
	line.setUUID(json.uuid);
	line.setPosition(json.position);
	return line;
};

return Line;


});