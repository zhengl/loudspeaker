function Page() {
	this.context = ContextFactory.create();
	this.palette = PaletteFactory.create();

	this.painter = new Painter(this.context, this.palette);
	this.texter = new Texter(this.context, this.palette);
	this.mover = new Mover(this.context);

	this.selectPaintingMode();
}

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
	switch(event.name) {
		case Page.Event.START_DRAWING:
			this.selectPaintingMode();
			this.painter.startDraft(event.data[0]);
			break;
		case Page.Event.FINISH_DRAWING:
			var drawnItem = this.getPainter().endDraft(event.data[0]);
			this.registerEventBus(drawnItem);
			break;
		case Page.Event.DRAW_TO:
			this.getPainter().draftTo(event.data[0]);
			break;
		case Page.Event.STOP_DRAWING:
			this.painter.stopDrawing();
			break;
		case Page.Event.START_SELECTING_COLOR:
			this.painter.showPalette(event.data[0]);
			break;
		case Page.Event.START_MOVING:
			this.getMover().startMoving(event.data[0]);
			break;
		case Page.Event.MOVE_TO:
			this.getMover().moveTo(event.data[0]);
			break;
		case Page.Event.FINISH_MOVING:
			this.getMover().finishMoving();
			break;
		case Page.Event.START_TEXTING:
			this.selectTextingMode();
			this.getTexter().startTexting(event.data[0]);
			break;
		case Page.Event.FINISH_TEXTING:
			this.getTexter().finishTexting();
			break;
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

Page.prototype.enableEventHandling = function(eventBus){
	this.eventBus = eventBus;
	eventBus.addListener(this);
	this.context.registerEventBus(this, eventBus);	
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

Page.prototype.unserialize = function(json) {
	var unserializer = new UnserializeStrategy();
	unserializer.process(this, json);
};

Page.prototype.serialize = function(){
	var serializer = new SerializeStrategy();
	return serializer.process(this);
};

Page.Event = {
	START_DRAWING: "PAGE.START_DRAWING",
	STOP_DRAWING: "PAGE.STOP_DRAWING",
	FINISH_DRAWING: "PAGE.FINISH_DRAWING",
	DRAW_TO: "PAGE.DRAW_TO",

	START_SELECTING_COLOR: "PAGE.START_SELECTING_COLOR",

	START_MOVING: "PAGE.START_MOVING",
	MOVE_TO: "PAGE.MOVE_TO",
	FINISH_MOVING: "PAGE.FINISH_MOVING",

	START_TEXTING: "PAGE.START_TEXTING",
	FINISH_TEXTING: "PAGE.FINISH_TEXTING",
};

Page.Mode = {
	TEXT: "PAGE.TEXT",
	DRAW: "PAGE.DRAW",
};