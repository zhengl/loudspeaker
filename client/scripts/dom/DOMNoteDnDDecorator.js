define('DOMNoteDnDDecorator', ['jquery', 'jquery-ui'], function($){


function DOMNoteDnDDecorator(){
	
}

DOMNoteDnDDecorator.create = function(factory, parentId, palette, uuid){
	factory.create(parentId, palette, uuid);

	var droppableZone = document.createElement('div');
	droppableZone.className = "droppable-zone";

	var draggableZone = document.createElement('div');
	draggableZone.className = "draggable-zone";

	var parentNode = document.getElementById(parentId);
	parentNode.insertBefore(droppableZone, parentNode.firstChild);
	parentNode.appendChild(draggableZone);

	$(draggableZone).draggable({ revert: true });
	$(droppableZone).droppable({
		drop: function( event, ui ) {
				console.log("dropped!")
		}
	});
}

return DOMNoteDnDDecorator;

});