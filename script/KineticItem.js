function KineticItem(item){
	var shape;
	if(item instanceof Line){
		var line = item;
		var points = new Array();
		for(var index in line.points){
			points.push(line.points[index].x);
			points.push(line.points[index].y);
		}
		shape = new Kinetic.Line({
			points: points,
		});
	} else {
	}
	
	this.kineticShape = shape;
}

KineticItem.prototype = new Item();

KineticItem.prototype.draftize = function(){
	
};