define('PaletteEventHandler', ['Event'], function(Event){


function PaletteEventHandler(){
}

PaletteEventHandler.prototype.handle = {};

PaletteEventHandler.prototype.handle[Event.Page.START_SELECTING_COLOR] = function(palette, event){
	palette.setPosition(event.data[0]);
	palette.show();
};

return PaletteEventHandler;

});