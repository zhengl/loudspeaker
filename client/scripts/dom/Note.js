define('Note', ['Page'], function(Page){

function Note(){
	
}

Note.prototype = new Page();
Note.prototype.constructor = Note;

Note.prototype.moveTo = function(point){
	this.position = point;
	if (this.element) {
	    this.element.style.position = "fixed";
	    this.element.style.left = point.x + "px";
		this.element.style.top = point.y + "px";
	}
};
return Note;

});