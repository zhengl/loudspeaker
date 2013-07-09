function TextInput(){
	Item.call(this);
}

TextInput.prototype = new Item();
TextInput.prototype.constructor = TextInput;

TextInput.prototype.write = function(text) {
	this.text = text;
};

TextInput.prototype.flush = function(text) {
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