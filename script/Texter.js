function Texter(){

}

Texter.prototype.startTexting = function(point) {
	this.textInput = TextInputFactory.create(this.context);
	this.textInput.setPosition(point);
};

Texter.prototype.getTextInput = function() {
	return this.textInput;
};