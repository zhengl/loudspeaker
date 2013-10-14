define('Board', ['Page', 'Event', 'EventBridge', 'EventFilter', 'NoteEventTransformer', 'Note'], function(Page, Event, EventBridge, EventFilter, NoteEventTransformer, Note){

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
	}
	
	page.setParent(this);
	page.moveTo(page.getPosition());

	if(page.getEventBus() && this.getEventBus()) {
		var bridge = new EventBridge();
		bridge.bridge(page.getEventBus(), this.getEventBus());
		var filter = new EventFilter();
		filter.accept(function(event){
			if(event.data.item instanceof Note && 
				(event.name == Event.Page.START_MOVING ||
				 event.name == Event.Page.MOVE_TO ||
				 event.name == Event.Page.FINISH_MOVING)) {
				return true;
			} else {
				return false;
			}
		});

		bridge.setFilter(filter);

		bridge.setTransformer(new NoteEventTransformer());
	}
};

return Board;

});