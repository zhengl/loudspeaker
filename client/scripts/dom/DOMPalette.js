define('DOMPalette', ['Palette'], function(Palette){


function DOMPalette(element, cls) {
	this.element = element;
	
	var colors = document.querySelectorAll('.' + cls);
	
	var self = this;
	var setBackgroundColorAsColor = function(){
		var style = window.getComputedStyle(this);
		self.setColor(style.backgroundColor);
	};

	for(var i = 0; i < colors.length; i++) {
		colors[i].onclick = setBackgroundColorAsColor;
	}
}

DOMPalette.prototype = new Palette();
DOMPalette.prototype.constructor = DOMPalette;

return DOMPalette;

	
});

