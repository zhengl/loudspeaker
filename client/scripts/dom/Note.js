define('Note', ['Page', 'KineticContext'], function(Page, KineticContext){

function Note(){
	
}

Note.prototype = new Page();
Note.prototype.constructor = Note;

Note.prototype.addTo = function(context) {
	if(context instanceof KineticContext && this.getElement()){
		context.getElement().insertBefore(this.getElement(), context.getElement().firstChild);
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

return Note;

});