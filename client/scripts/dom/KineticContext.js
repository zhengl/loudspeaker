define('KineticContext', ['Context', 'Kinetic','KineticEvent', 'KineticMouseEventOnContextInterpreter'], function(Context, Kinetic, Event, KineticMouseEventOnContextInterpreter){


function KineticContext(container, width, height){
	this.items = [];
	this.draftItems = [];

	this.stage = new Kinetic.Stage({
		container: container,
		width: width,
		height: height,
	});
	this.layer = new Kinetic.Layer();
	this.draftLayer = new Kinetic.Layer();
	this.stage.add(this.draftLayer);
	this.stage.add(this.layer);
	this.layer.moveToTop();
}

KineticContext.prototype = new Context();
KineticContext.constructor = KineticContext;

KineticContext.EVENTS = [
	Event.Kinetic.MOVE_TO,
	Event.Kinetic.MOUSE_DOWN,
	Event.Kinetic.MOUSE_UP,
	Event.Kinetic.MOUSE_ENTER,
	Event.Kinetic.MOUSE_LEAVE,
	Event.Kinetic.MOUSE_OVER,
	Event.Kinetic.MOUSE_OUT
]

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
	this.items.push(item)
	if(item.undraftize){
		item.undraftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this.layer);
		this.layer.draw();
	}
	this.draftLayer.draw();
};

KineticContext.prototype.addDraftItem = function(item){
	this.draftItems.push(item)
	if(item.draftize){
		item.draftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this.draftLayer);
		this.draftLayer.draw();
	}
	this.layer.draw();
};


KineticContext.prototype.enableEventHandling = function(eventBus){
	this.eventBus = eventBus;
	this.addEventListeners(eventBus, KineticContext.EVENTS);
};

KineticContext.prototype.addEventListeners = function(eventBus, events){
	 this.eventCatcher = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.stage.getWidth(),
            height: this.stage.getHeight(),
          });
	this.layer.add(this.eventCatcher);
	this.eventCatcher.moveToBottom();

	var interpreter = new KineticMouseEventOnContextInterpreter(this);
	this.eventCatcher.on(events.join(" "), function(event){
		interpreter.interpret(event, eventBus);
	});
	this.layer.draw();
};

KineticContext.prototype.disableEventHandling = function(){
	this.eventBus.removeListener(this);
	this.removeEventListeners(this.eventBus, KineticContext.EVENTS);
};

KineticContext.prototype.removeEventListeners = function(eventBus, events){
	this.eventCatcher.remove();

	this.eventCatcher.off(events.join(" "));
	this.layer.draw();
};

KineticContext.prototype.refreshItems = function(){
	this.layer.draw();
};

KineticContext.prototype.refreshDraftItems = function(){
	this.draftLayer.draw();
};

return KineticContext;


});

