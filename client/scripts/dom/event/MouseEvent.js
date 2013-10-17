define('MouseEvent', ['Event'], function(Event){

Event.Mouse = {
	MOVE_TO: 'mousemove',
	MOUSE_DOWN: 'mousedown',
	MOUSE_UP: 'mouseup',
	MOUSE_ENTER: 'mouseenter',
	MOUSE_LEAVE: 'mouseleave',
};

var events = [];
for(var key in Event.Mouse) {
    events.push(Event.Mouse[key]);
}

Event.Mouse.EVENTS = events;

return Event;


});