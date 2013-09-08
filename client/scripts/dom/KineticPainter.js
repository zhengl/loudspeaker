define('KineticPainter', ['Painter', 'KineticLine', 'Context'], function(Painter, KineticLine, Context){

function KineticPainter(context, palette){
	Painter.call(this, context, palette);
}

KineticPainter.prototype = new Painter();
KineticPainter.constructor = KineticPainter;

KineticPainter.prototype.draw = function(item) {
	var kineticItem = new KineticLine(item.points);
	kineticItem.setColor(item.getColor());
	this.context.addItem(kineticItem);
	return kineticItem;
};

KineticPainter.prototype.draft = function(item) {
	var kineticItem = new KineticLine(item.points);
	kineticItem.setColor(item.getColor());
	this.context.addDraftItem(kineticItem);
	return kineticItem;
};

KineticPainter.prototype.endDraft = function(point){
	this.context.setMode(Context.MODE.IDLE);

	this.draftTo(point);	
	this.context.addItem(this.draftItem);
	this.context.clearDraftItems();

	if (undefined != this.eventBus) {
		item.enableEventHandling(this.eventBus);	
	}
};

return KineticPainter;

});