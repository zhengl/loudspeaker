function DOMPalette(elementId) {
	this.element = document.getElementById(elementId);
	this.hide();
}

DOMPalette.prototype = new Palette();
DOMPalette.prototype.constructor = DOMPalette;

DOMPalette.prototype.setPosition = function(point){
	this.position = point;
    this.element.style.position = "absolute";
    this.element.style.left = point.x + "px";
	this.element.style.top = point.y + "px";
};

DOMPalette.prototype.getPosition = function(){
	return this.position;
};

DOMPalette.prototype.show = function(){
	this.element.style.visibility = "visible";
};

DOMPalette.prototype.hide = function(){
	this.element.style.visibility = "hidden";
};

