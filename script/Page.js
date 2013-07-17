function Page() {
	this.context = ContextFactory.create();

	this.painter = new Painter(this.context);
	this.texter = new Texter(this.context);
	this.mover = new Mover(this.context);
	
	this.eventHandlingEnabled = false;
}

Page.prototype.selectPaintingMode = function(){
	this.isPainting = true;
};

Page.prototype.selectTextingMode = function(){
	this.isTexting = true;
};

Page.prototype.notify = function(event){
	console.log(event);
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.painter.startDraft(event.data[0]);
			break;
		case Page.Event.FINISH_DRAWING:
			var drawnItem = this.painter.endDraft(event.data[0]);
			this.tryToEnableItemEventHandling(drawnItem);
			break;
		case Page.Event.DRAW_TO:
			this.getPainter().draftTo(event.data[0]);
			break;
		case Page.Event.STOP_DRAWING:
			this.painter.stopDrawing();
			break;
		case Page.Event.START_MOVING:
			this.getMover().startMoving(event.data[0]);
			break;
		case Page.Event.MOVE_TO:
			this.getMover().moveTo(event.data[0]);
			break;
		case Page.Event.FINISH_MOVING:
			this.getMover().finishMoving();
			break;
		case Page.Event.START_TEXTING:
			this.getTexter().startTexting(event.data[0]);
			break;
	}
};

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

Page.prototype.getTexter = function() {
	return this.texter;
};

Page.prototype.getMover = function(){
	return this.mover;
};

Page.prototype.draw = function(item){
	var drawnItem = this.getPainter().draw(item);
	this.tryToEnableItemEventHandling(drawnItem);
	return drawnItem;
};

Page.prototype.write = function(item){
	var textItem = this.getTexter().write(item);
	this.tryToEnableItemEventHandling(textItem);
	return textItem;
};

Page.prototype.tryToEnableItemEventHandling = function(item){
	if (this.eventHandlingEnabled) {
		item.enableEventHandling();
		item.getPageEventTrigger().addListener(this);
	}
};

Page.Event = {
	START_DRAWING: "PAGE.START_DRAWING",
	STOP_DRAWING: "PAGE.STOP_DRAWING",
	FINISH_DRAWING: "PAGE.FINISH_DRAWING",
	DRAW_TO: "DRAW_TO",

	START_MOVING: "PAGE.START_MOVING",
	MOVE_TO: "PAGE.MOVE_TO",
	FINISH_MOVING: "PAGE.FINISH_MOVING",

	START_TEXTING: "PAGE.START_TEXTING",
};