function KineticMouseEventOnItemInterpreter(){
}

KineticMouseEventOnItemInterpreter.prototype.interpret = function(item, event){
	if(typeof this.handle[event.type] == 'function') {
		return this.handle[event.type](item, event);
	}
};

KineticMouseEventOnItemInterpreter.prototype.handle = {};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOVE_TO] = function(item, event){
	if(item.isMoving) {
		return new AbstractEvent(Event.Item.MOVE_TO, [item, new Point(event.offsetX, event.offsetY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_DOWN] = function(item, event){
	if(item.isSelected) {
		var mousePosition = item.getKineticShape().getStage().getMousePosition();
		var currentPosition = item.getPosition();
		var relativeX = mousePosition.x - currentPosition.x;
		var relativeY = mousePosition.y - currentPosition.y;
		return new AbstractEvent(Event.Item.START_MOVING, [item, new Point(relativeX, relativeY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_UP] = function(item, event){
	if(item.isMoving) {
		return new AbstractEvent(Event.Item.FINISH_MOVING, [item]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_ENTER] = function(item, event){
	return new AbstractEvent(Event.Item.SELECT, [item]);
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_LEAVE] = function(item, event){
	return new AbstractEvent(Event.Item.UNSELECT, [item]);
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_OVER] = function(item, event){
	return new AbstractEvent(Event.Item.SELECT, [item]);
};

KineticMouseEventOnItemInterpreter.prototype.handle[KineticEvent.MOUSE_OUT] = function(item, event){
	return new AbstractEvent(Event.Item.UNSELECT, [item]);
};