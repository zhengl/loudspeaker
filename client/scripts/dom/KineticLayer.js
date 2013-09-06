define('KineticLayer', ['Kinetic'], function(){


function KineticLayer(){
	this.items = [];
}

KineticLayer.prototype = new Kinetic.Layer();
KineticLayer.prototype.constructor = KineticLayer;

KineticLayer.prototype.addItem = function(item) {
	this.items.push(item)
	if(item.undraftize){
		item.undraftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this);
		this.draw();
	}
};

KineticLayer.prototype.getItems = function(){
	return this.items;
}

return KineticLayer;

});