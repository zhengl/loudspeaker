define('KineticLine', ['Kinetic', 'Line', 'Point', 'KineticItemEventRegister'], function(Kinetic, Line, Point, KineticItemEventRegister){


function KineticLine(points, color){
	Line.call(this, points);
	
	this.setColor(color || KineticLine.defaultStroke);

	this.kineticShape = new Kinetic.Line({
		points: KineticLine.flatternPoints(points),
		strokeWidth: KineticLine.defaultStrokeWidth,
		stroke: this.getColor(),
		lineCap: 'round',
		lineJoin: 'bevel',
	});
}

KineticLine.defaultStroke = 'black';
KineticLine.defaultStrokeWidth = 10;

KineticLine.draftStroke = 'gray';
KineticLine.draftStrokeWidth = 10;
KineticLine.draftDashArray = [10, 15];

KineticLine.prototype = new Line();
KineticLine.prototype.constructor = KineticLine;

KineticLine.prototype.getPosition = function(){
	var points = this.getKineticShape().getPoints();
	var minX = points[0].x;
	var minY = points[0].y;
	
	for(var index in points) {
		minX = points[index].x < minX ? points[index].x : minX;
		minY = points[index].y < minY ? points[index].y : minY;
	}
	
	var relativePosition = this.getKineticShape().getPosition();
	var position = new Point(minX + relativePosition.x, minY + relativePosition.y);
	
	return position;
};

KineticLine.prototype.moveTo = function(newPosition){
	this.position = newPosition;
	var currentPosition = this.getPosition();
	var currentKineticPosition = this.getKineticShape().getPosition();
	var newX = currentKineticPosition.x + newPosition.x - currentPosition.x;
	var newY = currentKineticPosition.y + newPosition.y - currentPosition.y;
	this.getKineticShape().setPosition(newX, newY);
};

KineticLine.prototype.getKineticShape = function(){
	return this.kineticShape;
};

KineticLine.prototype.draftize = function(){
	this.getKineticShape().setStroke(KineticLine.draftStroke);
	this.getKineticShape().setDashArray(KineticLine.draftDashArray);
	this.getKineticShape().enableDashArray();
	return this;
};

KineticLine.prototype.undraftize = function(){
	this.getKineticShape().setStroke(this.getColor());
	this.getKineticShape().disableDashArray();
	return this;
};

KineticLine.prototype.update = function(point){
	var points = this.getKineticShape().getPoints();
	points.push(point);
};

KineticLine.prototype.getPoints = function(){
	return this.getKineticShape().getPoints();
};

KineticLine.flatternPoints = function(points){
	var linePoints = new Array();
	for(var index in points){
		linePoints.push(points[index].x);
		linePoints.push(points[index].y);
	}
	return linePoints;
};

KineticLine.prototype.setEventBus = function(eventBus){
	this.eventBus = eventBus;
};

KineticLine.prototype.registerEventBus = function(eventBus){
	var register = new KineticItemEventRegister();
	register.registerEventBus(eventBus, this);
};

return KineticLine;

	
});
