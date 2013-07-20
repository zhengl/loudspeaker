function KineticCursor(context){
	this.kineticShape = new Kinetic.Line({
        points: [0, 0, 0, 30],
        stroke: 'black',
        strokeWidth: 2,
    });

    context.layer.add(this.kineticShape);
    context.layer.draw();

    var self = this;
    var total = 0;
    var period = 500;
    var anim = new Kinetic.Animation(function(frame) {
    	if (frame.time > period + total) {
        	self.kineticShape.setOpacity(self.kineticShape.getOpacity() == 1 ? '0' : '1');
    		total += period;
    	}
    }, context.layer);

    anim.start();
}

KineticCursor.prototype.setPosition = function(point){
    console.log(point);
    this.kineticShape.setPosition(point.x, point.y);
};

KineticCursor.prototype.destroy = function(point){
    this.kineticShape.destroy();
};