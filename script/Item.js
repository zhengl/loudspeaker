function Item(){
	this.position = new Point();
}

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
};

Item.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Item.prototype.notify = function(event){
	switch(event.name) {
		case Item.Event.START_MOVING:
			this.isMoving = true;
			break;
		case Item.Event.STOP_DRAWING:
			this.isMoving = false;
			break;
		case Item.Event.MOVE_TO:
			this.tryToMoveTo(event.data[0]);
			break;
	}
};

Item.prototype.tryToMoveTo = function(newPosition){
	if (this.isMoving) {
		this.moveTo(newPosition);
	}
}

Item.Event = {
	START_MOVING: "START_MOVING",
	STOP_MOVING: "STOP_MOVING",
	MOVE_TO: "MOVE_TO"
};