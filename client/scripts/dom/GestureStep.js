define('GestureStep', function(){

function GestureStep(event, action){
	this.event = event;
	this.action = action;
}

GestureStep.prototype.setNext = function(step) {
	this.next = step;
};

GestureStep.prototype.getNext = function() {
	return this.next;
};


return GestureStep;

});