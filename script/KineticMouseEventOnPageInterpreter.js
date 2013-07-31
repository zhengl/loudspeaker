function KineticMouseEventOnPageInterpreter(target){
	this.target = target;

	this.click = 0;
}

KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout = 200;
KineticMouseEventOnPageInterpreter.defaultLongPressTimeout = 1000;

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
	this.stopLongPressTimer();
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
	this.detectClickType(event, eventBus);
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseUp = function(event){
	this.stopLongPressTimer();
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

KineticMouseEventOnPageInterpreter.prototype.detectClickType = function(event, eventBus){
	this.detectDoubleClick(event, eventBus);
	this.startLongPressTimer(event, eventBus);
};

KineticMouseEventOnPageInterpreter.prototype.detectDoubleClick = function(event, eventBus){
	this.click++;
	var self = this;
	window.setTimeout(function(){
		if(self.click == 1) {
			self.moveUpEventCatcher();
			eventBus.publish(new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.offsetX, event.offsetY)]));
		} else if (self.click == 2) {
			eventBus.publish(new AbstractEvent(Page.Event.START_TEXTING, [new Point(event.offsetX, event.offsetY)]));		
		}
		self.click = 0;
	}, KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.startLongPressTimer = function(event, eventBus){
	this.longPressTimer = window.setTimeout(function(){
		eventBus.publish(new AbstractEvent(Page.Event.START_SELECTING_COLOR, [new Point(event.offsetX, event.offsetY)]));		
	}, KineticMouseEventOnPageInterpreter.defaultLongPressTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.stopLongPressTimer = function(){
	if (undefined != this.longPressTimer) {
		clearTimeout(this.longPressTimer);	
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