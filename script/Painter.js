function Painter(context){
	this.context = context;
	this.palette = new Palette();
}

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

// Painter.prototype.selectText = function(){
// 	this.isTextingSelected = true;
// };

// Painter.prototype.selectDrawing = function(){
// 	this.isPaintingSelected = true;
// };

// Painter.prototype.paintingSelected = function() {
// 	return this.isPaintingSelected;
// };

// Painter.prototype.textingSelected = function() {
// 	return this.isTextingSelected;
// };

// Painter.prototype.startTexting = function(point) {
// 	this.textInput = TextInputFactory.create(this.context);
// 	this.textInput.setPosition(point);
// };

// Painter.prototype.getTextInput = function(){
// 	return this.textInput;
// };

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