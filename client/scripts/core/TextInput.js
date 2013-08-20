define('TextInput', function(){


function TextInput(context){
	this.context = context;
}

TextInput.prototype.write = function(text) {
	this.text = text;
	this.context.clearDraftItems();
	return this.context.draft(this.getText());
};

TextInput.prototype.append = function(text) {
	var item;

	if (undefined == this.text) {
		item = this.write(text);
	} else {
		this.text.setValue(this.text.getValue() + text.getValue());
		item = this.write(this.text);
	}

	return item;
};

TextInput.prototype.flush = function() {
	this.context.clearDraftItems();
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

TextInput.prototype.show = function(){
};

TextInput.prototype.remove = function(){
};

TextInput.prototype.setColor = function(color){
	this.color = color;
};

return TextInput;


});