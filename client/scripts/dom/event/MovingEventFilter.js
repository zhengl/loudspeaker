define('MovingEventFilter', ['EventFilter', 'Event', 'Note'], function(EventFilter, Event, Note){

function MovingEventFilter(){
	this.accept = function(event){
		if(event.data.item instanceof Note &&
			(event.name == Event.Page.START_MOVING ||
			event.name == Event.Page.MOVE_TO ||
			event.name == Event.Page.FINISH_MOVING)) {
			return true;
		} else {
			return false;
		}
	};
}

MovingEventFilter.prototype = new EventFilter();
MovingEventFilter.prototype.constructor = MovingEventFilter;

return MovingEventFilter;


});