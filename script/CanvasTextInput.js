function CanvasTextInput(context){
	this.context = context;
	this.createDOMElement();
    this.text = new Text("");
}

CanvasTextInput.prototype = new TextInput();
CanvasTextInput.prototype.constructor = CanvasTextInput;

CanvasTextInput.prototype.createDOMElement = function() {
	this.element = document.createElement("input");
    this.element.type = "text";
    this.context.stage.getContainer().appendChild(this.element);

    this.element.style.position = "absolute";
    this.element.focus();
};

CanvasTextInput.prototype.enableEventHandling = function(text) {
	var self = this;
    this.element.onkeydown = function(event){
    	if(event.keyCode == 13) { // when press Enter
	        self.flush();
	    } else {
	    	self.text.setValue(self.element.value);
	    	self.write(self.text);
	    }
    };
};

CanvasTextInput.prototype.append = function(text) {
	this.getText().setValue(this.getText().getValue() + text.getValue());
	this.getText().setPosition(text.getPosition());

	this.context.clearDraftItems();
	var item = this.context.draft(this.getText());
	this.element.value = this.text.getValue();
	return item;
};

CanvasTextInput.prototype.write = function(text) {
	this.getText().setValue(text.getValue());
	this.getText().setPosition(text.getPosition());

	this.context.clearDraftItems();
	var item = this.context.draft(this.getText());
	this.element.value = this.text.getValue();
	return item;
};

CanvasTextInput.prototype.flush = function() {
	this.text.setValue(this.element.value);
	this.context.clearDraftItems();
	var item = this.context.write(this.getText());
	item.enableEventHandling();
	this.context.stage.getContainer().removeChild(this.element);
	delete this.element;
	return item;
};

CanvasTextInput.prototype.getText = function() {
	return this.text;
};

CanvasTextInput.prototype.setPosition = function(point){
	this.position = point;
	this.getText().setPosition(point);
	this.element.style.left = point.x + "px";
	this.element.style.top = point.y + "px";
};

CanvasTextInput.prototype.getPosition = function(){
	return this.position;
};