function Page() {
	this.context = ContextFactory.create();
	
	this.painter = new Painter(this.context);
	this.painter.setPage(this);	
	
	this.mover = new Mover(this.context);
}

Page.prototype.enableEventHandling = function(){
	var eventChannel = EventChannelFactory.create();

	this.setOutputEventTrigger(eventChannel.getOutputEventTrigger());
	this.getOutputEventTrigger().addListener(this);

	this.setInputEventTrigger(eventChannel.getInputEventTrigger());
	this.context.registerEventTrigger(this.getInputEventTrigger());
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
	item.enableEventHandling();
	item.getOutputEventTrigger().addListener(this);
	return item;
};

Page.prototype.notify = function(event){
	console.log(event.name);
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

Page.Event = {
	START_DRAWING: "START_DRAWING",
	STOP_DRAWING: "STOP_DRAWING",
	FINISH_DRAWING: "FINISH_DRAWING",
	MOVE_TO: "MOVE_TO"
};