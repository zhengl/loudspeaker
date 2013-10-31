define('Debugger', ['EventHandleable'], function(EventHandleable){


function Debugger(){
}

Debugger.prototype = new EventHandleable();
Debugger.prototype.constructor = Debugger;

Debugger.prototype.adhereTo = function(page) {
	this.page = page;
	page.getEventBus().addListener(this);
};

Debugger.prototype.notify = function(event) {
	console.debug(event);
};

return Debugger;

});