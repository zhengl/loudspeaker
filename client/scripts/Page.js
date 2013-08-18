define('Page', function(){


function Page(painter, texter, mover) {
	this.painter = painter;
	this.texter = texter;
	this.mover = mover;

	// this.context = ContextFactory.create();
	// this.palette = PaletteFactory.create();

	// this.painter = new Painter(this.context, this.palette);
	// this.texter = new Texter(this.context, this.palette);
	// this.mover = new Mover(this.context);

	// this.selectPaintingMode();

	// this.handler = new PageEventHandler();
}

Page.prototype.setPainter = function(painter){
	this.painter = painter;
};

Page.prototype.setTexter = function(texter){
	this.texter = texter;
};

Page.prototype.setMover = function(mover){
	this.mover = mover;
};

Page.prototype.selectPaintingMode = function(){
	this.texter.clear();
	this.mode = Page.Mode.DRAW;
};

Page.prototype.selectTextingMode = function(){
	this.painter.clear();
	this.mode = Page.Mode.TEXT;
};

Page.prototype.isPainting = function(){
	return this.mode == Page.Mode.DRAW;
};

Page.prototype.isTexting = function(){
	return this.mode == Page.Mode.TEXT;
};

Page.prototype.notify = function(event){
	if (typeof this.handler.handle[event.name] == 'function') {
		this.handler.handle[event.name](this, event);
	}
};

Page.prototype.hasEventBus = function(){
	return undefined != this.eventBus;
};

Page.prototype.registerEventBus = function(item){
	if (this.hasEventBus()) {
		item.registerEventBus(this.eventBus);
	}
};

Page.prototype.enableEventHandling = function(eventBus, handlers){
	this.eventBus = eventBus;
	this.handler = handlers;
	eventBus.addListener(this);
	this.getPainter().context.registerEventBus(this, eventBus);	
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
	this.registerEventBus(drawnItem);
	return drawnItem;
};

Page.prototype.write = function(item){
	var textItem = this.getTexter().write(item);
	this.registerEventBus(textItem);
	return textItem;
};

Page.prototype.getContext = function(){
	return this.getPainter().context;
};

// Page.prototype.unserialize = function(json) {
// 	var unserializer = new UnserializeStrategy();
// 	unserializer.process(this, json);
// };

// Page.prototype.serialize = function(){
// 	var serializer = new SerializeStrategy();
// 	return serializer.process(this);
// };

Page.Mode = {
	TEXT: "PAGE.TEXT",
	DRAW: "PAGE.DRAW",
};

return Page;


});