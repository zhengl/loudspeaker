define('DOMNoteDnDDecorator', ['jquery', 'jquery-ui'], function($){


function DOMNoteDnDDecorator(){
	
}

DOMNoteDnDDecorator.create = function(noteElementId, note, boardElementId, board){
	var droppableZone = document.getElementById('note-droppable-zone');
	var draggableZone = document.getElementById('note-draggable-zone');

	$(draggableZone).draggable({ revert: true });
	$(droppableZone).droppable({
		drop: function( event, ui ) {
				board.appendPage(note);
				$("#" + noteElementId).addClass("note-on-board").removeClass("note-off-board");
				$("#" + noteElementId).appendTo($("#" + boardElementId));
				$("#modal").toggleClass("noteIsShown");
                $("#wrapper").toggleClass("noteIsShown");
                $("#modal-cover").toggleClass("noteIsShown");
		}
	});
}

return DOMNoteDnDDecorator;

});