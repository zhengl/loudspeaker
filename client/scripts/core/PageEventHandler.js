define('PageEventHandler', ['Event'], function(Event){


function PageEventHandler(){
}

PageEventHandler.prototype.handle = {};

PageEventHandler.prototype.handle[Event.Page.START_DRAWING] = function(page, event){
	page.selectPaintingMode();
	page.painter.startDraft(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.FINISH_DRAWING] = function(page, event){
	var drawnItem = page.getPainter().endDraft(event.data[0]);
	page.registerEventBus(drawnItem);
};

PageEventHandler.prototype.handle[Event.Page.DRAW_TO] = function(page, event){
	page.getPainter().draftTo(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.STOP_DRAWING] = function(page, event){
	page.painter.stopDrawing();
};

PageEventHandler.prototype.handle[Event.Page.START_SELECTING_COLOR] = function(page, event){
	page.painter.showPalette(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.START_MOVING] = function(page, event){
	page.getMover().startMoving(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.MOVE_TO] = function(page, event){
	page.getMover().moveTo(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.FINISH_MOVING] = function(page, event){
	page.getMover().finishMoving(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.START_TEXTING] = function(page, event){
	page.selectTextingMode();
	page.getTexter().startTexting(event.data[0]);
};

PageEventHandler.prototype.handle[Event.Page.FINISH_TEXTING] = function(page, event){
	var textItem = page.getTexter().finishTexting();
	page.registerEventBus(textItem);
};

return PageEventHandler;


});