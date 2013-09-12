define('GestureDetector', function(){


function GestureDetector(step){
	this.currentStep = step;
}

GestureDetector.prototype.detect = function(event) {
	if(this.currentStep.event = event) {
		this.currentStep.action();
		this.currentStep = this.currentStep.getNext();
	}
};

return GestureDetector;

});