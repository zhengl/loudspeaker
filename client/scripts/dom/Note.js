define('Note', ['Page'], function(Page){

function Note(){
	
}

Note.prototype = new Page();
Note.prototype.constructor = Note;

Note.prototype.moveTo = function(point){
	this.position = point;
	if (this.element) {
	    this.element.style.position = "absolute";
	    this.element.style.left = point.x / this.zoomPercentage + "px";
		this.element.style.top = point.y /this.zoomPercentage + "px";
	}
};

Note.prototype.remove = function(page) {
	this.parent.removeItem(this);
	if(this.element) {
		this.element.parentNode.removeChild(this.element);
	}
};


return Note;

});