define('KineticPainter', ['Painter', 'KineticLine'], function(Painter, KineticLine){

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

return KineticPainter;

});