function PaletteFactory(){

}

PaletteFactory.create = function(){
	var palette;

	switch(Environment.name){
		case Environment.Dummy.name:
			palette = new Palette();
		break;
		case Environment.Mouse.name:
			palette = new DOMPalette("palette");
		break;
	}

	return palette;
}