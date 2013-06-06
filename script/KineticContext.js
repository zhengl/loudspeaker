function KineticContext(container){
	this.stage = new Kinetic.Stage({
		container: container
	});
	this.layer = new Kinetic.Layer();
	this.stage.add(this.layer);
}

KineticContext.prototype = new Context();

KineticContext.prototype.setEventTrigger = function(eventTrigger){
	this.eventTrigger = eventTrigger;
	this.addEventListeners([
		KineticEvent.MOVE_TO,
		KineticEvent.MOUSE_DOWN,
		KineticEvent.MOUSE_UP,
		KineticEvent.MOUSE_ENTER,
		KineticEvent.MOUSE_LEAVE,
		KineticEvent.MOUSE_OVER,
		KineticEvent.MOUSE_OUT
	]);
}

KineticContext.prototype.draw = function(item){
	var kineticItem = new KineticItem(item);
	this.addItem(kineticItem);
	this.layer.add(kineticItem.kineticShape);
	this.layer.draw();
	
	return kineticItem;
};

KineticContext.prototype.addEventListeners = function(events){
	for(var index in events){
		var self = this;
		console.log(this.stage.getContainer());
		this.stage.getContainer().addEventListener(events[index], function(event) {
			self.eventTrigger.trigger(event);
		});		
	}
};

