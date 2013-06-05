function KineticContext(container){
	this.stage = new Kinetic.Stage({
		container: container
	});
	this.layer = new Kinetic.Layer();
	this.stage.add(this.layer);
}

KineticContext.prototype = new Context();

KineticContext.prototype.draw = function(item){
	this.addItem(item);

	var shape = this.getShape(item);
	this.layer.add(shape);
	
	return item;
};

KineticContext.prototype.getShape = function(item){
	if(item instanceof Line){
		var line = item;
		var points = new Array();
		for(var index in line.points){
			points.push(line.points[index].x);
			points.push(line.points[index].y);
		}
		return new Kinetic.Line({
			points: points
		});
	} else {
	}
};