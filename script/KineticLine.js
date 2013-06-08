function KineticLine(points){
	Line.call(this, points);
	
	this.kineticShape = new Kinetic.Line({
		points: KineticLine.flatternPoints(points),
		stroke: 'red',
		strokeWidth: 5,
		lineCap: 'round',
		lineJoin: 'round'
	});
}

KineticLine.prototype = new Line();
KineticLine.prototype.constructor = KineticLine;

KineticLine.prototype.getKineticShape = function(){
	return this.kineticShape;
};

KineticLine.prototype.draftize = function(){
	this.getKineticShape().setStroke('gray');
	this.getKineticShape().setDashArray([10, 15]);
	this.getKineticShape().enableDashArray();
	return this;
};

KineticLine.prototype.undraftize = function(){
	this.getKineticShape().setStroke('red');
	this.getKineticShape().disableDashArray();
	return this;
};

KineticLine.prototype.update = function(point){
	this.points.push(point);
	this.getKineticShape().setPoints(KineticLine.flatternPoints(this.points));
}

KineticLine.flatternPoints = function(points){
	var linePoints = new Array();
	for(var index in points){
		linePoints.push(points[index].x);
		linePoints.push(points[index].y);
	}
	return linePoints;
}