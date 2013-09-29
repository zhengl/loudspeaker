define("NoteDragger", ['EventHandleable', 'NoteDraggerEventHandler'], function(EventHandleable, NoteDraggerEventHandler){
	

function NoteDragger(){
	
}

NoteDragger.prototype = new EventHandleable(new NoteDraggerEventHandler());
NoteDragger.prototype.constructor = NoteDragger;

NoteDragger.prototype.startDragging = function(note, relativePosition) {
	this.draggingNote = note;
	note.relativePosition = relativePosition;

	var noteElement = note.getElement();
	var position = noteElement.getBoundingClientRect();
	noteElement.style.position = "absolute";
	noteElement.style.top = position.top + "px";
	noteElement.style.left = position.left + "px";
	document.body.appendChild(noteElement);
};

NoteDragger.prototype.dragTo = function(point) {
	if(undefined != this.draggingNote) {
		var note = this.draggingNote;
		var noteElement = note.getElement();
		var newLeft = point.x - (note.relativePosition ? note.relativePosition.x : 0);
		var newTop = point.y - (note.relativePosition ? note.relativePosition.y : 0);
		noteElement.style.top = newLeft + "px";
		noteElement.style.left = newTop + "px";
	}
};

return NoteDragger;

});