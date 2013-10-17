define('Board', ['Page', 'EventBridge', 'MovingEventFilter', 'NoteEventTransformer'], function(Page, EventBridge, MovingEventFilter, NoteEventTransformer){

function Board(){
	
}

Board.prototype = new Page();
Board.prototype.constructor = Board;

Board.prototype.addItem = function(page) {
	this.appendElement(page);

	this.addItemToContext(page);
	
	page.setParent(this);
	page.moveTo(page.getPosition());

	this.bridgeEvent(page);
};

Board.prototype.appendElement = function(page) {
	if(this.getElement() && page.getElement()) {
		this.getElement().appendChild(page.getElement());
	}
};

Board.prototype.addItemToContext = function(page) {
	if(this.getContext()) {
		this.getContext().addItem(page);
	}
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