function Item(){
	this.position = new Point();
}

Item.prototype.moveTo = function(newPosition){
	this.position = newPosition;
};