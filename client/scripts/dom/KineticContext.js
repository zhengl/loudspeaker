define('KineticContext', ['Context', 'Kinetic', 'KineticLayer', 'KineticDraftLayer','KineticEvent', 'KineticMouseEventOnContextInterpreter'], function(Context, Kinetic, KineticLayer, KineticDraftLayer, Event, KineticMouseEventOnContextInterpreter){


function KineticContext(container, width, height){
	this.stage = new Kinetic.Stage({
		container: container,
		width: width,
		height: height,
	});
	this.layer = new KineticLayer();
	this.draftLayer = new KineticDraftLayer();
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
	return this.layer.getItems();
};

KineticContext.prototype.getDraftItems = function(){
	return this.draftLayer.getDraftItems();
};

KineticContext.prototype.clearDraftItems = function(){
	this.draftLayer.clear();
};

KineticContext.prototype.getLastDraftItem = function(){
	var draftItems = this.getDraftItems();
	return draftItems[draftItems.length - 1];
};

KineticContext.prototype.addItem = function(item){
	this.layer.addItem(item);
	this.draftLayer.draw();
};

KineticContext.prototype.addDraftItem = function(item){
	this.draftLayer.addDraftItem(item);
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
	this.layer.remove(this.eventCatcher);

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

