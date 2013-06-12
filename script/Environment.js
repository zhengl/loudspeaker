var Environment = {
	Dummy: "Dummy",
	Mouse: "Mouse",
	Touch: "Touch"
};

Environment.setDummy = function(){
	this.name = this.Dummy;
};

Environment.setMouse = function(){
	this.name = this.Mouse;
};

Environment.setTouch = function(){
	this.name = this.Touch;
};
