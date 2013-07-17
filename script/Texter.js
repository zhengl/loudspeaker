function Texter(context){
	this.context = context;
}

Texter.prototype.startTexting = function(position) {
	this.textInput = TextInputFactory.create(this.context);
	this.textInput.setPosition(position);
	this.isTexting = true;
};

Texter.prototype.finishTexting = function(position) {
	this.isTexting = false;
	return this.getTextInput().flush();
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
	return this.getTextInput().append(text);
};