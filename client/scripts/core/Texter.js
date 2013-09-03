define('Texter', ['TexterEventHandler'], function(TexterEventHandler){


function Texter(palette, textInput){
	this.palette = palette;
	this.textInput = textInput;
}

Texter.prototype.getContext = function(){
	return this.textInput.getContext();
}

Texter.prototype.setEventHandler = function(handler){
	this.handler = handler;
};

Texter.prototype.notify = function(event){
	if (typeof this.handler.handle[event.name] == 'function') {
		this.handler.handle[event.name](this, event);
	}
};

Texter.prototype.enableEventHandling = function(eventBus){
	this.setEventHandler(new TexterEventHandler());
	this.eventBus = eventBus;
	this.eventBus.addListener(this);
};

Texter.prototype.startTexting = function(position) {
	this.isTexting = true;
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(position);
};

Texter.prototype.finishTexting = function(position) {
	this.isTexting = false;
	this.getTextInput().flush();
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	this.getTextInput().write(text);
	this.getTextInput().flush();
	this.textInput.remove();
};

Texter.prototype.draft = function(text){
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	this.getTextInput().append(text);
};

Texter.prototype.clear = function(text){
	this.textInput.remove();
};

return Texter;


});