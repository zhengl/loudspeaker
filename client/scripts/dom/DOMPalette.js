define('DOMPalette', ['Palette', 'jquery'], function(Palette, $){


function DOMPalette(element) {
	this.element = element;
	var self = this;
	$('.palette-color', $(this.element)).each(function(i, color){
		$(color).click(function(){
			self.setColor($(this).css('background-color'));
		});
	});
}

DOMPalette.prototype = new Palette();
DOMPalette.prototype.constructor = DOMPalette;

return DOMPalette;

	
});

