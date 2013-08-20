define('KineticText', ['Kinetic', 'Text', 'KineticItemEventRegister'], function(Kinetic, Text, KineticItemEventRegister){


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

KineticText.prototype.getKineticShape = function(){
	return this.kineticShape;
};

KineticText.prototype.moveTo = function(newPosition){
	this.position = newPosition;
	this.getKineticShape().setPosition(newPosition.x, newPosition.y);
};

KineticText.prototype.draftize = function(){
	return this;
};

KineticText.prototype.undraftize = function(){
	return this;
};

KineticText.prototype.setEventBus = function(eventBus){
	this.eventBus = eventBus;
};

KineticText.prototype.registerEventBus = function(eventBus){
	var register = new KineticItemEventRegister();
	register.registerEventBus(eventBus, this);
};

return KineticText;


});
