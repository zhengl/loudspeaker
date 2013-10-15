define('Palette', function(){


function Palette(){
}

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

Palette.prototype.setColor = function(color){
	this.color = color;
};

Palette.prototype.getColor = function(){
	return this.color || 'black';
};

return Palette;


});