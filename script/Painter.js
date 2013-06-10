function Painter(context){
	this.context = context;
	this.palette = new Palette();
}

Painter.prototype.setPage = function(page){
	this.page = page;
};

Painter.prototype.draw = function(item){
	item.setPage(this.page);
	return this.context.draw(item);
};

Painter.prototype.draft = function(item){
	item.setPage(this.page);
	return this.context.draft(item);
};

Painter.prototype.startDraft = function(point){
	this.isPainting = true;
	this.context.startDraft(this.palette.getShape(), point);
};

Painter.prototype.selectShape = function(shape){
	this.palette.selectShape(shape);
};

Painter.prototype.draftTo = function(point){
	this.context.draftTo(point);
};

Painter.prototype.endDraft = function(point){
	this.isPainting = false;
	this.draftTo(point);
	this.context.undraftize();
};

Painter.prototype.stopDrawing = function(){
	this.isPainting = false;
	this.context.clearDraftItems();
};