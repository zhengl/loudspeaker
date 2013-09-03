define('KineticTexter', ['Texter', 'KineticText'], function(Painter, KineticText){

function KineticTexter(palette, textInput){
	Painter.call(this, palette, textInput);
}

KineticTexter.prototype = new Painter();
KineticTexter.constructor = KineticTexter;


return KineticTexter;

});