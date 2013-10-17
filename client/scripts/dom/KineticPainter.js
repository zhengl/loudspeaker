define('KineticPainter', ['Painter'], function(Painter){

function KineticPainter(lineClass, context, palette){	
	Painter.call(this, lineClass, context, palette);
}

KineticPainter.prototype = new Painter();
KineticPainter.constructor = KineticPainter;

KineticPainter.prototype.draw = function(item) {
	var kineticItem = new this.lineClass(item.points);
	kineticItem.setColor(item.getColor());
	this.context.addItem(kineticItem);
};

KineticPainter.prototype.draft = function(item) {
	var kineticItem = new this.lineClass(item.points);
	kineticItem.setColor(item.getColor());
	this.context.addDraftItem(kineticItem);
};

KineticPainter.prototype.endDraft = function(point){
	this.draftTo(point);
	this.context.addItem(this.draftItem);
	this.context.clearDraftItems();

	this.draftItem.enableEventHandling();
};

return KineticPainter;

});