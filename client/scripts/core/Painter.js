define('Painter', ['Line', 'PainterEventHandler', 'Context'], function(Line, PainterEventHandler, Context){


function Painter(context, palette){
	this.context = context;
	this.palette = palette;
}

Painter.prototype.getContext = function(){
	return this.context;
}

Painter.prototype.setEventHandler = function(handler){
	this.handler = handler;
};

Painter.prototype.notify = function(event){
	if (typeof this.handler.handle[event.name] == 'function') {
		this.handler.handle[event.name](this, event);
	}
};

Painter.prototype.enableEventHandling = function(eventBus){
	this.setEventHandler(new PainterEventHandler());
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};

Painter.prototype.draw = function(item){
	this.context.addItem(item);
};

Painter.prototype.draft = function(item){
	this.context.clearDraftItems();
	this.context.addDraftItem(item);
};

Painter.prototype.startDraft = function(point){
	this.context.setMode(Context.MODE.PAINTING);

	var draftItem = new Line();
	draftItem.update(point);
	draftItem.setColor(this.palette.getColor());
	draftItem.draftize();
	this.context.addDraftItem(draftItem);
};

Painter.prototype.selectShape = function(shape){
	this.palette.selectShape(shape);
};

Painter.prototype.draftTo = function(point){
	var draftItem = this.context.getLastDraftItem();
	draftItem.update(point);
	this.context.clearDraftItems();
	this.context.addDraftItem(draftItem);
};

Painter.prototype.endDraft = function(point){
	this.context.setMode(Context.MODE.IDLE);

	this.draftTo(point);	
	var draftItem = this.context.getLastDraftItem();
	var item = draftItem.undraftize();
	this.context.addItem(item);
	this.context.clearDraftItems();
};

Painter.prototype.stopDrawing = function(){
	this.context.clearDraftItems();
};

Painter.prototype.showPalette = function(point){
	this.palette.setPosition(point);
	this.palette.show();
};

Painter.prototype.hidePalette = function(point){
	this.palette.hide();
};

Painter.prototype.getPalette = function(point){
	return this.palette;
};

Painter.prototype.clear = function(){
	this.stopDrawing();
};

return Painter;


});