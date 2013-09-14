define('KineticEvent', ['Event'], function(Event){

Event.Kinetic = {
	MOVE_TO: "mousemove",
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup",
	MOUSE_ENTER: "mouseenter",
	MOUSE_LEAVE: "mouseleave",
};

Event.Kinetic.EVENTS = [];
for(var key in Event.Kinetic) {
    Event.Kinetic.EVENTS.push(Event.Kinetic[key]);
}

return Event;


});