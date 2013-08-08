function KineticMouseEventOnItemInterpreter(target){
		this.target = target;
}

KineticMouseEventOnItemInterpreter.prototype.interpret = function(event){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			return this.interpretMoveTo(event);

		case KineticEvent.MOUSE_DOWN:
			return this.interpretMouseDown(event);

		case KineticEvent.MOUSE_UP:
			return this.interpretMouseUp(event);

		case KineticEvent.MOUSE_ENTER:
			return this.interpretMouseEnter(event);
			
		case KineticEvent.MOUSE_LEAVE:
			return this.interpretMouseLeave(event);
			
		case KineticEvent.MOUSE_OVER:
			return this.interpretMouseOver(event);
			
		case KineticEvent.MOUSE_OUT:
			return this.interpretMouseOut(event);

		default:
			return null;
	}	
};

KineticMouseEventOnItemInterpreter.prototype.interpretMoveTo = function(event){
	if(this.target.isMoving) {
		return new AbstractEvent(Event.Item.MOVE_TO, [this.target, new Point(event.offsetX, event.offsetY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseDown = function(event){
	if(this.target.isSelected) {
		var mousePosition = this.target.getKineticShape().getStage().getMousePosition();
		var currentPosition = this.target.getPosition();
		var relativeX = mousePosition.x - currentPosition.x;
		var relativeY = mousePosition.y - currentPosition.y;
		return new AbstractEvent(Event.Item.START_MOVING, [this.target, new Point(relativeX, relativeY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseUp = function(event){
	if(this.target.isMoving) {
		return new AbstractEvent(Event.Item.FINISH_MOVING, [this.target]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseEnter = function(event){
	return new AbstractEvent(Event.Item.SELECT, [this.target]);
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseLeave = function(event){
	return new AbstractEvent(Event.Item.UNSELECT, [this.target]);
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseOver = function(event){
	return new AbstractEvent(Event.Item.SELECT, [this.target]);
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseOut = function(event){
	return new AbstractEvent(Event.Item.UNSELECT, [this.target]);
};