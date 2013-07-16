function Texter(context){
	this.context = context;
	this.textInput = TextInputFactory.create(this.context);
}

Texter.prototype.startTexting = function(point) {
	this.textInput.setPosition(point);
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.getTextInput().write(text);
	return this.getTextInput().flush();
};