define('ItemEventHandler', ['Event'], function(Event){


function ItemEventHandler(){
}

ItemEventHandler.prototype.handle = {};

ItemEventHandler.prototype.handle[Event.Item.START_MOVING] = function(item, event){
	if (item === event.data[0]){
		item.relativePosition = event.data[1];
		item.eventBus.publish(
			new Event(Event.Page.START_MOVING, [item])
			);
	}
};

ItemEventHandler.prototype.handle[Event.Item.FINISH_MOVING] = function(item, event){
	if (item === event.data[0]){
		item.eventBus.publish(
			new Event(Event.Page.FINISH_MOVING, [event.data[1]])
			);
	}
};

ItemEventHandler.prototype.handle[Event.Item.MOVE_TO] = function(item, event){
	if (item === event.data[0]){
		item.eventBus.publish(
			new Event(Event.Page.MOVE_TO, [event.data[1]])
			);
	}
};

ItemEventHandler.prototype.handle[Event.Item.SELECT] = function(item, event){
	if (item === event.data[0]){
		item.select();
	}
};

ItemEventHandler.prototype.handle[Event.Item.UNSELECT] = function(item, event){
	if (item === event.data[0]){
		item.unselect();
	}
};

return ItemEventHandler;

	
});