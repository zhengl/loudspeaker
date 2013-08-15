define('DOMPalette', ['Palette'], function(Palette){


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

DOMPalette.prototype.isHidden = function(){
	return this.element.style.visibility == "hidden";
};

DOMPalette.prototype.addColorButton = function(color){
	var button = document.createElement('button');
	button.id = "palette_" + color;
	var self = this;
	button.onclick = function(){
		self.setColor(color);
		self.hide();
	}

	this.element.appendChild(button);
};

DOMPalette.prototype.getColorButton = function(color){
	return document.getElementById("palette_" + color);
};

DOMPalette.prototype.hasColorButton = function(color){
	return undefined != this.getColorButton(color);
};

return DOMPalette;

	
});

