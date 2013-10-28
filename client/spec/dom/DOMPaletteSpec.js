require(['DOMPalette'], function(DOMPalette){


describe('DOMPalette', function(){
	var palette;
	var paletteElement;
	var paletteRed;

	beforeEach(function(){
		paletteElement = document.createElement('div');
		
		paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		paletteElement.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		paletteElement.appendChild(paletteBlack);

		document.body.appendChild(paletteElement);
	});

	it("clicks a to select color", function(){
		palette = new DOMPalette(palette, 'palette-color');
		var event = createEvent('click');
		fireEvent(paletteRed, 'click', event);

		expect(palette.getColor()).toEqual('rgb(255, 0, 0)');		
	});

	afterEach(function(){
		document.body.removeChild(paletteElement);
	});
});


});