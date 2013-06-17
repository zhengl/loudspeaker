function KineticMouseEventOnPageInterpreter(){
	this.status = null;
}

KineticMouseEventOnPageInterpreter.prototype.interpret = function(event){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			switch (this.status) {
				case KineticMouseEventOnPageInterpreter.Status.DRAWING:
				return new AbstractEvent(Page.Event.MOVE_TO, [new Point(event.x, event. y)]);					
				default:
				return null;
			}
		break;
		case KineticEvent.MOUSE_DOWN:
			this.status = KineticMouseEventOnPageInterpreter.Status.DRAWING;
			return new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_UP:
			switch (this.status) {
				case KineticMouseEventOnPageInterpreter.Status:
					return new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(event.x, event. y)]);
				default:
				return null;
			}
		break;
		case KineticEvent.MOUSE_ENTER:
		break;
		case KineticEvent.MOUSE_LEAVE:
			return new AbstractEvent(Page.Event.STOP_DRAWING);
		break;
		case KineticEvent.MOUSE_OVER:
		break;
		case KineticEvent.MOUSE_OUT:
		break;
		default:
		break;
	}	
};

KineticMouseEventOnPageInterpreter.Status = {
	DRAWING: "DRAWING",
	MOVING: "MOVING",
};