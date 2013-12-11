define('Palette', ['EventHandleable', 'PaletteEventHandler'], function(EventHandleable, PaletteEventHandler){


function Palette(){
}

Palette.prototype = new EventHandleable(new PaletteEventHandler());
Palette.prototype.constructor = Palette;

Palette.prototype.setColor = function(color){
	this.color = color;
};

Palette.prototype.getColor = function(){
	return this.color || 'black';
};

return Palette;


});