define('KineticMouseEventOnItemInterpreter', ['KineticEvent', 'Point'], function(Event, Point){


function KineticMouseEventOnItemInterpreter(item){
	this.target = item;
}

KineticMouseEventOnItemInterpreter.prototype.interpret = function(event, eventBus){
	var handlerName = KineticMouseEventOnItemInterpreter.getHandlerName(event.type);
	if(typeof this[handlerName] == 'function') {
		this[handlerName](event, eventBus);
	}
};

KineticMouseEventOnItemInterpreter.getHandlerName = function(eventType) {
	return 'handle_' + eventType;
};

KineticMouseEventOnItemInterpreter.addHandle = function(eventType, callback) {
	this.prototype[KineticMouseEventOnItemInterpreter.getHandlerName(eventType)] = callback;
};

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOVE_TO, function(event, eventBus){
	if(this.target.isMoving) {
		eventBus.publish(new Event(Event.Item.MOVE_TO, [this.target, new Point(event.offsetX, event.offsetY)]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_DOWN, function(event, eventBus){
	if(this.target.isSelected) {
		var mousePosition = this.target.getKineticShape().getStage().getMousePosition();
		var currentPosition = this.target.getPosition();

		var relativeX = mousePosition.x - currentPosition.x;
		var relativeY = mousePosition.y - currentPosition.y;
		eventBus.publish(new Event(Event.Item.START_MOVING, [this.target, new Point(relativeX, relativeY)]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_UP, function(event, eventBus){
	if(this.target.isMoving) {
		eventBus.publish(new Event(Event.Item.FINISH_MOVING, [this.target]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_ENTER, function(event, eventBus){
	eventBus.publish(new Event(Event.Item.SELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_LEAVE, function(event, eventBus){
	eventBus.publish(new Event(Event.Item.UNSELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_OVER, function(event, eventBus){
	eventBus.publish(new Event(Event.Item.SELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(Event.Kinetic.MOUSE_OUT, function(event, eventBus){
	eventBus.publish(new Event(Event.Item.UNSELECT, [this.target]));
});

return KineticMouseEventOnItemInterpreter;


});