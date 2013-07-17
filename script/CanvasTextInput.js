function CanvasTextInput(context){
	this.context = context;

	this.element = document.createElement("input");
    this.element.type = "text";
    this.context.stage.getContainer().appendChild(this.element);

    this.element.style.position = "absolute";
    this.element.focus();
}

CanvasTextInput.prototype = new TextInput();
CanvasTextInput.prototype.constructor = CanvasTextInput;

CanvasTextInput.prototype.enableEventHandling = function(text) {
	var self = this;
    this.element.onkeydown = function(event){
    	if(event.keyCode == 13) { // when press Enter
	        self.flush();
	    }
    };
};

CanvasTextInput.prototype.write = function(text) {
	this.text = text;
	var item = this.context.draft(this.getText(), this.getPosition());
	this.element.value = text.getValue();
	return item;
};

CanvasTextInput.prototype.flush = function() {
	this.text = new Text(this.element.value);
	var item = this.context.write(this.getText(), this.getPosition());
	item.registerEventTrigger();
	this.context.stage.getContainer().removeChild(this.element);
	delete this.element;
	return item;
};

CanvasTextInput.prototype.getText = function() {
	return this.text;
};

CanvasTextInput.prototype.setPosition = function(point){
	this.position = point;
	this.element.style.left = point.x + "px";
	this.element.style.top = point.y + "px";
};

CanvasTextInput.prototype.getPosition = function(){
	return this.position;
};