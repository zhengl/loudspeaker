function Page() {
	this.context = ContextFactory.create();

	this.painter = new Painter(this.context);
	this.painter.setPage(this);	
	
	this.mover = new Mover(this.context);
	
	this.eventHandlingEnabled = false;
}

Page.prototype.enableEventHandling = function(){
	var eventChannel = EventChannelFactory.create(this);

	this.setOutputEventTrigger(eventChannel.getOutputEventTrigger());
	this.getOutputEventTrigger().addListener(this);

	this.setInputEventTrigger(eventChannel.getInputEventTrigger());
	this.context.registerEventTrigger(this.getInputEventTrigger());
	
	this.eventHandlingEnabled = true;
};

Page.prototype.setOutputEventTrigger = function(outputEventTrigger){
	this.outputEventTrigger = outputEventTrigger;
};

Page.prototype.getOutputEventTrigger = function(){
	return this.outputEventTrigger;
};

Page.prototype.setInputEventTrigger = function(inputEventTrigger){
	this.inputEventTrigger = inputEventTrigger;
};

Page.prototype.getInputEventTrigger = function(){
	return this.inputEventTrigger;
};

Page.prototype.getPainter = function() {
	return this.painter;
};

Page.prototype.getMover = function(){
	return this.mover;
};

Page.prototype.draw = function(item){
	var drawnItem = this.getPainter().draw(item);
	this.tryToEnableItemEventHandling(drawnItem);
	return drawnItem;
};

Page.prototype.notify = function(event){
	console.log(event.name);
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.painter.startDraft(event.data[0]);
			break;
		case Page.Event.FINISH_DRAWING:
			var drawnItem = this.painter.endDraft(event.data[0]);
			this.tryToEnableItemEventHandling(drawnItem);
			break;
		case Page.Event.STOP_DRAWING:
			this.painter.stopDrawing();
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data[0]);
			break;
		case Page.Event.START_MOVING:
			this.getMover().startMoving(event.data[0]);
			break;
		case Page.Event.FINISH_MOVING:
			this.getMover().finishMoving(event.data[0]);
			break;
	}
};

Page.prototype.tryToEnableItemEventHandling = function(item){
	if (this.eventHandlingEnabled) {
		item.enableEventHandling();
		item.registerEventTrigger();
		item.getPageEventTrigger().addListener(this);
	}
};

Page.prototype.moveTo = function(point){
	if(this.painter.isPainting) {
		this.painter.draftTo(point);
	} else if (this.mover.isMoving) {
		this.mover.moveTo(point);
	}
};

Page.Event = {
	START_DRAWING: "PAGE.START_DRAWING",
	STOP_DRAWING: "PAGE.STOP_DRAWING",
	FINISH_DRAWING: "PAGE.FINISH_DRAWING",
	MOVE_TO: "PAGE.MOVE_TO",
	START_MOVING: "PAGE.START_MOVING",
	FINISH_MOVING: "PAGE.FINISH_MOVING",
};