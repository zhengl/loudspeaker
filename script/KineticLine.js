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
		KineticEvent.MOUSE_OVER,
		KineticEvent.MOUSE_ENTER,
		KineticEvent.MOVE_TO,
		KineticEvent.MOUSE_DOWN,
		KineticEvent.MOUSE_UP,
		KineticEvent.MOUSE_OUT,
		KineticEvent.MOUSE_LEAVE,
	]);
};

KineticLine.prototype.addEventListeners = function(events){
	var self = this;
	for(var index in events){
		var eventType = events[index];
		(function(eventType){
			self.getKineticShape().on(eventType, function(event) {
				event.preventDefault();
				var translatedEvent = document.createEvent('MouseEvents');
				translatedEvent.initMouseEvent(eventType, false, event.cancelable, event.view, 
                     event.detail, event.screenX, event.screenY, event.clientX, event.clientY, 
                     event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
                     event.button, event.relatedTarget);
				translatedEvent.cancelBubble = true;
				self.getInputEventTrigger().trigger(translatedEvent);
			});					
		})(eventType);
	}
};
