define('PainterEventHandler', ['Event'], function(Event){


function PainterEventHandler(){
}

PainterEventHandler.prototype.handle = {};

PainterEventHandler.prototype.handle[Event.Page.START_DRAWING] = function(painter, event){
	painter.startDraft(event.data.position);
};

PainterEventHandler.prototype.handle[Event.Page.FINISH_DRAWING] = function(painter, event){
	painter.endDraft(event.data.position);
};

PainterEventHandler.prototype.handle[Event.Page.DRAW_TO] = function(painter, event){
	painter.draftTo(event.data.position);
};

PainterEventHandler.prototype.handle[Event.Page.STOP_DRAWING] = function(painter, event){
	painter.stopDrawing();
};

return PainterEventHandler;

});