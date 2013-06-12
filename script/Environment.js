var Environment = {
	Dummy: {
		name: "Dummy"
	},
	Mouse: {
		name: "Mouse",
		containerId: "board",
		containerWidth: 50,
		containerHeight: 50
	},
	Touch: {
		name: "Touch"
	}
};

Environment.setDummy = function(){
	this.name = this.Dummy.name;
};

Environment.setMouse = function(){
	this.name = this.Mouse.name;
};

Environment.setTouch = function(){
	this.name = this.Touch.name;
};
