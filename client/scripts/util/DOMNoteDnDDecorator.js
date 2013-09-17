define('DOMNoteDnDDecorator', ['Event', 'jquery', 'jquery-ui'], function(Event, $){


function DOMNoteDnDDecorator(){
	
}

DOMNoteDnDDecorator.create = function(noteElementId, note, boardElementId, board){
	var droppableZone = document.getElementById('note-droppable-zone');
	var draggableZone = document.getElementById('note-draggable-zone');

	$(draggableZone).draggable({ revert: true });
	$(droppableZone).droppable({
		drop: function( event, ui ) {
				board.addItem(note);
				var noteNode = $("#" + noteElementId);
				noteNode.addClass("note-on-board").removeClass("note-off-board");
				noteNode.appendTo($("#" + boardElementId));
				$("#modal").toggleClass("noteIsShown");
                $("#wrapper").toggleClass("noteIsShown");
                $("#modal-cover").toggleClass("noteIsShown");

                note.element = noteNode.get(0);
                noteNode.on(Event.Kinetic.EVENTS.join(" "), function(event){
                	event.targetItem = note;
                	event.offsetX = event.offsetX + note.getPosition().x;
                	event.offsetY = event.offsetY + note.getPosition().y;
					board.getContext().itemGroup.fire(event.type, event);
                });
		}
	});
}

return DOMNoteDnDDecorator;

});