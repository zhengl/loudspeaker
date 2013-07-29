function KineticMouseEventOnPageInterpreter(target){
	this.target = target;
}

KineticMouseEventOnPageInterpreter.defaultTimeout = 1000;

KineticMouseEventOnPageInterpreter.prototype.interpret = function(event, eventBus){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			return this.interpretMoveTo(event);

		case KineticEvent.MOUSE_DOWN:
			return this.interpretMouseDown(event, eventBus);

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
	this.stopModeSelectionTimer();
	if (this.target.getPainter().isPainting) {
		return new AbstractEvent(Page.Event.DRAW_TO, [new Point(event.offsetX, event.offsetY)]);
	} else if (this.target.getMover().isMoving) {
		this.moveUpEventCatcher();
		return new AbstractEvent(Page.Event.MOVE_TO, [new Point(event.offsetX, event.offsetY)]);
	} else {
		return null;
	}
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseDown = function(event, eventBus){
	this.startModeSelectionTimer(event, eventBus);
	this.moveUpEventCatcher();
	return new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.offsetX, event.offsetY)]);
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseUp = function(event){
	this.stopModeSelectionTimer();
	if (this.target.getPainter().isPainting) {
		this.moveDownEventCatcher();
		return new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]);
	} else if (this.target.getMover().isMoving){
		this.moveDownEventCatcher();
		return new AbstractEvent(Page.Event.FINISH_MOVING);
	} else {
		return null;
	}
};

KineticMouseEventOnPageInterpreter.prototype.startModeSelectionTimer = function(event, eventBus){
	this.timer = window.setTimeout(function(){
		eventBus.publish(new AbstractEvent(Page.Event.START_TEXTING, [new Point(event.offsetX, event.offsetY)]));		
	}, KineticMouseEventOnPageInterpreter.defaultTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.stopModeSelectionTimer = function(){
	if (undefined != this.timer) {
		clearTimeout(this.timer);	
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveUpEventCatcher = function(){
	if(undefined != this.target.context.eventCatcher) {
		this.target.context.eventCatcher.moveToTop();
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveDownEventCatcher = function(){
	if(undefined != this.target.context.eventCatcher) {
		this.target.context.eventCatcher.moveToBottom();
	}
};