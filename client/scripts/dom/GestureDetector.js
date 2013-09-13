define('GestureDetector', function(){


function GestureDetector(step){
	this.currentCandidateSteps = [step];
	this.rootSteps = this.currentCandidateSteps;
}

GestureDetector.prototype.detect = function(event) {
	for(var i = 0; i < this.currentCandidateSteps.length; i++){
		if(this.currentCandidateSteps[i].event == event.type) {
			var currentCandidateStep = this.currentCandidateSteps[i];
			currentCandidateStep.action.call(this, event);
			this.currentCandidateSteps = currentCandidateStep.getNextSteps();
		}
	}
};

GestureDetector.prototype.getCurrentCandidateSteps = function() {
	return this.currentCandidateSteps;
};

GestureDetector.prototype.rewind = function() {
	this.currentCandidateSteps = this.rootSteps;
};

return GestureDetector;

});