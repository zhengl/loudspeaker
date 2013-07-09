function Texter(context){
	this.context = context;
}

Texter.prototype.startTexting = function(point) {
	this.textInput = TextInputFactory.create(this.context);
	this.textInput.setPosition(point);
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.getTextInput().write(text);
	this.getTextInput().flush();
};