define("NoteDragger", ['EventHandleable', 'NoteDraggerEventHandler', 'Event', 'Point', 'NoteDraggingGestureDetector'], function(EventHandleable, NoteDraggerEventHandler, Event, Point, NoteDraggingGestureDetector){
	

function NoteDragger(){
}

NoteDragger.prototype = new EventHandleable(new NoteDraggerEventHandler());
NoteDragger.prototype.constructor = NoteDragger;

NoteDragger.prototype.setDroppable = function(item) {
	this.droppable = item;
};

NoteDragger.prototype.startDragging = function(note, relativePosition) {
	this.draggingNote = note;
	this.draggingNote.relativePosition = relativePosition;
	this.originalParent = this.draggingNote.getElement().parentNode;
	
	this.appendToBody();
};


NoteDragger.prototype.dragTo = function(point) {
	if(undefined !== this.draggingNote) {
		var note = this.draggingNote;
		var newLeft = point.x * this.draggingNote.zoomPercentage - note.relativePosition.x;
		var newTop = point.y * this.draggingNote.zoomPercentage - note.relativePosition.y;
		this.draggingNote.moveTo(new Point(newLeft, newTop));
	}
};

NoteDragger.prototype.finishDragging = function() {
	if (this.isDroppedInDroppable()) {
		if (this.draggingNote.getContext()) {
			this.draggingNote.getContext().interpreter.removeDetector(NoteDraggingGestureDetector);
		}

		this.appendToDroppable();
	} else {
		this.appendToOriginalParent();
	}
};

NoteDragger.prototype.isDroppedInDroppable = function() {
	if(undefined === this.droppable) {
		return false;
	}

	var droppableRect = this.droppable.getElement().getBoundingClientRect();
	var draggableRelativePosition = this.draggingNote.getPosition();
	var draggableAbsolutePosition = { x: draggableRelativePosition.x / this.draggingNote.zoomPercentage, y: draggableRelativePosition.y / this.draggingNote.zoomPercentage };

	return draggableAbsolutePosition.x > droppableRect.left + document.body.scrollLeft && draggableAbsolutePosition.x < droppableRect.right + document.body.scrollLeft &&
	draggableAbsolutePosition.y > droppableRect.top + document.body.scrollTop && draggableAbsolutePosition.y < droppableRect.bottom + document.body.scrollTop;
};

NoteDragger.prototype.appendToOriginalParent = function() {
	var noteElement = this.draggingNote.getElement();
	this.originalParent.appendChild(noteElement);
	noteElement.style.position = "static";
	noteElement.style.left = "auto";
	noteElement.style.top = "auto";
};

NoteDragger.prototype.appendToDroppable = function() {
	var droppableRect = this.droppable.getElement().getBoundingClientRect();
	var newLeft = this.draggingNote.getPosition().x - (droppableRect.left + document.body.scrollLeft) * this.draggingNote.zoomPercentage;
	var newTop = this.draggingNote.getPosition().y - (droppableRect.top + document.body.scrollTop) * this.draggingNote.zoomPercentage;
	this.droppable.addItem(this.draggingNote);
	this.draggingNote.moveTo(new Point(newLeft, newTop));
};

NoteDragger.prototype.appendToBody = function() {
	var noteElement = this.draggingNote.getElement();
	var position = noteElement.getBoundingClientRect();
	this.draggingNote.moveTo(new Point(position.left * this.draggingNote.zoomPercentage, position.top * this.draggingNote.zoomPercentage));
	document.body.appendChild(noteElement);
};

return NoteDragger;

});