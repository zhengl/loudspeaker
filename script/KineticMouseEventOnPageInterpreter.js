function KineticMouseEventOnPageInterpreter(target){
	this.target = target;
}

KineticMouseEventOnPageInterpreter.prototype.interpret = function(event){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			return this.interpretMoveTo(event);

		case KineticEvent.MOUSE_DOWN:
			return this.interpretMouseDown(event);

		case KineticEvent.MOUSE_UP:
			return this.interpretMouseUp(event);

		case KineticEvent.MOUSE_ENTER:
		break;

		case KineticEvent.MOUSE_LEAVE:
			return new AbstractEvent(Page.Event.STOP_DRAWING);

		case KineticEvent.MOUSE_OVER:
		break;

		case KineticEvent.MOUSE_OUT:
		break;

		default:
		break;
	}	
};

KineticMouseEventOnPageInterpreter.prototype.interpretMoveTo = function(event){
	if (this.target.getPainter().isPainting) {
		return new AbstractEvent(Page.Event.DRAW_TO, [new Point(event.offsetX, event.offsetY)]);
	} else if (this.target.getMover().isMoving) {
		return new AbstractEvent(Page.Event.MOVE_TO, [new Point(event.offsetX, event.offsetY)]);;
	} else {
		return null;
	}
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseDown = function(event){
	if (this.target.isPainting) {
		return new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.offsetX, event.offsetY)]);
	} else if (this.target.isTexting) {
		return new AbstractEvent(Page.Event.START_TEXTING, [new Point(event.offsetX, event.offsetY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseUp = function(event){
	if (this.target.getPainter().isPainting) {
		return new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]);
	} else if (this.target.getMover().isMoving){
		return new AbstractEvent(Page.Event.FINISH_MOVING);
	} else if (this.target.getTexter().isTexting){
		return new AbstractEvent(Page.Event.FINISH_TEXTING);
	} else {
		return null;
	}
};
