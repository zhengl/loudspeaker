define('Debugger', ['EventHandleable', 'jquery'], function(EventHandleable, $){


function Debugger(context){
	this.context = context;
}

Debugger.prototype = new EventHandleable();
Debugger.prototype.constructor = Debugger;

Debugger.prototype.notify = function(event) {
	if (this.previousEvent) {
		$('#debugger-previous-event').text(this.previousEvent.stringify());
	}
	$('#debugger-current-event').text(event.stringify());
	this.previousEvent = event;

	var items = this.context.layer.getChildren();
	var itemsHtml = '';
	for(var i = 0; i < items.length; i++){
		if(items[i].toJSON().indexOf('Rect') == -1) {
			itemsHtml += '<li>' + items[i].toJSON() + '</li>';
		}
	}
	$('#debugger-items').html(itemsHtml);

	var draftItems = this.context.draftLayer.getChildren();
	var draftItemsHtml = '';
	for(var j = 0; j < draftItems.length; j++){
		draftItemsHtml += '<li>' + draftItems[j].toJSON() + '</li>';
	}
	$('#debugger-draft-items').html(draftItemsHtml);
};

return Debugger;

});