define('NoteDraggerEventHandler', ['Event'], function(Event){


function NoteDraggerEventHandler(){
}

NoteDraggerEventHandler.prototype.handle = {};

NoteDraggerEventHandler.prototype.handle[Event.Note.ENABLE_DND] = function(dragger, event){
	dragger.startDragging(event.data.draggable);
};

return NoteDraggerEventHandler;

});