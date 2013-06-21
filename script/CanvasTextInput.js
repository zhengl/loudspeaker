function CanvasTextInput(containerId){
	this.canvasInput =  new CanvasInput();
}

CanvasTextInput.prototype = new TextInput();
CanvasTextInput.prototype.constructor = CanvasTextInput;

CanvasTextInput.prototype.write = function(text) {
	this.canvasInput.value(text);
};

CanvasTextInput.prototype.getText = function(text) {
	return this.canvasInput.value();
};