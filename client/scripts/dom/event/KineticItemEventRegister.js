define('KineticItemEventRegister', ['KineticEvent', 'KineticMouseEventOnItemInterpreter', 'ItemEventHandler'], function(Event, KineticMouseEventOnItemInterpreter, ItemEventHandler){


function KineticItemEventRegister(){

}

KineticItemEventRegister.prototype.registerEventBus = function(eventBus, item){
	item.setEventBus(eventBus);
	item.setEventHandler(new ItemEventHandler());
	eventBus.addListener(item);
	this.addEventListeners(item, eventBus, [
		Event.Kinetic.MOUSE_OVER,
		Event.Kinetic.MOUSE_ENTER,
		Event.Kinetic.MOVE_TO,
		Event.Kinetic.MOUSE_DOWN,
		Event.Kinetic.MOUSE_UP,
		Event.Kinetic.MOUSE_OUT,
		Event.Kinetic.MOUSE_LEAVE,
	]);
};

KineticItemEventRegister.prototype.addEventListeners = function(item, eventBus, events){
	var interpreter = new KineticMouseEventOnItemInterpreter(item);
	for(var index in events){
		var eventType = events[index];
		(function(eventType){
			item.getKineticShape().on(eventType, function(event) {
				event.preventDefault();
				var translatedEvent = document.createEvent('MouseEvents');
				translatedEvent.initMouseEvent(eventType, false, event.cancelable, event.view, 
                     event.detail, event.screenX, event.screenY, event.clientX, event.clientY, 
                     event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
                     event.button, event.relatedTarget);
				translatedEvent.cancelBubble = true;
				interpreter.interpret(translatedEvent, eventBus);
			});					
		})(eventType);
	}
};

return KineticItemEventRegister;

	
});