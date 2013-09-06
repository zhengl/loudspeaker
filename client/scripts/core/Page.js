define('Page', ['Item'], function(Item){

function Page(){
	
}

Page.prototype = new Item();
Page.prototype.constructor = Page;

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

Page.prototype.appendPage = function(page) {
	page.disableEventHandling();
	this.getContext().getItems().push(page);

	page.enableEventHandling(this.getEventBus());
};

Page.prototype.disableEventHandling = function(page) {
	this.getContext().disableEventHandling();
	this.getMover().disableEventHandling();
	this.getTexter().disableEventHandling();
	this.getPainter().disableEventHandling();
	this.getPalette().disableEventHandling();
};


return Page;

});