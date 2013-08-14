function ItemEventHandler(){
}

ItemEventHandler.prototype.handle = {};

ItemEventHandler.prototype.handle[Event.Item.START_MOVING] = function(item, event){
	item.relativePosition = event.data[1];
	item.eventBus.publish(
		new AbstractEvent(Event.Page.START_MOVING, [item])
		);
};

ItemEventHandler.prototype.handle[Event.Item.FINISH_MOVING] = function(item, event){
	item.eventBus.publish(
		new AbstractEvent(Event.Page.FINISH_MOVING)
		);
};

ItemEventHandler.prototype.handle[Event.Item.MOVE_TO] = function(item, event){
	item.eventBus.publish(
		new AbstractEvent(Event.Page.MOVE_TO, [event.data[1]])
		);
};

ItemEventHandler.prototype.handle[Event.Item.SELECT] = function(item, event){
	item.select();
};

ItemEventHandler.prototype.handle[Event.Item.UNSELECT] = function(item, event){
	item.unselect();
};