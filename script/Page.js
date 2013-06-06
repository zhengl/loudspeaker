function Page(context) {
	this.context = context;
	this.data = new Array();
}

Page.prototype.drawLine = function(points) {
	var line = new Line(points);
	return this.context.draw(line);
};

Page.prototype.selectLine = function(){
};

Page.prototype.registerEventTrigger = function(eventTrigger){
	eventTrigger.addListener(this);
};

Page.prototype.notify = function(event){
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.isPainting = true;
			break;
		case Page.Event.STOP_DRAWING:
			this.isPainting = false;
			this.data = [];
			break;
		case Page.Event.MOVE_TO:
			this.moveTo(event.data);
			break;
	}
};

Page.prototype.moveTo = function(data){
	if(this.isPainting){
		this.data.push(data[0]);
		this.drawLine(this.data);
	}
};

Page.Event = {
	START_DRAWING: "START_DRAWING",
	STOP_DRAWING: "STOP_DRAWING",
	MOVE_TO: "MOVE_TO"
};