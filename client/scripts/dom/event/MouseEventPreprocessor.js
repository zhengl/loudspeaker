define('MouseEventPreprocessor', ['Note', 'MousePositionHelper'], function(Note, MousePositionHelper){


function MouseEventPreprocessor(){
	this.zoomPercentage = 1;
}

MouseEventPreprocessor.prototype.setZoomPercentage = function(percentage) {
	this.zoomPercentage = percentage;
};

MouseEventPreprocessor.prototype.process = function(event) {
	var offset = MousePositionHelper.getOffset(event);
	var offsetX = offset.x - document.body.scrollLeft;
	var offsetY = offset.y - document.body.scrollTop;

	var canvasX = offsetX * this.zoomPercentage;
	var canvasY = offsetY * this.zoomPercentage;

	event.canvasX = canvasX;
	event.canvasY = canvasY;
	return event;
};

return MouseEventPreprocessor;


});