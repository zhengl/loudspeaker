define('NoteSupplier', ['EventHandleable', 'NoteSupplierEventHandler'], function(EventHandleable, NoteSupplierEventHandler){
	
function NoteSupplier(element){
	this.noteStack = element;
}

NoteSupplier.prototype = new EventHandleable(new NoteSupplierEventHandler());
NoteSupplier.prototype.constructor = NoteSupplier;

NoteSupplier.prototype.addNote = function() {
	if(this.noteStack.children.length === 0) {
		var note = document.createElement('div');
		note.className = 'note';
		this.noteStack.appendChild(note);
	}
};

return NoteSupplier;

});