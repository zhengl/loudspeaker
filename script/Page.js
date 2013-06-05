function Page(context) {
	this.context = context;
}

Page.prototype.drawLine = function(points) {
	var line = new Line(points);
	return this.context.draw(line);
};

Page.prototype.selectLine = function(){
};

Page.prototype.notify = function(event, data){
	switch(event) {
		case Event.START_DRAWING:
			this.isPainting = true;
			break;
		case Event.STOP_DRAWING:
			this.isPainting = false;
			break;
		case Event.MOVE_TO:
			this.moveTo(data);
			break;
	}
};

Page.prototype.moveTo = function(data){
	if(this.isPainting){
		this.drawLine();
	}
};