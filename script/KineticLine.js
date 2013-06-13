function KineticLine(points, stroke){
	Line.call(this, points);
	
	this.setStroke(stroke || KineticLine.defaultStroke);
		
	this.kineticShape = new Kinetic.Line({
		points: KineticLine.flatternPoints(points),
		strokeWidth: KineticLine.defaultStrokeWidth,
		stroke: this.getStroke(),
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

KineticLine.prototype.setStroke = function(stroke){
	this.stroke = stroke;
};

KineticLine.prototype.getStroke = function(){
	return this.stroke;
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
	this.getKineticShape().setStroke(this.getStroke());
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

KineticLine.prototype.registerEventTrigger = function(){
	this.addEventListeners([
		KineticEvent.MOVE_TO,
		KineticEvent.MOUSE_DOWN,
		KineticEvent.MOUSE_UP,
		KineticEvent.MOUSE_ENTER,
		KineticEvent.MOUSE_LEAVE,
		KineticEvent.MOUSE_OVER,
		KineticEvent.MOUSE_OUT
	]);
}

KineticLine.prototype.addEventListeners = function(events){
	for(var index in events){
		var self = this;
		this.getKineticShape().on(events[index], function(event) {
			self.getInputEventTrigger().trigger(event);
			event.cancelBubble = true;
		});		
	}
};
