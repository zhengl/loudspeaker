define('Painter', ['EventHandleable', 'PainterEventHandler', 'Context'], function(EventHandleable, PainterEventHandler, Context){


function Painter(lineClass, context, palette){
	this.lineClass = lineClass;
	this.context = context;
	this.palette = palette;
}

Painter.prototype = new EventHandleable(new PainterEventHandler());
Painter.prototype.constructor = Painter;

Painter.prototype.getContext = function(){
	return this.context;
};

Painter.prototype.draw = function(item){
	this.context.addItem(item);
};

Painter.prototype.draft = function(item){
	this.context.clearDraftItems();
	this.context.addDraftItem(item);
};

Painter.prototype.startDraft = function(point){
	this.draftItem = new this.lineClass();
	this.draftItem.update(point);
	this.draftItem.setColor(this.palette.getColor());
	this.context.addDraftItem(this.draftItem);
};

Painter.prototype.draftTo = function(point){
	this.draftItem.update(point);
	this.context.clearDraftItems();
	this.context.addDraftItem(this.draftItem);
};

Painter.prototype.endDraft = function(point){
	this.draftTo(point);
	this.context.addItem(this.draftItem);
	this.context.clearDraftItems();
};

Painter.prototype.stopDrawing = function(){
	this.context.clearDraftItems();
};

Painter.prototype.getPalette = function(){
	return this.palette;
};

Painter.prototype.clear = function(){
	this.stopDrawing();
};

return Painter;


});