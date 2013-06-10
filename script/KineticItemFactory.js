function KineticItemFactory(){
}

KineticItemFactory.create = function(item){
	var kineticItem;
	if (item instanceof Line) {
		var kineticItem = new KineticLine(item.points);
	} else {
		console.log(item);
	}
	
	kineticItem.setPage(item.page);
	return kineticItem;
};