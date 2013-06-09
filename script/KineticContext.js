function KineticContext(container, width, height){
	this.items = new Array();
	this.draftItems = new Array();
	
	this.stage = new Kinetic.Stage({
		container: container,
		width: width,
		height: height,
	});
	this.layer = new Kinetic.Layer();
	this.draftLayer = new Kinetic.Layer();
	this.stage.add(this.layer);
	this.stage.add(this.draftLayer);
}

KineticContext.prototype.getLastDraftItem = function(){
	return this.draftItems[this.draftItems.length - 1];
};

KineticContext.prototype.clearDraftItems = function(){
	this.draftLayer.getChildren().each(function(shape){
		shape.remove();
	});
	this.draftItems = [];
	this.draftLayer.draw();
}

KineticContext.prototype.undraftize = function(){
console.log("undraftize");
	var draftItem = this.getLastDraftItem();
	var item = draftItem.undraftize();
	this.addItem(item);
	this.clearDraftItems();
};

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

KineticContext.prototype.getItems = function(){
	return this.items;
};

KineticContext.prototype.getDraftItems = function(){
	return this.draftItems;
};

KineticContext.prototype.addItem = function(kineticItem){
	this.items.push(kineticItem)
	this.layer.add(kineticItem.getKineticShape());
	this.layer.draw();
};

KineticContext.prototype.addDraftItem = function(kineticItem){
	this.draftItems.push(kineticItem)
	this.draftLayer.add(kineticItem.getKineticShape());
	this.draftLayer.draw();
};

KineticContext.prototype.draw = function(item){
	var kineticItem = KineticItemFactory.create(item);
	this.addItem(kineticItem);
	return kineticItem;
};

KineticContext.prototype.draft = function(item){
	var kineticItem = KineticItemFactory.create(item);
	kineticItem.draftize();
	this.addDraftItem(kineticItem);
	return kineticItem;
};

KineticContext.prototype.startDraft = function(type, point){
	var draftItem = new window[type];
	draftItem.update(point);
	var kineticItem = KineticItemFactory.create(draftItem);
	kineticItem.draftize();
	this.addDraftItem(kineticItem);
};

KineticContext.prototype.draftTo = function(point) {
console.log("draftTo");
	var draftItem = this.getLastDraftItem();
	draftItem.update(point);
	this.clearDraftItems();
	this.addDraftItem(draftItem);
	return draftItem;
};

KineticContext.prototype.addEventListeners = function(events){
	for(var index in events){
		var self = this;
		this.stage.getContainer().addEventListener(events[index], function(event) {
			self.eventTrigger.trigger(event);
		});		
	}
};

