define('Note', ['Page'], function(Page){

function Note(){
	
}

Note.prototype = new Page();
Note.prototype.constructor = Note;

return Note;

});