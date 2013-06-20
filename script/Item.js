function Item(){
	this.isSelected = false;
}

Item.prototype.notify = function(event){
	console.log(event);
	switch(event.name) {
		case Item.Event.START_MOVING:
			this.relativePosition = event.data[0];
			this.isMoving = true;
			this.getPageEventTrigger().trigger(
				new AbstractEvent(Page.Event.START_MOVING, [this])
				);
			break;
		case Item.Event.FINISH_MOVING:
			this.getPageEventTrigger().trigger(
				new AbstractEvent(Page.Event.FINISH_MOVING, [this])
				);
			break;
		case Item.Event.MOVE_TO:
			this.getPageEventTrigger().trigger(
				new AbstractEvent(Page.Event.MOVE_TO, [event.data[0]])
				);
			break;
		case Item.Event.SELECT:
			this.select();
			break;
		case Item.Event.UNSELECT:
			this.unselect();
			break;
	}
};

Item.prototype.enableEventHandling = function(){
	var eventChannel = EventChannelFactory.create(this);

	this.setOutputEventTrigger(eventChannel.getOutputEventTrigger());
	this.getOutputEventTrigger().addListener(this);
	this.setInputEventTrigger(eventChannel.getInputEventTrigger());
	this.registerEventTrigger();
	this.pageEventTrigger = new EventTrigger();
};

Item.prototype.getPosition = function(){
	return this.position;
};

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
};


Item.prototype.getPageEventTrigger = function(){
	return this.pageEventTrigger;
};

Item.prototype.setOutputEventTrigger = function(outputEventTrigger){
	this.outputEventTrigger = outputEventTrigger;
};

Item.prototype.getOutputEventTrigger = function(){
	return this.outputEventTrigger;
};

Item.prototype.setInputEventTrigger = function(inputEventTrigger){
	this.inputEventTrigger = inputEventTrigger;
};

Item.prototype.getInputEventTrigger = function(){
	return this.inputEventTrigger;
};

Item.prototype.registerEventTrigger = function(){
};

Item.prototype.setEventTrigger = function(eventTrigger){
	this.eventTrigger = eventTrigger;
};

Item.prototype.getEventTrigger = function(){
	return this.eventTrigger;
};


Item.prototype.select = function(){
	this.isSelected = true;
};

Item.prototype.unselect = function(){
	this.isSelected = false;
};

Item.Event = {
	START_MOVING: "ITEM.START_MOVING",
	FINISH_MOVING: "ITEM.FINISH_MOVING",
	MOVE_TO: "ITEM.MOVE_TO",
	SELECT: "ITEM.SELECT",
	UNSELECT: "ITEM.UNSELECT"
};