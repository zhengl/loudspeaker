define('KineticText', ['Kinetic', 'Text', 'MouseEvent'], function(Kinetic, Text, Event){


function KineticText(text){
	this.kineticShape = new Kinetic.Text({
		text: text,
		fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
	});
}

KineticText.prototype = new Text();
KineticText.prototype.constructor = KineticText;

KineticText.prototype.addTo = function(context) {
	this.undraftize();
	context.getItems().push(this);
	this.getKineticShape().moveTo(context.getItemGroup());
	context.getLayer().draw();
	context.getDraftLayer().draw();
};

KineticText.prototype.addDraftTo = function(context) {
	this.draftize();
	context.getDraftItems().push(this);
	this.getKineticShape().moveTo(context.getDraftLayer());
	context.getLayer().draw();
	context.getDraftLayer().draw();
};

KineticText.prototype.remove = function() {
	this.getKineticShape().remove();
};

KineticText.prototype.setColor = function(color){
	this.getKineticShape().setFill(color);
};

KineticText.prototype.getColor = function(){
	return this.getKineticShape().getFill();
};

KineticText.prototype.setValue = function(text){
	this.getKineticShape().setText(text);
};

KineticText.prototype.getValue = function(){
	return this.getKineticShape().getText();
};

KineticText.prototype.getKineticShape = function(){
	return this.kineticShape;
};

KineticText.prototype.setPosition = function(newPosition){
	this.position = newPosition;
	this.getKineticShape().setPosition(newPosition.x, newPosition.y);
};

KineticText.prototype.moveTo = function(newPosition){
	this.position = newPosition;
	this.getKineticShape().setPosition(newPosition.x, newPosition.y);
	this.getKineticShape().getLayer().draw();
};

KineticText.prototype.draftize = function(){
	return this;
};

KineticText.prototype.undraftize = function(){
	return this;
};

KineticText.prototype.enableEventHandling = function(){
	var self = this;
	this.getKineticShape().on(Event.Mouse.EVENTS.join(' '), function(event){
		event.targetItem = self;
	});
};

return KineticText;


});
