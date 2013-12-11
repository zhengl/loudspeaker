define('PaletteEventHandler', ['Event'], function(Event){


function PaletteEventHandler(){
}

PaletteEventHandler.prototype.handle = {};

PaletteEventHandler.prototype.handle[Event.Palette.SELECT_COLOR] = function(palette, event){
	palette.setColor(event.data.color);
};

return PaletteEventHandler;

});