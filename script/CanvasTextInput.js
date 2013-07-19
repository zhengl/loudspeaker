function CanvasTextInput(context){
	this.context = context;
	this.createDOMElement();
	this.createCursor();
    this.text = new Text("");
}

CanvasTextInput.prototype = new TextInput();
CanvasTextInput.prototype.constructor = CanvasTextInput;

CanvasTextInput.prototype.createDOMElement = function() {
	this.element = document.createElement("input");
    this.element.type = "text";
    this.element.style.background = "transparent";
    this.element.style.border = "none";
    // this.element.style.fontSize = "30px";
    // this.element.style.fontFamily = "Calibri";
    // this.element.style.margin = "0px 0px 0px 0px";
    // this.element.style.padding = "0px 0px 0px 0px";
    this.element.style.left = "-1000px";
	this.element.style.top = "0px";
    this.context.stage.getContainer().appendChild(this.element);

    this.element.style.position = "absolute";
    this.element.focus();
};

CanvasTextInput.prototype.createCursor = function() {
	this.cursor = new Kinetic.Line({
        points: [0, 0, 0, 30],
        stroke: 'black',
        strokeWidth: 2,
    });
    this.context.layer.add(this.cursor);
    this.context.layer.draw();

    var self = this;
    var total = 0;
    var period = 500;
    var anim = new Kinetic.Animation(function(frame) {
    	if (frame.time > period + total) {
        	self.cursor.setOpacity(self.cursor.getOpacity() == 1 ? '0' : '1');
    		total += period;
    	}
    }, this.context.layer);

    anim.start();
};

CanvasTextInput.prototype.adjustCursor = function() {
	var textPosition = this.getText().getPosition();
	var textWidth = this.context.getLastDraftItem().getKineticShape().getWidth();
	this.cursor.setPosition(textPosition.x + textWidth + 2, textPosition.y);
};

CanvasTextInput.prototype.enableEventHandling = function(text) {
	var self = this;
    this.element.onkeyup = function(event){
    	if(event.keyCode == 13) { // when press Enter
	        self.context.getEventBus().publish(
				new AbstractEvent(Page.Event.FINISH_TEXTING)
	        	);
	    } else {
	    	self.text.setValue(self.element.value);
	    	self.write(self.text);
	    	self.adjustCursor();
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
	if (undefined != this.context.getEventBus()) {
		item.registerEventBus(this.context.getEventBus());
	}
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
	this.cursor.setPosition(point.x, point.y);
};

CanvasTextInput.prototype.getPosition = function(){
	return this.position;
};