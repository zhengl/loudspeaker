define('KineticMouseEventOnPageInterpreter', ['KineticEvent', 'Point'], function(Event, Point){


function KineticMouseEventOnPageInterpreter(page){
	this.target = page;
	this.previousEvent = Event.Kinetic.MOUSE_UP;
	this.click = 0;
}

KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout = 200;
KineticMouseEventOnPageInterpreter.defaultLongPressTimeout = 1000;

KineticMouseEventOnPageInterpreter.prototype.interpret = function(event, eventBus){
	var handlerName = KineticMouseEventOnPageInterpreter.getHandlerName(event.type);
	if(typeof this[handlerName] == 'function') {
		this[handlerName](event, eventBus);
	}
	this.previousEvent = event;
};


KineticMouseEventOnPageInterpreter.getHandlerName = function(eventType) {
	return 'handle_' + eventType;
};

KineticMouseEventOnPageInterpreter.addHandle = function(eventType, callback) {
	this.prototype[KineticMouseEventOnPageInterpreter.getHandlerName(eventType)] = callback;
};

KineticMouseEventOnPageInterpreter.addHandle(Event.Kinetic.MOVE_TO, function(event, eventBus){
	this.stopLongPressTimer();
	if(this.previousEvent.type == Event.Kinetic.MOUSE_DOWN && !this.target.getTexter().isTexting) {
		this.moveUpEventCatcher();
		eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getPainter().isPainting) {
		eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getMover().isMoving) {
		this.moveUpEventCatcher();
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(event.offsetX, event.offsetY)]));
	}
});

KineticMouseEventOnPageInterpreter.addHandle(Event.Kinetic.MOUSE_DOWN, function(event, eventBus){
	this.detectClickType(event, eventBus);
});

KineticMouseEventOnPageInterpreter.addHandle(Event.Kinetic.MOUSE_UP, function(event, eventBus){
	this.stopLongPressTimer();
	if (this.target.getPainter().isPainting) {
		this.moveDownEventCatcher();
		eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getMover().isMoving){
		this.moveDownEventCatcher();
		eventBus.publish(new Event(Event.Page.FINISH_MOVING, [new Point(event.offsetX, event.offsetY)]));
	}
});

KineticMouseEventOnPageInterpreter.prototype.detectClickType = function(event, eventBus){
	this.click++;
	var self = this;
	window.setTimeout(function(){
		if(self.click == 1) {
			self.startLongPressTimer(event, eventBus);
		} else if (self.click == 2) {
			eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(event.offsetX, event.offsetY)]));		
		}
		self.click = 0;
	}, KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.startLongPressTimer = function(event, eventBus){
	this.longPressTimer = window.setTimeout(function(){
		eventBus.publish(new Event(Event.Page.START_SELECTING_COLOR, [new Point(event.offsetX, event.offsetY)]));		
	}, KineticMouseEventOnPageInterpreter.defaultLongPressTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.stopLongPressTimer = function(){
	if (undefined != this.longPressTimer) {
		window.clearTimeout(this.longPressTimer);
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveUpEventCatcher = function(){
	if(undefined != this.target.getPainter().context.eventCatcher) {
		this.target.getPainter().context.eventCatcher.moveToTop();
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveDownEventCatcher = function(){
	if(undefined != this.target.getPainter().context.eventCatcher) {
		this.target.getPainter().context.eventCatcher.moveToBottom();
	}
};

return KineticMouseEventOnPageInterpreter;


});