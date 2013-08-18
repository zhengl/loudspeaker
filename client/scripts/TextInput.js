define('TextInput', function(){


function TextInput(context){
	this.context = context;
}

TextInput.prototype.write = function(text) {
	this.text = text;
};

TextInput.prototype.append = function(text) {
	if (undefined == this.text) {
		this.write(text);
	} else {
		this.text.setValue(this.text.getValue + text.getValue());
	}
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

TextInput.prototype.setColor = function(color){
	this.color = color;
};

return TextInput;


});