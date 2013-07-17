function KineticText(text){
	this.kineticShape = new Kinetic.Text({
		text: text,
		fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green',
	});
}

KineticText.prototype = new Text();
KineticText.prototype.constructor = KineticText;

KineticText.prototype.getKineticShape = function(){
	return this.kineticShape;
};

KineticText.prototype.moveTo = function(newPosition){
	this.position = newPosition;
	this.getKineticShape().setPosition(newPosition.x, newPosition.y);
};

KineticText.prototype.draftize = function(){
	return this;
};

KineticText.prototype.undraftize = function(){
	return this;
};

KineticText.prototype.registerEventTrigger = function(){
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

KineticText.prototype.addEventListeners = function(events){
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