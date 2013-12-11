define('DOMPalette', ['Palette', 'Event'], function(Palette, Event){


DOMPalette.prototype = new Palette();
DOMPalette.prototype.constructor = DOMPalette;

function DOMPalette(element, cls) {
	this.element = element;
	
	var colors = document.querySelectorAll('.' + cls);
	
	var self = this;
	var setBackgroundColorAsColor = function(){
		var style = window.getComputedStyle(this);
		self.getEventBus().publish(new Event(Event.Palette.SELECT_COLOR, { color: style.backgroundColor }));

	};

	for(var i = 0; i < colors.length; i++) {
		colors[i].onclick = setBackgroundColorAsColor;
	}
}

return DOMPalette;

	
});

