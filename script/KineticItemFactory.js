function KineticItemFactory(){
}

KineticItemFactory.create = function(item){
	var kineticItem;
	if (item instanceof Line) {
		var kineticItem = new KineticLine(item.points);
	} else if (item instanceof Text) {
		var kineticItem = new KineticText(item.getValue());
		kineticItem.moveTo(item.getPosition());
	} else {
		console.log(item);
	}
	return kineticItem;
};