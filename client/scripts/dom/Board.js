define('Board', ['Page', 'Event', 'EventBridge', 'EventFilter', 'Note'], function(Page, Event, EventBridge, EventFilter, Note){

function Board(){
	
}

Board.prototype = new Page();
Board.prototype.constructor = Board;

Board.prototype.addItem = function(page) {
	if(this.getElement() && page.getElement()) {
		this.getElement().appendChild(page.getElement());
	}
	if(this.getContext()) {
		this.getContext().addItem(page);
	} else {
		page.setParent(this);
	}

	if(page.getEventBus() && this.getEventBus()) {
		var bridge = new EventBridge();
		bridge.bridge(page.getEventBus(), this.getEventBus());
		var filter = new EventFilter();
		filter.accept(function(event){
			if((event.name == Event.Page.START_MOVING &&
				event.data.item instanceof Note) ||
				 event.name == Event.Page.MOVE_TO ||
				 event.name == Event.Page.FINISH_MOVING) {
				return true;
			} else {
				return false;
			}
		});

		bridge.setFilter(filter);
	}
};

return Board;

});