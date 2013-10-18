define('Note', ['Page', 'KineticContext'], function(Page, KineticContext){

function Note(){
	
}

Note.prototype = new Page();
Note.prototype.constructor = Note;

Note.prototype.addTo = function(context) {
	if(context instanceof KineticContext && this.getElement()){
		context.getElement().parentNode.insertBefore(this.getElement(), context.getElement());
	}
	context.getItems().push(this);
	this.setParent(context);
	this.moveTo(this.getPosition());
};

Note.prototype.moveTo = function(point){
	this.position = point;
	if (this.element) {
		this.element.style.position = 'absolute';
		this.element.style.left = point.x / this.zoomPercentage + 'px';
		this.element.style.top = point.y /this.zoomPercentage + 'px';
	}
};

Note.prototype.remove = function() {
	if(this.element) {
		this.element.parentNode.removeChild(this.element);
	}
};

Note.prototype.serialize = function() {
	return {
		uuid: this.getUUID(),
		type: 'note',
		position: this.position,
	};
};

Note.unserialize = function(json){
	var note = new Note();
	note.setUUID(json.uuid);

	var noteElement = document.createElement('div');
	noteElement.id = 'note-' + note.getUUID();
	noteElement.className = 'note';
	note.setElement(noteElement);
	note.moveTo(json.position);
	return note;
};


return Note;

});