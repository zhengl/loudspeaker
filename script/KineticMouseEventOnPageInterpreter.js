function KineticMouseEventOnPageInterpreter(){
	this.previousEvent = KineticEvent.MOUSE_UP;
	this.click = 0;
}

KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout = 200;
KineticMouseEventOnPageInterpreter.defaultLongPressTimeout = 1000;

KineticMouseEventOnPageInterpreter.prototype.interpret = function(page, event, eventBus){
	if(typeof this.handle[event.type] == 'function') {
		this.handle[event.type](this, page, event, eventBus);
	}
	this.previousEvent = event;
};

KineticMouseEventOnPageInterpreter.prototype.handle = {};

KineticMouseEventOnPageInterpreter.prototype.handle[KineticEvent.MOVE_TO] = function(self, page, event, eventBus){
	self.stopLongPressTimer();
	if(self.previousEvent.type == KineticEvent.MOUSE_DOWN && !page.getTexter().isTexting) {
		self.moveUpEventCatcher(page);
		eventBus.publish(new AbstractEvent(Event.Page.START_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (page.getPainter().isPainting) {
		eventBus.publish(new AbstractEvent(Event.Page.DRAW_TO, [new Point(event.offsetX, event.offsetY)]));
	} else if (page.getMover().isMoving) {
		self.moveUpEventCatcher(page);
		eventBus.publish(new AbstractEvent(Event.Page.MOVE_TO, [new Point(event.offsetX, event.offsetY)]));
	}
};

KineticMouseEventOnPageInterpreter.prototype.handle[KineticEvent.MOUSE_DOWN] = function(self, page, event, eventBus){
	self.detectClickType(event, eventBus);
};

KineticMouseEventOnPageInterpreter.prototype.handle[KineticEvent.MOUSE_UP] = function(self, page, event, eventBus){
	self.stopLongPressTimer();
	if (page.getPainter().isPainting) {
		self.moveDownEventCatcher(page);
		eventBus.publish(new AbstractEvent(Event.Page.FINISH_DRAWING, [new Point(event.offsetX, event.offsetY)]));
	} else if (page.getMover().isMoving){
		self.moveDownEventCatcher(page);
		eventBus.publish(new AbstractEvent(Event.Page.FINISH_MOVING));
	}
};

KineticMouseEventOnPageInterpreter.prototype.detectClickType = function(event, eventBus){
	this.click++;
	var self = this;
	window.setTimeout(function(){
		if(self.click == 1) {
			self.startLongPressTimer(event, eventBus);
		} else if (self.click == 2) {
			eventBus.publish(new AbstractEvent(Event.Page.START_TEXTING, [new Point(event.offsetX, event.offsetY)]));		
		}
		self.click = 0;
	}, KineticMouseEventOnPageInterpreter.defaultDoubleClickTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.startLongPressTimer = function(event, eventBus){
	this.longPressTimer = window.setTimeout(function(){
		eventBus.publish(new AbstractEvent(Event.Page.START_SELECTING_COLOR, [new Point(event.offsetX, event.offsetY)]));		
	}, KineticMouseEventOnPageInterpreter.defaultLongPressTimeout);
};

KineticMouseEventOnPageInterpreter.prototype.stopLongPressTimer = function(){
	if (undefined != this.longPressTimer) {
		window.clearTimeout(this.longPressTimer);
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveUpEventCatcher = function(page){
	if(undefined != page.context.eventCatcher) {
		page.context.eventCatcher.moveToTop();
	}
};

KineticMouseEventOnPageInterpreter.prototype.moveDownEventCatcher = function(page){
	if(undefined != page.context.eventCatcher) {
		page.context.eventCatcher.moveToBottom();
	}
};