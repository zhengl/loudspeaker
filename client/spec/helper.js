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

Event.Note = {
	START_DRAGGING: "NOTE.START_DRAGGING",
	MOVE_TO: "NOTE.MOVE_TO",
	FINISH_DRAGGING: "NOTE.FINISH_DRAGGING",
};

beforeEach(function(){
	this.addMatchers({
		toHaveOneItem: toHaveOneItem,
		toHaveNoItem: toHaveNoItem,
		toHaveOneDraftItem: toHaveOneDraftItem,
		toHaveNoDraftItem: toHaveNoDraftItem,
		toBeInstanceOf: toBeInstanceOf,
		toHaveNumberOfItemsEqual: toHaveNumberOfItemsEqual,
	});
});

function toHaveOneItem(){
	return toHaveNumberOfItemsEqual.call(this, 1);
}

function toHaveNoItem(){
	return toHaveNumberOfItemsEqual.call(this, 0);
}

function toHaveOneDraftItem(){
	return toHaveNumberOfDraftItemsEqual.call(this, 1);
}

function toHaveNoDraftItem(){
	return toHaveNumberOfDraftItemsEqual.call(this, 0);
}

function getItems(actual) {
	return actual.getContext ? 
		actual.getContext().getItems() : 
		actual.getItems();
}

function getDraftItems(actual) {
	return actual.getContext ? 
		actual.getContext().getDraftItems() : 
		actual.getDraftItems();
}

function toHaveNumberOfItemsEqual(expected) {
	return getItems(this.actual).length === expected;
}

function toHaveNumberOfDraftItemsEqual(expected) {
	return getDraftItems(this.actual).length === expected;
}

function toBeInstanceOf(cls){
	return this.actual instanceof cls;
}

function triggerStartMovingEvent(eventBus, item, x, y){
	eventBus.publish(new Event(Event.Page.START_MOVING, { item: item, position: {x: x, y: y} }));
}

function triggerFinishMovingEvent(eventBus, item){
	eventBus.publish(new Event(Event.Page.FINISH_MOVING, { item: item }));
}

function triggerMoveToEvent(eventBus, item, x, y){
	eventBus.publish(new Event(Event.Page.MOVE_TO, { item: item, position: {x: x, y: y} }));
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

function triggerStartDraggingEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Note.START_DRAGGING, { position: {x: x, y: y} }));
}

function triggerFinishDraggingEvent(eventBus, x, y){
	eventBus.publish(new Event(Event.Note.FINISH_DRAGGING, { position: {x: x, y: y} }));
}

function createEvent(type, canvasX, canvasY, target, offsetX, offsetY){
	var options = {
		bubbles: false,
		cancelable: false,
		view: window,
		detail: 0,
		screenX: 0,
		screenY: 0,
		clientX: offsetX,
		clientY: offsetY,
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
	event.canvasX = canvasX;
	event.canvasY = canvasY;
	event.targetItem = target;
	return event;
}

function fireEvent( target, type, event ) {
	if ( target.dispatchEvent ) {
		target.dispatchEvent( event );
	} else if ( target.fireEvent ) {
		target.fireEvent( "on" + type, event );
	}
}

function fireResizeEvent() {
	var evt = document.createEvent('UIEvents');
	evt.initUIEvent('resize', true, false,window,0);
	fireEvent(window, null, evt);	
}
