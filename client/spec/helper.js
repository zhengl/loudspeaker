function Event(name, data){
	this.name = name;
	this.data = data;
}

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

function createText(){
	var text = new Text("Hello World!");
	text.setPosition({x: 10, y: 20});
	return text;
}

function expectOneItem(target){
	expect(target.getContext().getItems().length).toEqual(1);
}

function expectOneDraftItem(target){
	expect(target.getContext().getDraftItems().length).toEqual(1);
}

function expectNoItem(target){
	expect(target.getContext().getItems().length).toEqual(0);
}

function expectNoDraftItem(target){
	expect(target.getContext().getDraftItems().length).toEqual(0);
}

function triggerStartMovingEvent(eventBus, item, x, y){
	eventBus.publish(new Event(Event.Page.START_MOVING, { item: item, position: {x: x, y: y} }));
}

function triggerFinishMovingEvent(eventBus, item){
	eventBus.publish(new Event(Event.Page.FINISH_MOVING));
}

function triggerMoveToEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Page.MOVE_TO, { position: {x: x, y: y} }));
}

function triggerDrawToEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Page.DRAW_TO, { position: {x: x, y: y} }));
}

function triggerStartDrawingEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Page.START_DRAWING, { position: {x: x, y: y} }));		
}

function triggerFinishDrawingEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Page.FINISH_DRAWING, { position: {x: x, y: y} }));		
}

function triggerStopDrawingEvent(eventBus){
	eventBus.publish(new Event(Event.Page.STOP_DRAWING));		
}

function triggerStartTextingEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Page.START_TEXTING, { position: {x: x, y: y} }));
}

function createEvent(type, x, y, target){
	var options = {
		bubbles: false,
		cancelable: false,
		view: window,
		detail: 0,
		screenX: 0,
		screenY: 0,
		clientX: x,
		clientY: y,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		button: 0,
		relatedTarget: undefined
	};
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent( type, options.bubbles, options.cancelable,
		options.view, options.detail,
		options.screenX, options.screenY, options.clientX, options.clientY,
		options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
		options.button, options.relatedTarget || document.body.parentNode );
	event.targetItem = target;
	return event;
}			
