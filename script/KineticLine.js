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
	var minX = this.points[0].x;
	var minY = this.points[0].y;
	
	for(var index in this.points) {
		minX = this.points[index].x < minX ? this.points[index].x : minX;
		minY = this.points[index].y < minY ? this.points[index].y : minY;
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

KineticLine.prototype.setColor = function(color){
	console.log(color)
	this.color = color;
};

KineticLine.prototype.getColor = function(){
	return this.color;
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
	this.points.push(point);
	this.getKineticShape().setPoints(KineticLine.flatternPoints(this.points));
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
