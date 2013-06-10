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

Item.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Item.prototype.notify = function(event){
	switch(event.name) {
		case Item.Event.START_MOVING:
			this.tryToStartMoving(event.data[0]);
			this.page.startMoving(this);
			break;
		case Item.Event.FINISH_MOVING:
			this.isMoving = false;
			this.page.finishMoving(this);
			break;
		case Item.Event.FINISH_DRAWING:
			this.isMoving = false;
			break;
		case Item.Event.MOVE_TO:
			this.tryToMoveTo(event.data[0]);
			break;
		case Item.Event.SELECT:
			this.isSelected = true;
			break;
		case Item.Event.UNSELECT:
			this.isSelected = false;
			break;
	}
};

Item.prototype.tryToStartMoving = function(relativePosition){
	if (this.isSelected) {
		this.isMoving = true;
		this.relativePosition = relativePosition;
	}
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