define('KineticText', ['Kinetic', 'Text', 'Event'], function(Kinetic, Text, Event){


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

KineticText.prototype.enableEventHandling = function(eventBus){
	var self = this;
	this.getKineticShape().on(Event.Kinetic.EVENTS.join(" "), function(event){
		event.targetItem = self;
	});

	this.setEventHandler(this.getEventHandler());
	this.eventBus = eventBus;
	this.eventBus.addListener(this);	
};

return KineticText;


});
