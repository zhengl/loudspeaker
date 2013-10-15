define("NoteDragger", ['EventHandleable', 'NoteDraggerEventHandler', 'Event', 'Point', 'NoteDraggingGestureDetector'], function(EventHandleable, NoteDraggerEventHandler, Event, Point, NoteDraggingGestureDetector){
	

function NoteDragger(){
	this.zoomPercentage = 1;
}

NoteDragger.prototype = new EventHandleable(new NoteDraggerEventHandler());
NoteDragger.prototype.constructor = NoteDragger;

NoteDragger.prototype.setDroppable = function(item) {
	this.droppable = item;
};

NoteDragger.prototype.setZoomPercentage = function(percentage) {
	this.zoomPercentage = percentage;
};

NoteDragger.prototype.startDragging = function(note, relativePosition) {
	this.draggingNote = note;
	this.draggingNote.setZoomPercentage(this.zoomPercentage);
	this.draggingNote.relativePosition = relativePosition;

	var noteElement = this.draggingNote.getElement();
	this.originalParent = noteElement.parentNode;
	var position = noteElement.getBoundingClientRect();
	this.draggingNote.moveTo(new Point(position.left * this.zoomPercentage, position.top * this.zoomPercentage));
	document.body.appendChild(noteElement);

	var self = this;
	document.body.onmousemove = function(event){
		self.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.clientX, event.clientY) }));
	};

	document.body.onmouseup = function(){
		self.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING));
	};
};

NoteDragger.prototype.dragTo = function(point) {
	if(undefined !== this.draggingNote) {
		var note = this.draggingNote;
		var newLeft = point.x * this.zoomPercentage - note.relativePosition.x;
		var newTop = point.y * this.zoomPercentage - note.relativePosition.y;
		this.draggingNote.moveTo(new Point(newLeft, newTop));
	}
};

NoteDragger.prototype.finishDragging = function() {
	if (this.isDroppedInDroppable()) {
		if (this.draggingNote.getContext()) {
			this.draggingNote.getContext().interpreter.removeDetector(NoteDraggingGestureDetector);
		}

		var droppableRect = this.droppable.getElement().getBoundingClientRect();
		var newLeft = this.draggingNote.getPosition().x - (droppableRect.left + document.body.scrollLeft) * this.zoomPercentage;
		var newTop = this.draggingNote.getPosition().y - (droppableRect.top + document.body.scrollTop) * this.zoomPercentage;
		this.droppable.addItem(this.draggingNote);
		this.draggingNote.moveTo(new Point(newLeft, newTop));
	} else {
		var noteElement = this.draggingNote.getElement();
		this.originalParent.appendChild(noteElement);
		noteElement.style.position = "static";
		noteElement.style.left = "auto";
		noteElement.style.top = "auto";
	}
	document.body.onmousemove = null;
	document.body.onmouseup = null;
};

NoteDragger.prototype.isDroppedInDroppable = function() {
	if(undefined === this.droppable) {
		return false;
	}

	var droppableRect = this.droppable.getElement().getBoundingClientRect();
	var draggableRelativePosition = this.draggingNote.getPosition();
	var draggableAbsolutePosition = { x: draggableRelativePosition.x / this.zoomPercentage, y: draggableRelativePosition.y / this.zoomPercentage };

	return draggableAbsolutePosition.x > droppableRect.left + document.body.scrollLeft && draggableAbsolutePosition.x < droppableRect.right + document.body.scrollLeft &&
	draggableAbsolutePosition.y > droppableRect.top + document.body.scrollTop && draggableAbsolutePosition.y < droppableRect.bottom + document.body.scrollTop;
};

return NoteDragger;

});