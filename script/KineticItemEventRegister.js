function KineticItemEventRegister(){

}

KineticItemEventRegister.prototype.registerEventBus = function(eventBus, item){
	item.setEventBus(eventBus);
	eventBus.addListener(item);
	this.addEventListeners(eventBus, item, [
		KineticEvent.MOUSE_OVER,
		KineticEvent.MOUSE_ENTER,
		KineticEvent.MOVE_TO,
		KineticEvent.MOUSE_DOWN,
		KineticEvent.MOUSE_UP,
		KineticEvent.MOUSE_OUT,
		KineticEvent.MOUSE_LEAVE,
	]);
};

KineticItemEventRegister.prototype.addEventListeners = function(eventBus, item, events){
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
				eventBus.publish(interpreter.interpret(translatedEvent));
			});					
		})(eventType);
	}
};