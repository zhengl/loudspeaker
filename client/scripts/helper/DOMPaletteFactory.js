define("DOMPaletteFactory", ["DOMPalette"], function(DOMPalette){


function DOMPaletteFactory(){

}

DOMPaletteFactory.create = function(paletteId){
	var palette = new DOMPalette(paletteId);
	palette.addColorButton('red');
	palette.addColorButton('blue');
	palette.addColorButton('black');

	return palette;
}

return DOMPaletteFactory;


});