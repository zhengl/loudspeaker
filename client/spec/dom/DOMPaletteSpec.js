require(['DOMPalette', 'EventBus'], function(DOMPalette, EventBus){


describe('DOMPalette', function(){
	var palette;
	var paletteElement;
	var eventBus;

	beforeEach(function(){
		paletteElement = createPaletteElement();
		document.body.appendChild(paletteElement);
		palette = new DOMPalette(paletteElement, 'palette-color');

		eventBus = new EventBus();
		palette.enableEventHandling(eventBus);
	});

	it("clicks a to select color", function(){
		var event = createEvent('click');
		var paletteRed = paletteElement.children[0];
		fireEvent(paletteRed, 'click', event);

		expect(palette.getColor()).toEqual('rgb(255, 0, 0)');		
	});

	afterEach(function(){
		document.body.removeChild(paletteElement);
	});

	function createPaletteElement(){
		var paletteElement = document.createElement('div');
		
		var paletteRed = document.createElement('a');
		paletteRed.className = "palette-color palette_red";
		paletteRed.style.backgroundColor = 'red';
		paletteElement.appendChild(paletteRed);

		var paletteBlack = document.createElement('a');
		paletteBlack.className = "palette-color palette-black";
		paletteBlack.style.backgroundColor = 'black';
		paletteElement.appendChild(paletteBlack);

		return paletteElement;
	}
});


});