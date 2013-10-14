define('KineticContext', ['Context', 'Kinetic','KineticEvent', 'MouseEventInterpreter'], function(Context, Kinetic, Event, MouseEventInterpreter){


function KineticContext(container, width, height){
	this.items = [];
	this.draftItems = [];

	this.stage = new Kinetic.Stage({
		container: container,
		width: width,
		height: height,
	});
	this.itemGroup = new Kinetic.Group();
	this.layer = new Kinetic.Layer();
	this.layer.add(this.itemGroup);
	this.draftLayer = new Kinetic.Layer();
	this.stage.add(this.draftLayer);
	this.stage.add(this.layer);
	this.layer.moveToTop();
}

KineticContext.prototype = new Context();
KineticContext.constructor = KineticContext;

KineticContext.prototype.getItems = function(){
	return this.items;
};

KineticContext.prototype.getDraftItems = function(){
	return this.draftItems;
};

KineticContext.prototype.clearDraftItems = function(){
	this.draftItems = [];
	this.draftLayer.removeChildren();
	this.draftLayer.draw();
};

KineticContext.prototype.getLastDraftItem = function(){
	var draftItems = this.getDraftItems();
	return draftItems[draftItems.length - 1];
};

KineticContext.prototype.addItem = function(item){
	this.items.push(item);
	if(item.undraftize){
		item.undraftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this.itemGroup);
		this.layer.draw();
	}
	this.draftLayer.draw();
};

KineticContext.prototype.addDraftItem = function(item){
	this.draftItems.push(item);
	if(item.draftize){
		item.draftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this.draftLayer);
		this.draftLayer.draw();
	}
	this.layer.draw();
};

KineticContext.prototype.enableEventHandling = function(interpreter){
	this.interpreter = interpreter;
	this.addEventListeners(Event.Kinetic.EVENTS);
};

KineticContext.prototype.addEventListeners = function(events){
	this.eventCatcher = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: this.stage.getWidth(),
		height: this.stage.getHeight(),
	});
	this.layer.add(this.eventCatcher);

	this.eventCatcher.moveToBottom();
	this.eventCatcher.on(events.join(" "), function(){});
	this.itemGroup.add(this.eventCatcher);
	var self = this;
	this.itemGroup.on(events.join(" "), function(event){
		if (undefined == event.targetItem) {
			event.targetItem = self.getPage();
		}
		self.interpreter.interpret(event);
	});	
	this.layer.draw();
};

KineticContext.prototype.removeEventListeners = function(eventBus, events){
	this.eventCatcher.off(events.join(" "));
	this.itemGroup.off(events.join(" "));
	this.layer.draw();
};

KineticContext.prototype.refreshItems = function(){
	this.layer.draw();
};

KineticContext.prototype.refreshDraftItems = function(){
	this.draftLayer.draw();
};

KineticContext.prototype.setScale = function(percentage){
	this.stage.setScale(percentage);
	this.stage.draw();
};

KineticContext.prototype.setPage = function(page) {
	this.page = page;
};

KineticContext.prototype.getPage = function() {
	return this.page;
};

KineticContext.prototype.getInterpreter = function() {
	return this.interpreter;
};


return KineticContext;


});

