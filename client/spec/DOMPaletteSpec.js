require(['DOMPalette'], function(DOMPalette){


describe('Palette', function(){
	var palette;

	beforeEach(function(){
	});

	it("add color button", function(){
		var body = document.getElementsByTagName('body')[0];
		var palette = document.createElement('div');
		palette.id = "palette";
		body.appendChild(palette);		

		palette = new DOMPalette("palette");
		palette.addColorButton('red');
		expect(palette.hasColorButton('red')).toBe(true);

		palette.getColorButton('red').click();
		expect(palette.isHidden()).toBe(true);
	});
});


});