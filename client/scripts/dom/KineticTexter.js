define('KineticTexter', ['Texter', 'KineticText', 'Context'], function(Painter, KineticText, Context){

function KineticTexter(palette, textInput){
	Painter.call(this, palette, textInput);
}

KineticTexter.prototype = new Painter();
KineticTexter.constructor = KineticTexter;

KineticTexter.prototype.finishTexting = function(position) {
	this.getContext().setMode(Context.MODE.IDLE);

	var item = this.getTextInput().flush();


	if (undefined != this.eventBus) {
		item.enableEventHandling(this.eventBus);
	}
};

return KineticTexter;

});