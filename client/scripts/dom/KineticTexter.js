define('KineticTexter', ['Texter', 'KineticText', 'Context'], function(Texter, KineticText, Context){

function KineticTexter(palette, textInput){
	Texter.call(this, palette, textInput);
}

KineticTexter.prototype = new Texter();
KineticTexter.constructor = KineticTexter;

KineticTexter.prototype.finishTexting = function(position) {
	var item = this.getTextInput().flush();

	if(undefined != this.eventBus){
		item.enableEventHandling(this.eventBus);	
	}
};

return KineticTexter;

});