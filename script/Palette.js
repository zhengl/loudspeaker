function Palette(){
}

Palette.prototype.selectShape = function(shape){
	this.shape = shape;
};

Palette.prototype.getShape = function(shape){
	return this.shape;
};

Palette.Shape = {
	Line: "Line"
};