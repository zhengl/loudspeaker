define('Palette', ['PaletteEventHandler'], function(PaletteEventHandler){


function Palette(){
}

Palette.prototype.setEventHandler = function(handler){
	this.handler = handler;
};

Palette.prototype.notify = function(event){
	if (typeof this.handler.handle[event.name] == 'function') {
		this.handler.handle[event.name](this, event);
	}
};

Palette.prototype.enableEventHandling = function(eventBus){
	this.setEventHandler(new PaletteEventHandler());
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};


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