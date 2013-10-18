define('Board', ['Page', 'EventBridge', 'MovingEventFilter', 'NoteEventTransformer'], function(Page, EventBridge, MovingEventFilter, NoteEventTransformer){

function Board(){
	
}

Board.prototype = new Page();
Board.prototype.constructor = Board;

Board.prototype.addItem = function(page) {
	page.addTo(this.getContext());
	this.bridgeEvent(page);
};


Board.prototype.bridgeEvent = function(page) {
	if(page.getEventBus() && this.getEventBus()) {
		var bridge = new EventBridge();
		bridge.setFilter(new MovingEventFilter());
		bridge.setTransformer(new NoteEventTransformer());
		bridge.bridge(page.getEventBus(), this.getEventBus());
	}
};

return Board;

});