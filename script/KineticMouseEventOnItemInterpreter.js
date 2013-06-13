function KineticMouseEventOnItemInterpreter(){
}

KineticMouseEventOnItemInterpreter.prototype.interpret = function(event){
	switch(event.type){
		case KineticEvent.MOVE_TO:
			return new AbstractEvent(Item.Event.MOVE_TO, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_DOWN:
			console.log(event);
			event.preventDefault();
			return new AbstractEvent(Item.Event.START_MOVING, [new Point(event.x, event. y)]);
		break;
		case KineticEvent.MOUSE_UP:
			return new AbstractEvent(Item.Event.FINISH_MOVING);
		break;
		case KineticEvent.MOUSE_ENTER:
			return new AbstractEvent(Item.Event.SELECT);
		break;
		case KineticEvent.MOUSE_LEAVE:
			return new AbstractEvent(Item.Event.UNSELECT);
		break;
		case KineticEvent.MOUSE_OVER:
		break;
		case KineticEvent.MOUSE_OUT:
		break;
		default:
		break;
	}	
};