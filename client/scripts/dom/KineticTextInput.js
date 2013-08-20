define('KineticTextInput', ['Point', 'Text', 'TextInput', 'KineticCursor', 'Event'], function(Point, Text, TextInput, KineticCursor, Event){


function KineticTextInput(context){
	this.context = context;
    this.text = new Text("");
}

KineticTextInput.prototype = new TextInput();
KineticTextInput.prototype.constructor = KineticTextInput;

KineticTextInput.prototype.show = function(){
	this.initializeDOMElement(this.context);
    this.initializeCursor(this.context);
    this.enableEventHandling();
};

KineticTextInput.prototype.setColor = function(color){
	this.text.setColor(color);
};

KineticTextInput.prototype.initializeCursor = function(context){
	this.cursor = new KineticCursor(context);
};

KineticTextInput.prototype.initializeDOMElement = function(context){
	this.element = this.createDOMElement();
    context.stage.getContainer().appendChild(this.element);
    this.element.focus();
};

KineticTextInput.prototype.createDOMElement = function() {
	var element = document.createElement("input");
   	element.type = "text";
    element.style.background = "transparent";
    element.style.border = "none";
    element.style.position = "absolute";
    element.style.left = "-1000px";
	element.style.top = "0px";
	return element;
};

KineticTextInput.prototype.adjustCursor = function() {
	var textPosition = this.getText().getPosition();
	var textWidth = this.context.getLastDraftItem().getKineticShape().getWidth();
	this.cursor.setPosition(new Point(
		textPosition.x + textWidth + 2, 
		textPosition.y
		));
};

KineticTextInput.prototype.enableEventHandling = function() {
	var self = this;
    this.element.onkeydown = function(event){
    	if(event.keyCode == 13) { // when press Enter
	        self.context.getEventBus().publish(
				new Event(Event.Page.FINISH_TEXTING)
	        	);
	    } else {
	    	window.setTimeout(function(){
	    		self.text.setValue(self.element.value);
	    		self.write(self.text);
	    		self.adjustCursor();
	    	}, 1);
	    }
    };
};

KineticTextInput.prototype.append = function(text) {
	var item = this.draftToContext(this.getText().getValue() + text.getValue(), text.getPosition());
	this.element.value = this.text.getValue();
	return item;
};

KineticTextInput.prototype.write = function(text) {
	var item = this.draftToContext(text.getValue(), text.getPosition());
	this.element.value = this.text.getValue();
	return item;
};

KineticTextInput.prototype.draftToContext = function(value, point){
	this.getText().setValue(value);
	this.getText().setPosition(point);

	this.context.clearDraftItems();
	var item = this.context.draft(this.getText());
	return item;
}

KineticTextInput.prototype.flush = function() {
	this.text.setValue(this.element.value);
	this.remove();
	var item = this.context.write(this.getText());
	return item;
};

KineticTextInput.prototype.getText = function() {
	return this.text;
};

KineticTextInput.prototype.setPosition = function(point){
	this.position = point;
	this.getText().setPosition(point);
	this.cursor.setPosition(point);
};

KineticTextInput.prototype.getPosition = function(){
	return this.position;
};

KineticTextInput.prototype.removeCursor = function(){
	if(undefined != this.cursor){
		this.cursor.destroy();
	}
};

KineticTextInput.prototype.remove = function(){
	this.context.clearDraftItems();
	this.removeCursor();
};

return KineticTextInput;


});