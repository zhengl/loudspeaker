function KineticEventOnPageInterpreter(){
}

KineticEventOnPageInterpreter.prototype.interpret = function(event){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			return new AbstractEvent(Page.Event.MOVE_TO, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_DOWN:
			return new AbstractEvent(Page.Event.START_DRAWING, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_UP:
			return new AbstractEvent(Page.Event.FINISH_DRAWING, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_ENTER:
		break;
		case KineticEvent.MOUSE_LEAVE:
		break;
		case KineticEvent.MOUSE_OVER:
		break;
		case KineticEvent.MOUSE_OUT:
		break;
		default:
		break;
	}
	
	this.previouseEvent = event;
}