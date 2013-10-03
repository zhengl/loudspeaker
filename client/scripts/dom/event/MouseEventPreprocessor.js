define('MouseEventPreprocessor', ['Note'], function(Note){


function MouseEventPreprocessor(){
	this.zoomPercentage = 1;
}

MouseEventPreprocessor.prototype.setZoomPercentage = function(percentage) {
	this.zoomPercentage = percentage;
};

MouseEventPreprocessor.prototype.process = function(event) {
	var canvasX;
	var canvasY;

	if (event.targetItem instanceof Note && event.targetItem.hasParent()) {
		var parentRect = event.targetItem.getParent().getPage().getElement().getBoundingClientRect();
		var childRect = event.targetItem.getElement().getBoundingClientRect();
		canvasX = childRect.left - parentRect.left + event.offsetX;
		canvasY = childRect.top - parentRect.top + event.offsetY;
	} else {
		canvasX = event.offsetX * this.zoomPercentage - document.body.scrollLeft;
		canvasY = event.offsetY * this.zoomPercentage - document.body.scrollTop;
	}
	
	return this.createEvent(
			event.type, 
			canvasX, 
			canvasY, 
			event.targetItem,
			event.offsetX,
			event.offsetY
		);
};

MouseEventPreprocessor.prototype.createEvent = function(type, canvasX, canvasY, targetItem, offsetX, offsetY){
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
	event.targetItem = targetItem;
	return event;
}	

return MouseEventPreprocessor;


});