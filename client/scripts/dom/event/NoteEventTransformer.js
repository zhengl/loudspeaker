define('NoteEventTransformer', ['Event'], function(Event){
	
function NoteEventTransformer(){

}

NoteEventTransformer.prototype.transform = function(event) {
	var note = event.data.item;
	var position = event.data.position;

	var parentRect = note.getParent().getPage().getElement().getBoundingClientRect();
	var childRect = note.getElement().getBoundingClientRect();

	var x = (childRect.left - parentRect.left) * note.zoomPercentage + position.x;
	var y = (childRect.top - parentRect.top) * note.zoomPercentage + position.y;
	return new Event(event.name, { item: note, position: { x: x, y:y } });
};

return NoteEventTransformer;

});