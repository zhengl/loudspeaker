define('KineticTexter', ['Texter', 'KineticText'], function(Painter, KineticText){

function KineticTexter(palette, textInput){
	Painter.call(this, palette, textInput);
}

KineticTexter.prototype = new Painter();
KineticTexter.constructor = KineticTexter;

KineticTexter.prototype.write = function(item) {
	var kineticItem = new KineticText(item.getValue());
	kineticItem.moveTo(item.getPosition());
	kineticItem.setColor(item.getColor());

	this.textInput.getContext().addItem(kineticItem);
	return kineticItem;
};

KineticTexter.prototype.draft = function(item) {
	var kineticItem = new KineticText(item.getValue());
	kineticItem.moveTo(item.getPosition());
	kineticItem.setColor(item.getColor());
	kineticItem.draftize();

	this.textInput.getContext().addDraftItem(kineticItem);
	return kineticItem;
};

return KineticTexter;

});