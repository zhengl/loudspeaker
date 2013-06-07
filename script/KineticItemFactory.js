function KineticItemFactory(){
}

KineticItemFactory.create = function(item){
	if (item instanceof Line) {
		return new KineticLine(item.points);
	} else {
	}
};