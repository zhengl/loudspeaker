require(['DOMPalette'], function(DOMPalette){


describe('DOMPalette', function(){
	var palette;

	beforeEach(function(){
	});

	it("clicks a to select color", function(){
		var body = document.getElementsByTagName('body')[0];
		var paletteElement = document.createElement('div');
		
		var paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		paletteElement.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		paletteElement.appendChild(paletteBlack);

		body.appendChild(paletteElement);

		palette = new DOMPalette(palette, 'palette-color');
		var event = createEvent('click');
		fireEvent(paletteRed, 'click', event);

		expect(palette.getColor()).toEqual('rgb(255, 0, 0)');		
	});
});


});