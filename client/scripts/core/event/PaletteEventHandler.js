define('PaletteEventHandler', ['Event'], function(Event){


function PaletteEventHandler(){
}

PaletteEventHandler.prototype.handle = {};

PaletteEventHandler.prototype.handle[Event.Page.START_SELECTING_COLOR] = function(palette, event){
	palette.setPosition(event.data.position);
	palette.show();
};

return PaletteEventHandler;

});