function KineticLine(points){
	Line.call(this, points);
}

KineticLine.prototype = new Line();
KineticLine.prototype.constructor = KineticLine;

KineticLine.prototype.getKineticShape= function(){
	var points = new Array();
	for(var index in this.points){
		points.push(this.points[index].x);
		points.push(this.points[index].y);
	}
	return new Kinetic.Line({
		points: points,
	});
};

KineticLine.prototype.draftize = function(){
	this.getKineticShapte().setStroke('gray');
	return this.getKineticShapte();
};

KineticLine.prototype.undraftize = function(){
	this.getKineticShapte().setStroke('red');
	return this.getKineticShapte();
};