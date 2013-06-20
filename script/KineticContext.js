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
	this.stage.add(this.draftLayer);
	this.stage.add(this.layer);
}

KineticContext.prototype.getLastDraftItem = function(){
	return this.draftItems[this.draftItems.length - 1];
};

KineticContext.prototype.clearDraftItems = function(){
	this.draftItems = [];
	this.draftLayer.removeChildren();
	this.draftLayer.draw();
}

KineticContext.prototype.undraftize = function(){
	var draftItem = this.getLastDraftItem();
	var item = draftItem.undraftize();
	this.addItem(item);
	this.clearDraftItems();
	return item;
};

KineticContext.prototype.getItems = function(){
	return this.items;
};

KineticContext.prototype.getDraftItems = function(){
	return this.draftItems;
};

KineticContext.prototype.addItem = function(kineticItem){
	this.items.push(kineticItem)
	kineticItem.getKineticShape().moveTo(this.layer);
	this.layer.draw();
};

KineticContext.prototype.addDraftItem = function(kineticItem){
	this.draftItems.push(kineticItem)
	kineticItem.getKineticShape().moveTo(this.draftLayer);
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
	return kineticItem;
};

KineticContext.prototype.draftTo = function(point) {
	var draftItem = this.getLastDraftItem();
	draftItem.update(point);
	this.clearDraftItems();
	this.addDraftItem(draftItem);
	return draftItem;
};

KineticContext.prototype.startMoving = function(item){
	item.draftize();
	this.addDraftItem(item);
	this.removeItem(item);
	this.layer.draw();
	return item;
};

KineticContext.prototype.finishMoving = function(item){
	item.undraftize();
	this.addItem(item);
	this.clearDraftItems();
	return item;
};

KineticContext.prototype.moveTo = function(item, point){
	item.moveTo(point);
	this.draftLayer.draw();
};

KineticContext.prototype.removeItem = function(item){
	var resultItems = new Array();
	for(var index in this.items){
		if(item != this.items[index]) {
			resultItems.push(this.items[index]);
		}
	}
	this.items = resultItems;
};

KineticContext.prototype.registerEventTrigger = function(inputEventTrigger){
	this.addEventListeners(inputEventTrigger, [
		KineticEvent.MOVE_TO,
		KineticEvent.MOUSE_DOWN,
		KineticEvent.MOUSE_UP,
		KineticEvent.MOUSE_ENTER,
		KineticEvent.MOUSE_LEAVE,
		KineticEvent.MOUSE_OVER,
		KineticEvent.MOUSE_OUT
	]);
}

KineticContext.prototype.addEventListeners = function(inputEventTrigger, events){
	var eventCatcher = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.stage.getWidth(),
            height: this.stage.getHeight(),
          });
	this.layer.add(eventCatcher);
	eventCatcher.moveToBottom();

	eventCatcher.on(events.join(" "), function(event){
		inputEventTrigger.trigger(event);
	});
	this.layer.draw();
};

