function Painter(context){
	this.context = context;
	this.palette = new Palette();
}

Painter.prototype.setPage = function(page){
	this.page = page;
};

Painter.prototype.draw = function(item){
	return this.context.draw(item);
};

Painter.prototype.draft = function(item){
	return this.context.draft(item);
};

Painter.prototype.startDraft = function(point){
	this.isPainting = true;
	return this.context.startDraft(this.palette.getShape(), point);
};

Painter.prototype.selectShape = function(shape){
	this.palette.selectShape(shape);
};

Painter.prototype.draftTo = function(point){
	return this.context.draftTo(point);
};

Painter.prototype.endDraft = function(point){
	this.isPainting = false;
	this.draftTo(point);
	return this.context.undraftize();
};

Painter.prototype.stopDrawing = function(){
	this.isPainting = false;
	this.context.clearDraftItems();
};