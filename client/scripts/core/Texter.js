define('Texter', function(){


function Texter(palette, textInput){
	this.palette = palette;
	this.textInput = textInput;
}

Texter.prototype.startTexting = function(position) {
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(position);
	this.isTexting = true;
};

Texter.prototype.finishTexting = function(position) {
	this.isTexting = false;
	var item = this.getTextInput().flush();
	return item;
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.textInput.show();
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	this.getTextInput().write(text);
	var item = this.getTextInput().flush();
	this.textInput.remove();
	return item;
};

Texter.prototype.draft = function(text){
	this.textInput.setColor(this.palette.getColor());
	this.textInput.setPosition(text.getPosition());
	return this.getTextInput().append(text);
};

Texter.prototype.clear = function(text){
	this.textInput.remove();
};

return Texter;


});