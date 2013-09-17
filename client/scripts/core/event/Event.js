define('Event', function(){

function Event(name, data){
	this.name = name;
	this.data = data;
}

Event.prototype.stringify = function() {
	return this.name;
};

Event.Page = {
	START_DRAWING: "PAGE.START_DRAWING",
	STOP_DRAWING: "PAGE.STOP_DRAWING",
	FINISH_DRAWING: "PAGE.FINISH_DRAWING",
	DRAW_TO: "PAGE.DRAW_TO",

	START_SELECTING_COLOR: "PAGE.START_SELECTING_COLOR",

	START_MOVING: "PAGE.START_MOVING",
	MOVE_TO: "PAGE.MOVE_TO",
	FINISH_MOVING: "PAGE.FINISH_MOVING",

	START_TEXTING: "PAGE.START_TEXTING",
	FINISH_TEXTING: "PAGE.FINISH_TEXTING",
};

return Event;

	
});