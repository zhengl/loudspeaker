define('KineticMouseEventOnContextInterpreter', ['KineticEvent', 'Point', 'MousePositionHelper'], function(Event, Point, MousePositionHelper){


function KineticMouseEventOnContextInterpreter(context){
	this.target = context;
	this.previousEvent = Event.Kinetic.MOUSE_UP;
	this.click = 0;
}

KineticMouseEventOnContextInterpreter.defaultDoubleClickTimeout = 200;
KineticMouseEventOnContextInterpreter.defaultLongPressTimeout = 1000;

KineticMouseEventOnContextInterpreter.prototype.interpret = function(event, eventBus){
	var handlerName = KineticMouseEventOnContextInterpreter.getHandlerName(event.type);
	if(typeof this[handlerName] == 'function') {
		this[handlerName](event, eventBus);
	}
	this.previousEvent = event;
};


KineticMouseEventOnContextInterpreter.getHandlerName = function(eventType) {
	return 'handle_' + eventType;
};

KineticMouseEventOnContextInterpreter.addHandle = function(eventType, callback) {
	this.prototype[KineticMouseEventOnContextInterpreter.getHandlerName(eventType)] = callback;
};

KineticMouseEventOnContextInterpreter.addHandle(Event.Kinetic.MOVE_TO, function(event, eventBus){
	var offset = MousePositionHelper.getOffset(event);
	this.stopLongPressTimer();
	if(this.previousEvent.type == Event.Kinetic.MOUSE_DOWN && ! this.target.isTexting()) {
		this.moveUpEventCatcher();
		eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(offset.x, offset.y)]));
	} else if (this.target.isPainting()) {
		eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(offset.x, offset.y)]));
	} else if (this.target.isMoving()) {
		this.moveUpEventCatcher();
		eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(offset.x, offset.y)]));
	}
});

KineticMouseEventOnContextInterpreter.addHandle(Event.Kinetic.MOUSE_DOWN, function(event, eventBus){
	this.detectClickType(event, eventBus);
});

KineticMouseEventOnContextInterpreter.addHandle(Event.Kinetic.MOUSE_UP, function(event, eventBus){
	var offset = MousePositionHelper.getOffset(event);
	this.stopLongPressTimer();
	if (this.target.isPainting()) {
		this.moveDownEventCatcher();
		eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(offset.x, offset.y)]));
	} else if (this.target.isMoving()){
		this.moveDownEventCatcher();
		eventBus.publish(new Event(Event.Page.FINISH_MOVING, [new Point(offset.x, offset.y)]));
	}
});

KineticMouseEventOnContextInterpreter.prototype.detectClickType = function(event, eventBus){
	this.click++;
	var self = this;
	window.setTimeout(function(){
		if(self.click == 1) {
			self.startLongPressTimer(event, eventBus);
		} else if (self.click == 2) {
			var offset = MousePositionHelper.getOffset(event);
			eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(offset.x, offset.y)]));		
		}
		self.click = 0;
	}, KineticMouseEventOnContextInterpreter.defaultDoubleClickTimeout);
};

KineticMouseEventOnContextInterpreter.prototype.startLongPressTimer = function(event, eventBus){
	this.longPressTimer = window.setTimeout(function(){
		eventBus.publish(new Event(Event.Page.START_SELECTING_COLOR, [new Point(event.pageX, event.pageY)]));		
	}, KineticMouseEventOnContextInterpreter.defaultLongPressTimeout);
	console.log(this.longPressTimer)
};

KineticMouseEventOnContextInterpreter.prototype.stopLongPressTimer = function(){
	console.log(this.longPressTimer)
	if (undefined != this.longPressTimer) {
		window.clearTimeout(this.longPressTimer);
	}
};

KineticMouseEventOnContextInterpreter.prototype.moveUpEventCatcher = function(){
	if(undefined != this.eventCatcher) {
		this.target.eventCatcher.moveToTop();
	}
};

KineticMouseEventOnContextInterpreter.prototype.moveDownEventCatcher = function(){
	if(undefined != this.eventCatcher) {
		this.target.eventCatcher.moveToBottom();
	}
};

return KineticMouseEventOnContextInterpreter;


});