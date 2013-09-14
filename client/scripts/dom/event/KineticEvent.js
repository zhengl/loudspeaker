define('KineticEvent', ['Event'], function(Event){

Event.Kinetic = {
	MOVE_TO: "mousemove",
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup",
	MOUSE_ENTER: "mouseenter",
	MOUSE_LEAVE: "mouseleave",
	MOUSE_OVER: "mouseover",
	MOUSE_OUT: "mouseout"
};

return Event;


});