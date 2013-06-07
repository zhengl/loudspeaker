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

Page.prototype.setCurrentPosition = function(data){
	this.currentPosition = data[0];
};

Page.prototype.notify = function(event){
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.setCurrentPosition(event.data);
			this.startDraft(this.currentPosition);
			break;
		case Page.Event.FINISH_DRAWING:
			this.setCurrentPosition(event.data);
			this.context.undraftize();
			this.context.clearDraftItems();
			break;
		case Page.Event.STOP_DRAWING:
			this.isPainting = false;
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data[0]);
			this.currentPoint = event.data[0];
			break;
	}
};

Page.prototype.startDraft = function(point){
	this.isPainting = true;
	this.context.startDraft(this.type, point);
};

Page.prototype.moveTo = function(point){
	if(this.isPainting){
		this.context.draftTo(point);
	}
};

Page.Event = {
	START_DRAWING: "START_DRAWING",
	FINISH_DRAWING: "FINISH_DRAWING",
	MOVE_TO: "MOVE_TO"
};