var Environment = {
	Dummy: {
		name: "Dummy"
	},
	Mouse: {
		name: "Mouse",
		containerId: "board",
		containerWidth: 500,
		containerHeight: 500,
		layerId: "layer",
		draftLayerId: "draftLayerId",
	},
	Touch: {
		name: "Touch"
	}
};

Environment.setDummy = function(){
	this.name = this.Dummy.name;
	this.Mouse.containerWidth = 50;
	this.Mouse.containerHeight = 50;
};

Environment.setMouse = function(){
	this.name = this.Mouse.name;
};

Environment.setTouch = function(){
	this.name = this.Touch.name;
};
