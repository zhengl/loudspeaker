function TextInput(context){
	this.context = context;
}

TextInput.prototype = new Item();
TextInput.prototype.constructor = TextInput;

TextInput.prototype.write = function(text) {
	this.text = text;
};

TextInput.prototype.flush = function() {
	return this.context.write(this.getText(), this.getPosition());
};

TextInput.prototype.getText = function() {
	return this.text;
};

TextInput.prototype.setPosition = function(point){
	this.position = point;
};

TextInput.prototype.getPosition = function(){
	return this.position;
};

TextInput.prototype.remove = function(){
};