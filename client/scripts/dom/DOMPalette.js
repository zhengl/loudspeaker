define('DOMPalette', ['Palette'], function(Palette){


function DOMPalette(element) {
	this.element = element;
	
	var colors = document.querySelectorAll('.palette-color');
	
	var self = this;
	for(var i = 0; i < colors.length; i++) {
		colors[i].onclick = function(){
			self.setColor(this.style.backgroundColor);
		}
	}
}

DOMPalette.prototype = new Palette();
DOMPalette.prototype.constructor = DOMPalette;

return DOMPalette;

	
});

