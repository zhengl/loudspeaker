function Page(context) {
	this.context = context;
}

Page.prototype.draw = function(item) {
	return this.context.draw(item);
};

Page.prototype.draft = function(item) {
	return this.context.draft(item);
}

Page.prototype.selectLine = function(){
};

Page.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Page.prototype.notify = function(event){
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.isPainting = true;
			break;
		case Page.Event.FINISH_DRAWING:
			this.draw(new Line(event.data));
			this.context.clearDraftItems();
			break;
		case Page.Event.STOP_DRAWING:
			this.isPainting = false;
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data);
			break;
	}
};

Page.prototype.moveTo = function(data){
	if(this.isPainting){
		this.draft(new Line(this.data));
	}
};

Page.Event = {
	START_DRAWING: "START_DRAWING",
	FINISH_DRAWING: "FINISH_DRAWING",
	MOVE_TO: "MOVE_TO"
};