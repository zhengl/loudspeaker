define('KineticPainter', ['Painter'], function(Painter){

function KineticPainter(context, palette){
	Painter.call(this, context, palette);
}

KineticPainter.prototype = new Painter();
KineticPainter.constructor = KineticPainter;

return KineticPainter;

});