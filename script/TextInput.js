function TextInput(){
	Item.call(this);
}

TextInput.prototype = new Item();
TextInput.prototype.constructor = TextInput;

TextInput.prototype.write = function(text) {
	this.text = text;
};

TextInput.prototype.getText = function() {
	return this.text;
};