define('NoteSupplierEventHandler', ['Event'], function(Event){


function NoteSupplierEventHandler(){
}

NoteSupplierEventHandler.prototype.handle = {};

NoteSupplierEventHandler.prototype.handle[Event.Note.FINISH_DRAGGING] = function(supplier, event){
	supplier.addNote();
};

return NoteSupplierEventHandler;

});