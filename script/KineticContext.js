function KineticContext(container){
	this.stage = new Kinetic.Stage({
		container: container,
		width: 800,
		height: 500,
	});
	this.layer = new Kinetic.Layer();
	this.draftLayer = new Kinetic.Layer();
	this.stage.add(this.layer);
	this.stage.add(this.draftLayer);
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
	var kineticItem = new KineticItemFactory.create(item);
	this.addItem(kineticItem);
	this.layer.add(kineticItem.getKineticShape());
	this.layer.draw();
	
	return kineticItem;
};

KineticContext.prototype.draft = function(item){
	var kineticItem = new KineticItemFactory.create(item);
	kineticItem.draftize();
	this.addDraftItem(kineticItem);
	this.draftLayer.add(kineticItem.kineticShape);
	this.draftLayer.draw();
	
	return kineticItem;
};

KineticContext.prototype.addEventListeners = function(events){
	for(var index in events){
		var self = this;
		this.stage.getContainer().addEventListener(events[index], function(event) {
			self.eventTrigger.trigger(event);
		});		
	}
};

