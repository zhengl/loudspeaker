define('Painter', ['Line'], function(Line){


function Painter(context, palette){
	this.context = context;
	this.palette = palette;
}

Painter.prototype.draw = function(item){
	return this.context.draw(item);
};

Painter.prototype.draft = function(item){
	return this.context.draft(item);
};

Painter.prototype.startDraft = function(point){
	this.isPainting = true;
	
	var draftItem = new Line();
	draftItem.update(point);
	draftItem.setColor(this.palette.getColor());
	return this.context.startDraft(draftItem);
};

Painter.prototype.selectShape = function(shape){
	this.palette.selectShape(shape);
};

Painter.prototype.draftTo = function(point){
	var draftItem = this.context.getLastDraftItem();
	draftItem.update(point);
	this.context.clearDraftItems();
	this.context.addDraftItem(draftItem);
	return draftItem;
};

Painter.prototype.endDraft = function(point){
	this.isPainting = false;
	
	this.draftTo(point);	
	var draftItem = this.context.getLastDraftItem();
	var item = draftItem.undraftize();
	this.context.addItem(item);
	this.context.clearDraftItems();
	return item;
};

Painter.prototype.stopDrawing = function(){
	this.isPainting = false;
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