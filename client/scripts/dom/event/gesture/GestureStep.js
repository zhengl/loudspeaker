define('GestureStep', function(){

function GestureStep(event, action){
	this.event = event;
	this.action = action;
	this.nextSteps = [];
}

GestureStep.prototype.addNextStep = function(step) {
	this.nextSteps.push(step);
};

GestureStep.prototype.getNextSteps = function() {
	return this.nextSteps;
};


return GestureStep;

});