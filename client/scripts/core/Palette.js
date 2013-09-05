define('Palette', ['EventHandleable', 'PaletteEventHandler'], function(EventHandleable, PaletteEventHandler){


function Palette(){
}

Palette.prototype = new EventHandleable(new PaletteEventHandler());
Palette.prototype.constructor = Palette;

Palette.prototype.setPosition = function(point){
	this.position = point;
};

Palette.prototype.getPosition = function(){
	return this.position;
};

Palette.prototype.show = function(){
};

Palette.prototype.hide = function(){
};

Palette.prototype.setColor = function(color){
	this.color = color;
};

Palette.prototype.getColor = function(color){
	return this.color || 'black';
};

return Palette;


});