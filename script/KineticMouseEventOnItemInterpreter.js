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
		return new AbstractEvent(Item.Event.MOVE_TO, [new Point(event.x, event. y)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseDown = function(event){
	if(this.target.isSelected) {
		var currentPosition = this.target.getPosition();
		var relativeX = event.x - currentPosition.x;
		var relativeY = event.y - currentPosition.y;
		return new AbstractEvent(Item.Event.START_MOVING, [new Point(relativeX, relativeY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseUp = function(event){
	if(this.target.isMoving) {
		return new AbstractEvent(Item.Event.FINISH_MOVING);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseEnter = function(event){
	return new AbstractEvent(Item.Event.SELECT);
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseLeave = function(event){
	if (this.target.isMoving) {
		return new AbstractEvent(Item.Event.UNSELECT);
	} else {
		return null;
	}
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseOver = function(event){
	return new AbstractEvent(Item.Event.SELECT);
};

KineticMouseEventOnItemInterpreter.prototype.interpretMouseOut = function(event){
	if (!this.target.isMoving) {
		return new AbstractEvent(Item.Event.UNSELECT);
	} else {
		return null;
	}
};