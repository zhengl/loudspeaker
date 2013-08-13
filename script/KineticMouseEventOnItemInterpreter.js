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

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOVE_TO, function(event, eventBus){
	if(this.target.isMoving) {
		eventBus.publish(new AbstractEvent(Event.Item.MOVE_TO, [this.target, new Point(event.offsetX, event.offsetY)]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_DOWN, function(event, eventBus){
	if(this.target.isSelected) {
		var mousePosition = this.target.getKineticShape().getStage().getMousePosition();
		var currentPosition = this.target.getPosition();
		var relativeX = mousePosition.x - currentPosition.x;
		var relativeY = mousePosition.y - currentPosition.y;
		eventBus.publish(new AbstractEvent(Event.Item.START_MOVING, [this.target, new Point(relativeX, relativeY)]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_UP, function(event, eventBus){
	if(this.target.isMoving) {
		eventBus.publish(new AbstractEvent(Event.Item.FINISH_MOVING, [this.target]));
	}
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_ENTER, function(event, eventBus){
	eventBus.publish(new AbstractEvent(Event.Item.SELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_LEAVE, function(event, eventBus){
	eventBus.publish(new AbstractEvent(Event.Item.UNSELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_OVER, function(event, eventBus){
	eventBus.publish(new AbstractEvent(Event.Item.SELECT, [this.target]));
});

KineticMouseEventOnItemInterpreter.addHandle(KineticEvent.MOUSE_OUT, function(event, eventBus){
	eventBus.publish(new AbstractEvent(Event.Item.UNSELECT, [this.target]));
});