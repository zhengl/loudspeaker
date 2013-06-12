function Item(){
	this.isSelected = false;
}

Item.prototype.setPage = function(page){
	this.page = page;
};

Item.prototype.getPosition = function(){
	return this.position;
};

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
};

Item.prototype.enableEventHandling = function(){
	var eventChannel = EventChannelFactory.create();

	this.setOutputEventTrigger(eventChannel.getOutputEventTrigger());
	this.getOutputEventTrigger().addListener(this);

	this.setInputEventTrigger(eventChannel.getInputEventTrigger());
	this.registerEventTrigger(this.getInputEventTrigger());
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

Item.prototype.notify = function(event){
	switch(event.name) {
		case Item.Event.START_MOVING:
			this.startMoving(event.data[0]);
			break;
		case Item.Event.FINISH_MOVING:
			this.finishMoving();
			break;
		case Item.Event.MOVE_TO:
			this.tryToMoveTo(event.data[0]);
			break;
		case Item.Event.SELECT:
			this.select();
			break;
		case Item.Event.UNSELECT:
			this.unselect();
			break;
	}
};

Item.prototype.select = function(){
	this.isSelected = true;
};

Item.prototype.unselect = function(){
	this.isSelected = false;
};

Item.prototype.startMoving = function(relativePosition){
	if (this.isSelected) {
		this.isMoving = true;
		this.relativePosition = relativePosition;
		this.page.getMover().startMoving(this);
	}
};

Item.prototype.finishMoving = function(){
	this.isMoving = false;
	this.page.getMover().finishMoving(this);
};

Item.prototype.tryToMoveTo = function(newPosition){
	if (this.isMoving) {
		var newX = newPosition.x - (this.getPosition().x - this.relativePosition.x);
		var newY = newPosition.y - (this.getPosition().y - this.relativePosition.y);
		this.moveTo(new Point(newX, newY));
	}
};

Item.Event = {
	START_MOVING: "START_MOVING",
	FINISH_MOVING: "FINISH_MOVING",
	MOVE_TO: "MOVE_TO",
	SELECT: "SELECT",
	UNSELECT: "UNSELECT"
};