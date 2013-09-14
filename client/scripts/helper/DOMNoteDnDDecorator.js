define('DOMNoteDnDDecorator', ['Event', 'KineticMouseEventOnItemInterpreter', 'jquery', 'jquery-ui'], function(Event, KineticMouseEventOnItemInterpreter, $){


function DOMNoteDnDDecorator(){
	
}

DOMNoteDnDDecorator.create = function(noteElementId, note, boardElementId, board){
	var droppableZone = document.getElementById('note-droppable-zone');
	var draggableZone = document.getElementById('note-draggable-zone');

	$(draggableZone).draggable({ revert: true });
	$(droppableZone).droppable({
		drop: function( event, ui ) {
				board.appendPage(note);
				var noteNode = $("#" + noteElementId);
				noteNode.addClass("note-on-board").removeClass("note-off-board");
				noteNode.appendTo($("#" + boardElementId));
				$("#modal").toggleClass("noteIsShown");
                $("#wrapper").toggleClass("noteIsShown");
                $("#modal-cover").toggleClass("noteIsShown");

                var interpreter = new KineticMouseEventOnItemInterpreter(note);
                note.element = noteNode.get(0);
                noteNode.on([
					Event.Kinetic.MOUSE_OVER,
					Event.Kinetic.MOUSE_ENTER,
					Event.Kinetic.MOVE_TO,
					Event.Kinetic.MOUSE_DOWN,
					Event.Kinetic.MOUSE_UP,
					Event.Kinetic.MOUSE_OUT,
					Event.Kinetic.MOUSE_LEAVE,
				].join(" "), function(event){
					interpreter.interpret(event, board.getEventBus());
                });
		}
	});
}

return DOMNoteDnDDecorator;

});