define('Page', ['Item', 'Point'], function(Item, Point){

function Page(){
	this.zoomPercentage = 1;
}

Page.prototype = new Item();
Page.prototype.constructor = Page;

Page.prototype.setZoomPercentage = function(percentage) {
	this.zoomPercentage = percentage
};

Page.prototype.setElement = function(element) {
	this.element = element;
};

Page.prototype.getElement = function() {
	return this.element;
};

Page.prototype.getContext = function() {
	return this.context;
};

Page.prototype.setContext = function(context) {
	this.context = context;
};

Page.prototype.getEventBus = function() {
	return this.eventBus;
};

Page.prototype.setEventBus = function(eventBus) {
	this.eventBus = eventBus;
};

Page.prototype.getPalette = function() {
	return this.palette;
};

Page.prototype.setPalette = function(palette) {
	this.palette = palette;
};

Page.prototype.getPainter = function() {
	return this.painter;
};

Page.prototype.setPainter = function(painter) {
	this.painter = painter;
};

Page.prototype.getTexter = function() {
	return this.texter;
};

Page.prototype.setTexter = function(texter) {
	this.texter = texter;
};

Page.prototype.getMover = function() {
	return this.mover;
};

Page.prototype.setMover = function(mover) {
	this.mover = mover;
};

Page.prototype.addItem = function(page) {
	if(this.getElement() && page.getElement()) {
		this.getElement().appendChild(page.getElement());
	}
	if(this.getContext()) {
		this.getContext().addItem(page);
	} else {
		page.setParent(this);
	}
};

Page.prototype.remove = function(page) {
	this.parent.removeItem(this);
	if(this.element) {
		this.element.parentNode.removeChild(this.element);
	}
};

Page.prototype.moveTo = function(point){
	this.position = point;
	if (this.element) {
	    this.element.style.position = "absolute";
	    this.element.style.left = point.x / this.zoomPercentage + "px";
		this.element.style.top = point.y /this.zoomPercentage + "px";
	}
};


return Page;

});