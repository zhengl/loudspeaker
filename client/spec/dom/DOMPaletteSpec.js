require(['DOMPalette', 'jquery'], function(DOMPalette, $){


describe('DOMPalette', function(){
	var palette;

	beforeEach(function(){
	});

	it("clicks a to select color", function(){
		var body = document.getElementsByTagName('body')[0];
		var palette = document.createElement('div');
		
		var paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		palette.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		palette.appendChild(paletteBlack);

		body.appendChild(palette);

		palette = new DOMPalette(palette);
		$(paletteRed).trigger('click');

		expect(palette.getColor()).toEqual('rgb(255, 0, 0)');		
	});
});


});