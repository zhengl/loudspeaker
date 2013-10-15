define('KineticEvent', ['Event'], function(Event){

Event.Kinetic = {
	MOVE_TO: 'mousemove',
	MOUSE_DOWN: 'mousedown',
	MOUSE_UP: 'mouseup',
	MOUSE_ENTER: 'mouseenter',
	MOUSE_LEAVE: 'mouseleave',
};

var events = [];
for(var key in Event.Kinetic) {
    events.push(Event.Kinetic[key]);
}

Event.Kinetic.EVENTS = events;

return Event;


});