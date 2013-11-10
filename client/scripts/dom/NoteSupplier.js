define('NoteSupplier', ['EventHandleable', 'NoteSupplierEventHandler', 'UUID'], function(EventHandleable, NoteSupplierEventHandler, UUID){
	
function NoteSupplier(element, factory){
	this.noteStack = element;
	this.factory = factory;
}

NoteSupplier.prototype = new EventHandleable(new NoteSupplierEventHandler());
NoteSupplier.prototype.constructor = NoteSupplier;

NoteSupplier.prototype.addNote = function() {
	if(this.noteStack.children.length === 0) {
		var noteElement = document.createElement('div');
		noteElement.id = UUID.generate();
		noteElement.className = 'note';
		this.noteStack.appendChild(noteElement);

		this.factory.setElement(noteElement);
		return this.factory.create();
	}
};

return NoteSupplier;

});