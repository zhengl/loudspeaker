function Texter(context){
	this.context = context;
	this.textInput = TextInputFactory.create(this.context);
}

Texter.prototype.startTexting = function(position) {
	this.textInput.setPosition(position);
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};

Texter.prototype.write = function(text){
	this.textInput.setPosition(text.getPosition());
	this.getTextInput().write(text);
	return this.getTextInput().flush();
};

Texter.prototype.draft = function(text){
	this.textInput.setPosition(text.getPosition());
	return this.getTextInput().write(text);
};