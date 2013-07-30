function Palette(){
}

Palette.prototype.getShape = function(shape){
	return "Line";
};

Palette.prototype.setPosition = function(point){
	this.position = point;
};

Palette.prototype.getPosition = function(){
	return this.position;
};

Palette.prototype.show = function(){
};

Palette.prototype.hide = function(){
};