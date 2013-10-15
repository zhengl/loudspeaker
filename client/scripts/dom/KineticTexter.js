define('KineticTexter', ['Texter', 'KineticText', 'Context'], function(Texter, KineticText, Context){

function KineticTexter(palette, textInput){
	Texter.call(this, palette, textInput);
}

KineticTexter.prototype = new Texter();
KineticTexter.constructor = KineticTexter;

KineticTexter.prototype.finishTexting = function() {
	this.getTextInput().hide();
	var item = this.getTextInput().flush();

	item.enableEventHandling();
};

return KineticTexter;

});