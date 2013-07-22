function Item(){
	this.isSelected = false;
}

Item.prototype.notify = function(event){
	if (event.name.indexOf("ITEM") == 0 && event.data[0] === this){
		switch(event.name) {
			case Item.Event.START_MOVING:
				this.relativePosition = event.data[1];
				this.eventBus.publish(
					new AbstractEvent(Page.Event.START_MOVING, [this])
					);
				break;
			case Item.Event.FINISH_MOVING:
				this.eventBus.publish(
					new AbstractEvent(Page.Event.FINISH_MOVING)
					);
				break;
			case Item.Event.MOVE_TO:
				this.eventBus.publish(
					new AbstractEvent(Page.Event.MOVE_TO, [event.data[1]])
					);
				break;
			case Item.Event.SELECT:
				this.select();
				break;
			case Item.Event.UNSELECT:
				this.unselect();
				break;
		}
	}
};

Item.prototype.getEventBus = function(){
	return this.eventBus;
};

Item.prototype.registerEventBus = function(eventBus){
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};

Item.prototype.getPosition = function(){
	return this.position;
};

Item.prototype.setPosition = function(point){
	this.position = point;
};

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
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