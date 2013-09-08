define('Texter', ['EventHandleable', 'TexterEventHandler', 'Context'], function(EventHandleable, TexterEventHandler, Context){


function Texter(palette, textInput){
	this.palette = palette;
	this.textInput = textInput;
}

Texter.prototype = new EventHandleable(new TexterEventHandler());
Texter.prototype.constructor = Texter;

Texter.prototype.getContext = function(){
	return this.textInput.getContext();
}

Texter.prototype.startTexting = function(position) {
	this.getContext().setMode(Context.MODE.TEXTING);

	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(position);
};

Texter.prototype.finishTexting = function(position) {
	this.getContext().setMode(Context.MODE.IDLE);

	this.textInput.hide();
	this.textInput.flush();
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	this.textInput.write(text);
	this.textInput.flush();
	this.textInput.hide();
};

Texter.prototype.draft = function(text){
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	this.textInput.append(text);
	this.textInput.hide();
};

Texter.prototype.clear = function(text){
	this.textInput.hide();
};

return Texter;


});