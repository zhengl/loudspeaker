function Page(context) {
	this.context = context;
	
	this.painter = new Painter(context);
	this.painter.setPage(this);
}

Page.prototype.getPainter = function() {
	return this.painter;
};

Page.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Page.prototype.notify = function(event){
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.painter.startDraft(event.data[0]);
			break;
		case Page.Event.FINISH_DRAWING:
			this.painter.endDraft(event.data[0]);
			break;
		case Page.Event.STOP_DRAWING:
			this.painter.stopDrawing();
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data[0]);
			break;
	}
};

Page.prototype.moveTo = function(point){
	if(this.painter.isPainting){
		this.painter.draftTo(point);
	}
};

Page.prototype.startMoving = function(item) {
	this.context.startMoving(item);
};

Page.prototype.finishMoving = function(item) {
	this.context.finishMoving(item);
};

Page.Event = {
	START_DRAWING: "START_DRAWING",
	FINISH_DRAWING: "FINISH_DRAWING",
	MOVE_TO: "MOVE_TO"
};