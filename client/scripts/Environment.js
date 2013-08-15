define('Environment', function(){


var Environment = {
	Dummy: {
		name: "Dummy",
	},
	Mouse: {
		name: "Mouse",
	},
	Touch: {
		name: "Touch"
	}
};

Environment.setDummy = function(){
	this.name = "Dummy";
	this.containerWidth = 50;
	this.containerHeight = 50;
};

Environment.setMouse = function(){
	this.name = "Mouse";
	this.containerId = "board";
	this.containerWidth = 500;
	this.containerHeight = 500;
};

Environment.setTouch = function(){
	this.name = "Touch";
};

return Environment;

	
});