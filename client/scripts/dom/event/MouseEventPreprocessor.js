define('MouseEventPreprocessor', ['Note'], function(Note){


function MouseEventPreprocessor(){
	this.zoomPercentage = 1;
}

MouseEventPreprocessor.prototype.setZoomPercentage = function(percentage) {
	this.zoomPercentage = percentage;
};

MouseEventPreprocessor.prototype.process = function(event) {
	var originalOffset = { x: event.offsetX, y: event.offsetY };

	if (event.targetItem instanceof Note && event.targetItem.hasParent()) {
		var parentRect = event.targetItem.getParent().getPage().getElement().getBoundingClientRect();
		var childRect = event.targetItem.getElement().getBoundingClientRect();
		originalOffset.x = childRect.left - parentRect.left + event.offsetX;
		originalOffset.y = childRect.top - parentRect.top + event.offsetY;
	}

	var offsetX = originalOffset.x * this.zoomPercentage;
	var offsetY = originalOffset.y * this.zoomPercentage;
	
	return this.createEvent(event.type, offsetX - document.body.scrollLeft, offsetY - document.body.scrollTop, event.targetItem);
};

MouseEventPreprocessor.prototype.createEvent = function(type, x, y, targetItem){
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
	event.targetItem = targetItem;
	return event;
}	

return MouseEventPreprocessor;


});