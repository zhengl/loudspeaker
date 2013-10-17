define('Palette', function(){


function Palette(){
}

Palette.prototype.setColor = function(color){
	this.color = color;
};

Palette.prototype.getColor = function(){
	return this.color || 'black';
};

return Palette;


});