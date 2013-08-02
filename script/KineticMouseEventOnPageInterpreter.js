function KineticMouseEventOnPageInterpreter(target){
	this.target = target;
	this.previousEvent = KineticEvent.MOUSE_UP;
	this.click = 0;
}

KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout = 200;
KineticMouseEventOnPageInterpreter.defaultLongPressTimeout = 1000;

KineticMouseEventOnPageInterpreter.prototype.interpret = function(event, eventBus){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			this.interpretMoveTo(event, eventBus);
			break;

		case KineticEvent.MOUSE_DOWN:
			this.interpretMouseDown(event, eventBus);
			break;

		case KineticEvent.MOUSE_UP:
			this.interpretMouseUp(event, eventBus);
			break;
	}
	this.previousEvent = event;
};

KineticMouseEventOnPageInterpreter.prototype.interpretMoveTo = function(event, eventBus){
	this.stopLongPressTimer();
	console.log(this.target.getMover().isMoving);
	if(this.previousEvent.type == KineticEvent.MOUSE_DOWN && !this.target.getTexter().isTexting) {
		this.moveUpEventCatcher();
		eventBus.publish(new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getPainter().isPainting) {
		eventBus.publish(new AbstractEvent(Page.Event.DRAW_TO, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getMover().isMoving) {
		this.moveUpEventCatcher();
		eventBus.publish(new AbstractEvent(Page.Event.MOVE_TO, [new Point(event.offsetX, event.offsetY)]));
	}
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseDown = function(event, eventBus){
	this.detectClickType(event, eventBus);
};

KineticMouseEventOnPageInterpreter.prototype.interpretMouseUp = function(event, eventBus){
	this.stopLongPressTimer();
	if (this.target.getPainter().isPainting) {
		this.moveDownEventCatcher();
		eventBus.publish(new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (this.target.getMover().isMoving){
		this.moveDownEventCatcher();
		eventBus.publish(new AbstractEvent(Page.Event.FINISH_MOVING));
	}
};

KineticMouseEventOnPageInterpreter.prototype.detectClickType = function(event, eventBus){
	this.click++;
	var self = this;
	window.setTimeout(function(){
		if(self.click == 1) {
			self.startLongPressTimer(event, eventBus);
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
		window.clearTimeout(this.longPressTimer);
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