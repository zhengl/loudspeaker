define("NoteDragger", ['EventHandleable', 'NoteDraggerEventHandler', 'Event', 'Point', 'MovingGestureDetector'], function(EventHandleable, NoteDraggerEventHandler, Event, Point, MovingGestureDetector){
	

function NoteDragger(){
	
}

NoteDragger.prototype = new EventHandleable(new NoteDraggerEventHandler());
NoteDragger.prototype.constructor = NoteDragger;

NoteDragger.prototype.setDroppable = function(item) {
	this.droppable = item;
};

NoteDragger.prototype.startDragging = function(note, relativePosition) {
	this.draggingNote = note;
	note.relativePosition = relativePosition;

	var noteElement = note.getElement();
	this.originalParent = noteElement.parentNode;
	var position = noteElement.getBoundingClientRect();
	this.draggingNote.moveTo(new Point(position.left, position.top));
	document.body.appendChild(noteElement);

	var self = this;
	document.body.onmousemove = function(event){
		self.eventBus.publish(new Event(Event.Note.MOVE_TO, { position: new Point(event.pageX, event.pageY) }));
	}

	document.body.onmouseup = function(event){
		self.eventBus.publish(new Event(Event.Note.FINISH_DRAGGING));
	}	
};

NoteDragger.prototype.dragTo = function(point) {
	if(undefined != this.draggingNote) {
		var note = this.draggingNote;
		var noteElement = note.getElement();
		var newLeft = point.x - note.relativePosition.x;
		var newTop = point.y - note.relativePosition.y;
		this.draggingNote.moveTo(new Point(newLeft, newTop));
	}
};

NoteDragger.prototype.finishDragging = function() {
	if (this.isDroppedInDroppable()) {
		this.draggingNote.disableEventHandling();
		var droppableRect = this.droppable.getElement().getBoundingClientRect();
		var newLeft = this.draggingNote.getPosition().x - (droppableRect.left + document.body.scrollLeft);
		var newTop = this.draggingNote.getPosition().y - (droppableRect.top + document.body.scrollTop);	
		this.draggingNote.moveTo(new Point(newLeft, newTop));
		this.droppable.addItem(this.draggingNote);
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
	if(undefined == this.droppable) {
		return false;
	}

	var droppableRect = this.droppable.getElement().getBoundingClientRect();
	var draggablePosition = this.draggingNote.getPosition();

	return draggablePosition.x > droppableRect.left + document.body.scrollLeft && draggablePosition.x < droppableRect.right + document.body.scrollLeft
		&& draggablePosition.y > droppableRect.top + document.body.scrollTop && draggablePosition.y < droppableRect.bottom + document.body.scrollTop;
};

return NoteDragger;

});