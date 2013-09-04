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
	kineticItem.draftize();

	this.context.addDraftItem(kineticItem);
	return kineticItem;
};

KineticPainter.prototype.startDraft = function(point){
	this.context.setMode(Context.MODE.PAINTING);

	var draftItem = new KineticLine();
	draftItem.update(point);
	draftItem.setColor(this.palette.getColor());
	draftItem.draftize();
	this.context.addDraftItem(draftItem);
};

KineticPainter.prototype.endDraft = function(point){
	this.context.setMode(Context.MODE.IDLE);

	this.draftTo(point);	
	var draftItem = this.context.getLastDraftItem();
	var item = draftItem.undraftize();
	this.context.addItem(item);
	this.context.clearDraftItems();

	if (undefined != this.eventBus) {
		item.enableEventHandling(this.eventBus);	
	}
};

return KineticPainter;

});