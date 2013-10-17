define('NoteDraggerEventHandler', ['Event'], function(Event){


function NoteDraggerEventHandler(){
}

NoteDraggerEventHandler.prototype.handle = {};

NoteDraggerEventHandler.prototype.handle[Event.Note.START_DRAGGING] = function(dragger, event){
	dragger.startDragging(event.data.item, event.data.position);
};

NoteDraggerEventHandler.prototype.handle[Event.Note.MOVE_TO] = function(dragger, event){
	dragger.dragTo(event.data.position);
};

NoteDraggerEventHandler.prototype.handle[Event.Note.FINISH_DRAGGING] = function(dragger, event){
	dragger.finishDragging();
};

return NoteDraggerEventHandler;

});