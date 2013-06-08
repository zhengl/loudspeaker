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
	this.type = "Line";
};

Page.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Page.prototype.notify = function(event){
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.startDraft(event.data[0]);
			break;
		case Page.Event.FINISH_DRAWING:
			this.endDraft(event.data[0]);
			break;
		case Page.Event.STOP_DRAWING:
			this.isPainting = false;
			this.context.clearDraftItems();
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data[0]);
			break;
	}
};

Page.prototype.startDraft = function(point){
	this.isPainting = true;
	this.context.startDraft(this.type, point);
};

Page.prototype.draftTo = function(point){
	this.context.draftTo(point);
};

Page.prototype.endDraft = function(point){
	this.isPainting = false;
	this.draftTo(point);
	this.context.undraftize();
};

Page.prototype.moveTo = function(point){
	if(this.isPainting){
		this.draftTo(point);
	}
};

Page.Event = {
	START_DRAWING: "START_DRAWING",
	FINISH_DRAWING: "FINISH_DRAWING",
	MOVE_TO: "MOVE_TO"
};