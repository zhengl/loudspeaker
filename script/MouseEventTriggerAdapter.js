function MouseEventTriggerAdapter(mouseEventTrigger){
	mouseEventTrigger.addListener(this);
}

MouseEventTriggerAdapter.prototype = new EventTrigger();

MouseEventTriggerAdapter.prototype.notify = function(event, data){

	switch(event) {
		case Event.MOVE_TO:
			this.triggerEvent(Event.MOVE_TO, data);
			break;
		case Event.MOUSE_DOWN:
			this.triggerEvent(Event.START_DRAWING);
			break;
		case Event.MOUSE_UP:
			this.triggerEvent(Event.STOP_DRAWING);
			break;
	}
};