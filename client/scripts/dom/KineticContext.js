define('KineticContext', ['Context', 'Kinetic', 'KineticEvent', 'KineticMouseEventOnPageInterpreter'], function(Context, Kinetic, Event, KineticMouseEventOnPageInterpreter){


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
	this.layer.moveToTop();
}

KineticContext.prototype = new Context();
KineticContext.constructor = KineticContext;

KineticContext.prototype.clearDraftItems = function(){
	this.draftItems = [];
	this.draftLayer.removeChildren();
	this.draftLayer.draw();
};

KineticContext.prototype.addItem = function(kineticItem){
	this.items.push(kineticItem)
	kineticItem.getKineticShape().moveTo(this.layer);
	this.layer.draw();
};

KineticContext.prototype.addDraftItem = function(kineticItem){
	this.draftItems.push(kineticItem);
	kineticItem.getKineticShape().moveTo(this.draftLayer);
	this.layer.draw();
	this.draftLayer.draw();
};


KineticContext.prototype.registerEventBus = function(page, eventBus){
	this.eventBus = eventBus;
	this.addEventListeners(page, eventBus, [
		Event.Kinetic.MOVE_TO,
		Event.Kinetic.MOUSE_DOWN,
		Event.Kinetic.MOUSE_UP,
		Event.Kinetic.MOUSE_ENTER,
		Event.Kinetic.MOUSE_LEAVE,
		Event.Kinetic.MOUSE_OVER,
		Event.Kinetic.MOUSE_OUT
	]);
};

KineticContext.prototype.addEventListeners = function(page, eventBus, events){
	 this.eventCatcher = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.stage.getWidth(),
            height: this.stage.getHeight(),
          });
	this.layer.add(this.eventCatcher);
	this.eventCatcher.moveToBottom();

	var interpreter = new KineticMouseEventOnPageInterpreter(page);
	this.eventCatcher.on(events.join(" "), function(event){
		interpreter.interpret(event, eventBus);
	});
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

