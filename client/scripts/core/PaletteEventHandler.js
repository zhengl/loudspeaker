define('PaletteEventHandler', ['Event'], function(Event){


function PaletteEventHandler(){
}

PaletteEventHandler.prototype.handle = {};

PaletteEventHandler.prototype.handle[Event.Page.FINISH_MOVING] = function(palette, event){
	if ((event.name == Event.Page.FINISH_MOVING || event.name == Event.Page.MOVE_TO) && this.isInside(event.data[0])) {
		this.open();
	}
};

return PaletteEventHandler;

});